<template>
  <span class="text-center" v-if="nightRoles.length">
    <v-menu offset-y top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          large
          color="white"
          class="mx-2"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-weather-night</v-icon>
        </v-btn>
      </template>
      <v-list dense>
          <v-subheader>Night Order</v-subheader>
        <v-list-item v-for="(role, index) in nightRoles" :key="role.name">
          <v-list-item-title>{{ `${index+1}. ${role.name}` }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </span>
</template>
<script>
export default {
  name: "NightActionWidge",
  props: {
    players: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    nightRoles() {
      let nightRoleSet = new Set();
      this.players.forEach((player) => {
        if ("nightActionOrder" in player.role) {
          nightRoleSet.add(player.role);
        }
      });
      let nightActions = Array.from(nightRoleSet);
      nightActions = nightActions.sort((role1, role2) => {
        return role1.nightActionOrder - role2.nightActionOrder;
      });
      return nightActions;
    },
  },
};
</script>