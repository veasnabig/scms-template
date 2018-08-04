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
                <div class="sub-card" :style="item.style">
                    <span class="sub-card-value">{{item.total}}</span>
                </div>
                <h3 class="card-title">{{item.name}}</h3>
            </md-card>
        </div>
    </div>
</div>
</template>

<script>
import {colors} from '@/styles/colors.js'
export default {
    data: () => ({
        dashboardItems: [{
                name: 'Student',
                icon: 'icon-student',
                path: '/student',
                total: 50,
                style: {
                    background: `linear-gradient(${colors.lightBlue}, ${colors.blue})`
                }

            },
            {
                name: 'Register',
                icon: 'icon-register',
                path: '/student',
                total: 50,
                style: {
                    background: `linear-gradient(${colors.lightPink}, ${colors.pink})`
                }
            },
            {
                name: 'Attendance',
                icon: 'icon-attendance',
                path: '/student',
                total: 30,
                style: {
                    background: `linear-gradient(${colors.lightPink}, ${colors.purple})`
                }
            },
            {
                name: 'Exam',
                icon: 'icon-exam',
                path: '/student',
                total: 10,
                style: {
                    background: `linear-gradient(${colors.lightGreen}, ${colors.green})`
                }
            },
            {
                name: 'Certificate',
                icon: 'icon-certificate',
                path: '/student',
                total: 10,
                style: {
                    background: `linear-gradient(${colors.lightBlue}, ${colors.blue})`
                }
            },
            {
                name: 'Report',
                icon: 'icon-report',
                path: '/student',
                total: 5,
                style: {
                    background: `linear-gradient(${colors.lightYellow}, ${colors.yellow})`
                }
            },
            {
                name: 'Setting',
                icon: 'icon-setting',
                path: '/setting',
                total: 5,
                style: {
                    background: `linear-gradient(${colors.lightGrey}, ${colors.grey})`
                }
            }
        ]
    }),
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/index";
@import '../icons/icon.css';
.md-card {
    width: 120px;
    margin: 0 auto; // display: inline-block;
    border-radius: 30px;
    text-align: center;
    line-height: 120px;
    transition: all .5s;
    box-shadow: none;
}

.md-card-bg {
    background: linear-gradient($light-blue, $blue);
}

.card-title {
    margin-top: 30px;
    font-size: 20px;
    transition: all .5s;
    position: absolute;
    bottom: -120px;
    right: 0;
    left: 0;
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

.md-card:hover {
    transform: scale(1.2);
    transition: all .5s;
    .md-icon {
        transform: scale(1.3);
    }
    .card-title {
        transform: translateY(-20px) scale(.7); // transform: scale(.8);
    }
}

.md-icon {
    font-size: $dashboard-icon-size !important;
    color: $white;
    transition: all .5s;
}
</style>
