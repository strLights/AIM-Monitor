<template>
    <div class="wrapper" style="display: flex; align-items: center; justify-content: center;">
        <el-row style="text-align: center;">
            <!-- <iframe src="http://120.133.83.144:3000/d/f398d61c-fd2a-49ad-9b4d-c0d354668125/e69c8d-e58aa1-e599a8-e58897-e8a1a8?orgId=1" 
                width="100%" height="1000px"
            frameborder="0"></iframe> -->
            <img src="../../assets/gif_404.gif" width="600">
            <el-col style="margin-left: 20px; margin-top: 30px;">
                <h1 style="color: #000;">OPPS!</h1>
                <h1 style="color: #20a0ff;margin-top: 30px;">很抱歉，该功能仍在开发中！</h1>
                <router-link to="/b28-server" style="font-size: 14px;color: #20a0ff">返回首页</router-link>
            </el-col>
            <!-- <el-col :span="10" :offset="1">
                <iframe src="http://172.17.38.107:3000/dashboard-solo/db/jian-kong-ping-tai-tu-biao?orgId=1&var-group=All&var-host=All&var-application=All&var-item=All&panelId=1&from=now-6h&to=now" width="650" height="300" frameborder="0"></iframe>
            </el-col>
            <el-col :span="10" :offset="1">
                <iframe src="http://172.17.38.107:3000/dashboard-solo/db/jian-kong-ping-tai-tu-biao?orgId=1&var-group=All&var-host=All&var-application=All&var-item=All&panelId=2&from=now-6h&to=now" width="650" height="300" frameborder="0"></iframe>
            </el-col> -->
        </el-row>
        <!-- <el-row style="margin-top: 40px;">
            <el-col :span="10" :offset="1">
                <iframe src="http://172.17.38.107:3000/dashboard-solo/db/jian-kong-ping-tai-tu-biao?orgId=1&var-group=All&var-host=All&var-application=All&var-item=All&panelId=3&from=now-6h&to=now" width="650" height="300" frameborder="0"></iframe>
            </el-col>
            <el-col :span="10" :offset="1">
                <iframe src="http://172.17.38.107:3000/dashboard-solo/db/jian-kong-ping-tai-tu-biao?orgId=1&var-group=All&var-host=All&var-application=All&var-item=All&panelId=4&from=now-6h&to=now" width="650" height="300" frameborder="0"></iframe>
            </el-col>
        </el-row> -->

    </div>
</template>

<script>
import moment from "moment"
import echarts from 'echarts'

import quickMenu from 'vue-quick-menu'
import QuickMenu from "../../../node_modules/vue-quick-menu/src/quickMenu.vue";
import ElRow from "../../../node_modules/element-ui/packages/row/src/row.vue";

import ChinaMap from "../common/ChinaMap.vue";
import EventTable from "../common/EventTable.vue";

export default {
    components: {
        ElRow,
        QuickMenu,
        ChinaMap,
        EventTable
    },
    data() {
        return {
            service: 'httpd',
            items: '',
            count: 4,
            icons: ['tomcat'],
            list: ['1', '2', '3', '4'],
            position: 'bottom-right',
            star: 4
        }
    },
    created() {

    },
    methods: {}
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

iframe body {
    background: red;
}
</style>
