<template>
     <div class="settings">
          <div class="columns is-mobile">
               <div class="column">
                    <h2>
                         Settings
                    </h2>
               </div>

               <div class="column">
                    <router-link to="/" class="back">
                         Back
                    </router-link>
               </div>
          </div>

          <div class="columns is-mobile profile is-vcentered">
               <div class=" profileimg">
                    <img :src="$store.state.userPicture" alt="" />
               </div>
               <div class="column  userdetails">
                    <h2>
                         {{ $store.state.userName }}
                    </h2>

                    <h4>
                         {{ $store.state.userEmail }}
                    </h4>
               </div>

               <a class="logout" @click="logout">
                    Logout
               </a>
          </div>
          <div class="options">
               <h3>Options</h3>
               <b-field>
                    <b-checkbox v-model="showWidgetCheckbox" @input="showWidgetCheckboxUpdate">
                         Show Trolli widget on websites
                    </b-checkbox>
               </b-field>
          </div>

          <div class="baskets">
               <h3>Baskets</h3>

               <div class="columns is-mobile row">
                    <div class="column  is-8">
                         <b-field type="is-light">
                              <b-input placeholder="New basket" class="basketinput capitalize" v-model="newBasketName"></b-input>
                         </b-field>
                    </div>
                    <div class="column is-4" style="padding-left:10px !important;">
                         <b-button type="is-primary" class="addBasketBtn" @click="addBasket">Add</b-button>
                    </div>
               </div>

               <div class="columns is-mobile row">
                    <div class="column  is-8">
                         <div class="basketitem">
                              <div class="columns is-mobile ">
                                   <div class="column is-9 basketname capitalize">
                                        general
                                   </div>
                                   <div class="column is-3 has-text-right  count" v-if="baskets && baskets.general !== undefined">
                                        {{ baskets.general }}
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div class="column is-4" style="padding-left:10px !important;"></div>
               </div>

               <div class="columns is-mobile row" v-for="item in basketsArray" :key="item[0]">
                    <div class="column  is-8">
                         <div class="basketitem">
                              <div class="columns is-mobile ">
                                   <div class="column is-9 basketname capitalize">
                                        {{ item[0] }}
                                   </div>
                                   <div class="column is-3 has-text-right  count">
                                        {{ item[1] }}
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div class="column is-4" style="padding-left:10px !important;">
                         <b-button type="is-text" style="width:50%" class="controlbtn" @click="editBasket(item[0])"
                              ><svg width="15" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path
                                        d="M23.9721 0C23.3298 0.00155528 22.6942 0.130271 22.1019 0.37872C21.5096 0.62717 20.9724 0.990436 20.5212 1.44756L1.74325 20.2243L1.66962 20.596L0.3705 27.1272L0 28.8705L1.74444 28.5L8.27569 27.2009L8.64619 27.1261L27.4241 8.34931C27.8824 7.89892 28.2465 7.36176 28.495 6.76916C28.7435 6.17657 28.8714 5.54043 28.8714 4.89784C28.8714 4.25526 28.7435 3.61911 28.495 3.02652C28.2465 2.43393 27.8824 1.89677 27.4241 1.44637C26.9727 0.989321 26.4352 0.626192 25.8427 0.377944C25.2503 0.129695 24.6145 0.00124328 23.9721 0ZM23.9721 2.26337C24.5706 2.26337 25.1738 2.5365 25.7533 3.11719C26.9088 4.27144 26.9088 5.52425 25.7533 6.67969L24.9007 7.4955L21.3738 3.96981L22.1908 3.11719C22.7715 2.5365 23.3736 2.26337 23.9721 2.26337ZM19.7054 5.64062L23.2299 9.16631L8.86944 23.5256C8.09418 22.0087 6.85992 20.7753 5.34256 20.0011L19.7054 5.64062ZM3.82256 21.9319C4.52537 22.2147 5.16378 22.6366 5.69945 23.1722C6.23513 23.7079 6.657 24.3463 6.93975 25.0491L3.04238 25.8281L3.82256 21.9319Z"
                                        fill="#6D6D6D"
                                   /></svg
                         ></b-button>
                         <b-button type="is-text" style="width:50%" class="controlbtn" @click="deleteBasket(item[0])"
                              ><svg width="15" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path
                                        d="M14.4576 0.325439C16.9849 0.325439 19.0502 2.3036 19.1897 4.79608L19.1972 5.06502H26.8534C27.4575 5.06502 27.9472 5.55472 27.9472 6.15877C27.9472 6.7125 27.5356 7.17011 27.0019 7.24253L26.8534 7.25252H25.6926L23.8258 26.2389C23.6323 28.2063 22.0386 29.7254 20.0906 29.8487L19.8346 29.8567H9.08062C7.10372 29.8567 5.43584 28.4195 5.12256 26.4929L5.08947 26.2389L3.22114 7.25252H2.06177C1.50804 7.25252 1.05043 6.84105 0.978007 6.30719L0.968018 6.15877C0.968018 5.60504 1.37949 5.14743 1.91335 5.07501L2.06177 5.06502H9.71802C9.71802 2.44742 11.84 0.325439 14.4576 0.325439ZM23.4949 7.25252H5.41885L7.26646 26.0248C7.35213 26.8957 8.04142 27.5734 8.8953 27.6599L9.08062 27.6692H19.8346C20.7098 27.6692 21.4516 27.0495 21.6214 26.2082L21.6488 26.0248L23.4949 7.25252ZM17.0097 11.2629C17.5634 11.2629 18.021 11.6744 18.0935 12.2083L18.1034 12.3567V22.565C18.1034 23.1691 17.6137 23.6588 17.0097 23.6588C16.456 23.6588 15.9983 23.2472 15.9258 22.7135L15.9159 22.565V12.3567C15.9159 11.7526 16.4056 11.2629 17.0097 11.2629ZM11.9055 11.2629C12.4592 11.2629 12.9169 11.6744 12.9894 12.2083L12.9993 12.3567V22.565C12.9993 23.1691 12.5096 23.6588 11.9055 23.6588C11.3518 23.6588 10.8942 23.2472 10.8218 22.7135L10.8118 22.565V12.3567C10.8118 11.7526 11.3015 11.2629 11.9055 11.2629ZM14.4576 2.51294C13.1186 2.51294 12.0204 3.54414 11.914 4.85571L11.9055 5.06502H17.0097C17.0097 3.65554 15.8671 2.51294 14.4576 2.51294Z"
                                        fill="#6D6D6D"
                                   /></svg
                         ></b-button>
                    </div>
               </div>
          </div>

          <b-modal
               v-model="isEditBasketModelActive"
               trap-focus
               :destroy-on-hide="false"
               aria-role="dialog"
               aria-label="Example Modal"
               aria-modal
               :width="300"
               class="editBasketName"
          >
               <form action="">
                    <div class="modal-card" style="width: auto">
                         <section class="modal-card-body">
                              <b-field label="Rename basket">
                                   <b-input v-model="updatedBasetName" placeholder="" required> </b-input>
                              </b-field>
                              <div class="buttons">
                                   <b-button type="is-primary" class="savebtn" @click="saveBasetName">
                                        Save
                                   </b-button>
                                   <b-button type="is-light" class="cancelbtn" @click="cancelBaskeName">
                                        Cancel
                                   </b-button>
                              </div>
                         </section>
                    </div>
               </form>
          </b-modal>
     </div>
