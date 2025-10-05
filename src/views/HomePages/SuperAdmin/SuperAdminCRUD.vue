<template>
  <div class="head">
    <h1>增删改查</h1>
    <el-button @click="choose = true" class="type-btn">点击选择账号类型</el-button>
    <div v-if="choose" class="type-land">
      <div class="type-container">
        <div class="type-header">
          <h3>选择账号类型</h3>
          <el-button @click="choose = false" class="close-btn">确认</el-button>
        </div>
        <el-checkbox-group v-model="type" class="type-main">
          <el-checkbox :label="'学生'">学生</el-checkbox>
          <el-checkbox :label="'管理员'">管理员</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div v-for="i in allFeed" :key="i" class="item">
      <h2>昵称：{{ i.nickname || 'N/A'}}</h2>
      <span>用户名：{{ i.username}}</span>
      <hr>
      <span>账号：{{ i.user_id }}</span>
      <br>
      <span>账号类型：{{ i.user_type }}</span>
      <el-button @click="del(i.user_id)" class="del-btn">删除账号</el-button>
      <el-button @click="change(i.user_type)" class="change">切换账号状态</el-button>
    </div>
  </div>
  
</template>

<script setup>
//import()
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/store/global'
const router = useRouter()
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
import axios from "axios";
import { StudentGetPostsApi, updateRatingApi, receiveFeedbackApi, checkingRequestApi } from '@/api/post';
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'
const { proxy } = getCurrentInstance()
const globalStore = useGlobalStore()

const errorMessage=ref('')
const allFeed=ref([])
const choose=ref(false)
const type=ref([])

onMounted(() =>{
  getfeedback()
})

const getfeedback=async () =>{
  try {
    const response = await axios.get('http://127.0.0.1:4523/m1/7120556-6843396-default/api/getusers');
    allFeed.value = response.data.data.list
    console.log(allFeed)
    errorMessage.value = '';
  }catch (err) {
    errorMessage.value = err.response?.data?.message || '网络错误，请稍后再试';
    console.error('获取失败：',err);
  }
}

async function del(userID){
   const sure = confirm(`确认删除账号：${userID}吗？`)
  if (!sure) return

  try{
    const response = await axios.post('http://127.0.0.1:4523/m1/7120556-6843396-default/api/delete/user',
    {user_id : userID});
    // allFeed.value = allFeed.value.filter(u => u.user_id !==userID)
    errorMessage.value=''
    alert('删除成功')
  } catch (err){
    errorMessage.value=err.response?.data?.message || '删除失败'
    console.error('删除失败：',err)
  }
}

async function change(type) {
  const Sure = confirm(`确认改变账号类型：${type}吗？`)
  if (!Sure) return

  try{
    const response = await axios.post('http://127.0.0.1:4523/m1/7120556-6843396-default/api/change/user/type',
      {user_type : type});
      //allFeed.value = allFeed.value.filter(t => t.user_type !==type)
      errorMessage.value=''
      alert('改变成功')
  } catch (err){
    errorMessage.value=err.response?.data?.message || '改变失败'
    console.error('改变失败：',err)
  }
}

</script>
<style scoped>
.item {
  background-color: white;
  border-radius: 8px;
  padding: 22px;
  margin-bottom: 20px;
}
.del-btn {
  color:red;
  font-size: 13px;
  cursor: pointer;
}
.type-land {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.type-main {
  padding: 25px 30px;
  display: flex;
  gap: 30px;
  justify-content: center;
}
.type-main .el-checkbox{
  color: lightblue;
}
.type-container {
  width: 400px;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
}
.type-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: lightblue;
  border-bottom: 1px solid white;
}

</style>
