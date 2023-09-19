import { reactive } from 'vue';
export const store = reactive({
    mainUrl: 'https://api.frankfurter.app',
    resultChange: 0,
    userQuantity: 0,
    userValue: '',
    changeValue: '',
    resultShowed: false,
    weeklyValues: {},
    today: '',
    firstOfTheWeek: ''
});