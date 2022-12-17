<template>
    <div class="file-board">
      <div class="accordion" id="accordionExample">
        <div class="card" v-for="(i,index) in file">
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse" aria-expanded="true" aria-controls="collapse" @click="page = index">
                {{ '#'+ i.id + '. ' +i.displayname }}
              </button>
            </h5>
            <button class="btn btn-link closebtn" type="button" @click="delete_page(index)" v-if="page == index">
                <b-icon icon="x-lg"></b-icon>
            </button>
          </div>
          <div id="collapse" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample" v-if="page == index">
            <div class="card-body">
              <div class="file-data-big" 
                @click="upload_click()"
                @dragover.prevent = "fs = true"
                @dragleave.prevent = "fs = false"
                @drop.prevent = "drop"
              >
              <div class="file_active" v-if="!fs && !dropped">
                <b-icon icon="cloud-upload" class="file-plus"></b-icon>
                <p style="width:100%; text-align:center; margin-top: 14px; font-weight:bold;">ファイルをここにドラック&ドロップ。または、ここをクリック</p>
              </div>
              <div class="file_active" v-if="fs">
                <b-icon icon="file-earmark-plus-fill" class="file-plus"></b-icon>
                <p style="width:100%; text-align:center; margin-top: 14px; font-weight:bold;">ファイルをここにドロップしてください。</p>
              </div>
              <div class="dropped" v-if="dropped">
                <b-icon icon="file-earmark-check-fill" class="file-plus" style="color:#00cc00;"></b-icon>
                <p style="width:100%; text-align:center; margin-top: 14px; font-weight:bold;">{{ i.filename }} / {{ i.megabyte }}</p>
              </div>
              <input
                            style="display: none"
                            ref="upload"
                            type="file"
                            accept="application/pdf"
                            @change="drop"
              >
              </div>
            </div>
            <table class="table">
              <tbody>
                <tr>
                  <th scope="row">会社名</th>
                  <td colspan="3">
                    <select class="form-control" v-model="i.company">
                      <option v-for="com in itemData">{{ com }}</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">請求金額</th>
                  <td colspan="3"><input type="number" class="form-control" id="exampleFormControlInput1" placeholder="350000" v-model="i.price"></td>
                </tr>
                <tr>
                  <th scope="row">請求期限</th>
                  <td>
                    <select class="form-control" v-model="i.due.year">
                      <option v-for="dueyear in itemyear">{{ dueyear }}年</option>
                    </select>
                  </td>
                  <td>
                    <select class="form-control" v-model="i.due.month">
                      <option v-for="duemon in itemmonths">{{ duemon }}月</option>
                    </select>
                  </td>
                  <td>
                    <select class="form-control" v-model="i.due.day">
                      <option v-for="dueday in itemmonths">{{ dueday }}日</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">請求日</th>
                  <td>
                    <select class="form-control" v-model="i.upload_date.year">
                      <option v-for="dueyear in itemyear">{{ dueyear }}年</option>
                    </select>
                  </td>
                  <td>
                    <select class="form-control" v-model="i.upload_date.month">
                      <option v-for="duemon in itemmonths">{{ duemon }}月</option>
                    </select>
                  </td>
                  <td>
                    <select class="form-control" v-model="i.upload_date.day">
                      <option v-for="dueday in itemmonths">{{ dueday }}日</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">メッセージ</th>
                  <td colspan="3"><textarea class="form-control" id="exampleFormControlTextarea1" rows="5" style="resize: none;" v-model="i.message"></textarea></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">
              <button class="btn btn-link btn-cus" type="button" data-toggle="collapse" @click="File_add">
                <b-icon icon="plus-lg" class="add"></b-icon><p>新しい請求書を追加する</p>
              </button>
            </h5>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
    export default{
        name:'filecenter',
        data () {
            return {
                itemData: ['会社を選択','電気校','合同会社ANT','ANT AGENT','INF','千万事屋レイ','Subir','将軍','other'],
                page: 0,
                itemday: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
                itemmonths: [1,2,3,4,5,6,7,8,9,10,11,12],
                itemyear: [2022,2023],
                fs: false,
                activation: 0,
                dropped: false,
                images: true,
                file: [],
                DisplayCompany: '',
                DisplayPrice: '',
                DisplayDue: {
                  year: '',
                  month: '',
                  day: ''
                },
                DisplayUpload_Date: {
                  year: '',
                  month: '',
                  day: ''
                },
                DisplayMessage: '',
                val: {
                  f1: '',
                  f2: '',
                  f3: '',
                  f4: '',
                  f5: '',
                }
            }
        },
        methods: {
            upload_click(){
              this.$refs.upload[0].click()
            },
            activate(id){
              this.activation = id
              this.page = id-1
            },
            drag(){
              console.log(2)
              this.fs = true
              this.dropped = false
            },
            dragleave(){
              console.log(1)
              this.fs = false
            },
            drop(e){

              try{
                const file = e.target.files || e.dataTransfer.files;
                this.file[this.page].filename = file[0].name
                this.file[this.page].displayname = file[0].name
                this.file[this.page].megabyte = this.fileSizeUnit(file[0].size)
                this.file[this.page].fs = "YES"
                this.fs = false
                this.dropped = true
                this.images = false
                this.$emit('parent')
                const reader = new FileReader()
                reader.readAsDataURL(file[0])
                reader.onload = () => {
                  this.file[this.page].base64pdf = reader.result
                }
              } catch (e) {
                console.log('Error:'+e)
              }
            },
            logined_preparing() {
            var S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            var N=16
            if (this.$store.state.login.status == 200) {
                this.file.push({
                    'id': this.file.length+1,
                    'random_code': Array.from(Array(N)).map(()=>S[Math.floor(Math.random()*S.length)]).join(''),
                    'string_random_code':'',
                    'filename':'',
                    'displayname':'請求書ファイル',
                    'megabyte':'',
                    'fs':'NO',
                    'name':this.$store.state.login.name,
                    'company':'',
                    'price': '',
                    'login_token':localStorage.getItem('login_token'),
                    'due':{
                        'year':'',
                        'month':'',
                        'day':''
                    },
                    'upload_date': {
                        'year':'',
                        'month':'',
                        'day':''
                    },
                    'message':'',
                    'base64pdf':''
                })
                console.log(this.$store.state.login.status)
                console.log(this.file)
            } else if (this.$store.state.login.status == 404) {
              console.log("error")
            }
          },
          File_add(){
            var S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            var N=16
            this.file.push({
                    'id': this.file.length+1,
                    'random_code': Array.from(Array(N)).map(()=>S[Math.floor(Math.random()*S.length)]).join(''),
                    'string_random_code':'',
                    'filename':'',
                    'displayname':'請求書ファイル',
                    'megabyte':'',
                    'fs':'NO',
                    'name':this.$store.state.login.name,
                    'company':'',
                    'price': '',
                    'login_token':localStorage.getItem('login_token'),
                    'due':{
                        'year':'',
                        'month':'',
                        'day':''
                    },
                    'upload_date': {
                        'year':'',
                        'month':'',
                        'day':''
                    },
                    'message':'',
                    'base64pdf':''
            })
            this.$store.commit("upcommand/add")
            this.page = this.$store.state.upcommand.page
            console.log(this.file)
            this.activate(this.file.length)
            this.dropped = false
            this.images = true
            this.val.f1 = ''
            this.val.f2 = ''
            this.val.f3 = ''
            this.val.f4 = ''
            this.val.f5 = ''
          },
          File_Prev(){
            this.page = this.$store.state.upcommand.page
            this.current_page()
          },
          File_Next(){
            this.page = this.$store.state.upcommand.page
            this.current_page()
          },
          current_page(){
            this.val.f1 = ''
            this.val.f2 = ''
            this.val.f3 = ''
            this.val.f4 = ''
            this.val.f5 = ''
            this.DisplayCompany = this.file[this.page].company
            this.DisplayPrice = this.file[this.page].price
            this.DisplayDue.year = this.file[this.page].due.year
            this.DisplayDue.month = this.file[this.page].due.month
            this.DisplayDue.day = this.file[this.page].due.day
            this.DisplayUpload_Date.year = this.file[this.page].upload_date.year
            this.DisplayUpload_Date.month = this.file[this.page].upload_date.month
            this.DisplayUpload_Date.day = this.file[this.page].upload_date.day
            this.DisplayMessage = this.file[this.page].message
            if (this.file[this.page].fs == "YES") {
                this.dropped = true
                this.images = false
            } else if (this.file[this.page].fs == "NO") {
              this.dropped = false
              this.images = true
            }
          },
          fileSizeUnit (size) {
            const kb = 1024
            const mb = Math.pow(kb, 2)
            const gb = Math.pow(kb, 3)
            const tb = Math.pow(kb, 4)
            const pb = Math.pow(kb, 5)
            const round = (size, unit) => {
              return Math.round(size / unit * 100.0) / 100.0
            }
          

            if (size >= pb) {
              return round(size, pb) + 'PB'
            } else if (size >= tb) {
              return round(size, tb) + 'TB'
            } else if (size >= gb) {
              return round(size, gb) + 'GB'
            } else if (size >= mb) {
              return round(size, mb) + 'MB'
            } else if (size >= kb) {
              return round(size, kb) + 'KB'
            }
            return size + 'バイト'
          },
          delete_page(id){
            const file_after = this.file.splice(id,1)
            this.$store.commit("upcommand/delete")
            this.page = this.$store.state.upcommand.page
          },
          data_check(array_number){
            const arn = array_number
            let val = 1
            let words = ""
            if (!this.file[arn].company) {
              this.val.f1 = '#ffcccc'
              val = 0
              words += "[エラー01]:"+(arn+1)+"ページの会社名が選択されていません。\n"
            } 
            if (!this.file[arn].price) {
              this.val.f2 = '#ffcccc'
              val = 0
              words += "[エラー02]:"+(arn+1)+"ページの請求金額を入力してください。\n"
            } 
            if (!this.file[arn].due.year || !this.file[arn].due.month || !this.file[arn].due.day) {
              this.val.f3 = '#ffcccc'
              val = 0
              words += "[エラー03]:"+(arn+1)+"ページの請求期限を入力してください。\n"
            } 
            if (!this.file[arn].upload_date.year || !this.file[arn].upload_date.month || !this.file[arn].upload_date.day) {
              this.val.f4 = '#ffcccc'
              val = 0
              words += "[エラー04]:"+(arn+1)+"ページの請求書発行日を入力してください。\n"
            } 
            if (!this.file[arn].message){
              this.val.f5 = '#ffcccc'
              val = 0
              words += "[エラー05]:"+(arn+1)+"ページのメッセージを入力してください。\n"
            }

            return [val,words]
          },
          files(){
            return this.file
          },
          reset(){
            this.file = []
            this.$store.commit('upcommand/reset')
            this.logined_preparing()
            this.current_page()
          }
        },
        mounted() {
          this.$store.commit("login/connection")
          setTimeout(() => {
            this.logined_preparing()
          }, 100);
        }
    }
