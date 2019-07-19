<template>
    <Modal id="preViewBox" class-name="vertical-center-modal" v-model="iconData.state" width="70%"
           :mask-closable="false" @on-cancel="closeModal()">
        <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
            <span>选择图标</span>
        </p>
        <div>
            <div class="container">
                <div style="text-align: left">
                    <h2>使用方法</h2>
                    <p style="line-height: 50px;">
                        点击图标来使用即可。例如：（共{{iconList.length}}个图标）
                    </p>
                    <h2>搜索</h2>
                    <div class="search-box">
                        <el-input class="search" size="large" v-model="keyword" clearable
                                  placeholder="请输入图标名称"></el-input>
                    </div>
                </div>
                <ul>
                    <li class="icon-li" v-for="(item,index) in list" :key="index">
                        <div class="icon-li-content" @click="changeIcon(item)">
                            <i :class="item.icon"></i>
                            <p>{{item.name}}</p>
                            <span class="product-buyer-name">{{item.icon}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div slot="footer" style="text-align: center">
            <Button type="warning" size="large" @on-cancel="closeModal()">关闭</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        name: "",
        props: {
            iconData: {
                type: Object,
                required: true
            }
        },
        components: {},
        data() {
            return {
                Icon: "",
                keyword: '',
                iconList: [
                    {icon: 'iconfont iconjiantouarrow496', name: "箭头"},
                    {icon: 'iconfont iconmore', name: "省略号"},
                    {icon: 'iconfont iconguanbi2', name: "关闭"},
                    {icon: 'iconfont iconshuaxin', name: "刷新"},
                    {icon: 'iconfont iconjiantou1', name: "箭头"},
                    {icon: 'iconfont icontishi', name: "提示"},
                    {icon: 'iconfont iconchakan', name: "查看"},
                    {icon: 'iconfont iconjiantou-copy-copy-copy', name: "箭头"},
                    {icon: 'iconfont iconxiazai6', name: "箭头"},
                    {icon: 'iconfont iconxiangji', name: "相机"},
                    {icon: 'iconfont iconxiazai3', name: "导入"},
                    {icon: 'iconfont iconcengmianfangxiang', name: "层面方向"},
                    {icon: 'iconfont iconzhiliangbanjiashicang', name: "质量办驾驶舱"},
                    {icon: 'iconfont icondaoru', name: "导入"},
                    {icon: 'iconfont iconxianchengchi', name: "线程池"},
                    {icon: 'iconfont iconxiancheng', name: "线程"},
                    {icon: 'iconfont iconExport', name: "导出"},
                    {icon: 'iconfont icontiaodu', name: "调度"},
                    {icon: 'iconfont iconicon-test2', name: "任务"},
                    {icon: 'iconfont iconmachine-copy', name: "机器"},
                    {icon: 'iconfont iconconnect', name: "连接"},
                    {icon: 'iconfont iconicon-test1', name: "结构"},
                    {icon: 'iconfont iconhengshuqiehuan', name: "横竖切换"},
                    {icon: 'iconfont iconpaiming', name: "排名"},
                    {icon: 'iconfont iconshuju', name: "数据"},
                    {icon: 'iconfont iconaguiji', name: "轨迹"},
                    {icon: 'iconfont iconzhanghuzonglan1', name: "综合"},
                    {icon: 'iconfont icontixi', name: "体系"},
                    {icon: 'iconfont iconzhengaifenxi', name: "诊改分析"},
                    {icon: 'iconfont iconwenjian', name: "文件"},
                    {icon: 'iconfont iconguihua1', name: "规划"},
                    {icon: 'iconfont iconguihua', name: "规划"},
                    {icon: 'iconfont iconmingxi', name: "明细"},
                    {icon: 'iconfont iconbaogao-copy', name: "报告"},
                    {icon: 'iconfont iconzhibiao', name: "指标"},
                    {icon: 'iconfont iconxueyuan1', name: "学院"},
                    {icon: 'iconfont iconjingfeishenqing', name: "经费申请"},
                    {icon: 'iconfont iconteachers-students', name: "师生"},
                    {icon: 'iconfont iconmoney', name: "资产"},
                    {icon: 'iconfont icongongnengmokuai', name: "功能模块"},
                    {icon: 'iconfont iconpeizhi', name: "配置"},
                    {icon: 'iconfont icontubiao', name: "图表"},
                    {icon: 'iconfont iconcanshu', name: "参数设置"},
                    {icon: 'iconfont iconzhigongguanli', name: "职工管理"},
                    {icon: 'iconfont iconxitongyonghu', name: "系统"},
                    {icon: 'iconfont iconjiaoshi1', name: "教师"},
                    {icon: 'iconfont iconxuesheng1', name: "学生"},
                    {icon: 'iconfont iconjiaoseguanli', name: "角色管理"},
                    {icon: 'iconfont iconbumenguanli', name: "部门管理"},
                    {icon: 'iconfont icondict', name: "数据字典"},
                    {icon: 'iconfont iconcaidan', name: "菜单管理"},
                    {icon: 'iconfont iconxuegonghao', name: "学工号"},
                    {icon: 'iconfont iconxuegong', name: "学工"},
                    {icon: 'iconfont iconjiaowu', name: "教务"},
                    {icon: 'iconfont iconicon-xibieguanli', name: "系别管理"},
                    {icon: 'iconfont iconwebicon06', name: "基础数据"},
                    {icon: 'iconfont iconxuexiaoqingkuang', name: "学校"},
                    {icon: 'iconfont iconzhihuitiaodu', name: "调度"},
                    {icon: 'iconfont iconbaogao', name: "报告"},
                    {icon: 'iconfont iconmoban', name: "模板"},
                    {icon: 'iconfont icontouxiang', name: "头像"},
                    {icon: 'iconfont iconguanbi1', name: "关闭"},
                    {icon: 'iconfont icontheme', name: "主题"},
                    {icon: 'iconfont iconzhuti', name: "主题"},
                    {icon: 'iconfont iconcs-xx-1', name: "向下"},
                    {icon: 'iconfont iconcs-xs-1', name: "向上"},
                    {icon: 'iconfont iconweibiaoti-', name: "下拉"},
                    {icon: 'iconfont iconqiehuanzuzhi', name: "切换"},
                    {icon: 'iconfont iconmoshiqiehuan', name: "模式切换"},
                    {icon: 'iconfont icontongxingbie', name: "性别"},
                    {icon: 'iconfont iconzhuanyedangan', name: "档案"},
                    {icon: 'iconfont iconxueyuan', name: "学院"},
                    {icon: 'iconfont iconicon-test', name: "房子"},
                    {icon: 'iconfont iconbanji', name: "班级"},
                    {icon: 'iconfont iconrenwu', name: "人物"},
                    {icon: 'iconfont iconbanjihuodong', name: "班级活动"},
                    {icon: 'iconfont iconsushe', name: "宿舍"},
                    {icon: 'iconfont iconxueli', name: "学历"},
                    {icon: 'iconfont iconyouxiang', name: "邮箱"},
                    {icon: 'iconfont icondizhi-01', name: "地址"},
                    {icon: 'iconfont icondianhua', name: "电话"},
                    {icon: 'iconfont iconiconset0205', name: "星级"},
                    {icon: 'iconfont icon2shenfenzhenghaoma', name: "身份证"},
                    {icon: 'iconfont iconmedtitle', name: "职称"},
                    {icon: 'iconfont iconxuesheng', name: "学生"},
                    {icon: 'iconfont iconjiaoshi', name: "教师"},
                    {icon: 'iconfont iconrenshiguanli', name: "人事管理"},
                    {icon: 'iconfont iconguanlizhejiashicang', name: "驾驶舱"},
                    {icon: 'iconfont iconlingdao', name: "领导"},
                    {icon: 'iconfont iconjiashicangshensuo', name: "伸缩"},
                    {icon: 'iconfont iconyuanxing', name: "圆形"},
                    {icon: 'iconfont iconyuanquan', name: "圆圈"},
                    {icon: 'iconfont iconjinhangzhong', name: "进行中"},
                    {icon: 'iconfont iconweikaishi_', name: "未开始"},
                    {icon: 'iconfont iconyiwancheng', name: "已完成"},
                    {icon: 'iconfont iconzonghefenxi', name: "综合分析"},
                    {icon: 'iconfont iconzhuanyehuaxiang', name: "专业头像"},
                    {icon: 'iconfont iconxueshenghuaxiang', name: "学生画像"},
                    {icon: 'iconfont iconkechenghuaxiang', name: "课程画像"},
                    {icon: 'iconfont iconjiaoshihuaxiang', name: "教师画像"},
                    {icon: 'iconfont iconhuaxiangfenxi', name: "分析"},
                    {icon: 'iconfont iconyonghu', name: "用户"},
                    {icon: 'iconfont iconquanping1', name: "全屏"},
                    {icon: 'iconfont iconquanping', name: "全屏"},
                    {icon: 'iconfont iconxingzhuang', name: "交通"},
                    {icon: 'iconfont iconjichushujuguanli', name: "基础数据"},
                    {icon: 'iconfont iconshujuguanli2', name: "数据管理"},
                    {icon: 'iconfont iconCockpit', name: "我的驾驶舱"},
                    {icon: 'iconfont iconshujuguanli1', name: "数据管理"},
                    {icon: 'iconfont iconwinfo-icon-xitongguanli', name: "系统管理"},
                    {icon: 'iconfont iconxitongguanli2', name: "系统管理"},
                    {icon: 'iconfont iconzhiliangzhouxiaozheng', name: "质量校正"},
                    {icon: 'iconfont iconxitongguanli1', name: "系统管理"},
                    {icon: 'iconfont iconzhiliangfenxi1', name: "质量分析"},
                    {icon: 'iconfont iconfenxi', name: "分析"},
                    {icon: 'iconfont iconguanbi', name: "关闭"},
                    {icon: 'iconfont iconqiyong', name: "开启"},
                    {icon: 'iconfont iconpre_icon_jisuanqi', name: "计算器"},
                    {icon: 'iconfont icontianchongxing-', name: "饼图"},
                    {icon: 'iconfont iconziyuanldpi', name: "计算机"},
                    {icon: 'iconfont iconweiwancheng-tianchong', name: "未填充"},
                    {icon: 'iconfont iconjisuanqi', name: "计算器"},
                    {icon: 'iconfont iconicon--', name: "记事本"},
                    {icon: 'iconfont iconweiwancheng', name: "未完成"},
                    {icon: 'iconfont iconjishiben', name: "记事本"},
                    {icon: 'iconfont iconzhiliangfenxi', name: "分析检索"},
                    {icon: 'iconfont iconzhengaishaunglian', name: "目标"},
                    {icon: 'iconfont iconzhengaiguanli', name: "分支"},
                    {icon: 'iconfont iconxitongguanli', name: "设置"},
                    {icon: 'iconfont iconwenjianguanli', name: "书籍"},
                    {icon: 'iconfont iconshujukanban', name: "加载"},
                    {icon: 'iconfont iconshujuguanli', name: "堆叠"},
                    {icon: 'iconfont iconrenwudating', name: "菜单"},
                    {icon: 'iconfont iconjiashichang', name: "方向盘"},
                    {icon: 'iconfont iconjiankondaping', name: "大屏"},
                    {icon: 'iconfont iconxiugai', name: "修改"},
                    {icon: 'iconfont iconjiantou', name: "箭头"},
                ]
            };
        },
        computed: {
            list() {
                return this.iconList.filter((item) => {
                    return item.name.indexOf(this.keyword) !== -1;
                })
            }
        },
        methods: {
            changeIcon(row) {
                this.Icon = row.icon;
                this.closeModal()
            },
            closeModal() {
                let data = this.Icon;
                this.$emit("closeMain", {state: false, icon: data});
                this.iconData.state = false;
            }
        }
    };
</script>

<style lang="less" scoped>
    .product-buyer-name {
        max-width: 110px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .example-p {
        height: 45px;
        display: flex;
        align-items: center;
    }

    .search-box {
        text-align: left;
        margin-top: 10px;
    }

    .search {
        width: 300px;
    }

    ul, li {
        list-style: none;
    }

    .icon-li {
        display: inline-block;
        padding: 10px;
        width: 120px;
        height: 120px;
    }

    .icon-li-content:hover {
        cursor: pointer;
        color: #ff5361;
    }

    .icon-li-content:hover i {
        cursor: pointer;
        color: #ff5361;
    }

    .icon-li-content:hover span {
        cursor: pointer;
        color: #ff5361;
    }

    .icon-li-content {
        display: flex;
        height: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .icon-li-content i {
        font-size: 36px;
        color: #606266;
    }

    .icon-li-content span {
        margin-top: 10px;
        color: #787878;
    }
</style>
