<template>
    <span class="caption">
        Round started <br>
        {{this.displayString}}
    </span>
</template>
<script>
import moment from 'moment';
export default {
    name : 'MarkRoundTimer',
    data() {
        return {
            markedTimer : moment().subtract(2, 'minutes'),
            displayString : '',
        }
    },
    methods : {
        resetTimer() {
            this.markedTimer = moment();
            this.refreshDisplayString();
        },
        refreshDisplayString() {
           this.displayString = this.markedTimer.fromNow(); 
        }
    },
    mounted() {
        setInterval(() => {
            this.refreshDisplayString();
        }, 1000);
    }
}
</script>