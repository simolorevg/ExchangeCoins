<script>
import { store } from '../store';
export default {
    components: {
        store
    },
    data() {
        return {
            store
        }
    }
}
</script>
<template>
    <div class="value-change">
        <div v-if="!store.resultShowed">Enter the currencies and quantity (even 0) down below, to perform the conversion
        </div>
        <div v-else>
            {{ store.userQuantity }} {{ store.userValue }} = {{ store.resultChange }} {{ store.changeValue }}
        </div>
    </div>
</template>
<style lang="scss" scoped>
.value-change {
    height: 10%;
    border: 1px solid Red;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
}
</style>