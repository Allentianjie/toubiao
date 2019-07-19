<template>
    <div class="guangxiMap echart-dom">
        <h6>全校全日制招生</h6>
        <div class="total">
            <span class="word">全日制招生总数</span>
            <label class="num">{{mapData.value}}</label>
            <span>人</span>
        </div>
        <p>平均每年录取率高达<span>{{mapData.ratio}}</span></p>
        <div class="map">
            <div class="data" id="box">
                <a @click="down">向上</a>
                <ul id="ul-list">
                    <li v-for="(item, index) in mapData.list" :key="index">
                        <span>{{item.name}}</span>
                        <span>{{item.value}}人</span>
                    </li>
                </ul>
                <a @click="up">向下</a>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    props: {
        mapData: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            data: {
            }
        }
    },
    methods:{
        up(){

            var ul=document.getElementById("ul-list");
            var box=document.getElementById("ul-list");

            if (ul.scrollTop >= ul.scrollHeight) {
                ul.scrollTop = 0;
            } else {
                ul.scrollTop=box.scrollTop+20;
            }

        },
        down(){
            var ul=document.getElementById("ul-list");
            var box=document.getElementById("ul-list");
            if (ul.scrollTop >= ul.scrollHeight) {
                ul.scrollTop = 0;
            } else {
               ul.scrollTop=box.scrollTop-20;
            }





        }

    },
    created () {
        this.mapData.value += ''
        this.mapData.value = this.mapData.value.replace(/\d(?=(?:\d{3})+\b)/g, '$&,')
        this.mapData.ratio += '%'
    }
}
</script>

<style lang="less">
.guangxiMap{
    text-align: center;
    >h6{
        font-size:16px;
        font-family:SourceHanSansSC-Medium;
        font-weight:500;
        color:rgba(29,131,221,1);
        text-align: left;
        padding: 10px 0 1px 22px;
    }
    >.total{
        width:380px;
        height:60px;
        background:linear-gradient(90deg,rgba(83,169,245,1),rgba(4,118,219,1));
        border-radius: 30px;
        color: #fff;
        margin-left: calc((100% - 380px)/2);
        >.word{
            display: inline-block;
            width:65px;
            height:40px;
            font-size:16px;
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
    >p{
        font-size: 16px;
        position: relative;
        top: 3px;
        >span{
            color: #F39800;
        }
    }
    >.map{
        background-image: url(~@/assets/img/ditu2.png);
        height: calc(100% - 1.7rem);
        width: calc(100% - 0.6rem);
        margin-left: 0.5rem;
        background-size: auto 120%;
        background-repeat:no-repeat;
        background-position: center;
        /*background-attachment: fixed;*/
        position: relative;
        .data{
            position: absolute;
            left: -25px;
            bottom: 0.2rem;
          /*top*/
            width: 100px;
            background: #EFF3FC;
            >a{
                background-color: #95B7FA;
                display: inline-block;
                width: 100%;
                height: 20px;
                color: #fff;
            }
            >ul{
                height: 160px;
                overflow: hidden;
                li{
                    list-style: none;
                    line-height: 27px;
                    >span{
                        margin: 0 5px;
                    }
                }
            }
        }
    }
}
</style>
