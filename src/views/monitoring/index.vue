<template>
  <div id="taskSummaryPage" ref="taskSummaryPage">
    <div class="taskSummaryItem" ref="taskSummaryItem">
      <div ref="element" class="summaryEchart">
        <div class="top">
          <div class="topCard" v-for="(item,index) in alltotalData" v-if="index < 4" :key="index">
            <div class="contentotal">
              <div>
                <p class="tatle">{{item.name}}</p>
                <!--<p class="proportion">{{// item.proportion}}</p>-->
              </div>
              <p class="valueT">{{item.value}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="taskSummaryItemTop" :style="taskHeight">
      <div class="summaryEchart">
        <div class="left">
          <h3 class="taskbefore monitoring">执行汇总</h3>
          <CircleChart :CircleData="CircleData"></CircleChart>
        </div>

        <div class="center">
          <h3 class="taskbefore monitoring">诊改层面指标数量</h3>
          <div class="centerDiv">
            <div class="centerImg">
           <!--   <img src="../../assets/images/shuju.png" alt="">
              <p v-for="(item,index) in centerData" :key="index">{{item.name}}{{item.value}}</p>-->
              <div>
                <p>{{centerData[0].name}}{{centerData[0].value}}</p>
                <!--<img src="../../assets/images/jiankongdaping/left.png" alt="">-->
                <img src="../../assets/images/jiankongdaping/left.png" alt="">
              </div>
              <div>
                <p>{{centerData[1].name}}{{centerData[1].value}}</p>
                <img src="../../assets/images/jiankongdaping/right2.png" alt="">
              </div>
              <div>
                <p>{{centerData[2].name}}{{centerData[2].value}}</p>
                <img src="../../assets/images/jiankongdaping/zhongjian.png" alt="">
              </div>
              <div>
                <p>{{centerData[3].name}}{{centerData[3].value}}</p>
                <img src="../../assets/images/jiankongdaping/right2.png" alt="">
              </div>
              <div>
                <p>{{centerData[4].name}}{{centerData[4].value}}</p>
                <img src="../../assets/images/jiankongdaping/left.png" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="right">

          <h3 class="taskbefore monitoring">支撑文件</h3>
          <div class="fileItem">
            <div class="fileDiv">
              <!--<el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">-->
                <div class="fileDetails" v-for="(item,index) in file"  @click="preview(item)" :key="index">
                  <p><i class="el-icon-document"></i>{{item.fileName}}</p>
                  <!--<i class="el-icon-arrow-right"></i>-->
                  <i class="el-icon-zoom-in"></i>
                </div>
              <!--</el-tooltip>-->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="taskSummaryItemTop" :style="taskHeight2">
      <div class="summaryEchart">
        <div class="four">
          <h3 class="taskbefore monitoring">诊改层面质控点数量占比</h3>
          <div>
            <div style="width: 58%;height: 82%">
              <BarChartMuch :barChar="barChar"></BarChartMuch>
            </div>
            <div  style="width: 40%;height: 92%">
              <PetalChart :petalCharData="petalCharData"></PetalChart>
            </div>
          </div>
        </div>
        <div class="five">
          <h3 class="taskbefore monitoring">诊改任务达标情况</h3>
          <div>
            <LineChart :LineDataNum="LineDataNum"></LineChart>
          </div>
        </div>
      </div>
    </div>
    <Preview ref="preview" :previews="previews" @closePreview="closePreview"></Preview>
    <!--暂时取消表格
    <div class="taskSummaryTable">
      <div class="summaryEchart">
        <div style="text-align: left">
          <h3 class="taskbefore">诊改各层面得分</h3>
        </div>
        <div class="table">
          <el-table :data="tableData" style="width: 100%" height="100%" :header-cell-style="backHeader">
            <el-table-column prop="hierarchy" label="层级" align="center">
              <template slot-scope="scope">
                <span style="color: #487DDE">{{scope.row.hierarchy}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="policy" label="政策" align="center"></el-table-column>
            <el-table-column prop="system" label="制度" align="center"></el-table-column>
            <el-table-column prop="construction" label="建设规划" align="center"></el-table-column>
            <el-table-column prop="regulation" label="管理办法" align="center"></el-table-column>
            <el-table-column prop="solution" label="解决方案" align="center"></el-table-column>
            <el-table-column prop="personage" label="个人规划" align="center"></el-table-column>
          </el-table>
          <div style="text-align: right;margin-top: 10px">
            <Page :total="total" :current="page" @on-change="changePage" show-total></Page>
          </div>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>

  import LineChart from "@/components/monitoring/lineChart_much.vue";//
   import CircleChart from "@/components/monitoring/circleChart.vue" //
   import {datarouters} from "../../util/datarouters";
   import BarChartMuch from "@/components/monitoring/barChart_much.vue"; //
   import PetalChart from "@/components/monitoring/petalChart.vue";//
  import Preview from "@/components/preview";
   export default {
    components: {LineChart, CircleChart,BarChartMuch,PetalChart,Preview},
    data() {
      return {
        taskHeight: null,
        taskHeight2: null,
        file: [
          /*{fileName: '广西壮族自治区高等职校学生方法'},
          {fileName: '关于教育才培养能力的意见'},
          {fileName: '关于高等学校本科教育工作会议精神'},
          {fileName: '教育部关于加快建设高水平本科教育'},
          {fileName: '《教育部关于全面提高高等教育》'},
          {fileName: '高等职业学院内部质量保证体系'},
          {fileName: '教育部关于国高等教育精神落实'},
          {fileName: '高等职业学院内部质量保证体系'},
          {fileName: '教育部关于高等教育质量的若干意见'},
          {fileName: '高等职业学院内部质量保证体系'},
          {fileName: '高等职业学院内部质量保证体系'},
          {fileName: '高等职业学院内部质量保证体系'},*/
        ],
        LineDataNum: {
          pieChartId: "",
          seriesData: {}
        },
        barChar:{
          barCharId:'',
          xAxisData: [],
          seriesData: []
        },
        petalCharData:{
          id:'',
          seriesData: {}
        },
        BarData: {},
        alltotalData: [//指标数量数据
          {name : "诊改体系", value : '0', proportion:'0%',},
          {name : "诊改体系", value : '0', proportion:'0%',},
          {name : "诊改体系", value : '0', proportion:'0%',},
          {name : "诊改体系", value : '0', proportion:'0%',},
          {name : "诊改体系", value : '0', proportion:'0%',}
        ],
        CircleData: {},
        centerData: [
          {name:'',value:''},
          {name:'',value:''},
          {name:'',value:''},
          {name:'',value:''},
          {name:'',value:''},
        ],
        page: {
          total: 0, //数据总数
          current: 1, // 当前页码
          size: 150, //每页条数
          showTotal: true
        },
        previews: {//预览文件数据
          data: [],
          state: false,
          name: ""
        },
      };
    },
    watch: {},
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        // setTimeout(()=>{
        //   let a = this.$refs.taskSummaryPage.offsetHeight
        //   let b = this.$refs.taskSummaryItem.offsetHeight
        //   this.taskHeight ='height:' + ((a - b)/2 + 12) + 'px'
        //   this.taskHeight2 ='height:' + ((a - b)/2 -18) + 'px'
        // },100)


      });
      this.loadData()
      this.getDataMonitor()

    },
    methods: {
      //关闭预览
      closePreview (val) {
        this.previews.state = val;
      },
      // 预览getPreviewData
      preview (row) {
        // console.log(44,row)
        this.previews.name = row.fileSuffix
        this.previews.data = '/mngfile/chunkfile/previewStream/' + row.fileId;
        this.previews.state = true;
        this.$refs.preview.getPreviewData();
      },
      // 获取第2,4,5
      getDataMonitor(data){
        let that = this
        that.$Get("/admin/target/current/summary", {}, function(data) {
          that.getData(data.data.levelTotal)
        })
      },
      // 处理值
      getData(data){
        let arr = [];
        let arr2 = [];
        let center = []
        let arrData= []
        for (let i in data) {
          let obj = {
            name: '',
            value: '',
          }
          if(data[i]){
            obj.value = data[i]
            obj.name = i
            arr.push(i); //属性
            arr2.push(data[i]); //值
            center.push(obj)
          }
        }
        if(center.length >0 ){
          this.centerData = center
        }
        this.getBarCharts(arr,arr2)
        this.getpetalCharData(center,arr)

      },
      // 第一个2柱状图
      getBarCharts(dataX,dataY){
        this.barChar = {
          barCharId: "tasksummary",
          xAxisData: dataX,
          seriesData: dataY
        };
      },
      getpetalCharData(data,arr){
        this.petalCharData = {
          id:'petalId',
          seriesData: data,
          // seriesData:[{value:335, name:'直接访问'},
          //   {value:310, name:'邮件营销'},
          //   {value:274, name:'联盟广告'},
          //   {value:235, name:'视频广告'},
          //   {value:400, name:'搜索引擎'}],
          // legendData: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          legendData: arr
        };
      },
      loadData() {
        let that = this;
        that.$Get("/admin/task/report/monthTrend", {}, function (data) {
          that.getLinChartData(data.data)
        })
        that.$Get("/admin/task/report/summary", {}, function (data) {
          that.getBarChartData(data.data)
        })
        that.$AsyncDealData(datarouters.SystemManage.hierarchy.monitorySummary, null, function(data) {

          let totalData = [];
          totalData.push({name : "诊改体系", value : data.data.himcount, proportion:data.data.himcount>'0' ? '2.14%' : '0%'});
          totalData.push({name : "诊改层面", value : data.data.levelcount, proportion:data.data.levelcount>'0' ? '7.1%' : '0%'});
          totalData.push({name : "诊改维度", value : data.data.dimcount, proportion:data.data.dimcount>'0' ? '5.32%' : '0%'});
          totalData.push({name : "诊改质控点", value : data.data.pointcount, proportion:data.data.pointcount>'0' ? '1.71%' : '0%'});
          that.alltotalData = totalData;
        });
        that.$Get("admin/filemanage/page", Object.assign(that.page,{fileType : 31}), function (data) {
          that.file = data.data.records
          });
        // let param = {};
        // param.current = 1;
        // param.size = 150;
        // param.fileType = 31;
        // this.$AsyncDealData(datarouters.SystemManage.filemanage.page, param, function (data) {
        // });
      },

      //   获取第4个图标数据
      getLinChartData(data){
        let dateArr = []
        let total = [] // 任务总数
        let achieving  = [] // 达标

        data.map(o=>{
          dateArr.push(o.trendTime)
          // dateArr.push(...['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'])
          total.push(o.taskSummary.total)
          // total.push(...[136,375,380,449,114,267,142,318,357,193,421,391])
          achieving.push(o.taskSummary.achieving)
          // achieving.push(...[610, 312, 221,654, 910, 630, 310, 521, 354, 560, 830, 310])
        })
        this.LineDataNum = {
          pieChartId: "LineChartId",
          seriesData:{
            xData: dateArr,
            // xData: [],
            tasksNum: total, // 任务数量1-7个月的量
            // tasksNum: [], // 任务数量1-7个月的量
            tasksAccomplish: achieving, // 任务达标1-7个月的量
            // tasksAccomplish: [], // 任务达标1-7个月的量
          }
        }
      },
      //   获取第1个图标数据
      getBarChartData(data){
        this.CircleData = {
          id: "CircleId",
          seriesData:{
            achieving:data.achieving,
            spiral:data.spiral===0 ? data.achieving/3 : data.spiral
          },
        }

      },
    }
  };
</script>

<style lang='less' scoped>
@import url("./monitoring.less");
</style>
