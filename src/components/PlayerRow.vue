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
      <span class="pr-4">
      <v-btn v-if="player.note === ''" small dense
        @click="showNoteDialog">
        Add Note
      </v-btn>
      <span v-else @click="showNoteDialog" class="text--disabled font-weight-light font-italic">
        {{ player.note }}
      </span>
      </span>
      <v-btn
        :color="getStatusColor(player.status)"
        class="float-right mr-4"
        small
        dense
        @click="emitChangeLifeStatus"
      >
        {{ player.status === PlayerStatus.ALIVE ? "Kill" : "Revive" }}
      </v-btn>
    </div>
    <AddNoteDialog ref="addNoteDialog" @setNote="emitSetNote" />
  </v-list-item-content>
</template>
<script>
import PlayerTeam from "../constants/PlayerTeam";
import PlayerStatus from "../constants/PlayerStatus";
import AddNoteDialog from "./AddNoteDialog.vue";
export default {
    name: "PlayerRow",
    components: { AddNoteDialog },
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
        emitSetNote(note) {
            this.$emit('setNote', {
              playerId : this.player.id,
              note : note
            });
        },
        showNoteDialog() {
          this.$refs.addNoteDialog.showDialog(this.player.note);
        }
    }
};
</script>