<template>
    <div class="sidebar">
        <div class="logo" @click="toHome">
            <img src="../../assets/logo.png" width="164" alt="">
        </div>
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" v-if="item.subs">
                        <!--<template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>-->
                        <template slot="title">
                            <icon :name="item.icon"></icon>
                            <span> {{ item.title }}</span>
                        </template>
                        <template v-if="item.subs[0].subs">
                            <div v-for="(subItem, i) in item.subs" :key="i" :index="subItem.index">
                                <el-submenu :index="subItem.index">
                                    <template slot="title">
                                        <icon :name="subItem.icon"></icon>
                                        <span> {{ subItem.title }}</span>
                                    </template>
                                    <el-menu-item v-for="(subItem2, i) in subItem.subs" :key="i" :index="subItem2.index">
                                        <icon :name="subItem2.icon"></icon>
                                        {{ subItem2.title }}
                                    </el-menu-item>
                                </el-submenu>
                            </div>
                        </template>
                        <el-menu-item v-for="(subItem, i) in item.subs" :key="i" :index="subItem.index" v-else>
                            {{ subItem.title }}
                        </el-menu-item>

                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <icon :name="item.icon"></icon>
                        <span>{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
            <!-- <el-menu-item index="#">
                <a style="color: #cccccc" href="/swagger/">
                    <icon name="file-word-o"></icon> 监控Rest接口
                </a>
            </el-menu-item> -->
        </el-menu>
    </div>
</template>

<script>
import ElMenuItem from "../../../node_modules/element-ui/packages/menu/src/menu-item.vue";

export default {
    components: { ElMenuItem },
    data() {
        return {
            items: [
                {
                    icon: 'th-list',
                    index: '2',
                    title: '节点',
                    subs: [
                        {
                            icon: 'home',
                            index: 'B28',
                            title: 'B28机房',
                            subs: [
                                {
                                    icon: 'server',
                                    index: 'b28-server',
                                    title: '服务器'
                                },
                                {
                                    icon: 'desktop',
                                    index: 'b28-exchange',
                                    title: '交换机'
                                }
                            ]
                        },
                        {
                            icon: 'home',
                            index: 'M6',
                            title: 'M6机房',
                            subs: [
                                {
                                    icon: 'server',
                                    index: 'm6-server',
                                    title: '服务器'
                                },
                                {
                                    icon: 'desktop',
                                    index: 'm6-exchange',
                                    title: '交换机'
                                }
                            ]
                        },
                    ]
                },
                {
                    icon: 'dashboard',
                    index: 'Dashboard-Customize',
                    title: '监控自定义'
                },
                // {
                //     icon: 'bell',
                //     index: 'events',
                //     title: '告警事件'
                // },
                // {
                //     icon: 'heartbeat',
                //     index: '4',
                //     title: '应用监控',
                //     subs: [
                //         {
                //             index: 'apache',
                //             title: 'Apache 监控'
                //         },
                //         {
                //             index: 'ftp',
                //             title: 'FTP 监控'
                //         }
                //     ]
                // },
                // {
                //     icon: 'database',
                //     index: '5',
                //     title: '存储监控',
                // },
                // {
                //     icon: 'database',
                //     index: 'agent',
                //     title: 'Zabbix Agent自动化部署'
                // }
            ]
        }
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    methods: {
        toHome() {
            this.$router.push({ path: '/b28-server' })
        }
    }
}
</script>

<style scoped>
.sidebar .el-menu-item * {
    vertical-align: middle;
}

.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    cursor: pointer;
}

.sidebar .el-submenu * {
    vertical-align: middle;
}

.sidebar {
    display: block;
    position: absolute;
    width: 250px;
    left: 0;
    top: 0px;
    bottom: 0;
    background: #020711 !important;
}

.sidebar>ul {
    height: 100%;
}

.el-menu {
    background: #020711;
}

* {
    margin: 0;
    padding: 0;
}
</style>
