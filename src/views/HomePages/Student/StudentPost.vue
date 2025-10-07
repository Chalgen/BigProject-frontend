<template scoped>
  <div class="container">
    <h1>反馈校园事务</h1>
    <input v-model="title" placeholder="标题" class="posttitle">
    <textarea v-model="content" placeholder="内容" class="postcontent"></textarea>
    <div class="post-settings">
      <el-button class="IsAnonbutton" @click="CheckAnon()">{{ IsAnon ? "是否匿名：匿名" : "是否匿名：实名" }}</el-button>
      <el-button class="IsUrgentbutton" @click="CheckUrgent()">{{ IsUrgent ? "是否紧急：紧急" : "是否紧急：不紧急" }}</el-button>
      <el-button class="select-tag" @click="showModal = true">点击选择标签</el-button>
      <el-button class="choose-attach" @click="sentAttach = true">发送附件</el-button>
    </div>
    <div class="post-div">
      <el-button class="postbutton" @click="post()">发帖</el-button>
    </div>


    <div v-if="showModal" class="modal">
      <div class="modal-box">
        <h4>选择标签<button @click="showModal = false"></button></h4>
        <!-- 标签列表：点击切换选择 -->
        <div class="tag-list">
          <button v-for="t in allTags" :key="t" :disabled="selected.length >= 1 && !selected.includes(t)"
            @click="toggleTag(t)" :class="{ active: selected.includes(t) }">
            {{ t }}
          </button>
        </div>
        <button @click="showModal = false" class="confirm-btn">确定</button>
      </div>
    </div>

    <div v-if="postPopup == true" class="success-background">
      <div class="success-popup">
        <h1>{{ PopupMessage }}</h1>
        <button @click="postPopup = false" class="close-success-popup">确认</button>
      </div>
    </div>
    <el-dialog title="上传附件" v-model="sentAttach" :width="'70%'" :z-index='4000' :align-center="true">
      <span class="photo-text">此处上传附件照片：</span>
      <!--<el-upload :action="false" :http-request="handleUpload" :auto-upload="false" :on-change="handleFileChange"
        :file-list="fileList" list-type="picture-card" :limit="3" :on-exceed="() => ElMessage.warning('仅支持3张图片')">
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>-->
      <el-upload :action="false" :http-request="handleUpload" :limit="3" list-type="picture-card"
        :on-exceed="() => ElMessage.warning('仅支持单张图片')">
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script setup>
import { useGlobalStore } from '@/store/global'
import { ref, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router'
import axios from "axios";
import { SentPostApi, uploadAnnexPhotoApi } from '@/api/post';
import { ChangeProfilePhotoApi } from '@/api/user';
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'
const router = useRouter()
const { proxy } = getCurrentInstance()
const globalStore = useGlobalStore()
const IsAnon = ref(false);
const IsUrgent = ref(false);
const postPopup = ref(false);
const PopupMessage = ref('');
const errorMessage = ref('')
const sentAttach = ref(false)
const fileList = ref([]); // ElUpload 绑定的已选图片列表
const selectedFile = ref(null); // 存储待上传的图片文件（单图场景）
const handleFileChange = (uploadFile, uploadFiles) => {
  selectedFile.value = uploadFile.raw; // raw 是原生 File 对象
  fileList.value = uploadFiles; // 更新预览列表
};
function CheckAnon() {
  if (IsAnon.value == false) {
    IsAnon.value = true;
  } else {
    IsAnon.value = false;
  }
}
function CheckUrgent() {
  if (IsUrgent.value == false) {
    IsUrgent.value = true;
  } else {
    IsUrgent.value = false;
  }
}

const gotohomepage = () => {//必须import use router 、const router、const goto=()=>之后才能跳转
  router.push('/homepage')
}
function jumphomepage() {
  gotohomepage()
}

const title = ref();
const content = ref();
const annexUrl = ref([''])

async function post() {
  /*if (title.value.length < 1) {
    postPopup.value = true;
    PopupMessage.value = "请输入标题!";
  }*/
  const postingData = {
    title: title.value,
    content: content.value,
    feedback_type: tagToCodeMap[selected.value],
    is_nicked: IsAnon.value,
    is_urgent: IsUrgent.value,
    image_url: annexUrl.value,
    //attachments: selectedFile.value,
  }
  title.value = '';
  content.value = '';
  try {
    const response = await SentPostApi(postingData);
    const { code, data, msg } = response.data;
    if (code == 200 && msg == 'success') {
      postPopup.value = true;
      PopupMessage.value = "成功发送反馈!";
    } else {
      postPopup.value = true;
      PopupMessage.value = "发帖失败！";
      //errorMessage.value=data.
    }
  } catch (error) {
    postPopup.value = true;
    PopupMessage.value = "未连接到服务器";
  }

}
const handleUpload = async ({ file }) => {
  const formData = new FormData()
  formData.append('files', file)
  try {
    const response = await ChangeProfilePhotoApi(formData)
    const { code, msg, data } = response.data

    if (code === 200 && msg === 'success') {
      ElMessage.success('上传成功')
      annexUrl.value = response.data.data;
      console.log(annexUrl.value);

    } else {
      ElMessage.error(msg || '上传失败')
    }
  } catch (error) {
    ElMessage.error('上传失败：' + (error.response?.data?.msg || '网络错误'))
  }
}
const showModal = ref(false) // 控制弹窗显示
const allTags = ref(['宿舍设施报修', '教学设施报修', '公共设施报修', '校园网服务', '食堂餐饮问题', "校园环境问题", "校园安全问题", "意见与建议", "其他"]) // 所有可选标签
const tagToCodeMap = {
  //'div': 1,
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
const selected = ref([]) // 已选标签

// 切换标签选择：点击标签添加/移除
const toggleTag = (tag) => {
  const idx = selected.value.indexOf(tag)

  idx > -1 ? selected.value.splice(idx, 1) : selected.value.push(tag)
}

/*const handleUpload = async ({ file }) => {
  const formData = new FormData()
  formData.append('image', file)
  try {
    const response = await uploadAnnexPhotoApi(formData)
    const { code, msg, data } = response.data

    if (code === 200 && msg === 'success') {
      ElMessage.success('上传成功')

    } else {
      ElMessage.error(msg || '上传失败')
    }
  } catch (error) {
    ElMessage.error('上传失败：' + (error.response?.data?.msg || '网络错误'))
  }
}*/

</script>
<style scoped>
.container {
  max-width: 850px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  .el-message {
    font-size: 16px;
    padding: 15px 20px;
  }

  .el-message .el-message__icon {
    font-size: 20px;
    margin-right: 10px;
  }

  .el-message .el-message__closeBtn {
    font-size: 18px;
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

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
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

/* 1. 全局基础样式重置与统一 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

/* 2. 主容器样式：柔和质感 + 居中布局 */
.container {
  max-width: 850px;
  margin: 2.5rem auto;
  padding: 2.2rem;
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

/* 容器顶部装饰条（增强视觉识别） */
.container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #10b981);
}

/* 3. 标题样式：清晰层级 + 底部分隔 */
h1 {
  color: #1e293b;
  font-size: 1.9rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
  letter-spacing: 0.2px;
}

/* 4. 输入区域样式：聚焦反馈 + 舒适间距 */
/* 标题输入框 */
.posttitle {
  width: 100%;
  padding: 1rem 1.2rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1.05rem;
  color: #1e293b;
  transition: all 0.3s ease;
  background-color: #f8fafc;
}

.posttitle::placeholder {
  color: #94a3b8;
  font-weight: 400;
}

.posttitle:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background-color: #ffffff;
}

/* 内容文本域 */
.postcontent {
  width: 100%;
  padding: 1.2rem 1.2rem;
  margin-bottom: 1.8rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  min-height: 320px;
  /* 优化原600px过高问题 */
  resize: vertical;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #1e293b;
  transition: all 0.3s ease;
  background-color: #f8fafc;
}

.postcontent::placeholder {
  color: #94a3b8;
  font-weight: 400;
}

.postcontent:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background-color: #ffffff;
}

/* 5. 功能按钮区（匿名/紧急/标签/附件）：统一风格 + 色彩区分 */
.post-settings {
  display: flex;
  flex-direction: row;
  /*flex-wrap: wrap;*/
  margin-bottom: 2rem;
  gap: 12px;

  align-items: center;
}

/* 基础功能按钮样式 */
.IsAnonbutton,
.IsUrgentbutton,
.select-tag,
.choose-attach {
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}


.IsAnonbutton {
  background-color: #eff6ff;
  color: #3b82f6;
}

.IsAnonbutton:hover {
  background-color: #dbeafe;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.1);
}

/* 紧急按钮：浅红主题 */
.IsUrgentbutton {
  background-color: #fee2e2;
  color: #ef4444;
}

.IsUrgentbutton:hover {
  background-color: #fecdd3;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(239, 68, 68, 0.1);
}

/* 标签选择按钮：中蓝主题 */
.select-tag {
  background-color: #3b82f6;
  color: #ffffff;
}

.select-tag:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
}

/* 附件上传按钮：浅紫主题 */
.choose-attach {
  background-color: #f3e8ff;
  color: #8b5cf6;
}

.choose-attach:hover {
  background-color: #e9d5ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(139, 92, 246, 0.1);
}

/* 6. 发帖按钮：强调样式 + 视觉焦点 */
.post-div {
  display: flex;
  justify-content: center;
  /* 发帖按钮居中 */
  margin-bottom: 2rem;
}

.postbutton {
  padding: 1rem 5rem;
  /* 优化原过宽内边距 */
  border: none;
  border-radius: 12px;
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(90deg, #10b981, #059669);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}

.postbutton:hover {
  background: linear-gradient(90deg, #059669, #047857);
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.3);
}

.postbutton:active {
  transform: translateY(0);
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.2);
}

/* 7. 标签弹窗样式：简洁清晰 + 选中反馈 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5000;
  /* 确保弹窗层级最高 */
  backdrop-filter: blur(2px);
  /* 背景模糊效果 */
}

.modal-box {
  background: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.modal-box h4 {
  color: #1e293b;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 弹窗关闭按钮 */
.modal-box h4 button {
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: #94a3b8;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.modal-box h4 button:hover {
  color: #ef4444;
}

/* 标签列表：均匀分布 + hover效果 */
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 1.8rem;
}

.tag-list button {
  padding: 0.6rem 1.1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #f8fafc;
  color: #1e293b;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
}

.tag-list button:hover {
  border-color: #3b82f6;
  background: #eff6ff;
  color: #3b82f6;
}

/* 标签选中状态：深蓝填充 */
.tag-list button.active {
  background: #3b82f6;
  color: #ffffff;
  border-color: #3b82f6;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
}

.tag-list button:disabled {
  background: #f1f5f9;
  color: #94a3b8;
  border-color: #e2e8f0;
  cursor: not-allowed;
  opacity: 0.7;
}

/* 弹窗确认按钮 */
.confirm-btn {
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  background: #3b82f6;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.confirm-btn:hover {
  background: #2563eb;
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
}

/* 8. 成功/失败弹窗样式：柔和反馈 + 居中布局 */
.success-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5000;
  backdrop-filter: blur(2px);
}

.success-popup {
  background: #ffffff;
  width: 90%;
  max-width: 350px;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.success-popup h1 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  padding: 0;
  border: none;
  text-align: center;
}

/* 弹窗确认按钮 */
.close-success-popup {
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  background: #10b981;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-success-popup:hover {
  background: #059669;
  box-shadow: 0 4px 6px rgba(16, 185, 129, 0.2);
}

/* 9. Element UI 附件上传组件适配 */
.el-upload {
  --el-upload-picture-card-size: 80px;
  /* 调整上传卡片大小 */
}

.el-upload .el-icon {
  color: #3b82f6;
  /* 上传图标颜色适配主色调 */
  font-size: 1.5rem;
}

.el-upload-list__item {
  border-radius: 8px !important;
  /* 上传列表项圆角 */
}

.photo-text {
  display: block;
  margin-bottom: 1rem;
  color: #475569;
  font-size: 1rem;
  font-weight: 500;
}

/* 10. 响应式适配（手机/平板） */
@media (max-width: 768px) {
  .container {
    margin: 1rem;
    padding: 1.5rem;
  }

  h1 {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
  }

  .postcontent {
    min-height: 250px;
  }

  .post-settings {
    gap: 8px;
  }

  .IsAnonbutton,
  .IsUrgentbutton,
  .select-tag,
  .choose-attach {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    flex: 1 1 auto;
    /* 按钮自动填充宽度 */
    justify-content: center;
  }

  .postbutton {
    padding: 0.9rem 3rem;
    font-size: 1.1rem;
    width: 100%;
  }

  .modal-box {
    padding: 1.5rem;
  }

  .success-popup {
    padding: 2rem 1.5rem;
  }
}

/* 11. 错误提示样式（补充原样式缺失） */
.el-message--error {
  background-color: #fee2e2 !important;
  border-color: #fecdd3 !important;
}

.el-message--error .el-message__content {
  color: #ef4444 !important;
}

.el-message--success {
  background-color: #dcfce7 !important;
  border-color: #bbf7d0 !important;
}

.el-message--success .el-message__content {
  color: #16a34a !important;
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