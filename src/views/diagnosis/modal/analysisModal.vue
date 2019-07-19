<template>
    <Modal v-model="analysisDataModal.state" id="ModalDiv" :width=widthModal :mask-closable="false" @on-cancel="closeModal()">
    <p slot="header" style="color:#fff;text-align:center;font-size: 16px">
      <span>诊断报告详情</span>
    </p>
    <div class="centerDiv">
     <div :style="reportDiv" class="reportDiv">
        <div>
          <div style="text-align: right;font-size: 14px">
            <el-button @click="clickPast" style="font-size: 14px" size="small">{{!showLength ? '打开历史数据' : '关闭历史数据'}}</el-button>
          </div>
          <el-row>
            <el-col :span="9">
              <span>填写报告人: </span>
              <span> {{dataRight.writeName}}</span>
            </el-col>
            <el-col :span="9">
              <span>诊断结果: </span>
              <span> {{dataRight.targetState=='0' ? '未达标': '达标'}}</span>
            </el-col>
            <!--锁定暂时关闭-->
            <!--<el-col :span="6" style="text-align: right">
              &lt;!&ndash;`lock_flag` char(1) DEFAULT '0' COMMENT '锁定标志， 0- 未锁定 1 - 锁定',&ndash;&gt;
            <Button v-if="hierarchy_report_lock" size="small"
                      :disabled="dataRight.lockFlag =='1'" type="primary" >锁定</Button>
              <Button  v-if="hierarchy_report_unlock" size="small"
                       :disabled="dataRight.lockFlag =='0'" >解锁</Button>
            </el-col>-->
          </el-row>
          <el-row>
            <el-col :span="23">
              <span>所属指标: </span>
              <span> {{dataRight.targetName}}</span>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="23">
              <span>所属部门: </span>
              <span> {{dataRight.deptName}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span>诊断结论:</span>
              <p class="diagnose">{{dataRight.diagnose}}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span>拟改进措施:</span>
              <p class="diagnose">{{dataRight.improve}}</p>
            </el-col>
          </el-row>
        </div>
      </div>
     <div v-if="showLength" :style="PastDiv" class="reportDiv">
       <div>
         <el-row class="top">
           <div class="page"> <el-button @click="upPage" size="small">上一条</el-button></div>
           <div>
             <!--<span class="sub-title">选择时间</span>
             <el-autocomplete
               class="inline-input"
               v-model="state1"
               :fetch-suggestions="querySearch"
               placeholder="请选择时间"
               @select="handleSelect"
             ></el-autocomplete>-->

             <el-select v-model="state1" @change="handleSelect" placeholder="请选择">
               <el-option
                 v-for="item in restaurants"
                 :key="item.value"
                 :label="item.label"

                 :value="item.value">
               </el-option>
             </el-select>
           </div>
           <div  class="page"><el-button @click="nextPage" size="small">下一条</el-button></div>
         </el-row>
         <el-row>
           <el-col :span="12">
             <span>填写报告人: </span>
             <span> {{dataPast.writeName}}</span>
           </el-col>
           <el-col :span="12">
             <span>诊断结果: </span>
             <span> {{dataPast.targetState=='0' ? '未达标': dataPast.targetState=='1' ?  '达标' : ''}}</span>
           </el-col>
           <!--<el-col :span="6">-->
              <!--<span class="pastBtn" @click="clickPast('open')">-->
                <!--{{!showLength ? '打开历史数据' : '关闭历史数据'}}-->
              <!--</span>-->
           <!--</el-col>-->
           <!--锁定暂时关闭-->
           <!--<el-col :span="6" style="text-align: right">
             &lt;!&ndash;`lock_flag` char(1) DEFAULT '0' COMMENT '锁定标志， 0- 未锁定 1 - 锁定',&ndash;&gt;
           <Button v-if="hierarchy_report_lock" size="small"
                     :disabled="dataRight.lockFlag =='1'" type="primary" >锁定</Button>
             <Button  v-if="hierarchy_report_unlock" size="small"
                      :disabled="dataRight.lockFlag =='0'" >解锁</Button>
           </el-col>-->
         </el-row>
         <el-row>
           <el-col :span="23">
             <span>所属指标: </span>
             <span> {{dataPast.targetName}}</span>
           </el-col>

         </el-row>
         <el-row>
           <el-col :span="23">
             <span>所属部门: </span>
             <span> {{dataPast.deptName}}</span>
           </el-col>
         </el-row>
         <el-row>
           <el-col :span="24">
             <span>诊断结论:</span>
             <p class="diagnose">{{dataPast.diagnose}}</p>
           </el-col>
         </el-row>
         <el-row>
           <el-col :span="24">
             <span>拟改进措施:</span>
             <p class="diagnose">{{dataPast.improve}}</p>
           </el-col>
         </el-row>
       </div>
     </div>
    </div>
    <div slot="footer" style="text-align: center">
      <Button type="primary" size="large" @click="closeModal()">关闭</Button>
    </div>

  </Modal>
</template>


<script>
  export default {
    name: "analysisModal",
    props: {
      analysisDataModal: {
        type: Object,
        required: true
      }
    },
    data(){
      return{
        dataRight:{
          diagnose: '', //诊断结论
          improve: '', //拟改进措施
          deptName: '',// 部门
          writeName: '',// 报告人
          targetName: '',// 指标
          targetState: '',// 诊断结果
          lockFlag: ''
        },
        dataPast:{
          diagnose: '', //诊断结论
          improve: '', //拟改进措施
          deptName: '',// 部门
          writeName: '',// 报告人
          targetName: '',// 指标
          targetState: '',// 诊断结果
          lockFlag: ''
        },
        showLength: false,
        widthModal: '50%',
        reportDiv: '',
        PastDiv: '',
        state1: null,
        restaurants: [],
        indexData: 0
      }
    },
    watch: {
      analysisDataModal: {
        handler(newValue, oldValue) {
          this.getData()
        },
        deep: true
      }
    },
    mounted(){
    },
    methods:{
      // 历史数据上下页
      upPage(str){
        this.indexData -= 1
        let oldLength = this.restaurants.length // 1-10
        let newLength = this.indexData // 0-9
          if(oldLength > newLength && newLength >= 0){
            this.state1 = this.restaurants[newLength].value
            this.handleSelect()
          }else if(newLength < 0){
            this.indexData += 1
            this.$alert('这已经是第一条历史记录', '提示', {
              confirmButtonText: '确定',
            });
          }
        console.log(22,this.indexData)
        console.log(222222,this.state1)
      },
      nextPage(){
        this.indexData += 1
        let oldLength = this.restaurants.length // 1-10
        let newLength = this.indexData // 0-9
        if(oldLength > newLength && newLength >= 0){
          this.state1 = this.restaurants[newLength].value
          this.handleSelect()
        }else if(newLength >= oldLength){
          this.indexData -= 1
          this.$alert('这已经是最后一条历史记录', '提示', {
            confirmButtonText: '确定',
          });
        }
      },
      // 选择下拉
      handleSelect(item) {
        this.restaurants.forEach( (e,index) =>{
          if(e.logId === this.state1){
            this.indexData = index
          }
        })
        let logId = this.state1
        this.$Get("/admin/task/report/task/log/" + logId, {} , res => {
          if(res.code === 0){
            this.dataPast = res.data
          }
        })
      },
      // 获取下拉框数据
      loadAll() {
        let that = this
        let  taskId = this.analysisDataModal.id
        this.$Get("/admin/task/report/task/logs/" + taskId, {} , res => {
          if(res.code === 0){
            res.data.forEach(e =>{
              e.value = e.logId
              e.label = e.createTime
            })
            that.restaurants = res.data
            this.state1 = res.data[0].value
            this.handleSelect(res.data[0].value)
          }
        })
      },
      // 点击历史数据
      clickPast(){
        if(!this.showLength){
          this.loadAll()
            this.showLength = true
            this.widthModal = '80%' // 弹窗增加
            this.reportDiv = 'width: 50%' // 左边当前数据
            this.PastDiv = 'width: 50%' // 右边历史数据
        }else {
          this.dataPast = {
            diagnose: '', //诊断结论
            improve: '', //拟改进措施
            deptName: '',// 部门
            writeName: '',// 报告人
            targetName: '',// 指标
            targetState: '',// 诊断结果
            lockFlag: ''
          },
          this.showLength = false
          this.widthModal = '50%'
          this.reportDiv = '100%'

        }
      },
      // 父组件传的参数
      getData(){
        this.dataRight = this.analysisDataModal.data
      },
      // 关闭修改框
      closeModal() {
        let ifl = false
        this.showLength = true
        this.clickPast()
        this.state1 = ''
        this.restaurants = ''
        this.indexData = ''
        this.$emit("closeModal", {state: false});
      },
    }
  }
</script>

<style lang='less' scoped>
  .pastBtn{
    cursor: pointer;
  }
  .centerDiv{
    height: 100%;
    /*border: 1px solid red;*/
    display: flex;
    .reportDiv{
      height: 100%;
      /*height:calc(100% - 40px);*/
      border: 1px solid #dcdee2;
      padding: 0.1rem;
      overflow-y: auto;
      .top{
        display: flex;
        justify-content: space-between;
        /*justify-content: space-around;*/
        .page{
          height: 40px;
          line-height: 40px;
          font-size: 16px;
        }
      }
      .noData{
        position: absolute;
        width: 50%;
        height: 80%;
        top:10%;
        right:0;
        /*margin-top: -150px;*/
        /*margin-left: -150px;*/
        background: url("../../../assets/images/wushuju.png");
        background-size: 40% 50%;
        background-repeat:no-repeat;
        background-position: center
      }
      .el-col{
        text-align: left;
        padding: 10px 20px 0 20px;
        font-size: 16px;
        >span:first-child{
          display: inline-block;
          font-weight: 700;
          border-bottom:2px solid #00b7ee;
        }
        .diagnose{
          text-indent:35px;
          width: 100%;
          word-wrap:break-word
        }
      }

    }
  }

</style>
