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
                                <md-autocomplete v-model="teacherValue" :md-options="teacher" @md-selected="selectedTeacherValue(teacherValue)" @md-changed="getTeacher" @md-opened="getTeacher">
                                    <label class="md-label">ជ្រើសរើសគ្រូបង្គោល</label>
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
                            <md-table-head>ឈ្មោះគ្រូបង្គោល</md-table-head>
                            <md-table-head>ភេទ</md-table-head>
                            <md-table-head>ថ្ងៃខែឆ្នាំកំណើត</md-table-head>
                            <md-table-head>មុខវិជ្ជាបង្រៀន</md-table-head>
                            <md-table-head>ទូរស័ព្ទ</md-table-head>
                            <md-table-head>សារអេឡិចត្រូនិច</md-table-head>
                        </md-table-row>

                        <md-table-row v-for="teacher in teacherList" :key="teacher.key">
                            <md-table-cell>{{teacher.id}}</md-table-cell>
                            <md-table-cell>{{teacher.name}}</md-table-cell>
                            <md-table-cell>{{teacher.gender}}</md-table-cell>
                            <md-table-cell>{{teacher.dob}}</md-table-cell>
                            <md-table-cell >
                                <div v-for="subject in teacher.subjectDoc" :key="subject.key" style="margin:10px;">
                                    {{subject.name}}
                                </div>
                            </md-table-cell>
                            <md-table-cell>{{teacher.tel}}</md-table-cell>
                            <md-table-cell>{{teacher.email}}</md-table-cell>
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
            name: 'របាយការណ៍ ពត៌មានគ្រូបង្គោល',
            icon: 'icon-teacher',
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
        teacherValue: null,
        teacher: [],
    }),
    computed: {
        teacherList() {
            return this.$store.getters.getTeacher;
        }
    },
    methods: {
        closeDialog() {

        },
        selectedTeacherValue(val) {
            if (!!val) {
                this.teacherValue = val.name;
            }
        },
        getTeacher(searchTerm) {
            this.teacher = new Promise(resolve => {
                window.setTimeout(() => {
                    if (!searchTerm) {
                        resolve(this.teacherList)
                    } else {
                        const term = searchTerm.toString().toLowerCase()
                        resolve(this.teacherList.filter(({
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
