<template>
    <div class="assgin_wrapper">
        <el-dialog title="分配角色" :visible.sync="visibleAssginRole" @close="closeDialog">
          <div class="search">
            <el-row>
              <el-col :span="15">
                <el-input
          placeholder="请输入APP的ID"
          v-model= "appId"></el-input>
              </el-col>
              <el-col :span="3"
              :offset="1">
                <el-button
          icon="el-icon-search"
          type="primary"
          size="small"
          @click="getRolesByAppId">搜索</el-button>
              </el-col>
            </el-row>
          </div>
          <div class="header">
                <span>已经分配的角色:</span>
                <el-tag
				v-for="(item, index) in usersRoles"
				:key="index"
				closable
				@close="removeTag(index)">{{item}}</el-tag>
          </div>
			<hr />
            <div class="footer">
                <span>未分配的角色：</span>
                <el-tag
				v-for="(item, index) in rolesArr"
				:key="index"
                @click="addTag(index)">{{item}}</el-tag>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import {
  Prop, Component, Vue, Watch,
} from 'vue-property-decorator';
axios.defaults.baseURL = BASE_URL.identify_api;

@Component
export default class UserAssginRole extends Vue {
@Prop({ type: Boolean, default: false }) public visibleAssginRole: boolean;

@Prop({ type: String, default: '' }) public id: string;
  public appId = '';
// 未分配的角色数组
  public rolesArr = [];

  public usersRoles = []; // 已分配的角色数组

  // 用户的全部数据
  public totalData = {
    roleNames: [],
      id: '',
      userName: '',
      email: '',
      phoneNumber: '',
  };

@Watch('id')
public watchIdChange(val: string) {
  this.getUserRoles(val);
  // this.getRoles();
  // console.log(val);
}

  public getRolesByAppId() {
    // console.log(this.appId)
    axios.get(`/roles?applicationId=${this.appId}`)
      .then((response) => {
        // console.log(response)
        const rolesData = response.data;
        const lengthArr1 = rolesData.length;
        const lengthArr2 = this.usersRoles.length;
        let tmpArr = [];
        let index = 0;
        for (let i = 0; i < lengthArr1; i += 1) {
          tmpArr.push(rolesData[i].name);
        }
        for (let j = 0; j < lengthArr2; j += 1) {
          index = tmpArr.findIndex((val: string, index: number) => {
            return Object.is(this.usersRoles[j], val);
          });
        tmpArr.splice(index, 1);
        }
        this.rolesArr = tmpArr;
        console.log(tmpArr);
        });
    }

  // 通过id查询用户的所有数据
  public getUserRoles(val: string) {
    axios.get(`/users/${val}`)
      .then((response) => {
      this.totalData = response.data;
      this.usersRoles = response.data.roleNames;
      });
  }

  public addTag(index: number) {
    const val = this.rolesArr[index];
    // console.log(val)
    this.usersRoles.push(val);
    this.rolesArr.splice(index, 1);
    this.totalData.roleNames = this.usersRoles;
    axios.put(`/users/${this.id}/roles/${val}?roleName=${val}`)
      .then((response) => {});
  }

  public removeTag(index: number) {
    const val = this.usersRoles[index];
    this.rolesArr.push(val);
    this.usersRoles.splice(index, 1);
    axios.delete(`/users/${this.id}/roles/${val}?roleName=${val}`)
    .then((response) => {});
  }

  closeDialog(){
    this.$emit("listenId",this.id);
  }
  // destroyed(){
  //   this.visibleAssginRole = false;
  // }
}
</script>
<style lang="stylus" scoped>
.search{
  padding-bottom 10px
}
</style>

