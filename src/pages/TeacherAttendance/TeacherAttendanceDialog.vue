<template>
<div>
    <md-dialog :md-active.sync="showTeacherAttendanceDialog" :md-click-outside-to-close='false' :md-close-on-esc='false' @keydown.esc="closeDialog">
        <md-dialog-title class="dialog-title-wrapper">
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-50">
                    <div class="icon-wrapper">
                        <i class="icon" :class="cardItem.icon"></i>
                    </div>
                    <span class="dialog-title">{{cardItem.name}}</span>
                </div>
                <div class="md-layout-item md-size-50">
                    <div class="md-toolbar-section-end">
                        <md-button class="md-icon-button" @click="closeDialog">
                            <i class="icon-corss" style="font-size:20px;"></i>
                        </md-button>
                    </div>
                </div>
            </div>
        </md-dialog-title>

        <div style="padding:20px;">
            <div class="md-layout">
                <div class="md-layout-item md-size-33" style="margin-top:-30px;">
                    <md-field>
                        <vue-datepicker :date="date" />
                    </md-field>
                </div>
            </div>
            <div class="md-layout">
                <div class="md-layout-item">
                    <md-table resize v-model="searched" @md-selected="onSelect" md-card :md-selected-value.sync="selected" style="height:30vh;">
                        <md-table-toolbar>
                            <div class="md-layout-item" />
                            <div class="md-layout-item md-size-33">
                                <md-field md-clearable class="md-toolbar-section-end">
                                    <md-input placeholder="ស្វែងរកគ្រូបង្គោល..." v-model="search" @input="searchOnTable" />
                                </md-field>
                            </div>
                        </md-table-toolbar>
                        <md-table-row slot="md-table-row" slot-scope="{ item }" :md-disabled="item.name.includes('Stave')" md-selectable="multiple" md-auto-select>
                            <md-table-cell md-label="លេខសម្គាល់">{{ item.id }}</md-table-cell>
                            <md-table-cell md-label="ឈ្មោះគ្រូបង្គោល">{{ item.name }}</md-table-cell>
                            <md-table-cell md-label="ភេទ">{{ item.gender }}</md-table-cell>
                        </md-table-row>
                    </md-table>
                </div>
            </div>
            <div class="md-layout">
                <div class="md-layout-item" style="margin-top:20px;">
                    <div class="md-toolbar-section-end">
                        <icon-button :iconButton="iconButton.buttonSave" :onClick="closeDialog" />
                    </div>
                </div>
            </div>
        </div>
        <vue-snotify v-show="showNotify==true" />
    </md-dialog>

</div>
</template>

<script>
import {
    colors
} from "@/styles/colors.js";
import searchByName from '@/lib/searchByName.js';
import VueDatepicker from '@/components/VueDatepicker';
import increaseId from "@/lib/increaseId.js";
import ScmsCard from "@/components/SCMSCard";
import IconButton from "@/components/IconButton";
import {
    validationMixin
} from "vuelidate";
import {
    required,
    email,
    minLength,
    maxLength
} from "vuelidate/lib/validators";
export default {
    components: {
        ScmsCard,
        IconButton,
        VueDatepicker
    },
    props: {
        showTeacherAttendanceDialog: Boolean,
        cardItem: Object,
        subjectItem: {}
    },
    mixins: [validationMixin],
    data: () => ({
        date: {
            time: 'កាលបរិច្ឆេទ'
        },
        showNotify: false,
        iconButton: {
            buttonSave: {
                text: "រក្សាទុក",
                icon: "icon-save",
                iconBg: {
                    background: `linear-gradient(${colors.lightBlue}, ${colors.blue})`
                }
            },
            buttonReset: {
                text: "កំណត់ឡើងវិញ",
                icon: "icon-reset",
                iconBg: {
                    background: `linear-gradient(${colors.lightTeal}, ${colors.teal})`
                }
            }
        },
        selected: [],
        search: null,
        searched: [],
        status: ""
    }),
    computed: {
        getIncreaseSubjectId() {
            const id = this.$store.getters.getIncreaseSubjectId;
            return increaseId(id);
        },
        teacher() {
            return this.$store.getters.getTeacher;
        },
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
        searchOnTable() {
            this.searched = searchByName(this.teacher, this.search)
        },
        closeDialog() {
            this.selected = [];
            this.date = {
                time: "កាលបរិច្ឆេទ"
            }
            this.$emit("closeDialog", !this.showTeacherAttendanceDialog);
        },
        onSelect(items) {
            this.selected = items;
        },
    },
    created() {
        this.searched = this.teacher;
    },
};
</script>

<style lang="scss" scoped>
@import "../../icons/icon.css";
@import "../../styles/scss/index";
.md-dialog {
    border-radius: 12px;
    width: 100vh;
}

.dialog-title-wrapper {
    height: 100px;
    -webkit-box-shadow: 0px 13px 35px -24px rgba(204, 204, 204, 1);
    -moz-box-shadow: 0px 13px 35px -24px rgba(204, 204, 204, 1);
    box-shadow: 0px 13px 35px -24px rgba(204, 204, 204, 1); // margin-top: -20px;
    .icon-wrapper {
        width: 80px;
        height: 80px;
        position: absolute;
        top: 10px;
        .icon {
            font-size: 80px !important;
        }
    }
    .dialog-title {
        margin-left: 100px;
        line-height: 50px;
        font-family: "khPreyVeng"; // background: -webkit-linear-gradient(#eee, #333);
        // -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
    }
}
</style>
