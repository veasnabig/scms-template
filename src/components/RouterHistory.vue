<template>
<div class="md-transparent md-toolbar-row md-toolbar-row-modify" style="margin-bottom:30px;">
    <div class="md-toolbar-section-start">  

        <!-- route-history -->
        <span v-for="route,key in routeLinks" :key="key" class="wrapper-router-history-btn">
            <md-button 
            class="md-button-text"
            :to="route.path"
            
            :class="{activeRouteColor:key == selected}"
            >{{route.name}}</md-button>
            <md-button @click="removeRouteHistory(route)" class="md-icon-button md-icon-button-close">
                <md-icon 
                style="color:#fff;" 
                class="md-icon-modify"
                >close</md-icon>
            </md-button>
        </span>

        <!-- close-all -->
        <span style="position:absolute;right:0;">
            <md-button @click="removeAllRouteHistory" class="md-accent md-raised md-button-modify md-button-text">សម្អាត</md-button>
        </span>
        <!-- class="md-primary md-raised md-button-modify" -->

    </div>
</div>
</template>

<script>
import {
    store
} from '../store/store.js'
export default {
    data: () => ({
        selected: 0,
        path: ''
    }),
    computed: {
        routeLinks() {
            return this.$store.getters.getRoute;
        },
    },
    watch: {
        $route(route) {
            this.$store.commit("addRouteHistory", route);
        }
    },
    methods: {
        removeRouteHistory(route) {
            this.$store.commit("removeRouteHistory", route);
        },
        removeAllRouteHistory() {
            this.$store.commit("removeAllRouteHistory")
        },
    }
}
</script>

<style lang="scss" scoped>
.activeRouteColor {
    background: #0099b0;
}

.wrapper-router-history-btn {
    margin-right: -20px;
}

.md-toolbar-row-modify {
    -webkit-box-shadow: 0px 13px 35px -24px rgba(204, 204, 204, 1);
    -moz-box-shadow: 0px 13px 35px -24px rgba(204, 204, 204, 1);
    box-shadow: 0px 13px 35px -24px rgba(204, 204, 204, 1); // margin-top: -20px;
    margin-top: -16px;
}

.md-icon-modify {
    width: 20px;
    height: 20px;
    color: #fff;
    background: #ff5252;
    border-radius: 50%;
    border: 1.5px solid #fff;
    padding: 10px;
}
.md-button-text{
    font-family: 'KhPreyVeng';
    font-size: 18px;
}
.md-icon-button-close {
    margin-left: -30px;
    margin-top: -15px;
}

.md-icon {
    font-size: 10px !important;
}

.md-button-modify {
    height: 30px;
    border-radius: 8px;
}

.md-button:not([disabled]) {
    box-shadow: none;
}
</style>
