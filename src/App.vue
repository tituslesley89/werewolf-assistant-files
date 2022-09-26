<template>
  <v-app>
    <v-app-bar
      app
      color="grey darken-3"
      dark
    >

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <h3>Werewolf Assistant</h3>

      <v-spacer></v-spacer>
      <RoundTimer ref="roundTimer" :isTimerRunning="isTimerRunning"/>

    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      bottom
      temporary
      fixed
    >

    <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="deep-red--text text--accent-4"
        >
        <v-list-item @click="showOpenSessionDialog">
            <v-list-item-title>Session Manager</v-list-item-title>
          </v-list-item>
        <v-list-item @click="showSaveSessionDialog">
            <v-list-item-title>Save Session</v-list-item-title>
          </v-list-item>
        <v-list-item @click="showClearSessionConfirmationDialog">
            <v-list-item-title>Clear Session</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
    </v-list>
    </v-navigation-drawer>

    <v-main>
      <player-list style="margin-bottom:170px" :players="players" 
      @changeLifeStatus="changeLifeStatus"
      @editPlayer="showEditPlayerDialog"
      @setNote="updatePlayerNote"
      @deletePlayer="confirmPlayerDeletion"/>
    <add-player-dialog ref="addPlayerDialog" @add-player="addPlayer" @update-player="updatePlayer"/>
    <confirmation-dialog ref="clearSessionConfirmationDialog" dialogText="Are you sure you want to reset the session?" @confirm="resetSession"/>
    <confirmation-dialog ref="deletePlayerConfirmation" dialogText="Are you sure you want to delete this player?" @confirm="deletePlayer"/>
    <save-session ref="saveSessionDialog" :players="players"/>
    <open-session ref="openSessionDialog" @openSession="openSession"/>
    <footer-box :playerList="players" :isTimerRunning="isTimerRunning" @addPlayer="openPlayerDialog" @toggleTimer="toggleTimer" @resetTimer="resetTimer"/>
    </v-main>
  </v-app>
</template>

<script>
import PlayerList from './components/PlayerList';
import AddPlayerDialog from './components/AddPlayerDialog';
import PlayerStatus from './constants/PlayerStatus';
import FooterBox from './components/FooterBox.vue';
import ConfirmationDialog from './components/ConfirmationDialog.vue';
import SaveSession from './components/SaveSession.vue'
import OpenSession from './components/OpenSession.vue';
import RoundTimer from './components/RoundTimer.vue';

export default {
  name: 'App',

  components: {
    PlayerList,
    AddPlayerDialog,
    FooterBox,
    ConfirmationDialog,
    OpenSession,
    SaveSession,
    RoundTimer
},

  data: () => ({
    drawer : false,
    players : [],
    playerToDelete : undefined,
    isTimerRunning : false
  }),
  methods : {
    openPlayerDialog() {
      this.$refs.addPlayerDialog.openDialog();
    },
    addPlayer(player) {
      this.players.push(
        this.mixinPlayerObject(player, undefined)
      );
    },
    changeLifeStatus(id) {
      let elementPos = this.findPlayerIndexById(id);
      let newStatus = this.players[elementPos].status === PlayerStatus.ALIVE ? PlayerStatus.DEAD : PlayerStatus.ALIVE;
      this.$set(this.players[elementPos], 'status', newStatus);
    },
    deletePlayer() {
      let elementPos = this.findPlayerIndexById(this.playerToDelete);
      this.$delete(this.players, elementPos);
    },
    confirmPlayerDeletion(playerId) {
      this.playerToDelete = playerId;
      this.$refs.deletePlayerConfirmation.showDialog();
    },
    findPlayerIndexById(id) {
      return this.players.map((x)=>{return x.id; }).indexOf(id);
    },
    showClearSessionConfirmationDialog() {
      if(this.players.length) {
        this.$refs.clearSessionConfirmationDialog.showDialog();
      }
    },
    showEditPlayerDialog(player) {
      this.$refs.addPlayerDialog.openDialogForEditing(player);
    },
    updatePlayer(player) {
      let elementPos = this.findPlayerIndexById(player.id);
      let existingPlayer = this.players[elementPos];
      this.$set(this.players, elementPos, this.mixinPlayerObject(player, existingPlayer));
    },
    updatePlayerNote(playerNote) {
      let elementPos = this.findPlayerIndexById(playerNote.playerId);
      let existingPlayer = this.players[elementPos];
      existingPlayer.note = playerNote.note;
      this.$set(this.players, elementPos, existingPlayer);
    },
    mixinPlayerObject(player, existingPlayer) {
      return {
        id : player.id,
        name : player.name,
        role : player.role,
        status : existingPlayer ? existingPlayer.status : PlayerStatus.ALIVE,
        note : existingPlayer ? existingPlayer.note : ''
      };
    },
    resetSession() {
      this.players = [];
    },
    closeDrawer() {
      this.drawer = false;
    },
    showSaveSessionDialog() {
      this.closeDrawer();
      this.$refs.saveSessionDialog.showDialog();
    },
    showOpenSessionDialog() {
      this.closeDrawer();
      this.$refs.openSessionDialog.showDialog();
    },
    openSession(sessionPlayers) {
      this.$set(this, 'players', sessionPlayers);
    },
    toggleTimer() {
      this.isTimerRunning = !this.isTimerRunning;
    },
    resetTimer() {
      this.$refs.roundTimer.resetTimer();
    }
  }
}
</script>