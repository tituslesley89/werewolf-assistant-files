<template>
  <v-dialog v-model="dialogFlag" width="500"> 
    <v-card>
        <v-card-title>
          Confirmation
        </v-card-title>

        <v-card-text>
          {{dialogText}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="confirm"
          >
            Yes
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="reject"
          >
            No
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "ConfirmationDialog",
  props : {
    dialogText : {
      type: String,
      default() {
        return "Are you sure?"
      }
    }
  },
  data() {
    return {
      dialogFlag: false
    };
  },
  methods : {
    confirm() {
        this.$emit("confirm");
        this.closeDialog();
    },
    reject() {
        this.$emit("reject");
        this.closeDialog();
    },
    closeDialog() {
        this.dialogFlag = false;
    },
    showDialog() {
        this.dialogFlag = true;
    }
  }
};
</script>