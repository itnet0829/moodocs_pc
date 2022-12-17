<template>
    <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close_btn" v-if="saver == 'normal' || saver == 'delete' || saver == 'logout'">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p style="white-space: pre-wrap;">{{ message }}</p>
                    <div v-if="saver == 'bar'">
                        <div class="progress">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" :style="('width:'+data+'%')" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <div v-if="saver == 'form'">
                        <input :type="type" class="form-control" id="exampleFormControlInput1" v-model="inputname">
                    </div>
                </div>
                <div class="modal-footer">
                    <div v-if="saver == 'normal'">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close_btn">キャンセル</button>
                        <button type="button" class="btn btn-primary" @click="upload_preparing">YES!!</button>
                    </div>
                    <div v-if="saver == 'form'">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close_btn">キャンセル</button>
                        <button type="button" class="btn btn-primary" @click="data_change(datas)">OK!!</button>
                    </div>
                    <div v-if="saver == 'logout'">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close_btn">キャンセル</button>
                        <button type="button" class="btn btn-primary" @click="logout">YES!!</button>
                    </div>
                    <div v-if="saver == 'logs'">
                        <button type="button" class="btn btn-primary" @click="close_btn">OK</button>
                    </div>
                    <div v-if="saver == 'delete'">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close_btn">キャンセル</button>
                        <button type="button" class="btn btn-danger" @click="delete_page">削除する</button>
                    </div>
                    <div v-if="saver == 'bar'">
                        <p class="percentage">{{ data }}%</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name:'dialog',
        data(){
            return{
                title: '',
                message: '',
                saver: '',
                data: 0,
                type: '',
                datas: '',
                inputname: ''
            }
        },
        methods: {
            content(script,title,message,data,type,datas){
                this.saver = script
                this.title = title
                this.message = message
                if(data){
                    this.data = this.data + Math.trunc(data)
                } else if (type && datas) {
                    this.type = type
                    this.datas = datas
                    console.log(this.datas)
                }
            },
            close_btn(){
                this.$emit('close')
            },
            delete_page(){
                this.$emit('deletepage')
            },
            upload_preparing(){
                this.$emit('upload')
            },
            logout(){
                this.$emit('logout')
            },
            data_change(form){
                console.log(form)
                setTimeout(() => {
                    if (form == 'mail') {
                        this.$emit('mail',this.inputname)
                        this.close_btn()
                    } else if (form == 'name') {
                        this.$emit('name',this.inputname) 
                        this.close_btn()
                    } else if (form == 'id') {
                        this.$emit('id',this.inputname)
                        this.close_btn()
                    } else if (form == 'pass') {
                        this.$emit('pass',this.inputname)
                        this.close_btn()
                    }
                }, 10);
            }
        }
    }
</script>

<style>
    .modal{
        display: block;
    }
    .bar{
        width: 100%;
        height: 30px;
        background-color: #f00;
    }
    .percentage{
        font-size: 24px;
    }
</style>