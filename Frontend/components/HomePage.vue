<template>
  <div>
    <!-- <NavBar user="" /> -->

    <div>
      <div class="split left">
        <div class="left-centered">
          <h2>Sign up</h2>
          <form>
              <div class="container">
                <label for="name">Name:</label>
                <input type="text" v-model="name" required>
                <label for="email">Email:</label>
                <input type="text" v-model="email" required>
                <input type="radio" id="normal" v-model="role" value="normal">
                <label for="normal">Normal User</label><br>
                <input type="radio" id="contributor" v-model="role" value="contributor">
                <label for="contributor">Contributor</label><br>
                <button v-on:click="preSignUp">Sign up</button>
              </div>
            </form>
          </div>
      </div>
      <div v-if="signupModal" class="popup">
        <div class="popup-inner">
          <div class="closeicon">
          <p  @click="close">X</p>
          </div>
          <h2>Login Details</h2>
          <input type="text" id="username" v-model="uname" placeholder="Set your user name">
          <input type="password" id="password" v-model="pwd" placeholder="Set your password">
          <button v-on:click="signUp">Sign up</button>
        </div>
      </div>

      <div class="vl"></div>

      <div class="split right">
        <div class="right-centered">
          <h2>Login</h2>
          <form>
            <div class="container">
              <label for="uname">Username</label>
              <input type="text" v-model="username" required autocomplete="off">

              <label for="psw">Password</label>
              <input type="password" v-model="password" required>
                  
              <button v-on:click="login">Login</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  
  </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'HomePage',
        components: {
        },
        computed: mapState({

        }),
        data() {
            return {
                username: '',
                password: '',
                name: '',
                email: '',
                role: '',
                uname: '',
                pwd: '',
                signupModal: false
            }
        },
        methods: {
            close() {
              this.signupModal = false
            },
            preSignUp(e) {
              e.preventDefault()
              const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
              if(this.name !== '' && this.email.match(re) && this.role !== '') {
                this.signupModal = true
              } else {
                alert('please enter valid details.')
              }
            },
            async signUp() {
              this.signupModal = false
              let result = await this.$axios.post('/signUp', {
                name: this.name,
                    email: this.email,
                    role: this.role,
                    userName: this.uname,
                    password: this.pwd,
                });

                if(result.status == 201) {
                    alert("Sign Up done successfully");
                } else {
                    alert("Error! Please try again...");
                }
            },
            async login() {
                let result = await this.$axios.post('/login', {
                    userName: this.username,
                    password: this.password,
                });

                if(result.status == 200) {
                    localStorage.setItem("userDetails", JSON.stringify(result.data));
                    if(result.data.role === 'normal')
                        window.location.href = '/normal'
                    else
                        window.location.href = '/contributor'
                } else {
                    alert("Error! Please try again...");
                }
            },
            beforeDestroy () {
                localStorage.removeItem('userDetails');
            }
        }
    }
</script>

<style>
  .popup {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.4);
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .popup-inner {
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    padding: 28px;
    z-index: 99;
  }
  .split {
    height: 100%;
    width: 50%;
    position: fixed;
    z-index: 1;
    top: 0;
    overflow-x: hidden;
    padding-top: 20px;
  }

  .left {
    left: 0;
  }

  .right {
    right: 0;
  }

  .right-centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-75%, -75%);
    text-align: left;
  }

  .left-centered {
    position: absolute;
    top: 56%;
    left: 50%;
    transform: translate(-75%, -75%);
    text-align: left;
  }


  .vl {
    border-left: 2px solid black;
    height: 500px;
    margin-left: 50%;
    margin-top: 3%;
  }
.closeicon{
    display: flex;
    align-items: flex-end;
    text-align: flex-end;
    margin-left: 97%;
    color: red;
    font-weight: bold;
    margin-bottom: -35px;
    cursor: pointer;
}

input[type=text], input[type=password] {
  width: 100%;
  padding: 10px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  background-color: goldenrod;
  color: black;
  padding: 5px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  width: 30%;
}

button:hover {
  opacity: 0.8;
}

.container {
  padding: 16px;
}

h2 {
  margin-left: 4%;
}

hr {
  border-top: 1px dashed black;
}


</style>