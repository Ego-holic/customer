<template>
    <div>
        <el-form :model="registerForm" ref="registerForm" :rules="rules">
            <el-form-item label="请输入用户名：">
                <el-input v-model="registerForm.name"></el-input>> 
            </el-form-item>
            <el-form-item label="请输入密码：">
                <el-input type="password" v-model="registerForm.passward"></el-input>
            </el-form-item>
            <el-form-item label="请再次输入密码：">
                <el-input type="password" v-model="registerForm.checkPass"></el-input>
            </el-form-item>
            <el-form-item label="请输入邮箱地址：">
                <el-input v-model="registerForm.email"></el-input>
            </el-form-item>
            <el-form-item label="请输入电话号码：">
                <el-input v-model="registerForm.phoneNum"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="sumbit()">提交</el-button>
                <el-button type="default" @click="reset()">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang='ts'>
export default {
    data(){

        var validatePass = (rule: string[],value: string) => {
        if (value === '') {
          alert("请输入密码！");
        } else {
          if (this.$refs[registerForm].checkPass !== '') {
            this.$refs.registerForm.validateField('checkPass');
          }
        }
      };

      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        return{
            registerForm:{
            name: '',
            password: '',
            email: '',
            phoneNum: ''
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
            }
        }
    },
    methods(){
        sumbit(){},
        reset(){}
    }
}
</script>