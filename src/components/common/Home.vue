<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div id="contentBox" class="content-box" :class="{'content-collapse':collapse}">
<!--            <v-tags></v-tags>-->
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
        <iframe scrolling="no" ref="iframe" src="http://172.20.14.59:8220/home" width="0" height="0" frameborder="0">
            您的浏览器暂不支持预览，我们推荐使用 谷哥、360浏览器(急速模式)、火狐等主流浏览器。
        </iframe>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './sidebars';
    import vTags from './Tags.vue';
    import bus from './bus';

    export default {
        data() {
            return {
                tagsList: [],
                collapse: false
            }
        },
        components: {
            vHead, vSidebar, vTags
        },
        created() {
            bus.$on('collapse', msg => {
                this.collapse = msg;
            });
            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for (let i = 0, len = msg.length; i < len; i++) {
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        }
    }
</script>
<style scoped>

</style>