<script setup>
import { useRouter } from 'vue-router';
    import { useGlobalStore } from '@/store/global'
    const router = useRouter()
    import {ref,onMounted,getCurrentInstance} from 'vue';
</script>

<template scoped>
    
    <div class="oricon" style="font-family: kaiti;">
      <div class="card">
        <div style="font-size: 40px;text-align: center;margin-bottom: 30px;">欢迎使用学生服务平台</div>
        <br></br>
        <div style="margin-top: 2cm;">
          <!--<button @click="gotologin2()">开始登陆</button>-->
          <router-link :to="{path:'login'}" class="btn" title="开始登录" aria-label="开始登录">开始登陆</router-link>
          
        </div>
      </div>
    </div>
</template>

<style scoped>
.oricon{
  display:flex;
  height: 100%;
  width: 100%;
  background-image: url("/zheyi.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    object-fit: cover; /* 覆盖容器，可能裁剪边缘但保持比例 */
    object-position: center;
}
.btn {
  display:flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: lightgreen;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  text-decoration: none; 
  transition: all 0.3s ease;
}
.btn:hover{
  background-color: green;
}
.card{
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width:350px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(151, 10, 10, 0.1)
}
</style>