</template>

<script>
     import apis from "../../apis/apis.js";
     export default {
          data() {
               return {
                    showWidgetCheckbox: true,

                    trolliItems: [],
                    baskets: undefined,
                    newBasketName: "",
                    basketsArray: [],
                    isEditBasketModelActive: false,

                    updatedBasetName: "",
                    currentBasetInEdit: "",
               };
          },

          async mounted() {
               chrome.storage.sync.get(["baskets", "showWidget"], async (result) => {
                    this.baskets = result.baskets;
                    this.updateBasketsArray();
                    await this.fetchBaskets();

                    if (result.showWidget === false) {
                         this.showWidgetCheckbox = false;
                    }
               });
          },

          methods: {
               logout() {
                    this.$buefy.dialog.confirm({
                         message: "Are you sure you want to logout?",
                         cancelText: "Cancel",
                         confirmText: "Logout",
                         type: "is-success",
                         onConfirm: () => {
                              chrome.storage.sync.set(
                                   { trolliItems: [], userToken: false, userName: false, userPicture: false, userEmail: false },
                                   () => {
                                        this.$store.state.token = "false";

                                        this.$router.push("/login");
                                   }
                              );
                         },
                    });
               },
               showWidgetCheckboxUpdate() {
                    chrome.storage.sync.set(
                         {
                              showWidget: this.showWidgetCheckbox,
                         },
                         () => {}
                    );
               },
               async fetchBaskets() {
                    try {
                         let result = await apis.getBaskets();

                         this.baskets = { ...this.baskets, ...result.data };

                         if (!result.data.general) {
                              console.log("no general");
                              this.baskets.general = 0;
                         }

                         this.updateBasketsArray();
                         chrome.storage.sync.set(
                              {
                                   baskets: this.baskets,
                              },
                              () => {}
                         );
                    } catch (e) {
                         console.log("error fetching baskets", e);
                    }
               },

               addBasket() {
                    let basketname = this.newBasketName.toLowerCase();

                    if (basketname.length > 0 && this.baskets[basketname] == undefined) {
                         this.baskets[basketname] = 0;
                         this.updateBasketsArray();
                         chrome.storage.sync.set(
                              {
                                   baskets: this.baskets,
                              },
                              () => {}
                         );
                         this.newBasketName = "";
                    }
               },

               updateBasketsArray() {
                    let val = { ...this.baskets };
                    delete val["general"];
                    this.basketsArray = Object.entries(val).sort();
               },

               editBasket(name) {
                    this.currentBasetInEdit = name;
                    this.updatedBasetName = name;
                    this.isEditBasketModelActive = true;
               },
               async saveBasetName() {
                    let newVal = this.updatedBasetName;
                    let oldVal = this.currentBasetInEdit;

                    if (newVal.length == 0) {
                         return;
                    }

                    try {
                         let response = await apis.renameBasket(oldVal, newVal);
                         this.baskets[newVal] = this.baskets[oldVal];
                         delete this.baskets[oldVal];
                         this.updateBasketsArray();
                         chrome.storage.sync.set(
                              {
                                   baskets: this.baskets,
                              },
                              () => {}
                         );
                         this.isEditBasketModelActive = false;
                    } catch (e) {}
               },
               cancelBaskeName() {
                    this.isEditBasketModelActive = false;
               },

               async deleteBasket(item) {
                    if (this.baskets[item] && this.baskets[item] > 0 && item !== "general") {
                         //delete from server
                         try {
                              let result = await apis.deleteCategory(item);
                              console.log(result);
                         } catch (e) {}
                    }

                    //delete from local
                    delete this.baskets[item];
                    this.updateBasketsArray();
                    chrome.storage.sync.set(
                         {
                              baskets: this.baskets,
                         },
                         () => {}
                    );
               },
          },
     };
