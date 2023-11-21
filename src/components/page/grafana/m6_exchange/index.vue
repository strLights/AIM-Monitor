<template>
    <div class="dashboard">
        <el-row>
            <el-col class="path">
                <div class="crumbs">
                    <el-breadcrumb separator=">">
                        <el-breadcrumb-item to="/b28-server">节点</el-breadcrumb-item>
                        <el-breadcrumb-item to="/m6-exchange">M6机房</el-breadcrumb-item>
                        <el-breadcrumb-item>交换机</el-breadcrumb-item>
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
        <el-row>
            <iframe
                src="http://172.40.10.72:3000/d/f2b26479-6dc7-40ee-969b-dc417518bfc9/e4baa4-e68da2-e69cba-efbd9c-e4bbaa-e8a1a8-e79b98?orgId=1"
                width="100%" height="1000px" frameborder="0"></iframe>->
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
            source: '',
            ip: '',
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
        console.log(query)
    },
    methods: {
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('ms_username')
                this.$router.push('/login');
            }
        }
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
