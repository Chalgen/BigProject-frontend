

<template scoped>
    <div class="container">
        <div class="login-container">
            <div class="welcome">欢迎登录</div>
            <div class="username">
                <span>账号：</span><input type="text" v-model="username" id="account-input"><!--在 Vue 中，v-model="username" 是用于实现表单元素与数据之间双向绑定的指令，其核心作用是：

数据驱动视图：当 username 数据发生变化时，绑定的表单元素（如输入框）会自动更新显示对应的值。
视图同步数据：当用户修改表单元素的值（如在输入框中输入内容）时，username 数据会自动同步更新为最新值。-->
            </div>
            <div class="password">
                <span>密码：</span><input type="password" v-model="password" class="password-input">
                <!--在 Vue 中，v-model="password" 不需要写成 v-model="password.value"，
                是因为 Vue 对模板中的 ref 变量 做了自动解包处理，这是框架层面的语法糖设计。-->
            </div>
            <div class="trylogin-button">
                <button @click="trylogin()">标准登录（需等待后端返回值确认）</button>
            </div>
            <div class="testlogin-button">
                <button @click="testergotohome()">（已舍弃）开发者测试登录（直接跳转到homepage页）</button>
            </div>
            <div class="gototestpage1">
                <button @click="gototestpage1()">测试页</button>
            </div>


        </div>
        <div class="login-message">

            <div v-if="isLoading" class="status-indicator">
                test1
                <i class="waiting1"></i> 正在验证登录信息...
            </div>

            <div v-if="isLoginSuccess" class="success-message">
                test2
                <div class="success-icon">
                    <i class="fa fa-check-circle"></i>
                </div>
                <h2>登录成功！</h2>
                <div class="user-info">
                    <p>用户编号：{{ userData.user_id }}</p>
                    <p>用户类型：{{ userData.user_type === 1 ? '管理员' : '普通用户' }}</p>
                </div>
                <p class="redirect-message">3秒后自动跳转到首页...</p>
            </div>

            <div v-if="errorMessage" class="error-message">
                test3
                <i class="error1"></i>
                <p>{{ errorMessage }}</p>
                <button @click="fetchLoginInfo" class="retry-button">重试</button>
            </div>
        </div>
        
        <!--<div class="login-message">
            test
        </div>
        
        -->
    </div>


</template>

<script setup>
    import { useRouter } from 'vue-router';
    import { useGlobalStore } from '@/store/global'
    const router = useRouter()
    import {ref,onMounted,getCurrentInstance} from 'vue';
    //import "./index.css";
    import axios from "axios";
    const { proxy } = getCurrentInstance()

    const username = ref();//将account视作结构体名
    const password = ref();
    //typescript
    //const baseurl = "http://127.0.0.1:4523/m1/7074224-6795300-default"

    function trylogin(){//axios.post(url,data,config)：目标API，后端请求参数，
        const userdata={
            username:username.value,
            password:password.value
        }
        axios.post('http://127.0.0.1:4523/m1/7074224-6795300-default/api/user/login',userdata)
        //this.baseUrl = this.router.options.base;
        //document.getElementById('nowpageurl').textContent = baseUrl;
        //window.open('{baseUrl}/homepage', '_blank');
        //router.push('/homepage')

        //goTo()

        //window.open('https://www.yuanshen.com/#/', '_blank')
    }
    const goTo=()=>{//必须import use router 、const router、const goto=()=>之后才能跳转
        router.push('/homepage')
    }
    function gototestpage1(){
        jumptestpage1();
    }
    const jumptestpage1=()=>{
        router.push('/testpage1');
    }
    function testergotohome(){
        goTo();
    }
/*const fetchlogininfo = async () =>{
    try{
        const response = await axios.post('http://127.0.0.1:4523/m1/7074224-6795300-default/api/user/login', {});
        const { code, data, msg } = response.data;
        if (msg === 'success' && code === 200){
            goTo();
        }
    }catch (error){
            
    }
}*/


const isLoading = ref(true);
const isLoginSuccess = ref(false);
const userData = ref(null);
const errorMessage = ref('');

// 从后端获取登录信息
const fetchLoginInfo = async () => {
    isLoading.value = true;
    errorMessage.value = '';
    isLoginSuccess.value = false;
    userData.value = null;

    const userdata={
        username:username.value,
        password:password.value
    }

    try {
    // 发送登录请求（实际项目中添加用户名密码等参数）
    const response = await axios.get('http://127.0.0.1:4523/m2/7131475-6854516-default/351275377',userdata);

    // 解析后端返回的数据
    const { code, data, msg } = response.data;

    // 检查msg是否为success
        if (msg === 'success' && code === 200) {

            //$global.userInfo.userid=data.user_id;
            const idtmp=data.user_id

            const sentdata={
                user_id:idtmp.value,
            }
            axios.post('http://127.0.0.1:4523/m1/7074224-6795300-default/api/user/login', sentdata);
            isLoginSuccess.value = true;
            userData.value = data; // 存储用户信息
            const globalstore = useGlobalStore()
            globalstore.changeuserid(data.user_id)
            
            // 5秒后自动跳转到首页
            //setTimeout(() => {router.push('/homepage');}, 5000);
        } else {
            errorMessage.value = msg || '登录失败，请重试';//msg有值时输出msg e.g.“用户不存在”
        }
    } catch (error) {
    // 处理请求错误
        if (error.response) {
            errorMessage.value = `请求错误: ${error.response.data?.msg || '服务器异常'}`;
        } else {
            errorMessage.value = '网络错误，无法连接到服务器';
        }
            console.error('登录请求失败:', error);
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
  fetchLoginInfo();
});

    



</script>


<style scoped>

.container{

    display:flex;
    align-items:center;
    justify-content: center;
    border:5px solid black;
    color:crimson;

    width:100%;
    height:100%;

    .login-container{
        width:200px;
        height:80%;
        border:3px solid crimson;
    }
    .login-message{
        width:200px;
        height:80%;
        border:3px solid darkgreen;

        display: flex;
        flex-direction: column;
        gap: 20px;
        flex:1;

        .status-indicator{
            background-color: #42b983;
            border:2px solid midnightblue;
            height:20px;
        }
        .success-message{
            background-color: #3498db;
            border:2px solid midnightblue;
            height:120px;
        }
        .error-message{
            background-color: #9b59b6;
            border:2px solid midnightblue;
            height:320px;
        }

    }
}
    


</style>
