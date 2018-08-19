<template>
<div>
    <md-dialog class="md-scrollbar" :md-active.sync="showTeacherDialog" :md-click-outside-to-close='false' :md-close-on-esc='false' @keydown.esc="closeDialog">
        <md-dialog-title class="dialog-title-wrapper">
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-50">
                    <div class="icon-wrapper">
                        <i class="icon" :class="cardItem.icon"></i>
                    </div>
                    <span v-if="type==true" class="dialog-title">{{cardItem.editTitle}}</span>
                    <span v-else class="dialog-title">{{cardItem.name}}</span>
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
            <div class="md-layout md-gutter" style="padding:20px;margin-top:-30px;">

                <!-- name -->
                <div class="md-layout-item md-size-20 md-small-size-100">
                    <md-field :class="getValidationClass('name')">
                        <label class="md-label">ឈ្មោះគ្រូបង្គោល</label>
                        <md-input v-model="form.name" />
                        <span class="md-error md-label" v-if="!$v.form.name.required">ឈ្មោះគ្រូបង្គោលតម្រូវឱ្យបំពេញ</span>
                    </md-field>
                </div>

                <!-- gender -->
                <div class="md-layout-item md-size-10 md-small-size-100">
                    <md-field :class="getValidationClass('gender')">
                        <label class="md-label">ភេទ</label>
                        <md-select v-model="form.gender">
                            <md-option></md-option>
                            <md-option value="ប្រុស" class="md-input">ប្រុស</md-option>
                            <md-option value="ស្រី" class="md-input">ស្រី</md-option>
                        </md-select>
                        <span class="md-error">ភេទតម្រូវឱ្យជ្រើសរើស</span>
                    </md-field>
                </div>

                <!-- dob -->
                <div class="md-layout-item md-size-20 md-small-size-100">
                    <md-field :class="getValidationClass('dob')">
                        <vue-datepicker :date="date" v-model="date" />
                    </md-field>
                </div>

                <!-- married-status -->
                <div class="md-layout-item md-size-10 md-small-size-100">
                    <md-field :class="getValidationClass('marriedStatus')">
                        <label class="md-label">ស្ថានភាពគ្រួសារ</label>
                        <md-select v-model="form.marriedStatus">
                            <md-option></md-option>
                            <md-option value="single" class="md-select">លីវ</md-option>
                            <md-option value="married" class="md-input">រៀបការ</md-option>
                        </md-select>
                        <span class="md-error">ស្ថានភាពគ្រួសារតម្រូវឱ្យជ្រើសរើស</span>
                    </md-field>
                </div>

                <!-- tel -->
                <div class="md-layout-item md-size-20 md-small-size-100">
                    <md-field :class="getValidationClass('tel')">
                        <label class="md-label">លេខទូរស័ព្ទ</label>
                        <md-input v-model="form.tel" class="md-input"></md-input>
                        <span class="md-error">លេខទូរស័ព្ទតម្រូវឱ្យបំពេញ</span>
                    </md-field>
                </div>

                <!-- email -->
                <div class="md-layout-item md-size-20 md-small-size-100">
                    <md-field :class="getValidationClass('email')">
                        <label for="email" class="md-label">សារអេឡិចត្រូនិច</label>
                        <md-input class="md-input" type="email" name="email" id="email" autocomplete="email" v-model="form.email" />
                        <!-- <span class="md-error" v-if="!$v.form.email.required">The email is required</span> -->
                        <span class="md-error" v-if="!$v.form.email.email">Invalid email</span>
                    </md-field>
                </div>

                <div class="md-layout-item md-size-50 md-small-size-100">
                    <md-field :class="getValidationClass('aob')">
                        <label class="md-label">ទីកន្លែងកំណើត</label>
                        <md-textarea class="md-input" v-model="form.aob"></md-textarea>
                    </md-field>
                </div>
                <div class="md-layout-item md-size-50 md-small-size-100">
                    <md-field :class="getValidationClass('address')">
                        <label class="md-label">អាសយដ្ឋានបច្ចប្បន្ន</label>
                        <md-textarea class="md-input" v-model="form.address"></md-textarea>
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
                <!-- <div class="md-layout-item md-size-100 md-small-size-100 modify-dialog-footer">
                    <div class="md-toolbar-section-end">
                        <icon-button :iconButton="iconButton.buttonReset" :onClick="clearForm" />
                        <icon-button :iconButton="iconButton.buttonSave" :onClick="validateForm" />
                    </div>
                </div> -->
                <div class="md-layout-item md-size-100 md-small-size-100" style="padding:20px;">
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
import VueDatepicker from '@/components/VueDatepicker';

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
        ConfirmDialog,
        VueDatepicker
    },
    props: [
        "showTeacherDialog",
        "cardItem",
        "teacherItem",
        "type"
    ],
    mixins: [validationMixin],
    data: () => ({
        show: false,
        date: {
            time:'ថ្ងៃខែឆ្នាំកំណើត'
        },
        selectedDate: new Date('2018/03/26'),
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
        teacherId: "",
        subjectId: "",
        form: {
            id: "",
            name: "",
            gender: "",
            dob: "ថ្ងៃខែឆ្នាំកំណើត",
            marriedStatus: "",
            tel: "",
            email: "",
            aob: "",
            address: ""
        },
        search: null,
        searched: [],
        teacherSubject: [],
        subjectDoc: [],
    }),
    computed: {
        getIncreaseTeacherId() {
            const id = this.$store.getters.getIncreaseTeacherId;
            return increaseId(id);
        },
        subject() {
            return this.$store.getters.getSubject;
        },
        teacher() {
            return this.$store.getters.getTeacher;
        },
        temp() {
            return this.$store.getters.getTemp;
        },
    },
    watch: {
        teacherItem(val) {
            if (!!val) {
                this.getPropTeacher(val);
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
            gender: {
                required
            },
            marriedStatus: {
                required
            },
            tel: {
                required
            },
            email: {
                // required,
                email
            },
            aob: {
                required
            },
            address: {
                required
            },
        }
    },
    methods: {
        getPropTeacher(props) {
            if (!!props) {
                const {id,name,gender,dob,marriedStatus,tel,email,aob,address}=props;
                this.teacherId = props.id;
                this.form = {
                    id: id,
                    name: name,
                    gender:gender,
                    dob:dob,
                    marriedStatus:marriedStatus,
                    tel:tel,
                    email:email,
                    aob:aob,
                    address:address
                };
                this.date.time=dob;
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
        addTeacher() {
            this.showNotify = true;
            if (!!this.teacherId) {
                const updateDoc = {
                    form: this.form,
                    subjectDoc: this.temp
                };
                this.$store.commit("updateTeacher", updateDoc);
                if (!!this.showNotify) {
                    this.snotify("ជោគជ័យ", "ទិន្ន័យកែប្រែបានជោគជ័យ");
                }
                window.setTimeout(() => {
                    this.showNotify = false;
                    this.closeDialog();
                    this.$store.dispatch('deleteTemp');
                    this.clearForm();
                }, 1500);
                
            } else {
                this.form.id = this.getIncreaseTeacherId;
                this.form.dob = this.date.time;
                const addDoc = {
                    form: this.form,
                    subjectDoc: this.subjectDoc
                };
                this.$store.commit("addTeacher", addDoc);
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
                this.addTeacher();
            }
        },
        closeDialog() {
            this.clearFormData();
            this.$emit("closeDialog", !this.showTeacherDialog);
        },
        searchOnTable() {
            this.searched = searchByName(this.subject, this.search)
        },
        getSubjectOnClickRow(subject) {
            if (!!subject) {
                const existSubject = this.teacherSubject.filter(o => o.id === subject.id);
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
                gender: "",
                dob: "",
                marriedStatus: "",
                tel: "",
                email: "",
                aob: "",
                address: ""
            };
            this.date={time:""};
        },
        clearForm() {
            this.$v.$reset();   
            if (!!this.teacherId) {
                if (!!this.teacherItem.subjectDoc.length > 0) {
                    this.teacherItem.subjectDoc.map((o) => {
                        this.$store.commit("addTemp", o);
                    });
                    this.getPropTeacher(this.teacherItem);
                }
            } else {
                this.$store.commit('deleteTemp');
                this.clearFormData();
            }
        },
        confirmDialog(item) {
            this.subjectId = item.id;
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
    border-radius: 12px;
    width: 90%;
    // height: 70%;
    max-width: none !important;
    max-height: none !important;
    overflow-y: scroll;
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

.md-datepicker-dialog.md-theme-default {
    position: relative !important;
    top: 0;
}

.modify-dialog-footer {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 20px;
    margin-bottom: 20px;
}
</style>
