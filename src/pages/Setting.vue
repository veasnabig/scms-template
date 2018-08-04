<template>
<div style="margint-top:50px;">
    <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-20" v-for="item,key in cardItem" :key='key'>
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
        ScmsCard
    },
    data: () => ({
        cardItem: [{
                name: 'Courses',
                icon: 'icon-courses',
                path: '/courses',
                iconBg: {
                    background: `linear-gradient(${colors.lightBlue}, ${colors.blue})`
                }
            },
            {
                name: 'Teacher',
                icon: 'icon-teacher',
                path: '/teacher',
                iconBg: {
                    background: `linear-gradient(${colors.lightGreen}, ${colors.green})`
                }
            },
            {
                name: 'Attendance',
                icon: 'icon-attendance',
                path: '/attendance',
                iconBg: {
                    background: `linear-gradient(${colors.lightRed}, ${colors.red})`
                }
            }, {
                name: 'User',
                icon: 'icon-student',
                path: '/user',
                iconBg: {
                    background: `linear-gradient(${colors.lightTeal}, ${colors.teal})`
                }
            },
            {
                name: 'Company',
                icon: 'icon-student',
                path: '/company',
                iconBg: {
                    background: `linear-gradient(${colors.lightGrey}, ${colors.grey})`
                }
            }
        ]
    })
}
</script>

<style lang="scss" scoped>

</style>
