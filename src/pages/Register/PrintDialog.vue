<template>
<div>
    <md-dialog class="md-scrollbar" :md-active.sync="showPrintDialog" :md-click-outside-to-close='false' :md-close-on-esc='false' @keydown.esc="closeDialog">
        <md-dialog-title class="dialog-title-wrapper">
            <div class="md-layout md-gutter">
                <div class="md-layout-item">
                    <div class="icon-wrapper">
                        <i class="icon icon-print"></i>
                    </div>
                    <span class="dialog-title">បោះពុម្ភបង្កាន់ដៃ</span>
                </div>
                <div class="md-layout-item">
                    <div class="md-toolbar-section-end">
                        <md-button class="md-icon-button" @click="closeDialog">
                            <i class="icon-corss" style="font-size:20px;" />
                        </md-button>
                    </div>
                </div>
            </div>
        </md-dialog-title>

        <div style="padding:20px;">
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-80 md-small-size-100">
                    <md-card>
                        <md-card-header>
                            <!-- <div class="md-title">បង្កាន់ដៃចុះឈ្មោះ</div> -->
                            <div class="md-layout md-gutter">
                                <div class="md-layout-item md-size-20">
                                    <img src="../../assets/H2E-Edu.png" alt="" class="invoice-logo">
                                </div>
                                <div class="md-layout-item md-size-60 invoice-title">បង្កាន់ដៃចុះឈ្មោះ</div>
                                <div class="md-layout-item md-size-20 invoice-barcode">{{registerDoc.id}}</div>
                            </div>
                        </md-card-header>

                        <md-card-content style="margin-top:20px;">
                            <div class="md-layout">
                                <div class="md-layout-item md-size-50">
                                    <div class="md-layout-item invoice-content-header-title">លេខកូដសិស្ស :
                                        <b class="invoice-content-header-value">{{registerDoc.studentDoc.id}}</b>
                                    </div>
                                    <div class="md-layout-item invoice-content-header-title">ឈ្មោះសិស្ស :
                                        <b class="invoice-content-header-value">{{registerDoc.studentDoc.name}}</b>
                                    </div>
                                    <div class="md-layout-item invoice-content-header-title">ភេទ :
                                        <b class="invoice-content-header-value">{{registerDoc.studentDoc.gender}}</b>
                                    </div>
                                </div>
                                <div class="md-layout-item md-size-50">
                                    <div class="md-layout-item invoice-content-header-title" style="text-align:right;">កាលបរិច្ឆេទ :
                                        <b class="invoice-content-header-value" style="text-align:right;">{{registerDoc.date}}</b>
                                    </div>
                                    <div class="md-layout-item invoice-content-header-title" style="text-align:right;">វគ្គសិក្សា :
                                        <b class="invoice-content-header-value" style="text-align:right;">{{registerDoc.coursesDoc.name}}</b>
                                    </div>
                                </div>
                            </div>
                            <div class="md-layout">
                                <div class="md-layout-item">
                                    <md-table>
                                        <md-table-row>
                                            <md-table-head md-numeric>រ.ល</md-table-head>
                                            <md-table-head>មុខវិជ្ជា</md-table-head>
                                            <md-table-head>តម្លៃ</md-table-head>
                                        </md-table-row>
                                        <md-table-row v-for="item in registerDoc.coursesDoc.subjectDoc" :key="item.key">
                                            <md-table-cell md-numeric>{{item.id}}</md-table-cell>
                                            <md-table-cell>{{item.name}}</md-table-cell>
                                            <md-table-cell>$ {{item.price}}</md-table-cell>
                                        </md-table-row>
                                        <md-table-row style="background:#f0f6ff;">
                                            <md-table-cell md-numeric></md-table-cell>
                                            <md-table-cell>សរុប</md-table-cell>
                                            <md-table-cell><b>$ {{this.total()}}</b></md-table-cell>
                                        </md-table-row>
                                    </md-table>
                                </div>
                            </div>
                            <div class="md-layout">
                                <div class="md-layout-item md-size-60 cashier"></div>
                                <div class="md-layout-item md-size-33 cashier">
                                    អ្នកទទួលប្រាក់
                                </div>
                                <div class="md-layout-item md-size-60 cashier"></div>
                                <div class="md-layout-item md-size-33 cashier">
                                    <b class="cashier-name">Admin</b>
                                </div>
                            </div>
                        </md-card-content>
                    </md-card>
                </div>
                <div class="md-layout-item md-size-20 md-small-size-100">
                    <icon-button :iconButton="iconButton.buttonPrint" :onClick="printArea" />
                </div>
            </div>
        </div>

        <vue-snotify v-show="showNotify==true" />
        <!-- v-show="showNotify==true"  -->
    </md-dialog>

