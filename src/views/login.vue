<template scoped>
    <div class="container">
        <div class="login-container">
            <div class="welcome">欢迎登录</div>
            <div class="username">
                <span>账号：</span>
                <label for="account-input" class="sr-only">账号</label>
                <input type="text" v-model="username" id="account-input" aria-describedby="username-hint">
                <span id="username-hint" class="sr-only">请输入您的登录账号</span>
            </div>
            <div class="password">
                <span>密码：</span>
                <label for="password-input" class="sr-only">密码</label>
                <input type="password" v-model="password" class="password-input" id="password-input" aria-describedby="password-hint">
                <span id="password-hint" class="sr-only">请输入您的登录密码</span>
            </div>
            <div class="trylogin-button">
                <button @click="trylogin()" id="login2trylogin" aria-label="登录">登录</button>
            </div>
            <div class="gotoRegister">
                <button @click="gotoRegister()" id="login2reg" aria-label="注册">注册</button>
            </div>
        </div>
        <div class="login-message">
            <div class="login-text">登录信息</div>
            <br>
            <div v-if="isLoginSuccess" class="success-message">
                <h2>登录成功</h2>
                <div class="user-info">
                  <div v-if="userType===1">
                    <p>用户编号：{{ userData.user_id }}</p>
                    <p>普通管理员</p>
                  </div>
                  <div v-else-if="userType===2">
                    <p>用户编号：{{ userData.user_id }}</p>
                    <p>超级管理员</p>
                  </div>
                  <div v-else>
                    <p>用户编号：{{ userData.user_id }}</p>
                    <p>学生</p>
                  </div>
                </div>
                <div class="testergotohome">
                    <button @click="testergotohome()" id="logintester" aria-label="确认登录信息并进入首页">确认登录信息并登录</button>
                </div>
            </div>
            <div v-if="errorMessage" class="error-message">
                <i class="error1"></i>
                <p>{{ errorMessage }}</p>
                <button @click="fetchLoginInfo" class="retry-button" aria-label="重试登录请求">重试</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    import { useGlobalStore } from '@/store/global'
    const router = useRouter()
    import { ref, onMounted, getCurrentInstance } from 'vue';
    import axios from "axios";
    const { proxy } = getCurrentInstance()
    const globalStore = useGlobalStore()

    const username = ref('');
    const password = ref('');

    const isLoading = ref(true);
    const isLoginSuccess = ref(false);
    const userData = ref(null);
    const errorMessage = ref('');
    const userType = ref('');
    const userId = ref('');
    const fetchLoginInfo = () => {
        trylogin(); 
    }

    function trylogin() {
        isLoading.value = true;
        errorMessage.value = '';
        isLoginSuccess.value = false;
        userData.value = null;
        const userdata = {
            username: username.value.trim(),
            password: password.value,
        }
        if (!userdata.username) {
            errorMessage.value = '请输入账号';
            isLoading.value = false;
            return;
        }
        if (!userdata.password) {
            errorMessage.value = '请输入密码';
            isLoading.value = false;
            return;
        }
        //axios.post('http://127.0.0.1:4523/m2/7131475-6854516-default/351321866', userdata)
        axios.post('http://127.0.0.1:4523/m2/7131475-6854516-default/351275377', userdata)
            .then(response => {
                const { code, data, msg } = response.data;
                if (code === 200 && msg === 'success') {
                    isLoginSuccess.value = true;
                    userData.value = data;
                    userType.value = data.user_type;
                    userId.value = data.user_id;
                    globalStore.changeUserId(userId);
                    globalStore.changeUserType(data.user_type);
                } else {
                    errorMessage.value = msg || '登录失败，请重试';
                }
            }).catch(error => {
                if (error.response) {
                    errorMessage.value = `请求错误: ${error.response.data?.msg || '服务器异常'}`;
                } else {
                    errorMessage.value = '网络错误，无法连接到服务器';
                }
                console.error('登录请求失败:', error);
            }).finally(() => {
                isLoading.value = false;
            });
    }

    
    function testergotohome() {
        const globalStore = useGlobalStore()
        redirectByUserType(globalStore.userType);
    }

    const goToStudentmain = () => {
        router.push('/HomePages/Student/StudentHome')
    }
    const goToGeneralAdminHome = () => {
        router.push('/HomePages/GeneralAdmin/GeneralAdminHome')
    }

    const goToSuperAdminHome = () => {
        router.push('/HomePages/SuperAdmin/SuperAdminHome')
    }

    const gotoRegister = () => {
        console.log("注册按钮被点击");
        router.push('/register').catch(err => {
            console.log("路由跳转失败:", err);
        });
    }

    function redirectByUserType(userType) {
        switch (userType) {
            case 1:
                goToGeneralAdminHome();
                break;
            case 2:
                goToSuperAdminHome();
                break;
            case 3:
                goToStudentmain();
                break;
            default:
                errorMessage.value = '用户类型异常，请联系管理员';
                setTimeout(() => router.push('/login'), 3000);
        }
    }
</script>

<style scoped>
/*ai生成，最后会人力写orz */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: lightblue;
    padding: 20px;
    font-family: "Microsoft YaHei", sans-serif;

    .login-container {
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        padding: 30px 40px;
        width: 100%;
        max-width: 400px;
        margin-bottom: 25px;

        .welcome {
            text-align: center;
            font-size: 22px;
            font-weight: 600;
            color: #333;
            margin-bottom: 25px;
        }
    }
}

.username, .password {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.username span, .password span {
    width: 60px;
    color: #666;
    font-size: 14px;
}

input[type="text"], input[type="password"] {
    flex: 1;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 11px 15px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s;
}

input[type="text"]:focus, input[type="password"]:focus {
    border-color: darkblue;
    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

button {
    width: 100%;
    background-color: darkblue;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 11px 0;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
}

button:hover {
    background-color: #003366; 
}

.testlogin-button button {
    background-color: #909399;
}

.testlogin-button button:hover {
    background-color: #7d8086;
}

.login-message {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    padding: 25px;
    width: 100%;
    max-width: 400px;
    text-align: center;
    color: green;
}

.success-message {
    text-align: center;
    color: green;
}

.user-info {
    background-color: #f0f9eb;
    border-radius: 4px;
    padding: 15px;
    margin: 15px 0;
    text-align: left;
}

.error-message {
    text-align: center;
    color: red;
}

.retry-button {
    background-color: red;
}

.retry-button:hover {
    background-color: #cc0000;
}
</style>