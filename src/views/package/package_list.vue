<template>
  <div class="about">
   <div style="margin-top: 20px">
        <el-button @click="batchExport()">批量导出</el-button>
    </div>
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