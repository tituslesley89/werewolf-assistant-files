<template>
  <v-footer padless fixed>
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
        <v-btn icon large color="white" class="mx-2" @click="$emit('addPlayer')" title="add player">
          <v-icon> mdi-plus </v-icon>
        </v-btn>
        <v-btn icon large color="white" class="mx-2" @click="$emit('toggleTimer')" title="play/pause timer">
          <v-icon v-if="isTimerRunning">
            mdi-timer-pause-outline
          </v-icon>
          <v-icon v-else>
            mdi-timer-play-outline
          </v-icon>
        </v-btn>
        <v-btn icon large color="white" class="mx-2" @click="$emit('resetTimer')" title="reset timer">
          <v-icon>mdi-timer-refresh-outline</v-icon>
        </v-btn>
        <night-action-widge :players="playerList"/>
      </v-card-text>
      <div class="pb-10"/>
    </v-card>
  </v-footer>
</template>
<script>
import PlayerTeam from "@/constants/PlayerTeam";
import PlayerStatus from "@/constants/PlayerStatus";
import NightActionWidge from '@/components/NightActionWidge.vue';
export default {
  name: "FooterBox",
  components : {
    NightActionWidge
  },
  props: {
    playerList: {
      type: Array,
      default() {
        return [];
      },
    },
    isTimerRunning: {
      type: Boolean,
      default() {
        return false;
      }
    }
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
  }
};
</script>