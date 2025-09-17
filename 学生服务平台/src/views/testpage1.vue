<!--
<script setup>
    const jumptestpage=()=>{//必须import use router 、const router、const goto=()=>之后才能跳转
        router.push('/testpage')
        
    }
</script>

<template scoped>
    <h1>测试页</h1>
    <div class="container">
        <p v-for="i in 100" :key="i">
            示例内容 {{ i }} - 滚动查看更多...
        </p>
        <button class="testbutton" @click="jumptestpage()">

        </button>
    </div>
</template>

<style scoped>
.container{
    width:100%;
    height:100%;
    color:chartreuse;
}
.testbutton{
    bottom: 20px;
    /* 距离右侧20px */
    right: 20px;
}
</style>

-->
<template>
  <div class="api-test">
    测试页
    <h3>接口数据接收结果</h3>
    
    <!-- 加载中状态 -->
    <p v-if="loading" style="color: #666;">正在请求接口...</p>
    
    <!-- 错误提示（网络错误/接口异常） -->
    <p v-else-if="error" style="color: red;">
      请求失败：{{ error }}
    </p>
    
    <!-- 成功接收数据，渲染到页面 -->
    <div v-else class="data-container">
      <p>接口状态码（code）：{{ apiData.code }}</p>
      <p>接口消息（msg）：{{ apiData.msg }}</p>
      <p>用户 ID（user_id）：{{ apiData.data.user_id }}</p>
      <p>用户类型（user_type）：{{ apiData.data.user_type }}</p>
    </div>
  </div>
</template>

<script setup>
// 1. 导入依赖：Vue 响应式变量、生命周期 + Axios
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'

// 2. 定义响应式变量：存储接口数据、加载状态、错误信息
const apiData = ref(null);    // 存储接口返回的完整数据
const loading = ref(false);   // 标记是否正在请求
const error = ref('');        // 存储错误信息

// 3. 定义请求函数（async 函数处理异步请求）
const fetchApiData = async () => {
  // 开始请求：更新加载状态，清空之前的错误
  loading.value = true;
  error.value = '';

  try {
    // 核心：用 axios.get() 请求目标 URL
    const response = await axios.get(
      'http://127.0.0.1:4523/m2/7073744-6794634-default/348219496'
    );

    // 成功：响应数据在 response.data 中（Axios 自动解析 JSON）
    console.log('接口返回完整数据：', response.data); // 控制台打印，方便调试
    apiData.value = response.data; // 将数据存入响应式变量，供模板渲染

  } catch (err) {
    // 失败：捕获网络错误或接口异常（如 404、500）
    error.value = err.message || '未知错误'; // 提取错误信息
    console.error('请求失败详情：', err); // 控制台打印错误详情，便于排查

  } finally {
    // 结束请求：无论成功/失败，都关闭加载状态
    loading.value = false;
  }
};

// 4. 组件挂载后自动发起请求（页面加载时就获取数据）
onMounted(() => {
  fetchApiData();
});
</script>

<style scoped>
.api-test {
width:90%;
height:90%;

  /*padding: 20px;
  max-width: 600px;
  margin: 20px auto;
  border: 1px solid #e21313;
  border-radius: 8px;
  background-color: blue;*/

  height:100%;
  display: flex;
  /*width:100%;*/
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto
}
.data-container {
  margin-top: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 4px;
}
.data-container p {
  margin: 8px 0;
}
</style>


