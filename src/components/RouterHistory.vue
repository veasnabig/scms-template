<template>
<div class="md-transparent md-toolbar-row md-toolbar-row-modify" style="margin-bottom:30px;">
    <div class="md-toolbar-section-start">

        <!-- route-history -->
        <span v-for="route,key in routeLinks" :key="key" class="wrapper-router-history-btn">
            <md-button 
            class="md-button-text"
            :to="route.path"
            :class="{activeRouteColor:route.path == path}"
            >{{route.name}}</md-button>
            <md-button @click="removeRouteHistory(route)" class="md-icon-button md-icon-button-close">
                <md-icon 
                style="color:#fff;" 
                class="md-icon-modify"
                >close</md-icon>
            </md-button>
        </span>
        <!-- @click="clickRoute(key)" -->

        <!-- close-all -->
        <span style="position:absolute;right:0;">
            <md-button @click="removeAllRouteHistory" class="md-accent md-raised md-button-modify md-button-text">សម្អាត</md-button>
        </span>

    </div>
</div>
</template>

<script>
import {
    store
} from '../store/store.js'
export default {
    data: () => ({
        selected: '/',
        path: ''
    }),
    computed: {
        routeLinks() {
            return this.$store.getters.getRoute;
        },
    },
    watch: {
        $route(route) {
            this.path = route.path;
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
        clickRoute(key) {
            this.selected = key;
        }
    }
}
</script>

<style lang="scss" scoped>
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

.activeRouteColor {
    background: #041723 !important;
    border-radius: 10px;
    color: #fff !important;
    transition: all .5s;
}

.md-button-text {
    font-family: 'KhPreyVeng';
    font-size: 15px;
    background: #ecf0f1;
    border-radius: 10px;
    transition: all .5s;
    color: #041723;
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
