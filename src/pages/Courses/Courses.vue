<template>
<div>

    <div class="md-layout md-gutter scms-card-wrapper-modify">
        <div class="md-layout-item md-size-20">
            <scms-card :cardItem='cardItem' @click.native='showAddCoursesDialog=true' />
        </div>
    </div>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header style="height:70vh;">
        <md-table-toolbar>
            <div class="md-toolbar-section-start">
            </div>
            <md-field md-clearable class="md-toolbar-section-end">
                <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
            </md-field>
        </md-table-toolbar>

        <!-- <md-table-empty-state md-label="No users found" :md-description="`No user found for this '${search}' query. Try a different search term or create a new user.`">
            <md-button class="md-primary md-raised" @click="newUser">Create New User</md-button>
        </md-table-empty-state> -->

        <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell style="text-align:right" md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="Price" md-sort-by="price">{{ item.price }}</md-table-cell>
            <md-table-cell md-label="Duration" md-sort-by="duration">{{ item.duration }}</md-table-cell>
            <md-table-cell md-label="Description" md-sort-by="description">{{ item.description }}</md-table-cell>
            <md-table-cell md-label="Action">
                <md-button class="md-icon-button md-raised md-primary">
                    <md-icon>menu</md-icon>
                </md-button>

                <md-button class="md-icon-button md-raised md-accent">
                    <md-icon>thumb_up</md-icon>
                </md-button>
            </md-table-cell>
        </md-table-row>
    </md-table>

    <add-courses :showAddCoursesDialog='showAddCoursesDialog' :cardItem='cardItem' @closeDialog='showAddCoursesDialog=false' />

</div>
</template>

<script>
import {
    colors
} from '@/styles/colors.js';
import ScmsCard from '@/components/SCMSCard';
import AddCourses from './AddCourses.vue';

const toLower = text => {
    return text.toString().toLowerCase()
}
const searchByName = (items, term) => {
    if (term) {
        return items.filter(item => toLower(item.name).includes(toLower(term)))
    }
    return items
}
export default {
    components: {
        ScmsCard,
        AddCourses
    },
    data: () => ({
        showAddCoursesDialog: false,
        cardItem: {
            name: 'បង្កើតវគ្គថ្មី',
            icon: 'icon-courses',
            iconBg: {
                background: `linear-gradient(${colors.lightBlue}, ${colors.blue})`,
            }
        },
        search: null,
        searched: [],
        // courses: []
    }),
    computed: {
        courses() {
            return this.$store.getters.getCourses;
        }
    },
    methods: {
        newUser() {},
        searchOnTable() {
            this.searched = searchByName(this.courses, this.search)
        },
        show() {
            this.showAddCoursesDialog = !this.showAddCoursesDialog;
        }
    },
    created() {
        this.searched = this.courses
    }
}
</script>

<style lang="scss" scoped>
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
.md-table-cell {
    text-align: left;
}
</style>
