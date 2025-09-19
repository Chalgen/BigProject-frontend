<!--主要需求实现：-->
<!--获取所有自己发的帖子的title、id、（时间？），点击button向后端询问getPostData(id=xxx)，获得详细内容
并跳转详细内容页，展示get出的内容，可以看到content、是否解决等-->
<!--右侧选择栏通过children routerview实现：用户信息、发送反馈、我的反馈（反馈解决记录）=>追加评价-->


<!--其他需求：反馈时间、反馈类别、是否紧急、是否匿名、反馈回复与评价=》还要加一个routerview去展示...-->
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