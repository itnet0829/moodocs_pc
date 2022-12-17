<template>
  <div class="bg">
    <transition name="op">
      <div class="shutter" v-if="opening">
        <transition name="op_tt">
          <div class="openingtowelcome" v-if="opening_title">Welcome! {{ name }}</div>
        </transition>
      </div>
    </transition>
    <nav class="navbar navbar-light bg-light border-bottom headers">
      <div class="container-fluid">
        <a class="navbar-brand">Moodocs v1.0.0 (BOOTING...)</a>
      </div>
    </nav>
    <ul class="nav navs headers">
      <li class="nav-item">
        <a class="nav-link active" href="" style="color: #000; font-weight:bold;">アップロード</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="" style="color: #000; font-weight:bold;">提出履歴</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="" style="color: #000; font-weight:bold;">設定</a>
      </li>
    </ul>
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
      load_end: false,
      opening: true,
      opening_title: false,
      name: ''
    }
  },
  methods: {
    dates(){
      var now = new Date()
      var days = ["SUN","MON","TUE","WEN","THU","FRI","SAT"]
      var dates = now.getFullYear() + "/" +  (now.getMonth()+1) + "/" + now.getDate() + " " + days[now.getDay()]
      return dates
    }
  },
  mounted() {
    this.$store.commit("login/connection")
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
          sessionStorage.setItem('loginned_PC',1)
        } else if (res.data.status == 404) {
          location.href="/login"
        }
      })

      if (sessionStorage.getItem('loginned_PC') != 1) {
        this.opening = true
        setTimeout(() => {
          this.opening_title = true
          setTimeout(() => {
            this.opening = false
            setTimeout(() => {
              location.href = "/upload"
            }, 3600);
          }, 1500);
        }, 500);
      } else{
        this.opening = false
        setTimeout(() => {
          location.href = "/upload"
        }, 5000);
      }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@300&display=swap');
  .bg{
    background-image: url("/bg/requio.jpg");
    height: 100vh;
  }
  .shutter{
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background-color:#000000;
    z-index:9999;
  }

  .shutter_cover{
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background-color:#000000;
    z-index:9999;
  }

  .openingtowelcome{
    color: #fff;
    font-size: 60px;
    text-align: center;
    margin-top: 40vh;
    font-family: 'Zen Kaku Gothic New', sans-serif;
  }
  .openingtowelcome-sub{
    color: #fff;
    font-size: 25px;
    text-align: center;
    font-family: 'Zen Kaku Gothic New', sans-serif;
  }

  .op-enter-active, .op-leave-active {
    transition: opacity .5s;
  }
  .op-enter, .op-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .op_tt-enter-active, .op_tt-leave-active {
    transition: opacity .5s;
  }
  .op_tt-enter, .op_tt-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .headers{
    animation: headOpen 1s ease forwards;
    animation-delay: 3s;
    transform: translateY(-100px); 
    background-color: #fff;
  }

  @keyframes headOpen {
    0% {
      transform: translateY(-100px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @keyframes byeShutter {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      display: none;
      z-index: -1;
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
