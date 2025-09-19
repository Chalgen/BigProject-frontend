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
    <div class="post-settings">
      <button class="IsAnonbutton" @click="CheckAnon()">{{ IsAnon?"匿名":"实名" }}</button>
      <button class="IsUrgentbutton" @click="CheckUrgent()">{{ IsUrgent?"紧急":"不紧急" }}</button>
      <button class="select-tag" @click="post()">点击选择标签</button>
    </div>
    <div class="post-div">
      <button class="postbutton" @click="post()">发帖</button>
    </div>
    <div class="tag-selector" v-if="isSelectorOpen":class="{'slide-down': isSelectorOpen}">
      <div class="tag-list">
        <div 
          v-for="tag in filteredTags" 
          :key="tag.id"
          class="tag-item"
          :class="{'selected':tag.id===selectedTagId}"
          @click="selectTag(tag)"
        >
          {{ tag.name }}
        </div>
      </div>
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
const IsAnon=ref(false);
const IsUrgent=ref(false);

function CheckAnon(){
  if(IsAnon.value==false){
    IsAnon.value=true;
  }else{
    IsAnon.value=false;
  }
}
function CheckUrgent(){
  if(IsUrgent.value==false){
    IsUrgent.value=true;
  }else{
    IsUrgent.value=false;
  }
}

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
/*ai生成，最后会人力写orz */
.container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-weight: 600;
  font-size: 1.8rem;
  text-align: center;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
}

.posttitle {
  width: 100%;
  padding: 0.9rem 1.2rem;
  margin-bottom: 1.2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.posttitle:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

.postcontent {
  width: 100%;
  padding: 1.2rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  min-height: 600px;
  resize: vertical;
  font-size: 1rem;
  line-height: 1.6;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.postcontent:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

.postdiv {
  text-align: right;
}

.postbutton {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.postbutton:hover {
  background-color: #359e75;
  transform: translateY(-2px);
}

.postbutton:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .container {
    margin: 1rem;
    padding: 1.5rem;
  }
  
  h1 {
    font-size: 1.5rem;
  }
  
  .postbutton {
    width: 100%;
    padding: 0.9rem;
  }
}
</style>
