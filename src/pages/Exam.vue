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
                name: 'វិញ្ញាសារប្រឡង',
                icon: 'icon-exam-paper',
                path: '/examPaper',
                iconBg: {
                    background: `linear-gradient(${colors.lightTeal}, ${colors.teal})`
                }
            },
            {
                name: 'បញ្ចូលពិន្ទុ',
                icon: 'icon-exam-score',
                path: '/examScore',
                iconBg: {
                    background: `linear-gradient(${colors.lightBlue}, ${colors.blue})`
                }
            },
            {
                name: 'លទ្ធផលការប្រឡង',
                icon: 'icon-exam-result',
                path: '/examResult',
                iconBg: {
                    background: `linear-gradient(${colors.lightGreen}, ${colors.green})`
                }
            }
        ]
    })
}
</script>

<style lang="scss" scoped>

</style>
