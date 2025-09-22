<template scoped>
  <div class="container">
    <h1>反馈校园事务</h1>
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
      <button class="IsAnonbutton" @click="CheckAnon()">{{ IsAnon?"是否匿名：匿名":"是否匿名：实名" }}</button>
      <button class="IsUrgentbutton" @click="CheckUrgent()">{{ IsUrgent?"是否紧急：紧急":"是否紧急：不紧急" }}</button>
      <button class="select-tag" @click="showModal = true">点击选择标签</button>
    </div>
    <div class="post-div">
      <button class="postbutton" @click="post()">发帖</button>
    </div>


    <div v-if="showModal" class="modal">
      <div class="modal-box">
        <h4>选择标签<button @click="showModal = false"></button></h4>
        <!-- 标签列表：点击切换选择 -->
        <div class="tag-list">
          <button 
            v-for="t in allTags" 
            :key="t"
            :disabled="selected.length>=1 && !selected.includes(t)"
            @click="toggleTag(t)"
            :class="{active:selected.includes(t) }"
          >
            {{ t }}
          </button>
        </div>
        <button @click="showModal = false" class="confirm-btn">确定</button>
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
const user_id=global.userId;

function post(){
  const postingdata={
    content : {
      title:title.value,
      text:content.value,
      tags:selected.value,
      anonymity:IsAnon.value,
      Urgent:IsUrgent.value,
    },
    user_id : user_id,
    test_selected_lenth: selected.lenth
  }
  axios.post('http://127.0.0.1:4523/m1/7074224-6795300-default/api/student/post',postingdata)
}

const showModal = ref(false) // 控制弹窗显示
const allTags = ref(['宿舍设施报修', '教学设施报修', '公共设施报修', '校园网服务', '食堂餐饮问题',"校园环境问题","校园安全问题","意见与建议","其他"]) // 所有可选标签
const selected = ref([]) // 已选标签

// 切换标签选择：点击标签添加/移除
const toggleTag = (tag) => {
  const idx = selected.value.indexOf(tag)
  
  idx > -1 ? selected.value.splice(idx, 1) : selected.value.push(tag)
}





</script>

<style scoped>
/*部分ai生成，最后会人力写orz */
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

.post-settings{
  display: flex;
  flex-direction: row;
  gap: 30px;
}

.IsAnonbutton,.IsUrgentbutton,.select-tag {
  background-color:green;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.3s ease;
}
.postbutton {
  display: flex;
  flex-direction: row;
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.9rem 13rem;
  border-radius: 10px;
  font-size: 2rem;
  font-weight: 700;
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-box {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
}
.modal-box h4 { margin: 0 0 15px; display: flex; justify-content: space-between; align-items: center; }
.modal-box button { border: none; cursor: pointer; }

/* 标签按钮样式 */
.tag-list { gap: 8px; display: flex; flex-wrap: wrap; margin-bottom: 15px; }
.tag-list button {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
}
.tag-list button.active {
  background: #2563eb;
  color: #fff;
  border-color: #2563eb;
}

.confirm-btn {
  width: 100%;
  padding: 8px;
  background: #2563eb;
  color: #fff;
  border-radius: 4px;
}
</style>
