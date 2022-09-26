<template>
    <span>
        <v-dialog v-model="displayDialogFlag"
        width="400">
        <v-card>
        <v-card-title>
            Add Note
        </v-card-title>

        <v-card-text>
            <v-text-field label="Note" v-model="note" clearable/>
        </v-card-text>

        <v-card-actions>
            <v-btn 
            color="primary"
            text
            @click="hideDialog">
                Cancel
            </v-btn>
          <v-spacer></v-spacer>
          <v-btn 
            color="primary"
            text
          @click="setNote">
          Set
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </span>
</template>
<script>
export default {
    name : 'AddNoteDialog',
    data() {
        return {
            note : '',
            displayDialogFlag : false
        }
    },
    methods : {
        showDialog(existingNote) {
            this.note = existingNote;
            this.displayDialogFlag = true;
        },
        hideDialog() {
            this.displayDialogFlag = false;
        },
        setNote() {
            this.$emit('setNote', this.note == null ? '' : this.note);
            this.hideDialog();
        }
    }
}
</script>