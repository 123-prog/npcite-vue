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
  <el-menu-item index="1"><el-link href='/index/show'>购物中心</el-link></el-menu-item>
  <el-menu-item index="2"><el-link href='/user/info'>个人空间</el-link></el-menu-item>
  <el-menu-item index="3"><el-link href='/user/cart'>我的购物车</el-link></el-menu-item>
  <el-menu-item index="4"><el-link @click="logout">登出</el-link></el-menu-item>
</el-menu>
  </el-header>
  <el-main>
    <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="commodity_name"
      label="商品名称"
      width="">
    </el-table-column>
    <el-table-column
      prop="num"
      label="数量">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
        @click.native.prevent="buy(scope.$index, tableData)"
        type="text"
        size="small">
        购买
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-main>
</el-container>
</template>

<script>
    export default{
        mounted:function(){
            this.getData();
        },
        data(){
            return {
                activeIndex: '3',
                tableData: [{}]
            };
        },
        methods:{
            openHTML(html) {
                this.$message({
                    dangerouslyUseHTMLString: true,
                    message: html
                });
            },
            getData(){
                this.Axios.get('/api/user/showCart').then(res=>{
                    this.tableData = res.data;
                })
            },
            buy(index,data){
                var row = data[index]
                let data1 = {"commodity_id":row.commodity_id,"num":row.num}
                this.Axios.post('/api/user/buy',this.qs.stringify(data1)).then(res=>{
                    this.openHTML(res.data.msg);
                    if(res.data.code==200){
                        location.reload();
                    }
                }).catch(error=>{
                    console.log(error);
                })
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
        }
    }
</script>
