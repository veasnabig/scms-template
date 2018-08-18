<template>
<div>
    <md-card>
        <md-card-header>
            <div class="md-title">
                <div class="wrapper-icon">
                    <i class="icon" :class="cardItem.icon"></i>
                    <span class="title">  
                        {{cardItem.name}}
                    </span>
                </div>
                <hr class="style-two">

                <div class="md-layout" style="text-align:center;margin-top:30px;">
                    <div class="md-layout-item md-size-33"></div>
                    <div class="md-layout-item md-size-33">
                        <div class="md-layout md-gutter">
                            <div class="md-layout-item">
                                <md-autocomplete v-model="studentValue" :md-options="student" @md-selected="selectedStudentValue(studentValue)" @md-changed="getStudent" @md-opened="getStudent">
                                    <label class="md-label">ជ្រើសរើសសិស្ស</label>
                                    <template slot="md-autocomplete-item" slot-scope="{ item }">{{ item.name }}</template>
                                </md-autocomplete>
                            </div>
                            <div class="md-layout-item" style="margin-top:10px;">
                                <div class="md-toolbar-section-end">
                                    <icon-button :iconButton="iconButton.buttonGenerate" :onClick="closeDialog" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </md-card-header>

        <md-card-content>
            <div class="md-layout">
                <div class="md-layout-item md-size-85">
                    <md-table>
                        <md-table-row>
                            <md-table-head>លេខសម្គាល់</md-table-head>
                            <md-table-head>ឈ្មោះសិស្ស</md-table-head>
                            <md-table-head>ភេទ</md-table-head>
                            <md-table-head>ថ្ងៃខែឆ្នាំកំណើត</md-table-head>
                            <md-table-head>ទូរស័ព្ទ</md-table-head>
                            <md-table-head>សារអេឡិចត្រូនិច</md-table-head>
                        </md-table-row>

                        <md-table-row v-for="student in studentList" :key="student.key">
                            <md-table-cell>{{student.id}}</md-table-cell>
                            <md-table-cell>{{student.name}}</md-table-cell>
                            <md-table-cell>{{student.gender}}</md-table-cell>
                            <md-table-cell>{{student.dob}}</md-table-cell>
                            <md-table-cell>{{student.tel}}</md-table-cell>
                            <md-table-cell>{{student.email}}</md-table-cell>
                        </md-table-row>

                        
                    </md-table>
                </div>
                <div class="md-layout-item md-size-15" style="margin-top:10px;">
                    <div class="md-toolbar-section-end">
                        <icon-button :iconButton="iconButton.buttonPrint" :onClick="closeDialog" />
                    </div>
                </div>
            </div>
        </md-card-content>
    </md-card>
</div>
</template>

<script>
import {
    colors
} from '@/styles/colors.js';
import IconButton from "@/components/IconButton";
export default {
    components: {
        IconButton
    },
    data: () => ({
        cardItem: {
            name: 'របាយការណ៍ ពត៌មានសិស្ស',
            icon: 'icon-student',
        },
        iconButton: {
            buttonGenerate: {
                text: "មើលរបាយការណ៍",
                icon: "icon-detail",
                iconBg: {
                    background: `linear-gradient(${colors.lightGreen}, ${colors.green})`
                }
            },
            buttonPrint: {
                text: "បោះពុម្ភ",
                icon: "icon-print",
                iconBg: {
                    background: `linear-gradient(${colors.lightPink}, ${colors.pink})`
                }
            }
        },
        studentValue: null,
        student: [],
    }),
    computed: {
        studentList() {
            return this.$store.getters.getStudent;
        }
    },
    methods: {
        closeDialog() {

        },
        selectedStudentValue(val) {
            if (!!val) {
                this.studentValue = val.name;
            }
        },
        getStudent(searchTerm) {
            this.student = new Promise(resolve => {
                window.setTimeout(() => {
                    if (!searchTerm) {
                        resolve(this.studentList)
                    } else {
                        const term = searchTerm.toString().toLowerCase()
                        resolve(this.studentList.filter(({
                            name
                        }) => name.toString().toLowerCase().includes(term)))
                    }
                }, 500)
            })
        }
    },
}
</script>

<style lang="scss" scoped>
@import "../../icons/icon.css";
@import "../../styles/scss/index";
.wrapper-icon {
    height: 100px;
    line-height: 100px;
    position: relative;
    .icon {
        position: absolute;
        font-size: 100px;
        color: $green;
    }
    .title {
        font-family: 'KhmerOSMuolLight', Arial, Helvetica, sans-serif;
        font-size: 20px;
        margin-left: 100px;
    }
}

hr.style-two {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
}

.table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    td,
    th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }
    tr:nth-child(even) {
        background-color: #eeeeee;
    }
}
</style>
