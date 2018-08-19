<template>
<div>
    <div class="md-layout md-gutter scms-card-wrapper-modify">
        <div class="md-layout-item md-size-25 md-small-size-100">
            <scms-card :cardItem='cardItem' @click.native='showTeacherDialog=true' :pointIcon="true"/>
        </div>
    </div>
    <md-table resize v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header style="height:60vh;padding-top:6vh;">
        <md-table-toolbar>
            <div class="md-toolbar-section-start">
                <span class="table-title">ចំនួនគ្រូបង្គោលសរុប :</span>
                <span class="total-record">{{totalTeacher}}</span>
                <span class="table-title">នាក់</span>
            </div>
            <md-field md-clearable class="md-toolbar-section-end">
                <md-input placeholder="ស្វែងរកគ្រូបង្គោល..." v-model="search" @input="searchOnTable" />
            </md-field>
        </md-table-toolbar>

        <md-table-empty-state md-label="គ្រូបង្គោលរកមិនឃើញ" :md-description="`មិនមានគ្រូបង្គោល  '${search}'  ដែលអ្នកកំពុងស្វែងរកទេ.សូមស្វែងរកគ្រូបង្គោលផ្សេង​ទៀត!`" />

        <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell style="text-align:right" md-label="រ.ល" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell md-label="ឈ្មោះគ្រូបង្គោល" md-sort-by="name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="ភេទ" md-sort-by="price">{{ item.gender }}</md-table-cell>
            <md-table-cell md-label="ថ្ងៃខែឆ្នាំកំណើត" md-sort-by="duration">{{ item.dob }}</md-table-cell>
            <md-table-cell md-label="លេខទូរស័ព្ទ" md-sort-by="duration">{{ item.tel }}</md-table-cell>
            <md-table-cell md-label="សារអេឡិចត្រូនិច" md-sort-by="duration">{{ item.email }}</md-table-cell>
            <md-table-cell md-label="សកម្មភាព">
                <md-button class="md-icon-button md-raised md-primary" @click='update(item)'>
                    <md-icon>create</md-icon>
                </md-button>
                <md-button class="md-icon-button md-raised md-accent" @click="confirmDialog(item)">
                    <md-icon>delete_outline</md-icon>
                </md-button>
            </md-table-cell>
        </md-table-row>
    </md-table>
    <vue-snotify v-show="showNotify==true" />

    <Dialog :showTeacherDialog='showTeacherDialog' :type='type' :cardItem='cardItem' :teacherItem='teacherItem' @closeDialog='closeDialog' />
    <ConfirmDialog :showConfirmDialog='showConfirmDialog' @closeDialog='showConfirmDialog=false' @handleAccept="handleAccept" />
</div>
</template>

<script>
import {
    colors
} from '@/styles/colors.js';
import searchByName from '@/lib/searchByName.js';
import ScmsCard from '@/components/SCMSCard';
import Dialog from './TeacherDialog';
import ConfirmDialog from '@/components/ConfirmDialog';

export default {
    components: {
        ScmsCard,
        Dialog,
        ConfirmDialog
    },
    data: () => ({
        type: false,
        showTeacherDialog: false,
        showConfirmDialog: false,
        teacherItem: {},
        cardItem: {
            name: 'បញ្ជូលពត៌មានគ្រូបង្គោល',
            addTitle: 'បញ្ជូលពត៌មានគ្រូបង្គោល',
            editTitle: 'កែប្រែពត៌មានគ្រូបង្គោល',
            icon: 'icon-teacher',
            iconBg: {
                background: `linear-gradient(${colors.lightGreen}, ${colors.green})`
            }
        },
        showNotify: false,
        search: null,
        searched: []
    }),
    computed: {
        totalTeacher() {
            return this.$store.getters.getTotalTeacher;
        },
        teacher() {
            return this.$store.getters.getTeacher;
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
                this.$store.commit("deleteTeacher", this.form);
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
        searchOnTable() {
            this.searched = searchByName(this.teacher, this.search)
        },
        showDialog() {
            this.showTeacherDialog = !this.showTeacherDialog;
        },
        closeDialog() {
            this.type=false;
            this.teacherItem = null;
            this.showTeacherDialog = false;
            this.$store.dispatch('deleteTemp');
        },
        update(item) {
            if (!!item) {
                this.type = true;
                this.teacherItem = item;
                this.showTeacherDialog = !this.showTeacherDialog;
            }
        },
        confirmDialog(item) {
            this.form = item;
            this.showConfirmDialog = !this.showConfirmDialog;
        }
    },
    created() {
        this.searched = this.teacher;
    },
}
</script>

<style lang="scss" scoped>
@import "../../styles/scss/index";
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
