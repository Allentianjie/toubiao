<template>
    <div class="highLight echart-dom">
        <p>{{highLightData.title}}</p>
        <ul>
            <li v-for="(item, index) in highLightData.list" :key="index">
                <span>{{item.name}}</span>
                <span class="val">{{item.value}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
/** 行高亮列表
 * highLightData: {
 *      title: '图书资源',
        list: [{name: '图书馆总建筑面积', value: '44731.94种'}]
 * }
 */
export default {
    props: {
        highLightData: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="less">
.highLight{
    >p{
        height: 20px;
        text-align: left;
        padding: 10px 0 40px 15px;
        font-size: 20px;
        font-weight: 500;
        color: #1D83DD
    }
    >ul{
        text-align: left;
        list-style: none;
        padding: 0 20px;
        height: ~'calc(100% - 50px)';
        overflow: auto;
        >li{
            line-height: 32px;
            background: #EEEEEE;
            padding: 0 10px;
            position: relative;
            .val{
                color: #0061B7;
                position: absolute;
                right: 10px;
            }
        }
        >li:nth-child(2n){
            background: #fff;
        }
        >li:first-child{
            .val{
                color: #C48416
            }
        }
    }
    >ul::-webkit-scrollbar {/*滚动条整体样式*/
        width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
    >ul::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #515b6d;
    }
    >ul::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 10px;
        background: #363f4e;
    }
}
</style>
