<template scoped>
  <div class="post-container">
    这是发帖页
  </div>
发帖
</template>

<script setup lang="ts" name="post">
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