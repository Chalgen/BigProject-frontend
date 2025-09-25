<script setup>
import { useRouter } from 'vue-router';
    import { useGlobalStore } from '@/store/global'
    const router = useRouter()
    import {ref,onMounted,getCurrentInstance} from 'vue';
</script>

<template scoped>
    
    <div class="oricon" style="font-family: kaiti;">
        <div style="font-size: 50px;">欢迎使用学生服务平台</div>
        <br></br>
        <br></br>
        <div style="margin-top: 6cm;">
          <!--<button @click="gotologin2()">开始登陆</button>-->
          <router-link :to="{path:'login'}" class="btn" title="开始登录" aria-label="开始登录">开始登陆</router-link>
          
        </div>
        
    </div>
</template>

<style scoped>
.oricon{
  display:flex;
  height: 100%;
  width: 100%;
  background-color: aqua;
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
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  /*cursor: pointer;*/
  text-decoration: none; 
}
</style>