<template>
  <div class="myFile">
     <div class="myFile_img"></div>

  </div>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style lang="less" scoped>
.myFile{
  width: 100%;
  height: 100%;
  padding: 15px;
  &_img{
    width: 40%;
    height: 40%;
    margin: 10% 25%;
    background-image: url("../../../assets/images/kaifaing.jpg");
    background-size: 100% 100%;
  }
}
</style>
