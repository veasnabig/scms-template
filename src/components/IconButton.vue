<template>
<div class="button-wrapper" @click="onClick">
    <div class="icon-wrapper" :style="iconButton.iconBg">
        <i class="md-icon icon" :class="iconButton.icon"/>
    </div>
    <div class="text-wrapper">{{iconButton.text}}</div>
</div>
</template>

<script>
export default {
    props:{
        iconButton:Object,
        onClick: {
            type: Function
        }
    },
}
</script>

<style lang="scss" scoped>
@import "../styles/scss/index";
@import "../icons/icon.css";
$border-raduis:10px;
.button-wrapper {
    width: 170px;
    height: 40px;
    background: $white;
    line-height: 40px;
    margin-left: 10px;
    border-radius: $border-raduis;
    -webkit-box-shadow: 0px 7px 25px -1px rgba(230, 230, 230, 1);
    -moz-box-shadow: 0px 7px 25px -1px rgba(230, 230, 230, 1);
    box-shadow: 0px 7px 25px -1px rgba(230, 230, 230, 1);
    .icon-wrapper {
        width: 50px;
        height: 50px;
        background: linear-gradient($light-grey, $grey);
        margin-top: -5px;
        float: left;
        text-align: center;
        line-height: 50px;
        color: $white;
        border-radius: $border-raduis;
        transition: all .4s;
        .icon{
            font-size: 30px !important;
            transition: all .4s;
        }
    }
    .text-wrapper {
        height: 40;
        float: right;
        text-align: right;
        padding-right: 10px;
        font-family: 'KhmerOSBattambang', Arial, Helvetica, sans-serif;
        transition: all .4s;
        font-size: 15px;
    }
}
.button-wrapper:hover{
    cursor: pointer;
    .icon-wrapper{
        transform: translateY(-5px) scale(.8);   
    }
    .text-wrapper{
        transform: translateX(-10px);
    }
}
</style>
