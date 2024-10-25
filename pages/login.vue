<template>
  <div class="login">
    <div class="background">
      <div class="shape"></div>
      <div class="shape"></div>
    </div>
    <form @submit.prevent="HandleLoginBtnClicked">
      <h1>AGV能源管理系統</h1>
      <h3>用戶登入</h3>

      <label for="username">Username</label>
      <input
        :disabled="IsLogin"
        v-model="user.username"
        type="text"
        placeholder="username"
        id="username"
      />

      <label for="password">Password</label>
      <input
        :disabled="IsLogin"
        v-model="user.password"
        type="password"
        placeholder="Password"
        id="password"
      />
      <span class="text-danger">{{ loginFailMsg }}</span>
      <button v-if="!IsLogin" type="submit" class="bg-primary text-light">Log In</button>
      <button v-else type="submit" class="bg-danger text-light">Log Out</button>
      <div class="social" v-if="false">
        <div class="go">
          <i class="fab fa-google"></i> Google
        </div>
        <div class="fb">
          <i class="fab fa-facebook"></i> Facebook
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      loginFailMsg: ''
    }
  },
  computed: {
    IsLogin() {
      return this.$store.getters['user/IsLogin'];
    }
  },
  methods: {
    async HandleLoginBtnClicked() {

      if (this.IsLogin) {
        await this.$store.dispatch('user/logout');
        this.user.username = this.user.password = '';
        this.$message({
          message: '登出成功',
          type: 'success'
        })
      } else {
        this.loginFailMsg = '';

        if (this.user.username == '') {
          this.loginFailMsg = '請輸入用戶名稱'
          return;
        }

        if (this.user.password == '') {
          this.loginFailMsg = '請輸入密碼'
          return;
        }

        var resObj = await this.$store.dispatch('user/login', this.user);
        console.log(resObj)
        if (resObj.confirm) {
          setTimeout(() => {
            this.$message({
              message: '登入成功',
              type: 'success'
            })
          }, 1000);
          this.$router.push('/');
        } else {
          this.loginFailMsg = resObj.response.response.data;
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.login {
  color: whitesmoke;
  .background {
    width: 430px;
    height: 520px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }
  .background .shape {
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
  }
  .shape:first-child {
    background: linear-gradient(#1845ad, #23a2f6);
    left: -80px;
    top: -80px;
  }
  .shape:last-child {
    background: linear-gradient(to right, #ff512f, #f09819);
    right: -30px;
    bottom: -80px;
  }
  form {
    height: 550px;
    width: 480px;
    background-color: rgba(255, 255, 255, 0.13);
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
    padding: 50px 35px;
  }
  form * {
    font-family: "Poppins", sans-serif;
    color: #ffffff;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
  }
  form h1 {
    font-weight: bold;
    line-height: 42px;
    text-align: center;
    letter-spacing: 4px;
  }
  form h3 {
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
    margin-top: 2rem;
    letter-spacing: 14px;
  }

  label {
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
  }
  input {
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
  }
  ::placeholder {
    color: #e5e5e5;
  }
  button {
    margin-top: 50px;
    width: 100%;
    background-color: #ffffff;
    color: #080710;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
  }
  .social {
    margin-top: 30px;
    display: flex;
  }
  .social div {
    background: red;
    width: 150px;
    border-radius: 3px;
    padding: 5px 10px 10px 5px;
    background-color: rgba(255, 255, 255, 0.27);
    color: #eaf0fb;
    text-align: center;
  }
  .social div:hover {
    background-color: rgba(255, 255, 255, 0.47);
  }
  .social .fb {
    margin-left: 25px;
  }
  .social i {
    margin-right: 4px;
  }
}
</style>
