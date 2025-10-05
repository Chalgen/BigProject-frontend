<template scoped>
  <div class="container">
    <div class="title">
      <h2>学生服务平台【超级管理员】</h2>
    </div>
    <div class="navigate">

    <RouterLink :to="{ name: 'SuperAdminCRUD' }">增删改查</RouterLink>
    <RouterLink :to="{ name: 'SuperAdminCheck'}">查看操作历史</RouterLink>
    <RouterLink :to="{ name: 'SuperAdminView'}">浏览所有反馈</RouterLink>
    <RouterLink :to="{ name: 'SuperAdminApply'}">查看申请</RouterLink>
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
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E");
}

.navigate-btn:nth-child(2)::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'%3E%3C/path%3E%3C/svg%3E");
}

.navigate-btn:nth-child(3)::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M1 3h4l3 8 2-6 3 8 2-6 3 8V3h4M5 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z'%3E%3C/path%3E%3C/svg%3E");
}

.navigate-btn:nth-child(4)::before {
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
