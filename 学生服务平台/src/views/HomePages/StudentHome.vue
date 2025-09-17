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
