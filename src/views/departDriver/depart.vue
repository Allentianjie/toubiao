<template>
  <div class="ledDriver massDriver">
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
  import LeftUpDiv from "./moduleDiv/massDriver/leftUpDiv.vue";
  import LeftBottomDiv from "./moduleDiv/massDriver/leftBottomDiv.vue";
  import CenterUpDiv from "./moduleDiv/massDriver/centerUpDiv.vue";
  import CenterBottomDiv from "./moduleDiv/massDriver/centerBottomDiv.vue";
  import RightUpDiv from "./moduleDiv/massDriver/rightUpDiv.vue";
  import RightBottomDiv from "./moduleDiv/massDriver/rightBottomDiv.vue";
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
          title:'学校概况',
          data: []
        },
        LeftBottomData: {
          title: '专业概况',
          top: [],
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
          title: '学生概况',
          dataOne: [
            {k_name: '获得奖学金学生数量',value: '0',rank: '0'},
            {k_name: '获得奖学金学生数量占比',value: '0',rank: '0'},
            {k_name: '参加职业技能大赛学生数量',value: '0',rank: '0'},
            {k_name: '参加职业技能大赛数量占比',value: '0',rank: '0'},
            ],
          dataTwo: [
            {k_name: '参加职业技能大赛获奖学生数量',value: '0',rank: '0'},
            {k_name: '参加职业技能大赛获奖学生数量占比',value: '0',rank: '0'},
          ],
          dataThree: [
            {k_name: '被处分学生人数',value: '0',rank: '0'},
            {k_name: '违纪学生人数',value: '0',rank: '0'},
          ]
        },
        CenterBottomData: {
          title: '预警概况',
          data:[]
        },
        RightUpData: {
          title: '教师概况',
          dataOne: [
            {name: '主任教师数量',value: '0',rank: '0', unit: ''},
            {name: '专任教师数量占比',value: '0',rank: '0', unit: ''},
            {name: '论文发表数量',value: '0',rank: '0', unit: ''},
            {name: '人均论文法宝数量',value: '0',rank: '0', unit: ''},
          ],
          dataTwo: [
            {name: '科研课题数量',value: '0',rank: '0', unit: ''},
            {name: '科研课题数量占比',value: '0',rank: '0', unit: ''},
          ],
          dataThree: [
            {name: '参加职业技能大赛获奖学生数量',value: '0',rank: '0', unit: ''},
            {name: '参加职业技能大赛获奖学生占比',value: '0',rank: '0', unit: ''},
          ]
        },
        RightBottomData: {
          title: '课程概况',
          top:[],
          bottom:[]
        },
        options: [],
        userInfo: "",
        code: '',
        name: ''
      }
    },
    created(){
    },
    mounted(){
      this.userInfo = this.$store.state.userInfo;
      this.getSerise()
      this.getdata()
      // this.getDataL()
      this.getRightUp() //rightUpData 右上数据
    },
    methods:{
      // 请求系部ID
      getSerise(){
        let that = this
        this.$Get("/admin/deptCockpitDetail/depts", { username: this.userInfo.username }, res => {
          if (res.code == 0) {
            this.code = res.data.id;
            this.name = res.data.name;
            this.getdeptCode(res.data.id)
          }
        });
      },
      //CenterUpData 中上数据
      getdeptCode(id) {
        let that = this
        let obj = this.code // 1100
        this.$Get("/admin/deptCockpitDetail/getStudentCollect", {dept_code: id}, res => {
          if(res.code === 0){
            let one = []
            let two = []
            let three = []
            res.data.forEach(e =>{
              if(e.layer === 1){
                one.push(e)
              }else if(e.layer === 2){
                two.push(e)
              }else if(e.layer === 3){
                three.push(e)
              }
            })
            that.CenterUpData = {
              title: '学生概况',
              id: that.code,
              name: that.name,
              dataOne: one,
              //   [
              //   {name: '获得奖学金学生',num: '69',name2: '校内排名第6位'},
              //   {name: '获得奖学金学生数量占比',num: '69',name2: '校内排名第6位'},
              //   {name: '参加职业技能大赛学生数量',num: '69',name2: '校内排名第6位'},
              //   {name: '参加职业技能大赛数量占比',num: '69',name2: '校内排名第6位'},
              // ],
              dataTwo: two,
              /*[
              {name: '参加职业技能大赛获奖学生数量',num: '69',name2: '校内排名第6位'},
              {name: '参加职业技能大赛获奖学生数量占比',num: '69',name2: '校内排名第6位'},
            ],*/
              dataThree: three
              //   [
              //   {name: '被处分学生人数',num: '69',name2: '校内排名第6位'},
              //   {name: '违纪学生人数',num: '69',name2: '校内排名第6位'},
              // ]
            }
          }
        })
      },
      //rightUpData 右上数据
      getRightUp(){
        let that = this
        this.$Get("/admin/seriseDeptNew/getTeacherTop", {}, res => {
          if(res.code === 0){
            let one = []
            let two = []
            let three = []
            res.data.forEach(e =>{
              if(e.layer === 1){
                one.push(e)
              }else if(e.layer === 2){
                two.push(e)
              }else if(e.layer === 3){
                three.push(e)
              }
            })
            that.RightUpData = {
              title: '教师概况',
              id: that.code,
              name: that.name,
              dataOne: one,
              //   [
              //   {name: '获得奖学金学生',num: '69',name2: '校内排名第6位'},
              //   {name: '获得奖学金学生数量占比',num: '69',name2: '校内排名第6位'},
              //   {name: '参加职业技能大赛学生数量',num: '69',name2: '校内排名第6位'},
              //   {name: '参加职业技能大赛数量占比',num: '69',name2: '校内排名第6位'},
              // ],
              dataTwo: two,
              /*[
              {name: '参加职业技能大赛获奖学生数量',num: '69',name2: '校内排名第6位'},
              {name: '参加职业技能大赛获奖学生数量占比',num: '69',name2: '校内排名第6位'},
            ],*/
              dataThree: three
              //   [
              //   {name: '被处分学生人数',num: '69',name2: '校内排名第6位'},
              //   {name: '违纪学生人数',num: '69',name2: '校内排名第6位'},
              // ]
            }
          }
        })

      },
      // 雨菲实验
      getDataL(){
        let that = this
        let obj = {
          // dimYear: '2019', // isDimYear为1带数据，0不带
          // source: data.source? data.source:'',
          // type: data.typeName,
          drilltype : 'serise.student.data', //
          // drillLevel : "serise", //
          isDimYear : 1, //1 带年份  ，没的年份带0
          group : 0, // 分组
          deptCode: '1100'
        };

        that.$Get("/admin/commonDrivers/drill", obj, function (res) {
          console.log(111,res)
        });


      },
      // 其他组件数据
      getdata(){
        let that = this
        that.$Get("/admin/seriseDeptNew/getKitchen", {}, function (data) {
          let yDataDepart = []
          let teacherDepart = []
          let studentDepart = []
          data.data.majorMap.forEach(e=>{
            yDataDepart.push(e.name)
            // teacherDepart.push(e.teachers)
            studentDepart.push(e.students)
          })

          that.RightBottomData = {
            title: '课程概况',
            id: that.code,
            name: that.name,
            top: data.data.courseRate,
            bottom:data.data.course

          }
          that.LeftBottomData ={
            title: '专业概况',
            id: that.code,
            name: that.name,
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
          that.CenterBottomData = {
            title: '预警概况',
            id: that.code,
            name: that.name,
            data:[
              {name: '指标项', val:data.data.target.total, id:1},
              {name: '达标项', val:data.data.target.finish, id:2},
              {name: '预警项', val:data.data.target.overtime, id:3},
            ]
          }
          that.LeftUpData = {
            title:'系部概况',
            id: that.code,
            name: that.name,
            data: data.data.schoolproperty
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("./ledDriver.less");
  .ledDriver.massDriver {
    background-image: none !important;

    .titleDiv h3 {
        background-image: none !important;
    }
  }

</style>
