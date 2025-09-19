<!--
<template scoped>
  <div class="container">
    <div class="background-container">
      <img src="/src/assets/pictures/夕.PNG" class="background-img"></img>
    </div>

    <div class="left-postings">
      <p>test2</p>
      <p v-for="i in 30" :key="i">
        示例内容 {{ i }} - 滚动查看更多...
      </p>
    </div>

    <div class="blank1"></div>

    <div class="right-options">
      <button class="testbutton" @click="jumptestpage1()">跳转到测试页1</button>
      <button class="postbutton" @click="jumppostpage()">点击发帖</button>
    </div>

  </div>
  
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router'
import axios from "axios"
const router = useRouter()

const gototestpage1=()=>{//必须import use router 、const router、const goto=()=>之后才能跳转
  router.push('/testpage1')
}
function jumptestpage1(){
  gototestpage1()
}
const gotopostpage=()=>{//必须import use router 、const router、const goto=()=>之后才能跳转
  router.push('/postpage')
}
function jumppostpage(){
  gotopostpage()
}


const isLoading = ref(true);
const isLoginSuccess = ref(false);
const userData = ref(null);
const errorMessage = ref('');
const fetchLoginInfo = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  isLoginSuccess.value = false;
  userData.value = null;

  try {
    // 发送登录请求（实际项目中添加用户名密码等参数）
    const response = await axios.post('http://127.0.0.1:4523/m1/7074224-6795300-default/api/user/login', { });
    // 解析后端返回的数据
    const { code, data, msg } = response.data;
    // 检查msg是否为success
    if (msg === 'success' && code === 200) {
      isLoginSuccess.value = true;
      userData.value = data; // 存储用户信息      
      // 3秒后自动跳转到首页
      setTimeout(() => {router.push('/home');}, 3000);
    }
    else{                                 
      errorMessage.value = msg;
    }


  } catch (error) {
    // 处理请求错误
    if (error.response) {
      errorMessage.value = `请求错误: ${error.response.data?.msg || '服务器异常'}`;
    } else {
      errorMessage.value = '网络错误，无法连接到服务器';
    }
    console.error('登录请求失败:', error);
  } finally {
    isLoading.value = false;
  }
};


</script>

<style scoped>
.container {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;

  padding: 20px;
  .background-container {
  
  display: flex;
  align-items:center;
  justify-content: center;
   
  height:100%;
  width:100%;
  /*
  overflow: hidden;
  overflow-y: auto;
  */
	object-fit: cover;
  object-position: center;
  flex-direction: column;
  position: fixed;

  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  }
  .background-img{
    /* 固定定位确保始终覆盖整个视口 */
    position: absolute;
    top: 0;
    left: 0;
  
  /* 关键属性：确保图片始终覆盖容器且不拉伸 */
    min-width: 100%;
    min-height: 100%;
  
  /* 保持图片比例，居中显示 */
    width: auto;
    height: auto;
    object-fit: cover; /* 覆盖容器，可能裁剪边缘但保持比例 */
    object-position: center; /* 始终显示图片中心区域 */

  }
  .left-postings{

    /*width:500px;
    border:2px solid midnightblue;
    opacity:0.8;
    background-color:azure;
    color:rgb(42, 44, 43);*/

    width: 1000px;
  max-height: 80vh; /* 限制最大高度，超出可滚动 */
  overflow-y: auto; /* 内容超出时显示垂直滚动条 */
  border: 2px solid midnightblue;
  opacity: 0.8;
  background-color: azure;
  color: rgb(42, 44, 43);
  padding: 20px;
  
  /* 核心定位：居中偏左100px */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 先居中 */
  margin-left: -100px; /* 再向左偏移100px */
  }
  /*.blank1{
    width:100px;
  }*/
  .right-options{
    /*width:200px;
    border:2px solid midnightblue;*/
    width: 200px;
  height: 300px; /* 可根据需要调整高度 */
  border: 2px solid midnightblue;
  background-color: rgba(240, 255, 255, 0.8); /* 半透明背景 */
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px; /* 按钮间距 */
  
  /* 核心定位：位于左窗口右侧50px */
  position: absolute;
  top: 50%;
  transform: translateY(-50%); /* 保持与左窗口垂直居中对齐 */
  /* 计算位置：左窗口宽度500px + 间距50px = 550px */
  left: calc(50% - 100px + 500px + 50px);
  }

}




</style>

-->

<template scoped>
  <div class="container">
    <h2 class="title">学生服务平台[学生端]</h2>

    <div class="navigate">
<!--<router-link to="/StudentModify">修改为<router-link to="StudentModify">-->
<!--
  <RouterLink to="StudentHome/StudentModify">修改个人信息</RouterLink>
    <RouterLink to="StudentHome/StudentPost">查看我的历史反馈</RouterLink>
    <RouterLink to="StudentHome/StudentView">查看我的反馈</RouterLink>
<RouterLink to="StudentModify">修改个人信息</RouterLink>
    <RouterLink to="StudentPost">查看我的历史反馈</RouterLink>
    <RouterLink to="StudentView">查看我的反馈</RouterLink>
-->    
    <RouterLink :to="{ name: 'StudentModify' }">修改个人信息</RouterLink>
    <RouterLink :to="{ name: 'StudentPost' }">查看我的历史反馈</RouterLink>
    <RouterLink :to="{ name: 'StudentView' }">查看我的反馈</RouterLink>
    
      

    </div>

    <div class="main-content">
      <!--主要内容-->
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
//import()
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f0f2f5;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: #1a1a1a;
  display: flex;
  flex-direction: column;
}

.title {
  text-align: center;
  padding: 1.5rem 0;
  margin: 0;
  background-color: #2563eb;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: 1.8rem;
  font-weight: 600;
}

.navigate {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 10; /* 确保导航栏在内容上方 */
  flex-wrap: wrap;
}

.navigate router-link {
  text-decoration: none;
  color: #4b5563;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  transition: all 0.25s ease;
  font-weight: 500;
  font-size: 0.95rem;
}

.navigate router-link:hover {
  background-color: #eff6ff;
  color: #1d4ed8;
}

.navigate router-link.router-link-exact-active {
  background-color: #2563eb;
  color: white;
  box-shadow: 0 1px 3px rgba(37, 99, 235, 0.3);
}

.main-content {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 1.5rem auto; /* 顶部留出空间，避免贴近导航栏 */
  padding: 0 1rem;
  box-sizing: border-box;
  border: black 5px;
  background-color: lightblue;
}

/* 为路由视图内容添加样式，增强层次感 */
router-view {
  display: block;
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-height: 400px; /* 确保内容区域有足够高度 */
}

@media (max-width: 768px) {
  .title {
    font-size: 1.5rem;
    padding: 1.2rem 0;
  }
  
  .navigate {
    gap: 0.5rem;
    padding: 0.8rem;
  }
  
  .navigate router-link {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    width: calc(50% - 0.5rem);
    text-align: center;
  }
  
  .main-content {
    margin: 1rem auto;
  }
  
  router-view {
    padding: 1rem;
    min-height: 300px;
  }
}
</style>