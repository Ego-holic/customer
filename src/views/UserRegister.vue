<template>
    <div class="title">
      <h2>欢迎注册</h2>
      <div class="wrapper">
        <el-form :model="registerForm" ref="registerForm" :rules="rules" label-width="140px">
            <el-form-item label="请输入用户名：" prop="name">
                <el-input v-model="registerForm.name"></el-input>
            </el-form-item>
            <el-form-item label="请输入密码：" prop="password">
                <el-input type="password" v-model="registerForm.password"></el-input>
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
            </el-form-item>
        </el-form>
      </div>
    </div>
</template>
<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class UserRegister extends Vue{

  private validateName = (rule: any, value: string, callback: any) => {
  if (value === ''){
    callback(new Error('用户名不能为空！'));
  }else{
    callback();
  }
};

  private validatePasswd = (rule: any, value: string, callback: any) => {
  if (value === ''){
    callback(new Error('密码不能为空！'));
  }else{
     if (this.registerForm.checkPasswd !== '') {
            (this.$refs.registerForm as HTMLFormElement).validateField('checkPasswd');
          }
    callback();
  }
};
private validateCheckPasswd = (rule: any, value: string, callback: any) => {
  let passwd = this.registerForm.password;
  if (value === ''){
    callback(new Error('密码不能为空！'));
  }else if(value !== passwd){
    callback(new Error('两次输入的密码不一致！'));
  }else{
    callback();
  }
};

  private validateEmail = (rule: any, value: string, callback: any) => {
  let isEmail: boolean = false;
  const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  isEmail = emailReg.test(value);
  if (!isEmail) {
    isEmail = false;
    return callback(new Error("请检查输入的邮箱是否合法!"));
  } else {
    isEmail = true;
  }
  callback();
};

  private validatePhone = (rule:any, value: string, callback: any) => {
  let isTel: boolean = false;
  const telReg = /^[1][3,4,5,7,8][0-9]{9}$/;
  isTel = telReg.test(value);
  if (!isTel) {
    isTel = false;
    return callback(new Error("请检查输入的手机号码是否合法!"));
  } else {
    isTel = true;
  }
  callback();
};

registerForm = {
    name: '',
    password: '',
    checkPasswd:'',
    email: '',
    phoneNum: ''
  };

rules = {
    name:[{required: true, validator: this.validateName, trigger: 'blur'}],
    password:[{required: true, validator: this.validatePasswd, trigger: 'blur'}],
    checkPasswd:[{required: true, validator: this.validateCheckPasswd,trigger: 'change'}],
    email:[{validator: this.validateEmail, trigger: 'blur'}],
    phoneNum:[{validator: this.validatePhone, trigger: 'blur'}],
  };
  sumbit = (formName: string) => {
    (this.$refs[formName] as HTMLFormElement).validate((vail: boolean) => {
      if (vail){
        return this.$refs[formName];
      }else{
        alert('提交失败，请检查信息是否正确！');
        return false;
      }
    });
  };

  reset = (formName: string) => {
    (this.$refs[formName] as HTMLFormElement).resetFields();
  };

  mounted(){
    this.validatePasswd;
    this.validateCheckPasswd;
  };
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
  position relative
  left 550px
  font-size 50px
}
</style>
