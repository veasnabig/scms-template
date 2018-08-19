<template>
<div style="margint-top:50px;">
    <div class="md-layout" style="margin-bottom:20px;">
        <div class="md-layout-item md-size-33">
            <md-field>
                <label class="md-label">ស្វែងរករបាយការណ៍</label>
                <md-input v-model="search" @input="searchReport" class="md-label" />
            </md-field>
        </div>
    </div>
    <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-33" style="margin-bottom:40px;" v-for="item,key in reportList" :key='key'>
            <router-link :to='item.path'>
                <scms-card :cardItem='item' />
            </router-link>
        </div>
    </div>

</div>
</template>

<script>
import {
    colors
} from '@/styles/colors.js';
import ScmsCard from '@/components/SCMSCard';

export default {
    components: {
        ScmsCard,
    },
    data: () => ({
        search: "",
        cardItem: [
            {
                name: 'របាយការណ៍ ពត៌មានវគ្គសិក្សា',
                icon: 'icon-courses',
                path: '/coursesReport',
                iconBg: {
                    background: `linear-gradient(${colors.lightBlue}, ${colors.blue})`
                }
            },
            {
                name: 'របាយការណ៍ ពត៌មានគ្រូបង្គោល',
                icon: 'icon-teacher',
                path: '/teacherReport',
                iconBg: {
                    background: `linear-gradient(${colors.lightGreen}, ${colors.green})`
                }
            },
            {
                name: 'របាយការណ៍ ពត៌មានសិស្ស',
                icon: 'icon-student',
                path: '/studentReport',
                iconBg: {
                    background: `linear-gradient(${colors.lightGreen}, ${colors.green})`
                }
            },
            {
                name: 'របាយការណ៍ អវត្តមានគ្រូបង្គោលប្រចាំថ្ងៃ',
                icon: 'icon-teacher-attendance',
                path: '/teacherAttendanceReport',
                iconBg: {
                    background: `linear-gradient(${colors.lightRed}, ${colors.red})`
                }
            }, 
            {
                name: 'របាយការណ៍ អវត្តមានសិស្សប្រចាំថ្ងៃ',
                icon: 'icon-student-attendance',
                path: '/studentAttendanceReport',
                iconBg: {
                    background: `linear-gradient(${colors.lightOrange}, ${colors.orange})`
                }
            }
        ],
        reportList:[]
    }),
    watch:{
        cardItem(val){
            if(!!val){
                this.reportList=val;
            }
        }
    },
    methods: {
        searchReport() {
            if (!!this.search) {
                let search = this.search;
                let filterReport = this.cardItem.filter((o)=>{
                    var data = o.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
                    return data;
                })
                this.reportList=filterReport;
            }else{
                this.reportList=this.cardItem;
            }

        }
    },
    created() {
        this.reportList = this.cardItem;
    }
}
</script>

<style lang="scss" scoped>

</style>
