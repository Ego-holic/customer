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
                    @click="assignRole()">分配角色</el-button>
                <el-button
                    size="mini"
                    type="success"
                    @click="editUser()">编辑</el-button>
                <el-button
                    size="mini"
                    @click="removeUser()">删除</el-button>
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
                    current-page="1"
                    page-size= [10,20,40,50,100]
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange">
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

    total = 0;

    currentPage = 1;

    sizePage = 10;

    addUser() {
      this.$router.push({ path: '/useradd' });
    }

    userList() {
      axios.get('http://localhost:3000/users')
        .then(this.getUsersData);
    }

    getUsersData(response: any) {
      const arg = response.data;
      this.userData = arg;
      this.total = arg.length;
    }

    // handleCurrentChange=(val: number) => {
    //   this.currentPage = val;
    // }

    // handleSizeChange=(val: number) => {
    //   this.sizePage = val;
    // }

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
