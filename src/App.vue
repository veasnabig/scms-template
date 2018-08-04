<template>
<div id="app">
    <md-app md-mode='fixed' style="background:transparent;">
        <!-- toolbar -->
        <md-app-toolbar md-elevation="0">
            <top-app-toolbar @toggleMenu="toggleMenu" />
        </md-app-toolbar>

        <!-- drawer -->
        <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
            <drawer-logo/>
            <drawer-item/>
        </md-app-drawer>

        <md-app>
            <md-app-toolbar>

            </md-app-toolbar>
        </md-app>

        <!-- content -->
        <md-app-content class="content-wrapper">
            <router-history/>
            <router-view/>

        </md-app-content>
    </md-app>

</div>
</template>

<script>
import DrawerItem from '@/components/DrawerItem';
import DrawerLogo from '@/components/DrawerLogo';
import TopAppToolbar from '@/components/TopAppToolbar';
import RouterHistory from '@/components/RouterHistory';

export default {
    components: {
        DrawerItem,
        DrawerLogo,
        TopAppToolbar,
        RouterHistory
    },
    name: "App",
    data: () => ({
        menuVisible: false
    }),
    methods: {
        toggleMenu() {
            this.menuVisible = !this.menuVisible;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine";

$appDrawerBgColor: rgba(4, 23, 35, 0.8);
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.md-app {
    height: 100vh;
}

.md-toolbar {
    background: transparent;
}

.content-wrapper {
    // -webkit-box-shadow: 0px -8px 33px -7px rgba(232, 232, 232, 1);
    // -moz-box-shadow: 0px -8px 33px -7px rgba(232, 232, 232, 1);
    // box-shadow: 0px -8px 33px -7px rgba(232, 232, 232, 1);
    //    -webkit-box-shadow: 0px -23px 21px -27px rgba(207,207,207,1);
    // -moz-box-shadow: 0px -23px 21px -27px rgba(207,207,207,1);
    // box-shadow: 0px -23px 21px -27px rgba(207,207,207,1);
    -webkit-box-shadow: 0px -23px 49px -40px rgba(204, 204, 204, 1);
    -moz-box-shadow: 0px -23px 49px -40px rgba(204, 204, 204, 1);
    box-shadow: 0px -23px 49px -40px rgba(204, 204, 204, 1);
}

.md-drawer {
    width: 260px;
    height: 100vh;
    max-width: calc(100vw - 125px);
    background: url("./assets/side-bar.jpg") no-repeat;
    background-size: cover;
    background-position: 50%;
}

.md-drawer.md-persistent-mini.md-left {
    border-right: none;
}

.md-drawer:after {
    position: absolute;
    content: " ";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -10;
    background-color: $appDrawerBgColor;
}

.drawer-bg {
    // background: $appDrawerBgColor;
    // height: 100vh; 
}

.svg {
    font-size: 3rem;
    font-weight: 700;
    max-width: 250px;
}

.logo {
    position: relative;
    display: inline-block;
}
</style>
