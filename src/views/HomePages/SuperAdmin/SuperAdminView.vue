<template scoped>
  <div class="container">
    <h1>所有学生反馈</h1>
    <div class="post-settings">
      <button class="select-tag" @click="showModal = true">点击选择标签</button>
      <div class="searching-container"><input type="text" v-model="keyWord" placeholder="'关键字查询'"></input>
        <el-button @click="KeyWordSearch()" size="large">点击搜索</el-button>
      </div>
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
        <button @click="showModal = false, fetchPosts()" class="confirm-btn">确定</button>
      </div>
    </div>
    <div class="items">
      <!--<div v-for="item in filteredItems" :key="item.feedback_id" class="item">-->
      <div v-for="item in posts" :key="item.feedback_id"
        :style="{ color: getColor(item.feedback_status), backgroundColor: getBackgroundColor(item.feedback_status) }"
        class="item">
        <h2>{{ item.title }}</h2>
        <h6>{{ codeToTagMap[item.feedback_type] }} {{ codeToStatusMap[item.feedback_status] }}</h6>
        <!--{{ item.isSolved ? "已解决" : "未解决" }}后续可以通过整个页面可视化信息显示解决状态-->
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
        <!--<el-button type="primary" @click="receiveFeedback(showPost.feedback_id)">处理反馈</el-button>-->
        <el-button type="primary" @click="isConfirmJunk = true">查看垃圾信息反馈</el-button>
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
        <img :src=testpng class="profile-photo">

        <img :src="'http://47.99.206.67/file/uploads/fb3dd046-0eab-48a0-baaa-b7c51c5d85b2.PNG'" class="profile-photo">
        <img :src="'http://47.99.206.67/file/uploads/fb3dd046-0eab-48a0-baaa-b7c51c5d85b2.PNG'" class="profile-photo">

        <img :src="'http://localhost:5174/api/file/uploads/fb3dd046-0eab-48a0-baaa-b7c51c5d85b2.png'"
          class="profile-photo">
        <div v-if="showPost.image_urls.length == 0">暂无附件</div>
        <div v-else>
          <div v-for="i in showPost.image_urls">
            <button @click="out(i), out(testpng)">显示</button>
            <img :src=i class="profile-photo">
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="处理反馈" v-model="checkFeedback" :width="'70%'" :z-index='4000' :align-center="true"
      class="check-dialog">
      <el-select v-model="value" placeholder="Select" style="width: 240px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <div v-if="value != 0">
        <div class="comment-area">
          <input type="text" v-model="commentContent" placeholder="点击输入详细信息..." class="comment-text"></input>
          <button @click="sentChecking()">发送详情</button>
        </div>
      </div>
    </el-dialog>
  </div>
  <div v-if="isConfirmJunk == true" class="logout-popup">
    <div class="logout-popup-box">
      <div class="logout-title">决定是否为垃圾反馈</div>
      <div class="logoutbtn-container">
        <button @click="confirmJunk(4)" class="logout-btns">是</button>
        <button @click="confirmJunk(0)" class="logout-btns">否</button>
        <button @click="isConfirmJunk = false" class="logout-btns">取消</button>
      </div>
    </div>
  </div>
  <el-pagination v-model:current-page="currentPage" :total="total" background layout="prev, pager, next"
    @current-change="fetchPosts" size="large" />
</template>

<script setup>
const testpng = ref('http://47.99.206.67/file/uploads/fb3dd046-0eab-48a0-baaa-b7c51c5d85b2.PNG');
//import()
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/store/global'
const router = useRouter()
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
import axios from "axios";
import { checkingRequestApi, GetPostsByIdApi, confirmJunkApi, GetPostsApi } from '@/api/post';
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'
const { proxy } = getCurrentInstance()
const globalStore = useGlobalStore()

const isConfirmJunk = ref(false);
const openModal = ref(false)
const showModal = ref(false)
const openComment = ref(false)
const viewAttach = ref(false)
const checkFeedback = ref(false);
const sentAttach = ref(false)

//const currentPage = ref(Number(router.query.page) || 1); // 当前页码
const pageSize = ref(10);   // 每页条数
const total = ref(0);       // 总条数
const posts = ref([]);      // 当前页数据


function out(i) {
  console.log(i);
}

const allTags = ref(['宿舍设施报修', '教学设施报修', '公共设施报修', '校园网服务', '食堂餐饮问题', "校园环境问题", "校园安全问题", "意见与建议", "其他"])
onMounted(() => {
  selectall();
  fetchPosts();
});

