<template>
<div>
    <div class="card">
        <div class="card-wrapper-icon" :style="cardItem.iconBg">
            <i class="md-icon icon" :class="cardItem.icon"></i>
        </div>
        <span class="card-title">{{cardItem.name}}</span>
    </div>
</div>
</template>

<script>
export default {
    props: ['cardItem']
}
</script>

<style lang="scss" scoped>
@import '../icons/icon.css';
@import '../styles/index.scss';
$cardHeight:80px;
$cardWrapperIcon:100px;
$borderRadius:15px;
$iconSize:70px;
$textSize:18px;
$margin:16px;
.card {
    height: $cardHeight;
    background: $white;
    border-radius: $borderRadius;
    transition: all .5s;
    -webkit-box-shadow: 0px 8px 76px -15px rgba(212, 212, 212, 1);
    -moz-box-shadow: 0px 8px 76px -15px rgba(212, 212, 212, 1);
    box-shadow: 0px 8px 76px -15px rgba(212, 212, 212, 1);
    position: relative; // text-align: right;
    line-height: $cardHeight;
}

.card:hover {
    -webkit-box-shadow: 0px 29px 76px -15px rgba(212, 212, 212, 1);
    -moz-box-shadow: 0px 29px 76px -15px rgba(212, 212, 212, 1);
    box-shadow: 0px 29px 76px -15px rgba(212, 212, 212, 1);
    .card-wrapper-icon {
        transform: translateY(-20px) scale(.7); // transform: scale(.8);
    }
}

.card-title {
    font-size: $textSize;
    float: right;
    line-height: $cardHeight;
    margin-right: $margin;
    transition: all .5s;
}

.card-wrapper-icon {
    width: $cardWrapperIcon;
    height: $cardWrapperIcon;
    background: $pink;
    transition: all .5s;
    border-radius: $borderRadius;
    line-height: $cardWrapperIcon;
    position: absolute;
    top: -10px;
}

.icon {
    color: $white !important;
    font-size: $iconSize !important;
    transition: all .5s;
}

.text {
    color: $red;
}
</style>
