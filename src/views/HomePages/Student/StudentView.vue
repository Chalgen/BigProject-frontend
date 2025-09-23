
<template scoped>
  <div class="container">
    <h1>我的历史反馈</h1>
    <div class="post-settings">
      <button class="select-tag" @click="showModal = true">点击选择标签</button>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-box">
        <h4>选择标签<button @click="showModal = false"></button></h4>
        <!-- 标签列表：点击切换选择 -->
        <div class="tag-list">
          <button 
            v-for="t in allTags" 
            :key="t"
            @click="toggleTag(t)"
            :class="{active:selected.includes(t) }">
            {{ t }}
          </button>
          <button @click="selectall()" :class="{active:isChooseAll }">全选</button>
        </div>
        <button @click="showModal = false" class="confirm-btn">确定</button>
      </div>
    </div>

    <div class="items">
      <!--<div v-for="post in posts":key="post.id" class="item">
        <h3>{{ post.content }}</h3>
      </div>-->
      <div v-for="item in filteredItems" :key="item.id" class="item">
        <h3>{{ item.title }}</h3>
        <button @click="openContent(item.id)">进入反馈详情</button>
      </div>
    </div>
    
  </div>
</template>

<script setup>
//import()
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/store/global'
const router = useRouter()
import { ref, onMounted, getCurrentInstance,computed } from 'vue';
import axios from "axios";
const { proxy } = getCurrentInstance()
const globalStore = useGlobalStore()

const showModal = ref(false)
const allTags = ref(['宿舍设施报修', '教学设施报修', '公共设施报修', '校园网服务', '食堂餐饮问题',"校园环境问题","校园安全问题","意见与建议","其他"])
const noTags = ref('');
const selected = ref([])
const activeTag = ref('');

const posts=ref([])
const isChooseAll=ref(false);

const isLoading = ref(true);
const isLoginSuccess = ref(false);
const userData = ref(null);
const errorMessage = ref('');

const fetchPosts = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:4523/m1/7131475-6854516-default/api/posts?apifoxApiId=354486410'/*,
    {params: {
      id:globalStore.userId
    }}*/);
    posts.value = response.data.data.post_list
    console.log(posts.value)
    error.value = null;
  } catch (err) {
    error.value = err.response?.data?.message || '网络错误，请稍后再试';
    console.error('获取帖子失败:', err);
  } finally {
    isLoading.value = false;
  }
  console.log(response.value)
};

// 组件挂载时获取帖子
onMounted(() => {
  fetchPosts();
});

const toggleTag = (tag) => {//维护slected{tags}数组
  const idx = selected.value.indexOf(tag) 
  if(idx>-1){
    selected.value.splice(idx, 1)
    isChooseAll=false;
  }else{
    selected.value.push(tag)
    if(selected.value===allTags.value) isChooseAll=true;
  }
  console.log(filteredItems)
}
function selectall(){
  if(!isChooseAll.value){
    selected.value = [...allTags.value];
    isChooseAll,value=true;
  }else{
    selected.value = []
    isChooseAll.value=false;
  }
  //selected.value=allTags.value不行：selected会直接和allTag共享内存地址
  //console.log(selected)
  //axios.post("http://127.0.0.1:8080/api/logintest",allTags)
}

const filteredItems = computed(() => {
  /*if (activeTag.value === '') {
    return posts.value;
  }*/
  
  return posts.value.filter(item=>selected.value.includes(item.tag));
  
});
</script>

<style scoped>
/*部分ai生成，最后会人力写orz */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

h1 {
  color: #2c3e50;
  margin-bottom: 30px;
  font-weight: 600;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.post-settings {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}

.select-tag {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.select-tag:hover {
  background-color: #2980b9;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-box {
  background-color: white;
  padding: 25px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  position: relative;
}

.modal-box h4 {
  margin-top: 0;
  color: #2c3e50;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-box h4 button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #7f8c8d;
  transition: color 0.2s;
}

.modal-box h4 button:hover {
  color: #e74c3c;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
}

.tag-list button {
  padding: 6px 12px;
  border: 1px solid #bdc3c7;
  border-radius: 20px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.tag-list button.active {
  background-color: #3498db;
  color: white;
  border-color: #3498db;
}

.tag-list button:hover:not(.active) {
  border-color: #3498db;
  color: #3498db;
}

.confirm-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  transition: background-color 0.3s ease;
}

.confirm-btn:hover {
  background-color: #2980b9;
}

.items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.item {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.item h3 {
  margin-top: 0;
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
}

/* 加载状态样式 */
.loading {
  text-align: center;
  padding: 50px 0;
  color: #7f8c8d;
}

/* 错误提示样式 */
.error {
  color: #e74c3c;
  padding: 10px;
  background-color: #fadbd8;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .items {
    grid-template-columns: 1fr;
  }
  
  .modal-box {
    width: 95%;
    padding: 15px;
  }
  
  .container {
    padding: 10px;
  }
}
</style>
