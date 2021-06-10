<template>
     <div class="login">
          <h2>Sign in to use YourTrolli</h2>

          <b-button @click="login" type="is-info">Sign in with Google</b-button>
          <p v-if="showWaitmsg" class="subtext">
               Please wait while the popup opens
          </p>
          <div class="people"><img src="@/assets/loginpage.png" alt="" /></div>
     </div>
</template>

<script>
     import mixpanel from "../../mixpanel";
     export default {
          data() {
               return {
                    showWaitmsg: false,
                    token: false,
               };
          },


          mounted(){


          },
          methods: {
               login() {
                    this.showWaitmsg = true;
                    chrome.runtime.sendMessage({ message: "login" }, (e) => {
                         this.loggedin();
                    });

                    mixpanel.loginStart();
               },

               async loggedin() {
                    this.token = await this.getToken();

                    if (this.token) {
                         this.$store.state.token = this.token;
                         this.$router.push("/");
                    } else {
                         // this.$buefy.toast.open({
                         //      message: "Login error",
                         //      type: "is-danger",
                         // });
                    }
               },

               async getToken() {
                    return new Promise((resolve, reject) => {
                         chrome.storage.sync.get(["userToken", "userName", "userPicture", "userEmail"], (result) => {
                              if (result.userToken) {
                                   this.$store.state.userName = result.userName;
                                   this.$store.state.userPicture = result.userPicture;
                                   this.$store.state.userEmail = result.userEmail;
                                   resolve(result.userToken);
                              } else {
                                   resolve(false);
                              }
                         });
                    });
               },
          },
     };
</script>

<style lang="scss" scoped>
     .login {
          text-align: center;
          height: 421px;
          position: relative;
          padding: 20px 0;
     }

     .subtext {
          font-size: 14px;
          margin-top: 10px;
          margin-bottom: 20px;
          display: block;
     }
     .people {
          position: absolute;
          bottom: 0px;
          width: 100%;

          img {
               width: 250px;
               height: auto;
               display: block;
               margin: auto;
          }
     }
     h2 {
          font-weight: 600;
          color: rgba(0, 0, 0, 0.7);
          font-size: 21px;
          margin-bottom: 10px;
     }
</style>
