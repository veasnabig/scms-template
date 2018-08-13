<template>
<div>
    <div class="md-layout md-gutter scms-card-wrapper-modify">
        <div class="md-layout-item md-size-25 md-small-size-100">
            <scms-card :cardItem='cardItem' @click.native='showDialog' />
        </div>
    </div>
    <md-table resize v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header style="height:60vh;padding-top:6vh;">
        <md-table-toolbar>
            <div class="md-toolbar-section-start">
                <span class="table-title">មុខវិជ្ជាសរុប :</span>
                <span class="total-record">{{totalSubject}}</span>
                <span class="table-title">មុខ</span>
            </div>
            <md-field md-clearable class="md-toolbar-section-end">
                <md-input placeholder="ស្វែងរកមុខវិជ្ជា..." v-model="search" @input="searchOnTable" />
            </md-field>
        </md-table-toolbar>

        <md-table-empty-state md-label="មុខវិជ្ជារកមិនឃើញ" :md-description="`មិនមានមុខវិជ្ជា  '${search}'  ដែលអ្នកកំពុងស្វែងរកទេ.សូមស្វែងរកវគ្គសិក្សាផ្សេង​ទៀត!`" />

        <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell style="text-align:right" md-label="រ.ល" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell md-label="មុខវិជ្ជា" md-sort-by="name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="តម្លៃមុខវិជ្ជា" md-sort-by="price">$ {{ item.price }}</md-table-cell>
            <md-table-cell md-label="រយៈពេលសិក្សា" md-sort-by="duration">{{ item.duration }}</md-table-cell>
            <md-table-cell md-label="បរិយាយ" md-sort-by="description">{{ item.description }}</md-table-cell>
            <md-table-cell md-label="សកម្មភាព">
                <md-button class="md-icon-button md-raised md-primary" @click='showUpdate(item)'>
                    <md-icon>create</md-icon>
                </md-button>
                <md-button class="md-icon-button md-raised md-accent" @click="confirmDialog(item)">
                    <md-icon>delete_outline</md-icon>
                </md-button>
            </md-table-cell>
        </md-table-row>
    </md-table>
    <vue-snotify v-show="showNotify==true" />

    <Dialog :showSubjectDialog='showSubjectDialog' :type="type" :cardItem='cardItem' :subjectItem='subjectItem' @closeDialog='closeDialog' />
    <ConfirmDialog :showConfirmDialog='showConfirmDialog' @closeDialog='showConfirmDialog=false' @handleAccept="handleAccept" />
</div>
</template>

<script>
import {
    colors
} from '@/styles/colors.js';
import ScmsCard from '@/components/SCMSCard';
import Dialog from './CompanyDialog';
import ConfirmDialog from '@/components/ConfirmDialog';

export default {
    components: {
        ScmsCard,
        Dialog,
        ConfirmDialog
    },
    data: () => ({
        type: false,
        showSubjectDialog: false,
        showConfirmDialog: false,
        subjectItem: {},
        cardItem: {
            name: 'ពត៌មានក្រុមហ៊ុន',
            editTitle: 'កែប្រែពត៌មានក្រុមហ៊ុន',
            icon: 'icon-company',
            iconBg: {
                background: `linear-gradient(${colors.lightGrey}, ${colors.grey})`
            }
        },
        showNotify: false,
        search: null,
        searched: [],
    }),
    computed: {
        totalSubject() {
            return this.$store.getters.getTotalSubject;
        },
        subject() {
            return this.$store.getters.getSubject;
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
                this.$store.commit("deleteSubject", this.form);
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
            this.searched = this.searchByName(this.subject, this.search)
        },
        showDialog() {
            this.showSubjectDialog = !this.showSubjectDialog;
        },
        closeDialog() {
            this.type=false;
            this.showSubjectDialog = false;
        },
        showUpdate(item) {
            this.type = true;
            this.subjectItem = item;
            this.showDialog();
        },
        confirmDialog(item) {
            this.form = item;
            this.showConfirmDialog = !this.showConfirmDialog;
        },

    },
    created() {
        this.searched = this.subject
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
