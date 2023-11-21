<template>
    <div class="wrapper">
        <v-head></v-head>
        <div class="iframe">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
export default {
    components: {
        vHead, vSidebar
    }
}
</script>
<style scoped>
.iframe {
    background: none repeat scroll 0 0 #fff;
    position: absolute;
    left: 0px;
    right: 0;
    top: 60px;
    bottom: 0;
    width: auto;
    height: 100%;
    box-sizing: border-box;
    color: #fff;
}
</style>
