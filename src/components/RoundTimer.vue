<template>
    <span class="text-center">
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                    {{`${timerDuration.minutes()}:${getDurationSecond()}`}}
                </span>
            </template>
            <div class="pl-3 pr-8 white">
                <v-slider v-model="minutesPerRound" dense vertical min="1" max="10" thumb-label="always"
                    thumb-size="20"></v-slider>
            </div>
        </v-menu>
    </span>
</template>
<script>
import moment from 'moment';
export default {
    name: 'RoundTimer',
    props: {
        isTimerRunning: {
            type: Boolean,
            default() {
                return false;
            }
        }
    },
    data() {
        return {
            targetTime: moment(),
            timerDuration: moment.duration().add(3, 'minutes'),
            timerTask: undefined,
            timerTaskInterval: 1000,
            minutesPerRound: 3
        }
    },
    watch: {
        isTimerRunning(newValue) {
            if (newValue) {
                this.startTimer();
            } else {
                this.pauseTimer();
            }
        }
    },
    methods: {
        resetTimer() {
            this.targetTime = moment().add(this.minutesPerRound, 'minutes');
            this.timerDuration = moment.duration(this.targetTime.diff(this.currentTime));
        },
        startTimer() {
            if (this.timerTask) {
                this.pauseTimer();
            }
            if(this.isTimerZero()) {
                return;
            }
            this.timerTask = setInterval(() => {
                this.timerDuration.subtract(1, 'seconds');
                if(this.isTimerZero()) {
                    this.pauseTimer();
                }
            }, this.timerTaskInterval);
        },
        pauseTimer() {
            clearInterval(this.timerTask);
        },
        emitPauseTimer() {
            this.$emit('pause-timer');
        },
        isTimerZero() {
            return !this.timerDuration.asSeconds();
        },
        getDurationSecond() {
            if(this.timerDuration.seconds() < 10) {
                return `0${this.timerDuration.seconds()}`;
            } else {
                return this.timerDuration.seconds();
            }
        }
    }
}
</script>