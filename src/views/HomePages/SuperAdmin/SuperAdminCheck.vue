<template scoped>
  超级管理员审核管理员处理情况、确认垃圾信息、自查自己的处理记录
</template>

<script setup>
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