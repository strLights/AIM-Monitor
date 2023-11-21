<template>
    <div class="dashboard">
        <el-row>
            <el-col class="path">
                <div class="crumbs">
                    <el-breadcrumb separator=">">
                        <el-breadcrumb-item to="/b28-server">节点</el-breadcrumb-item>
                        <el-breadcrumb-item to="/m6-server">M6机房</el-breadcrumb-item>
                        <el-breadcrumb-item>服务器</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="user-info">
                    <el-dropdown trigger="click" @command="handleCommand">
                        <span class="el-dropdown-link">
                            {{ username }}
                            <img class="user-logo" src="../../../../assets/user.png">
                            <i class="el-icon-arrow-down el-icon--right" style="font-size: 10px;"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="loginout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>
        <el-row v-if="hostip">
            <iframe :src="host" width="100%" height="1000px" frameborder="0"></iframe>
        </el-row>
    </div>
</template>

<script>

import ElRow from "../../../../../node_modules/element-ui/packages/row/src/row.vue";

export default {
    components: {
        ElRow,
    },
    data() {
        return {
            hostip: '',
            gpuip: '',
            source: '',
            host: '',
        }
    },
    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : 'guest';
        }
    },
    created() {
        const query = this.$route.query
        this.hostip = query.ip + ':9100'
        this.gpuip = query.ip + ':9400'
        const host = `http://172.40.10.72:3000/d/yWrhuxwZe/e69c8d-e58aa1-e599a8-7c-e4bbaa-e8a1a8-e79b98?orgId=1&var-node=${this.hostip}&var-vars=ALL&var-Gpu_ip=${this.gpuip}&var-gpu=0&var-gpu=1&var-gpu=2&var-gpu=3&var-gpu=4&var-gpu=5&var-gpu=6&var-gpu=7`
        console.log(host)
        this.host = host
        console.log(this.hostip)

    },
    // mounted() {
    //     console.log(data.hostip)
    // },
    methods: {
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('ms_username')
                this.$router.push('/login');
            }
        },
    }
}
</script>

<style>
.board-p {
    text-align: center;
    font-size: 20px;
}

.board-p img {
    width: 80%;
    height: 40px;
}

.quick-menu {
    z-index: 1000;
}

.path {
    width: 100%;
    padding: 5px 20px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #000;
}

.user-info {
    font-size: 16px;
    color: #fff;
}

.user-info .el-dropdown-link {
    position: relative;
    padding-left: 5px;
    color: #fff;
    cursor: pointer;
}

.user-info .user-logo {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    vertical-align: middle;
}

.el-dropdown-menu__item {
    text-align: center;
}
</style>
