<template>
     <div class="home">
          <div class="searchbar">
               <div class="columns  is-mobile">
                    <div class="search ">
                         <b-field>
                              <b-input
                                   placeholder="Search Trolli"
                                   type="search"
                                   icon="magnify"
                                   icon-clickable
                                   @icon-click="search"
                                   class="searchinput"
                                   v-model="searchText"
                                   @keydown.enter.native="search"
                              >
                              </b-input>
                         </b-field>
                    </div>
                    <div class=" basket">
                         <div class="label">
                              Basket
                         </div>

                         <b-dropdown aria-role="list" v-model="filterBasket">
                              <template #trigger="{ active }">
                                   <span class="basketname capitalize ">{{ filterBasket }}</span>
                                   <span class="dropdownicon">
                                        <svg width="11" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <path
                                                  d="M9.75395 13.7456L0.560971 3.85774L3.8584 0.794213L9.98553 7.38682L16.576 1.25736L19.6418 4.55262L9.75395 13.7456Z"
                                                  fill="black"
                                             />
                                        </svg> </span
                              ></template>

                              <h3>Pick a basket</h3>
                              <b-dropdown-item aria-role="listitem" value="all">All</b-dropdown-item>

                              <b-dropdown-item aria-role="listitem" v-for="item in basketKeys" :key="item" :value="item">{{ item }}</b-dropdown-item>

                              <router-link to="/settings" class="newbasket">
                                   + New basket
                              </router-link>
                         </b-dropdown>
                         <!-- <b-dropdown aria-role="list">
                              <template #trigger="{ active }">
                                   <span class="basketname">All</span>
                                   <span class="dropdownicon"
                                        ><svg width="11" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <path
                                                  d="M9.75395 13.7456L0.560971 3.85774L3.8584 0.794213L9.98553 7.38682L16.576 1.25736L19.6418 4.55262L9.75395 13.7456Z"
                                                  fill="black"
                                             />
                                        </svg>
                                   </span>
                              </template> -->

                         <!-- Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum explicabo, deleniti doloribus exercitationem voluptatum magnam molestiae a, perspiciatis, nihil autem assumenda deserunt facere accusantium mollitia debitis! Sint numquam sequi dolore. -->

                         <!-- <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
                              <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
                              <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
                              <b-dropdown-item aria-role="listitem">
                                   <b-button>hello world</b-button>
                              </b-dropdown-item> -->
                         <!-- </b-dropdown> -->
                    </div>
               </div>
          </div>

          <div class="trolliItems">
               <div v-for="item in trolliItemsToShow" :key="item._id">
                    <template v-if="filterBasket == 'all' || item.category == filterBasket">
                         <trolliItem
                              :item="item"
                              @deleteItem="deleteItem"
                              @updateProductBasket="updateProductBasket"
                              :basketKeys="basketKeys"
                         ></trolliItem>
                    </template>
               </div>

               <div v-if="trolliItems && trolliItems.length == 0" class="noItems">
                    <h2>YourTrolli is empty</h2>
                    <h4>Add items from you favourite online shops</h4>

                    <img src="@/assets/noItems.png" alt="" class="onlineshopping" />
               </div>
          </div>

          <div class="addToTrolliItem " v-if="pageItem && pageItem.title && trolliBottomWidget">
               <div class="columns is-mobile  " style="padding:0">
                    <div class="imgcol">
                         <div class="productimg"><img :src="pageItem.imageUrl" alt="" /></div>
                         <div class="shopimg">
                              <!-- {{pageItem.website}} -->
                              <!-- <img v-if="pageItem.website == 'Asos'" class="Asos" src="@/assets/logos/asos.png" alt="" />
                              <img v-else-if="pageItem.website == 'Currys'" class="Currys" src="@/assets/logos/currys.png" alt="" />
                              <img v-else-if="pageItem.website == 'Amazon'" class="Amazon" src="@/assets/logos/amazon.png" alt="" />
                              <img v-else-if="pageItem.website == 'Porter'" class="Porter" src="@/assets/logos/netaporter.png" alt="" />
                              <img v-else-if="pageItem.website == 'Ikea'" class="Ikea" src="@/assets/logos/ikea.png" alt="" />
                              <img v-else-if="pageItem.website == 'Zara'" class="Zara" src="@/assets/logos/zara.png" alt="" />
                              <img v-else-if="pageItem.website == 'Wayfair'" class="Wayfair" src="@/assets/logos/wayfair.png" alt="" />
                              <img v-else-if="pageItem.website == 'ZaraHome'" class="ZaraHome" src="@/assets/logos/zarahome.png" alt="" />
                              <img v-else-if="pageItem.website == 'JohnLewis'" class="JohnLewis" src="@/assets/logos/johnlewis.png" alt="" />
                              <img v-else-if="pageItem.website == 'Made'" class="Made" src="@/assets/logos/made.png" alt="" />
                              <img v-else-if="pageItem.website == 'Habitat'" class="Habitat" src="@/assets/logos/habitat.png" alt="" />
                              <img v-else-if="pageItem.website == 'HandM'" class="HandM" src="@/assets/logos/handm.png" alt="" />
                              <img v-else-if="pageItem.website == 'Selfridges'" class="Selfridges" src="@/assets/logos/selfridges.png" alt="" />
                              <img v-else-if="pageItem.website == 'Next'" class="Next" src="@/assets/logos/next.png" alt="" />
                              <img v-else-if="pageItem.website == 'Endclothing'" class="Endclothing" src="@/assets/logos/end.png" alt="" />
                              <img
                                   v-else-if="pageItem.website == 'Urbanoutfitters'"
                                   class="Urbanoutfitters"
                                   src="@/assets/logos/urbanoutfitters.png"
                                   alt=""
                              />
                              <img v-else-if="pageItem.website == 'Sportsdirect'" class="Sportsdirect" src="@/assets/logos/sportsdirect.png" alt="" />
                              <img v-else-if="pageItem.website == 'Boohoo'" class="Boohoo" src="@/assets/logos/boohoo.png" alt="" />
                              <img v-else-if="pageItem.website == 'Shein'" class="Shein" src="@/assets/logos/shein.png" alt="" />
                              <img v-else-if="pageItem.website == 'Office'" class="Office" src="@/assets/logos/office.png" alt="" />
                              <img v-else-if="pageItem.website == 'Uniqlo'" class="Uniqlo" src="@/assets/logos/uniqlo.png" alt="" />
                              <img
                                   v-else-if="pageItem.website == 'Matchesfashion'"
                                   class="Matchesfashion"
                                   src="@/assets/logos/matchesfashion.png"
                                   alt=""
                              /> -->
                         </div>
                    </div>
                    <div class="column is-9 " style="padding-left:10px !important;">
                         <div class="columns is-mobile">
                              <div class="titlecol ">
                                   <div class="productname capitalize ">
                                        <span v-if="pageItem.brand">{{ pageItem.brand }} - </span> {{ pageItem.title }}
                                   </div>
                              </div>
                              <div class="column is-5 ">
                                   <div class="price" v-if="pageItem.firstPrice">
                                        <span v-if="pageItem.currency">{{ pageItem.currency }}</span
                                        >{{ pageItem.firstPrice | priceFormatter }}
                                   </div>
                              </div>
                         </div>

                         <div class="form">
                              <div class="columns is-mobile">
                                   <div class="column">
                                        <b-field label="Select Basket">
                                             <b-select placeholder="Select a name" v-model="selectedBasket" :disabled="itemInBasket">
                                                  <option v-for="option in basketKeys" :key="option">
                                                       {{ option }}
                                                  </option>
                                             </b-select>
                                        </b-field>
                                   </div>
                                   <div class="column buttoncol">
                                        <b-button class="addbtn" @click="addToBasket" :disabled="itemInBasket">
                                             {{ itemInBasket ? "Added to Trolli" : "Add to Trolli" }}
                                        </b-button>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     </div>
