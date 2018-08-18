<template>
<div>
    <md-dialog class="md-scrollbar" :md-active.sync="showExamPaperDialog" :md-click-outside-to-close='false' :md-close-on-esc='false' @keydown.esc="closeDialog">
        <md-dialog-title class="dialog-title-wrapper">
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-50">
                    <div class="icon-wrapper">
                        <i class="icon" :class="cardItem.icon"></i>
                    </div>
                    <span class="dialog-title">{{cardItem.name}}</span>
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
            <div class="md-layout md-gutter" style="margin-top:-30px;">
                <div class="md-layout-item md-size">
                    <md-autocomplete v-model="value" :md-options="subject" @md-selected="selectedValue(value)" @md-changed="getSubject" @md-opened="getSubject">
                        <label class="md-label">ជ្រើសរើសមុខវិជ្ជា</label>
                        <template slot="md-autocomplete-item" slot-scope="{ item }">{{ item.name }}</template>
                    </md-autocomplete>
                </div>
                <div class="md-layout-item md-size">
                    <md-field>
                        <label class="md-label">ឈ្មោះវិញ្ញាសារ</label>
                        <md-input/>
                    </md-field>
                </div>
                <div class="md-layout-item">
                    <md-field>
                        <label class="md-label">រយៈពេល</label>
                        <md-input/>
                    </md-field>
                </div>
                <div class="md-layout-item">
                    <md-field>
                        <label class="md-label">ពិន្ទុសរុប</label>
                        <md-input/>
                    </md-field>
                </div>
            </div>
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-50">
                    <md-field>
                        <label class="md-label">សំណួរ</label>
                        <md-input v-model="form.question" />
                    </md-field>
                </div>
            </div>
            <div class="md-layout md-gutter">
                <div class="md-layout-item">
                    <md-field>
                        <label class="md-label">ជម្រើស១</label>
                        <md-input v-model="form.opt1" />
                    </md-field>
                </div>
                <div class="md-layout-item">
                    <md-field>
                        <label class="md-label">ជម្រើស២</label>
                        <md-input v-model="form.opt2" />
                    </md-field>
                </div>
                <div class="md-layout-item">
                    <md-field>
                        <label class="md-label">ជម្រើស៣</label>
                        <md-input v-model="form.opt3" />
                    </md-field>
                </div>
                <div class="md-layout-item">
                    <md-field>
                        <label class="md-label">ជម្រើស៤</label>
                        <md-input v-model="form.opt4" />
                    </md-field>
                </div>
                <div class="md-layout-item" style="margin-top:20px;">
                    <md-button class="md-icon-button md-raised md-primary" @click="addQuestion">
                        <md-icon>
                            <i class="md-icon icon-add" />
                        </md-icon>
                    </md-button>
                </div>
            </div>
        </div>

        <div class="md-layout md-gutter" style="padding:20px;">
            <div class="md-layout-item">
                <md-table v-model="question" md-card style="height:30vh;">
                    <md-table-row>
                        <md-table-head>សំណួរ</md-table-head>
                        <md-table-head>ជម្រើស១</md-table-head>
                        <md-table-head>ជម្រើស២</md-table-head>
                        <md-table-head>ជម្រើស៣</md-table-head>
                        <md-table-head>ជម្រើស៤</md-table-head>
                        <md-table-head>សកម្មភាព</md-table-head>
                    </md-table-row>

                    <md-table-row v-for="item,key in question" :key="key">
                        <md-table-cell>{{item.question}}</md-table-cell>
                        <md-table-cell>{{item.opt1}}</md-table-cell>
                        <md-table-cell>{{item.opt2}}</md-table-cell>
                        <md-table-cell>{{item.opt3}}</md-table-cell>
                        <md-table-cell>{{item.opt4}}</md-table-cell>
                        <md-table-cell>
                            <md-button class="md-icon-button md-raised md-accent" @click="deleteQuestion(key)">
                                <md-icon>
                                    <i class="md-icon icon-delete" />
                                </md-icon>
                            </md-button>
                        </md-table-cell>
                    </md-table-row>

                </md-table>
            </div>
        </div>

        <div class="md-layout md-gutter" style="padding:20px;">
            <div class="md-layout-item">
                <div class="md-toolbar-section-end">
                    <icon-button :iconButton="iconButton.buttonSave" :onClick="closeDialog" />
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
        showExamPaperDialog: Boolean,
        cardItem: Object,
    },
    data: () => ({
        form: {
            question: "",
            opt1: "",
            opt2: "",
            opt3: "",
            opt4: ""
        },
        value: null,
        showNotify: false,
        iconButton: {
            buttonSave: {
                text: "រក្សាទុក",
                icon: "icon-save",
                iconBg: {
                    background: `linear-gradient(${colors.lightBlue}, ${colors.blue})`
                }
            },
            buttonReset: {
                text: "កំណត់ឡើងវិញ",
                icon: "icon-reset",
                iconBg: {
                    background: `linear-gradient(${colors.lightTeal}, ${colors.teal})`
                }
            }
        },
        subject: [],
        question: []
    }),
    computed: {
        getIncreaseExamPaperId() {
            const id = this.$store.getters.getIncreaseExamPaperId;
            return increaseId(id);
        },
        subjectList() {
            return this.$store.getters.getSubject;
        },
    },
    watch: {
        examPaperItem(props) {
            if (!!props) {
                this.getPropExamPaper(props);
            }
        }
    },
    methods: {
        clearForm() {
            this.form = {
                question: "",
                opt1: "",
                opt2: "",
                opt3: "",
                opt4: ""
            }
        },
        snotify(title, content) {
            this.$snotify.success(content, title, {
                timeout: 800,
                showProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true
            });
        },
        selectedValue(val) {
            if (!!val) {
                this.value = val.name;
            }
        },
        getSubject(searchTerm) {
            this.subject = new Promise(resolve => {
                window.setTimeout(() => {
                    if (!searchTerm) {
                        resolve(this.subjectList)
                    } else {
                        const term = searchTerm.toString().toLowerCase()
                        resolve(this.subjectList.filter(({
                            name
                        }) => name.toString().toLowerCase().includes(term)))
                    }
                }, 500)
            })
        },
        addQuestion() {
            this.question.push(this.form);
            this.clearForm();
        },
        deleteQuestion(key) {
            this.question.splice(this.question.indexOf(key), 1);
        },
        closeDialog() {
            this.question = [];
            this.$emit("closeDialog", !this.showExamPaperDialog);
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
</style>
