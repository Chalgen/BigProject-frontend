<template scoped>
  <div class="container">
    <button @click="goToLogin()">点击登出</button>
  </div>
</template>

<script setup>
//import()
import { createRouter,useRouter } from 'vue-router';
    import { useGlobalStore } from '@/store/global'
    const router = useRouter()
    import { ref, onMounted, getCurrentInstance } from 'vue';
    import axios from "axios";
    const { proxy } = getCurrentInstance()
    const globalStore = useGlobalStore()
    const goToLogin = () => {
        router.push({ name: 'login' })
    }
</script>

<stlye scoped>
  
</stlye>