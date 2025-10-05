<template>
  <div class="admin-feedback-view">
    <h2>浏览所有反馈喵喵喵</h2>
    <button @click="showTagModel = true" class="tag-filter-btn">
      这里点击选择标签喵
    </button>

    <!-- 标签选择弹窗 -->
    <div v-if="showTagModel" class="model-mask">
      <div class="model-container">
        <div class="model-header">
          <h3>选择反馈标签喵</h3>
          <button @click="showTagModel = false">x</button>
        </div>
        <div class="tag-list">
          <button @click="toggleAllTags" class="tag-all-btn" :class="{ active: isAllSelected }">
            全♂选
          </button>
          <button v-for="tag in allFeedbackTags" :key="tag" @click="toggleTag(tag)" class="tag-btn" :class="{ active: selectedTags.includes(tag) }">
            {{ tag }}
          </button>
        </div>
        <button @click="confirmFilter" class="confirm-btn">确认♂筛选</button>
      </div>
    </div>

    <!-- 反馈列表 -->
    <div v-if="isLoading" class="loading">加载ing...^_^</div>
    <div v-else-if="filteredFeedbacks.length === 0" class="empty">QAQ暂无反馈T_T</div>
    <div v-else>
      <div v-for="feedback in filteredFeedbacks" :key="feedback.feedback_id" class="feedback-card" @mouseenter="feedback.hover = true" @mouseleave="feedback.hover = false">
        <div class="card-header">
          <h3 class="card-title">{{ feedback.title }}</h3>
          <span class="card-status" :class="feedback.is_solved ? 'solved' : 'unsolved'">
            {{ feedback.is_solved ? '已解决' : '未解决' }}
          </span>
        </div>
        <div class="card-meta">
          <span class="meta-tag">{{ feedback.tag }}</span>
          <span class="meta-time">{{ formatTime(feedback.create_time) }}</span>
          <span class="meta-user">{{ feedback.is_anonymous ? '匿名用户' : `用户ID:${feedback.user_id}` }}</span>
        </div>
        <div class="card-content">
          {{ feedback.content || '暂无内容' }}
        </div>
        <div class="card-action">
          <button @click="openDetail(feedback)" class="detail-btn" :class="{ show: feedback.hover }">
            查看♂详情♂
          </button>
        </div>
      </div>
    </div>
    <div v-if="showDetailModal" class="model-mask">
      <div class="model-container">
        <div class="model-header">
          <h3>反馈详情</h3>
          <button @click="showDetailModal = false">x</button> <!-- 关闭弹窗 -->
        </div>
        <div class="detail-content">
          <h4>{{ currentFeedback.title }}</h4>
          <p>状态：{{ currentFeedback.is_solved ? '已解决' : '未解决' }}</p>
          <p>标签：{{ currentFeedback.tag }}</p>
          <p>提交时间：{{ formatTime(currentFeedback.create_time) }}</p>
          <p>提交人：{{ currentFeedback.is_anonymous ? '匿名用户' : `用户ID:${currentFeedback.user_id}` }}</p>
          <p>内容：{{ currentFeedback.content || '暂无内容' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// 状态管理
const isLoading = ref(false);
const allFeed = ref([]);
const allFeedbackTags = ref(['宿舍设施报修', '教学设施报修', '公共设施报修', '校园网服务', '食堂餐饮问题', '校园环境问题', '校园安全问题', '意见与建议', '其他']);
const selectedTags = ref([]);
const showTagModel = ref(false);
const isAllSelected = computed(() => selectedTags.value.length === allFeedbackTags.value.length);
const currentFeedback = ref({});
const showDetailModal = ref(false);

// 筛选后的反馈列表
const filteredFeedbacks = computed(() => {
  if (selectedTags.value.length === 0) {
    return allFeed.value;
  }
  return allFeed.value.filter(feedback => selectedTags.value.includes(feedback.tag));
});

// 时间格式化工具函数
const formatTime = (timeStr) => {
  if (!timeStr) return '';
  return new Date(timeStr).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// 标签操作方法
const toggleTag = (tag) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter(t => t !== tag);
  } else {
    selectedTags.value.push(tag);
  }
};

const toggleAllTags = () => {
  if (isAllSelected.value) {
    selectedTags.value = [];
  } else {
    selectedTags.value = [...allFeedbackTags.value];
  }
};

const confirmFilter = () => {
  showTagModel.value = false;
};

// 接口请求：获取所有反馈
const fetchAllFeedbacks = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get('http://127.0.0.1:4523/m1/7120556-6843396-default/api/feedback');
    if (response.data.code === 200) {
      allFeed.value = response.data.data.list.map(feedback => ({
        ...feedback,
        hover: false
      }));
    } else {
      alert('获取反馈失败：' + (response.data.msg || '服务器异常'));
    }
  } catch (err) {
    console.error('获取反馈数据出错：', err);
    alert('网络错误，无法加载反馈数据');
  } finally {
    isLoading.value = false;
  }
};

// 查看详情方法
const openDetail = (feedback) => {
  currentFeedback.value = feedback;
  showDetailModal.value = true;
};

// 组件挂载时自动请求数据
onMounted(() => {
  fetchAllFeedbacks();
});
</script>

<style scoped>
/* 页面容器样式 */
.admin-feedback-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* 标签筛选按钮 */
.tag-filter-btn {
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  margin-bottom: 20px;
}

/* 标签选择弹窗 */
.model-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.model-container {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
}

.model-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.model-header button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tag-btn, .tag-all-btn {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background-color: white;
}

.tag-btn.active, .tag-all-btn.active {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.confirm-btn {
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
}

/* 反馈卡片样式（发帖子视觉） */
.feedback-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.feedback-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.card-status {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.card-status.solved {
  background-color: #d1fae5;
  color: #059669;
}

.card-status.unsolved {
  background-color: #fee2e2;
  color: #dc2626;
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
  color: #6b7280;
  font-size: 14px;
}

.meta-tag {
  padding: 2px 6px;
  background-color: #f3f4f6;
  border-radius: 4px;
}

.card-content {
  line-height: 1.6;
  color: #4b5563;
  margin-bottom: 12px;
}

.card-action {
  text-align: right;
}

.detail-btn {
  padding: 6px 12px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.feedback-card:hover .detail-btn,
.detail-btn.show {
  opacity: 1;
}

.detail-btn:hover {
  background-color: #2563eb;
}

.loading, .empty {
  text-align: center;
  padding: 20px;
  color: #6b7280;
}
</style>