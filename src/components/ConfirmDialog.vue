<template>
<div>
    <md-dialog :md-active.sync="showConfirmDialog" :md-click-outside-to-close='false' :md-close-on-esc='false' @keydown.esc="closeDialog">
        <md-dialog-title class="dialog-title-wrapper">
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-100">
                    <div class="icon-wrapper">
                        <i class="md-icon icon icon-warning"></i>
                    </div>
                </div>
            </div>
        </md-dialog-title>

        <div class="md-layout-item md-size-100 md-small-size-100" style="padding-left:20px;padding-right:20px;">
            <h2 class="dialog-content">តើអ្នកប្រាកដទេថាលុបទិន្ន័យនេះ?</h2>
        </div>

        <div class="md-layout md-gutter" style="padding:30px;padding-bottom:40px;">
            <div class="md-layout-item md-size-50 md-toolbar-section-start">
                <icon-button :iconButton="iconButton.buttonDeny" :onClick="closeDialog" />
            </div>
            <div class="md-layout-item md-size-50 md-toolbar-section-end">
                <icon-button :iconButton="iconButton.buttonSave" :onClick="handleAccept" />
            </div>
        </div>
    </md-dialog>

</div>
</template>

<script>
import {
    colors
} from '@/styles/colors.js';
import IconButton from './IconButton';
export default {
    props: ["showConfirmDialog"],
    components: {
        IconButton
    },
    data: () => ({
        iconButton: {
            buttonSave: {
                text: 'បាទ/ចាស',
                icon: 'icon-accept',
                iconBg: {
                    background: `linear-gradient(${colors.lightBlue}, ${colors.blue})`
                }
            },
            buttonDeny: {
                text: 'អត់ទេ',
                icon: 'icon-deny',
                iconBg: {
                    background: `linear-gradient(${colors.lightRed}, ${colors.red})`
                }
            }
        },
        accept:false
    }),
    methods: {
        handleAccept(){
            this.$emit("handleAccept",!this.accept);
        },
        closeDialog() {
            this.$emit("closeDialog", !this.showConfirmDialog);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../icons/icon.css";
@import "../styles/scss/index";
.dialog-content{
    text-align: center;
    font-family: 'Dangrek',Arial, Helvetica, sans-serif;
    font-size: 20px;
}
.md-dialog {
    border-radius: 12px;
    // width: 65vh;
}

.dialog-title-wrapper {
    height: 80px;
    -webkit-box-shadow: 0px 13px 35px -24px rgba(204, 204, 204, 1);
    -moz-box-shadow: 0px 13px 35px -24px rgba(204, 204, 204, 1);
    box-shadow: 0px 13px 35px -24px rgba(204, 204, 204, 1);
    padding: 0 !important;
    .icon-wrapper {
        height: 80px;
        line-height: 80px;
        text-align: center;
        .icon {
            color: $yellow;
            font-size: 70px !important;
        }
    }
    .dialog-title {
        margin-left: 100px;
        line-height: 50px;
        font-family: 'khPreyVeng'; // background: -webkit-linear-gradient(#eee, #333);
        // -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
    }
}
</style>
