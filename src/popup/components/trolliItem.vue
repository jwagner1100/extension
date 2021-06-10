<template>
     <div v-if="item">
          <div class="columns is-mobile is-vcentered trolliItem">
               <div class="imgcol  " @click="openInTab">
                    <div class="productimg  ">
                         <img :src="item.imageUrl" alt="" loading=lazy />
                    </div>
                    <div class="shopimg">
                         <img v-if="item.website == 'Asos'" class="Asos" src="@/assets/logos/asos.png" alt="" />
                         <img v-else-if="item.website == 'Currys'" class="Currys" src="@/assets/logos/currys.png" alt="" />
                         <img v-else-if="item.website == 'Amazon'" class="Amazon" src="@/assets/logos/amazon.png" alt="" />
                         <img v-else-if="item.website == 'Porter'" class="Porter" src="@/assets/logos/netaporter.png" alt="" />
                         <img v-else-if="item.website == 'Ikea'" class="Ikea" src="@/assets/logos/ikea.png" alt="" />
                         <img v-else-if="item.website == 'Zara'" class="Zara" src="@/assets/logos/zara.png" alt="" />
                         <img v-else-if="item.website == 'Wayfair'" class="Wayfair" src="@/assets/logos/wayfair.png" alt="" />
                         <img v-else-if="item.website == 'ZaraHome'" class="ZaraHome" src="@/assets/logos/zarahome.png" alt="" />

                         <img v-else-if="item.website == 'JohnLewis'" class="JohnLewis" src="@/assets/logos/johnlewis.png" alt="" />
                         <img v-else-if="item.website == 'Made'" class="Made" src="@/assets/logos/made.png" alt="" />
                         <img v-else-if="item.website == 'Habitat'" class="Habitat" src="@/assets/logos/habitat.png" alt="" />
                         <img v-else-if="item.website == 'HandM'" class="HandM" src="@/assets/logos/handm.png" alt="" />
                         <img v-else-if="item.website == 'Selfridges'" class="Selfridges" src="@/assets/logos/selfridges.png" alt="" />
                         <img v-else-if="item.website == 'Next'" class="Next" src="@/assets/logos/next.png" alt="" />
                         <img v-else-if="item.website == 'Endclothing'" class="Endclothing" src="@/assets/logos/end.png" alt="" />
                         <img v-else-if="item.website == 'Urbanoutfitters'" class="Urbanoutfitters" src="@/assets/logos/urbanoutfitters.png" alt="" />
                         <img v-else-if="item.website == 'Sportsdirect'" class="Sportsdirect" src="@/assets/logos/sportsdirect.png" alt="" />
                         <img v-else-if="item.website == 'Boohoo'" class="Boohoo" src="@/assets/logos/boohoo.png" alt="" />
                         <img v-else-if="item.website == 'Shein'" class="Shein" src="@/assets/logos/shein.png" alt="" />
                         <img v-else-if="item.website == 'Office'" class="Office" src="@/assets/logos/office.png" alt="" />
                         <img v-else-if="item.website == 'Uniqlo'" class="Uniqlo" src="@/assets/logos/uniqlo.png" alt="" />
                         <img v-else-if="item.website == 'Matchesfashion'" class="Matchesfashion" src="@/assets/logos/matchesfashion.png" alt="" />
                    </div>
               </div>
               <div class="column    ">
                    <div class="basket">
                         <div class="baskettag">
                              <!-- <span>
                                   {{ item.category }}
                              </span>
                              <span>
                              
                              </span> -->

                              <b-dropdown aria-role="list" v-model="item.category" @change="updateProductBasket" class="basketDropdown">
                                   <template #trigger="{ dropdowntrigger }">
                                        <div class="basketname capitalize ">
                                             {{ item.category }}
                                        </div>
                                        <span class="dropdownicon">
                                             <svg width="13" height="13" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path
                                                       d="M18.6769 4.04517C18.2543 4.04619 17.8361 4.13087 17.4465 4.29432C17.0568 4.45778 16.7034 4.69677 16.4065 4.99751L4.05264 17.3506L4.0042 17.5952L3.14951 21.892L2.90576 23.0389L4.05342 22.7952L8.35029 21.9405L8.59404 21.8913L20.9479 9.53813C21.2495 9.24182 21.489 8.88843 21.6525 8.49856C21.8159 8.1087 21.9001 7.69018 21.9001 7.26743C21.9001 6.84468 21.8159 6.42616 21.6525 6.0363C21.489 5.64644 21.2495 5.29304 20.9479 4.99673C20.651 4.69604 20.2974 4.45713 19.9076 4.29381C19.5178 4.13049 19.0995 4.04598 18.6769 4.04517ZM18.6769 5.53423C19.0706 5.53423 19.4675 5.71392 19.8487 6.09595C20.6089 6.85532 20.6089 7.67954 19.8487 8.4397L19.2878 8.97642L16.9675 6.65688L17.505 6.09595C17.887 5.71392 18.2831 5.53423 18.6769 5.53423ZM15.8698 7.7561L18.1886 10.0756L8.74092 19.5225C8.23088 18.5246 7.41887 17.7131 6.42061 17.2038L15.8698 7.7561ZM5.42061 18.4741C5.88298 18.6601 6.30299 18.9376 6.6554 19.2901C7.00782 19.6425 7.28537 20.0625 7.47139 20.5249L4.90732 21.0374L5.42061 18.4741Z"
                                                       fill="black"
                                                  />
                                             </svg>
                                        </span>
                                   </template>

                                   <h3>Pick a basket</h3>

                                   <b-dropdown-item aria-role="listitem" v-for="basket in basketKeys" :key="basket" :value="basket" class="capitalize"
                                        >{{ basket }}
                                   </b-dropdown-item>

                                   <router-link to="/settings" class="newbasket">
                                        + New basket
                                   </router-link>
                              </b-dropdown>
                         </div>
                    </div>

                    <div class="productname capitalize" @click="openInTab">
                         {{ item.title }}
                    </div>
               </div>
               <div class=" pricecol " @click="openInTab">
                    <template v-if="item.price && item.price != '0'">
                         <div class="currentPrice">£{{ item.price | priceFormatter }}</div>

                         <div class="previousPrice" v-if="item.firstPrice && item.price != item.firstPrice">
                              <span class="marker">
                                   <svg
                                        v-if="item.price < item.firstPrice"
                                        width="12"
                                        viewBox="0 0 22 26"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                   >
                                        <path
                                             d="M21.7154 15.0999C22.1083 14.6874 22.0924 14.0344 21.6799 13.6415C21.2674 13.2487 20.6144 13.2645 20.2215 13.677L12.0317 22.2749V2.00994C12.0317 1.44024 11.57 0.978394 11.0002 0.978394C10.4305 0.978394 9.96861 1.44024 9.96861 2.00994V22.2755L1.77847 13.677C1.38554 13.2645 0.732597 13.2487 0.320076 13.6415C-0.0924304 14.0344 -0.108316 14.6874 0.284619 15.0999L10.0041 25.3038C10.2255 25.5364 10.508 25.6738 10.8018 25.7163C10.8661 25.7288 10.9323 25.7354 11.0002 25.7354C11.0685 25.7354 11.1354 25.7288 11.2 25.716C11.4931 25.6732 11.7749 25.5358 11.9959 25.3038L21.7154 15.0999Z"
                                             fill="#39A627"
                                        />
                                   </svg>

                                   <svg v-else width="12" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                             d="M0.284598 10.6354C-0.10835 11.0479 -0.092395 11.7009 0.320084 12.0939C0.732564 12.4867 1.3856 12.4709 1.77855 12.0584L9.9683 3.46043L9.9683 23.7254C9.9683 24.2951 10.43 24.757 10.9998 24.757C11.5695 24.757 12.0314 24.2951 12.0314 23.7254L12.0314 3.45988L20.2215 12.0584C20.6145 12.4709 21.2674 12.4867 21.6799 12.0939C22.0924 11.7009 22.1083 11.0479 21.7154 10.6354L11.9959 0.43155C11.7745 0.198972 11.492 0.0615701 11.1982 0.0190706C11.1339 0.0065546 11.0677 -4.86353e-05 10.9998 -4.86294e-05C10.9315 -4.86234e-05 10.8646 0.00655081 10.8 0.0193434C10.5069 0.0621176 10.2251 0.199521 10.0041 0.43155L0.284598 10.6354Z"
                                             fill="#FF685F"
                                        />
                                   </svg>
                              </span>

                              <span class="crossedPrice">£{{ item.firstPrice | priceFormatter }}</span>
                         </div>
                    </template>
                    <template v-else-if="item.firstPrice && item.firstPrice != '0'">
                         <div class="currentPrice">£{{ item.firstPrice | priceFormatter }}</div>
                    </template>
               </div>
               <div class="  deletecol  " @click.stop="deleteItem()">
                    <svg width="18" height="18" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" class="deletebtn">
                         <path
                              d="M18.8741 4.03845C21.4014 4.03845 23.4667 6.01661 23.6062 8.50909L23.6137 8.77804H31.2699C31.874 8.77804 32.3637 9.26773 32.3637 9.87179C32.3637 10.4255 31.9521 10.8831 31.4184 10.9555L31.2699 10.9655H30.1091L28.2423 29.9519C28.0488 31.9193 26.4551 33.4385 24.5071 33.5617L24.2511 33.5697H13.4971C11.5202 33.5697 9.85234 32.1325 9.53907 30.2059L9.50598 29.9519L7.63765 10.9655H6.47827C5.92454 10.9655 5.46693 10.5541 5.39451 10.0202L5.38452 9.87179C5.38452 9.31806 5.79599 8.86045 6.32986 8.78802L6.47827 8.77804H14.1345C14.1345 6.16043 16.2565 4.03845 18.8741 4.03845ZM27.9114 10.9655H9.83535L11.683 29.7378C11.7686 30.6087 12.4579 31.2864 13.3118 31.3729L13.4971 31.3822H24.2511C25.1263 31.3822 25.8681 30.7626 26.0379 29.9212L26.0653 29.7378L27.9114 10.9655ZM21.4262 14.976C21.9799 14.976 22.4375 15.3874 22.51 15.9213L22.5199 16.0697V26.278C22.5199 26.8821 22.0302 27.3718 21.4262 27.3718C20.8725 27.3718 20.4148 26.9602 20.3424 26.4265L20.3324 26.278V16.0697C20.3324 15.4656 20.8221 14.976 21.4262 14.976ZM16.322 14.976C16.8757 14.976 17.3334 15.3874 17.4059 15.9213L17.4158 16.0697V26.278C17.4158 26.8821 16.9261 27.3718 16.322 27.3718C15.7683 27.3718 15.3107 26.9602 15.2383 26.4265L15.2283 26.278V16.0697C15.2283 15.4656 15.718 14.976 16.322 14.976ZM18.8741 6.22595C17.5351 6.22595 16.4369 7.25715 16.3305 8.56872L16.322 8.77804H21.4262C21.4262 7.36856 20.2836 6.22595 18.8741 6.22595Z"
                         />
                    </svg>
               </div>
          </div>
     </div>
