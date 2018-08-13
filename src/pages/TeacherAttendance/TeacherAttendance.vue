<template>
<div>
    <div class="md-layout md-gutter scms-card-wrapper-modify">
        <div class="md-layout-item md-size-25">
            <scms-card :cardItem='cardItem' @click.native='showDialog' />
        </div>
    </div>
    <md-table resize v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header style="height:60vh;padding-top:6vh;">
        <md-table-toolbar>
            <div class="md-toolbar-section-start">
                <!-- <span class="table-title">មុខវិជ្ជាសរុប :</span>
                <span class="total-record">{{totalTeacherAttendance}}</span>
                <span class="table-title">មុខ</span> -->
            </div>
            <md-field md-clearable class="md-toolbar-section-end">
                <md-input placeholder="ស្វែងរកគ្រូបង្គោល..." v-model="search" @input="searchOnTable" />
            </md-field>
        </md-table-toolbar>

        <md-table-empty-state md-label="គ្រូបង្គោលរកមិនឃើញ" :md-description="`មិនមានគ្រូបង្គោល  '${search}'  ដែលអ្នកកំពុងស្វែងរកទេ.សូមស្វែងរកគ្រូបង្គោលផ្សេង​ទៀត!`" />

        <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell style="text-align:right" md-label="លេខសម្គាល់" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell md-label="ឈ្មោះគ្រូបង្គោល" md-sort-by="teacherDoc.name">{{ item.teacherDoc.name }}</md-table-cell>
            <md-table-cell md-label="ភេទ" md-sort-by="teacherDoc.gender">{{ item.teacherDoc.gender }}</md-table-cell>
            <md-table-cell md-label="មុខវិជ្ជា">
                <span v-for="i in item.teacherDoc.subjectDoc" :key="i.key">
                    {{i.name}},
                </span>
            </md-table-cell>
            <md-table-cell md-label="កាលបរិច្ឆេទ">{{ item.date }}</md-table-cell>
            <md-table-cell md-label="ស្ថានភាព">{{ item.status }}</md-table-cell>
            <md-table-cell md-label="សកម្មភាព">
                <!-- <md-button class="md-icon-button md-raised md-primary" @click='showDialog(item)'>
                    <md-icon>create</md-icon>
                </md-button> -->
                <md-button class="md-icon-button md-raised md-accent" @click="confirmDialog(item)">
                    <md-icon>delete_outline</md-icon>
                </md-button>
            </md-table-cell>
        </md-table-row>
    </md-table>
    <vue-snotify v-show="showNotify==true" />

    <Dialog :showTeacherAttendanceDialog='showTeacherAttendanceDialog' :cardItem='cardItem' :teacherAttendanceItem='teacherAttendanceItem' @closeDialog='showTeacherAttendanceDialog=false' />
    <ConfirmDialog :showConfirmDialog='showConfirmDialog' @closeDialog='showConfirmDialog=false' @handleAccept="handleAccept" />
</div>
</template>

<script>
import {
    colors
} from '@/styles/colors.js';
import ScmsCard from '@/components/SCMSCard';
import Dialog from './TeacherAttendanceDialog';
import ConfirmDialog from '@/components/ConfirmDialog';

export default {
    components: {
        ScmsCard,
        Dialog,
        ConfirmDialog
    },
    data: () => ({
        showTeacherAttendanceDialog: false,
        showConfirmDialog: false,
        teacherAttendanceItem: {},
        cardItem: {
            name: 'ចុះអវត្តមាន គ្រូបង្គោល', 
            editTitle: 'កែប្រែមុខវិជ្ជា',
            icon: 'icon-teacher',
            iconBg: {
                background: `linear-gradient(${colors.lightOrange}, ${colors.orange})`
            }
        },
        showNotify: false,
        search: null,
        searched: [],
    }),
    computed: {
        totalTeacherAttendance(){
            return this.$store.getters.getTotalTeacherAttendance;
        },
        teacherAttendance() {
            return this.$store.getters.getTeacherAttendance;
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
                this.$store.commit("deleteTeacherAttendance", this.form);
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
                return items.filter(item => this.toLower(item.teacherDoc.name).includes(this.toLower(term)))
            }
            return items
        },
        searchOnTable() {
            this.searched = this.searchByName(this.teacherAttendance, this.search)
        },
        showDialog(item) {
            this.teacherAttendanceItem = item;
            this.showTeacherAttendanceDialog = !this.showTeacherAttendanceDialog;
        },
        confirmDialog(item) {
            this.form = item;
            this.showConfirmDialog = !this.showConfirmDialog;
        },

    },
    created() {
        this.searched = this.teacherAttendance
    }
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
    color:$blue;
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
