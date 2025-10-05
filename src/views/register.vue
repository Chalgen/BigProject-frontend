<template scoped>
  <div class="container">
    <div class="register-container">
      <div class="welcome">欢迎注册</div>
      <div class="username">
        <span>用户名：</span><input type="text" v-model="username" id="account-input" :placeholder="'请输入2-12位用户名'">
      </div>
      <div class="nickname">
        <span>昵称：</span><input type="text" v-model="nickname" id="account-input" :placeholder="'请输入2-12位昵称'">
      </div>
      <div class="email">
        <span>邮箱：</span><input type="text" v-model="email" id="email-input" :placeholder="'请输入合法邮箱名称'">
      </div>
      <div class="password">
        <span>密码：</span><input type="password" v-model="password" class="password-input" :placeholder="'密码长度应在7-15位之间'">
      </div>
      <div class="confirm-password">
        <span>确认密码：</span><input type="password" v-model="confirmpassword" class="confirm-password-input"
          :placeholder="'密码长度应在7-15位之间'">
      </div>

      <div class="tryregister-button">
        <button @click="tryRegister()">注册用户</button>
      </div>
      <div class="tryregister-button">
        <button @click="returnLogin()">返回登录</button>
      </div>
    </div>

    <div class="register-message"><!--status 0未注册1注册成功2失败-->
      <div v-if="RegisterStatus === 0" class="waiting-message">
        等待您的注册......
      </div>
      <div v-else-if="RegisterStatus === 1" class="success-message">
        注册成功
        <div class="trylogin">
          <button @click="trylogin()">点击登录</button>
        </div>
      </div>
      <div v-else-if="RegisterStatus === 2" class="not-match-message">
        密码与确认注册密码不一致
      </div>
      <div v-else class="fail-message">
        注册失败
      </div>

      <!---->
      <div v-if="confirmPopup == true" class="logout-popup">
        <div class="logout-popup-box">
          <div class="logout-title">{{ PopupMessage }}</div>
          <div class="logoutbtn-container">
            <button @click="confirmPopup = false"> 确定</button>
          </div>
        </div>
      </div>
    </div>

  </div>


</template>

<script setup>

import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/store/global'
const router = useRouter()
import { ref, onMounted, getCurrentInstance } from 'vue';
//import "./index.css";
import axios from "axios";
import { registerApi } from '@/api/user';
//const { proxy } = getCurrentInstance()
const globalStore = useGlobalStore()

const username = ref();//将account视作结构体名
const password = ref();
const email = ref();
const nickname = ref()
const confirmpassword = ref();

const isLoading = ref(true);
const isLoginSuccess = ref(false);
const userData = ref(null);
const errorMessage = ref('');
const userType = ref("");
const RegisterStatus = ref(0);
const PopupMessage = ref('')
const confirmPopup = ref(false);
const returnLogin = () => {
  router.push('/login')
}
async function tryRegister() {
  if (username.value.length < 2 || username.value.length > 12) {
    PopupMessage.value = "请输入2-12位用户名!";
    confirmPopup.value = true;
    return;
  }
  if (nickname.value.length < 2 || nickname.value.length > 12) {
    PopupMessage.value = "请输入2-12位昵称!";
    confirmPopup.value = true;
    return;
  }
  if (password.value != confirmpassword.value) {
    PopupMessage.value = "两次输入的密码不匹配！";
    confirmPopup.value = true;
    return;
  }
  if (password.value.length > 15 || password.value.length < 7) {
    PopupMessage.value = "密码长度应在7-15位之间！";
    confirmPopup.value = true;
    return;
  }
  const userdata = {
    username: username.value,
    nickname: nickname.value,
    password: password.value,
    email: email.value,
  }
  try {
    const response = await registerApi(userdata);
    const { code, data, msg } = response.data;
    if (code === 200 && msg === 'success') {
      isLoginSuccess.value = true;
      userData.value = data;
      userType.value = data.user.user_type;
      nickname.value = data.user.nickname;

      globalStore.changeUserType(data.user.user_type);
      globalStore.changeNickname(data.user.nickname);
      globalStore.changeProfilePhotoUrl(data.user.photoUrl);
      globalStore.changeEmail(data.user.email)
      globalStore.GetToken(data.token);

      localStorage.setItem('userInfo', JSON.stringify({
        userId: data.user.user_id,
        userType: data.user.user_type,
        nickname: data.user.nickname,
        profilePhotoUrl: data.user.photoUrl,
        token: data.token,
      }));
      trylogin();
    } else {
      errorMessage.value = msg || '注册失败，请重试';
    }
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = '注册失败，请重试';
    }
    console.error('注册请求失败:', error);
  } finally {
    isLoading.value = false;
  }
}

const goToStudentmain = () => {//必须import use router 、const router、const goto=()=>之后才能跳转?
  router.push('/HomePages/Student/StudentHome')
}
function trylogin() {
  goToStudentmain();
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: lightblue;
  padding: 20px;
  font-family: "Microsoft YaHei", sans-serif;
}

.logout-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .logout-popup-box {
    background-color: #fff;
    width: 100%;
    max-width: 170px;
    border-radius: 8px;
    padding: 25px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    position: relative;

    display: flex;
    flex-direction: column;
    justify-items: center;

    .logout-title {
      text-align: center;
      margin-bottom: 20px;
      font-size: 24px;
    }

    .logoutbtn-container {
      display: flex;
      justify-content: space-around;
      gap: 40px;

      .logout-btns {
        width: 80px;
        height: 35px;
        font-size: 14px;
        border-radius: 8px;
      }
    }
  }
}

.register-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 30px 40px;
  width: 100%;
  max-width: 400px;
  margin-bottom: 25px;
}

.welcome {
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin-bottom: 25px;
}

.username,
.password,
.confirm-password,
.email,
.nickname {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.username span,
.password span,
.confirm-password span,
.email span,
.nickname span {
  width: 100px;
  color: #666;
  font-size: 14px;
}

input[type="text"],
input[type="password"],
input[type="ConfirmPassword"] {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 11px 15px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="password"]:focus,
input[type="ConfirmPassword"]:focus {
  border-color: darkblue;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

button {
  width: 100%;
  background-color: darkblue;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 11px 0;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

button:hover {
  background-color: #00008B;
  opacity: 0.9;
}

.tryregister-button button {
  margin-top: 15px;
}

.trylogin button {
  background-color: #409EFF;
  margin-top: 15px;
}

.trylogin button:hover {
  background-color: #66b1ff;
}

.register-message {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 25px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  color: #333;
}

.waiting-message {
  color: #666;
  margin-top: 10px;
}

.success-message {
  color: green;
  margin-top: 10px;
}

.not-match-message,
.fail-message {
  color: red;
  margin-top: 10px;
}
</style>