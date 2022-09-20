<template>
  <v-dialog v-model="showDialog" persistent max-width="600">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{isEditMode ? 'Edit Player' : 'Add Player'}}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="addPlayerForm" v-model="formModel" lazy-validation>
          <v-row>
            <v-text-field
              label="Name"
              v-model="name"
              :rules="requireRule"
              require
            />
          </v-row>
          <v-row>
            <v-autocomplete
              label="Role"
              v-model="role"
              :items="existingRoles"
              :rules="requireRule"
              required
              no-data-text="Role not found"
              return-object
              item-text="name"
            />
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="closeDialog"> Close </v-btn>
        <v-btn text @click="addPlayer"> {{isEditMode ? 'Update' : 'Add'}} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import PlayerRoles from "../constants/PlayerRoles";
import { v4 as uuidv4 } from 'uuid';
export default {
  name: "AddPlayerDialog",
  data() {
    return {
      showDialog: false,
      name: "",
      role: "",
      requireRule: [(ip) => !!ip || "Required"],
      formModel: true,
      isEditMode: false,
      editingPlayerId : undefined
    };
  },
  computed: {
    existingRoles() {
      let roleList = [];
      Object.keys(PlayerRoles).forEach((role) => {
        roleList.push(PlayerRoles[role]);
      });
      return roleList;
    },
  },
  methods: {
    addPlayer() {
      if (this.$refs.addPlayerForm.validate()) {
        this.$emit(this.isEditMode ? "update-player" : "add-player", {
          name: this.name,
          role: this.role,
          id: this.isEditMode ? this.editingPlayerId : this.generateId(),
        });
        this.closeDialog();
      }
    },
    closeDialog() {
      this.setDialogDisplayStatus(false);
    },
    openDialog() {
      this.setDialogDisplayStatus(true);
      this.isEditMode = false;
    },
    openDialogForEditing(player) {
      this.isEditMode = true;
      this.name = player.name;
      this.role = player.role;
      this.editingPlayerId = player.id;
      this.showDialog = true;
    },
    setDialogDisplayStatus(value) {
      this.showDialog = value;
      this.resetAttribute();
    },
    generateId() {
      return uuidv4();
    },
    resetAttribute() {
      this.$refs.addPlayerForm.reset();
    },
  },
};
</script>