<template>
    <div class="title">
      <h2>添加新用户</h2>
      <div class="wrapper">
        <el-form
        :model="registerForm"
        ref="registerForm"
        :rules="rules"
        label-width="140px">
            <el-form-item label="请输入用户名：" prop="name">
                <el-input v-model="registerForm.name"></el-input>
            </el-form-item>
            <el-form-item label="请输入密码：" prop="password">
                <el-input type="password" minlength="6" v-model="registerForm.password"></el-input>
            </el-form-item>
            <el-form-item label="请再次输入密码：" prop="checkPasswd">
                <el-input type="password" v-model="registerForm.checkPasswd"></el-input>
            </el-form-item>
            <el-form-item label="请输入邮箱地址：" prop="email">
                <el-input type="email" v-model="registerForm.email"></el-input>
            </el-form-item>
            <el-form-item label="请输入电话号码：" prop="phoneNum">
                <el-input type="tel" v-model="registerForm.phoneNum"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="sumbit('registerForm')">提交</el-button>
                <el-button type="default" @click="reset('registerForm')">重置</el-button>
                <el-button type="warning" @click="back()">返回列表</el-button>
            </el-form-item>
        </el-form>
      </div>
    </div>
</template>
<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class UserAdd extends Vue {
  getChooseUsersNameArr = [];
  getChooseUsersEmailArr = [];

  getUserDataName(val: string) {
    axios.get('http://localhost:3000/users?name=val')
      .then((Response) => {
        this.getChooseUsersNameArr = Response.data;
      });
  }

  getUserDataEmail(val: string) {
    axios.get('http://localhost:3000/users?email=val')
      .then((Response) => {
        this.getChooseUsersEmailArr = Response.data;
      });
  }

  validateName(rule: any, value: string, callback: any) {
    let isName: boolean = false;
    const nameReg = /^[a-zA-Z0-9_]{1,50}$/;
    isName = nameReg.test(value);
    if (value === '') {
      callback(new Error('用户名不能为空！'));
    } else if (!isName) {
      callback(new Error('只允许大小写字母、数字、下划线！'));
    } else {
      console.log(this.getUserDataName(value));
      if (this.getChooseUsersNameArr) {
        callback(new Error('此用户名已经存在！'));
      } else {
        callback();
      }
    }
  }

  validatePasswd(rule: any, value: string, callback: any) {
    if (value === '') {
      callback(new Error('密码不能为空！'));
    } else if (value.length <= 5) {
      callback(new Error('密码长度不小于6位！'));
    } else {
      if (this.registerForm.checkPasswd !== '') {
        (this.$refs.registerForm as HTMLFormElement).validateField('checkPasswd');
      }
      callback();
    }
  }

  validateCheckPasswd(rule: any, value: string, callback: any) {
    const passwd = this.registerForm.password;
    if (value === '') {
      callback(new Error('密码不能为空！'));
    } else if (value !== passwd) {
      callback(new Error('两次输入的密码不一致！'));
    } else {
      callback();
    }
  }

  validateEmail(rule: any, value: string, callback: any) {
    let isEmail: boolean = false;
    const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    isEmail = emailReg.test(value);
    if (!isEmail) {
      isEmail = false;
      callback(new Error('请检查输入的邮箱是否合法!'));
    } else {
      this.getUserDataEmail(value);
      if (this.getChooseUsersEmailArr !== null) {
        callback(new Error('此邮箱已被使用！'));
      }
    }
    isEmail = true;
    callback();
  }

  validatePhone(rule:any, value: string, callback: any) {
    let isTel: boolean = false;
    const telReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    isTel = telReg.test(value);
    if (!isTel && value !== '') {
      isTel = false;
      callback(new Error('请检查输入的手机号码是否合法!'));
    }
    isTel = true;
    callback();
  }

registerForm = {
  name: '',
  password: '',
  checkPasswd: '',
  email: '',
  phoneNum: '',
};

rules = {
  name: [{ required: true, validator: this.validateName, trigger: 'blur' }],
  password: [{ required: true, validator: this.validatePasswd, trigger: 'blur' }],
  checkPasswd: [{ required: true, validator: this.validateCheckPasswd, trigger: 'change' }],
  email: [{ required: true, validator: this.validateEmail, trigger: 'blur' }],
  phoneNum: [{ validator: this.validatePhone, trigger: 'blur' }],
};

// put = () => false

sumbit(formName: string, e: any) {
  (this.$refs[formName] as HTMLFormElement).validate((vail: boolean) => {
    if (vail) {
      const sumbitForm = {
        name: this.registerForm.name,
        password: this.registerForm.password,
        email: this.registerForm.email,
        phoneNum: this.registerForm.phoneNum,
      };
      axios.post('http://localhost:3000/users', sumbitForm)
        .then((response) => {
          // console.log(response);
          this.$message({
            type: 'success',
            message: '新增用户成功！',
          });
          setTimeout(() => {
            this.back();
          }, 100);
          e.preventDefault();
        });
    } else {
      this.$alert('提交失败，请检查信息是否正确！', 'Error!', {
        confirmButtonText: '确定',
        callback: actions => false,
      });
    }
  });
  e.preventDefault();
}

reset(formName: string) {
  (this.$refs[formName] as HTMLFormElement).resetFields();
}

back() {
  this.$router.push({ path: '/users' });
}

mounted() {
  this.reset('registerForm');
}
}
</script>
<style lang="stylus" scoped>
.title{
  position relative
  top 100px
}
.wrapper{
  display flex
  justify-content center
}
h2{
  display flex
  justify-content center
  font-size 30px
  color navy
}
</style>
