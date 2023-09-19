<script>
import axios from 'axios';
import { store } from '../store';

export default {
    components: {
        store
    },
    data() {
        return {
            currenciesArray: {},//list of thr currencies for the change
            store,//external store to accumulate all the datas and also for memorize the url for api requests
            userInputNumb: 0,//for storage the quantity inserted by the user
            userInputVal: '',//currency start
            changeInputVal: ''//currency end
        }
    },
    mounted() {
        this.getAllValues();
    },
    methods: {
        getAllValues() {//with this function i can collect all the currencies
            axios.get(`${this.store.mainUrl}/currencies`).then((resp) => {
                this.currenciesArray = resp.data;
            })
        },
        changeTheValue(quantity, value1, value2) {//this is the main function of all the project
            this.store.resultChange = 0;//reset the result of the change every time i call it
            this.store.userQuantity = quantity;//it picks the quantity from the input
            this.store.userValue = value1;//it picks the start currency
            this.store.changeValue = value2;//it picks the end currency
            if (value1 === '' && value2 === '') {//if i don't put one of these currencies, or both, it shows me a warning
                alert('Insert currencies, please');
            } else if (quantity === 0) {//if the quantity is zero it shows me the value of 1  start value into the change value (example: 1 EUR -> GBP)
                this.store.userQuantity = 1
                axios.get(`${this.store.mainUrl}/latest`, {//this is the axios get request of the result
                    params: {
                        from: value1,
                        to: value2
                    }
                }).then((resp) => {
                    this.store.resultChange = resp.data.rates[value2];//the result is saved into store.resultChange
                    console.log(resp.data.rates[value2]);
                    this.store.resultShowed = true;//And it's showed on the top of the page
                });
            } else {//else it made the calculation of the conversion between the two values of a determinate quantity putted by the user
                axios.get(`${this.store.mainUrl}/latest`, {
                    params: {
                        amount: Number(quantity),
                        from: value1,
                        to: value2
                    }
                }).then((resp) => {
                    this.store.resultChange = resp.data.rates[value2];
                    console.log(resp.data.rates[value2]);
                    this.store.resultShowed = true;
                })
            };
            //the part below it's important for the graph
            if (this.store.firstOfTheWeek === this.store.today) {//if i use it in the first day of the week it shows me only one result 
                axios.get(`${this.store.mainUrl}/latest`, {
                    params: {
                        from: value1,
                        to: value2
                    }
                }).then((resp) => {
                    this.store.weeklyValues = resp.data;
                    console.log(this.store.weeklyValues);
                })
            } else {//else it shows me the values during the period beetween the first day and today
                this.weeklyValueShow();
            }
        },
        weeklyValueShow() {
            axios.get(`https://api.frankfurter.app/${this.store.firstOfTheWeek}..${this.store.today}`, {
                params: {
                    base: this.store.userValue,
                    to: this.store.changeValue
                }
            }).then((resp) => {
                this.store.weeklyValues = resp.data.rates;
                console.log(this.store.weeklyValues);
            });
        }
    }
}
</script>
<template>
    <div class="calculation-change">
        <div class="user-input">
            <div class="choose-value">
                <label for="value">Start Value:</label>
                <select name="value" id="value" v-model="this.userInputVal"><!--Così facendo ho tutti i nomi delle valute-->
                    <option v-for="(currency, index) in currenciesArray" :key="index" :value="index">{{
                        currenciesArray[index] }}
                    </option>
                </select>
            </div>
            <div class="choose-quantity">
                <label for="quantity">Quantity:</label>
                <input type="number" id="quantity" name="quantity" min="0" v-model="this.userInputNumb">
            </div>
            <div class="choose-value">
                <label for="value-changed">Change Value:</label>
                <select name="value-changed" id="value-changed"
                    v-model="this.changeInputVal"><!--With that i've all the value names-->
                    <option v-for="(currency, index) in currenciesArray" :key="index" :value="index">{{
                        currenciesArray[index] }}
                    </option>
                </select>
            </div>
            <button class="change-btn" @click="changeTheValue(userInputNumb, userInputVal, changeInputVal)">
                Change
            </button>
        </div>
    </div>
</template>
<style lang="scss">
.calculation-change {
    height: 30%;
    display: flex;
    border: 1px solid white;

    .user-input {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 50px;
        font-size: 1.5em;

        .change-btn {
            width: 100px;
            height: 100px;
            background-color: gold;
            border: none;
            cursor: pointer;
            border-radius: 50%;
        }
    }
}
</style>