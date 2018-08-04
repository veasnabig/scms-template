<template>
    <div>
        <input type="number" v-model="valueA"><br>
        <input type="number" v-model="valueB">
        <button @click="onClickButton">Click Me</button>
    </div>
</template>

<script>
export default {
    data:()=>({
        valueA:0,
        valueB:0,
        rs:0
    }),
    methods: {
        onClickButton() {
            this.rs= this.valueA+this.valueB;
            this.$emit('clicked', this.rs)
        }
    }
}
</script>
