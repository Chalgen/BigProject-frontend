<template scoped>
  <div class="container">
    <h1>我处理的反馈</h1>
    <div class="post-settings">
      <button class="select-tag" @click="showModal = true">点击选择标签</button>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-box">
        <h4>选择标签<button @click="showModal = false"></button></h4>
        <!-- 标签列表：点击切换选择 -->
        <div class="tag-list">
          <button v-for="t in allTags" :key="t" @click="toggleTag(t)" :class="{ active: selected.includes(t) }">
            {{ t }}
          </button>
          <button @click="selectall()" :class="{ active: isChooseAll == true }">全选</button>
          <button @click="selectnull()">全不选</button>
        </div>
        <button @click="showModal = false" class="confirm-btn">确定</button>
      </div>
    </div>

    <div class="items">
      <!--<div v-for="item in filteredItems" :key="item.feedback_id" class="item">-->
      <div v-for="item in posts" :key="item.feedback_id" class="item"
        :style="{ color: getColor(item.feedback_status), backgroundColor: getBackgroundColor(item.feedback_status) }">
        <h2>{{ item.title }}</h2>
        <h6>#{{ codeToTagMap[item.feedback_type] }} #{{ codeToStatusMap[item.feedback_status] }}</h6>
        <button @click="openContent(item.feedback_id)">进入反馈详情>>></button>
      </div>
    </div>
  </div>
  <!--查看帖子详情-------------------------------------------------------------------------------------------------------->
  <div v-if="openModal == true" class="content-background">
    <div class="content-container">
      <div class="title-popup">
        <h1>{{ showPost.title }}</h1>
        <h4 class="show-message">#{{ codeToTagMap[showPost.feedback_type] }}&#12288;#{{
          codeToStatusMap[showPost.feedback_status] }}</h4>
        <div v-if="showPost.feedback_status == 1">
          <h5>[处理中]&#12288;by:</h5>
        </div>
        <div v-else-if="showPost.feedback_status == 2">
          <h5>[已处理]&#12288;by:评分:</h5>
        </div>
        <h5 class="feedback-time"> 创建时间：{{ showPost.created_at }}&#12288;&#12288;更新时间:{{ showPost.updated_at }}</h5>
      </div>
      <div class="info-popup">
        <!-- 后续可以通过整个页面可视化信息显示解决状态-->
      </div>
      <div class="content-popup">
        {{ showPost.content }}
      </div>
      <div class="buttons">
        <el-button type="primary" @click="openComment = true">查看评论</el-button>
        <el-button type="primary" @click="viewAttach = true">查看附件</el-button>
        <div v-if="showPost.feedback_status == 1">
          <el-button type="primary" @click="cancelreceive(showPost.feedback_id)">取消接单</el-button>
          <el-button type="primary" @click="changeFeedbackStatus(showPost.feedback_id, 2)">确认完成反馈</el-button>
        </div>

        <!--<el-button type="primary" @click="sentAttach = true">发送附件</el-button>-->
      </div>
      <div class="comment-area">
        <input type="text" v-model="commentContent" placeholder="点击输入评论..." class="comment-text"></input>
        <button @click="sentComment()">发送评论</button>
      </div>
      <div class="close-popup">
        <button @click="openModal = false" class="close-popup-button">关闭反馈</button>
      </div>
    </div>
    <el-dialog title="评论展示" v-model="openComment" :width="'70%'" :z-index='4000' :align-center="true">
      <div>
        <div v-if="showPostComment.length == 0">暂无评论</div>
        <div v-else>
          <div v-for="i in showPostComment">
            {{ i.nickname }}:{{ i.content }}
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="附件展示" v-model="viewAttach" :width="'70%'" :z-index='4000' :align-center="true">
      <div>
        <div v-if="showPostAttach.length == 0">暂无附件</div>
        <div v-else>
          <div v-for="i in showPostAttach">
            <img :src="i.attachPhotoURL" class="profile-photo">
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
  <div v-if="postPopup == true" class="success-background">
    <div class="success-popup">
      <h1>{{ PopupMessage }}</h1>
      <button @click="postPopup = false" class="close-success-popup">确认</button>
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
import { GetPostsApi, checkingRequestApi } from '@/api/post';
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'
const { proxy } = getCurrentInstance()
const globalStore = useGlobalStore()

