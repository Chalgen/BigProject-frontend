<template scoped>
  普通管理员修改个人信息页
  <h1>修改个人信息</h1>
  <div class="container">
    <div class="rename">
      <span>修改昵称：</span><input type="text" v-model="rename" id="account-input">
    </div>
    <div class="repassword">
      <span>修改密码：</span><input type="password" v-model="password" class="password-input">
      <br></br>
      <span>确认密码：</span><input type="password" v-model="confirmpassword" class="confirm-password-input">
    </div>
    <div class="rehead">
      <span>修改头像：</span>
    </div>
  </div>
</template>

<script setup>
//import()
import { useRouter } from 'vue-router';
    import { useGlobalStore } from '@/store/global'
    const router = useRouter()
    import { ref, onMounted, getCurrentInstance } from 'vue';
    import axios from "axios";
    const { proxy } = getCurrentInstance()
    const globalStore = useGlobalStore()
</script>
<stlye scoped>
  
</stlye>