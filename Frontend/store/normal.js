export const state = () => ({
    page: 1,
    filters: [],
    showDialog: false,
    normalCategoriesInfo: [],
    contributorCategoriesInfo: [1, 2, 3]
})

export const mutations = {
    
    setPage(state, { page }) {
        state.page = page
    },
    setFilters(state, filters) {
        state.filters = filters
    },
    setDialog(state) {
        state.showDialog = !state.showDialog
    },
    setNormalCategoriesInfo(state, categoriesInfo) {
        if(categoriesInfo) {
            console.log(categoriesInfo, 'nnnnnnnnnnnnnnnn')
            state.normalCategoriesInfo = categoriesInfo
            
        }
    },
    setContributorCategoriesInfo(state, categoriesInfo) {
        if(categoriesInfo) {
            console.log(categoriesInfo, 'fffffffffffffff')
            state.contributorCategoriesInfo = categoriesInfo
        }
    }
}

export const actions = {
    setPage({commit, page}) {
        commit('setPage', { page })
    },
    setFilters({commit, filters}) {
        commit('setFilters', filters)
    },
    setDialog({commit}) {
        commit('setDialog')
    },
    setContributorCategoriesInfo({commit, categoriesInfo}) {
        commit('setContributorCategoriesInfo', categoriesInfo)
    },
    setNormalCategoriesInfo({commit, categoriesInfo}) {
        commit('setNormalCategoriesInfo', categoriesInfo)
    }
}