
export const state = () => ({
    status: 0,
    mail: '',
    fix: '',
    id: '',
    name: '',
    due: '',
    server_org: 'pc',
    domain: '',
    wb_domain: '',
    entrance: 0,
    timing:0
});

export const mutations = {
    login_mut(state,data) {
        state.status = 200
        state.name = data.name
        state.id = data.id
        state.mail = data.email
        state.due = data.due
        state.fix = data.fix
    },
    entrance_login(state){
        state.entrance = 1
    },
    login_fail(state){
        state.status = 404
    },
    change_name(state,name) {
        state.name = name
    },
    change_id(state,id) {
        state.id = id
    },
    change_mail(state,mail) {
        state.mail = mail
    },
    timing_update(state) {
        state.timing = 1
    },
    connection(state){
        if (state.server_org == "server") {
            state.domain = "https://moodocs.ant-group2022.com/apps/public/api"
            state.wbdomain = "https://moodocs.ant-group2022.com/apps/public"
        } else if (state.server_org == "pc") {
            state.domain = "http://localhost:8000/api"
            state.wbdomain = "http://localhost:8000"
        }
    }
};

export const actions = {
    domain({state}) {
        return state.domain
    }
};

export const getters = {
    name (state) {
        return state.name
    },
    mail (state) {
        return state.mail
    },
    id (state) {
        return state.id
    },
    due (state) {
        return state.due
    },
    server (state) {
        return state.server_org
    },
    domain (state) {
        return state.domain
    },
    status (state) {
        return state.status
    },
};