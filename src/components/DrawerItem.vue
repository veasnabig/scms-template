<template>
<div>
    <md-list style="background: transparent;" v-for="item,key in drawerItems" :key="key">
        <md-list-item :to='item.path' @click="selected = key" :class="{activeRouteBg:key == selected}">
            <!-- <md-icon :class="{activeRouteColor:key == selected,item.icon}" style="color:#fff;"></md-icon> -->
            <i class="drawer-icon md-icon" :class="item.icon"></i>
            <span :class="{activeRouteColor:key == selected}" class="md-list-item-text">{{item.name}}</span>
        </md-list-item>
    </md-list>
</div>
</template>

<script>
export default {
    data: () => ({
        selected: 0,
        drawerItems: [{
                name: "ផ្ទាំងគ្រប់គ្រង",
                icon: "icon-student",
                path: "/"
            },
            {
                name: "សិស្ស",
                icon: "icon-student",
                path: "/student"
            },
            {
                name: "ការកំណត់",
                icon: "icon-setting",
                path: "/setting"
            }
        ]
    }),
    methods: {}
};
</script>

<style lang="scss" scoped>
@import "../styles/index";
@import '../icons/icon.css';
$iconSize:40px;
.drawer-icon {
    color: $white;
    font-size: $iconSize !important;
}

.activeRouteColor {
    color: #0099b0;
}

.activeRouteBg {
    background-color: #0099b0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
}

.md-list-item-text {
    color: #fff;
    font-size: 20px;
    padding:10px;
    font-family: 'KhPreyVeng';
}

.md-list.md-theme-default .md-list-item-container:not(.md-list-item-default):not([disabled]):hover {
    background-color: rgba(3, 163, 255, 0.12);
    /* background-color: var(--md-theme-default-divider-on-background, rgba(0,0,0,0.12)); */
    color: rgba(0, 0, 0, 0.87);
    border-radius: 10px;
    /* color: var(--md-theme-default-text-primary-on-background, rgba(0,0,0,0.87)); */
}

.md-list-item-container:not(.md-list-item-default):not([disabled]) {
    border-radius: 10px;
}
</style>
