<template scoped>
  <div class="container">
    <h1>修改个人信息</h1>
    <div class="show-name">
      <h3>学生用户&#12288;{{ globalStore.nickname }}:</h3>
    </div>
    <div class="check-container">
      <div class="check-left">
        <div class="check-leftin">
          <div class="rename">
            <div><span>修改昵称：</span><input type="text" v-model="rename" id="account-input"
                :placeholder="globalStore.nickname"></div>
          </div>
          <div class="contact-container">
            <div><span>&#12288;手机号：</span><input type="text" v-model="rephoneNumber" class="password-input"></div>
            <div><span>&#12288;&#12288;邮箱：</span><input type="text" v-model="reemailAddress"
                class="confirm-password-input"></div>
          </div>
          <div class="repassword">
            <div><span>修改密码：</span><input type="password" v-model="repassword" class="password-input"></div>

            <div><span>确认密码：</span><input type="password" v-model="confirmpassword" class="confirm-password-input">
            </div>
          </div>
          <div class="logout-container">
            <button @click="isCheck = true" class="check-post">提交修改</button>
            <button @click="isLogout = true" class="log-out">退出账号</button>
          </div>
        </div>

      </div>

      <div class="check-right">
        <span>修改头像：</span>
        <div class="photo-container"><!--"" -->
          <img :src="globalStore.profilePhotoUrl" class="profile-photo">
        </div>

        <div class="photo-poster">
          <span class="photo-text">此处上传新头像：</span>

          <!--<input type="file" accept="image/*" @change="sender" class="post-input"></input><button @click="uploadPhoto":disabled="!selected"></button>
          <button @click="uploadPhoto()">上传新头像</button>-->
          <el-upload :action="false" :http-request="handleUpload" :limit="1" list-type="picture-card"
            :on-exceed="() => ElMessage.warning('仅支持单张图片')">
            <el-icon>
              <Plus />
            </el-icon>
          </el-upload>
        </div>
      </div>
    </div>



    <div v-if="isLogout == true" class="logout-popup">
      <div class="logout-popup-box">
        <div class="logout-title">确认退出账号</div>
        <div class="logoutbtn-container">
          <button @click="goToLogin" class="logout-btns">确定</button>
          <button @click="isLogout = false" class="logout-btns">取消</button>
        </div>
      </div>
    </div>

    <div v-if="isCheck == true" class="logout-popup">
      <div class="logout-popup-box">
        <div class="logout-title">确认修改账号</div>
        <div class="logoutbtn-container">
          <button @click="reviseMessage()" class="logout-btns">确定</button>
          <button @click="isCheck = false" class="logout-btns">取消</button>
        </div>
      </div>
    </div>

    <div v-if="confirmPopup == true" class="logout-popup">
      <div class="logout-popup-box">
        <div class="logout-title">{{ PopupMessage }}</div>
        <div class="logoutbtn-container">
          <button @click="confirmPopup = false, isCheck = false" class="logout-btns">确定</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
//import()
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/store/global'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const router = useRouter()
import { ref, onMounted, getCurrentInstance } from 'vue';
import axios from "axios";
import { ChangeUserInfoApi } from '@/api/user';
const { proxy } = getCurrentInstance()
const globalStore = useGlobalStore()
const isLogout = ref(false);
const isCheck = ref(false);
const confirmPopup = ref(false)

const rename = ref()
const repassword = ref()
const confirmpassword = ref()
const rephoneNumber = ref()
const reemailAddress = ref()

const nickname = ref('')
//nickname.value = globalStore.nickname.value;
const profilePhotoUrl = ref('')
const PopupMessage = ref('')

const goToLogin = () => {
  globalStore.logout();
  router.push({ name: 'login' })
}
async function reviseMessage() {
  const reviseData = {
    new_nickname: rename.value,
    new_password: repassword.value,
    new_phoneNumber: rephoneNumber.value,
    new_emailAddress: reemailAddress.value,
  }
  try {
    const response = await ChangeUserInfoApi(reviseData);
    const { code, data, msg } = response.data;
    if (code == 200 && msg == 'success') {
      confirmPopup.value = true;
      PopupMessage.value = "修改成功!";
    } else {
      confirmPopup.value = true;
      PopupMessage.value = "修改失败！";
      //errorMessage.value=data.
    }
  } catch (error) {
    confirmPopup.value = true;
    PopupMessage.value = "未连接到服务器";
  }
}

const handleUpload = async ({ file }) => {
  const formData = new FormData()
  formData.append('image', file)
  try {
    const response = await ChangeProfilePhotoApi(formData)
    const { code, msg, data } = response.data

    if (code === 200 && msg === 'success') {
      ElMessage.success('上传成功')
      globalStore.changeProfilePhotoUrl(data.photoUrl)
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (userInfo) {
        userInfo.profilePhotoUrl = data.photoUrl
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
      }
    } else {
      ElMessage.error(msg || '上传失败')
    }
  } catch (error) {
    ElMessage.error('上传失败：' + (error.response?.data?.msg || '网络错误'))
  }
}

</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  .check-container {
    border: 2px solid black;
    display: flex;
    gap: v-bind(spacing + 'px');
    padding: 20px;

    .check-left {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      /**/
      margin: 1rem;

      .check-leftin {
        display: flex;
        flex-direction: column;
        gap: 30px;

        .rename,
        .repassword,
        .contact-container,
        .logout-container,
        .pushchecking {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
      }
    }

    .check-right {
      flex: 1;
      gap: 10px;

      .profile-photo {
        width: 300px;
        height: 300px;
        /*border-radius: 50%;*/
        object-fit: cover;
        border: 2px solid #eee;
      }
    }


  }

  h1 {
    color: #2c3e50;
    margin-bottom: 1.5rem;
    font-weight: 600;
    font-size: 1.8rem;
    text-align: center;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid #f0f0f0;
  }

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
}
</style>