</template>

<script>
     import apis from "../../apis/apis.js";
     import trolliItem from "../components/trolliItem";
     import mixpanel from "../../mixpanel";
     export default {
          data() {
               return {
                    active: false,
                    trolliItems: [],
                    baskets: undefined,
                    basketKeys: [],
                    listUpdated: false,
                    pageItem: false,
                    selectedBasket: "general",
                    itemInBasket: false,
                    searchText: "",
                    filterBasket: "all",

                    trolliItemsToShow: [],

                    trolliBottomWidget: false,
               };
          },
          components: {
               trolliItem,
          },

          filters: {
               priceFormatter: function(value) {
                    return parseFloat(value).toFixed(2);
               },
          },
          async created() {
               //fetch item from local

               try {
                    chrome.storage.sync.get(["trolliItems", "baskets", "showWidget"], async (result) => {
                         this.trolliItems = result.trolliItems;
                         this.baskets = result.baskets;

                         this.basketKeys = this.baskets ? Object.keys(this.baskets) : [];

                         if (result.showWidget === false) {
                              this.trolliBottomWidget = true;
                         }

                         if (this.basketKeys && this.basketKeys.length === 0) {
                              this.basketKeys.push("general");
                         }

                         this.trolliItemsToShow = this.trolliItems;

                         //fetch item from server
                         await this.fetchTrolliItems();
                         await this.fetchBaskets();
                    });
               } catch (e) {
                    console.log(e);
               }
               //check if item page

               chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
                    if (request.message === "pageHasItem") {
                         this.pageItem = request.data;

                         this.checkItemInBakset();
                    }
               });

               chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    var activeTab = tabs[0];
                    chrome.tabs.sendMessage(activeTab.id, { message: "checkItemPage" });
               });

               mixpanel.homeVisit();
          },

          watch: {
               searchText(val) {
                    if (!val) {
                         this.trolliItemsToShow = this.trolliItems;
                    }
               },
          },

          methods: {
               async search() {
                    console.log("searchngs");
                    if (this.searchText.length > 0) {
                         try {
                              console.log("searchngs started");
                              let response = await apis.search(this.searchText);
                              let searchResults = response.data;
                              console.log("search", response);
                              this.trolliItemsToShow = searchResults;
                         } catch (e) {}
                    }
               },

               async fetchTrolliItems() {
                    try {
                         let result = await apis.getTrolliItems();

                         if (result.data.docs) {
                              this.trolliItems = result.data.docs;
                         }
                         // console.log(this.trolliItems);

                         this.trolliItemsToShow = this.trolliItems;
                         this.updateProductBasket();
                    } catch (e) {
                         console.log("error fetching trolliItems", e);
                    }
               },

               async fetchBaskets() {
                    try {
                         let result = await apis.getBaskets();
                         this.baskets = { ...this.baskets, ...result.data };
                         this.basketKeys = this.baskets ? Object.keys(this.baskets) : [];
                         if (this.basketKeys.length === 0) {
                              this.basketKeys.push("general");
                         }

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

               updateProductBasket() {
                    chrome.storage.sync.set(
                         {
                              trolliItems: this.trolliItems.slice(0, 10),
                         },
                         () => {}
                    );
               },

               async deleteItem(id) {
                    try {
                         let result = await apis.deleteItem(id);
                         let filteredItems = this.trolliItems.filter((item) => {
                              return item._id != id;
                         });

                         this.trolliItems = filteredItems;
                         this.trolliItemsToShow = this.trolliItems;

                         await this.checkItemInBakset();
                         await this.fetchTrolliItems();
                    } catch (e) {
                         console.log("error deleting item", e);
                    }
               },

               async addToBasket() {
                    try {
                         let requestBody = {
                              title: this.pageItem.title,
                              imageUrl: this.pageItem.imageUrl,
                              availability: this.pageItem.availability,
                              referenceUrl: this.pageItem.referenceUrl,
                              firstPrice: this.pageItem.firstPrice,
                              website: this.pageItem.website,
                              currency: this.pageItem.currency,
                              brand: this.pageItem.brand,
                              category: this.selectedBasket,
                              notify: true,
                         };

                         let response = await apis.addProduct(requestBody);

                         // console.log("resp", response);

                         this.trolliItems.push(requestBody);
                         await this.fetchTrolliItems();
                         this.itemInBasket = true;

                         chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                              var activeTab = tabs[0];
                              chrome.tabs.sendMessage(activeTab.id, { message: "currentPageItemAdded", data: this.selectedBasket });
                         });

                         mixpanel.addItem(requestBody, "Extension Widget");
                    } catch (e) {
                         console.log("error", e);
                    }
               },

               async checkItemInBakset() {
                    if (this.pageItem && this.pageItem.referenceUrl) {
                         this.itemInBasket = false;
                         try {
                              let response = await apis.checkItem(this.pageItem.referenceUrl);

                              // console.log("check", response);

                              if (response.data.check == true) {
                                   //item in trolli
                                   this.itemInBasket = true;
                                   this.selectedBasket = response.data.item.category;
                              } else {
                                   this.itemInBasket = false;
                              }

                              // for (let i = 0; i < this.trolliItems.length; i++) {
                              //      if (this.trolliItems[i].referenceUrl == this.pageItem.referenceUrl) {
                              //           this.itemInBasket = true;
                              //           this.selectedBasket = this.trolliItems[i].category;
                              //           break;
                              //      }
                              // }

                              if (!this.itemInBasket) {
                                   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                                        var activeTab = tabs[0];

                                        console.log("remove item");
                                        chrome.tabs.sendMessage(activeTab.id, { message: "currentPageItemRemoved" });
                                   });
                              }
                         } catch (e) {}
                    }
               },
          },
     };
