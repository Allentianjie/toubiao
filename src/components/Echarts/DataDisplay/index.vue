<template>
    <div class="dataDisplay echart-dom">
        <p class="title">{{dataDisplayData.title}}</p>
        <div class="numBox">
            <span v-for="(item, index) in dataDisplayData.numerical" :key='index'
            :style="{backgroundColor: ((item === ':' || item === '.') ? '#fff' : dataDisplayData.bgColor),color:((item === ':' || item === '.') ? dataDisplayData.bgColor : '#fff')}"
            >{{item}}</span>
            <!--<a>-->
               <!--<i class="fa fa-fw fa-long-arrow-up" v-if="dataDisplayData.up" :style="{color: dataDisplayData.bgColor}"></i>-->
               <!--<i class="fa fa-fw fa-long-arrow-down" v-if="!dataDisplayData.up" :style="{color: dataDisplayData.bgColor}"></i>-->
            <!--</a>-->
        </div>
        <p class="describe">
            <span v-if="dataDisplayData.describe">{{dataDisplayData.describe}}</span>
            <label>{{dataDisplayData.word}}<a>{{dataDisplayData.num}}</a></label>
        </p>
    </div>
</template>

<script>
/* eslint-disable */
/**
 * dataDisplayData: {
 *      title: '标题',
 *      numerical: [1, 2, ., 1, 9],
 *      up: true,
 *      describe: '“双师型”教师49人'
 *      word: '占比',
 *      num: '28.67',
 *      bgColor: ''
 * }
 */
export default {
    props: {
        dataDisplayData: {
            type: Object,
            required: true
        }
    },
    watch: {
        dataDisplayData: {
            handler (newValue, oldValue) {
                if (!(this.dataDisplayData.numerical instanceof Array)) {
                    this.dataDisplayData.numerical = String(this.dataDisplayData.numerical).split('')
                }
            },
            deep: true
        }
    }
}
</script>

<style lang="less">
    .dataDisplay{
        text-align: center;
        .title{
            padding: 23px 0 11px 0;
            font-size:18px;
            font-family:SourceHanSansSC-Normal;
            font-weight:400;
            color:rgba(74,74,74,1);
        }
        .numBox{
            padding-left: 10px;
            >span{
                display: inline-block;
                height: 0.6rem;
                padding: 0 3px;
                line-height: 0.62rem;
                color: #fff;
                text-align: center;
                margin: 0 1px;
                /*font-size: 40px;*/
                font-size: 0.5rem;
            }
            >a i{
                font-size: 24px;
                vertical-align: bottom;
                margin-left: -10px;
            }
        }
        .describe{
            padding-top: 29px;
            font-size:14px;
            >span{
                border-right: 1px solid #9DD6E8;
                padding-right: 10px;
                margin-right: 5px;
                display: inline-block;
                height: 20px;
            }
        }
    }
</style>
