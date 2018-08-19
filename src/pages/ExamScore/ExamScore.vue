<template>
<div>
    <div class="md-layout md-gutter scms-card-wrapper-modify">
        <div class="md-layout-item md-size-20">
            <scms-card :cardItem='cardItem' @click.native='showExamScoreDialog=true' :pointIcon="true"/>
        </div>
    </div>
    <md-table resize v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header style="height:60vh;padding-top:6vh;">
        <md-table-toolbar>
            <div class="md-toolbar-section-start">
                <!-- <span class="table-title">ពិន្ទុបញ្ជូលសរុប :</span>
                <span class="total-record">{{totalExamScore}}</span>
                <span class="table-title">នាក់</span> -->
            </div>
            <md-field md-clearable class="md-toolbar-section-end">
                <md-input placeholder="ស្វែងរកសិស្ស..." v-model="search" @input="searchOnTable" />
            </md-field>
        </md-table-toolbar>

        <md-table-empty-state md-label="សិស្សរកមិនឃើញ" :md-description="`មិនមានសិស្ស  '${search}'  ដែលអ្នកកំពុងស្វែងរកទេ.សូមស្វែងរកសិស្សផ្សេង​ទៀត!`" />

        <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell style="text-align:right" md-label="លេខសម្គាល់" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell md-label="ឈ្មោះសិស្ស" md-sort-by="studentDoc.name">{{ item.studentDoc.name }}</md-table-cell>
            <md-table-cell md-label="ភេទ" md-sort-by="studentDoc.gender">{{ item.studentDoc.gender }}</md-table-cell>
            <md-table-cell md-label="មុខវិជ្ជា">{{ item.subject}}</md-table-cell>
            <md-table-cell md-label="ពិន្ទុ">{{ item.score }}</md-table-cell>
            <md-table-cell md-label="សកម្មភាព">
                <md-button class="md-icon-button md-raised md-primary" @click='showDialog(item)'>
                    <md-icon>
                        <i class="md-icon icon-edit" />
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

    <Dialog :showExamScoreDialog='showExamScoreDialog' :cardItem='cardItem' :examScoreItem='examScoreItem' @closeDialog='showExamScoreDialog=false' />
    <!-- <PrintDialog :showPrintDialog='showPrintDialog' :printItem='printItem' @closeDialog='showPrintDialog=false' /> -->

    <ConfirmDialog :showConfirmDialog='showConfirmDialog' @closeDialog='showConfirmDialog=false' @handleAccept="handleAccept" />
</div>
</template>

<script>
import {
    colors
} from '@/styles/colors.js';
import ScmsCard from '@/components/SCMSCard';
import Dialog from './ExamScoreDialog';
// import PrintDialog from './PrintDialog';
import ConfirmDialog from '@/components/ConfirmDialog';

export default {
    components: {
        ScmsCard,
        Dialog,
        ConfirmDialog,
        // PrintDialog
    },
    data: () => ({
        showExamScoreDialog: false,
        showPrintDialog: false,
        showConfirmDialog: false,
        examScoreItem: {},
        printItem:{},
        cardItem: {
            name: 'បញ្ជូលពិន្ទុ',
            editTitle: 'កែប្រែវិញ្ញាសារប្រឡង',
            icon: 'icon-exam-score',
            iconBg: {
                background: `linear-gradient(${colors.lightBlue}, ${colors.blue})`
            }
        },
        showNotify: false,
        search: null,
        searched: [],
    }),
    computed: {
        totalExamScore() {
            return this.$store.getters.getTotalExamScore;
        },
        examScore() {
            return this.$store.getters.getExamScore;
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
                this.$store.commit("deleteExamScore", this.form);
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
                return items.filter(item => this.toLower(item.studentDoc.name).includes(this.toLower(term)))
            }
            return items
        },
        searchOnTable() {
            this.searched = this.searchByName(this.examScore, this.search)
        },
        showDialog(item) {
            this.examScoreItem = item;
            this.showExamScoreDialog = !this.showExamScoreDialog;
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
        this.searched = this.examScore;
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
