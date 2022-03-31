<template>
    <dialog open>
      <div class="container">
        <div class="row">
          <div class="col-sm-10 top">
            <h4>Download Image</h4> 
          </div>
          <div class="col-sm-2 top">
            <h3 @click="handleShow">X</h3>
          </div>
        </div>
      </div>
        <img :src="categoryInfo.img" />
        <button class="btn btn-default" @click="increaseDownloads">Download</button>
    </dialog>
</template>

<script>
  export default {
    name: 'DownloadImage',
    props: ['categoryInfo'],
    setup() {
      return {
        
      }
    },
    methods: {
      handleShow() {
        this.$store.commit('normal/setDialog')
      },
      async increaseDownloads() {
        let result = await this.$axios.put('/increaseDownloads', {
            id: this.categoryInfo.id,
            downloads: this.categoryInfo.downloads + 1
        })
        if(result.status == 200) {
            alert("Downloads updated successfully");
        } else {
            alert("Error! Please try again...");
        }
      }
    },
  }
</script>

<style scoped>
  dialog {
    width: fit-content;
    border: 1px solid gray;
    padding: 0 18px 0 18px;
  }
  .top {
    width: fit-content;
    border: 1px solid grey;
    cursor: pointer;
    margin: 0 ;
    margin-bottom: 12px;
  }
  .container {
    width: 100%;
    padding: 0;
    padding-top: 0; 
  }
  img {
    display: flex;
    width: 80%;
    height: 20vh;
    align-items: center;
    margin-left: auto;
  }
  button {
    background-color: goldenrod;
    color: black;
    text-align: center;
  }
</style>