const openModal = ref(false)
const showModal = ref(false)
const openComment = ref(false)
const viewAttach = ref(false)
const sentAttach = ref(false)

const total = ref(0);
//const posts = ref([]);
const currentPage = ref(1);

const allTags = ref(['宿舍设施报修', '教学设施报修', '公共设施报修', '校园网服务', '食堂餐饮问题', "校园环境问题", "校园安全问题", "意见与建议", "其他"])
const codeToTagMap = {
  //'div': 1,
  1000: "意见与建议",
  1001: "其他",

  2001: "教学设施报修",
  2002: "公共设施报修",

  3000: "校园网服务",
  3001: "食堂餐饮问题",
  3002: "校园环境问题",
  3003: "校园安全问题",
}
const codeToStatusMap = {
  0: "待处理",
  1: "处理中",
  2: "已解决",
  3: "待审核垃圾信息",
  4: "已确认垃圾信息",
}
const getColor = (val) => {
  switch (val) {
    case 0: return '#33CC00'
    case 1: return '#00CCCC'//湖青色
    case 2: return '#0066CC'//天蓝色：更黑一点
    case 3: return '#FF6600'//orange
    case 4: return '#FF3300'//red
  }

}
const getBackgroundColor = (val) => {
  if (val == 1) {
    return '#FFCC00'
  } else {
    return 'white'
  }
}
const selected = ref([])

const rating = ref(5)


const posts = ref([])
const isChooseAll = ref(false);
const showPost = ref({ title: '', content: '' })
const showPostComment = ref([])
const showPostAttach = ref([])
const commentContent = ref('');

const isLoading = ref(true);
const isLoginSuccess = ref(false);
const userData = ref(null);
const errorMessage = ref('');
const confirmPopup = ref(false)
const PopupMessage = ref('')
const postPopup = ref(false)
const nullTMP = ref();
const fetchPosts = async () => {
  try {
    const response = await GetPostsApi(currentPage.value, nullTMP.value, globalStore.userId, nullTMP.value, nullTMP.value);
    posts.value = response.data.data.list, total.value = (response.data.data.totalPages) * 10,
      console.log(total)
    posts.value = response.data.data.list
    console.log(posts)
    errorMessage.value = null;
  } catch (err) {
    errorMessage.value = err.response?.data?.message || '网络错误，请稍后再试';
    console.error('获取帖子失败:', err);
  } finally {
    isLoading.value = false;
  }
}

// 组件挂载时获取帖子
onMounted(() => {
  fetchPosts();
  selectall();
});

const toggleTag = (tag) => {//维护slected{tags}数组
  const idx = selected.value.indexOf(tag)
  if (idx > -1) {
    selected.value.splice(idx, 1)
    isChooseAll.value = false;
  } else {
    selected.value.push(tag)
    if (selected.value === allTags.value) isChooseAll = true;
  }
  console.log(filteredItems)
}
function selectall() {
  selected.value = [...allTags.value];
}
function selectnull() {
  selected.value = ['']
}

const filteredItems = computed(() => {
  return posts.value.filter(item => selected.value.includes(item.tag));
});
/*const filteredItems = computed(() => {
  return posts.value.filter(item => allTags.value.includes(item.tag));
});*/
function openContent(postid) {
  showPost.value = posts.value.find(item => item.feedback_id == postid);
  openModal.value = true;
}

const nulltmp = ref('');
async function cancelreceive() {
  const checkingData = {
    feedback_status: 0,
    admin_reply: {
      content: nulltmp.value,
    }
  }
  try {
    const response = await checkingRequestApi(globalStore.userId, checkingData);
    const { code, data, msg } = response.data;
    if (code == 200 && msg == 'success') {
      postPopup.value = true;
      PopupMessage.value = "成功取消接单!";
    } else {
      postPopup.value = true;
      PopupMessage.value = "取消失败！";
      //errorMessage.value=data.
    }
  } catch (error) {
    postPopup.value = true;
    PopupMessage.value = "未连接到服务器";
  }
}
async function changeFeedbackStatus(id, targetStatus) {
  const checkingData = {
    feedback_status: targetStatus,
    admin_reply: {
      content: nulltmp.value,
    }
  }
  try {
    const response = await checkingRequestApi(id, checkingData);
    const { code, data, msg } = response.data;
    if (code == 200 && msg == 'success') {
      postPopup.value = true;
      PopupMessage.value = "成功完成该反馈!";
    } else {
      postPopup.value = true;
      PopupMessage.value = "更新失败！";
      //errorMessage.value=data.
    }
  } catch (error) {
    postPopup.value = true;
    PopupMessage.value = "未连接到服务器";
  }
}

