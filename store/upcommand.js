export const state = () => ({
    page: 0,
    page_length: 1
});

export const mutations = {
    add(state) {
        state.page = state.page + 1
        state.page_length = state.page_length + 1
        return 'OK'
    },
    prev(state) {
        state.page = state.page -1
        return 'OK'
    },
    next(state) {
        state.page = state.page +1
        return 'OK'
    },
    delete(state) {
        state.page = state.page -1
        state.page_length = state.page_length -1
        return 'OK'
    },
    reset(state) {
        state.page = 0
        state.page_length = 1
        return 'OK'
    }
};

export const getters = {
    page (state) {
        return state.page
    },
    page_length (state) {
        return state.page_length
    }
};