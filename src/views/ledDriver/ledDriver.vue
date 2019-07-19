<template>
  <div class="ledDriver">
    <div class="ledLeft">
      <div class="LeftUp">
        <LeftUpDiv ref="leftUpDiv" :LeftUpData="LeftUpData"></LeftUpDiv>
      </div>
      <div class="Leftbottom">
        <LeftBottomDiv :LeftBottomData="LeftBottomData"></LeftBottomDiv>
      </div>
    </div>

    <div class="ledCenter">
      <div class="CenterUp">
        <CenterUpDiv :CenterUpData="CenterUpData"></CenterUpDiv>
      </div>
      <div class="CenterBottom">
        <CenterBottomDiv :CenterBottomData="CenterBottomData"></CenterBottomDiv>
      </div>
    </div>

    <div class="ledRight">
      <div class="RightUp">
        <RightUpDiv :RightUpData="RightUpData"></RightUpDiv>
      </div>
      <div class="RightBottom">
        <RightBottomDiv :RightBottomData="RightBottomData"></RightBottomDiv>
      </div>
    </div>
  </div>
</template>

<script>
  import LeftUpDiv from "./moduleDiv/leftUpDiv.vue";
  import LeftBottomDiv from "./moduleDiv/leftBottomDiv.vue";
  import CenterUpDiv from "./moduleDiv/centerUpDiv.vue";
  import CenterBottomDiv from "./moduleDiv/centerBottomDiv.vue";
  import RightUpDiv from "./moduleDiv/rightUpDiv.vue";
  import RightBottomDiv from "./moduleDiv/rightBottomDiv.vue";
  export default {
    components: {
      LeftUpDiv,
      LeftBottomDiv,
      CenterUpDiv,
      CenterBottomDiv,
      RightUpDiv,
      RightBottomDiv,
    },
    name: "index",
    data(){
      return{
        LeftUpData: {
          name:'学校概况',
          data: []
        },
        LeftBottomData: {
          title: '专业概况',
          echartData:{
            id: 'LeftBottomEchar',
            seriesData:{
              yData: [],
              student: [],
              teacher: []
            }
          }
        },
        CenterUpData: {
          title: '学生生源地、就业分布',
          showData: {
            name: '学生总数',
            unit: "人",
            data: []
          },
        },
        CenterBottomData: {
          title: '预警概况',
          data:[]
        },
        RightUpData: {
          title: '教师概况',
          echartData:{
            id:'RightUpEchar',
            seriesData:{
              xData : [],
              yData:[]
            }
          }
        },
        RightBottomData: {
          title: '课程概况',
          top:[],
          bottom:[]
        }
      }
    },
    created(){
    },
    mounted(){
      this.getdata()
    },
    methods:{
      getdata(){
        let that = this
//        that.$Get("/admin/schoolproperty/kitchen", {}, function (data) {
        that.$Get("/admin/leader/kitchen", {}, function (data) {
          let schoolproperty = []
          data.data.schoolproperty.forEach(e=>{
            let obj = {
              name:e.name,
              val:e.val,
              unit:e.unit,
              ident:e.ident
            }
            schoolproperty.push(obj)
          })
          let yDataDepart = []
          let teacherDepart = []
          let studentDepart = []
          data.data.depart.forEach(e=>{
            yDataDepart.push(e.name)
            teacherDepart.push(e.teachers)
            studentDepart.push(e.students)
          })
          that.LeftUpData={
            name:'学校概况',
            // data :[
            //   {name:'全校资产1',val:'81274.28',unit:'万'},
            //   {name:'全校资产2',val:'81274.28',unit:'万'},
            //   {name:'全校资产3',val:'81274.28',unit:'万'},
            //   {name:'全校资产4',val:'81274.28',unit:'万'},
            //   {name:'全校资产5',val:'81274.28',unit:'万'},
            //   {name:'全校资产6',val:'81274.28',unit:'万'},
            //   {name:'全校资产7',val:'81274.28',unit:'万'}
            // ]
            data:schoolproperty
          }
          that.LeftBottomData ={
            title: '专业概况',
            // top:[
            //   {
            //     name:'总专业',val:'40',unit:'个'
            //   },
            //   {
            //     name:'国家重点专业',val:'6',unit:'个'
            //   },
            //   {
            //     name:'省级重点专业',val:'7',unit:'个'
            //   },
            // ],
            top:data.data.major,
            echartData: {
              id: 'LeftBottomEchar',
              seriesData:{
                // yData: ['铁路工程系','建筑工程系','机电工程系','机械工程系','工商管理系','外语系','计算机系','人文科学系'],
                // teacher:[43, 55, 38, 61, 35, 40, 50, 58],
                // student: [1820, 2132, 1901, 1434, 1290, 1530, 1320,1600]
                yData: yDataDepart,
                teacher: teacherDepart,
                student: studentDepart
              }
            }
          }
          that.CenterUpData = {
            title: '学生生源地、就业分布',
            showData:{
              name:'学生总数',
              unit:"人",
              data:data.data.studentsTotal.split("")
            },
          }
          that.CenterBottomData = {
            title: '预警概况',
            data:[
              {name: '指标项', val:data.data.target.total, id:111},
              {name: '达标项', val:data.data.target.finish, id:121},
              {name: '预警项', val:data.data.target.overtime, id:133},
            ]
          }
          that.RightUpData = {
            title: '教师概况',
            echartData:{
              id:'RightUpEchar',
              seriesData:{
                // xData : ['机械工程', '电气自动化', '化学工程', '学科教育', '信息工程', '工业分析', '电子科学'],
                // yData:[150, 252, 200, 334, 390, 330, 220],
                xData:data.data.teacher.xdata,
                yData:data.data.teacher.ydata,
                zData:data.data.teacher.zdata,
              }
            }
          }
          that.RightBottomData = {
            title: '课程概况',
            top: data.data.courseRate,
            bottom:data.data.course

          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("./ledDriver.less");
</style>
