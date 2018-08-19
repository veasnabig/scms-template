<template>
<div>
    <div class="md-layout md-gutter scms-card-wrapper-modify">
        <div class="md-layout-item md-size-25 md-small-size-100">
            <scms-card :cardItem='cardItem' @click.native='showDialog' :pointIcon="true"/>
        </div>
    </div>
    <md-table resize v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header style="height:60vh;padding-top:6vh;">
        <md-table-toolbar>
            <div class="md-toolbar-section-start">
                <span class="table-title">ចំនួនសិស្សសរុប :</span>
                <span class="total-record">{{totalStudent}}</span>
                <span class="table-title">នាក់</span>
            </div>
            <md-field md-clearable class="md-toolbar-section-end">
                <md-input placeholder="ស្វែងរកសិស្ស..." v-model="search" @input="searchOnTable" />
            </md-field>
        </md-table-toolbar>

        <md-table-empty-state md-label="សិស្សរកមិនឃើញ" :md-description="`មិនមានសិស្ស  '${search}'  ដែលអ្នកកំពុងស្វែងរកទេ.សូមស្វែងរកសិស្សផ្សេង​ទៀត!`" />

        <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell style="text-align:right" md-label="រ.ល" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell md-label="ឈ្មោះសិស្ស" md-sort-by="name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="ភេទ" md-sort-by="price">{{ item.gender }}</md-table-cell>
            <md-table-cell md-label="ថ្ងៃខែឆ្នាំកំណើត" md-sort-by="duration">{{ item.dob }}</md-table-cell>
            <md-table-cell md-label="លេខទូរស័ព្ទ" md-sort-by="description">{{ item.tel }}</md-table-cell>
            <md-table-cell md-label="សារអេឡិចត្រូនិច" md-sort-by="description">{{ item.email }}</md-table-cell>
            <md-table-cell md-label="សកម្មភាព">
                <md-button class="md-icon-button md-raised md-primary" @click='showUpdate(item)'>
                    <i class="md-icon icon-edit"/>
                </md-button>
                <md-button class="md-icon-button md-raised md-accent" @click='showRegisterDialog=true' style="background:#0BD318;">
                    <i class="md-icon icon-register"/>
                </md-button>
                <md-button class="md-icon-button md-raised md-accent" @click="confirmDialog(item)">
                    <i class="md-icon icon-delete"/>
                </md-button>
            </md-table-cell>
        </md-table-row>
    </md-table>
    <vue-snotify v-show="showNotify==true" />

    <Dialog :showStudentDialog='showStudentDialog' :type="type" :cardItem='cardItem' :studentItem='studentItem' @closeDialog='closeDialog' />
    <RegisterDialog :showRegisterDialog='showRegisterDialog' :type="type" :cardItem='cardItem' :registerItem='registerItem' @closeDialog='closeDialog' />

    <ConfirmDialog :showConfirmDialog='showConfirmDialog' @closeDialog='showConfirmDialog=false' @handleAccept="handleAccept" />
</div>
</template>

<script>
import {
    colors
} from '@/styles/colors.js';
import ScmsCard from '@/components/SCMSCard';
import Dialog from './StudentDialog';
import RegisterDialog from '../Register/RegisterDialog.vue';
import ConfirmDialog from '@/components/ConfirmDialog';

export default {
    components: {
        ScmsCard,
        Dialog,
        ConfirmDialog,
        RegisterDialog
    },
    data: () => ({
        type: false,
        showStudentDialog: false,
        showConfirmDialog: false,
        showRegisterDialog:false,
        registerItem: null,
        type: false,
        studentItem: {},
        cardItem: {
            name: 'បញ្ជូលពត៌មានសិស្ស',
            editTitle: 'កែប្រែពត៌មានសិស្ស',
            icon: 'icon-student',
            iconBg: {
                background: `linear-gradient(${colors.lightBlue}, ${colors.blue})`
            }
        },
        showNotify: false,
        search: null,
        searched: [],
    }),
    computed: {
        totalStudent() {
            return this.$store.getters.getTotalStudent;
        },
        student() {
            return this.$store.getters.getStudent;
        }
    },
    methods: {
        snotify(title, content) {
            this.$snotify.success(content, title, {
                timeout: 800,
                showProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true
            });
        },
        handleAccept(val) {
            if (!!val) {
                this.$store.commit("deleteStudent", this.form);
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
        toLower(text) {
            return text.toString().toLowerCase()
        },
        searchByName(items, term) {
            if (term) {
                return items.filter(item => this.toLower(item.name).includes(this.toLower(term)))
            }
            return items
        },
        searchOnTable() {
            this.searched = this.searchByName(this.student, this.search)
        },
        showDialog() {
            this.showStudentDialog = !this.showStudentDialog;
        },
        closeDialog() {
            this.type=false;
            this.showStudentDialog = false;
            this.showRegisterDialog = false;
        },
        showUpdate(item) {
            this.type = true;
            this.studentItem = item;
            this.showDialog();
        },
        confirmDialog(item) {
            this.form = item;
            this.showConfirmDialog = !this.showConfirmDialog;
        },

    },
    created() {
        this.searched = this.student
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/scss/index";
@import "../../icons/icon.css";
.table-title {
    font-family: 'Dangrek', Arial, Helvetica, sans-serif;
    font-size: 20px;
    color: $grey;
}

.total-record {
    font-family: 'Dangrek', Arial, Helvetica, sans-serif;
    margin-left: 10px;
    margin-right: 5px;
    font-size: 25px;
    color: $blue;
    font-weight: bold;
}

.scms-card-wrapper-modify {
    position: relative;
    z-index: 100;
    margin-left: 10px;
    margin-bottom: -40px;
}

.md-layout-item:hover {
    cursor: pointer;
}

.md-field {
    max-width: 300px;
}
</style>
