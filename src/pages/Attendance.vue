<template>
<div style="margint-top:50px;">
    <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-20" style="margin-bottom:40px;" v-for="item in cardItem" :key='item.key'>
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
        cardItem: [{
                name: 'អវត្តមាន គ្រូបង្គោល',
                icon: 'icon-teacher',
                path: '/teacherAttendance',
                iconBg: {
                    background: `linear-gradient(${colors.lightOrange}, ${colors.orange})`
                }
            },
            {
                name: 'អវត្តមាន សិស្ស',
                icon: 'icon-student',
                path: '/studentAttendance',
                iconBg: {
                    background: `linear-gradient(${colors.lightRed}, ${colors.red})`
                }
            }
        ]
    })
}
</script>

<style lang="scss" scoped>

</style>
