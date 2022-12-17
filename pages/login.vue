<template>
  <div class="bg">
    <div class="card" style="width: 450px; height: 300px; position: absolute; top:0; left: 0; right: 0; bottom: 0; margin:auto;">
      <div class="card-body">
        <h2 class="card-title" style="font-weight: bold;">ログイン</h2>
        <h6 class="card-subtitle mb-4 text-muted">Moodocs</h6>
        <div class="form-floating mb-2">
          <input type="text" class="form-control" placeholder="ユーザーID" v-model="userid">
        </div>
        <div class="form-floating mb-2">
          <input type="password" class="form-control" placeholder="パスワード" v-model="password">
        </div>
        <button type="button" class="btn btn-primary" style="float:right; margin-top:22px;" @click="login()" data-toggle="modal" data-target="#ModalCenter">ログイン</button>
        <button type="button" class="btn btn-link" style="float:right; margin-top:22px;">パスワードを忘れた</button>
      </div>
    </div>
    <transition name="dd">
      <div class="dialog" v-if="load">
        <div class="error-ico" v-if="load_end">
          <img src="/icon/1180.png" class="err">
        </div>
        <div class="d-text">{{ text }}</div>
        <button type="button" class="btn btn-custom" v-if="load_end" @click="dialog_close">OK</button>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'IndexPage',
  data () {
    return {
      userid: '',
      password: '',
      text: '',
      load: false,
      load_end: false
    }
  },
  methods: {
    login() {
      this.load = true
      this.text = "ログインしています。しばらくお待ちください。"
      this.$axios({
        method: 'post',
        url: this.$store.state.login.domain + "/login_mb",
        data: {
          "user":this.userid,
          "pass":this.password
        }
      }).then((res) => {
        if (res.data.status == 200) {
          setTimeout(() => {
            localStorage.setItem('login_token',res.data.random_code)
            this.load = false
            location.href = "/upload"
          }, 1000);
        } else if (res.data.status == 404) {
          setTimeout(() => {
            this.load_end = true
            this.text = "ユーザーIDまたは、パスワードが正しくありません。"
          }, 1000);
        }
      })
    },
    dialog_close(){
      this.load = false
      this.load_end = false
    }
  },
  mounted() {
    this.$store.commit("login/connection")
  }
}
</script>
<style>
  .bg{
    background-image: url("/bg/mot-blur-login.jpg");
    height: 100vh;
  }
  .modal {
    display: block;
  }
  .dialog {
    background-color: rgba(0,0,0,1); transition: 1s;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .d-text{
    color: #fff;
    text-align: center;
    font-size: 26px;
    margin-top: 45vh;
  }
  .dd-enter-active, .dd-leave-active {
    transition: opacity .5s;
  }
  .dd-enter, .dd-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .black{
    background-color: #000;
  }
  .err{
    width: 60px;
    position: absolute;
    top: 0;
    left: 0;
    right: 720px;
    bottom: 53px;
    margin: auto;
  }
  .btn-custom{
    width: 90px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #fff;
    color: #fff;
    position: absolute;
    top: 90px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  .btn-custom:hover{
    color: rgb(235, 235, 235);
  }
</style>
