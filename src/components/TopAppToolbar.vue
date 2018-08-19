<template>
<div class="md-transparent md-toolbar-row">
    <div class="md-toolbar-section-start">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
            <i class="md-icon icon-menu"></i>
        </md-button>
        <md-button class="md-icon-button md-dense" @click="toggleMenu" v-else>
            <i class="md-icon icon-menu"></i>
        </md-button>
        <h3 class="title">ប្រព័ន្ធគ្រប់គ្រងការបណ្តុះបណ្តាលវគ្គខ្លី</h3>
    </div>
    <div class="md-toolbar-section-end">
        <md-menu md-direction="bottom-end">
            <md-badge md-content="1" md-menu-trigger>
                <md-button class="md-icon-button">
                    <i class="md-icon icon-notification"></i>
                </md-button>
            </md-badge>
            <md-menu-content style="margin-top:50px;">
                <md-menu-item>My Item 1</md-menu-item>
                <md-menu-item>My Item 2</md-menu-item>
                <md-menu-item>My Item 3</md-menu-item>
            </md-menu-content>
        </md-menu>

        <md-menu md-direction="bottom-end" style="margin-left:20px;currsor:pointer">
            <md-avatar md-menu-trigger>
                <img src="../assets/avatar.png" alt="People">
            </md-avatar>
            <md-menu-content style="margin-top:50px;">
                <md-menu-item @click="logout" class="signout-item">ចាកចេញ</md-menu-item>
            </md-menu-content>
        </md-menu>
    </div>
</div>
</template>

<script>
export default {
    data: () => ({
        menuVisible: false
    }), 
    methods: {
        toggleMenu() {
            this.$emit('toggleMenu',this.menuVisible)
        },
        logout(){
            this.$store.commit("logout");
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../icons/icon.css';
    .title{
        font-family: 'KhmerOSMuolpali'
    }
    .signout-item{
        font-family: 'KhmerOSBattambang'
    }
</style>
