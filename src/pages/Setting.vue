<template>
<div style="margint-top:50px;">
    <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-20" style="margin-bottom:40px;" v-for="item,key in cardItem" :key='key'>
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
                name: 'មុខវិជ្ជា',
                icon: 'icon-subject',
                path: '/subject',
                iconBg: {
                    background: `linear-gradient(${colors.lightPink}, ${colors.pink})`
                }
            },
            {
                name: 'វគ្គបណ្តុះបណ្តាល',
                icon: 'icon-courses',
                path: '/courses',
                iconBg: {
                    background: `linear-gradient(${colors.lightBlue}, ${colors.blue})`
                }
            },
            {
                name: 'គ្រូបង្គោល',
                icon: 'icon-teacher',
                path: '/teacher',
                iconBg: {
                    background: `linear-gradient(${colors.lightGreen}, ${colors.green})`
                }
            },
            {
                name: 'អ្នកប្រើប្រាស់',
                icon: 'icon-user',
                path: '/notfound',
                iconBg: {
                    background: `linear-gradient(${colors.lightTeal}, ${colors.teal})`
                }
            },
            {
                name: 'ក្រុមហ៊ុន',
                icon: 'icon-company',
                path: '/notfound',
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
