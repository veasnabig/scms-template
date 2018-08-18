<template>
<div>
    <md-dialog class="md-scrollbar" :md-active.sync="showExamScoreDialog" :md-click-outside-to-close='false' :md-close-on-esc='false' @keydown.esc="closeDialog">
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
                    <md-autocomplete v-model="coursesValue" :md-options="courses" @md-selected="selectedCoursesValue(coursesValue)" @md-changed="getCourses" @md-opened="getCourses">
                        <label class="md-label">ជ្រើសរើសវគ្គសិក្សា</label>
                        <template slot="md-autocomplete-item" slot-scope="{ item }">{{ item.name }}</template>
                    </md-autocomplete>
                </div>
                <div class="md-layout-item md-size">
                    <md-autocomplete v-model="subjectValue" :md-options="subject" @md-selected="selectedSubjectValue(subjectValue)" @md-changed="getSubject" @md-opened="getSubject">
                        <label class="md-label">ជ្រើសរើសមុខវិជ្ជា</label>
                        <template slot="md-autocomplete-item" slot-scope="{ item }">{{ item.name }}</template>
                    </md-autocomplete>
                </div>
            </div>
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-100">
                    <md-table v-model="searched" md-card style="height:45vh;">
                        <md-table-toolbar>
                            <div class="md-layout-item">
                            </div>
                            <div class="md-layout-item md-size-33">
                                <md-field md-clearable class="md-toolbar-section-end">
                                    <md-input placeholder="ស្វែងរកសិស្ស..." v-model="search" @input="searchOnTable" />
                                </md-field>
                            </div>
                        </md-table-toolbar>
                        <md-table-row slot="md-table-row" slot-scope="{ item }">
                            <md-table-cell md-label="លេខសម្គាល់" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
                            <md-table-cell md-label="ឈ្មោះសិស្ស" md-sort-by="studentDoc.name">{{ item.studentDoc.name }}</md-table-cell>
                            <md-table-cell md-label="ភេទ" md-sort-by="studentDoc.gender">{{ item.studentDoc.gender }}</md-table-cell>
                            <md-table-cell md-label="មុខវិជ្ជា" md-sort-by="subject">{{ item.subject }}</md-table-cell>
                            <md-table-cell md-label="ពិន្ទុ">
                                <md-field style="margin:0;">
                                    <label for="last-name">0</label>
                                    <md-input/>
                                </md-field>
                            </md-table-cell>
                        </md-table-row>
                    </md-table>
                </div>
            </div>
        </div>

        <div class="md-layout md-gutter" style="padding:20px;">
            <div class="md-layout-item">

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
        showExamScoreDialog: Boolean,
        cardItem: Object,
    },
    data: () => ({
        subjectValue: null,
        coursesValue: null,
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
        courses: [],
        search: null,
        searched: [],
    }),
    computed: {
        subjectList() {
            return this.$store.getters.getSubject;
        },
        coursesList() {
            return this.$store.getters.getCourses;
        },
        examScore() {
            return this.$store.getters.getExamScore;
        }
    },
    watch: {},
    methods: {
        clearForm() {},
        snotify(title, content) {
            this.$snotify.success(content, title, {
                timeout: 800,
                showProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true
            });
        },
        selectedSubjectValue(val) {
            if (!!val) {
                this.subjectValue = val.name;
            }
        },
        selectedCoursesValue(val) {
            if (!!val) {
                this.coursesValue = val.name;
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
        getCourses(searchTerm) {
            this.courses = new Promise(resolve => {
                window.setTimeout(() => {
                    if (!searchTerm) {
                        resolve(this.coursesList)
                    } else {
                        const term = searchTerm.toString().toLowerCase()
                        resolve(this.coursesList.filter(({
                            name
                        }) => name.toString().toLowerCase().includes(term)))
                    }
                }, 500)
            })
        },
        closeDialog() {
            this.$emit("closeDialog", !this.showExamScoreDialog);
        },
        toLower(text) {
            return text.toString().toLowerCase()
        },
        searchByName(items, term) {
            if (term) {
                return items.filter(item => this.toLower(item.studentDoc.name).includes(this.toLower(term)))
            }
            return items
        },
        searchOnTable() {
            this.searched = this.searchByName(this.examScore, this.search)
        },
    },
    created() {
        this.searched = this.examScore;
    }
};
</script>

<style lang="scss" scoped>
@import "../../icons/icon.css";
@import "../../styles/scss/index";
.md-dialog {
    border-radius: 12px;
    width: 70%;
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
