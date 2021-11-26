<template>
<div class='timer'>
    {{getTime}}
</div>
</template>

<script>
import bus from '@/router/bus'
export default {
    data() {
        return {
            seconds: 120,
            timer: null
        }
    },
    computed: {
        getTime() {
            let min = parseInt(this.seconds / 60)
            let sec = this.seconds - Number(min * 60)
            if (sec < 10) sec = '0' + sec
            return '0' + min + ':' + sec
        }
    },
    mounted() {
        bus.$on('timer', () => {
            this.timerStart()
        })
    },
    methods: {
        timerStart() {
            if (this.timer) clearInterval(this.timer)
            let that = this

            this.timer = setInterval(function () {
                that.seconds--

            }, 1000)
        }
    }
}
</script>

<style>

</style>
