<template>
    <!-- 弹窗背景层，仅在visible为true时显示 -->
    <div v-if="visible" class="success-background" @click.self="handleClose">
        <div class="success-popup">
            <!-- 弹窗消息内容，通过props传入 -->
            <h1>{{ message }}</h1>
            <!-- 确认按钮，点击触发关闭事件 -->
            <button @click="handleClose" class="close-success-popup">
                确认
            </button>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

// 定义组件接收的属性
const props = defineProps({
    // 控制弹窗显示/隐藏
    visible: {
        type: Boolean,
        required: true,
        default: false
    },
    // 弹窗显示的消息内容
    message: {
        type: String,
        required: true,
        default: ''
    }
})

// 定义组件发出的事件
const emit = defineEmits(['close'])

// 处理关闭弹窗的逻辑
const handleClose = () => {
    // 触发close事件，通知父组件关闭弹窗
    emit('close')
}
</script>

<style scoped>
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
}

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

.close-success-popup {
    margin-top: 15px;
    padding: 8px 16px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.close-success-popup:hover {
    background-color: #359e75;
}
</style>
