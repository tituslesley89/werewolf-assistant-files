<template>
  <v-app>
    <v-app-bar
      app
      color="grey darken-3"
      dark
    >

      <h3>Werewolf Assistant</h3>

      <v-spacer></v-spacer>


    </v-app-bar>

    <v-navigation-drawer
      absolute
      bottom
      temporary
    >

    <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="deep-red--text text--accent-4"
        >
        <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
    </v-list>
    </v-navigation-drawer>

    <v-main>
      <player-list :players="players" 
      @changeLifeStatus="changeLifeStatus"
      @deletePlayer="deletePlayer"/>
    <add-player-dialog ref="addPlayerDialog" @add-player="addPlayer"/>
    <confirmation-dialog ref="clearSessionConfirmationDialog" dialogText="Are you sure you want to reset the session?" @confirm="resetSession"/>
    <footer-box :playerList="players" @addPlayer="openPlayerDialog" @clearSession="showClearSessionConfirmationDialog"/>
    </v-main>
  </v-app>
</template>

<script>
import PlayerList from './components/PlayerList';
import AddPlayerDialog from './components/AddPlayerDialog';
import PlayerStatus from './constants/PlayerStatus';
import FooterBox from './components/FooterBox.vue';
import ConfirmationDialog from './components/ConfirmationDialog.vue';

export default {
  name: 'App',

  components: {
    PlayerList,
    AddPlayerDialog,
    FooterBox,
    ConfirmationDialog
  },

  data: () => ({
    drawer : false,
    players : []
  }),
  methods : {
    openPlayerDialog() {
      this.$refs.addPlayerDialog.openDialog();
    },
    addPlayer(player) {
      this.players.push(
        {
          id : player.id,
          name : player.name,
          role : player.role,
          status : PlayerStatus.ALIVE
        }
      );
    },
    changeLifeStatus(id) {
      let elementPos = this.findPlayerIndexById(id);
      let newStatus = this.players[elementPos].status === PlayerStatus.ALIVE ? PlayerStatus.DEAD : PlayerStatus.ALIVE;
      this.$set(this.players[elementPos], 'status', newStatus);
    },
    deletePlayer(id) {
      let elementPos = this.findPlayerIndexById(id);
      this.$delete(this.players, elementPos);
    },
    findPlayerIndexById(id) {
      return this.players.map((x)=>{return x.id; }).indexOf(id);
    },
    showClearSessionConfirmationDialog() {
      if(this.players.length) {
        this.$refs.clearSessionConfirmationDialog.showDialog();
      }
    },
    resetSession() {
      this.players = [];
    }
  }
}
</script>