<template>
<div>
    <div class="md-layout md-gutter scms-card-wrapper-modify">
        <div class="md-layout-item md-size-25" @click="showDialog=true">
            <scms-card :cardItem='cardItem' />
        </div>
    </div>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
        <md-table-toolbar>
            <div class="md-toolbar-section-start">
            </div>

            <md-field md-clearable class="md-toolbar-section-end">
                <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
            </md-field>
        </md-table-toolbar>

        <md-table-empty-state md-label="No users found" :md-description="`No user found for this '${search}' query. Try a different search term or create a new user.`">
            <md-button class="md-primary md-raised" @click="newUser">Create New User</md-button>
        </md-table-empty-state>

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

    <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Preferences</md-dialog-title>

        <md-tabs md-dynamic-height>
            <md-tab md-label="General">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
            </md-tab>
        </md-tabs>

        <md-dialog-actions>
            <md-button class="md-primary" @click="showDialog=false">Close</md-button>
            <md-button class="md-primary" @click="showDialog=false">Save</md-button>
        </md-dialog-actions>
    </md-dialog>

</div>
</template>

<script>
import {
    colors
} from '@/styles/colors.js';
import ScmsCard from '@/components/SCMSCard';
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
        ScmsCard
    },
    data: () => ({
        showDialog: false,
        cardItem: {
            name: 'Add New Courses',
            icon: 'icon-courses',
            iconBg: {
                background: `linear-gradient(${colors.lightBlue}, ${colors.blue})`
            }
        },
        search: null,
        searched: [],
        users: [{
                id: 1,
                name: "Basic Computer",
                price: 20,
                duration: '2 months'
            },
            {
                id: 2,
                name: "Graphic Design",
                price: 120,
                duration: '4 months'
            },

        ]
    }),
    methods: {
        newUser() {
            window.alert('Noop')
        },
        searchOnTable() {
            this.searched = searchByName(this.users, this.search)
        },
    },
    created() {
        this.searched = this.users
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