</script>

<style lang="scss" scoped>
     .settings {
          padding: 20px;
          height: 421px;
          overflow-y: auto !important;
     }
     .profile {
          margin-top: 10px !important;
          .userdetails {
               padding-left: 10px !important;
          }
          .profileimg {
               height: 60px;
               img {
                    border-radius: 5px;
                    width: 60px;
               }
          }
     }

     h2 {
          font-weight: 600;
          color: black;
          font-size: 20px;
     }
     .back {
          text-align: right;
          font-size: 17px;
          cursor: pointer;
          display: block;
          // color: grey;
     }

     h3 {
          text-transform: uppercase;
          color: rgba(148, 148, 148, 1);
          font-size: 12px;
          letter-spacing: 1px;
          margin-top: 20px;
          margin-bottom: 10px;
     }

     .addBasketBtn {
          width: 100%;
     }
     .row {
          margin-bottom: 10px !important;
     }
     .basketitem {
          background: #f7f7fa;
          padding: 8px 12px;
          border-radius: 3px;
          color: rgba(0, 0, 0, 0.62);
          font-weight: 500;
     }

     .count {
          color: #96969f;
     }

     .controlbtn {
          padding-top: 10px;
     }

     .editBasketName {
          border-radius: 4px;
          .buttons {
               text-align: right !important;
               display: flex;

               justify-content: flex-end;

               .savebtn {
                    display: inline !important;
                    width: 80px;
               }
               .cancelbtn {
                    display: inline !important;
               }
          }
     }
</style>

<style lang="scss">
     .settings {
          .basketinput {
               input {
                    padding: 12px;
                    font-weight: 500;
               }
          }
     }

     .editBasketName {
          .field {
               .label {
                    text-transform: uppercase;
                    color: rgba(148, 148, 148, 1);
                    font-size: 12px;
                    letter-spacing: 1px;
               }
          }
     }

     .modal-card {
          max-width: 320px !important;
          button.is-success {
               background: black;
               border: none;
               outline: none;
               box-shadow: none;
          }
          button.is-success:focus {
               background: black;
               border: none;
               outline: none;
               box-shadow: none;
          }
          button.is-success:hover {
               background: black;
               border: none;
          }

          .modal-card-foot {
               background: white;
          }
     }
</style>
