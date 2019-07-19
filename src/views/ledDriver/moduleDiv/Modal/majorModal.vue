<template>
  <Modal v-model="majorData" class="trackModal my_box" width="60%" :mask-closable="false" @on-cancel="closetrendData">
    <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
      <span>专业设置</span>
    </p>
    <div class="divCentre">
      <div class="head">学院设有高职专业41个充分体现学校办学定位，以适应国家城镇建设和经济发展的需要。</div>
      <div class="con">
        <div class="item" v-for="(item, index) in list.data" :key="item.id" :class="index < 4 ? 'h2':''">
          <div class="item-con">
            <div class="con_p" :class="index > 3 ? 'h2':''">
              <div class="roll">
                <p v-for="v in item.data" :key="v.id" @click="goNajorFn(v.codeId)">{{ v.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" style="text-align: right">
      <Button type="primary" size="large" @click="closetrendData">关闭</Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    props: ['majorData'],
    data() {
      return {
        list: {
          data: []
        }
      }
    },
    mounted(){
      this.initFn();
    },
    methods: {
      // 初始化
      initFn() {
        this.list.data = [
          // 土木工程系
          { id: "1", data: 
            [
              { id:"11", name:"1、建筑工程技术", codeId: "011601" },
              { id:"12", name:"2、工程测量技术", codeId: "011621" },
              { id:"13", name:"3、建设工程监理", codeId: "011611" },
              { id:"14", name:"4、摄影测量与遥感技术", codeId: "011641" },
              { id:"15", name:"5、建筑工程技术（2+3）", codeId: "011602" },
              { id:"16", name:"6、土建施工类（中美）", codeId: "011632" }
            ] 
          },
          // 建筑与规划系
          { id: "2", data: 
            [
              { id:"21", name:"1、建筑设计", codeId: "041611" },
              { id:"22", name:"2、园林工程技术", codeId: "041621" },
              { id:"23", name:"3、城乡规划", codeId: "041601" },
              { id:"24", name:"4、风景园林设计", codeId: "041631" }
            ] 
          },
          // 信息工程系
          { id: "5", data: 
            [
              { id:"51", name:"1、建筑动画与模型制作", codeId: "051621" },
              { id:"52", name:"2、计算机网络技术", codeId: "051601" },
              { id:"53", name:"3、数字媒体艺术设计", codeId: "051611" },
              { id:"54", name:"4、通信工程设计与监理", codeId: "051641" },
              { id:"55", name:"5、移动互联应用技术", codeId: "051631" }
            ]
          },
          // 工商管理系
          // { id: "4", data: 
          //   [
          //     { id:"41", name:"1、宝玉石鉴定与加工", codeId: "" },
          //     { id:"42", name:"2、物业管理", codeId: "" },
          //     { id:"43", name:"3、城市轨道交通运营管理", codeId: "" },
          //     { id:"44", name:"4、公共事务管理", codeId: "" }
          //   ] 
          // },
          // 建筑设备与环境工程系
          { id: "6", data: 
            [
              { id:"61", name:"1、建筑设备工程技术", codeId: "061621" },
              { id:"62", name:"2、建筑电气工程技术", codeId: "061631" },
              { id:"63", name:"3、消防工程技术", codeId: "061611" },
              { id:"64", name:"4、给排水工程技术", codeId: "061601" },
              { id:"65", name:"5、建筑智能化工程技术", codeId: "061651" }
            ]
          },
          // 城市建设与交通工程系
          { id: "3", data: 
            [
              { id:"31", name:"1、道路桥梁工程技术", codeId: "021611" },
              { id:"32", name:"2、市政工程技术", codeId: "021601" },
              { id:"33", name:"3、铁道工程技术", codeId: "021631" },
              { id:"34", name:"4、土木工程检测技术", codeId: "021641" },
              { id:"35", name:"5、工程造价（公路方向）", codeId: "021621" },
              { id:"36", name:"6、城市轨道交通运营管理", codeId: "021651" }
            ] 
          },
          
          // 艺术设计系
          { id: "7", data: 
            [
              { id:"71", name:"1、建筑装饰工程技术", codeId: "071601" },
              { id:"72", name:"2、古建筑工程技术", codeId: "071651" },
              { id:"73", name:"3、环境艺术设计", codeId: "071611" },
              { id:"74", name:"4、家具艺术设计", codeId: "071641" },
              { id:"75", name:"5、艺术设计", codeId: "071631" },
              { id:"76", name:"6、建筑室内设计", codeId: "071621" },
              { id:"77", name:"7、展示艺术设计", codeId: "071671" },
              { id:"78", name:"8、宝玉石鉴定与加工", codeId: "071681" }
            ]
          },
          // 管理工程系
          { id: "8", data: 
            [
              { id:"81", name:"1、工程造价", codeId: "031601" },
              { id:"82", name:"2、建筑工程管理", codeId: "031611" },
              { id:"83", name:"3、市场营销（房地产营销与策划）", codeId: "031631" },
              { id:"84", name:"4、房地产检测与评估", codeId: "031651" },
              { id:"85", name:"5、房地产经营与管理（房地产估价）", codeId: "031621" },
              { id:"86", name:"6、建设项目信息化管理", codeId: "031641" },
              { id:"87", name:"7、物业管理", codeId: "031661" }
            ]
          }
        ]
      },
      closetrendData() {
        // let flag = false;
        this.$emit("closemajorModal", false);
      },

      // 跳转画像
      goNajorFn (id) {
        let  obj = { code: id,type: "major" };
        if ( id === "") {
          this.$message({ message: "该专业暂无画像信息", type: 'warning' });
        } else {
          this.$router.push({path: '/portrait', query: {obj: JSON.stringify(obj)}});
        }
      }
    }
  }
</script>

<style lang="less" scoped>

  .divCentre {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .head {
      height: 50px;
      font-size: 16px;
      line-height: 50px;
      background: #fff;
      text-align: center;
      overflow: hidden;
    }

    .con {
      flex: 1;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .item {
        width: 25%;
        height: 55%;
        padding: 5px;
        min-height: 310px;

        .item-con {
          width: 100%;
          height: 100%;
          background-position: center center;
          background-size: 100% 100%;

          .con_p {
            padding-left: 16px;
            padding-top: 90px;
            height: 100%;
            overflow: hidden;
            padding-bottom: 20px;
            padding-right: 10px;

            .roll {
              height: 100%;
              overflow-y: auto;
            }

            p {
              font-size: 16px;
              line-height: 1.8;
              cursor: pointer;
            }
          }
          .con_p.h2 {
            padding-top: 80px;
          }
        }
      }

      .item.h2 {
        height: 45%;
        min-height: 260px;
      }
      // 土木工程
      .item:nth-child(1) .item-con {
        background-image: url("../../../../assets/images/ledDriver/schoolImgDriver/bg_1.png");
      }
      // 建筑与规划系
      .item:nth-child(2) .item-con {
        background-image: url("../../../../assets/images/ledDriver/schoolImgDriver/bg_2.png");
      }
      // 信息工程系
      .item:nth-child(3) .item-con {
        background-image: url("../../../../assets/images/ledDriver/schoolImgDriver/bg_5.png");
      }
      // 建筑设备与环境工程系
      .item:nth-child(4) .item-con {
        background-image: url("../../../../assets/images/ledDriver/schoolImgDriver/bg_6.png");
      }
      // 城市建设与交通工程系
      .item:nth-child(5) .item-con {
        background-image: url("../../../../assets/images/ledDriver/schoolImgDriver/bg_3.png");
      }
      // 艺术设计系
      .item:nth-child(6) .item-con {
        background-image: url("../../../../assets/images/ledDriver/schoolImgDriver/bg_7.png");
      }
      // 管理工程系
      .item:nth-child(7) .item-con {
        background-image: url("../../../../assets/images/ledDriver/schoolImgDriver/bg_8.png");
      }
      .item:nth-child(8) .item-con {
        background-image: url("../../../../assets/images/ledDriver/schoolImgDriver/bg_8.png");
      }
    }
  }
</style>

