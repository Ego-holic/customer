<template>
  <div>
      <h1>用户列表</h1>
      <div>
          <el-table
            :data="userData"
            border
            style="width: 100%">
            <el-table-column
                prop="id"
                label="ID"
                width="100">
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
                    @click="assignRole()">分配角色</el-button>
                <el-button
                    size="mini"
                    @click="editUser()">编辑</el-button>
                <el-button
                    size="mini"
                    @click="removeUser()">删除</el-button>
                </template>
            </el-table-column>
          </el-table>
      </div>
      <div  class="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
      </div>
  </div>
</template>
<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';

@Component
export default class UserForm extends Vue{

    editUser(){

    }

    userData = {
        id: '1',
        name: 'jerry',
        email: 'jerry@qq.com',
        phoneNum: '13254446777'
    };

    userList(){
        axios.get('url',{
            params: {
                id: '',
                name: '',
                email: '',
                phoneNum: ''
            }
        })
            .then(this.getUsersData)
    }
    getUsersData(res: any){
        let rep = res.data;
        this.userData.id = rep.id;
        this.userData.name = rep.name;
        this.userData.email = rep.email;
        this.userData.phoneNum = rep.phoneNum;
      }
    created() {
        this.userList();

    }
}
</script>
<style lang="stylus">
    .pagination{
        display flex
        justify-content flex-end
    }
    h1{
        display flex
        justify-content center
    }
</style>