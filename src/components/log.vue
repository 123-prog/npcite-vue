<template>
<el-container>
<el-divider></el-divider>
  <el-header>
        <el-page-header @back="goBack" content="销售日志">
        </el-page-header>
  </el-header>
  <el-divider></el-divider>
  <el-main>
      <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="time"
      label=""
      width="180">
    </el-table-column>
    <el-table-column
      prop="msg"
      label="">
    </el-table-column>
  </el-table>
  </el-main>
</el-container>
</template>

<script>
  export default {
    mounted:function(){
      this.getData();
    },
    data(){
        return{
            tableData:[{}]
        }
    },
    methods: {
      goBack() {
        history.go(-1);
      },
      getData(){
          this.Axios.get('/api/sales/logs').then(res=>{
              this.tableData = res.data;
              for(var i=0,l=this.tableData.length;i<l;i++){
                  this.tableData[i].time = this.getLocalTime(this.tableData[i].time)
              }
          })
      },
      getLocalTime(nS) {     
        return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');     
      }
    }
  }
</script>