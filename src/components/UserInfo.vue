<template>
<el-container>
<!--发布商品的表单-->
<el-dialog title="新商品详情" :visible.sync="dialogFormVisible">
    <el-form :model="form">
    <el-form-item label="商品名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品描述" :label-width="formLabelWidth">
      <el-input type="textarea" v-model="form.msg"></el-input>
    </el-form-item>
    <el-form-item label="单价" :label-width="formLabelWidth">
      <el-input  v-model="form.price"></el-input>
    </el-form-item>
    <el-form-item label="现有库存" :label-width="formLabelWidth">
      <el-input  v-model="form.reserve"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="newCommodity">确 定</el-button>
  </div>
</el-dialog>

<!--用于更改商品信息的表单-->
<el-dialog title="新商品详情" :visible.sync="updateFormVisible">
    <el-form :model="updateForm">
    <el-form-item label="商品名称" :label-width="formLabelWidth">
      <el-input v-model="updateForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品描述" :label-width="formLabelWidth">
      <el-input type="textarea" v-model="updateForm.msg"></el-input>
    </el-form-item>
    <el-form-item label="单价" :label-width="formLabelWidth">
      <el-input  v-model="updateForm.price"></el-input>
    </el-form-item>
    <el-form-item label="现有库存" :label-width="formLabelWidth">
      <el-input  v-model="updateForm.reserve"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="updateFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateCommodity">确 定</el-button>
  </div>
</el-dialog>

  <el-header>
      <el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
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
<el-descriptions title="用户信息" class="info-form" :data="info">
    <template slot="extra">
      <el-button type="success" size="small" v-show='is_sale' @click="dialogFormVisible=true" round>上架新商品</el-button>
      <el-button type="primary" size="small" v-show='is_sale' @click="show_sale" round>销售详情</el-button>
      <el-button type="info" size="small" v-show='is_sale' @click="show_log" round>销售日志</el-button>
    </template>
    <el-descriptions-item label="用户名" prop="name">{{ info.name }}</el-descriptions-item>
    <el-descriptions-item label="用户id">{{ info.id }}</el-descriptions-item>
    <el-descriptions-item label="账户余额">{{ info.balance }}</el-descriptions-item>
    <el-descriptions-item label="账户角色">
      <el-tag size="small">{{ info.role }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="邮箱地址">{{ info.email }}</el-descriptions-item>
</el-descriptions>
    <el-divider></el-divider>
<el-table
    :data="tableData"
    style="width: 100%" v-show="is_sale">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称：">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="所属用户：">
            <span>{{ props.row.owner }}</span>
          </el-form-item>
          <el-form-item label="商品 ID：">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="商品描述：">
            <span>{{ props.row.msg }}</span>
          </el-form-item>
          <el-form-item label="商品单价：">
            <span>{{ props.row.price }}</span>
          </el-form-item>
          <el-form-item label="商品库存：">
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
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          下架
        </el-button>
        <el-button
          @click.native.prevent="updateRow(scope.$index, tableData)"
          type="text"
          size="small">
          修改
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</el-main>
</el-container>
</template>

<style acoped>
.info-form {
    padding: 30px;
    border-radius: 20px; /* 圆角 */
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
</style>

<script>
export default{
    mounted:function(){
        this.getInfo();
    },
    data() {
        return {
            dialogFormVisible:false,
            updateFormVisible:false,
            form:{
              name:''
            },
            updateForm:{
              name:'',
              msg:'',
              price:'',
              reserve:''
            },
            formLabelWidth: '120px',
            is_sale:false,
            activeIndex: '2',
            info: {},
            tableData:[{}],
            tmp_row:{}
        };
    },
    methods:{
        open1() {
        const h = this.$createElement;
        this.$notify({
          title: '欢迎',
          message: h('i', { style: 'color: teal'}, '您是销售管理员，可以对您的商品进行操作')
        });
        },
        openHTML(html) {
            this.$message({
            dangerouslyUseHTMLString: true,
            message: html
            });
        },
        getInfo(){
            this.Axios.get('/api/user/info').then(res=>{
                this.info = res.data;
                console.log(this.info)
                this.info.role = '';
                var is_sale = false;
                for(var i=0,l=res.data.roles.length;i<l;i++){
                    this.info.role += ' '+res.data.roles[i].roleName;
                    if(res.data.roles[i].roleName == 'sales_user'){
                        is_sale = true;
                    }
                }
                if(is_sale){
                    this.open1();
                    this.is_sale=true;
                    this.getData();  //获取表单数据
                }
            }).catch(error=>{
                this.openHTML("请先登录,正在跳转...");
                setTimeout(function(){window.location.href='/user/login'},1500);
                console.log(error);
            })
        },
        getData(){
            this.Axios.get('/api/shop/show').then(res=>{
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
        deleteRow(index,data){
            this.$confirm('此操作将永久下架该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var row = data[index];
                //console.log(row)
                var id = row.id;
                this.Axios.get('/api/shop/del?id='+id).then(res=>{
                    if(res.data==1){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        location.reload();
                    }
                })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });
        },
        updateRow(index,data){
            this.updateFormVisible = true;
            this.tmp_row = data[index]
            this.updateForm.name = this.tmp_row.name;
            this.updateForm.msg = this.tmp_row.msg;
            this.updateForm.price = this.tmp_row.price;
            this.updateForm.reserve = this.tmp_row.reserve;
        },
        newCommodity(){
            this.dialogFormVisible = false;
            var name = this.form.name;
            var msg = this.form.msg;
            var price = this.form.price;
            var reserve = this.form.reserve;

            if(name.length==0 || msg.length==0|| price.length==0|| reserve.length==0){
                this.openHTML("参数不能为空");
            }else{
                let data = {"name":name,"msg":msg,"price":Number(price),"reserve":Number(reserve)}
                this.Axios.post('/api/shop/add',this.qs.stringify(data)).then(res=>{
                    if(res.data == 1){
                        this.openHTML("发布成功");
                        location.reload();
                    }
                }).catch(error=>{
                    console.log(error);
                })
            }
        },
        updateCommodity(){
          this.updateFormVisible = false;
          var name = this.updateForm.name;
          var msg = this.updateForm.msg;
          var price = this.updateForm.price;
          var reserve = this.updateForm.reserve;
          if(name.length==0 || msg.length==0|| price.length==0|| reserve.length==0){
                this.openHTML("参数不能为空");
          }else{
            var row = this.tmp_row;
            let data = {"name":name,"msg":msg,"price":Number(price),"reserve":Number(reserve),"sale_num":row.sale_num,"income":row.income,"id":row.id}
            this.Axios.post('/api/shop/update',this.qs.stringify(data)).then(res=>{
              if(res.data == 1){
                this.openHTML("修改成功");
                location.reload();
              }
            }).catch(error=>{
              console.log(error);
            })
          }
        },
        show_sale(){
          window.location.href='/sales/show'
        },
        show_log(){
          window.location.href='/sales/log'
        }
    }
}
</script>
