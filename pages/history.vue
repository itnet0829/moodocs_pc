<template>
  <div class="bg">
    <nav class="navbar navbar-light bg-light border-bottom headers">
      <div class="container-fluid">
        <a class="navbar-brand">Moodocs v1.0.0</a>
      </div>
    </nav>
    <div class="d-flex flex-row w-100" style="height: calc(100% - 50px);">
      <nav class="white-23">
        <ul class="nav flex-column m-0 p-3">
          <li class="nav-item">
            <a class="nav-link" href="/upload">アップロード</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" style="color: #000; font-weight:bold;">提出履歴</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/setting">設定</a>
          </li>
        </ul>
      </nav>
      <div class="windows">
        <transition name="wd">
          <div class="card-body" v-if="window">
            <h2 class="card-title" style="font-weight: bold;">ファイルの提出履歴</h2>
            <h6 class="card-subtitle mb-4 text-muted">Moodocsで提出したファイル履歴です。</h6>
            <HistoryData @desc="desc_maxmize" class="tableconsoler" />
          </div>
        </transition>
      </div>
    </div>
    <transition name="dialog">
      <div class="dialog" v-if="dialog">
        <DialogData 
        @close="dialog = false"
        ref="dialogs" 
        />
      </div>
    </transition>
  </div>
</template>

<script>
import HistoryData from '../components/HistoryData.vue'
import DialogData from '../components/DialogData.vue'


export default {
    name: "IndexPage",
    data() {
        return {
            userid: "",
            password: "",
            text: "",
            load: false,
            load_end: false,
            window: false,
            dialog: false
        };
    },
    methods: {
        login() {
            this.load = true;
            this.text = "ログインしています。しばらくお待ちください。";
            this.$axios({
                method: "post",
                url: this.$store.state.login.domain + "/login_mb",
                data: {
                    "user": this.userid,
                    "pass": this.password
                }
            }).then((res) => {
                if (res.data.status == 200) {
                    setTimeout(() => {
                        location.href = "/";
                    }, 1000);
                }
                else if (res.data.status == 404) {
                    setTimeout(() => {
                        this.load_end = true;
                        this.text = "ユーザーIDまたは、パスワードが正しくありません。";
                    }, 1000);
                }
            });
        },
        hover(display) {
            if (display == "enabled") {
                this.hv.hv1 = true;
                console.log("true");
            }
            else if (display == "disabled") {
                this.hv.hv1 = false;
                console.log("false");
            }
        },
        desc_maxmize(title,comment){
          this.dialog = true
          setTimeout(() => {
            this.$refs.dialogs.content('logs',title,comment)
          }, 40);
        },
        close(){
          this.dialog = false
        }
    },
    mounted() {
        this.window = true;
        this.$store.commit("login/connection");
        if (localStorage.getItem('login_token')) {
          this.$axios({
            method: 'post',
            url: this.$store.state.login.domain + "/check",
            data: {
              "session_code":localStorage.getItem('login_token')
            }
          }).then((res) => {
            if (res.data.status == 200) {
              var data = {
                "name":res.data.name,
                "id":res.data.id,
                "mail":res.data.email,
                "due":res.data.due,
                "fix":res.data.fix
              }
              this.$store.commit("login/login_mut",data)
              this.name = this.$store.state.login.name
            } else if (res.data.status == 404) {
              location.href = "/login"
            }
          })
        } else {
          location.href = "/login"
        }
    },
    components: { HistoryData,DialogData }
}
</script>
<style>
  .bg{
    background-image: url("../static/bg/requio.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    overflow: hidden;
  }
  .dialog-enter-active{
    transition: 0.5s;
    opacity: 1;
  }
  .dialog-leave-active{
    transition: 0.5s;
    opacity: 0;
  }
  .dialog-enter, .dialog-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .tableconsoler{
    background-color: rgb(255, 255, 255,0.6);
    overflow: scroll;
    height: 80vh;
  }

  .white-23{
    background-color: rgb(255, 255, 255,1);
    animation: byeShutter1 1s forwards;
    width: 230px;
  }

  .shutter{
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background-color:#ffffff;
    z-index:0;
    animation: byeShutter 1s forwards;
  }

  .headers{
     /* animation: headOpen 1s ease forwards;
    animation-delay: 3s;
    transform: translateY(-100px); */
    background-color: #fff;
  }

  .windows{
    background-color: rgba(255, 255, 255, 1);
    animation: byeShutter2 1s forwards;
    border: 1px solid #ccc;
    position: absolute;
    top: 56px;
    left: 230px;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  .wd-enter-active, .wd-leave-active {
    animation: headOpens_wd 0.5s ease forwards;
  }

  @keyframes open_ds {
    0% {
      opacity: 0;
      transform: scale(0.7,0.7);
    }
    100% {
      opacity: 1;
      transform: scale(1,1);
    }
  }

  @keyframes close_ds {
    0% {
      opacity: 1;
      transform: scale(1,1);
    }
    100% {
      opacity: 0;
      transform: scale(0.7,0.7);
    }
  }

  @keyframes headOpen {
    0% {
      transform: translateY(-100px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @keyframes headOpens_wd {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes byeShutter1 {
    0% {
      background-color: rgba(255,255,255,1);
    }
    100% {
      background-color: rgba(255,255,255,0.8);
    }
  }

  @keyframes byeShutter2 {
    0% {
      background-color: rgba(255,255,255,1);
    }
    100% {
      background-color: rgba(255,255,255,0.9);
    }
  }

  @keyframes shutterOpen {
  0% {
    width: 0;
    height: 1px;
  }
  50% {
    width: 100%;
    height: 1px;
  }
  90% {
    width: 100%;
    height: 100%;
  }
  100% {
    width: 100%;
    height: 100%;
  }
  }

  
</style>
