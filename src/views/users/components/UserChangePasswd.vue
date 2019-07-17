<template>
    <div>
        <el-dialog
          title="修改密码"
          :visible.sync="dialogVisible"
          width="30%">
            <el-form
              :model="passwdForm"
              :rules="rules"
              ref="passwdForm"
              label-width="150px">
                <el-form-item
                  label="请输入原密码："
                  prop="oldPassword">
                    <el-input
                      v-model="passwdForm.oldPassword"
                      type="password"
                      minlength="6"></el-input>
                </el-form-item>
                <el-form-item
                  label="请输入新密码："
                  prop="newPassword">
                    <el-input
                      v-model="passwdForm.newPassword"
                      type="password"
                      minlength="6"></el-input>
                </el-form-item>
                <el-form-item
                  label="请再次输入密码："
                  prop="confirmPassword">
                    <el-input
                      v-model="passwdForm.confirmPasswd"
                      type="password"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitChange('passwdForm')">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import axios from 'axios';
axios.defaults.baseURL = BASE_URL.identify_api ;
@Component
export default class UserChangePasswd extends Vue {
    @Prop({ type: String, default: '' }) public password: string;

    @Prop({ type: Boolean, default: false }) public dialogVisible: boolean;

    @Prop({ type: String, default: '' }) public id: string;

    public passwdForm = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };

    public rules = {
      oldPassword: [{ required: true, message: '请输入原密码！', trigger: 'blur' }],
      newPassword: [{ required: true, message: '密码不能为空！', trigger: 'blur' }],
      confirmPassword: [{ required: true, validator: this.vaildataCheckPasswd, trigger: 'blur' }],
    };

    // public vaildataOriginPasswd(rule: any, value: string, callback: any) {
    //   // console.log(this.password);
    //   if (value !== this.password) {
    //     callback(new Error('密码不正确！'));
    //   } else {
    //     callback();
    //   }
    // }

    public vaildataCheckPasswd(rule: any, value: string, callback: any) {
      const tmp = this.passwdForm.confirmPassword;
      if (value !== tmp) {
        callback(new Error('两次输入的密码不一致！'));
      }
      callback();
    }

    public submitChange(formName: string) {
      (this.$refs[formName] as HTMLFormElement).validate((tmp: boolean) => {
        if (tmp) {
          const updateForm = {
            // password: this.passwdForm.newPasswd,
            oldPassword: this.passwdForm.oldPassword,
            newPassword: this.passwdForm.newPassword,
            confirmPassword: this.passwdForm.confirmPassword,
          };
          axios.put(`/users/${this.id}/pwd/change`, updateForm)
            .then((response) => {
              this.$router.push({ path: `/edit/${this.id}` });
              this.dialogVisible = false;
            });
        } else {
          this.$alert('请输入正确的信息！');
        }
      });
    }
}
</script>
