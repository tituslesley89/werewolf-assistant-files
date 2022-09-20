<template>
  <v-dialog v-model="displayDialogFlag" persistent max-width="600">
    <v-card>
      <v-card-title>
        <span class="text-h5">Save Session</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="saveSessionForm" v-if="canSaveSession" v-model="formModel" lazy-validation>
          <v-row>
            <v-text-field
              label="Name"
              v-model="sessionNameModel"
              :rules="sessionNameRules"
              require
            />
          </v-row>
        </v-form>
        <div v-else>
          {{`You cannot save more than ${this.maxSavedSessions} sessions.`}}
        </div>
      </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="saveSession"
            :disabled="!canSaveSession"
          >
            Save
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="closeDialog"
          >
            Cancel
          </v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import SessionStorage from "../services/SessionStorage";
import { v4 as uuidv4 } from 'uuid';
import ApplicationConfig from "../constants/ApplicationConfig"
export default {
  name: "SaveSession",
  props: {
    players: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      displayDialogFlag: false,
      existingSessionNames: [],
      sessionNameModel: "",
      formModel: true,
      sessionNameRules: [this.validateSessionName],
      maxSavedSessions: ApplicationConfig.maxSavedSession,
      canSaveSession : true
    };
  },
  methods: {
    showDialog() {
      this.displayDialogFlag = true;

      let sessions = SessionStorage.getSessions();
      let sessionNames = new Set();
      sessions.forEach((session) => {
        sessionNames.add(session.name);
      });
      this.$set(this, 'existingSessionNames', sessionNames);
      this.computeCanSaveSession();
    },
    computeCanSaveSession() {
      this.canSaveSession = this.existingSessionNames.size < ApplicationConfig.maxSavedSession;
    },
    saveSession() {
      if (this.$refs.saveSessionForm.validate()) {
        SessionStorage.saveSession({
            name : this.sessionNameModel,
            id : uuidv4(),
            info : {
              players : this.players
            }
        });
        this.closeDialog();
      }
    },
    validateSessionName(name) {
      if(this.existingSessionNames && this.existingSessionNames.has(name)) {
        return "Session name already exists";
      } else {
        return true;
      }
    },
    closeDialog() {
      this.displayDialogFlag = false;
      this.sessionNameModel = "";
    },
  },
};
</script>