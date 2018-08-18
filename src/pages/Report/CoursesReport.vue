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
                                <md-autocomplete v-model="coursesValue" :md-options="courses" @md-selected="selectedCoursesValue(coursesValue)" @md-changed="getCourses" @md-opened="getCourses">
                                    <label class="md-label">ជ្រើសរើសវគ្គសិក្សា</label>
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
                            <md-table-head>វគ្គសិក្សា</md-table-head>
                            <md-table-head>តម្លៃ</md-table-head>
                            <md-table-head>រយៈពេលសិក្សា</md-table-head>
                            <md-table-head>មុខវិជ្ជា</md-table-head>
                        </md-table-row>

                        <md-table-row v-for="courses in coursesList" :key="courses.key">
                            <md-table-cell>{{courses.id}}</md-table-cell>
                            <md-table-cell>{{courses.name}}</md-table-cell>
                            <md-table-cell>${{courses.price}}</md-table-cell>
                            <md-table-cell>{{courses.duration}}</md-table-cell>
                            <md-table-cell >
                                <div v-for="subject in courses.subjectDoc" :key="subject.key" style="margin:10px;">
                                    {{subject.name}} (${{subject.price}}, {{subject.duration}})
                                </div>
                            </md-table-cell>
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
            name: 'របាយការណ៍ ពត៌មានវគ្គសិក្សា',
            icon: 'icon-courses',
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
        coursesValue: null,
        courses: [],
    }),
    computed: {
        coursesList() {
            return this.$store.getters.getCourses;
        }
    },
    methods: {
        closeDialog() {

        },
        selectedCoursesValue(val) {
            if (!!val) {
                this.coursesValue = val.name;
            }
        },
        getCourses(searchTerm) {
            this.courses = new Promise(resolve => {
                window.setTimeout(() => {
                    if (!searchTerm) {
                        resolve(this.coursesList)
                    } else {
                        const term = searchTerm.toString().toLowerCase()
                        resolve(this.coursesList.filter(({
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
