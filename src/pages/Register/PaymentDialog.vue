<template>
<div>
    <md-dialog :md-active.sync="showPaymentDialog" :md-click-outside-to-close='false' :md-close-on-esc='false' @keydown.esc="closeDialog">
        <md-dialog-title class="dialog-title-wrapper">
            <div class="md-layout md-gutter">
                <div class="md-layout-item">
                    <div class="icon-wrapper">
                        <i class="icon" :class="cardItem.icon"></i>
                    </div>
                    <span v-if="type==true" class="dialog-title">{{cardItem.editTitle}}</span>
                    <span v-else class="dialog-title">{{cardItem.name}}</span>
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

        <form novalidate @submit.prevent="validateForm">
            <div style="padding:20px;">
                <div class="md-layout">
                    <div class="md-layout-item md-size-33" style="margin-top:-30px;margin-left:20px;">
                        <md-autocomplete v-model="value" :md-options="students" @md-selected="selectedValue(value)" @md-changed="getStudents" @md-opened="getStudents">
                            <label class="md-label">ជ្រើសរើសសិស្ស</label>
                            <template slot="md-autocomplete-item" slot-scope="{ item }">{{ item.name }}</template>
                        </md-autocomplete>
                    </div>
                    <div class="md-layout-item md-size-33" style="margin-top:-30px;margin-left:20px;">
                        <md-field>
                            <vue-datepicker :date="date" v-model="date" />
                        </md-field>
                    </div>
                </div>
                <div class="md-layout">
                    <md-steppers md-linear :md-active-step.sync="active">

                        <!-- step : select courses -->
                        <md-step id="first" class="md-label" md-label="ជ្រើសរើសវគ្គសិក្សា" :md-done.sync="first">
                            <div class="md-layout md-gutter">
                                <div class="md-layout-item md-size-66 md-small-size-100">
                                    <md-table resize v-model="coursesSubject" md-card :md-selected-value.sync="selected" style="height:30vh;">
                                        <md-table-empty-state md-label="មិនមានមុខវិជ្ជាសិក្សា" :md-description="`សូមជ្រើសរើសវគ្គសិក្សានៅខាងស្តាំ!`" />
                                        <md-table-row slot="md-table-row" slot-scope="{ item }" :md-disabled="item.name.includes('Stave')" md-selectable="multiple" md-auto-select>
                                            <md-table-cell md-label="មុខវិជ្ជា">{{ item.name }}</md-table-cell>
                                            <md-table-cell md-label="តម្លៃ">$ {{ item.price }}</md-table-cell>
                                            <md-table-cell md-label="រយៈពេលសិក្សា">{{ item.duration }}</md-table-cell>
                                        </md-table-row>
                                    </md-table>
                                </div>

                                <div class="md-layout-item md-size-33 md-small-size-100">
                                    <md-table resize v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header style="height:30vh;">
                                        <md-table-toolbar>
                                            <md-field md-clearable class="md-toolbar-section-end">
                                                <md-input placeholder="ស្វែងរកវគ្គសិក្សា..." v-model="search" @input="searchOnTable" />
                                            </md-field>
                                        </md-table-toolbar>
                                        <md-table-empty-state md-label="វគ្គសិក្សារកមិនឃើញ" :md-description="`មិនមានវគ្គសិក្សា  '${search}'  ដែលអ្នកកំពុងស្វែងរកទេ.សូមស្វែងរកវគ្គសិក្សាផ្សេង​ទៀត!`" />
                                        <md-table-row @click="getCoursesOnClickRow(item)" :class="{activeRow:item.id==coursesId}" slot="md-table-row" slot-scope="{ item }" style="cursor:pointer;">
                                            <md-table-cell style="text-align:right" md-label="រ.ល" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
                                            <md-table-cell md-label="វគ្គសិក្សា" md-sort-by="name">{{ item.name }}</md-table-cell>
                                            <md-table-cell md-label="តម្លៃ">$ {{ item.price }}</md-table-cell>
                                        </md-table-row>
                                    </md-table>
                                </div>
                            </div>

                            <div class="md-layout md-gutter" style="margin-top:20px;">
                                <div class="md-layout-item md-size-66 md-small-size-100">
                                    <div class="md-toolbar-section-end">
                                        <h3 class="total-label">សរុប</h3><span class="total-value">$ {{total}}</span>
                                    </div>
                                </div>
                                <div class="md-layout-item md-size-33 md-small-size-100">
                                    <div class="md-toolbar-section-end" style="margin-top:5px;">
                                        <icon-button :iconButton="iconButton.buttonPayment" :onClick="nextPayment" />
                                        <icon-button :iconButton="iconButton.buttonSave" :onClick="save" />
                                    </div>
                                </div>
                            </div>
                        </md-step>

                        <!-- step: payment -->
                        <md-step id="second" md-label="បង់ប្រាក់" :md-error="secondStepError" :md-done.sync="second">
                            <div class="md-layout md-gutter">
                                <div class="md-layout-item md-size-66 md-small-size-100">
                                    <md-table resize v-model="selected" md-card style="height:30vh;">
                                        <md-table-empty-state md-label="មិនមានមុខវិជ្ជាសិក្សា" :md-description="`សូមជ្រើសរើសវគ្គសិក្សានៅខាងស្តាំ!`" />
                                        <md-table-row slot="md-table-row" slot-scope="{ item }" :md-disabled="item.name.includes('Stave')">
                                            <md-table-cell md-label="មុខវិជ្ជា">{{ item.name }}</md-table-cell>
                                            <md-table-cell md-label="តម្លៃ">$ {{ item.price }}</md-table-cell>
                                            <md-table-cell md-label="រយៈពេលសិក្សា">{{ item.duration }}</md-table-cell>
                                        </md-table-row>
                                    </md-table>
                                </div>

                                <div class="md-layout-item md-size-33 md-small-size-100">
                                    <md-card style="height:30vh;">
                                        <md-card-content>
                                            <div class="md-toolbar-section-start">
                                                <h3 class="total-label">សរុប</h3><span class="total-value">$ {{total}}</span>
                                            </div>
                                            <md-field>
                                                <label class="md-label">បញ្ចុះតម្លៃ</label>
                                                <md-input type="number" class="md-input" v-model="formPayment.discount" />
                                            </md-field>
                                            <md-field>
                                                <label class="md-label">បង់ប្រាក់</label>
                                                <md-input type="number" class="md-input" v-model.number="formPayment.pay" />
                                            </md-field>
                                        </md-card-content>
                                    </md-card>
                                </div>
                            </div>

                            <div class="md-layout md-gutter" style="margin-top:20px;">
                                <div class="md-layout-item md-size-100 md-small-size-100">
                                    <div class="md-toolbar-section-end" style="margin-top:5px;">
                                        <icon-button :iconButton="iconButton.buttonPayment" :onClick="payment" />
                                    </div>
                                </div>
                            </div>
                        </md-step>
                    </md-steppers>
                </div>
            </div>

        </form>
        <vue-snotify v-show="showNotify==true"/>
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
    props: {
        showRegisterDialog: Boolean,
        cardItem: Object,
        paymentItem: {},
        type: Boolean
    },
    mixins: [validationMixin],
    data: () => ({
        date: {
            time: 'កាលបរិច្ឆេទ'
        },
        formPayment: {
            pay: 0,
            discount: 0
        },
        value: null,
        students: [],
        showNotify: false,
        iconButton: {
            buttonSave: {
                text: "រក្សាទុក",
                icon: "icon-save",
                iconBg: {
                    background: `linear-gradient(${colors.lightBlue}, ${colors.blue})`
                }
            },
            buttonPayment: {
                text: "បង់ប្រាក់",
                icon: "icon-payment",
                iconBg: {
                    background: `linear-gradient(${colors.lightTeal}, ${colors.teal})`
                }
            },
        },
        registerId: "",
        userSaved: false,
        lastUser: null,
        search: null,
        searched: [],
        active: 'first',
        first: true,
        second: false,
        third: false,
        secondStepError: null,
        selectedSubject: [],
        selected: [],
        coursesSubject: [],
        coursesId: ""
    }),
    computed: {
        getIncreaseRegisterId() {
            const id = this.$store.getters.getIncreaseRegisterId;
            return increaseId(id);
        },
        studentList() {
            return this.$store.getters.getStudent;
        },
        courses() {
            return this.$store.getters.getCourses;
        },
        total() {
            if (!!this.selected) {
                return this.totalPrice(this.formPayment.discount);
            }
        }
    },
    validations: {},
    methods: {
        getValidationClass(fieldName) {
            const field = this.$v.form[fieldName];
            if (field) {
                return {
                    "md-invalid": field.$invalid && field.$dirty
                };
            }
        },
        clearForm() {
            this.$v.$reset();
            this.formPayment = {
                pay: 0,
                discount: 0,
            };
            this.selected = [];
            this.coursesSubject = [];
            this.coursesId = "";
            this.value = "";
            this.date.time = "កាលបរិច្ឆេទ";
        },
        snotify(title, content) {
            this.$snotify.success(content, title, {
                timeout: 800,
                showProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true
            });
        },
        addRegister() {
            this.showNotify = true;
            if (!!this.registerId) {
                this.$store.commit("updateRegister", this.form);
                this.clearForm();
                if (!!this.showNotify) {
                    this.snotify("ជោគជ័យ", "ទិន្ន័យកែប្រែបានជោគជ័យ");
                }
                window.setTimeout(() => {
                    this.showNotify = false;
                    this.closeDialog();
                }, 1500);
            } else {
                this.form.id = this.getIncreaseRegisterId;
                this.$store.commit("addRegister", this.form);
                this.clearForm();
                if (!!this.showNotify) {
                    this.snotify("ជោគជ័យ", "បញ្ជូលទិន្ន័យបានជោគជ័យ");
                }
                window.setTimeout(() => {
                    this.showNotify = false;
                }, 1500);
            }
        },
        validateForm() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this.addRegister();
            }
        },
        closeDialog() {
            this.$emit("closeDialog", !this.showRegisterDialog);
        },
        getStudents(searchTerm) {
            this.students = new Promise(resolve => {
                window.setTimeout(() => {
                    if (!searchTerm) {
                        resolve(this.studentList)
                    } else {
                        const term = searchTerm.toString().toLowerCase()

                        resolve(this.studentList.filter(({
                            name
                        }) => name.toString().toLowerCase().includes(term)))
                    }
                }, 500)
            })
        },
        selectedValue(val) {
            if (!!val) {
                this.value = val.name;
            }
        },
        searchOnTable() {
            this.searched = searchByName(this.courses, this.search)
        },
        setDone(id, index) {
            this[id] = true

            this.secondStepError = null

            if (index) {
                this.active = index
            }
        },
        nextPayment() {
            this.setDone('first', 'second')
        },
        setError() {
            this.secondStepError = 'This is an error!'
        },
        getAlternateLabel(count) {
            let plural = ''
            if (count > 1) {
                plural = 's'
            }
            return `${count} user${plural} selected`
        },
        getCoursesOnClickRow(item) {
            if (!!item) {
                this.coursesSubject = item.subjectDoc;
                this.coursesId = item.id;
                if (!!this.selected) {
                    setTimeout(() => {
                        this.selected = item.subjectDoc;
                    }, 100)
                }
            }
        },
        totalPrice(discount) {
            let total = 0;
            if (!!this.selected.length > 0) {
                this.selected.map((o) => {
                    total += o.price;
                })
                return total - ((total * discount) / 100);
            } else {
                return total;
            }
        },
        save() {
            this.showNotify = true;
            this.clearForm();
            this.snotify("ជោគជ័យ", "បញ្ជូលទិន្ន័យបានជោគជ័យ");
            setTimeout(() => {
                this.closeDialog();
                this.showNotify = false;
            }, 1500)
        },
        payment() {
            this.clearForm();
            this.showNotify = true;
            this.snotify("ជោគជ័យ", "បង់ប្រាក់បានជោគជ័យ");
            setTimeout(() => {
                this.closeDialog();
                this.showNotify = false;
            }, 1500)
        }
    },
    created() {
        this.searched = this.courses;
    },
};
</script>

<style lang="scss" scoped>
@import "../../icons/icon.css";
@import "../../styles/scss/index";
.md-dialog {
    border-radius: 12px;
    width: 70%;
    min-height: 70%;
    max-width: none !important;
    max-height: none !important;
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

.total-panel {
    background: linear-gradient(to right, $blue, $light-blue);
    color: $white;
    border-radius: 12px;
}

.total-label {
    font-family: 'KhmerOSBattambang', Arial, Helvetica, sans-serif;
    color: $grey;
    margin-right: 20px;
}

.total-value {
    color: $green;
    font-size: 30px;
}

.activeRow {
    background: linear-gradient(to right, $light-blue, $blue);
    color: $white; // transition: all .2s;
}

</style>
