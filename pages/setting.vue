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
            <a class="nav-link" href="/history">提出履歴</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" style="color: #000; font-weight:bold;">設定</a>
          </li>
        </ul>
      </nav>
      <div class="windows">
        <transition name="wd">
          <div class="card-body" v-if="window">
            <h2 class="card-title" style="font-weight: bold;">設定</h2>
            <h6 class="card-subtitle mb-4 text-muted">Moodocsの設定です。</h6>
            <transition name="li">
              <table class="table setting_list" v-if="first_menu">
              <tbody>
                <tr class="sethv" @click="logout_messanger()">
                  <td style="width:14px;">
                    <b-icon icon="power"></b-icon>
                  </td>
                  <td>
                    ログアウト
                  </td>
                </tr>
                <tr class="sethv" @click="menu_move_second">
                  <td style="width:14px;">
                    <b-icon icon="power"></b-icon>
                  </td>
                  <td>
                    アカウントの詳細設定　
                  </td>
                </tr>
              </tbody>
              </table>
            </transition>
            <transition name="s_li">
              <table class="table setting_list" v-if="second_menu">
              <tbody>
                <tr class="sethv" @click="menu_move_first">
                  <td style="width:14px;">
                    <b-icon icon="arrow-left"></b-icon>
                  </td>
                  <td>
                    戻る
                  </td>
                </tr>
                <tr class="sethv" @click="changer_name()">
                  <td style="width:14px;">
                    <b-icon icon="at"></b-icon>
                  </td>
                  <td>
                    名前の変更
                  </td>
                </tr>
                <tr class="sethv" @click="changer_mail()">
                  <td style="width:14px;">
                    <b-icon icon="envelope"></b-icon>
                  </td>
                  <td>
                    メールアドレスの変更
                  </td>
                </tr>
                <tr class="sethv" @click="changer_id()">
                  <td style="width:14px;">
                    <b-icon icon="person"></b-icon>
                  </td>
                  <td>
                    IDの変更
                  </td>
                </tr>
                <tr class="sethv" @click="changer_pass()">
                  <td style="width:14px;">
                    <b-icon icon="lock-fill"></b-icon>
                  </td>
                  <td>
                    パスワードの変更
                  </td>
                </tr>
              </tbody>
              </table>
            </transition>
          </div>
        </transition>
      </div>
    </div>
    <transition name="dialog">
      <div class="dialog" v-if="dialog">
        <DialogData 
        @close="dialog = false"
        @logout="logout"
        @name="name_change"
        @id="id_change"
        @pass="pass_change"
        @mail="mail_change"
        ref="dialogs" 
        />
      </div>
    </transition>
  </div>
</template>

