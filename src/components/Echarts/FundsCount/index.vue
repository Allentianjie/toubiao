<template>
    <div class="echart-dom">
        <div class="fundsCount">
            <div class="img">
                <img src="~@/assets/img/home-cost.png" alt="￥" />
            </div>
            <div class="count">
                <p class="title">{{funsCountData.title}}</p>
                <p class="num">{{funsCountData.num}}</p>
                <p class="pay">{{funsCountData.pay}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        funsCountData: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="less">
.fundsCount{
    height: 100%;
    display: flex;
    >.img{
        width: 100px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 60px 0 70px;
    }
    >.count{
        width: calc(100% - 100px);
        padding: 20px 0;
        text-align: left;
        color: #fff;
        font-size: 16px;
        .num{
            font-size: 30px;
            font-weight: 600;
        }
    }
}
</style>
