<script>
import CalculationChange from './components/CalculationChange.vue';
import GraphChange from './components/GraphChange.vue';
import ValueChange from './components/ValueChange.vue';
export default {
    components: {
        ValueChange,
        GraphChange,
        CalculationChange
    }
}
</script>

<template>
    <div class="my-container">
        <ValueChange />
        <GraphChange />
        <CalculationChange />
    </div>
</template>

<style scoped lang="scss">
.my-container {
    width: 100%;
    height: 100vh;
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
}
</style>
