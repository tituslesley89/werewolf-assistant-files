<template>
    <v-dialog v-model="showDialog" persistent max-width="600">
<v-card>
      <v-card-title>
        <span class="text-h5">Save Session</span>
      </v-card-title>
      <v-card-text>
       <v-form ref="saveSessionForm" v-model="formModel" lazy-validation>
          <v-row>
            <v-text-field
              label="Name"
              v-model="sessionNameModel"
              :rules="requireRule"
              require
            />
          </v-row> 
       </v-form>
      </v-card-text>
</v-card>
    </v-dialog>
</template>
<script>
import SessionStorage from '../services/SessionStorage'
import { v4 as uuidv4 } from 'uuid';
export default {
    name: "SaveSession",
    props : {
        players : {
            type : Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            displayDialogFlag : false,
            sessions : [],
            sessionNameModel : "",
            formModel : false,
            sessionNameRules : [validateSessionName || 'Session name already exists']
        }
    },
    computed : {
        existingSessionNames () {
            let sessionNames = new Set();
            this.sessions.forEach((session)=>{
                sessionNames.add(session.name);
            });
        }
    },
    methods : {
        showDialog() {
            this.sessions = SessionStorage.getSessions();
            this.displayDialogFlag = true;
        },
        saveSession() {
            if(this.$refs.saveSessionForm.validate()) {
                // SessionStorage.saveSession({
                //     name : this.sessionNameModel,
                //     id : uuidv4(),
                //     info : this.players
                // });
                console.log('saving sessions');
            }
        },
        validateSessionName(name) {
            return !this.existingSessionNames.contains(name);
        },
        closeDialog() {
            this.displayDialogFlag = false;
            this.sessionNameModel = "";
        }
    }
}
</script>