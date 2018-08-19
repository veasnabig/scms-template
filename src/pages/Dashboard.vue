<template>
<div class="wrapper">
    <div class="md-layout">
        <div class="md-layout-item" v-for="item,key in dashboardItems" :key='key'>
            <md-card :style="item.style">
                <router-link :to='item.path' style="text-decoration:none;">
                    <md-card-media-cover md-solid>
                        <md-card-media>
                            <i class="md-icon" :class="item.icon"></i>
                        </md-card-media>
                    </md-card-media-cover>
                </router-link>
                <span v-if="item.total>0">
                    <div class="sub-card" :style="item.style">
                        <span class="sub-card-value">{{item.total}}</span>
                    </div>
                </span>
                <!-- <div class="md-layout-item card-title">{{item.name}}</div> -->
            </md-card>
            <div class="" style="margin-top:35px;font-family:'khPreyVeng';font-size:18px;">
                {{item.name}}
            </div>
        </div>
    </div>
    {{getTotalStudent}}{{getTotalRegister}}
</div>
</template>

<script>
import {
    colors
} from '@/styles/colors.js'
export default {
    data: () => ({
        dashboardItems: [{
                name: 'សិស្ស',
                icon: 'icon-student',
                path: '/student',
                total: 0,
                style: {
                    background: `linear-gradient(${colors.lightBlue}, ${colors.blue})`
                }

            },
            {
                name: 'ចុះឈ្មោះ',
                icon: 'icon-register',
                path: '/register',
                total: 0,
                style: {
                    background: `linear-gradient(${colors.lightPink}, ${colors.pink})`
                }
            },
            {
                name: 'អវត្តមាន',
                icon: 'icon-attendance',
                path: '/attendance',
                // total: 30,
                style: {
                    background: `linear-gradient(${colors.lightRed}, ${colors.red})`
                }
            },
            {
                name: 'ពត៌មានការប្រឡង',
                icon: 'icon-exam',
                path: '/exam',
                // total: 10,
                style: {
                    background: `linear-gradient(${colors.lightTeal}, ${colors.teal})`
                }
            },
            {
                name: 'ចេញវិញ្ញាបនបត្រ',
                icon: 'icon-certificate',
                path: '/certificate',
                // total: 10,
                style: {
                    background: `linear-gradient(${colors.lightGreen}, ${colors.green})`
                }
            },
            {
                name: 'របាយការណ៍',
                icon: 'icon-report',
                path: '/report',
                total: 5,
                style: {
                    background: `linear-gradient(${colors.lightYellow}, ${colors.yellow})`
                }
            },
            {
                name: 'ការកំណត់',
                icon: 'icon-setting',
                path: '/setting',
                total: 5,
                style: {
                    background: `linear-gradient(${colors.lightGrey}, ${colors.grey})`
                }
            }
        ]
    }),
    computed: {
        getTotalStudent() {
            let total = this.$store.getters.getTotalStudent;
            this.totalStudent(total);
            // return this.$store.getters.getTotalStudent;
        },
        getTotalRegister() {
            let total = this.$store.getters.getTotalRegister;
            this.totalRegister(total);
            // return this.$store.getters.getTotalRegister;
        }
    },
    methods:{
        totalStudent(val){
            this.dashboardItems[0].total=val;
        },
        totalRegister(val){
            this.dashboardItems[1].total=val;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/scss/index";
@import '../icons/icon.css';
.md-card {
    width: 120px;
    margin: 0 auto; // display: inline-block;
    border-radius: 35px;
    text-align: center;
    line-height: 120px;
    transition: all .3s;
    box-shadow: none;
}

.md-card-bg {
    background: linear-gradient($light-blue, $blue);
}

.card-title {
    margin-top: 35px;
    font-family: 'khPreyVeng';
    font-size: 18px;
}

.sub-card {
    width: 60px;
    height: 60px;
    border-radius: 50%; // background: linear-gradient($light-blue, $blue);
    border: 3px solid $white;
    text-align: center;
    line-height: 60px;
    right: 0;
    bottom: 0;
    margin-bottom: -30px;
    margin-right: -30px;
    position: absolute;
    transition: all .5s;
}

.sub-card-value {
    font-size: 18px;
    transition: all .5s;
    color: $white;
}

.md-card:before {
    // position: absolute;
    top: 0;
    left: -75%;
    z-index: 999;
    display: block;
    content: "";
    width: 50%;
    height: 100%;
    background: linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, .3) 100%);
    transform: skewX(-25deg);
}

.md-layout-item:hover {
    .card-title {
        transform: translateY(-20px) scale(.7); // transform: scale(.8);
    }
}

.md-card:hover {
    transform: scale(1.2);
    transition: all .5s;
    .md-icon {
        transform: scale(1.3);
    }
}

.md-icon {
    font-size: $dashboard-icon-size !important;
    color: $white;
    transition: all .5s;
}
</style>
