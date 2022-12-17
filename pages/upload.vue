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
            <a class="nav-link active" href="#" style="color: #000; font-weight:bold;">アップロード</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/history">提出履歴</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/setting">設定</a>
          </li>
        </ul>
      </nav>
      <div class="windows">
        <transition name="wd">
          <div class="card-body" v-if="window">
            <h2 class="card-title" style="font-weight: bold;">ファイルのアップロード</h2>
            <h6 class="card-subtitle mb-4 text-muted">Moodocsに提出する請求書をアップロードしましょう！</h6>
            <div class="head_btn">
              <button type="button" class="btn btn-success cl" :disabled="uploaders" @click="dialog_fileup()">
                <b-icon icon="upload"></b-icon> 提出する
              </button>
            </div>
            <FileCC 
              @parent="upload_unlock"
              ref="upload"
              class="fileconsoler"
            />
          </div>
        </transition>
      </div>
    </div>
    <transition name="dialog">
      <div class="dialog" v-if="dialog">
        <DialogData 
        @close="dialog = false"
        @deletepage="page_delete"
        @upload="file_prepare"
        ref="dialogs" 
        />
      </div>
    </transition>
  </div>
</template>

<script>
  import FileCC from '../components/FileCC.vue'
  import DialogData from '../components/DialogData.vue'
