<script setup>

</script>

<template scoped>
    
    <div class="oricon">
        欢迎使用学生服务平台
        <br></br>
        制作人：
        <br></br>
        <div>
          <router-link :to="{path:'login2'}" class="btn">开始登陆</router-link>
        </div>
        
    </div>
</template>

<style scoped>
.oricon{
  display:flex;
  align-items:center;
  justify-content:center;
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}
.btn {
  display:flex;
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  /*cursor: pointer;*/
  text-decoration: none; /* 去除链接默认下划线 */
}
</style>