<script>
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
            dialog: false,
            first_menu: true,
            second_menu: false
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
        menu_move_first(){
          this.second_menu = false
          setTimeout(() => {
            this.first_menu = true
          }, 500);
        },
        menu_move_second(){
          this.first_menu = false
          setTimeout(() => {
            this.second_menu = true
          }, 500);
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
        changer_name(){
          this.dialog = true
          setTimeout(() => {
            this.$refs.dialogs.content('form','名前の変更','名前を変更します。',0,'name','name')
          }, 40);
        },
        changer_id(){
          this.dialog = true
          setTimeout(() => {
            this.$refs.dialogs.content('form','IDの変更','IDを変更します。',0,'name','id')
          }, 40);
        },
        changer_pass(){
          this.dialog = true
          setTimeout(() => {
            this.$refs.dialogs.content('form','パスワードの変更','パスワードを変更します。',0,'password','pass')
          }, 40);
        },
        changer_mail(){
          this.dialog = true
          setTimeout(() => {
            this.$refs.dialogs.content('form','メールアドレスの変更','メールアドレスを変更します。',0,'name','mail')
          }, 40);
        },
        desc_maxmize(title,comment){
          this.dialog = true
          setTimeout(() => {
            this.$refs.dialogs.content('logs',title,comment)
          }, 40);
        },
        close(){
          this.dialog = false
        },
        logout_messanger(){
          this.dialog = true
          setTimeout(() => {
            this.$refs.dialogs.content('logout','ログアウト','ログアウトしますか？')
          }, 40);
        },
        logout(){
          this.dialog = false
          setTimeout(() => {
            location.href = "/login"
          }, 200);
        },
        name_change(name) {
        const id = localStorage.getItem('login_token')
        const cloud_data = {
          'token':id,
          'new_name': name,
        }
        this.$store.commit('changer/connection')
        setTimeout(() => {
          this.$store.dispatch('changer/change_is_name',cloud_data)
          setTimeout(() => {
            const s = this.$store.getters["changer/connections"]
            console.log(s)
            if (s == 200) {
              const hear_title = '変更が完了しました！'
              const hear_comment = 'あなたの名前です。→ '+ name
              this.dialog = true
              setTimeout(() => {
                this.$refs.dialogs.content('logs',hear_title,hear_comment)
              }, 40);
              this.$store.commit('changer/reset_network')
            } else if (s == 500) {
              const hear_title = 'エラー'
              const hear_comment = 'IT管理者にお問合せください。'
              this.dialog = true
              setTimeout(() => {
                this.$refs.dialogs.content('logs',hear_title,hear_comment)
              }, 40);
              this.$store.commit('changer/reset_network')
            }
          }, 400);
        }, 200);
      },
      id_change(id) {
        const token = localStorage.getItem('login_token')
        const cloud_data = {
          'token':token,
          'new_id': id,
        }
        this.$store.commit('changer/connection')
        setTimeout(() => {
          this.$store.dispatch('changer/change_is_id',cloud_data)
          setTimeout(() => {
            const s = this.$store.getters["changer/connections"]
            console.log(s)
            if (s == 200) {
              const hear_title = '変更が完了しました！'
              const hear_comment = 'あなたのIDです。→ '+ id
              this.dialog = true
              setTimeout(() => {
                this.$refs.dialogs.content('logs',hear_title,hear_comment)
              }, 40);
              this.$store.commit('changer/reset_network')
            } else if (s == 500) {
              const hear_title = 'エラー'
              const hear_comment = 'IT管理者にお問合せください。'
              this.dialog = true
              setTimeout(() => {
                this.$refs.dialogs.content('logs',hear_title,hear_comment)
              }, 40);
              this.$store.commit('changer/reset_network')
            }
          }, 400);
        }, 200);
      },
      mail_change(mail) {
        const token = localStorage.getItem('login_token')
        const cloud_data = {
          'token':token,
          'new_mail': mail,
        }
        this.$store.commit('changer/connection')
        setTimeout(() => {
          this.$store.dispatch('changer/change_is_mail',cloud_data)
          setTimeout(() => {
            const s = this.$store.getters["changer/connections"]
            console.log(s)
            if (s == 200) {
              const hear_title = '変更が完了しました！'
              const hear_comment = 'あなたのメールアドレスです。→ '+ mail
              this.dialog = true
              setTimeout(() => {
                this.$refs.dialogs.content('logs',hear_title,hear_comment)
              }, 40);
              this.$store.commit('changer/reset_network')
            } else if (s == 500) {
              const hear_title = 'エラー'
              const hear_comment = 'IT管理者にお問合せください。'
              this.dialog = true
              setTimeout(() => {
                this.$refs.dialogs.content('logs',hear_title,hear_comment)
              }, 40);
              this.$store.commit('changer/reset_network')
            }
          }, 400);
        }, 200);
      },
      pass_change(pass) {
        const token = localStorage.getItem('login_token')
        const cloud_data = {
          'token':token,
          'new_pass': pass,
        }
        console.log('change')
        this.$store.commit('changer/connection')
        setTimeout(() => {
          this.$store.dispatch('changer/change_is_pass',cloud_data)
          setTimeout(() => {
            const s = this.$store.getters["changer/connections"]
            console.log(s)
            if (s == 200) {
              const hear_title = '変更が完了しました！'
              const hear_comment = 'あなたのパスワードです。→ '+ pass
              this.dialog = true
              setTimeout(() => {
                this.$refs.dialogs.content('logs',hear_title,hear_comment)
              }, 40);
              this.$store.commit('changer/reset_network')
            } else if (s == 500) {
              const hear_title = 'エラー'
              const hear_comment = 'IT管理者にお問合せください。'
              this.dialog = true
              setTimeout(() => {
                this.$refs.dialogs.content('logs',hear_title,hear_comment)
              }, 40);
              this.$store.commit('changer/reset_network')
            }
          }, 400);
        }, 200);
      }
    },
    mounted() {
        this.window = true;
        this.$store.commit("login/connection");
        this.$store.commit('changer/connection')
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
    components: { DialogData }
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
  .bg:after{
    display: block;
    background-color: rgb(0, 0, 0);
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 1000;
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

  .li-enter-active{
    transition: 0.5s;
    transform: translateX(0);
    opacity: 1;
  }
  .li-leave-active{
    transition: 0.5s;
    transform: translateX(-30px);
    opacity: 0;
  }
  .li-enter, .li-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateX(-30px);
  }

  .s_li-enter-active{
    transition: 0.5s;
    transform: translateX(0);
    opacity: 1;
  }
  .s_li-leave-active{
    transition: 0.5s;
    transform: translateX(30px);
    opacity: 0;
  }
  .s_li-enter, .s_li-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateX(30px);
  }

  .tableconsoler{
    background-color: rgb(255, 255, 255,0.6);
    overflow: scroll;
    height: 80vh;
  }

  .white-23{
    background-color: rgb(255, 255, 255,0.8);
    width: 230px;
    animation: byeShutter1 1s forwards;
  }

  .setting_list:hover{
    cursor: pointer;
  }

  .sethv:hover{
    color: #005bd2;
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
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid #ccc;
    position: absolute;
    animation: byeShutter2 1s forwards;
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
