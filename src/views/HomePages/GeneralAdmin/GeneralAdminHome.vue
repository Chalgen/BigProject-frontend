<template scoped>
  <div class="container">
    <div class="title">
      <h1>学生服务平台[普通管理员]</h1>

      <div class="user-message">
        <el-avator :src="globalStore.profilePhotoUrl"></el-avator>
        <img :src="globalStore.profilePhotoUrl" class="profile-photo">
        <h2>{{ globalStore.nickname }}</h2>
      </div>
    </div>

    <div class="navigate">
      <RouterLink :to="{ name: 'GeneralAdminView' }" class="navigate-btn">浏览所有反馈</RouterLink>
      <RouterLink :to="{ name: 'GeneralAdminCheck' }" class="navigate-btn">我处理的反馈</RouterLink>
      <RouterLink :to="{ name: 'GeneralAdminModify' }" class="navigate-btn">修改个人信息</RouterLink>
    </div>

    <div class="main-content">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/store/global'
const router = useRouter()
import { ref, onMounted, getCurrentInstance } from 'vue';
import axios from "axios";
const { proxy } = getCurrentInstance()
const globalStore = useGlobalStore()
//import()
</script>

<style scoped>
.container {
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #e9eff8;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  .title {

    display: flex;
    flex-direction: row;
    justify-items: right;
    justify-content: center;
    text-align: center;
    background-color: #0066CC;
    color: white;
    z-index: 200;

    .user-message {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 1.5rem;
      right: 2rem;
      color: white;
      gap: 5px;

      .profile-photo {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: #42b983;
        display: inline-block;
      }
    }

  }
}







.navigate {
  width: 220px;
  background-color: white;
  padding: 2rem 1rem;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  border-right: 2px solid #e5e7eb;
  height: calc(100vh - 85px);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.navigate-btn {
  text-decoration: none;
  color: #333;
  padding: 0.8rem 1rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.navigate-btn:hover {
  background-color: #e6f7f0;
  color: #1890ff;
}

.navigate-btn.router-link-exact-active {
  background-color: #e6f7f0;
  color: #1890ff;
  border-left: 3px solid #1890ff;
}

.navigate-btn::before {
  content: '';
  width: 18px;
  height: 18px;
  opacity: 0.7;
}





.navigate-btn:nth-child(1)::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' width='25' height='25'%3E%3Cpath d='M573.784 727.927c0-34.005-27.566-61.571-61.571-61.571-34.005 0-61.571 27.566-61.571 61.571v92.356h123.142v-92.356z m61.572 153.927H389.071V727.927c0-68.01 55.133-123.142 123.142-123.142 68.01 0 123.143 55.132 123.143 123.142v153.927z' fill='%233B72FF'/%3E%3Cpath d='M696.927 820.282v61.571H327.5v-61.571h369.427z m61.571-61.571V501.874a61.638 61.638 0 0 0-18.038-43.563L512.213 230.065 283.967 458.311a61.634 61.634 0 0 0-18.038 43.563v256.837c0 34.004 27.566 61.571 61.571 61.571v61.571l-6.344-0.15c-62.961-3.195-113.454-53.688-116.648-116.649l-0.151-6.343V501.874a123.177 123.177 0 0 1 31.868-82.676l4.209-4.419L512.213 143l271.779 271.779a123.196 123.196 0 0 1 36.077 87.095v256.837c0 65.882-51.737 119.69-116.799 122.992l-6.343 0.15v-61.571c34.005 0 61.571-27.567 61.571-61.571z' fill='%23000000'/%3E%3Cpath d='M492.789 149.913c12.092-9.862 29.917-9.167 41.188 2.104l369.427 369.427c12.022 12.022 12.022 31.51 0 43.532-12.023 12.023-31.511 12.023-43.533 0L512.21 217.316l-347.66 347.66c-12.023 12.023-31.511 12.023-43.533 0-12.023-12.022-12.023-31.51 0-43.532l369.427-369.427 2.345-2.104z' fill='%23000000'/%3E%3C/svg%3E");
}

.navigate-btn:nth-child(3)::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E");
}

.navigate-btn:nth-child(2)::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'%3E%3C/path%3E%3Cpolyline points='16 17 21 12 16 7'%3E%3C/polyline%3E%3Cline x1='21' y1='12' x2='9' y2='12'%3E%3C/line%3E%3C/svg%3E");
}

.main-content {
  flex: 1;
  margin-left: 220px;
  padding: 2rem;
  position: absolute;
  top: 85px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
}

.main-content>>>.view-container {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  min-height: calc(100% - 4rem);
}

@media (max-width: 768px) {
  .navigate {
    width: 100%;
    height: auto;
    flex-direction: row;
    padding: 1rem;
  }

  .main-content {
    margin-left: 0;
    top: 150px;
  }
}
</style>