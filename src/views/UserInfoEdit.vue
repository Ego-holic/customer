<template>
    <div class="edit-wrapper">
      <el-card shadow="hover">
        <h1>修改用户信息</h1>
        <p>当前用户的ID：{{ userData.id }}</p>
        <div class="form">
        <el-row>
          <el-form ref="userData" :model="userData" :rules="rules" label-width="120px">
            <el-form-item label="新的邮箱地址：" prop="email">
                <el-input v-model="userData.email" placeholder="请输入邮箱地址"></el-input>
            </el-form-item>
            <el-form-item label="新的手机号码：" prop="phoneNum">
                <el-input v-model="userData.phoneNum" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="submitChange()">提交修改</el-button>
              <el-button type="default" @click="cancel()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-row>
        </div>
      </el-card>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import axios from 'axios';
// import UserForm from '@/views/UserForm.vue';
@Component
export default class UserInfoEdit extends Vue {
  userData = {
    id: '',
    email: '',
    phoneNum: '',
  };

    rules={
      email: [{ required: false }],
      phoneNum: [{ required: false }],
    };

    getUserById(val: string) {
      axios.get(`http://localhost:3000/users?id=${val}`).then((response) => {
        this.userData = {
          id: response.data[0].id,
          email: response.data[0].email,
          phoneNum: response.data[0].phoneNum,
        };
      });
    }

    submitChange() {
      // e.preventDefault();
      if (!this.userData.email || !this.userData.phoneNum) {
        this.$alert('请输入信息！');
      } else {
        const updateForm = {
          id: this.userData.id,
          email: this.userData.email,
          phoneNum: this.userData.email,
        };
        console.log(updateForm);
        axios.patch(`http://localhost:3000/users/${this.$route.params.id}`, updateForm)
          .then((response) => {
            this.$router.push({ path: '/users' });
          });
      }
    }

    cancel() {
      this.$router.push({ path: '/users' });
    }

    created() {
      this.getUserById(this.$route.params.id);
    }
}
</script>

<style lang="stylus">
.edit-wrapper{
  display flex
  justify-content center
  margin-top 150px
}

h1{
  text-align center
}
p{
  text-align center
}
</style>
