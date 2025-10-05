<template>
    <div v-if="visible" class="logout-popup">
        <div class="logout-popup-box">
            <div class="logout-title">{{ message }}</div>
            <div class="logoutbtn-container">
                <button @click="handleConfirm">确定</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, emit } from 'vue'

const emit = emit()
const handleConfirm = () => {
    emit('confirm') // 触发确认事件
}


</script>

<style scoped>
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
        max-width: 170px;
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
</style>