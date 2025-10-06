<template>
  <div class="head">
    <h1>增删改查</h1>
    <!-- v-model：数据和页面元素双向绑定，同步变化 -->
    <el-input v-model="keyword" placeholder="输入关键词查询（用户名）"/>
    <el-button @click="getUserList">查询</el-button>
     <el-input v-model="KeyWord" placeholder="输入关键词查询（昵称）"/>  
     <el-button @click="GetUserList">查询</el-button>
     <br>
    <el-button @click="CHoose = true" class="type-btn">点击选择账号类型</el-button>
    <div v-if="CHoose" class="type-land">
      <div class="type-container">
        <div class="type-header">
          <h3>选择账号类型</h3>
          <el-button @click="CHoose = false;MakeSure(TYpe)" class="close-btn">确认</el-button>
        </div>
        <el-checkbox-group v-model="TYpe" class="type-main">
          <!-- 选中的“学生/管理员”会存到TYpe数组里;
           :label 给复选框绑定选中后实际提交/存储的值，解决了“复选框显示的文字”和“选中后实际用的值”可能不一样的问题-->
          <el-checkbox :label="'学生'">学生</el-checkbox>
          <el-checkbox :label="'管理员'">管理员</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <!-- :key 防止渲染出错;i就代表当前循环到的 “单个用户”（比如循环到第一个用户，i就是第一个用户的所有数据;循环到第二个，i就是第二个的);i.后面的表示i的一个关键属性 -->
    <div v-for="i in allFeed" :key="i" class="item">
      <h2>昵称：{{ i.nickname || 'N/A'}}</h2>
      <span>用户名：{{ i.username}}</span>
      <hr>
      <span>账号：{{ i.user_id }}</span>
      <br>
      <span>账号类型：{{ i.user_type }}</span>
      <!-- 点击触发函数DEL（传入参数i.user_id,即当前用户ID） -->
      <el-button @click="DEL(i.user_id)" class="del-btn">删除账号</el-button>

      <el-button @click="ChangeType(i.user_type)" class="change">切换账号状态</el-button>
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
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const { proxy } = getCurrentInstance()
const globalStore = useGlobalStore()

//存所有接口请求（获取/删除/修改/选择用户数据）的错误信息，请求失败时赋值具体错误提示，请求成功时清空为默认空字符串
const errorMessage=ref('')
//存所有用户数据的数组，接口请求到数据后，给allFeed.value = 新数据，页面的用户列表会自动更新
const allFeed=ref([])
//存“账号类型选择弹窗”的显示状态，初始为false（隐藏弹窗），点击“点击选择账号类型”按钮时设为true，即显示弹窗
const CHoose=ref(false)
//存账号类型复选框的选中值，选中的“学生/管理员”会存入该数组，最终作为参数提交到“选择账号类型”接口
const TYpe=ref([])
//存“用户名查询”输入框的内容，通过v-model与输入框双向绑定，点击“查询”按钮时，作为usernameKeyword参数传给用户列表接口
const keyword=ref('')
//存“昵称查询”输入框的内容，通过v-model与输入框双向绑定，点击“查询”按钮时，作为nicknameKeyword参数传给用户列表接口
const KeyWord=ref('')

// onMounted:初始加载接口的“钩子”，只执行一次，也只用有一个，到组件挂载完成自动执行 
onMounted(() =>{
  getFeedback()
})

const getFeedback=async () =>{
  // try代码块包裹可能出错的HTTP请求，后续用catch处理错误
  try {
     // 发送请求，“获取所有用户”接口，await等待请求完成，结果存入response
    const response = await axios.get('http://127.0.0.1:4523/m1/7120556-6843396-default/api/getusers');
    // 将接口返回的用户数据（response.data.data.list）赋值给allFeed，页面自动刷新
    allFeed.value = response.data.data.list
    // 调试打印，用于开发时查看数据结构是否正确 
    console.log(allFeed)
    // 清空错误信息，避免残留之前的错误提示
    errorMessage.value = '';
    // catch捕获try中HTTP请求的错误，err为错误对象
  }catch (err) {
    errorMessage.value = err.response?.data?.message || '网络错误，请稍后再试';
    console.error('获取失败：',err);
  }
}

async function getUserList() {
  try{
    const response = await axios.get(
      'http://127.0.0.1:4523/m1/7120556-6843396-default/api/manage/user/list', 
      {
        params: {
          page: 1,
          size: 10,
          usernameKeyword: keyword.value,
        }
      }
    );
    allFeed.value = response.data.data.list;
    errorMessage.value = '';
  } catch (err) {
    errorMessage.value = err.response?.data?.message || '获取账号失败，请重试';
    console.error('请求失败：', err);
  }
}

async function GetUserList() {
  try{
    const response = await axios.get(
      'http://127.0.0.1:4523/m1/7120556-6843396-default/api/manage/user/list', 
      {
        params: {
          page: 1,
          size: 10,
          nicknameKeyword: KeyWord.value,
        }
      }
    );
    allFeed.value = response.data.data.list;
    errorMessage.value = '';
  } catch (err) {
    errorMessage.value = err.response?.data?.message || '获取账号失败，请重试';
    console.error('请求失败：', err);
  }
}

async function DEL(userID){
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

async function ChangeType(typekind) {
  const Sure = confirm(`确认改变账号类型：${typekind}吗？`)
  if (!Sure) return

  try{
    const response = await axios.post('http://127.0.0.1:4523/m1/7120556-6843396-default/api/change/user/type',
      {user_type : typekind});
      //allFeed.value = allFeed.value.filter(t => t.user_type !==type)
      errorMessage.value=''
      alert('改变成功')
  } catch (err){
    errorMessage.value=err.response?.data?.message || '改变失败'
    console.error('改变失败：',err)
  }
}

async function MakeSure(selectedType) {
  if (!selectedType || selectedType.length === 0){
    ElMessage.warning('请先选择账号类型');
    return;
  }

  const OK =confirm(`确认选择账号类型：${selectedType}吗？`)
  if (!OK) return

  try{
    const response = await axios.post('http://127.0.0.1:4523/m1/7120556-6843396-default/api/choose/type',
      {user_type : selectedType});
      errorMessage.value=''
      alert('选择成功')
  } catch (err){
    errorMessage.value=err.response?.data?.message || '选择失败'
    console.error('选择失败：',err)
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
