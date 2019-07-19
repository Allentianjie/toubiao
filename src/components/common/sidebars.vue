<template>
    <div class="sidebar">
        <!--background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff"  &#45;&#45;换肤-->
        <el-menu class="sidebar-el-menu" :default-active="activeIndex" :collapse="collapse" unique-opened>
            <!-- 一级菜单 -->
            <template v-for="item in items">
                <el-submenu v-if="item.children && item.children.length" :index=(item.id).toString() :key="item.id">
                    <template class="el-title" slot="title">
                        <i :class="item.icon"></i><span>{{item.name}}</span>
                    </template>
                    <!-- 二级菜单 -->
                    <template v-for="itemChild in item.children">
                        <el-submenu v-if="itemChild.children && itemChild.children.length"
                                    :index=(itemChild.id).toString()
                                    @click="abc(itemChild)" :key="itemChild.id">
                            <template class="el-title" slot="title"><i :class="itemChild.icon"></i><span
                                    @click="abc(itemChild.pathType)">{{itemChild.name}}</span></template>
                            <!-- 三级菜单 -->
                            <template v-for="itemChild_Child in itemChild.children">
                                <el-submenu v-if="itemChild_Child.children && itemChild_Child.children.length"
                                            @click="abc(itemChild_Child )" :index=(itemChild_Child.id).toString()
                                            :key="itemChild_Child.id">
                                    <template class="el-title" slot="title"><i :class="itemChild_Child.icon"></i><span>{{itemChild_Child.name}}</span>
                                    </template>
                                    <!-- 三级菜单 -->
                                    <el-menu-item v-for="itemChild_Child in itemChild.children"
                                                  :index="(itemChild_Child .id).toString()"
                                                  :key="itemChild_Child.id">
                                        <i :class="itemChild_Child.icon"></i><span
                                            slot="title">{{itemChild_Child.name}}</span>
                                    </el-menu-item>
                                </el-submenu>
                                <el-menu-item v-else :index="(itemChild_Child.id).toString()"
                                              @click="abc(itemChild_Child )"
                                              :key="itemChild_Child.id"><i :class="itemChild_Child.icon"></i><span
                                        slot="title">{{itemChild_Child.name}}</span>
                                </el-menu-item>
                            </template>
                        </el-submenu>
                        <el-menu-item v-else @click="abc(itemChild,item.name)" :index=(itemChild.id).toString()
                                      :key="itemChild.id"><i
                                :class="itemChild.icon"></i><span slot="title">{{itemChild.name}}</span></el-menu-item>
                    </template>
                </el-submenu>
                <el-menu-item @click="abc(item)" v-else :index=(item.id).toString() :key="item.id"><i
                        :class="item.icon"></i>
                    <span slot="title">{{item.name}}</span>
                    <!--<span slot="title"><a href="https://www.ele.me" target="_blank">{{item.name}}</a></span>-->
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from './bus';

    export default {
        data() {
            return {
                val: null,
                collapse: false,
                items: [],
                pathRouter: ''
            }
        },
        computed: {
            activeIndex:{
                get: function () {
                    if(this.$store.state.activeTags.id){
                        return this.$store.state.activeTags.id.toString()
                    }else {

                    }
                },
                // setter
                set: function (newValue) {
                    this.val = newValue
                }
                // return this.$store.state.activeTags.id.toString()
            },
        },
        watch: {
            url(newval, oldval) {
                // console.log(newval)
            },
            $route(to, from) {
                // console.log(to)
            },
        },
        created() {
            let item = this.$store.state.userMenus;
            this.items = item;
        },
        mounted() {
            // 通过 Event Bus 进行组件间通信，来高亮导航
            bus.$on('newActive', data => {
                this.activeIndex = data;
            });
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            });
            //默认显示第一个
            let data = this.$store.state.userMenus;
            let actives = this.$store.state.actives;
            if (actives == null) {

                if (data[0].hasChildren == true) {
                    this.$store.commit("setActiveTag", data[0].children[0]);
                    this.resetSetItem('url', data[0].children[0].url);
                    this.$store.commit("setmenuUrl", data[0].children[0].url);
                    if (data[0].children[0].pathType === '0') {
                        this.$router.push({path: data[0].children[0].path});
                        this.activeIndex = (this.$store.state.userMenus[0].children[0].id).toString();
                    } else {
                        if (data[0].children[0].openWith === '1') { // 新窗口
                            window.open(data[0].children[0].url, '', '')
                        } else if (data[0].children[0].openWith === '0') { // 当前窗口
                            this.$router.push({path: "/menuCustom", query: {url: data[0].children[0].url}});
                            this.activeIndex = (this.$store.state.userMenus[0].children[0].id).toString();
                        } else if (data[0].children[0].openWith === '2') {
                            let width = (window.screen.availWidth) * 0.8;
                            let heigth = (window.screen.availHeight) * 0.8;
                            window.open(data[0].children[0].url, '', 'height=' + heigth + ',width=' + width + ',scrollbars=yes,status=yes');
                        }
                    }
                } else {
                    this.$store.commit("setActiveTag", data[0]);
                    this.resetSetItem('url', data[0].url);
                    this.$store.commit("setmenuUrl", data[0].url);
                    if (data[0].pathType === '0') {
                        this.$router.push({path: data[0].path});
                        this.activeIndex = (this.$store.state.userMenus[0].id).toString()
                    } else {
                        if (data[0].openWith === '1') { // 新窗口
                            window.open(data[0].url, '', '')
                        } else if (data[0].openWith === '0') { // 当前窗口
                            this.$router.push({path: "/menuCustom", query: {url: data[0].url}});
                            this.activeIndex = (this.$store.state.userMenus[0].id).toString();
                        } else if (data[0].openWith === '2') {
                            let width = (window.screen.availWidth) * 0.8;
                            let heigth = (window.screen.availHeight) * 0.8;
                            window.open(data[0].url, '', 'height=' + heigth + ',width=' + width + ',scrollbars=yes,status=yes')
                        }
                    }
                }
            } else {
                this.activeIndex = actives.id;
                this.$router.push(actives.path);
            }
            bus.$emit("newActive", this.activeIndex)
        },
        methods: {
            //菜单点击
            abc(row) {
                this.$store.commit("setActiveTag", row);
                // console.log(77,parentName)
                if (row.pathType === '0') {
                    this.activeIndex = (row.id).toString();
                    this.$router.push({path: row.path});
                    let obj = {
                        path: {path: row.path},
                        id: (row.id).toString()
                    };
                    this.$store.commit("setActives", obj);
                } else {
                    this.activeIndex = (row.id).toString();
                    if (row.openWith === '1') { // 新窗口
                        window.open(row.url, '', '')
                    } else if (row.openWith === '0') { // 当前窗口
                        if(row.parentId === 250000){
                            this.$router.push({path: "/WeChat", query: {url: row.url}});
                        }else {
                            this.$router.push({path: "/menuCustom", query: {url: row.url}});
                        }
                        this.resetSetItem('url', row.url);
                        this.$store.commit("setmenuUrl", row.url);
                        let obj = {
                            path: {path: "/menuCustom", query: {url: row.url}},
                            id: (row.id).toString()
                        };
                        this.$store.commit("setActives", obj);
                    } else if (row.openWith === '2') {
                        let width = (window.screen.availWidth) * 0.8;
                        let heigth = (window.screen.availHeight) * 0.8;
                        window.open(row.url, '', 'height=' + heigth + ',width=' + width + ',scrollbars=yes,status=yes')
                    }
                }
                bus.$emit("newActive", this.activeIndex)
            },
        }
    }
</script>

<style scoped>
    .sidebar-el-menu .el-menu-item.is-active {
        /*background: #e6faf7 !important;*/
    }

    .el-menu {
        border-right: solid 0px #e6e6e6 !important;
    }

    .el-menu-item i {
        padding-right: 15px;
    }

    .el-submenu__title i {
        padding-right: 15px;
    }

    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }

    .sidebar > ul {
        height: auto !important;
    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }

    .sidebar > ul {
        height: 100%;
    }
</style>
