<template>
<div class="md-transparent md-toolbar-row">
    <div class="md-toolbar-section-start">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
            <md-icon>menu</md-icon>
        </md-button>
        <md-button class="md-icon-button md-dense" @click="toggleMenu" v-else>
            <md-icon>menu</md-icon>
        </md-button>
        <h3 class="title">ប្រព័ន្ធគ្រប់គ្រងការបណ្តុះបណ្តាលវគ្គខ្លី</h3>
    </div>
    <div class="md-toolbar-section-end">
        <md-menu md-direction="bottom-end">
            <md-badge md-content="1" md-menu-trigger>
                <md-button class="md-icon-button">
                    <md-icon>notifications</md-icon>
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
                <md-menu-item>My Item 1</md-menu-item>
                <md-menu-item>My Item 2</md-menu-item>
                <md-menu-item>My Item 3</md-menu-item>
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
        }
    }
}
</script>

<style lang="scss" scoped>
    .title{
        font-family: 'KhmerOSMuolpali'
    }
</style>
