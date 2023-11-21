<template>
    <div class="header">
        <div class="logo" @click="toHome">
            <img src="../../assets/logo.png" width="164" alt="">
        </div>
        <el-row>
            <el-autocomplete icon="search" class="inline-input" v-model="state1" :fetch-suggestions="querySearch"
                placeholder="Search or jump to…" @select="handleSelect"
                style="width: 900px; margin-left: 50px;"></el-autocomplete>
        </el-row>
        <!-- <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    {{username}}
                    <img class="user-logo" src="../../assets/user.png">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div> -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            name: 'guest',
            restaurants: [],
            state1: '',
        }
    },
    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },
    created() {
        this.restaurants = this.loadAll();
    },
    methods: {
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('ms_username')
                this.$router.push('/login');
            }
        },
        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
            };
        },
        loadAll() {
            return [
                { "value": "M6机房 / 服务器", "address": "/m6-server" },
                { "value": "M6机房 / 交换机", "address": "/m6-exchange" },
                { "value": "B28机房 / 服务器", "address": "/b28-server" },
                { "value": "B28机房 / 交换机", "address": "/b28-exchange" },
                { "value": "监控自定义", "address": "/Dashboard-Customize" },
            ];
        },
        handleSelect(item) {
            console.log(item.address);
            if (item.address) {
                this.$router.push({ path: item.address })
            }
        },
        toHome() {
            this.$router.push({ path: '/b28-server' })
        }
    }
}
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    font-size: 22px;
    line-height: 60px;
    color: #fff;
    background: rgba(0, 0, 0, 1);
}

.header .logo {
    float: left;
    /* width:250px; */
    padding-left: 20px;
    text-align: center;
    cursor: pointer;
}

.user-info {
    float: right;
    padding-right: 50px;
    font-size: 16px;
    color: #fff;
}

.user-info .el-dropdown-link {
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
}

.user-info .user-logo {
    position: absolute;
    left: 0;
    top: 15px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
}

.el-dropdown-menu__item {
    text-align: center;
}
</style>
