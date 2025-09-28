<template scoped>
  <div class="container">
    <h1>修改个人信息</h1>
    <div class="show-name"><h3>{{ globalStore.nickname }}:</h3></div>
    <div class="rename">
      <span>修改昵称：</span><input type="text" v-model="rename" id="account-input">
    </div>
    <div class="repassword">
      <span>修改密码：</span><input type="password" v-model="password" class="password-input">
      <br></br>
      <span>确认密码：</span><input type="password" v-model="confirmpassword" class="confirm-password-input">
    </div>
    <div class="check-profilePhoto">
      <div class="photo-container"><!--"" -->
        <img
        :src="globalStore.profilePhotoUrl"
        class="profile-photo">
      </div>
      <span>修改头像：</span>
      <div class="photo-poster">
        <span class="photo-text">此处上传头像</span>
        <input type="file" accept="image/*" @change="sender" class="post-input"></input>
        <!--<button @click="uploadPhoto":disabled="!selected"></button>-->
      </div>
    </div>
    <div class="logout-container">
      <button @click="isLogout=true " class="log-out">登出</button>
    </div>
    <div v-if="isLogout==true" class="logout-popup">
      <div class="logout-popup-box">
        <div class="logout-title">确认登出</div>
        <div class="logoutbtn-container">
          <button @click="isLogout=false" class="logout-btns">取消</button>
          <button @click="goToLogin" class="logout-btns">确定</button>
        </div>
      </div>
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
const isLogout=ref(false);

const nickname=ref('')
nickname.value=globalStore.nickname.value;
const profilePhotoUrl=ref('')

    const goToLogin = () => {
        router.push({ name: 'login' })
    }
</script>

<style scoped>

.container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  h1 {
    color: #2c3e50;
    margin-bottom: 1.5rem;
    font-weight: 600;
    font-size: 1.8rem;
    text-align: center;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid #f0f0f0;
  }
  .check-profilePhoto{
    .photo-container {
      margin: 1rem 0;
    }

    .profile-photo {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #eee;
    }
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

    .logout-popup-box{
      background-color: #fff;
      width: 100%;
      max-width: 170px;
      border-radius: 8px;
      padding: 25px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      position: relative;

      display:flex;
      flex-direction: column;
      justify-items: center;

      .logout-title{
        text-align: center;
        margin-bottom: 20px;
        font-size: 24px;
      }
      .logoutbtn-container{
        display: flex;
        justify-content: space-around;
        gap: 40px;

        .logout-btns{
          width:80px;
          height:35px;
          font-size: 14px;
          border-radius: 8px;
        }
      }
    }
  }
}
</style>