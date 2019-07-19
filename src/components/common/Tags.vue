<template>
    <div class="tags" v-if="showTags">
        <ul>
            <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
<!--                :to="item.path"-->
                <span  class="tags-li-title" @click="openActive(item)">
                    {{item.name}}
                </span>
                <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
            </li>
        </ul>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import bus from './bus';
    export default {
        data() {
            return {
                tagsList: [],
                // tags: this.$store.state.activeTags
            }
        },
        methods: {
            openActive(item){
                if (item.hasChildren == true) {
                    this.$store.commit("setActiveTag", item.children[0]);
                    this.resetSetItem('url', item.children[0].url);
                    this.$store.commit("setmenuUrl", item.children[0].url);
                    if (item.children[0].pathType === '0') {
                        this.$router.push({path: item.children[0].path});
                        this.activeIndex = (this.$store.state.userMenus[0].children[0].id).toString()
                    } else {
                        if (item.children[0].openWith === '1') { // 新窗口
                            window.open(item.children[0].url, '', '')
                        } else if (item.children[0].openWith === '0') { // 当前窗口
                            this.$router.push({path: "/menuCustom", query: {url: item.children[0].url}});
                            this.activeIndex = (this.$store.state.userMenus[0].children[0].id).toString()
                        } else if (item.children[0].openWith === '2') {
                            let width = (window.screen.availWidth) * 0.8;
                            let heigth = (window.screen.availHeight) * 0.8;
                            window.open(item.children[0].url, '', 'height=' + heigth + ',width=' + width + ',scrollbars=yes,status=yes');
                        }
                    }
                } else {
                    this.$store.commit("setActiveTag", item);
                    this.resetSetItem('url', item.url);
                    this.$store.commit("setmenuUrl", item.url);
                    if (item.pathType === '0') {
                        this.$router.push({path: item.path});
                        this.activeIndex = (this.$store.state.userMenus[0].id).toString()
                    } else {
                        if (item.openWith === '1') { // 新窗口
                            window.open(item.url, '', '')
                        } else if (item.openWith === '0') { // 当前窗口
                            this.$router.push({path: "/menuCustom", query: {url: item.url}});
                            this.$store.commit("setActiveTag", item);
                            this.activeIndex = (this.$store.state.userMenus[0].id).toString()
                        } else if (item.openWith === '2') {
                            let width = (window.screen.availWidth) * 0.8;
                            let heigth = (window.screen.availHeight) * 0.8;
                            window.open(item.url, '', 'height=' + heigth + ',width=' + width + ',scrollbars=yes,status=yes')
                        }
                    }
                }
            },
            isActive(path) {
                return path === this.tags.path;
            },
            // 关闭单个标签
            closeTags(index) {
                let item = this.tagsList[index - 1];
                if (item) {
                    this.$router.push(item.path);
                    this.$store.commit("setActiveTag", item);
                }else{
                    // this.$router.push('/');
                }
                this.tagsList.splice(index, 1);
            },
            // 关闭全部标签
            closeAll(){
                this.tagsList = [];
                // this.$router.push('/');
            },
            // 关闭其他标签
            closeOther(){
                const curItem = this.tagsList.filter(item => {
                    return item.path ===  this.tags.path;
                })
                this.tagsList = curItem;
            },
            // 设置标签
            setTags(route){
                const isExist = this.tagsList.some(item => {
                    return item.path === this.tags.path;
                });
                if(!isExist){
                    if(this.tagsList.length >= 12){
                        this.tagsList.shift();
                    }
                    this.tagsList.push(this.tags)
                }
                bus.$emit('tags', this.tagsList);
            },
            handleTags(command){
                command === 'other' ? this.closeOther() : this.closeAll();
            }
        },
        computed: {
            showTags() {
                return this.tagsList.length > 0;
            },
            tags(){
                return this.$store.state.activeTags
            }


        },

        watch:{
            $route(newValue, oldValue){
                this.setTags(newValue);
            }
        },
        created(){
            this.setTags(this.$route);
            // 监听关闭当前页面的标签页
            bus.$on('close_current_tags', () => {
                for (let i = 0, len = this.tagsList.length; i < len; i++) {
                    const item = this.tagsList[i];
                    if(item.path === this.$route.fullPath){
                        if(i < len - 1){
                            this.$router.push(this.tagsList[i+1].path);
                        }else if(i > 0){
                            this.$router.push(this.tagsList[i-1].path);
                        }else{
                            this.$router.push('/');
                        }
                        this.tagsList.splice(i, 1);
                        break;
                    }
                }
            })
        }
    }

</script>


<style>
    .tags {
        position: relative;
        height: 30px;
        overflow: hidden;
        background: #fff;
        padding-right: 120px;
        box-shadow: 0 5px 10px #ddd;
    }

    .tags ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }

    .tags-li {
        float: left;
        margin: 3px 5px 2px 3px;
        border-radius: 3px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        height: 23px;
        line-height: 23px;
        border: 1px solid #e9eaec;
        background: #fff;
        padding: 0 5px 0 12px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }

    .tags-li:not(.active):hover {
        background: #f8f8f8;
    }

    .tags-li.active {
        color: #fff;
    }

    .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
    }

    .tags-li.active .tags-li-title {
        color: #fff;
    }

    .tags-close-box {
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 110px;
        height: 30px;
        background: #fff;
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
        z-index: 10;
    }

</style>
