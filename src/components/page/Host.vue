<template>
    <div class="wrapper">
        <div class="table">
            <div class="crumbs">
                <el-breadcrumb separator="→">
                    <el-breadcrumb-item>节点</el-breadcrumb-item>
                    <el-breadcrumb-item>B28机房</el-breadcrumb-item>
                    <el-breadcrumb-item>服务器</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-table v-loading.body="loading" :data="tableData" style="width:100%; background-color: #14171c;" ref="multipleTable"
                      @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="50"></el-table-column> -->
                <el-table-column prop="ip" label="IP" sortable>
                </el-table-column>
                <el-table-column prop="useTo" label="用途">
                </el-table-column>
                <el-table-column label="状态">
                    <template scope="scope">
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
                loading: false
            }
        },
        created() {
            // this.getData();
        },
        methods: {
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
    }
</style>
