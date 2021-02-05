<template>
  <div class="about">
   <div style="margin-top: 20px">
        <el-button @click="batchExport()">批量导出</el-button>
    </div>
   <el-button @click="add()">新增</el-button>
 <el-table ref="multipleTable" :border="true" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" :header-row-style="headerRowStyle" :row-style="rowStyle" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
     <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column :label="$t('message')" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" :label="$t('serial_number')" width="120">
      </el-table-column>
      <el-table-column prop="address" :label="$t('xx_icon')" show-overflow-tooltip min-width="1">
      </el-table-column>
      <el-table-column prop="address" :label="$t('xx_name')" show-overflow-tooltip min-width="1">
      </el-table-column>
      <el-table-column prop="address" :label="$t('xx_date')" show-overflow-tooltip min-width="1">
      </el-table-column>
      <el-table-column prop="address" :label="$t('state')" show-overflow-tooltip min-width="1">
      </el-table-column>
      <el-table-column prop="address" :label="$t('operation')" show-overflow-tooltip min-width="2">
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">{{$t('edit')}}</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">{{$t('delete')}}</el-button>
    <el-button
          size="mini"
          type="primary"
          @click="handleDelete( scope.row)">{{$t('see')}}</el-button>
    <el-button
          size="mini"
          type="warning"
          @click="handleDelete(scope.$index, scope.row)">{{$t('to_examine')}}</el-button>
    <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">{{$t('in_sync')}}</el-button>
      
      </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>

    </div>
    <el-pagination
  background
  @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage2"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="sizes, prev, pager, next,->,jumper,total"
      
  :total="1000">
</el-pagination>
 <el-button @click="toggleSelection()">新增</el-button>

<el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item title="一致性 Consistency" name="1">
    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
  </el-collapse-item>
  <el-collapse-item title="反馈 Feedback" name="2">
    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
  </el-collapse-item>
  <el-collapse-item title="效率 Efficiency" name="3">
    <div>简化流程：设计简洁直观的操作流程；</div>
    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
  </el-collapse-item>
  <el-collapse-item title="可控 Controllability" name="4">
    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
  </el-collapse-item>
</el-collapse>
  </div>
</template>
<script>
import XLSX from 'xlsx'
import i18n  from './../../i18n'
export default {
  data() {
    return {
headerRowStyle:{
  
},
rowStyle:{

},
   cellStyle:{
'border-color':'#6e97f7',
   },
   headerCellStyle:{
'border-color':'#6e97f7',
   },
   tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    batchExport(){
var filename = "file_"+ new Date().getTime()+".xlsx"; //文件名称
        var data = [[i18n.t('serial_number'),2,3]];  //数据，一定注意需要时二维数组
       this.multipleSelection.forEach(item=>{
         let arr=[]
         for (var i in item){
           arr.push(item[i])
         }
         data.push(arr)
       }) 
        var ws_name = "Sheet1_"; //Excel第一个sheet的名称
        var wb = XLSX.utils.book_new()
        var ws = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, ws_name);  //将数据添加到工作薄
        XLSX.writeFile(wb, filename); //导出Excel

    }
    ,
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      add(){
        this.$router.push({path:'/package_add'})
      }
  }
}
</script>
<style  scoped>

/deep/ .el-table--border, .el-table--group {
    border: 1px solid #6e97f7;
}
/deep/ .el-pagination__jump{
margin-right: 24px;
    
}
/deep/ .el-pagination {

    text-align: right;
} 

</style>