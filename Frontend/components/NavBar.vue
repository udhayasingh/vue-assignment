<template>
    <div class = "NavBar">
        <div class = "content">
             <p>Assignment {{title}}</p>
             <!-- <p v-if="away">Assignment {{ this.href === 'normal' ? '- Normal User Login' : '- Contributor Login' }} </p> -->
        </div>
    </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: ["user"],
  data() {
    return {
      title: '',
      href: ''
    }
  },
  mounted() {
    console.log(this.title, window.location.pathname, 'mytitle');
    if(window.location.pathname === '/contributor') {
      this.title = '- Contributor Login'
    } else if(window.location.pathname === '/normal') {
      this.title = '- Normal User Login'
    }
    this.href = window.location.href
  }
}
</script>

<style>
  .NavBar { 
    width: 100%; 
    padding: 5px 0; 
    background: goldenrod; 
  }
  .NavBar .content { 
    width: auto; 
    margin: 0px 35px; 
    padding: 1px 0; 
  }
  .NavBar .content p { 
    font-size: 22px; 
    color: black; 
  }                          

</style>