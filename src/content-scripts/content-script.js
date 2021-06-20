import apis from "../apis/apis";
import mixpanel from "../mixpanel";

let scrapeCount = 0;
const DOMAINS = [
     "amazon.co",
     "currys.co",
     "ikea.co",
     "asos.co",
     "net-a-porter",
     "wayfair.co",
     "zara",

     "johnlewis.com",
     "made.com",
     "habitat.co.uk",
     "hm.com/en_gb",
     "selfridges.com",
     "next.co.uk",
     "endclothing.com",
     "urbanoutfitters.com",
     "sportsdirect.com",
     "boohoo.com",
     "shein.co.uk",
     "office.co.uk",
     "uniqlo.com/uk",
     "matchesfashion.com",
];
let scrapedProduct;

// let scrapedProductBackup;

// console.log("hi from trolli");
/*================================ Add button to page ==============================*/

function sleep(ms) {
     return new Promise((resolve) => setTimeout(resolve, ms));
}
async function insertWidget() {
     let baskets,
          trolliItems = [],
          basketKeys = [];
     let addedToBasket = false;
     let itemCategory;

     chrome.storage.sync.get(["trolliItems", "baskets"], async (result) => {
          baskets = result.baskets;
          trolliItems = result.trolliItems || [];

          if (Object.keys(baskets).length === 0) {
               basketKeys = ["general"];
          } else {
               basketKeys = Object.keys(baskets);
          }

          let options = "";

          for (var i = 0; i < basketKeys.length; i++) {
               options += `<option value="${basketKeys[i]}">${basketKeys[i]}</option>`;
          }

          if (scrapedProduct) {
               // for (let i = 0; i < trolliItems.length; i++) {
               //      if (trolliItems[i].referenceUrl == scrapedProduct.referenceUrl) {
               //           addedToBasket = true;
               //           itemCategory = trolliItems[i].category;
               //           break;
               //      }
               // }
               //check if item already in trolli
               let response = await apis.checkItem2(scrapedProduct.referenceUrl);
               console.log("trolli item check", response);
               if (response.data.check == true) {
                    //item in trolli
                    addedToBasket = true;
                    itemCategory = response.data.item.category;
               }

               //get display price
               let displayPrice = "";

               if (scrapedProduct.firstPrice) {
                    displayPrice = `£${parseFloat(scrapedProduct.firstPrice).toFixed(2)}`;
               }

               let injectHTML = `
               <div id="yourtolli-body">
              
               <div id="yourtolli-imgcontainer">
                    <img id="yourtolli-productimg" src="${scrapedProduct.imageUrl}" alt="" />
               </div>

               <div id="yourtolli-maincontainer">
                    <div id="yourtolli-top">
                         <div id="yourtolli-title">${scrapedProduct.title}</div>
                           <div id="yourtolli-price">${displayPrice}</div>
                    </div>
                    <div id="yourtolli-bottom">
                         <label id="yourtolli-label" for="dropdown">Select Basket</label>

                         <div id="yourtolli-formcontainer">
                              <div id="yourtolli-basketdropdown">
                                   <select  id="yourtolli-dropdown">
                                       ${options}
                                   </select>
                              </div>
                              <button  class="${addedToBasket ? "disabledbtn" : ""}" id="yourtolli-addtotrollibtn">${
                    addedToBasket ? "Added to Trolli" : "Add to Trolli"
               }</button>
                         </div>
                    </div>
                    </div>
               </div>
        
`;

               // console.log(document.getElementById("yourtolli-widgetcontainer"), "item");
               if (document.getElementById("yourtolli-widgetcontainer")) {
                    document.getElementById("yourtolli-widgetcontainer").remove();
                    // console.log("removed");
               }

               let bodyEl = document.querySelector("body");
               let widgetContainer = document.createElement("div");
               widgetContainer.id = "yourtolli-widgetcontainer";
               bodyEl.appendChild(widgetContainer);
               widgetContainer.innerHTML = injectHTML;

               let addBtn = document.getElementById("yourtolli-addtotrollibtn");
               let dropdown = document.getElementById("yourtolli-dropdown");

               if (addedToBasket) {
                    dropdown.value = itemCategory;
                    dropdown.disabled = true;
                    addBtn.innerHTML = "Added to Trolli";
                    addBtn.classList.add("disabledbtn");
               }

               addBtn.addEventListener("click", async () => {
                    // console.log("hi", addedToBasket);
                    if (!addedToBasket) {
                         let basket = dropdown.value;
                         let success = await saveItem(scrapedProduct, basket);
                         if (success) {
                              addBtn.innerHTML = "Added to Trolli";
                              addBtn.classList.add("disabledbtn");
                              dropdown.disabled = true;
                              addedToBasket = true;
                         }
                    }
               });

               chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
                    if (request.message === "currentPageItemAdded") {
                         addedToBasket = true;
                         dropdown.value = request.data;
                         dropdown.disabled = true;
                         addBtn.innerHTML = "Added to Trolli";
                         addBtn.classList.add("disabledbtn");
                    }
                    if (request.message === "currentPageItemRemoved") {
                         addedToBasket = false;
                         dropdown.value = "general";
                         dropdown.disabled = false;
                         addBtn.innerHTML = "Add to Trolli";
                         addBtn.classList.remove("disabledbtn");
                    }
               });
          }
     });
}