const tagToCodeMap = {
  "意见与建议": 1000,
  "其他": 1001,

  "宿舍设施报修": 2000,
  "教学设施报修": 2001,
  "公共设施报修": 2002,

  "校园网服务": 3000,
  "食堂餐饮问题": 3001,
  "校园环境问题": 3002,
  "校园安全问题": 3003,
}
const codeToTagMap = {
  //'div': 1,
  1000: "意见与建议",
  1001: "其他",

  2000: "宿舍设施保修",
  2001: "教学设施报修",
  2002: "公共设施报修",

  3000: "校园网服务",
  3001: "食堂餐饮问题",
  3002: "校园环境问题",
  3003: "校园安全问题",
}
const selectedcode = computed(() => {
  return selected.value.map(tagcode => {
    return tagToCodeMap[tagcode] || "9919";
  });
});


/*const getColor = (val) => {
  switch (val) {
    case 0: return '#33CC00'
    case 1: return '#00CCCC'//湖青色
    case 2: return '#0066CC'//天蓝色：更黑一点
    case 3: return '#FF6600'//orange
    case 4: return '#FF3300'//red
  }
}
const getBackgroundColor = (val) => {
  if (val == 3) {
    return '#FFFF00'
  } else {
    return 'white'
  }
}*/
const getBackgroundColor = (val) => {
  switch (val) {
    case 0: return '#EEEEEE'
    case 1: return '#CCFFCC'
    case 2: return '#66FF00'
    case 3: return '#FFFF99'//orange
    case 4: return '#CC0000'//red
  }
}
const getColor = (val) => {
  if (val == 0) {
    return '#0033FF'
  } else {
    return 'black'
  }
}
const codeToStatusMap = {
  0: "待处理",
  1: "处理中",
  2: "已解决",
  3: "待审核垃圾信息",
  4: "已确认垃圾信息",
}

const value = ref('')
const label = ref('')

async function confirmJunk(status) {
  const junkData = {
    //feedback_id: showPost.value.feedback_id,
    feedback_status: status,
  }
  try {
    const response = await confirmJunkApi(showPost.value.feedback_id, junkData);
    const { code, data, msg } = response.data;
    if (code == 200 && msg == 'success') {
      if (status == 0) {
        alert("成功将反馈认证为正常帖子!")
        fetchPosts();
        //PopupMessage.value = "成功将反馈认证为正常帖子!";
      } else {
        alert("成功将反馈认证为垃圾帖子!")
        fetchPosts();
        //PopupMessage.value = "成功将反馈认证为垃圾帖子!";
      }
      postPopup.value = true;
    } else {
      alert("认证反馈失败")
      //postPopup.value = true;
      //PopupMessage.value = "发帖失败！";
      //errorMessage.value=data.
    }
  } catch (error) {
    //postPopup.value = true;
    alert("未连接到服务器")
    //PopupMessage.value = "未连接到服务器";
  }

}

const options = [
  {
    value: '0',
    label: '撤销处理',
  },
  {
    value: '1',
    label: '接单',
  },
  {
    value: '3',
    label: '举报垃圾信息',
  },
]



const selected = ref([])

const rating = ref(5)


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
const postPopup = ref(false);
const PopupMessage = ref('')
const currentPage = ref(1);

const nullTMP = ref();
const fetchPosts = async () => {
  try {
    const codeStr = selectedcode.value.join(',');
    const response = await GetPostsApi(currentPage.value, nullTMP.value, nullTMP.value, nullTMP.value, codeStr);
    posts.value = response.data.data.list, total.value = (response.data.data.totalPages) * 10,
      console.log(total)
    errorMessage.value = null;
  } catch (err) {
    errorMessage.value = err.response?.data?.message || '网络错误，请稍后再试';
    console.error('获取帖子失败:', err);
  } finally {
    isLoading.value = false;
  }
}


const toggleTag = (tag) => {//维护slected{tags}数组

  console.log(selected)
  const idx = selected.value.indexOf(tag)
  if (idx > -1) {
    selected.value.splice(idx, 1)
    //isChooseAll = false;
  } else {
    selected.value.push(tag)
    //if (selected.value === allTags.value) isChooseAll = true;
  }
  console.log(selectedcode.value)
}
function selectall() {
  selected.value = [...allTags.value];
}
function selectnull() {
  selected.value = ['']
}

