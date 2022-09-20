<template>
  <span>
    <v-dialog v-model="showDialogFlag" persistent max-width="600">
    <v-card>
      <v-card-title>
        <span class="text-h5">Session Manager</span>
      </v-card-title>
      <v-card-text>
        <v-list v-if="sessions.length" dense>
          <v-list-item-group v-model="selectedSession" color="primary">
            <v-list-item v-for="session in sessions" :key="session.id">
              <v-list-item-title v-text="session.name"/>
              <v-list-item-subtitle>
                {{`SessionId : ${session.id}`}}
              </v-list-item-subtitle>
              <v-btn icon @click="confirmSessionDeletion(session.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <span v-else>
          No sessions found
        </span>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
          <v-btn
            color="primary"
            text
            @click="openSession"
          >
            Open
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
  <confirmation-dialog ref="confirmDeletion" dialogText="Are you sure you want to delete the session?" @confirm="sessionDeletionConfirmed" @reject="sessionDeletionRejected"/>
  </span>
</template>
<script>
import SessionStorage from '@/services/SessionStorage';
import ConfirmationDialog from './ConfirmationDialog.vue';
export default {
  components: { ConfirmationDialog },
   name : 'OpenSession',
   data() {
       return {
           showDialogFlag : false,
           selectedSession : undefined,
           sessions : [],
           sessionToDelete : undefined
       }
   },
   methods : {
     showDialog() {
       this.showDialogFlag = true;
       this.fetchSession();
     },
     openSession() {
       this.$emit('openSession', this.sessions[this.selectedSession].info.players);
       this.closeDialog();
     },
     closeDialog() {
       this.showDialogFlag = false;
     },
     fetchSession() {
       this.sessions = SessionStorage.getSessions();
     },
     deleteSession() {
       SessionStorage.deleteSession(this.sessionToDelete);
       this.fetchSession();
     },
     confirmSessionDeletion(sessionId) {
       this.sessionToDelete = sessionId;
       this.closeDialog();
       this.$refs.confirmDeletion.showDialog();
     },
     sessionDeletionConfirmed() {
       this.deleteSession();
       this.showDialog();
     },
     sessionDeletionRejected() {
       this.showDialog();
     }
   }
}
</script>