/*================================ Start trolli events ==============================*/

// window.addEventListener("load", () => {
//      console.log("on load start");
//      start();
// });

// window.addEventListener("popstate", function(event) {
//      console.log("link popstate");
//      start();
// });

var oldHref = document.location.href;

window.onload = function() {
     var bodyList = document.querySelector("body"),
          observer = new MutationObserver(function(mutations) {
               mutations.forEach(function(mutation) {
                    if (oldHref != document.location.href) {
                         oldHref = document.location.href;

                         if (document.getElementById("yourtolli-widgetcontainer")) {
                              document.getElementById("yourtolli-widgetcontainer").remove();
                         }
                         start();
                    }
               });
          });

     var config = {
          childList: true,
          subtree: true,
     };

     observer.observe(bodyList, config);
};

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//      if (request.message === "restart") {
//           console.log("restarting scraping");
//           scrapedProductBackup = scrapedProduct;
//           start();
//      }
// });

/*================================ add product ==============================*/

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
     if (request.message === "checkItemPage") {
          chrome.runtime.sendMessage({ message: "pageHasItem", data: scrapedProduct });
     }
});

async function start() {
     scrapedProduct = undefined;
     let location = window.location.href;
     for (let i = 0; i < DOMAINS.length; i++) {
          if (location.indexOf(DOMAINS[i]) != -1) {
               scrapedProduct = await getScrapeData();

               if (scrapedProduct) {
                    //if both are same dont replace
                    // if (scrapedProductBackup) {
                    //      // console.log(scrapedProductBackup, scrapedProduct);
                    //      if (scrapedProductBackup.referenceUrl == scrapedProduct.referenceUrl) {
                    //           break;
                    //      }
                    // }

                    chrome.runtime.sendMessage({ message: "pageHasItem", data: scrapedProduct });

                    chrome.storage.sync.get(["trolliItems", "baskets", "showWidget", "userToken"], (result) => {
                         if (result.showWidget !== false && result.userToken) {
                              if (document.getElementById("yourtolli-widgetcontainer")) {
                                   document.getElementById("yourtolli-widgetcontainer").remove();
                              }

                              insertWidget();

                              // if (!scrapedProduct.imageUrl && scrapeCount == 0) {
                              //      setTimeout(() => {
                              //           console.log("no image restart");
                              //           start();
                              //      }, 2000);

                              //      scrapeCount++;
                              // }
                         }
                    });
               }
               break;
          }
     }
}

async function getScrapeData() {
     let location = window.location.href;
     let scrapedProduct = undefined;

     try {
          console.log("scrape start");
          let scrapeData = await apis.scrape(window.location.href);
          console.log(scrapeData);

          scrapedProduct = {
               title: scrapeData.data.title,
               imageUrl: scrapeData.data.imageUrl,
               availability: "IN_STOCK",
               referenceUrl: window.location.href,
               website: "Wayfair",
               firstPrice: scrapeData.data.offerPriceDetails.amount + "",
          };

          if (scrapedProduct && scrapedProduct.firstPrice) {
               scrapedProduct.firstPrice = scrapedProduct.firstPrice.replace("GBP", "");
               scrapedProduct.firstPrice = scrapedProduct.firstPrice.replace("£", "");
               scrapedProduct.firstPrice = scrapedProduct.firstPrice.replace("$", "");
               scrapedProduct.firstPrice = scrapedProduct.firstPrice.replace(",", "");
               scrapedProduct.firstPrice = scrapedProduct.firstPrice.replace("€", "");
               scrapedProduct.firstPrice = scrapedProduct.firstPrice.replace(" ", "");
               scrapedProduct.firstPrice = parseFloat(scrapedProduct.firstPrice);
               //capitalize first letter

               scrapedProduct.title = scrapedProduct.title.charAt(0).toUpperCase() + scrapedProduct.title.slice(1).toLowerCase();
               if (scrapedProduct.title.length > 30) {
                    scrapedProduct.title = scrapedProduct.title.slice(0, 30) + "...";
               }
               return scrapedProduct;
          } else {
               return false;
          }
     } catch (e) {
          console.log("Failed to scrap data from the page", e);
          return false;
     }
}

async function saveItem(scrapedProduct, basket) {
     if (!basket) basket = "general";
     if (scrapedProduct) {
          let requestBody = {
               title: scrapedProduct.title,
               imageUrl: scrapedProduct.imageUrl,
               availability: scrapedProduct.availability,
               referenceUrl: scrapedProduct.referenceUrl,
               firstPrice: scrapedProduct.firstPrice,
               website: scrapedProduct.website,
               category: basket,
               notify: true,
          };

          try {
               let response = await apis.addProduct2(requestBody);

               fetchAndAddToBasket(requestBody);

               chrome.runtime.sendMessage({ message: "trolliItemAdded", item: requestBody }, (e) => {});
          } catch (e) {
               console.log(e);
               return false;
          }
     }

     return true;
}

function fetchAndAddToBasket(item) {
     chrome.storage.sync.get(["trolliItems"], (result) => {
          let trolliItems = result.trolliItems;
          if (!trolliItems) {
               trolliItems = [];
          }
          trolliItems.push(item);
          chrome.storage.sync.set(
               {
                    trolliItems: trolliItems,
               },
               () => {
                    console.log("Added to local basket");
               }
          );
     });
}

/*================================ start ==============================*/

start();
