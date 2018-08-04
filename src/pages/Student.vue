<template>
<div>
    <register @clicked="onClickChild"/>
    {{value}}
</div>
</template>

<script>
import Register from './Register';
export default {
    components:{
        Register
    },
    data:()=>({
        value:0
    }),
    methods: {
        onClickChild(rs) {
            return this.value = rs;
        }
    }
}
</script>