function openContent(postid) {
  showPost.value = posts.value.find(item => item.feedback_id == postid);
  openModal.value = true;
}

const user_id = globalStore.userId;
async function sentChecking() {
  const checkingData = {
    feedback_status: value.value,
    admin_reply: {
      content: commentContent.value,
    }
  }
  try {
    const response = await checkingRequestApi(globalStore.userId, checkingData);
    const { code, data, msg } = response.data;
    if (code == 200 && msg == 'success') {
      postPopup.value = true;
      PopupMessage.value = "成功发送详情!";
    } else {
      postPopup.value = true;
      PopupMessage.value = "详情失败！";
      //errorMessage.value=data.
    }
  } catch (error) {
    postPopup.value = true;
    PopupMessage.value = "未连接到服务器";
  }
}
const keyWord = ref('');
async function KeyWordSearch() {
  try {
    currentPage.value = 1;
    const response = await GetPostsApi(currentPage.value, nullTMP.value, nullTMP.value, keyWord.value, nullTMP.value);
    posts.value = response.data.data.list, total.value = (response.data.data.totalPages) * 10,
      console.log(total)
    errorMessage.value = null;
    keyWord.value = '';
  } catch (err) {
    errorMessage.value = err.response?.data?.message || '网络错误，请稍后再试';
    console.error('获取帖子失败:', err);
  } finally {
    isLoading.value = false;
  }
}


</script>

<style scoped>
.el-pagination {
  justify-content: center;
}

.container {

  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 850px;
  margin: 2.5rem auto;
  padding: 2.2rem;
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;

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
    gap: 40px;

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

    .searching-container input {
      flex-grow: 1;
      padding: 0.6rem 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      font-size: 14px;
      transition: all 0.3s ease;
    }

    .searching-container input:focus {
      outline: none;
      border-color: #42b983;
      box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
    }

    .searching-container input::placeholder {
      color: #b0b0b0;
      font-style: italic;
    }

    .el-button {
      transition: all 0.3s ease !important;
    }

    .el-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(64, 158, 255, 0.2);
    }
  }
}

/* 标签选择按钮区域样式margin-bottom: 25px;flex-direction:row; */

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

.container h1 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-weight: 600;
  font-size: 1.8rem;
  text-align: center;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
}

.container h1::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: #42b983;
  border-radius: 3px;
}

.container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #10b981);
}


.logout-popup {
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

  .logout-popup-box {
    background-color: #fff;
    width: 100%;
    max-width: 230px;
    border-radius: 8px;
    padding: 25px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    position: relative;

    display: flex;
    flex-direction: column;
    justify-items: center;

    .logout-title {
      text-align: center;
      margin-bottom: 20px;
      font-size: 24px;
    }

    .logoutbtn-container {
      display: flex;
      justify-content: space-around;
      gap: 40px;

      .logout-btns {
        width: 80px;
        height: 35px;
        font-size: 14px;
        border-radius: 8px;
      }
    }
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

.items {
  display: flex;
  flex-direction: column;
  gap: 28px;
  /* 增大间距增强分隔 */
  padding: 15px 0;
}

/* 单个反馈卡片 - 强化视觉区分与层次感 */
.item {
  border: 1px solid #6a6c6e;
  border-radius: 12px;
  padding: 24px;
  /*background: #ffffff;*/
  transition: all 0.35s ease;
  position: relative;
  overflow: hidden;
}

/* 卡片左侧装饰条 - 增强item辨识度 */
.item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background: #42b983;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.item:hover {
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.09);
  transform: translateY(-4px);
  border-color: #d1d5db;
}

.item:hover::before {
  opacity: 1;
}

/* 反馈卡片内容样式 */
.item-messages {
  margin-bottom: 18px;
}

.item h2 {
  font-size: 19px;
  /*color: #1e293b;*/
  margin: 0 0 12px 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /*-webkit-line-clamp: 2;*/
  overflow: hidden;
}

.item h6 {
  font-size: 14px;
  color: #64748b;
  margin: 0;
  font-weight: 400;
  display: flex;
  gap: 15px;
}

/* 反馈详情按钮样式 */
.item button {
  padding: 9px 18px;
  background-color: transparent;
  border: 1px solid #42b983;
  color: #42b983;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.item button:hover {
  background-color: #42b983;
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.2);
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

  .check-dialog {
    gap: 20px;
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
  flex-direction: column;
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
