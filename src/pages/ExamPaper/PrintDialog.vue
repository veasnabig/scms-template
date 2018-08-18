<template>
<div>
    <md-dialog class="md-scrollbar" :md-active.sync="showPrintDialog" :md-click-outside-to-close='false' :md-close-on-esc='false' @keydown.esc="closeDialog">
        <md-dialog-title class="dialog-title-wrapper">
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-50">
                    <div class="icon-wrapper">
                        <i class="icon icon-exam-paper"></i>
                    </div>
                    <span class="dialog-title">បោះពុម្ភវិញ្ញសារប្រឡង</span>
                </div>
                <div class="md-layout-item md-size-50">
                    <div class="md-toolbar-section-end">
                        <md-button class="md-icon-button" @click="closeDialog">
                            <i class="icon-corss" style="font-size:20px;"></i>
                        </md-button>
                    </div>
                </div>
            </div>
        </md-dialog-title>
        <div style="padding:20px;">
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-80">
                    <md-card>
                        <md-card-header style="text-align:center;">
                            <div class="md-title exam-header-title">វិញ្ញសារប្រឡងបញ្ចប់វគ្គ</div>
                            <div class="md-title exam-subject">មុខវិជ្ជាៈ <b>{{printDoc.subjectDoc.name}}</b></div>
                            <div class="md-title exam-subject">រយៈពេលៈ <b>{{printDoc.duration}}</b></div>
                        </md-card-header>
                        <md-card-content>
                            <div class="md-layout md-gutter" style="margin-bottom:10px;">
                                <div class="md-layout-item">
                                    <span class="exam-description">
                                        សូមគូស <i class="md-icon icon-accept"/> នៅមុខចម្លើយត្រឹមត្រូវ
                                    </span>
                                </div>
                            </div>
                            <div class="md-layout md-gutter" v-for="exam,key in printDoc.examDoc" :key="key" style="margin-bottom:10px;">
                                <div class="md-layout-item md-size-100 exam-question">{{key+1}}. {{exam.question}}</div>
                                <div class="md-layout-item" v-for="opt,key in exam.choice" style="margin-top:-5px;">
                                    <span class="md-layout-item md-size-25 choice-answer">
                                        <md-checkbox></md-checkbox>{{opt.item}}
                                        </span>
                                </div>
                            </div>
                        </md-card-content>
                    </md-card>
                </div>
                <div class="md-layout-item md-size-20">
                    <icon-button :iconButton="iconButton.buttonPrint" :onClick="closeDialog" />
                </div>
            </div>
        </div>

        <div class="md-layout md-gutter" style="padding:20px;">
            <div class="md-layout-item">
                <div class="md-toolbar-section-end">
                    <!-- <icon-button :iconButton="iconButton.buttonSave" :onClick="closeDialog" /> -->
                </div>
            </div>
        </div>

        <vue-snotify v-show="showNotify==true" />
    </md-dialog>

</div>
</template>

<script>
import {
    colors
} from "@/styles/colors.js";
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
        IconButton
    },
    props: {
        showPrintDialog: Boolean,
        cardItem: Object,
        printItem: Object
    },
    watch: {
        printItem(val) {
            if (!!val) {
                this.getRegisterDoc(val)
            }
        }
    },
    data: () => ({
        showNotify: false,
        iconButton: {
            buttonPrint: {
                text: "បោះពុម្ភវិញ្ញសារ",
                icon: "icon-print",
                iconBg: {
                    background: `linear-gradient(${colors.lightTeal}, ${colors.teal})`
                }
            }
        },
        printDoc: {
            name: null,
            duration: null,
            totalScore: null,
            subjectDoc: {
                id:"",
                name:""
            },
            examDoc: [{
                question:"",
                choice:[]
            }]
        }
    }),
    watch: {
        printItem(props) {
            if (!!props) {
                this.getPropPrint(props);
            }
        }
    },
    methods: {
        getPropPrint(val) {
            if (!!val) {
                this.printDoc = {
                    name: val.name,
                    duration: val.duration,
                    totalScore: val.totalScore,
                    subjectDoc: val.subjectDoc,
                    examDoc: val.examDoc
                }
            }

        },
        clearForm() {

        },
        snotify(title, content) {
            this.$snotify.success(content, title, {
                timeout: 800,
                showProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true
            });
        },
        closeDialog() {
            this.$emit("closeDialog", !this.showPrintDialog);
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../icons/icon.css";
@import "../../styles/scss/index";
.md-dialog {
    border-radius: 12px;
    width: 80%;
    max-width: none;
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
        font-family: "khPreyVeng"; // background: -webkit-linear-gradient(#eee, #333);
        // -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
    }
}

.exam-header-title {
    font-family: 'KhmerOSMuolLight', Arial, Helvetica, sans-serif;
    font-size: 20px;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
}

.exam-subject {
    font-family: 'KhmerOSBattambang', Arial, Helvetica, sans-serif;
    font-size: 16px;
}
.exam-question{
    font-family: 'KhmerOSBattambang', Arial, Helvetica, sans-serif;
    font-size: 16px;
}
.exam-choice-answer{
    font-family: 'KhmerOSBattambang', Arial, Helvetica, sans-serif;
    font-size: 15px;
}
.exam-description{
    font-family: 'KhmerOSBattambang', Arial, Helvetica, sans-serif;
    font-size: 16px;
}
</style>