</script>
<style>
  .file-board{
    width: 99.8%;
    height: 570px;
  }

  .invaild{
    color: red;
    font-size: 12px;
  }

  .file-plus{
    font-size: 110px;
    width: 100%;
    margin: 0 auto;
    margin-top: 25px;
  }

  .closebtn{
    position: absolute;
    right: 0;
    top:12px;
    color: red;
    margin: auto;
  }

  .file-data-big{
    border : 1px solid #999;
    border-radius: 20px;
    width: 500px;
    height: 200px;
    margin: 0 auto;
    margin-top: 10px;
  }

  .text{
    width: 500px;
  }

  .desc_t{
    margin-top: -190px;
    text-align: center;
    font-size: 19px;
    font-weight: bold;
  }

  .desc_s{
    text-align: center;
    font-size: 19px;
    font-weight: bold;
  }

  .desc_dped{
    text-align: center;
    font-size: 25px;
    font-weight: bold;
  }

  .file-description{
    float: right;
    font-size: 20px;
    margin-top: -560px;
    margin-right: 20px;
  }

  .square-wak{
    width: 300px;
    height: 300px;
    border: 22px solid #0f0;
    margin: 0 auto;
    margin-top: 90px;
    animation: greenflash 0.5s infinite;
  }

  .paperfile{
    width: 500px;
    font-size: 14px;
    margin-top: -600px;
    animation: pdfdrop 1s infinite;
  }

  .paperfile_drop{
    width: 500px;
    font-size: 14px;
    margin-top: 0px;
    animation: pdfdrop_droped 1s infinite;
  }

  .btn-cus{
    width: 100%;
    margin: 0 auto;
  }

  @keyframes pdfdrop {
    0%{
      opacity: 0;
      transform: translate(0);
    }
    50%{
      opacity: 1;
      transform: translateY(120px);
    }
    100%{
      transform: translateY(120px);
      opacity: 0;
    }
  }

  @keyframes pdfdrop_droped {
    0%{
      transform: scale(1.2,1.2)
    }
    50%{
      transform: scale(1,1);
    }
    100%{
      transform: scale(1.2,1.2)
    }
  }

  @keyframes greenflash {
    0%{
      opacity: 0;
    }
    50%{
      opacity: 1;
    }
    100%{
      opacity: 0;
    }
  }

  @keyframes upper {
    0% {
      transform: translateY(10px);
    }
    50%{
      transform: translateY(-60px);
    }
    100%{
      transform: translateY(10px);
    }
  }

  @keyframes xmove {
    0% {
      transform: translateX(0px);
    }
    50%{
      transform: translateX(-110px);
    }
    100%{
      transform: translateX(0px);
    }
  }

  @keyframes xmove-r {
    0% {
      transform: translateX(0px);
    }
    50%{
      transform: translateX(150px);
    }
    100%{
      transform: translateX(0px);
    }
  }

  @keyframes xmove-sub {
    0% {
      transform: translateX(0px);
    }
    25%{
      transform: translateX(110px);
    }
    50%{
      transform: translateX(-120px);
    }
    75%{
      transform: translateX(30px);
    }
    100%{
      transform: translateX(0px);
    }
  }
</style>