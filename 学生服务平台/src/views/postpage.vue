<template scoped>
  <div class="container">
    <h1>这是发帖页</h1>
    <input 
      v-model="title" 
      placeholder="标题" 
      class="posttitle"
    >
    <textarea 
      v-model="content" 
      placeholder="内容...test" 
      class="postcontent"
    ></textarea>
    <div class="postdiv">
      <button class="postbutton" @click="post()">发帖</button>
    </div>
    <div class="returndiv">
      <button class="returnbutton" @click="jumphomepage()">跳转到主页</button>
    </div>
  </div>
</template>

<script setup>
import { useGlobalStore } from '@/store/global'
import { ref,getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router'
import axios from "axios";
const router = useRouter()
const { proxy } = getCurrentInstance()
const global = useGlobalStore()

const gotohomepage=()=>{//必须import use router 、const router、const goto=()=>之后才能跳转
  router.push('/homepage')  
}
function jumphomepage(){
  gotohomepage()
}

const title=ref();
const content=ref();
const user_id=ref();

function post(){
  const postingdata={
    content : {
      title:title.value,
      text:content.value,
    },
    user_id : global.user_id,
  }
  axios.post('http://127.0.0.1:4523/m1/7074224-6795300-default/api/student/post',postingdata)
}






</script>

<style scoped>
.container {
  width:100%;
  height:100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .returnbutton{
    text-align: center;
  
    bottom: 20px;
  /* display: flex; 距离右侧20px */
    right: 20px;
  }
  .postcontent {
    width: 100%;
    height: 300px;
    padding: 15px;
    border: 2px solid #3498db;
    border-radius: 8px;
    font-size: 16px;
    resize: both;
    box-sizing: border-box;
    transition: border-color 0.3s;
  }
}

</style>
