<template>
    <div>
        <h1>编辑用户信息</h1>
        <el-card>当前用户的ID：{{ userForm.id }}</el-card>
        <el-card>当前的用户名：{{ userForm.name }}</el-card>
        <el-form :model="userForm" :rules="rules">
            <el-form-item label="新的邮箱：" prop="email">
                <el-input v-model="userform.email"></el-input>
            </el-form-item>
            <el-form-item label="新的手机号：" prop="phoneNum">
                <el-input v-model="userform.phoneNum"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import axios from 'axios';
// import UserAdd from '@/components/UserAdd.vue';

export default class UserInfoEdit extends Vue {
    userForm = {};

    getUserById(val: string) {
      axios.get(`http://localhost:3000/users?id=${val}`).then((response) => {
        this.userForm = {
          id: val,
          name: response.data.name,
          email: response.data.email,
          phoneNum: response.data.phoneNum,
        };
      }).catch((err) => {
      });

    
    }

    created() {
      this.getUserById(this.$route.params.id);
    }
}
</script>
