
<template scoped>
  <div class="container">
    <h1>我解决的反馈</h1>
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
        <h2>{{ item.title }}</h2>
        <h6>{{ item.tag }} {{ item.isSolved?"已解决":"未解决" }}</h6><!--后续可以通过整个页面可视化信息显示解决状态-->
        <button @click="openContent(item.id)">进入反馈详情</button>

      </div>
    </div>
    <div v-if="openModal==true" class="content-container">
      <div class="title-popup">
        <h1>{{ showPost.title }}</h1>
        <h6>{{ item.tag }} {{ item.isSolved?"已解决":"未解决" }}</h6><!--后续可以通过整个页面可视化信息显示解决状态-->
      </div>
      <div class="content-popup">
        {{ showPost.content }}
      </div>
      <div class="close-popup">
        <button @click="openModal=false">关闭反馈</button>
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

const openModal = ref(false)
const showModal = ref(false)

const allTags = ref(['宿舍设施报修', '教学设施报修', '公共设施报修', '校园网服务', '食堂餐饮问题',"校园环境问题","校园安全问题","意见与建议","其他"])
const noTags = ref('');
const selected = ref([])
const activeTag = ref('');

const posts=ref([])
const isChooseAll=ref(false);
const showPost = ref({ title: '', content: '' })

const isLoading = ref(true);
const isLoginSuccess = ref(false);
const userData = ref(null);
const errorMessage = ref('');

const fetchPosts = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:4523/m1/7131475-6854516-default/api/posts?apifoxApiId=354486410'/*,
    {params: {//获取所有帖子
      admin_id:globalStore.userId
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
  return posts.value.filter(item=>selected.value.includes(item.tag));
});
const showpost = computed(() => {
  return posts.value.filter(item=>selected.value.includes(item.tag));
});
function openContent(postid){
  showPost.value=posts.value.find(item=>item.id==postid);
  openModal.value=true;
}
</script>

<style scoped>
/*部分ai生成，最后会人力写orz */
/* 全局样式重置与基础设置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Microsoft YaHei", Arial, sans-serif;
}

body {
  background-color: #f5f7fa;
  color: #333;
  line-height: 1.6;
}

/* 容器样式：居中布局 + 间距控制 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}

/* 标题样式：突出主题 + 底部分隔 */
.container h1 {
  font-size: 24px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eaecef;
}

/* 标签选择按钮区域样式 */
.post-settings {
  margin-bottom: 25px;
}

.select-tag {
  padding: 8px 16px;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.select-tag:hover {
  background-color: #359469;
}

/* 模态框样式：遮罩层 + 居中弹窗 */
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
  background-color: #fff;
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
}

/* 模态框标题样式 */
.modal-box h4 {
  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 模态框关闭按钮（默认按钮美化） */
.modal-box h4 button {
  background: transparent;
  border: none;
  font-size: 20px;
  color: #999;
  cursor: pointer;
  padding: 5px;
  transition: color 0.3s ease;
}

.modal-box h4 button:hover {
  color: #333;
}

/* 标签列表样式：流式布局 + 间距控制 */
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 25px;
}

/* 标签按钮样式：未选中/选中状态区分 */
.tag-list button {
  padding: 6px 14px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background-color: #fff;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* 选中的标签样式 */
.tag-list button.active {
  background-color: #42b983;
  color: #fff;
  border-color: #42b983;
}

.tag-list button:hover:not(.active) {
  border-color: #42b983;
  color: #42b983;
}

/* 模态框确定按钮样式 */
.confirm-btn {
  width: 100%;
  padding: 10px 0;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.confirm-btn:hover {
  background-color: #359469;
}

/* 反馈列表容器样式 */
.items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

/* 单个反馈卡片样式 */
.item {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;
}

.item:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

/* 反馈标题样式 */
.item h3 {
  font-size: 16px;
  color: #2c3e50;
  margin-bottom: 15px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 反馈详情按钮样式 */
.item button {
  padding: 6px 12px;
  background-color: transparent;
  border: 1px solid #42b983;
  color: #42b983;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.item button:hover {
  background-color: #42b983;
  color: #fff;
}

.content-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  max-width: 600px;
  background: white;
  border-radius: 12px;
  padding: 24px;
  z-index: 1000; /* 确保在最上层 */

  border: 4px solid black;
  border-radius: 8px;
  padding: 16px;

  /* 实现垂直排列 */
  display: flex;
  flex-direction: column;
  gap: 16px; /* 各部分之间的间距 */
}

/* 标题样式 */
.title-popup {
  font-size: 1.5rem;
  font-weight: 600;
  color:black;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
}

/* 内容区域样式 */
.content-popup {
  font-size: 1rem;
  line-height: 1.6;
  color:black;
  flex: 1; /* 占满剩余空间 */
  overflow-y: auto; /* 内容过长时可滚动 */
  max-height: 40vh; /* 限制最大高度 */
}

/* 关闭按钮区域 */
.close-popup {
  display: flex;
  justify-content: flex-end; /* 按钮靠右 */
  padding-top: 12px;
  border-top: 1px solid #eee;
}

/* 按钮样式 */
.close-popup button {
  padding: 8px 16px;
  background: #3498db;
  color: black;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.close-popup button:hover {
  background: #2980b9;
}

/* 可以添加一个半透明背景遮罩 */
.content-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color:aliceblue;
  border: 4px black;
  z-index: -1; /* 放在弹窗后面 */
}

/* 加载状态与空数据提示样式（补充场景） */
.loading, .empty-tip {
  text-align: center;
  padding: 50px 0;
  color: #999;
  font-size: 14px;
}

/* 响应式适配：小屏幕调整布局 */
@media (max-width: 768px) {
  .items {
    grid-template-columns: 1fr;
  }

  .modal-box {
    max-width: 90%;
    padding: 20px;
  }

  .container {
    padding: 20px 15px;
  }

  .container h1 {
    font-size: 22px;
    margin-bottom: 25px;
  }
}
</style>
