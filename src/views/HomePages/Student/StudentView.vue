
<template scoped>
  这是预览页
</template>

<script setup lang="ts" name="view">
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