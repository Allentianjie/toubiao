<template>
    <div class="assetsSituation echart-dom">
        <h6>全校资产情况</h6>
        <div class="total">
            <span class="word">全校资产总数量</span>
            <label class="num">{{datas.totalValue}}</label>
            <span>个</span>
        </div>
        <div class="map">
            <div class="column">
                <div class="one">
                    <span>{{datas.list[6].name}}</span>
                    <p><span>{{datas.list[6].value}}</span>{{datas.list[6].unit}}</p>
                </div>
                <div class="two">
                    <span>{{datas.list[0].name}}</span>
                    <p><span>{{datas.list[0].value}}</span>{{datas.list[0].unit}}</p>
                </div>
                <div class="three">
                    <span>{{datas.list[1].name}}</span>
                    <p><span>{{datas.list[1].value}}</span>{{datas.list[1].unit}}</p>
                </div>
                <div class="four">
                    <span>{{datas.list[2].name}}</span>
                    <p><span>{{datas.list[2].value}}</span>{{datas.list[2].unit}}</p>
                </div>
                <div class="five">
                    <span>{{datas.list[3].name}}</span>
                    <p><span>{{datas.list[3].value}}</span>{{datas.list[3].unit}}</p>
                </div>
                <div class="six">
                    <span>{{datas.list[4].name}}</span>
                    <p><span>{{datas.list[4].value}}</span>{{datas.list[4].unit}}</p>
                </div>
                <div class="seven">
                    <span>{{datas.list[5].name}}</span>
                    <p><span>{{datas.list[5].value}}</span>{{datas.list[5].unit}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {}
    },
    props: {
        datas: {
            type: Object,
            default: () => {}
        }
    }
}
</script>

<style lang="less">
.assetsSituation{
    >h6{
        font-size:20px;
        font-family:SourceHanSansSC-Medium;
        font-weight:500;
        color:rgba(29,131,221,1);
        text-align: left;
        padding: 10px 0 9px 22px;
    }
    >.total{
        width:380px;
        height:60px;
        background:linear-gradient(90deg,rgba(83,169,245,1),rgba(4,118,219,1));
        border-radius: 30px;
        text-align: center;
        color: #fff;
        margin-left: ~'calc((100% - 380px)/2)';
        >.word{
            display: inline-block;
            width:65px;
            height:40px;
            font-size:16px;
            font-family:SourceHanSansSC-Regular;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:25px;
            opacity:0.87;
            text-align: right;
            margin-top: 5px;
        }
        >.num{
            font-size:45px;
            font-weight: 500;
            padding: 0 0 0 5px;
        }
    }
    >.map{
        height: ~'calc(100% - 120px)';
        width: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        >.column{
            width: 700px;
            height: ~'calc(100% - 80px)';
            background-image: url(~@/assets/img/home-column.png);
            background-size: 100% 100%;
            position: relative;
            >div{
                position: absolute;
                text-align: center;
                >span{
                    color: #262626;
                    font-size: 14px;
                }
                >p{
                    color: #504DB8;
                    font-size: 12px;
                    >span{
                        font-size: 18px;
                    }
                }
            }
            >.one{
                left: 40%;
                bottom: 100%;
                >span{
                    font-size: 18px;
                }
                p{
                    color: #C48416;
                    font-weight: 600;
                    >span{
                        font-size: 22px
                    }
                }
            }
            >.two{
                left: 19%;
                bottom: 87%;
            }
            >.three{
                left: 5%;
                bottom: 55%;
            }
            >.four{
                left: 27%;
                bottom: 28%;
            }
            >.five{
                right: 27%;
                bottom: 29%;
            }
            >.six{
                right: 6%;
                bottom: 62%;
            }
            >.seven{
                right: 20%;
                bottom: 77%;
            }
        }
    }
}
</style>
