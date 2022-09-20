<template>
  <v-list-item-content>
    <div class="d-flex flex-row pa-2">
      <v-menu
        class="in"
        bottom
        right
        origin="center center"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon small>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item @click="emitDelete">Delete</v-list-item>
          <v-list-item @click="emitEdit">Edit</v-list-item>
        </v-list>
      </v-menu>
      <v-list-item-title
        :class="
          player.status === PlayerStatus.DEAD
            ? 'text-decoration-line-through grey--text'
            : ''
        "
      >
        <div>
          {{ player.name }}
        </div>
        <div :class="getRoleColor(player.status, player.role.team)">
          {{ player.role.name }}
        </div>
      </v-list-item-title>
      <v-btn
        :color="getStatusColor(player.status)"
        class="float-right mr-4"
        @click="emitChangeLifeStatus"
      >
        {{ player.status === PlayerStatus.ALIVE ? "Kill" : "Revive" }}
      </v-btn>
    </div>
  </v-list-item-content>
</template>
<script>
import PlayerTeam from "../constants/PlayerTeam";
import PlayerStatus from "../constants/PlayerStatus";
export default {
  name: "PlayerRow",
  data() {
    return {
      PlayerStatus: PlayerStatus,
    };
  },
  props: {
    player: {
      type: Object,
    },
  },
  methods: {
    getRoleColor(status, team) {
      if (status === PlayerStatus.DEAD) {
        return "grey--text";
      }
      switch (team) {
        case PlayerTeam.VILLAGER:
          return "green--text";
        case PlayerTeam.WEREWOLF:
          return "red--text";
        default:
          return "brown--text";
      }
    },
    getStatusColor(status) {
      return status === PlayerStatus.ALIVE ? "deep-orange" : "grey";
    },
    emitChangeLifeStatus() {
      this.$emit("changeLifeStatus", this.player.id);
    },
    emitDelete() {
      this.$emit("deletePlayer", this.player.id);
    },
    emitEdit() {
      this.$emit("editPlayer", this.player);
    },
  },
};
</script>