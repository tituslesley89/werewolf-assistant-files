import PlayerTeam from "./PlayerTeam"
export default {
    werewolf: {
        name: 'Werewolf',
        team: PlayerTeam.WEREWOLF,
        nightActionOrder: 1
    },
    villager: {
        name: 'Villager',
        team: PlayerTeam.VILLAGER,
    },
    hunter: {
        name: 'Hunter',
        team: PlayerTeam.VILLAGER,
    },
    seer: {
        name: 'Seer',
        team: PlayerTeam.VILLAGER,
        nightActionOrder: 2
    },
    tanner: {
        name: 'Tanner',
        team: PlayerTeam.OTHER,
    },
    bodyguard: {
        name: 'Bodyguard',
        team: PlayerTeam.VILLAGER,
        nightActionOrder: 3
    },
    lycan: {
        name: 'Lycan',
        team: PlayerTeam.VILLAGER
    },
    villageIdiot: {
        name: 'Village Idiot',
        team: PlayerTeam.VILLAGER
    }
}