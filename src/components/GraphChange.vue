<script>
import Chart from 'chart.js/auto';
import { store } from '../store';
export default {
    components: {
        store
    },
    data() {
        return {
            store
        }
    },
    mounted() {
        this.calculatedates();
    },
    methods: {
        calculatedates() {//this function calculate the dates for the api request of the weekly values of the change
            let a = new Date();
            let b = this.startOfWeek(new Date());
            if ((a.getMonth() + 1) < 10) {
                this.store.today = `${a.getFullYear()}-0${a.getMonth() + 1}-${a.getDate()}`;
            } else {
                this.store.today = `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
            }
            if ((b.getMonth() + 1) < 10) {
                this.store.firstOfTheWeek = `${b.getFullYear()}-0${b.getMonth() + 1}-${b.getDate()}`;
            } else {
                this.store.firstOfTheWeek = `${b.getFullYear()}-${b.getMonth() + 1}-${b.getDate()}`;
            }
        },
        startOfWeek(date) {//this function allows me to have always the first day of the week
            var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
            return new Date(date.setDate(diff));
        },
        makeTheGraph() {

        }
    }
}
</script>
<template>
    <div class="graph-change">
        <div v-if="!this.store.resultShowed">Manca immissione dei dati</div>
        <div v-else>
            grafico
            <canvas id="line-graph"></canvas>
        </div>
    </div>
</template>
<style scoped lang="scss">
.graph-change {
    flex-grow: 1;
    border: 1px solid orange;
}
</style>