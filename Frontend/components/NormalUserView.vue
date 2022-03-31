<template>
    <div>
    <div class="container" />
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-4">
                <div class="box">
                    <div class="left-content">
                        <div class="form-check">
                            <div v-for="category in categoriesList" :key="category.categoryID">
                            <input class="form-check-input" type="checkbox" :value="category.categoryName" id="flexCheckDefault" v-on:change="onCheck($event)">
                            <label class="form-check-label" for="flexCheckDefault">
                                {{category.categoryName}}
                            </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-8">
                <div class="box">
                    <div class="row">
                    
                        <div class="col-lg-4 col-md-6 col-sm-12" v-for="eachCategory in allCategories" :key="eachCategory.id">
                            <div class="right-flex">
                                <img @click="() => patchCategoryInfo(eachCategory)" :src="eachCategory.imageURL">
                                <div class="meta">
                                    <p>Contributor: {{eachCategory.name}}</p>
                                    <p>Image Name: {{eachCategory.imageName}}</p>
                                    <p>Total Downloads: {{eachCategory.downloads}}</p>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                    <Pagination />
                </div>
            </div>
        </div>
    </div>
    <div v-if="dialog">
        <DownloadImage :categoryInfo='categoryInfo' />
    </div>
    </div>
</template>

<script>
    import DownloadImage from './DownloadImage.vue';
    import Pagination from './Pagination';
    import { mapState } from 'vuex'

    export default {
        name: 'Normal',
        components: {
            DownloadImage,
            Pagination
        },
        computed: mapState({
            pagination: state => state.normal.page,
            title: state => state.setHeader.title,
            allCategories: state => state.normal.normalCategoriesInfo,
            dialog: state => state.normal.showDialog
        }),
        data() {
            return {
                filter: [],
                categoriesList: [],
                categoryInfo: {}
            }
        },
        methods: {
            setFilters(data) {
                this.$store.commit('normal/setFilters', data)
            },
            setNormalCategoriesInfo(data) {
                this.$store.commit('normal/setNormalCategoriesInfo', data)
            },
            handleShow() {
                this.$store.commit('normal/setDialog')
            },
            handleClick() {
                if(this.dialog) {
                    this.dialog = false
                } else {
                    this.dialog = true
                }
            },
            patchCategoryInfo(data) {
                
                this.categoryInfo = {
                    id: data.id,
                    img: data.imageURL,
                    downloads: data.downloads
                };
                this.handleShow();
            },
            onCheck(event) {
                var value = event.target.value;
                if(this.filter.includes(value))
                    this.filter.splice(this.filter.indexOf(value), 1);
                else
                    this.filter.push(value);

                this.fetchCategories();
                this.setFilters(this.filter);
            },
            async fetchCategories() {
                let allCategoriesList = await this.$axios.get('/getAllCategories', {
                    params: {
                        filter: JSON.stringify(this.filter),
                        pagination: this.pagination
                    }
                });
                if(allCategoriesList.status == 200) {
                    this.setNormalCategoriesInfo(allCategoriesList.data);
                }
            },
        },
        async mounted() {
            let categoriesList = await this.$axios.get('/getCategoryList');
            if(categoriesList.status == 200) {
                this.categoriesList = categoriesList.data
            }
            this.fetchCategories();
        }
       
    }
</script>

<style scoped>

    .container {
        margin-top: 18px;
    }

    .box {
        display: flex;
        flex-direction: column;
        height: 80vh;
        margin: 14px;
        border: 1px solid black;
    }

    .left-content-menu {
        background-color: rgb(214, 214, 214);
        border-bottom: 1px solid grey;
        padding: 8px;
        padding-left: 34px;
        
    }
    h2 {
        margin-left: 0;
        padding-top: 8px;
        
    }
    .left-download {
        margin-left: 18px;
        margin-right: auto;
        text-align: left;
        font-size: xx-large;
    }
    .left-content {
        padding: 18px;
        text-align: left;
    }
    
    .right-form {
        width: 50%;
        padding-left: 28px;
    }
    label {
        font-size: larger;
    }

    #uname {
        height: 38px;
    }

    .raw-btn {
        display: flex;
        flex-direction: column;
        padding: 0;
    }

    .menu-btn {
        width: 100%;
        background-color: white;
        border-bottom: 1px solid grey;
        padding: 0;
        margin-top: 0;
        margin-bottom: 0;
    }

    .menu-btn:active {
        background-color: rgb(212, 212, 212);
    }

    .right-flex {
        padding: 12px;
        padding-top: 30px;
        display: flex;
        flex-direction: column;
    }

    .meta {
        margin: 2px;
        margin-left: 30px;
        margin-top: 16px;
    }
    .meta p {
        font-size: small;
        margin: 2px;
    }

    dialog {
        position: absolute;
        width: 350px;
        z-index: 9;
        top: 20vh;
        left: 0;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    dialog img {
        width: 200px;
        height: 180px;
    }
    dialog button {
        width: fit-content;
    }
    img {
        width: 80%;
        height: 18vh;
        margin: auto;
    }

</style>