<script setup>
import { useRouter } from 'vue-router';
    import { useGlobalStore } from '@/store/global'
    const router = useRouter()
    import {ref,onMounted,getCurrentInstance} from 'vue';
</script>

<template scoped>
    
    <div class="oricon" style="font-family: kaiti;">
    <div class="card">
      <div class="title">欢迎使用学生服务平台</div>
      <router-link :to="{path:'login'}" class="btn" title="开始登录" aria-label="开始登录">开始登陆</router-link>
    </div>
  </div>
</template>

<style scoped>
.oricon {
  display: flex;
  min-height:100%;
  min-width: 100%;
  background-image: url('/zheyi.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
}

.card {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 8px;
  text-align: center;
}

.title {
  font-size: 40px;
  margin-bottom: 30px;
  font-family: "kaiti";
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: lightgreen;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  color: white;
}

.btn:hover {
  background-color: green;
}
</style>