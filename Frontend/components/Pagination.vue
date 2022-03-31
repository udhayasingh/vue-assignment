<template>
    <div class="pagin">
        <p>Paginations:</p>
        <nav>
        <ul class="pagination pagination-sm justify-content-end">
            <li :class="currentPage === 1 ? 'page-item active' : 'page-item'">
            <a class="page-link" @click="() => setCurrentPage(1)" value="1">1</a>
            </li>
            <li :class="currentPage === 2 ? 'page-item active' : 'page-item'"><a class="page-link" @click="() => setCurrentPage(2)" value="2">2</a></li>
            <li :class="currentPage === 3 ? 'page-item active' : 'page-item'"><a class="page-link" @click="() => setCurrentPage(3)" value="3">3</a></li>
        </ul>
        </nav>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    export default {
        name: 'Pagination',
        computed: mapState({
            filters: state => state.normal.filters
        }),
        data() {
            return {
                currentPage: 1
            }
        },
        methods: {

            ...mapActions('normal', [
                'setPage',
            ]),
            setContributorCategoriesInfo(data) {
                this.$store.commit('normal/setContributorCategoriesInfo', data)
            },
            setNormalCategoriesInfo(data) {
                this.$store.commit('normal/setNormalCategoriesInfo', data)
            },
            async setCurrentPage(page) {
                this.currentPage = page
                this.setPage(this.currentPage)
                let userRole = (localStorage.userDetails && JSON.parse(localStorage.userDetails).role) ?
                                JSON.parse(localStorage.userDetails).role : null;
                if(userRole === 'normal') {
                    let normalCategories = await this.$axios.get('/getAllCategories', {
                        params: {
                            filter: JSON.stringify(this.filters),
                            pagination: this.currentPage
                        }
                    });
                    if(normalCategories.status == 200) {
                        this.setNormalCategoriesInfo(normalCategories.data);
                    }
                }
                if(userRole === 'contributor') {
                    let contributorCategories = await this.$axios.get('/getContributorCategory', {
                        params: {
                                pagination: this.currentPage
                        }
                    })
                    if(contributorCategories.status == 200) {
                        this.setContributorCategoriesInfo(contributorCategories.data);
                    }
                }
            },
            getClass() {
                console.log('get')
                if(this.pagination === 3) {
                    return 'page-item active'
                } else if(this.pagination === 2) {
                    return 'page-item active'
                }
            }
        },
    }
</script>


<style scoped>
    .green {
        background-color: green;
    }
    .pagin {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: fit-content;
        margin-top: auto;
        bottom: 0;
        margin-bottom: 0;
        padding-top: 4px;
        padding-bottom: 0;
        justify-content: flex-end;        
    }
    .pagin p {
        margin-right: 18px;        
    }
</style>