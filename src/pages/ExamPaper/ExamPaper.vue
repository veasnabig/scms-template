<template>
<div>
    <div class="md-layout md-gutter scms-card-wrapper-modify">
        <div class="md-layout-item md-size-25">
            <scms-card :cardItem='cardItem' @click.native='showDialog' :pointIcon="true"/>
        </div>
    </div>
    <md-table resize v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header style="height:60vh;padding-top:6vh;">
        <md-table-toolbar>
            <div class="md-toolbar-section-start">
                <span class="table-title">វិញ្ញាសារសរុប :</span>
                <span class="total-record">{{totalExamPaper}}</span>
                <span class="table-title">វិញ្ញាសារ</span>
            </div>
            <md-field md-clearable class="md-toolbar-section-end">
                <md-input placeholder="ស្វែងរកវិញ្ញាសារ..." v-model="search" @input="searchOnTable" />
            </md-field>
        </md-table-toolbar>

        <md-table-empty-state md-label="វិញ្ញាសាររកមិនឃើញ" :md-description="`មិនមានវិញ្ជាសារ  '${search}'  ដែលអ្នកកំពុងស្វែងរកទេ.សូមស្វែងរកវិញ្ញាសារផ្សេង​ទៀត!`" />

        <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell style="text-align:right" md-label="លេខសម្គាល់" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell md-label="វិញ្ញាសារ" md-sort-by="name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="មុខវិជ្ជា" md-sort-by="subjectDoc.name">{{ item.subjectDoc.name }}</md-table-cell>
            <md-table-cell md-label="រយៈពេល" md-sort-by="duration">{{ item.duration }}</md-table-cell>
            <md-table-cell md-label="សកម្មភាព">
                <md-button class="md-icon-button md-raised md-primary" @click='showDialog(item)'>
                    <md-icon>
                        <i class="md-icon icon-edit" />
                    </md-icon>
                </md-button>
                <md-button class="md-icon-button md-raised md-accent" style="background:#c643fc" @click="printDialog(item)">
                    <md-icon>
                        <i class="md-icon icon-print" />
                    </md-icon>
                </md-button>
                <md-button class="md-icon-button md-raised md-accent" @click="confirmDialog(item)">
                    <md-icon>
                        <i class="md-icon icon-delete" />
                    </md-icon>
                </md-button>

            </md-table-cell>
        </md-table-row>
    </md-table>
    <vue-snotify v-show="showNotify==true" />

    <Dialog :showExamPaperDialog='showExamPaperDialog' :cardItem='cardItem' :examPaperItem='examPaperItem' @closeDialog='showExamPaperDialog=false' />
    <PrintDialog :showPrintDialog='showPrintDialog' :printItem='printItem' @closeDialog='showPrintDialog=false' />

    <ConfirmDialog :showConfirmDialog='showConfirmDialog' @closeDialog='showConfirmDialog=false' @handleAccept="handleAccept" />
</div>
</template>

<script>
import {
    colors
} from '@/styles/colors.js';
import ScmsCard from '@/components/SCMSCard';
import Dialog from './ExamPaperDialog';
import PrintDialog from './PrintDialog';
import ConfirmDialog from '@/components/ConfirmDialog';

export default {
    components: {
        ScmsCard,
        Dialog,
        ConfirmDialog,
        PrintDialog
    },
    data: () => ({
        showExamPaperDialog: false,
        showPrintDialog: false,
        showConfirmDialog: false,
        examPaperItem: {},
        printItem:{},
        cardItem: {
            name: 'បង្កើតវិញ្ញាសារប្រឡង',
            editTitle: 'កែប្រែវិញ្ញាសារប្រឡង',
            icon: 'icon-exam-paper',
            iconBg: {
                background: `linear-gradient(${colors.lightTeal}, ${colors.teal})`
            }
        },
        showNotify: false,
        search: null,
        searched: [],
    }),
    computed: {
        totalExamPaper() {
            return this.$store.getters.getTotalExamPaper;
        },
        examPaper() {
            return this.$store.getters.getExamPaper;
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
                this.$store.commit("deleteExamPaper", this.form);
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
            this.searched = this.searchByName(this.examPaper, this.search)
        },
        showDialog(item) {
            this.examPaperItem = item;
            this.showExamPaperDialog = !this.showExamPaperDialog;
        },
        printDialog(item) {
            this.printItem = item;
            this.showPrintDialog = !this.showPrintDialog;
        },
        confirmDialog(item) {
            this.form = item;
            this.showConfirmDialog = !this.showConfirmDialog;
        },

    },
    created() {
        this.searched = this.examPaper
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
