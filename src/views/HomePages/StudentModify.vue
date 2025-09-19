<template scoped>
  修改个人信息
</template>

<script setup lang="ts" name="modify">
//import()
import { useRouter } from 'vue-router';
    import { useGlobalStore } from '@/store/global'
    const router = useRouter()
    import { ref, onMounted, getCurrentInstance } from 'vue';
    import axios from "axios";
    const { proxy } = getCurrentInstance()
    const globalStore = useGlobalStore()
</script>

<stlye scoped>
  
</stlye>