</script>

<style lang="scss">
     .bgr {
          background: red;
     }
     .bgb {
          background: blue;
     }
     .bgg {
          background: green;
     }
     .home {
          overflow: hidden;

          .noItems {
               text-align: center;

               h2 {
                    font-weight: 600;
                    color: rgba(0, 0, 0, 0.7);
                    font-size: 21px;
                    margin-bottom: 10px;
                    margin-top: 20px;
               }

               .subtext {
                    font-size: 14px;
                    margin-top: 10px;
                    margin-bottom: 20px;
                    display: block;
               }

               .onlineshopping {
                    width: 250px;
                    height: auto;
                    display: block;
                    margin: auto;
               }
          }

          .searchbar {
               border-bottom: 1px solid rgba(180, 180, 180, 0.2);

               .search,
               .basket {
                    height: 50px;
               }

               .settings {
                    padding: 10px 15px !important;
                    cursor: pointer;
               }
               .settings:hover {
                    background-color: rgba(0, 0, 0, 0.02);
               }
               .search {
                    // background: red;
                    padding-top: 7px;
                    padding-left: 5px;
                    border-right: 1px solid rgba(180, 180, 180, 0.2);
                    .searchinput {
                         input {
                              border: none;
                              background: transparent;
                              box-shadow: none;
                              position: relative;
                              font-size: 15px;
                              font-weight: 400;
                         }
                    }
               }

               .basket {
                    padding: 6px 10px 0 12px !important;

                    .label {
                         font-size: 12.5px;
                         font-weight: 300;

                         color: #949494;
                         margin-bottom: 0;
                    }
                    .basketname {
                         display: inline-block;
                         width: 115px;
                         color: black;
                         font-weight: 600;
                         position: relative;
                         font-size: 14px;
                         top: -3px;
                         // background: blue;
                    }
                    .dropdownicon {
                         position: relative;
                         top: -3px;
                    }
               }
               .settings {
                    width: 50px !important;
                    svg {
                         position: relative;
                         top: 8px;
                    }
               }
          }

          .addToTrolliItem {
               width: 100%;
               height: auto;
               background: white;
               background: #ffffff;
               border: 1px solid rgba(0, 0, 0, 0.06);
               box-sizing: border-box;
               box-shadow: 0px -17px 20px rgba(0, 0, 0, 0.02);

               padding: 7px 3px 4px 3px;
               .imgcol {
                    width: 85px;

                    .productimg {
                         // background: red;

                         width: 85px;
                         height: 103px;
                         display: flex;
                         align-items: center;
                         overflow-y: hidden;
                         img {
                              // display: block;
                              // height: 73px;
                              // width: auto;
                              // max-width: 100%;
                              // margin: auto;

                              height: auto;
                              width: auto;
                              max-width: 85px;
                              max-height: 103px;

                              margin: auto;
                         }
                         // margin-bottom: 10px;
                    }

                    .shopimg {
                         img {
                              display: block;
                              height: 15px;
                              width: auto;
                              margin: auto;
                         }

                         .Asos {
                              height: 11px;
                         }
                         .Zara {
                              height: 11px;
                         }
                         .Wayfair {
                              height: 20px;
                         }
                         .Porter {
                              height: 10px;
                         }

                         .Endclothing {
                              height: 10px;
                         }

                         .Made {
                              height: 10px;
                         }
                         .Next {
                              height: 10px;
                         }
                         .Urbanoutfitters {
                              height: 8px;
                         }
                         .Sportsdirect {
                              height: 8px;
                         }
                         .Boohoo {
                              height: 12px;
                         }
                         .Shein {
                              height: 10px;
                         }
                         .Office {
                              height: 10px;
                         }
                         .Uniqlo {
                              height: 17px;
                         }
                         .ZaraHome {
                              height: 8px;
                         }

                         .Matchesfashion {
                              height: 13px;
                         }
                    }
               }
               .titlecol {
                    // background: yellow;
                    width: 180px;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    .productname {
                         // background: red;
                         color: black;
                         max-height: 44px;
                         overflow-y: hidden;
                         overflow-x: hidden;
                         font-size: 16px;
                         font-weight: 600;
                         line-height: 22px;
                    }
               }
               .price {
                    font-weight: 600;
                    font-size: 17px;
                    color: black;
                    margin-top: 10px;
                    text-align: center;
               }

               .form {
                    margin-top: 4px;

                    .field {
                         .label {
                              font-size: 12px;

                              color: rgba(148, 148, 148, 1);
                              margin-bottom: 0;
                         }
                         // select {
                         //      padding: 0 !important;
                         // }
                         select {
                              padding-top: 0 !important;
                              padding-bottom: 0 !important;
                              font-size: 15px !important;
                              height: 35px !important;
                              box-shadow: none !important;
                              border-color: #dfdfdf !important;
                              text-transform: capitalize !important;
                              width: 140px;
                         }
                         .select::after {
                              border-color: black !important;
                              height: 0.525em;
                              width: 0.525em;
                              text-transform: capitalize !important;
                         }
                    }
                    .buttoncol {
                         padding-left: 8px !important;
                         .addbtn {
                              width: 120px;
                              font-weight: 500 !important;
                              padding: 0 15px;
                              height: 35px;
                              margin-top: 18px;
                              font-size: 15px;
                              background: #df7e60;
                              border: none;
                              color: white;
                         }
                    }
               }
          }

          .trolliItems {
               overflow-y: auto;
               height: 365px;
          }

          .newbasket {
               text-align: center;
               margin-top: 20px;
               margin-bottom: 10px;
               display: block;
               color: #787878;
               font-size: 13px !important;
          }
          .newbasket:hover {
               color: #df7e60;
          }
     }
</style>
