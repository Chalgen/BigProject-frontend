
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
const selected = ref([])
const activeTag = ref('');
//const posts=ref([])
const posts=ref("")

const isLoading = ref(true);
const isLoginSuccess = ref(false);
const userData = ref(null);
const errorMessage = ref('');
/*{data:{
{id:2,text:"测试内容1,title:"测试标题1",tag:"宿舍设施报修"}
{id:2,text:"测试内容2,title:"测试标题2",tag:"宿舍设施报修"}
{id:2,text:"测试内容3,title:"测试标题3",tag:"宿舍设施报修"}
{id:2,text:"测试内容4,title:"测试标题4",tag:"教学设施报修"}
{id:2,text:"测试内容5,title:"测试标题5",tag:"宿舍设施报修"}
{id:2,text:"测试内容6,title:"测试标题6",tag:"公共设施报修"}
{id:2,text:"测试内容7,title:"测试标题7",tag:"公共设施报修"}
}} 

{
  "code": 200,
  "message": "获取帖子列表（分页）成功",
  "data": {
    "pagination": {       // 分页元信息（核心，前端用于渲染分页控件）
      "total": 128,       // 数据库中帖子总条数
      "page": 1,          // 当前请求的页码
      "pageSize": 10,     // 当前请求的每页条数
      "totalPages": 13    // 总页数（total / pageSize 向上取整）
    },
    "posts": [            // 当前页的帖子列表（与基础格式一致）
      {
        "id": 1,
        "title": "前端Axios请求后端的最佳实践",
        "text": "在实际项目中，Axios.get()需要注意请求头、超时设置...",
        "author": {
          "userId": 101,
          "username": "前端开发君",
        },
        "tag": "公共设施报修",
      },
      {
        "id":2,"text":"测试内容7,"title":"测试标题7","tag":"公共设施报修"
      },
      {
        "id":3,"text":"测试内容8,"title":"测试标题8","tag":"宿舍设施报修"
      },
      {
        "id":4,"text":"测试内容9,"title":"测试标题9","tag":"公共设施报修"
      },
    ]
  }
}*/
const fetchPosts = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:4523/m1/7131475-6854516-default/api/posts',
    {params: {
      id:globalStore.userId
    }});
    posts.value = response.data.data || response.data;
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

const toggleTag = (tag) => {
  const idx = selected.value.indexOf(tag) 
  idx>-1 ? selected.value.splice(idx, 1) : selected.value.push(tag)
}

const filteredItems = computed(() => {
  if (activeTag.value === '') {
    return posts.value;
  }
  return posts.value.filter(item => item.tag.includes(activeTag.value));
});
</script>

<style scoped>

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