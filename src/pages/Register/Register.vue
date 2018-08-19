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
                <span class="table-title">ចំនួនសិស្សចុះឈ្មោះសរុប :</span>
                <span class="total-record">{{totalRegister}}</span>
                <span class="table-title">នាក់</span>
            </div>
            <md-field md-clearable class="md-toolbar-section-end">
                <md-input placeholder="ស្វែងរកមុខវិជ្ជា..." v-model="search" @input="searchOnTable" />
            </md-field>
        </md-table-toolbar>

        <md-table-empty-state md-label="សិស្សរកមិនឃើញ" :md-description="`មិនមានសិស្ស  '${search}'  ដែលអ្នកកំពុងស្វែងរកទេ.សូមស្វែងរកសិស្សផ្សេង​ទៀត!`" />

        <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell style="text-align:right" md-label="រ.ល" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell md-label="ឈ្មោះសិស្ស" md-sort-by="studentDoc.name">{{ item.studentDoc.name }}</md-table-cell>
            <md-table-cell md-label="វគ្គសិក្សា" md-sort-by="coursesDoc.name">{{ item.coursesDoc.name }}</md-table-cell>
            <md-table-cell md-label="កាលបរិច្ឆេទចុះឈ្មោះ">{{ item.date }}</md-table-cell>
            <md-table-cell md-label="សកម្មភាព">
                <!-- <md-button class="md-icon-button md-raised md-primary" @click='showUpdate(item)'>
                    <i class="md-icon icon-edit"/>
                </md-button> -->
                <md-button class="md-icon-button md-raised btn-payment" @click='showUpdate(item)'>
                    <i class="md-icon icon-payment" />
                </md-button>
                <md-button class="md-icon-button md-raised btn-print" @click='showPrint(item)'>
                    <i class="md-icon icon-print" />
                </md-button>
                <md-button class="md-icon-button md-raised md-accent" @click="confirmDialog(item)">
                    <i class="md-icon icon-delete" />
                </md-button>
            </md-table-cell>
        </md-table-row>
    </md-table>
    <vue-snotify v-show="showNotify==true" />

    <Dialog :showRegisterDialog='showRegisterDialog' :type="type" :cardItem='cardItem' :registerItem='registerItem' @closeDialog='closeDialog' />
    <Print-Dialog :showPrintDialog='showPrintDialog' :cardItem='cardItem' :registerItem='registerItem' @closeDialog='closeDialog' />

    <ConfirmDialog :showConfirmDialog='showConfirmDialog' @closeDialog='showConfirmDialog=false' @handleAccept="handleAccept" />
</div>
</template>

<script>
import {
    colors
} from '@/styles/colors.js';
import ScmsCard from '@/components/SCMSCard';
import Dialog from './RegisterDialog';
import PrintDialog from './PrintDialog';
import ConfirmDialog from '@/components/ConfirmDialog';

export default {
    components: {
        ScmsCard,
        Dialog,
        ConfirmDialog,
        PrintDialog,
    },
    data: () => ({
        type: false,
        showRegisterDialog: false,
        showPrintDialog: false,
        showConfirmDialog: false,
        registerItem: null,
        cardItem: {
            name: 'ចុះឈ្មោះសិស្ស',
            editTitle: 'កែប្រែពត៌មានចុះឈ្មោះសិស្ស',
            icon: 'icon-register',
            iconBg: {
                background: `linear-gradient(${colors.lightPink}, ${colors.pink})`
            }
        },
        showNotify: false,
        search: null,
        searched: [],
    }),
    computed: {
        totalRegister() {
            return this.$store.getters.getTotalRegister;
        },
        register() {
            return this.$store.getters.getRegister;
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
                this.$store.commit("deleteRegister", this.form);
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
            this.searched = this.searchByName(this.register, this.search)
        },
        showDialog() {
            this.showRegisterDialog = !this.showRegisterDialog;
        },
        showPrint(item) {
            if (!!item) {
                this.registerItem = item;
            }
            this.showPrintDialog = !this.showPrintDialog;
        },
        closeDialog() {
            this.type = false;
            this.showRegisterDialog = false;
            this.showPrintDialog = false;
        },
        showUpdate(item) {
            if(!this.showPrintDialog){
                this.registerItem = item;
            }
            this.type = true;
            
            this.showDialog();
        },
        confirmDialog(item) {
            this.form = item;
            this.showConfirmDialog = !this.showConfirmDialog;
        },

    },
    created() {
        this.searched = this.register;
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

.btn-payment {
    background: $green !important;
    color: $white !important;
}

.btn-print {
    background: $pink !important;
    color: $white !important;
}
</style>
