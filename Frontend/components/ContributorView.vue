<template>
    <div>
    <div class="container" />
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-4">
                <div class="box">
                    <div class="left-content">
                        <div class="raw-btn">
                            <button :style="[view === 'form' ? {'background-color': 'rgb(214, 214, 214)'} : {'background-color': 'white'}]" @click="setForm" class="menu-btn" id="menu-upload"><p class="left-download">Upload Image</p></button>
                            <button :style="[view === 'table' ? {'background-color': 'rgb(214, 214, 214)'} : {'background-color': 'white'}]" @click="setTable" class="menu-btn" id="menu-download"><p class="left-download">Download Report</p></button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="view === 'form'" class="col-lg-8">
                <div class="box">
                    <form>
                    <div class="right-form">
                        <div class="right-content-menu">
                            <h2>Upload Image</h2>
                        </div>
                        <div class="form-group">
                            <label for="uname">Image Name:</label>
                            <input id="imgName" class="form-control" type="text" v-on:change="onChange($event)" />
                        </div><br/>
                        <div class="form-group">
                            <label for="img">Image:</label>
                            <input style="height: auto;" id="img" class="form-control" type="file" v-on:change="onChange($event)" />
                        </div><br/>
                        
                        <div class="form-group">
                            <label for="category">Category:</label><br/>
                            <select class="classic" name="category" id="category" @click="onChange($event)">
                                <option v-for="category in categories" :key="category.categoryID">{{category.categoryName}}</option>
                            </select>
                        </div><br/>
                        <button v-on:click="addCategory">save</button>
                    </div>
                </form>
                </div>
            </div>
            <div v-if="view === 'table'" class="col-lg-8">
                <div class="box-table">
                    <h3>Download Report</h3>
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <th>Image Name</th>
                                <th>Category</th>
                                <th>Total Downloads</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <p v-for="category in allCategories" :key="category.id">{{category .imageName}}</p>
                                </td>
                                <td>
                                    <p v-for="category in allCategories" :key="category.id">{{category.categoryName}}</p>
                                </td>
                                <td>
                                    <p v-for="category in allCategories" :key="category.id">{{category.downloads}}</p>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                    <Pagination />
                    
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    import Pagination from './Pagination';
    import { mapActions, mapState } from 'vuex';
    export default {
        name: 'Contributor',
        components: {
            Pagination
        },
        computed: mapState({
            pagination: state => state.normal.page,
            title: state => state.setHeader.title,
            allCategories: state => state.normal.contributorCategoriesInfo,
            dialog: state => state.normal.showDialog
        }),
        data() {
            return {
                contributor: {
                    imgName: '',
                    img: '',
                    category: '',
                },
                categories: [],
                view: 'form',
            }
        },
         
        methods: {
            setContributorCategoriesInfo(data) {
                this.$store.commit('normal/setContributorCategoriesInfo', data)
            },
            setTable() {
                this.view = 'table';                
                this.fetchContributorCategories();
                console.log(this.allCategories, 'from store ')
            },
            setForm() {
                this.view = 'form';
            },
            async addCategory() {
                let result = await this.$axios.post('/addCategory', {
                    imgName: this.contributor.imgName,
                    img: this.contributor.img,
                    category: this.contributor.category,
                });

                if(result.status == 201) {
                    alert("Category saved successfully");
                } else {
                    alert("Error! Please try again...");
                }
            },
            async fetchContributorCategories() {
                let result = await this.$axios.get('/getContributorCategory', {
                    params: {
                        pagination: this.pagination
                    }
                })
                if(result.status == 200) {
                    this.setContributorCategoriesInfo(result.data);
                }
                
            },
            onChange(event) {
                this.contributor[event.target.id] = event.target.value;
                console.log(this.contributor)
            }, 
            ...mapActions('setHeader', [
                'setContributor'
            ])
        },
        beforeCreate() {
            
            },
        beforeMount() {
            },
        async mounted() {
            
            this.setContributor()
            this.setContributor()
            let result = await this.$axios.get('/getCategoryList');
            if(result.status == 200) {
                this.categories = result.data
            }
            
        }
    }
</script>

<style scoped>
    
    .container {
        margin-top: 18px;
    }

    .box {
        height: 80vh;
        margin: 14px;
        border: 1px solid black;
    }

    .box-table {
        display: flex;
        flex-direction: column;
        height: 80vh;
        margin: 14px;
        border: 1px solid black;
        padding: 18px;
    }
    .box-table h3 {
        padding-left: 22px;
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

    table th {
        text-align: center;
        border-right: 1px solid black;
        border-bottom: 1px solid black;
        border-top: 1px solid black;
        border: 1px solid black;
    }
    table tbody tr {
        text-align: center;
        height: 58vh;
    }
    table tbody {
        border: 1px solid black;
    }
    table td {
        border-right: 1px solid black;
    }

    .image-wrap{
        border: 1px solid red;
        display: flex;
        flex-direction: column;
    }

    select {
        background-color: white;
        border-radius: 4px;
        display: inline-block;
        font: inherit;
        line-height: 1.5em;
        padding: 0.5em 3.5em 0.5em 1em;
        width: 100%;
        margin: 0;      
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-appearance: none;
        -moz-appearance: none;
    }
    select.classic {
        background-image:
            linear-gradient(45deg, transparent 50%, black 50%),
            linear-gradient(135deg, black 50%, transparent 50%),
            linear-gradient(to right, white, white);
        background-position:
            calc(100% - 20px) calc(1em + 2px),
            calc(100% - 15px) calc(1em + 2px),
            100% 0;
        background-size:
            5px 5px,
            5px 5px,
            2.5em 2.5em;
        background-repeat: no-repeat;
    }

    
</style>