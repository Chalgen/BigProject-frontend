<script setup>
import { useRouter } from 'vue-router';
    import { useGlobalStore } from '@/store/global'
    const router = useRouter()
    import {ref,onMounted,getCurrentInstance} from 'vue';
    
const goTo=()=>{//必须import use router 、const router、const goto=()=>之后才能跳转
  router.push('/login2')
}
function gotologin2(){
  goTo();
}
</script>

<template scoped>
    
    <div class="oricon">
        欢迎使用学生服务平台
        <br></br>
        制作人：
        <br></br>
        <div>
          <!--<router-link :to="{path:'login2'}" class="btn" title="开始登录" aria-label="开始登录">开始登陆</router-link>-->
          <button @click="gotologin2()">开始登陆</button>
        </div>
        
    </div>
</template>

<style scoped>
.oricon{
  display:flex;
  align-items:center;
  justify-content:center;
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}
.button {
  display:flex;
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  /*cursor: pointer;*/
  text-decoration: none; /* 去除链接默认下划线 */
}
</style>