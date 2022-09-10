<template>
  <v-footer padless absolute>
    <v-card
      v-if="showInfoBox"
      flat
      tile
      width="100%"
      class="grey darken-3 text-center"
    >
      <v-card-text class="white--text">
        {{
          `${gameStats.alivePlayers}/${playerList.length} players alive | ${gameStats.aliveWereWolves} werewolves(s) alive`
        }}
      </v-card-text>
    </v-card>
    <v-card flat tile width="100%" class="grey darken-3 text-center">
      <v-card-text>
        <v-btn icon large color="white" class="mx-6">
          <v-icon> mdi-content-save </v-icon>
        </v-btn>
        <v-btn icon large color="white" class="mx-6">
          <v-icon> mdi-folder-open </v-icon>
        </v-btn>
        <v-btn icon large color="white" class="mx-6" @click="emitClearSession">
          <v-icon> mdi-close-circle </v-icon>
        </v-btn>
        <v-btn icon large color="white" class="mx-6" @click="emitAddPlayer">
          <v-icon> mdi-plus </v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
import PlayerTeam from "@/constants/PlayerTeam";
import PlayerStatus from "@/constants/PlayerStatus";
export default {
  name: "FooterBox",
  props: {
    playerList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    showInfoBox() {
      return !!this.playerList.length;
    },
    gameStats() {
      let aliveWereWolves = 0;
      let alivePlayers = 0;
      this.playerList.forEach((player) => {
        if (player.status === PlayerStatus.ALIVE) {
          alivePlayers++;
          if (player.role.team === PlayerTeam.WEREWOLF) {
            aliveWereWolves++;
          }
        }
      });
      return {
        aliveWereWolves: aliveWereWolves,
        alivePlayers: alivePlayers,
      };
    },
  },
  methods: {
    emitAddPlayer() {
      this.$emit("addPlayer");
    },
    emitClearSession() {
        this.$emit("clearSession");
    }
  },
};
</script>