</div>
</template>

<script>
import {
    colors
} from "@/styles/colors.js";
import searchByName from '@/lib/searchByName.js';
import VueDatepicker from '@/components/VueDatepicker';
import increaseId from "@/lib/increaseId.js";
import ScmsCard from "@/components/SCMSCard";
import IconButton from "@/components/IconButton";
import {
    validationMixin
} from "vuelidate";
import {
    required,
    email,
    minLength,
    maxLength
} from "vuelidate/lib/validators";
export default {
    components: {
        ScmsCard,
        IconButton,
        VueDatepicker
    },
    props: [
        "showPrintDialog",
        "cardItem",
        "printItem",
        "type",
        "registerItem"
    ],
    data: () => ({
        showNotify: false,
        iconButton: {
            buttonPrint: {
                text: "បោះពុម្ពបង្កាន់ដៃ",
                icon: "icon-print",
                iconBg: {
                    background: `linear-gradient(${colors.lightTeal}, ${colors.teal})`
                }
            },
        },
        registerDoc: {
            id: "",
            date: "",
            coursesDoc: {
                name: "",
                subjectDoc: []
            },
            studentDoc: {
                id: "",
                name: "",
                gender: ""
            }
        }
    }),
    watch: {
        registerItem(val) {
            if (!!val) {
                this.getRegisterDoc(val)
            }
        }
    },
    methods: {
        getRegisterDoc(val) {
            this.registerDoc = {
                id: val.id,
                date: val.date,
                studentDoc: val.studentDoc,
                coursesDoc: {
                    name: val.coursesDoc.name,
                    subjectDoc: val.coursesDoc.subjectDoc
                }
            };
        },
        total(){
            let subjectDoc=this.registerDoc.coursesDoc.subjectDoc;
            let rs=0;
            if(!!subjectDoc.length>0){
                subjectDoc.map((o)=>{
                    rs +=o.price;
                })
            }
            return rs;
        },
        closeDialog() {
            this.$emit("closeDialog", !this.showPrintDialog);
        },
        printArea() {}
    },
};
</script>

<style lang="scss" scoped>
@import "../../icons/icon.css";
@import "../../styles/scss/index";
.md-dialog {
    border-radius: 12px;
    width: 70%;
    max-height: 75%;
    max-width: none !important;
    overflow-y: scroll; // max-height: none !important;
}

.dialog-title-wrapper {
    height: 100px;
    -webkit-box-shadow: 0px 13px 35px -24px rgba(204, 204, 204, 1);
    -moz-box-shadow: 0px 13px 35px -24px rgba(204, 204, 204, 1);
    box-shadow: 0px 13px 35px -24px rgba(204, 204, 204, 1); // margin-top: -20px;
    .icon-wrapper {
        width: 80px;
        height: 80px;
        position: absolute;
        top: 10px;
        .icon {
            font-size: 80px !important;
        }
    }
    .dialog-title {
        margin-left: 100px;
        line-height: 50px;
        font-family: "khPreyVeng";
    }
}

.invoice-title {
    font-family: 'KhmerOSMuolLight', Arial, Helvetica, sans-serif;
    font-size: 20px;
    text-align: center;
    margin-top: 20px;
}

.invoice-logo {
    margin-top: 20px;
}

.invoice-barcode {
    font-family: 'Barcode', Arial, Helvetica, sans-serif;
    font-size: 50px;
    text-align: center;
    margin-top: 50px;
}

.invoice-content-header-title {
    font-family: 'KhmerOSBattambang', Arial, Helvetica, sans-serif;
    font-size: 15px;
    margin-top: 10px;
}

.invoice-content-header-value {
    font-family: 'KhmerOSBattambang', Arial, Helvetica, sans-serif; // font-size: 16px;
    margin-top: 10px;
}

.cashier {
    font-family: 'KhmerOSBattambang', Arial, Helvetica, sans-serif;
    text-align: center;
    margin-top: 20px;
}

.cashier-name {
    font-family: 'KhmerOSBattambang', Arial, Helvetica, sans-serif;
    text-align: center;
    font-size: 18px;
}

#print {
    background: $white !important;
}

@media print {
    body {
        background: green !important;
    }
}
</style>
