export const state = () => ({
    status: 200,
    domain: '',
    server_org: 'server',
    connecting_status: 0
});

export const mutations = {
    connection(state){
        if (state.server_org == "server") {
            state.domain = "https://moodocs.ant-group2022.com/apps/public/api"
        } else if (state.server_org == "pc") {
            state.domain = "http://localhost:8000/api"
        }
    },
    status_output_ok(state) {
        state.connecting_status = 200
    },
    status_output_ng(state) {
        state.connecting_status = 500
    },
    reset_network(state) {
        state.connecting_status = 0
    }
 };

export const actions = {
    change_is_name({ commit,state },{ token,new_name }) {
        const domain = state.domain
        console.log(new_name)
        return this.$axios({
            method: 'post',
            url: domain + "/change/name",
            data: {
                token:token,
                name:new_name
            }
        }).then((res) => {
            console.log('ok')
            commit('login/change_name', new_name , { root: true })
            setTimeout(() => {
                commit('status_output_ok')
            }, 100);
        }).catch((res) => {
            console.log('Error:' + res)
            setTimeout(() => {
                commit('status_output_ng')
            }, 100);
        })
    },
    change_is_id({ commit,state },{ token,new_id }) {
        const domain = state.domain
        console.log(new_id)
        return this.$axios({
            method: 'post',
            url: domain + "/change/id",
            data: {
                token:token,
                id:new_id
            }
        }).then((res) => {
            console.log('ok')
            commit('login/change_id', new_id , { root: true })
            setTimeout(() => {
                commit('status_output_ok')
            }, 100);
        }).catch((res) => {
            console.log('Error:' + res)
            setTimeout(() => {
                commit('status_output_ng')
            }, 100);
        })
    },
    change_is_mail({ commit,state },{ token,new_mail }) {
        const domain = state.domain
        console.log(new_mail)
        return this.$axios({
            method: 'post',
            url: domain + "/change/email",
            data: {
                token:token,
                mail:new_mail
            }
        }).then((res) => {
            console.log('ok')
            commit('login/change_mail', new_mail , { root: true })
            setTimeout(() => {
                commit('status_output_ok')
            }, 100);
        }).catch((res) => {
            console.log('Error:' + res)
            setTimeout(() => {
                commit('status_output_ng')
            }, 100);
        })
    },
    change_is_pass({ commit,state },{ token,new_pass }) {
        const domain = state.domain
        console.log(new_pass)
        return this.$axios({
            method: 'post',
            url: domain + "/change/password",
            data: {
                token:token,
                password:new_pass
            }
        }).then((res) => {
            console.log('ok')
            setTimeout(() => {
                commit('status_output_ok')
            }, 100);
        }).catch((res) => {
            console.log('Error:' + res)
            setTimeout(() => {
                commit('status_output_ng')
            }, 100);
        })
    }
};

export const getters = {
    connections(state) {
        return state.connecting_status
    }
};
