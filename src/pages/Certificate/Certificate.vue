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
                    <div class="md-layout-item md-size-20"></div>
                    <div class="md-layout-item md-size-80">
                        <div class="md-layout md-gutter">
                            <div class="md-layout-item md-size-25">
                                <md-autocomplete v-model="coursesValue" :md-options="courses" @md-selected="selectedCoursesValue(coursesValue)" @md-changed="getCourses" @md-opened="getCourses">
                                    <label class="md-label">ជ្រើសរើសវគ្គសិក្សា</label>
                                    <template slot="md-autocomplete-item" slot-scope="{ item }">{{ item.name }}</template>
                                </md-autocomplete>
                            </div>
                            <div class="md-layout-item md-size-25">
                                <md-autocomplete v-model="studentValue" :md-options="student" @md-selected="selectedStudentValue(studentValue)" @md-changed="getStudent" @md-opened="getStudent">
                                    <label class="md-label">ជ្រើសរើសសិស្ស</label>
                                    <template slot="md-autocomplete-item" slot-scope="{ item }">{{ item.name }}</template>
                                </md-autocomplete>
                            </div>
                            <div class="md-layout-item md-size-20" style="margin-top:10px;">
                                <div class="md-toolbar-section-end">
                                    <icon-button :iconButton="iconButton.buttonReset" :onClick="closeDialog" />
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
                    <div class="certificate-wrapper">
                        <img src="../../assets/certificate.png" alt="">
                        <img src="../../assets/H2E-Edu.png" class="logo" />
                        <span class="certificate-title">វិញ្ញាបនបត្របញ្ជាក់ការសិក្សា</span>
                        <span class="certify">សូមបញ្ជាក់ថាឈ្មោះ</span>
                        <span class="name">{{certificate.name}}</span>
                        <div class="md-layout md-gutter info-wrapper" style="margin:0;padding:0;">
                            <div class="md-layout-item md-size-50" style="padding:0;">
                                <div>ភេទ</div>
                                <div class="value">{{certificate.gender}}</div>
                            </div>
                            <div class="md-layout-item md-size-50" style="padding:0;">
                                <div>ថ្ងៃខែឆ្នាំកំណើត</div>
                                <div class="value">{{certificate.dob}}</div>
                            </div>
                        </div>
                        <span class="lable-completed">បានបញ្ចប់ដោយជោគជ័យក្នុងវគ្គបណ្តុះបណ្តាល ផ្នែកកុំព្យូទ័រ</span>
                        <span class="lable-courses">
                            {{certificate.courses}}
                                <!-- <span v-for="subject in certificate.subjectDoc" :key="subject.key">
                                    {{subject.name}}
                                </span> -->
                        </span>
                        <div class="photo-wrapper">
                            <span>4*6</span>
                        </div>
                        <span class="direct">នាយក</span>
                    </div>
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
            name: 'ចេញវិញ្ញាបនបត្រ',
            icon: 'icon-certificate',
        },
        iconButton: {
            buttonReset: {
                text: "បង្កើតវិញ្ញាបនបត្រ",
                icon: "icon-detail",
                iconBg: {
                    background: `linear-gradient(${colors.lightGreen}, ${colors.green})`
                }
            },
            buttonPrint: {
                text: "បោះពុម្ភវិញ្ញាបនបត្រ",
                icon: "icon-print",
                iconBg: {
                    background: `linear-gradient(${colors.lightPink}, ${colors.pink})`
                }
            }
        },
        coursesValue: null,
        courses: [],
        studentValue: null,
        student: [],
    }),
    computed: {
        coursesList() {
            return this.$store.getters.getCourses;
        },
        studentList() {
            return this.$store.getters.getStudent;
        },
        certificate() {
            return this.$store.getters.getCertificate;
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
        selectedStudentValue(val) {
            if (!!val) {
                this.studentValue = val.name;
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
$label:#f9ae1c;
$value:#2ab34b;
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

.certificate-wrapper {
    position: relative;
    font-family: 'KhmerOSMuolpali', Arial, Helvetica, sans-serif;
    color: $label;
    .logo {
        position: absolute;
        top: 15%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 15%;
    }
    .certificate-title {
        position: absolute;
        top: 28%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 25px;
    }
    .certify {
        position: absolute;
        top: 38%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 15px;
    }
    .name {
        position: absolute;
        top: 43%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 30px;
        color: $value;
    }
    .value {
        margin-top: 10px;
        font-size: 18px;
        color: $value;
    }
    .lable-completed {
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .lable-courses {
        position: absolute;
        top: 65%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 20px;
        color: $value;
        font-family: 'KhBaphnom', Arial, Helvetica, sans-serif;
    }
    .info-wrapper {
        width: 40%;
        position: absolute;
        top: 52%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .photo-wrapper {
        width: 70px;
        height: 80px;
        border: 1px solid $label;
        border-radius: 10px;
        position: absolute;
        top: 78%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        line-height: 80px;
    }
    .direct {
        position: absolute;
        top: 85%;
        right: 35%;
        transform: translate(-50%, -50%);
        font-family: 'KhmerOSMuolLight', Arial, Helvetica, sans-serif;
    }
}
</style>
