<template>
    <v-card>
    <v-list v-if="players.length">
        <v-list-item v-for="player in players" :key="player.id">
            <player-row :player="player" 
            @changeLifeStatus="$emit('changeLifeStatus',$event)"
            @deletePlayer="$emit('deletePlayer',$event)"/>
        </v-list-item>
    </v-list>
    <p v-else class="text-center pa-4">
        No players
    </p>
    </v-card>
</template>

<script>
import PlayerRow from './PlayerRow.vue';
export default {
  components: { PlayerRow },
    name: 'PlayerList',
    props : {
        players : {
            type : Array,
            default() {
                return [];
            }
        }
    },
}
</script>