export default {
  name: 'IndexPage',
  data () {
    return {
      userid: '',
      password: '',
      text: '',
      load: false,
      load_end: false,
      window: false,
      uploaders: true,
      page: this.$store.state.upcommand.page,
      page_length: this.$store.state.upcommand.page_length,
      nullfile: false,
      page_prev: true,
      page_next: true,
      page_dl: true,
      dialog: false
    }
  },
  components:{
    FileCC,
    DialogData
  },
  methods: {
    page_delete(){ //重要データ　削除禁止
      this.dialog = false
      this.$refs.upload.delete_page()
      this.page = this.$store.state.upcommand.page
      this.page_length = this.$store.state.upcommand.page_length
      if (this.page == 0){
        this.page_dl = true
        this.page_prev = true
      }
    },
    hover(display) {
      if (display == 'enabled') {
        this.hv.hv1 = true
        console.log('true')
      } else if (display == 'disabled') {
        this.hv.hv1 = false
        console.log('false')
      }
    },
    year_update() {
      const dt = new Date()
      this.itemyears.push(dt.getFullYear())
      this.itemyears.push(dt.getFullYear()+1)
    },
    upload_unlock(){
      this.uploaders = false
    },
    add(){
      this.$refs.upload.File_add()
      this.page = this.$store.state.upcommand.page
      this.page_length = this.$store.state.upcommand.page_length
      this.page_prev = false
      this.page_dl = false
    },
    prev(){
      this.$store.commit("upcommand/prev")
      this.$refs.upload.File_Prev()
      this.page = this.$store.state.upcommand.page
      this.page_length = this.$store.state.upcommand.page_length
      if(this.page+1 < this.page_length) {
        this.page_next = false
        this.page_dl = false
      } else {
        this.page_next = true
      }
      if (this.page == 0){
        this.page_prev = true
        this.page_dl = true
      }
    },
    next(){
      this.$store.commit("upcommand/next")
      this.$refs.upload.File_Next()
      this.page = this.$store.state.upcommand.page
      this.page_length = this.$store.state.upcommand.page_length
      if(this.page+1 == this.page_length) {
        this.page_next = true
        this.page_prev = false
        this.page_dl = false
      } else {
        this.page_next = false
        this.page_prev = false
        this.page_dl = false
      }
    },
    dialog_del(){
      this.dialog = true
      setTimeout(() => {
        this.$refs.dialogs.content("delete","データ削除",this.page+1 + "ページ目のデータを削除します。")
      }, 40);
    },
    dialog_fileup(){
      this.dialog = true
      setTimeout(() => {
        this.$refs.dialogs.content("normal","ファイルアップロード","全てのページのデータをアップロードしますか？")
      }, 40);
    },
    file_prepare(){
      this.dialog = false
      setTimeout(() => {
        this.dialog = true
        setTimeout(() => {
          this.$refs.dialogs.content("bar","ファイルアップロード","ファイルをアップロードするための準備をしています。\nしばらくお待ちください。",0)
          setTimeout(() => {
            this.$refs.dialogs.content("bar","ファイルアップロード","ファイルをアップロードするための準備をしています。\nしばらくお待ちください。",10/this.page_length)
            let i = 0
            let help_k = 0
            while(i < this.page_length){
              console.log('check')
              const data_check = this.$refs.upload.data_check(i)
              if (data_check[0] == 0){
                help_k = 1
                this.dialog = false
                setTimeout(() => {
                  this.dialog = true
                  setTimeout(() => {
                    this.$refs.dialogs.content("logs","⚠️エラー","◆データ内容に不備があります。\n"+data_check[1])
                  }, 40);
                }, 200);
                break
              } else if (data_check[0] == 1) {
                console.log('OK continue' + data_check[0])
                i++
                continue
              }
            }
            if (help_k == 0){
              setTimeout(() => {
              this.$refs.dialogs.content("bar","ファイルアップロード","ファイル情報を取得しています。\nしばらくお待ちください。",20/this.page_length)
              const files = this.$refs.upload.files()
              let j = 0
              let help = 0
              console.log(files)
              while(j < files.length){
                if (files == undefined) {
                  help = 1
                  break
                }
                const data_info = {
                  "name":files[j].name,
                  "company":files[j].company,
                  "price":new Intl.NumberFormat().format(files[j].price),
                  "message":files[j].message,
                  "random_code":files[j].random_code,
                  "due":files[j].due.year.replace('年','') + "-" + files[j].due.month.replace('月','') + "-" + files[j].due.day.replace('日',''),
                  "now":files[j].upload_date.year.replace('年','') + "-" + files[j].upload_date.month.replace('月','') + "-" + files[j].upload_date.day.replace('日',''),
                  "login":files[j].login_token
                }
                this.$refs.dialogs.content("bar","ファイルアップロード","データ情報をサーバーへ送信しています。\nしばらくお待ちください。",25/this.page_length)
                const Q1 = this.data_insert(data_info)
                if (Q1 == 0){
                  help = 1
                  break
                }
                const file_info = {
                  "pdf":files[j].base64pdf,
                  "filename":files[j].filename,
                  "datacode":files[j].random_code,
                  "login_token":files[j].login_token
                }
                this.$refs.dialogs.content("bar","ファイルアップロード","ファイルをサーバーへ送信しています。\nしばらくお待ちください。",25/this.page_length)
                const Q2 = this.file_insert(file_info)
                if (Q2 == 0){
                  help = 1
                  break
                }
                const databases = {
                  "company":files[j].company,
                  "price":new Intl.NumberFormat().format(files[j].price),
                  "message":files[j].message,
                  "due":files[j].due.year.replace('年','') + "-" + files[j].due.month.replace('月','') + "-" + files[j].due.day.replace('日',''),
                  "now":files[j].upload_date.year.replace('年','') + "-" + files[j].upload_date.month.replace('月','') + "-" + files[j].upload_date.day.replace('日',''),
                  "link_token":files[j].random_code,
                  "login":files[j].login_token
                }
                this.$refs.dialogs.content("bar","ファイルアップロード","オーナーへ送信しています。\nしばらくお待ちください。",25/this.page_length)
                const Q3 = this.gas(databases)
                if (Q3 == 0){
                  help = 1
                  break
                }
                j++
              }
              setTimeout(() => {
                this.dialog = false
                if (help == 0) {
                  setTimeout(() => {
                    this.dialog = true
                    setTimeout(() => {
                      this.$refs.dialogs.content("logs","ファイルアップロード","ファイルをアップロードが完了しました。")
                      this.$refs.upload.reset()
                      this.page = this.$store.state.upcommand.page
                      this.page_length = this.$store.state.upcommand.page_length
                    }, 60);
                  }, 100);
                } else if (help == 1){
                  setTimeout(() => {
                    this.dialog = true
                    setTimeout(() => {
                      this.$refs.dialogs.content("logs","アップロードエラー","ファイルをアップロードすることができませんでした。")
                    }, 60);
                  }, 100);
                }
              }, 200);
            }, 200);
          } else if (help_k == 1) {
            console.log('ERR')
          }
          }, 300);
        }, 40);
      }, 500);
    },
    data_insert(data_info){
            this.$axios({
                method: 'post',
                url: this.$store.state.login.domain + "/uploading_data",
                data: data_info
            }).then((res) => {
                const signal = ''
                if (res.data.status == 200) {
                    this.activic_code = res.data.token
                    return 1
                } else if (res.data.status == 404) {
                    this.dialog = false
                    this.$nuxt.$emit('upload', 'エラー','Security check failed.')
                    console.error('ログインに失敗しました。 DATA-CODE')
                    return 0
                }
            }).catch((res) => {
                this.dialog = false
                this.$nuxt.$emit('upload', '通信エラー','管理者にお問い合わせください。')
                return 0
            })
    },
    file_insert(file_info){
            this.$axios({
                method: 'post',
                url: this.$store.state.login.domain + "/uploading_file",
                data: file_info,
                header: {
                    'Content-Type':'application/json'
                }
            }).then((res) => {
                if (res.data.status == 200) {
                    return 1
                } else if (res.data.status == 404) {
                    this.dialog = false
                    this.activic_code = ''
                    this.$nuxt.$emit('upload', 'エラー','Security check failed.')
                    console.error('ログインに失敗しました。 FILE-CODE')
                    return 0
                }
            }).catch((res) => {
                this.dialog = false
                this.$nuxt.$emit('upload', '通信エラー','管理者にお問い合わせください。')
                return 0
            })
    },
    gas (file_info) {

    this.$axios({
      method: 'post',
      url: this.$store.state.login.domain + "/gas",
      data: file_info
    }).then((res) => {
      if (res.data.status == 200) {
        this.$nuxt.$emit('upload', '完了','ファイル提出が完了しました。')
        this.dialog = false
        this.file = []
        this.logined_preparing()
        return 1
      } else if (res.data.status == 404) {
        this.dialog = false
        this.$nuxt.$emit('upload', 'エラー','Security check failed.')
        return 0
      }
    }).catch((res) => {
      this.dialog = false
      this.$nuxt.$emit('workspace', '通信エラー','管理者にお問い合わせください。')
      return 0
    })
    }
  },
  mounted() {
    var userAgent = window.navigator.userAgent.toLowerCase()
    if (
        userAgent.indexOf("iphone") != -1 ||
        userAgent.indexOf("android") != -1 ||
        userAgent.indexOf("mobile") != -1
      ) {
        location.href="https://moodocs-normal.ant-group2022.com"
    } else {
        console.log(true)
    }
    this.$store.commit("login/connection")
    this.window = true

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
  }
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
    animation: open_d 0.4s forwards;
  }
  .dialog-leave-active {
    animation: close_d 0.4s forwards;
  }
  .dialog-enter, .dialog-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: scale(0.7,0.7);
    opacity: 0;
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

  .white-23{
    background-color: rgb(255, 255, 255,0.8);
    width: 230px;
    animation: byeShutter1 1s forwards;
  }

  .fileconsoler{
    background-color: rgb(255, 255, 255,0.6);
    overflow: scroll;
    height: 80vh;
  }

  .dialog{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  .headers{
    /*
    animation: headOpen 1s ease forwards;
    animation-delay: 3s;
    transform: translateY(-100px);*/
    background-color: #fff;
  }

  .windows{
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid #ccc;
    animation: byeShutter2 1s forwards;
    position: absolute;
    top: 56px;
    left: 230px;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  .wd-enter-active, .wd-leave-active {
    transition: opacity .5s;
  }
  .wd-enter, .wd-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .head_btn {
    float: right;
    margin-top: -80px;
  }

  .cl{
    margin: 5px;
  }

  @keyframes headOpen {
    0% {
      opacity: 0;
      transform: translateY(-100px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  @keyframes open_d {
    0% {
      opacity: 0;
      transform: scale(0.7,0.7);
    }
    100% {
      opacity: 1;
      transform: scale(1,1);
    }
  }

  @keyframes close_d {
    0% {
      opacity: 1;
      transform: scale(1,1);
    }
    100% {
      opacity: 0;
      transform: scale(0.7,0.7);
    }
  }

  @keyframes headOpens_wd {
    0% {
      opacity: 0;
      transform: scale(0.8,0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1,1);
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
