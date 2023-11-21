<template>
    <div class="wrapper">
        <div class="table">
            <el-row style="margin-top: 16px; padding-left: 20px;">
                <el-autocomplete icon="search" class="inline-input" v-model="state1" :fetch-suggestions="querySearch"
                    placeholder="Search or jump to…" @select="handleSelect"
                    style="width: 900px; margin-bottom: 10px;"></el-autocomplete>
            </el-row>
            <el-row class="wrapper">
                <div class="crumbs"
                    style="padding: 0 0 20px 20px; display: flex;justify-content: space-between; align-items: center;">
                    <el-breadcrumb separator=">">
                        <el-breadcrumb-item to="/b28-server">节点</el-breadcrumb-item>
                        <el-breadcrumb-item to="/m6-server">M6机房</el-breadcrumb-item>
                        <el-breadcrumb-item>服务器</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="user-info">
                        <el-dropdown trigger="click" @command="handleCommand">
                            <span class="el-dropdown-link">
                                {{ username }}
                                <img class="user-logo" src="../../assets/user.png">
                                <i class="el-icon-arrow-down el-icon--right" style="font-size: 10px;"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="loginout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <el-col class="table-main">
                    <h2 style="font-family:monospace; font-size: 20px;">服务器</h2>
                    <p style="color: #9f9fa1; font-size: 14px;">Create and manage dashboards to visualize your data</p>
                    <el-autocomplete icon="search" class="inline-input" v-model="state2" :fetch-suggestions="querySearch"
                        placeholder="Search for dashboards and folders" @select="handleSelect"
                        style="width: 550px; margin: 15px 0;">
                        <!-- <el-button slot=prepend icon="search"></el-button> -->
                    </el-autocomplete>
                    <el-table v-loading.body="loading" :data="tableData"
                        :header-cell-style="{ background: '#21232a', color: '#000' }"
                        style="width:100%; background-color: #14171c;" ref="multipleTable"
                        @selection-change="handleSelectionChange">
                        <!-- <el-table-column type="selection" width="50"></el-table-column> -->
                        <el-table-column prop="ip" label="IP" sortable>
                            <template slot-scope="scope">
                                <!-- 将点击事件绑定在div元素 -->
                                <div @click="skip(scope.row)">
                                    <a href="javascript:;">{{ scope.row.ip }}</a>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="useTo" label="用途">
                        </el-table-column>
                        <el-table-column label="状态">
                            <template slot-scope="scope">
                                <div v-if="scope.row.status == 'UP'">
                                    <span>{{ scope.row.status }}</span>
                                    <img src="../../assets/up.png" width="16" style="vertical-align: sub;">
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="model" label="型号"></el-table-column>
                        <el-table-column prop="system" label="系统"></el-table-column>
                        <el-table-column prop="kernel" label="内核"></el-table-column>
                        <el-table-column prop="cpuModel" label="CPU型号"></el-table-column>
                        <el-table-column prop="cpuCores" label="CPU核数"></el-table-column>
                        <el-table-column prop="memory" label="内存"></el-table-column>
                        <el-table-column prop="hardDrive" label="硬盘"></el-table-column>
                        <!-- <el-table-column label="主机状态" width="200">
                    <template scope="scope">

                        <el-button v-if="scope.row.available == 1" size="small" type="success"><i
                            class="el-icon-check"></i>可用
                        </el-button>
                        <el-button v-if="scope.row.available == 0" size="small" type="danger"><i
                            class="el-icon-close"></i>未知
                        </el-button>
                        <el-button v-if="scope.row.available == 2" size="small" type="danger"><i
                            class="el-icon-close"></i> 失效
                        </el-button>
                    </template>
                </el-table-column> -->
                        <!-- <el-table-column label="操作" width="200">
                    <template scope="scope">
                        <el-button size="small" type="info"
                                   @click="hostDetail(scope.$index, scope.row)">监控详情
                        </el-button>
                    </template>
                </el-table-column> -->
                    </el-table>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
                {
                    ip: '172.40.140.151',
                    useTo: 'Intel E810、DPDK、百G测试',
                    status: 'UP',
                    model: 'Dell R750',
                    system: ' Ubuntu 20.04.6 LTS ',
                    kernel: 'Linux 5.4.0-87-generic ',
                    cpuModel: 'Intel(R) Xeon(R) Silver 4310 CPU @ 2.10GHz',
                    cpuCores: '48',
                    memory: '1024',
                    hardDrive: '8990GB'
                },
                {
                    ip: '172.40.140.181',
                    useTo: 'A800、大模型',
                    status: 'UP',
                    model: '超云 R8488 G12',
                    system: 'CentOS Linux release 7.9.2009 (Core)',
                    kernel: 'Linux 4.18.0-1.el7.elrepo.x86_64 ',
                    cpuModel: 'Intel(R) Xeon(R) Platinum 8358P CPU @ 2.60GHz',
                    cpuCores: '128',
                    memory: '1024',
                    hardDrive: '13.97TB'
                },
                {
                    ip: '172.40.140.182',
                    useTo: 'A800、大模型',
                    status: 'UP',
                    model: '超云 R8488 G12',
                    system: ' Ubuntu 20.04.6 LTS ',
                    kernel: 'Linux 5.4.0-165-generic ',
                    cpuModel: 'Intel(R) Xeon(R) Platinum 8358P CPU @ 2.60GHz',
                    cpuCores: '128',
                    memory: '1024',
                    hardDrive: '13.97TB'
                },
            ],
            cur_page: 1,
            multipleSelection: [],
            select_cate: '',
            select_word: '',
            del_list: [],
            is_search: false,
            loading: false,
            restaurants: [],
            state1: '',
            state2: '',
        }
    },
    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : 'guest';
        }
    },
    created() {
        // this.getData();
        this.restaurants = this.loadAll();
    },
    methods: {
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('ms_username')
                this.$router.push('/login');
            }
        },
        handleCurrentChange(val) {
            this.cur_page = val;
            this.getData();
        },
        getData() {
            let self = this;
            self.$http.get('/api/hosts/').then((res) => {
                self.tableData = res.data;
                self.loading = false
            })
        },
        search() {
            this.is_search = true;
        },
        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        hostDetail(index, row) {
            this.$router.push({
                path: 'hostDetail',
                query: {
                    hostid: row.hostid,
                    hostname: row.name
                }
            })
        },
        handleDelete(index, row) {
            this.$message.error('删除第' + (index + 1) + '行');
        },
        delAll() {
            const self = this,
                length = self.multipleSelection.length;
            let str = '';
            self.del_list = self.del_list.concat(self.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += self.multipleSelection[i].name + ' ';
            }
            self.$message.error('删除了' + str);
            self.multipleSelection = [];
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
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
        skip(item) {
            console.log(item)
            this.$router.push({
                path: '/dashboard-m6-server',
                query: {
                    ip: item.ip,
                    source: 'M6'
                }
            })
        }
    }
}
</script>

<style slot-scope>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}

.el-input__inner {
    background-color: #020711;
    border-color: #020711;
}

.table-main {
    min-height: 700px;
    background-color: #14171c;
    padding: 20px;
    border-radius: 8px;
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

.el-input-group__prepend .el-button {
    background-color: rgba(0, 0, 0, 1);
}
</style>
