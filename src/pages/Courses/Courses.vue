<template>
<div>
    <div class="md-layout md-gutter scms-card-wrapper-modify">
        <div class="md-layout-item md-size-20">
            <scms-card :cardItem='cardItem' @click.native='showDialog' />
        </div>
    </div>
    <md-table resize v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header style="height:60vh;padding-top:6vh;">
        <md-table-toolbar>
            <div class="md-toolbar-section-start">
                <span class="table-title">វគ្គសិក្សាសរុប :</span>
                <span class="total-record">{{totalCourses}}</span>
                <span class="table-title">វគ្គ</span>
            </div>
            <md-field md-clearable class="md-toolbar-section-end">
                <md-input placeholder="ស្វែងរកវគ្គសិក្សា..." v-model="search" @input="searchOnTable" />
            </md-field>
        </md-table-toolbar>

        <md-table-empty-state md-label="វគ្គសិក្សារកមិនឃើញ" :md-description="`មិនមានវគ្គសិក្សា  '${search}'  ដែលអ្នកកំពុងស្វែងរកទេ.សូមស្វែងរកវគ្គសិក្សាផ្សេង​ទៀត!`" />

        <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell style="text-align:right" md-label="រ.ល" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell md-label="វគ្គសិក្សា" md-sort-by="name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="តម្លៃវគ្គសិក្សា" md-sort-by="price">$ {{ item.price }}</md-table-cell>
            <md-table-cell md-label="រយៈពេលសិក្សា" md-sort-by="duration">{{ item.duration }}</md-table-cell>
            <md-table-cell md-label="បរិយាយ" md-sort-by="description">{{ item.description }}</md-table-cell>
            <md-table-cell md-label="សកម្មភាព">
                <md-button class="md-icon-button md-raised md-primary" @click='showDialog(item)'>
                    <md-icon>create</md-icon>
                </md-button>
                <md-button class="md-icon-button md-raised md-accent" @click="confirmDialog(item)">
                    <md-icon>delete_outline</md-icon>
                </md-button>
            </md-table-cell>
        </md-table-row>
    </md-table>
    <vue-snotify v-show="showNotify==true" />

    <Dialog :showAddCoursesDialog='showAddCoursesDialog' :cardItem='cardItem' :coursesItem='coursesItem' @closeDialog='showAddCoursesDialog=false' />
    <ConfirmDialog :showConfirmDialog='showConfirmDialog' @closeDialog='showConfirmDialog=false' @handleAccept="handleAccept" />
</div>
</template>

<script>
import {
    colors
} from '@/styles/colors.js';
import ScmsCard from '@/components/SCMSCard';
import Dialog from './Dialog';
import ConfirmDialog from '@/components/ConfirmDialog';

export default {
    components: {
        ScmsCard,
        Dialog,
        ConfirmDialog
    },
    data: () => ({
        showAddCoursesDialog: false,
        showConfirmDialog: false,
        coursesItem: {},
        cardItem: {
            name: 'បង្កើតវគ្គសិក្សាថ្មី',
            addTitle: 'បង្កើតវគ្គសិក្សាថ្មី',
            editTitle: 'កែប្រែវគ្គសិក្សា',
            icon: 'icon-courses',
            iconBg: {
                background: `linear-gradient(${colors.lightBlue}, ${colors.blue})`,
            }
        },
        showNotify: false,
        search: null,
        searched: [],
    }),
    computed: {
        totalCourses(){
            return this.$store.getters.getTotalCourses;
        },
        courses() {
            return this.$store.getters.getCourses;
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
                this.$store.commit("deleteCourses", this.form);
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
            this.searched = this.searchByName(this.courses, this.search)
        },
        showDialog(item) {
            this.coursesItem = item;
            this.showAddCoursesDialog = !this.showAddCoursesDialog;
        },
        confirmDialog(item) {
            this.form = item;
            this.showConfirmDialog = !this.showConfirmDialog;
        },

    },
    created() {
        this.searched = this.courses
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
