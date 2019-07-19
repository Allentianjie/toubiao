<template>
    <div id="taskSummaryPage">
       <!-- <div class="taskmenu">
            <div class="menu" >
                <el-menu
                    style="width:100%;height:100%"
                    :default-active="activeIndex"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                >
                    <el-menu-item index="trend" >诊改趋势分析</el-menu-item>
                    <el-menu-item index="indexdetails" >五纵五横</el-menu-item>

                    &lt;!&ndash;<el-menu-item index="setup">诊改体系结构</el-menu-item>&ndash;&gt;
                    &lt;!&ndash;<el-menu-item index="process">诊改流程</el-menu-item>&ndash;&gt;
                </el-menu>
            </div>
            &lt;!&ndash; <div class="menuDate">先隐藏
                <span>距下一次诊改时间还有：</span>
                <span class="date" id="timer">{{time}}</span>
            </div> &ndash;&gt;
        </div>-->
        <div class="taskContent">
            <router-view  @activeNameL="activeNameL"/>
        </div>
    </div>
</template>
<script>
export default {
    name: "index",

    data() {
        return {
            time: "00天00小时00分00秒",
            activeIndex: "trend"
        };
    },
    watch: {
        time: function(newValue, oldValue) {
            if (newValue == "0天0小时0分0秒") {
                clearInterval();
            }
        },
    },
    created() {
        // this.$router.push("/trend");
        // this.getTime();//先隐藏
    },

    methods: {
        getTime() {
            //获得整改时间
            this.$Get("/admin/hierarchy/cutdown", null, res => {
                console.log(res.data);
                this.getnewTime(res.data);
                // this.$store.commit("setChooseDept", res.data);
            });
        },
        getnewTime(val) {
            let that = this;
            setInterval(function() {
                val--;
                that.time = that.SecondToDate(val);
            }, 1000);
        },
        activeNameL(val){
          this.activeIndex = val
        },
        SecondToDate(msd) {
            var time = msd;
            if (null != time && "" != time) {
                if (time > 60 && time < 60 * 60) {
                    time =
                        parseInt(time / 60.0) +
                        "分钟" +
                        parseInt(
                            (parseFloat(time / 60.0) - parseInt(time / 60.0)) *
                                60
                        ) +
                        "秒";
                } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
                    time =
                        parseInt(time / 3600.0) +
                        "小时" +
                        parseInt(
                            (parseFloat(time / 3600.0) -
                                parseInt(time / 3600.0)) *
                                60
                        ) +
                        "分钟" +
                        parseInt(
                            (parseFloat(
                                (parseFloat(time / 3600.0) -
                                    parseInt(time / 3600.0)) *
                                    60
                            ) -
                                parseInt(
                                    (parseFloat(time / 3600.0) -
                                        parseInt(time / 3600.0)) *
                                        60
                                )) *
                                60
                        ) +
                        "秒";
                } else if (time >= 60 * 60 * 24) {
                    time =
                        parseInt(time / 3600.0 / 24) +
                        "天" +
                        parseInt(
                            (parseFloat(time / 3600.0 / 24) -
                                parseInt(time / 3600.0 / 24)) *
                                24
                        ) +
                        "小时" +
                        parseInt(
                            (parseFloat(time / 3600.0) -
                                parseInt(time / 3600.0)) *
                                60
                        ) +
                        "分钟" +
                        parseInt(
                            (parseFloat(
                                (parseFloat(time / 3600.0) -
                                    parseInt(time / 3600.0)) *
                                    60
                            ) -
                                parseInt(
                                    (parseFloat(time / 3600.0) -
                                        parseInt(time / 3600.0)) *
                                        60
                                )) *
                                60
                        ) +
                        "秒";
                } else {
                    time = parseInt(time) + "秒";
                }
            }
            return time;
        },
        handleSelect(key, keyPath) {
            this.$router.push("/" + key);

        }
    }
};
</script>

<style lang='less' scoped>
</style>
