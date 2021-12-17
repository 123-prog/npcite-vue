<template>
<el-container>
    <el-divider></el-divider>
  <el-header>
      <el-page-header @back="goBack" content="销售报表">
</el-page-header>
  </el-header>
  <el-divider></el-divider>
  <el-main>
      <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称:">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="所属用户:">
            <span>{{ props.row.owner }}</span>
          </el-form-item>
          <el-form-item label="商品 ID:">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="商品描述:">
            <span>{{ props.row.msg }}</span>
          </el-form-item>
          <el-form-item label="商品单价:">
            <span>{{ props.row.price }}</span>
          </el-form-item>
          <el-form-item label="商品库存:">
            <span>{{ props.row.reserve }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="商品总收入"
      prop="income">
    </el-table-column>
    <el-table-column
      label="商品售出数量"
      prop="sale_num">
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
          this.Axios.get('/api/sales/show').then(res=>{
              this.tableData = res.data;
          })
      }
    }
  }
</script>