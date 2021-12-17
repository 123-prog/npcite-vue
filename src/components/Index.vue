<template>
<el-container>
  <el-header>
    <el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1">购物中心</el-menu-item>
  <el-menu-item index="2"><el-link href='/user/info'>个人空间</el-link></el-menu-item>
  <el-menu-item index="3"><el-link href='/user/cart'>我的购物车</el-link></el-menu-item>
  <el-menu-item index="4"><el-link @click="logout">登出</el-link></el-menu-item>
</el-menu>
</el-header>
  <el-main>
    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="所属用户">
            <span>{{ props.row.owner }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.msg }}</span>
          </el-form-item>
          <el-form-item label="商品单价">
            <span>{{ props.row.price }}</span>
          </el-form-item>
          <el-form-item label="商品库存">
            <span>{{ props.row.reserve }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="商品 ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="msg">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="addCart(scope.$index, tableData)"
          type="text"
          size="small">
          加入购物车
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-main>
  <el-footer></el-footer>
</el-container>
</template>

<script>
  export default {
    mounted:function(){
      this.getData();
    },
    data() {
      return {
        activeIndex: '1',
        tableData: [{}]
      };
    },
    methods: {
      openHTML(html) {
        this.$message({
          dangerouslyUseHTMLString: true,
          message: html
        });
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.getData();
      },
      getData(){
        this.Axios.get('/api/index/show').then(res=>{
          this.tableData = res.data;
        }).catch(error=>{
          this.openHTML("请先登录,正在跳转...");
          setTimeout(function(){window.location.href='/user/login'},1500);
          console.log(error);
        });
      },
      logout(){
        this.Axios.get('/api/user/logout').then(res=>{
          if(res.data.code == 200){
            this.openHTML("登出成功，正在跳转...");
            window.location.href='/user/login';
          }else{
            this.openHTML("登出失败");
          }
        })
      },
      addCart(index,data){
        var row = data[index]
        this.Axios.get('/api/user/addCommodity?id='+row.id).then(res=>{
          if(res.data.code==200){
            this.openHTML('添加至购物车成功');
          }else{
            this.openHTML('添加失败');
          }
        }).catch(error=>{
          console.log(error);
        })
      }
    }
  }
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>