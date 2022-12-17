<template>
    <div class="scroll">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">会社名</th>
                    <th scope="col">金額</th>
                    <th scope="col">支払期限</th>
                    <th scope="col">発行日</th>
                    <th scope="col">メッセージ</th>
                    <th scope="col">PDF Viewer</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(stl,index) in settinglist[0]">
                    <th scope="row">{{ index+1 }}</th>
                    <td>{{ stl.company }}</td>
                    <td>{{ stl.price }}</td>
                    <td>{{ stl.dates }}</td>
                    <td>{{ stl.due }}</td>
                    <td><button type="button" class="btn btn-link" @click="desc(stl.dates,stl.message)">詳細</button></td>
                    <td><button type="button" class="btn btn-primary" @click="window_open(stl.link_token)">PDFを見る</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default{
        name:'HistoryData',
        data() {
            return {
                grammer: 0,
                settinglist: []
            }
        },
        methods: {
            preparing_data(){
                setTimeout(() => {
                    const fix = this.$store.state.login.fix
                    this.$axios({
                        method: 'post',
                        url: this.$store.state.login.domain + "/hisdata",
                        data: {
                            "fix":fix
                        }
                    }).then((res)=> {
                        this.settinglist.push(res.data.data)
                        console.log(this.settinglist)
                    }).catch((res) => {
                        console.log("error" + res)
                    })
                }, 400);
            },
            desc(date,message){
                this.$emit('desc',date+'のメッセージ内容',message)
            },
            window_open(link_token){
                window.open(this.$store.state.login.wbdomain + "/pdf?link_token=" + link_token,null,'width=500,toolbar=yes,menubar=yes,scrollbars=yes')
            }
        },
        mounted (){
            this.$store.commit("login/connection")
            this.preparing_data()
        }
    }
</script>
<style>
    .scroll{
        height: 100%;
        width: 100%;
        overflow-y: scroll;
    }
</style>