<template>
  <div class="label">
      <h1 justify="center">用户列表</h1>
      <div class="table_wrapper">
          <el-table
            :data="userData"
            border
            size="medium">
            <el-table-column
                prop="id"
                label="ID"
                width="150">
            </el-table-column>
            <el-table-column
                prop="name"
                label="用户名"
                width="200">
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱"
                width="250">
            </el-table-column>
            <el-table-column
                prop="phoneNum"
                label="电话"
                width="250">
            </el-table-column>
            <el-table-column label="操作">
                <template>
                <el-button
                    size="mini"
                    type="primary"
                    @click="assignRoles()">分配角色</el-button>
                <el-button
                    size="mini"
                    type="success"
                    @click="editUser()">编辑</el-button>
                <el-button
                    size="mini"
                    @click="deleteUser(this.props.row.id)">删除</el-button>
                </template>
            </el-table-column>
          </el-table>
      </div>
      <div>
          <el-row class="btn">
              <el-col :span="6" :offset="3">
                    <el-button
                        size="medium"
                        type="primary"
                        @click="addUser()">添加用户</el-button>
              </el-col>
              <el-col :span="6" :offset="7">
                  <el-pagination
                    layout="prev, pager, next, jumper"
                    :total="total"
                    :current-page.sync="currentPage"
                    :page-size= "pageSize"
                    @current-change="handleCurrentChange">
                  </el-pagination>
              </el-col>
          </el-row>
      </div>
  </div>
</template>
<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class UserForm extends Vue {
    userData = [];

    totalData = [];

    total = 0;

    currentPage = 1;

    pageSize = 10;

    addUser() {
      this.$router.push({ path: '/useradd' });
    }

    userList() {
      axios.get('http://localhost:3000/users')
        .then((response) => {
          this.getUsersData(response);
        });
    }

    getUsersData(response: any) {
      const request = response.data;
      this.totalData = request;
      const argCurrent = this.currentPage;
      const argSize = this.pageSize;
      this.userData = request.slice((argCurrent - 1) * argSize, argCurrent * argSize);
      this.total = request.length;
    }

    handleCurrentChange(val: number) {
      this.currentPage = val;
      const argCurrent = this.currentPage;
      const argSize = this.pageSize;
      this.userData = this.totalData.slice((argCurrent - 1) * argSize, argCurrent * argSize);
    }

    delUserInfo(){
        const id = this.getUsersData(this.$route.params.id)
        console.log(id);
    }

    deleteUser(id: string){
        console.log(id);
    //    this.$confirm('确认要删除该用户吗?', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       this.delUserInfo(id);
    //       this.$message({
    //         type: 'success',
    //         message: '删除成功!'
    //       });
    //     }).catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       });          
    //     });
    }

    created() {
      this.userList();
    }
}
</script>
<style lang="stylus">
    h1{
        display flex
        justify-content center
    }
    .table_wrapper{
        width 90%
        position relative
        left 70px
    }
    .btn{
        margin 20px
    }
</style>
