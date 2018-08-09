<template>
<div>
    <md-dialog :md-active.sync="showCoursesDialog" :md-click-outside-to-close='false' :md-close-on-esc='false' @keydown.esc="closeDialog">
        <md-dialog-title class="dialog-title-wrapper">
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-50">
                    <div class="icon-wrapper">
                        <i class="icon" :class="cardItem.icon"></i>
                    </div>
                    <span class="dialog-title">{{cardItem.addTitle}}</span>
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

        <form novalidate class="md-layout" @submit.prevent="validateForm">

            <!-- <md-card-content> -->
            <div class="md-layout md-gutter" style="padding:20px;">

                <!-- name -->
                <div class="md-layout-item md-size-33 md-small-size-100">
                    <md-field :class="getValidationClass('name')">
                        <label class="md-label">ឈ្មោះវគ្គ</label>
                        <md-input v-model="form.name" />
                        <span class="md-error md-label" v-if="!$v.form.name.required">ឈ្មោះវគ្គត្រូវបំពេញ</span>
                    </md-field>
                </div>

                <!-- price -->
                <div class="md-layout-item md-size-33 md-small-size-100">
                    <md-field :class="getValidationClass('price')">
                        <label class="md-label">តម្លៃ</label>
                        <md-input type="number" v-model="form.price" />
                        <span class="md-error md-label" v-if="!$v.form.name.required">តម្លៃត្រូវបំពេញ</span>
                    </md-field>
                </div>

                <!-- duration -->
                <div class="md-layout-item md-size-33 md-small-size-100">
                    <md-field :class="getValidationClass('duration')">
                        <label class="md-label">រយៈពេលសិក្សា</label>
                        <md-input v-model="form.duration" />
                        <span class="md-error md-label" v-if="!$v.form.duration.required">រយៈពេលសិក្សាត្រូវបំពេញ</span>
                    </md-field>
                </div>

                <!-- course-subject -->
                <div class="md-layout-item md-size-66 md-small-size-100">
                    <md-table resize v-model="temp" md-sort="name" md-sort-order="asc" md-card md-fixed-header style="height:35vh;">
                        <md-table-empty-state md-label="មិនមានមុខវិជ្ជា" />
                        <md-table-row slot="md-table-row" slot-scope="{ item }">
                            <md-table-cell style="text-align:right" md-label="រ.ល" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
                            <md-table-cell md-label="មុខវិជ្ជា" md-sort-by="name">{{ item.name }}</md-table-cell>
                            <md-table-cell md-label="តម្លៃមុខវិជ្ជា" md-sort-by="price">$ {{ item.price }}</md-table-cell>
                            <md-table-cell md-label="រយៈពេលសិក្សា" md-sort-by="duration">{{ item.duration }}</md-table-cell>
                            <md-table-cell md-label="សកម្មភាព">
                                <md-button @click="confirmDialog(item)" class="md-icon-button md-raised md-accent">
                                    <i class="md-icon icon-corss" style="font-size:15px !important;" />
                                </md-button>
                            </md-table-cell>
                        </md-table-row>
                    </md-table>
                </div>

                <!-- subject -->
                <div class="md-layout-item md-size-33 md-small-size-100">
                    <md-table resize v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header style="height:35vh;">
                        <md-table-toolbar>
                            <div class="md-toolbar-section-start">
                                <h1 class="md-title table-title">មុខវិជ្ជា</h1>
                            </div>
                            <md-field md-clearable class="md-toolbar-section-end">
                                <md-input placeholder="ស្វែងរកមុខវិជ្ជា..." v-model="search" @input="searchOnTable" />
                            </md-field>
                        </md-table-toolbar>
                        <md-table-empty-state md-label="មុខវិជ្ជារកមិនឃើញ" :md-description="`មិនមានមុខវិជ្ជា  '${search}'  ដែលអ្នកកំពុងស្វែងរកទេ.សូមស្វែងរកវគ្គសិក្សាផ្សេង​ទៀត!`" />
                        <md-table-row @click="getSubjectOnClickRow(item)" slot="md-table-row" slot-scope="{ item }" style="cursor:pointer;">
                            <md-table-cell style="text-align:right" md-label="រ.ល" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
                            <md-table-cell md-label="មុខវិជ្ជា" md-sort-by="name">{{ item.name }}</md-table-cell>
                        </md-table-row>
                    </md-table>
                </div>

                <!-- action button -->
                <div class="md-layout-item md-size-100 md-small-size-100" style="padding:20px;margin-top:20px;">
                    <div class="md-toolbar-section-end">
                        <icon-button :iconButton="iconButton.buttonReset" :onClick="clearForm" />
                        <icon-button :iconButton="iconButton.buttonSave" :onClick="validateForm" />
                    </div>
                </div>
            </div>
        </form>
        <vue-snotify v-show="showNotify==true" />
        <ConfirmDialog :showConfirmDialog='showConfirmDialog' @closeDialog='showConfirmDialog=false' @handleAccept="handleAccept" />
    </md-dialog>

</div>
</template>

