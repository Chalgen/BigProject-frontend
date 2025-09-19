
<!--主要需求实现：-->
<!--获取所有自己发的帖子的title、id、（时间？），点击button向后端询问getPostData(id=xxx)，获得详细内容
并跳转详细内容页，展示get出的内容，可以看到content、是否解决等-->
<!--右侧选择栏通过children routerview实现：用户信息、发送反馈、我的反馈（反馈解决记录）=>追加评价-->


<!--其他需求：反馈时间、反馈类别、是否紧急、是否匿名、反馈回复与评价=》还要加一个routerview去展示...-->

<template scoped>
  <div class="container">
    <h2 class="title">学生服务平台[学生端]</h2>

    <div class="navigate">

    <RouterLink :to="{ name: 'StudentModify' }">修改个人信息</RouterLink>
    <RouterLink :to="{ name: 'StudentPost' }">反馈校园事务</RouterLink>
    <RouterLink :to="{ name: 'StudentView' }">查看我的历史反馈</RouterLink>      

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
/*ai生成，最后会人力写orz */
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