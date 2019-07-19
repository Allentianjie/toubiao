<template>
    <div class="echart-dom earlyWarningSurvey">
        <p>学院预警概况</p>
        <div class="nav">
            <div class="total">
                <span class="word">学院预警事件累计</span>
                <label class="num">0</label>
                <span>件</span>
            </div>
            <ul class="count">
                <li>已处理：<span>0</span>件</li>
                <li>待处理：<span>0 </span>件</li>
            </ul>
        </div>
        <div class="contentList">
            <div class="list">
                <div class="box">
                    <a class="up"><Icon type="ios-arrow-up" /></a>
                    <ul>
                        <li v-for="(item, index) in surveyData.list" :key="index">
                            <span>{{item.name}}</span>
                            <span>{{item.val}}</span>
                        </li>
                    </ul>
                    <a class="down"><Icon type="ios-arrow-down" /></a>
                </div>
            </div>
            <div class="house"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        surveyData: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="less">
.earlyWarningSurvey{
    height: 100%;
    >p{
        height: 20px;
        text-align: left;
        padding: 10px 0 40px 15px;
        font-size: 20px;
        font-weight: 500;
        color: #1D83DD
    }
    >.nav{
        height: 100px;
        width: 100%;
        text-align: center;
        >.total{
            width: 500px;
            height: 60px;
            background-image: url(~@/assets/img/strip.png);
            background-size: 100% 100%;
            color: #fff;
            margin-left: calc((100% - 500px)/2);
            >.word{
                display: inline-block;
                width:65px;
                height:40px;
                font-size:14px;
                font-family:SourceHanSansSC-Regular;
                font-weight:400;
                color:rgba(255,255,255,1);
                line-height:20px;
                opacity:0.87;
                text-align: right;
                margin-top: 5px;
            }
            >.num{
                font-size:45px;
                font-weight: 500;
                padding: 0 0 0 10px;
            }
        }
        >.count {
            width: 500px;
            list-style: none;
            display: flex;
            margin-left: calc((100% - 500px)/2);
            >li{
                flex: 1;
                padding-top: 10px;
                font-size:12px;
                >span{
                    color: red;
                }
            }
            >li:last-child>span{
                color: rgba(223, 156, 40, 1);
            }
        }
    }
    >.contentList{
        width: 100%;
        height: calc(100% - 150px);
        display: flex;
        >.list{
            width: 200px;
            height: 100%;
            >.box{
                width: 160px;
                height: 80%;
                border-radius: 5px;
                border: 1px solid #ccc;
                margin: 10% 20px;
                position: relative;
                padding: 20px 0;
                >a{
                    position: absolute;
                    left: calc((100% - 38px)/2);
                    display: inline-block;
                    width:32px;
                    height:32px;
                    line-height: 32px;
                    font-size: 24px;
                    text-align: center;
                    background:rgba(255,255,255,1);
                    border:1px solid rgba(210,210,210,1);
                    border-radius: 50%;
                }
                .up{
                    top: -16px;
                }
                .down{
                    bottom: -16px;
                }
                >ul{
                    list-style: none;
                    padding: 0 5px;
                    text-align: left;
                    height: calc(100% - 10px);
                    font-size:12px;
                    overflow: hidden;
                    li{
                        list-style: none;
                        line-height: 27px;
                        position: relative;
                        >span{
                            margin: 0 5px;
                        }
                        >span:last-child{
                            position: absolute;
                            right: 0;
                            color: rgba(0, 97, 183, 1);
                        }
                    }
                }
            }
        }
        >.house{
            width: ~'calc(100% - 220px)';
            background-image: url(~@/assets/img/home-house.png);
            background-size: cover;
        }
    }
}
</style>