<script>
import {
    colors
} from "@/styles/colors.js";

import searchByName from '@/lib/searchByName.js';
import increaseId from "@/lib/increaseId.js";
import ScmsCard from "@/components/SCMSCard";
import IconButton from "@/components/IconButton";
import ConfirmDialog from '@/components/ConfirmDialog';
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
        ConfirmDialog
    },
    props: [
        "showCoursesDialog",
        "cardItem",
        "coursesItem"
    ],
    mixins: [validationMixin],
    data: () => ({
        showNotify: false,
        showConfirmDialog: false,
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
        coursesId: "",
        subjectId:"",
        form: {
            id: "",
            name: "",
            price: "",
            duration: "",
            description: ""
        },
        search: null,
        searched: [],
        coursesSubject: [],
        subjectDoc: [],
    }),
    computed: {
        getIncreaseCoursesId() {
            const id = this.$store.getters.getIncreaseCoursesId;
            return increaseId(id);
        },
        subject() {
            return this.$store.getters.getSubject;
        },
        courses() {
            return this.$store.getters.getCourses;
        },
        temp() {
            return this.$store.getters.getTemp;
        },
    },
    watch: {
        coursesItem(val) {
            if (!!val) {
                this.getPropCourses(val);
                if (!!val.subjectDoc.length > 0) {
                    val.subjectDoc.map(o => {
                        this.$store.commit("addTemp", o)
                    });
                }

            }
        },
    },
    validations: {
        form: {
            name: {
                required
            },
            price: {
                required
            },
            duration: {
                required
            }
        }
    },
    methods: {
        getPropCourses(props) {
            if (!!props) {
                this.coursesId = props.id;
                this.form = {
                    id: props.id,
                    name: props.name,
                    price: props.price,
                    duration: props.duration,
                    description: props.description
                };
            }
        },
        getValidationClass(fieldName) {
            const field = this.$v.form[fieldName];
            if (field) {
                return {
                    "md-invalid": field.$invalid && field.$dirty
                };
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
        addCourses() {
            this.showNotify = true;
            if (!!this.coursesId) {
                const updateDoc = {
                    form: this.form,
                    subjectDoc: this.temp
                };
                this.$store.commit("updateCourses", updateDoc);
                if (!!this.showNotify) {
                    this.snotify("ជោគជ័យ", "ទិន្ន័យកែប្រែបានជោគជ័យ");
                }
                window.setTimeout(() => {
                    this.showNotify = false;
                    this.closeDialog();
                    this.clearForm();
                }, 1500);
            } else {
                this.form.id = this.getIncreaseCoursesId;
                const addDoc = {
                    form: this.form,
                    subjectDoc: this.subjectDoc
                };
                this.$store.commit("addCourses", addDoc);
                if (!!this.showNotify) {
                    this.snotify("ជោគជ័យ", "បញ្ជូលទិន្ន័យបានជោគជ័យ");
                }
                window.setTimeout(() => {
                    this.showNotify = false;
                    this.$store.dispatch('deleteTemp');
                    this.clearForm();
                }, 1500);
            }
        },
        validateForm() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this.addCourses();
            }
        },
        closeDialog() {
            this.clearFormData();
            this.$emit("closeDialog", !this.showCoursesDialog);
        },
        searchOnTable() {
            this.searched = searchByName(this.subject, this.search)
        },
        getSubjectOnClickRow(subject) {
            if (!!subject) {
                const existSubject = this.coursesSubject.filter(o => o.id === subject.id);
                if (existSubject.length === 0) {
                    this.subjectDoc.push(subject);
                    this.$store.commit("addTemp", subject)
                }
            }
        },
        clearFormData() {
            this.form = {
                id: "",
                name: "",
                price: "",
                duration: "",
                description: ""
            };
        },
        clearForm() {
            this.$v.$reset();
            if (!!this.coursesId) {
                if(!!this.coursesItem.subjectDoc.length>0){
                    this.coursesItem.subjectDoc.map((o)=>{
                        this.$store.commit("addTemp", o);
                    });
                    this.getPropCourses(this.coursesItem);
                }
            } else {
                this.$store.commit('deleteTemp')
                this.clearFormData();
            }
        },
        confirmDialog(item) {
            this.subjectId=item.id;
            this.showConfirmDialog = !this.showConfirmDialog;
        },
        handleAccept(val) {
            if (!!val) {
                this.$store.commit("deleteTemp", this.subjectId);
                this.showConfirmDialog = false;
                if (!this.showNotify) {
                    this.showNotify = true;
                    this.snotify("ជោគជ័យ", "ទិន្ន័យលុបបានជោគជ័យ");
                }
                window.setTimeout(() => {
                    this.showNotify = false;
                }, 1500);
            }
        },
    },
    created() {
        this.searched = this.subject;
    },

};
</script>

<style lang="scss" scoped>
@import "../../icons/icon.css";
@import "../../styles/scss/index";
.md-dialog {
    border-radius: 12px; // width: 100%;
    width: 70% !important;
    height: 90% !important;
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
</style>
