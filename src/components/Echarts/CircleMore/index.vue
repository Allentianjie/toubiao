<template>
    <div class="echart-dom circle">
        <div class="title">{{circleData.title}}</div>
        <div class="circular" v-for="(item, index) in circleData.list" :key="index" :style="{borderColor:item.bgColor}">
            <p><span :style="{color: item.bgColor}">{{item.num}}</span>{{item.unit}}</p>
            <p>{{item.word}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        circleData: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="less" scoped>
.circle{
    display: flex;
    .title{
        font-size: 20px;
        font-weight: 500;
        color: #1D83DD;
        width: 150px;
        padding: 50px 20px 50px 40px;
    }
    >.circular{
        margin: 15px 10px;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        border-width: 4px;
        text-align: center;
        border-style: solid;
        >p{
            font-size: 12px;
            >span {
                font-size: 30px;
                font-weight: bold;
            }
            &:first-child{
                padding-top: 20px;
            }
        }
    }
}
</style>