</script>

<style scoped>
/*部分ai生成，最后会人力写orz */

/* container下的都是手写 */
.container {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  gap: 30px;

  h1 {
    color: #2c3e50;
    margin-bottom: 1.5rem;
    font-weight: 600;
    font-size: 1.8rem;
    text-align: center;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid #f0f0f0;
  }

  .post-settings {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    .select-tag {
      width: 130px;
      height: 40px;
      padding: 8px 16px;
      background-color: #42b983;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  }
}

.success-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .success-popup {
    background-color: #fff;
    width: 100%;
    max-width: 250px;
    border-radius: 8px;
    padding: 25px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    position: relative;

    display: flex;
    flex-direction: column;
    justify-items: center;
  }
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
  /*display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;*/
  display: flex;
  flex-direction: column;
  gap: 16px;
  /*width:800px;*/
}

/* 单个反馈卡片样式 */
.item {
  border: 1px solid #c9c7c7;
  border-radius: 8px;
  padding: 20px;
  transition: box-shadow 0.3s ease;
}

.item:hover {
  box-shadow: 10px 10px 32px rgba(0, 0, 0, 0.3);
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

.content-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .content-container {
    background-color: #fff;
    width: 100%;
    max-width: 1000px;
    height: auto;
    max-height: 90vh;
    border-radius: 8px;
    padding: 25px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    position: relative;
  }
}


.title-popup {
  color: black;
}


.content-popup {
  font-size: 1rem;
  line-height: 1.6;
  color: black;
  flex: 1;
  /* 占满剩余空间 */
  overflow-y: auto;
  max-height: 40vh;
  white-space: pre;
}


.close-popup {
  display: flex;
  justify-content: flex-end;
  /* 按钮靠右 border-top: 1px solid #eee;*/
  padding-top: 12px;

}

/* 按钮样式 background-color: #3498db;transition: background 0.3s;*/
.close-popup-button {
  padding: 8px 16px;

  color: black;
  border: none;
  border-radius: 6px;
  cursor: pointer;

}

.close-popup-button:hover {
  background-color: #2980b9;
}

/* 半透明背景遮罩.content-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color:aliceblue;
  border: 4px black;
  z-index: -1;} /* 放在弹窗后面 */




.loading,
.empty-tip {
  text-align: center;
  padding: 50px 0;
  color: #999;
  font-size: 14px;
}


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




.info-popup {
  margin-bottom: 1.5rem;
}

.info-popup h6 {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
  font-weight: 400;
}


/* 评分区域 */
.rate-popup {
  margin-bottom: 2rem;
  padding: 1rem 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}

/* 评论输入区域 */
.comment-area {
  display: flex;
  gap: 0.8rem;
  /* 输入框与按钮间距 */
  margin-bottom: 2rem;
}

.comment-text {
  flex: 1;
  /* 输入框占满剩余宽度 */
  padding: 0.9rem 1.2rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: border-color 0.2s ease;
}

.comment-text:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.comment-area button {
  padding: 0.9rem 1.8rem;
  background-color: #3b82f6;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.comment-area button:hover {
  background-color: #2563eb;
}

.close-popup {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.close-popup button {
  padding: 0.8rem 1.6rem;
  background-color: #f3f4f6;
  color: #252b36;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-popup button:hover {
  background-color: #e5e7eb;
  transform: translateY(-1px);
}


@media (max-width: 640px) {
  .content-container {
    padding: 1.5rem;
    max-height: 85vh;
  }



  .comment-area {
    flex-direction: column;
  }

  .comment-area button {
    width: 100%;
  }
}
</style>
<style>
.el-message {
  font-size: 40px !important;
  padding: 2rem;
  /* 根据需要调整大小 */
}

/* 单独设置消息内容的大小（如果需要） */
.el-message__content {
  font-size: 40px !important;
}
</style>