</template>

<script>
     import apis from "../../apis/apis.js";
     import mixpanel from "../../mixpanel";
     export default {
          data() {
               return {
                    dropdowntrigger: true,
               };
          },

          props: {
               item: Object,
               basketKeys: Array,
          },
          filters: {
               priceFormatter: function(value) {
                    return parseFloat(value).toFixed(2);
               },
          },

          methods: {
               async updateProductBasket(val) {
                    try {
                         let response = await apis.updateCategory(this.item._id, val);
                         this.$emit("updateProductBasket");
                    } catch (e) {
                         console.log(e);
                    }
               },
               openInTab() {
                    chrome.tabs.create({ active: true, url: this.item.referenceUrl });
               },

               deleteItem() {
                    this.$emit("deleteItem", this.item._id);

                    mixpanel.deleteItem(this.item);
               },
          },
     };
</script>

<style lang="scss" scoped>
     .trolliItem:hover {
          background-color: rgba(0, 0, 0, 0.02);
     }
     .trolliItem {
          min-height: 75px;
          padding: 0px 0px !important;
          border-bottom: 1px solid rgba(180, 180, 180, 0.2);

          .imgcol {
               // background: purple;
               cursor: pointer;
               padding-right: 10px;
               padding-left: 6px;
               padding-top: 5px;
               padding-bottom: 5px;
               max-width: 105px;
               width: 105px;
               .productimg {
                    // background: blue;

                    width: 100% !important;

                    height: 55px !important;
                    display: flex !important;
                    align-items: center !important;
                    overflow-y: hidden !important;

                    img {
                         // display: block;
                         // height: 60px;
                         // width: auto;
                         // margin: auto;

                         // display: block !important;
                         height: auto;
                         width: auto;
                         max-height: 55px;
                         max-width: 100%;
                         margin: auto;
                    }

                    margin-bottom: 5px;
               }
               .shopimg {
                    // background: red;
                    img {
                         display: block;
                         height: 14px;
                         width: auto;
                         margin: auto;
                    }
                    .Asos {
                         height: 10px;
                    }
                    .Zara {
                         height: 9px;
                    }
                    .Wayfair {
                         height: 17px;
                    }
                    .Porter {
                         height: 8px;
                    }
                    .Currys {
                         height: 13px;
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
                         height: 10px;
                    }
                    .Shein {
                         height: 10px;
                    }
                    .Office {
                         height: 8px;
                    }
                    .Uniqlo {
                    }
                    .ZaraHome {
                         height: 8px;
                    }
               }
          }
          .deletecol {
               text-align: center;
               padding-right: 14px;
               padding-left: 3px;
               height: 50px;
               display: flex; /* establish flex container */
               // flex-direction: column; /* make main axis vertical */

               align-items: center;

               .deletebtn {
                    cursor: pointer;
                    width: 17px;
                    height: auto;
                    path {
                         fill: #6d6d6d;
                    }
               }
          }

          .deletecol:hover {
               .deletebtn {
                    path {
                         fill: rgba(200, 0, 0, 0.8);
                    }
               }
          }

          .basket {
               .baskettag {
                    cursor: pointer;
                    text-transform: capitalize;
                    background-color: #f5ddd6;
                    width: auto;
                    display: inline-block;
                    font-size: 12.5px;
                    padding: 0 5px;
                    border-radius: 5px;
                    font-weight: 500;
                    color: black;
                    transition: background-color 0.3s;
                    position: relative;
                    // height: 20px;
                    // width: 100px;

                    // .basketDropdown {
                    //      position: absolute;
                    //      top: 0;
                    //      height: 20px;
                    //      width: 100px;
                    //      z-index: 100;
                    //      border: 1px solid red;
                    // }
               }

               .basketname {
                    display: inline-block;
               }
               .baskettag:hover {
                    background-color: #fed0c3;
                    // border: 1px dashed black;
               }

               svg {
                    position: relative;
                    top: 2px;
                    margin-left: 3px;
               }
          }
          .productname {
               line-height: 20px;
               margin-top: 2px;
               font-size: 14.5px;
               height: 40px;
               padding-right: 10px;
               overflow: hidden;
               color: black;
               font-weight: 600;
               cursor: pointer;
               width: 170px;
          }

          .pricecol {
               cursor: pointer;
               width: 80px !important;
               height: 30px;

               .currentPrice {
                    font-size: 14.5px;
                    color: black;
                    font-weight: bold;
               }
               .previousPrice {
                    margin-top: 5px;
                    .crossedPrice {
                         text-decoration: line-through;
                         margin-left: 5px;
                         font-size: 14px;
                    }
               }
          }
     }
</style>
