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
               // console.log("trolli", response);
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

window.addEventListener("load", () => {
     console.log("on load start");
     start();
});

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
                         console.log("link  change");

                         setTimeout(() => {
                              start();
                         }, 2000);
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

function start() {
     scrapedProduct = undefined;
     let location = window.location.href;
     for (let i = 0; i < DOMAINS.length; i++) {
          if (location.indexOf(DOMAINS[i]) != -1) {
               scrapedProduct = getScrapeData();

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

function getScrapeData() {
     let location = window.location.href;
     let scrapedProduct = undefined;

     console.log("start crawling");

     try {
          if (location.indexOf("amazon.co") > -1) {
               scrapedProduct = scrapeAmazon();
          } else if (location.indexOf("currys.co") > -1) {
               scrapedProduct = scrapeCurrys();
          } else if (location.indexOf("ikea.co") > -1) {
               scrapedProduct = scrapeIKEA();
          } else if (location.indexOf("asos.co") > -1) {
               scrapedProduct = scrapeAsos();
          } else if (location.indexOf("net-a-porter") > -1) {
               scrapedProduct = scrapeNETAPORTER();
          } else if (location.indexOf("wayfair.co") > -1) {
               scrapedProduct = scrapeWayfair();
          } else if (location.indexOf("zara.com") > -1) {
               scrapedProduct = scrapeZara();
          } else if (location.indexOf("johnlewis.com") > -1) {
               scrapedProduct = scrapeJohnLewis();
          } else if (location.indexOf("made.com") > -1) {
               scrapedProduct = scrapeMade();
          } else if (location.indexOf("habitat.co.uk") > -1) {
               scrapedProduct = scrapeHabitat();
          } else if (location.indexOf("hm.com/en_gb") > -1) {
               scrapedProduct = scrapeHandM();
          } else if (location.indexOf("selfridges.com") > -1) {
               scrapedProduct = scrapeSelfridges();
          } else if (location.indexOf("next.co.uk") > -1) {
               scrapedProduct = scrapeNext();
          } else if (location.indexOf("endclothing.com") > -1) {
               scrapedProduct = scrapeEndclothing();
          }

          // else if (location.indexOf("zarahome.com") > -1) {
          //      scrapedProduct = await scrapeZaraHome();
          // }
          else if (location.indexOf("urbanoutfitters.com") > -1) {
               scrapedProduct = scrapeUrbanoutfitters();
          } else if (location.indexOf("sportsdirect.com") > -1) {
               scrapedProduct = scrapeSportsDirect();
          } else if (location.indexOf("boohoo.com") > -1) {
               scrapedProduct = scrapeBoohoo();
          } else if (location.indexOf("shein.co.uk") > -1) {
               scrapedProduct = scrapeShein();
          } else if (location.indexOf("office.co.uk") > -1) {
               scrapedProduct = scrapeOffice();
          } else if (location.indexOf("uniqlo.com/uk") > -1) {
               scrapedProduct = scrapeUniqlo();
          } else if (location.indexOf("matchesfashion.com") > -1) {
               scrapedProduct = scrapeMatchesfashion();
          }

          console.log(scrapedProduct);

          if (scrapedProduct) {
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

/*================================ SCRAPE FUNCTIONS ==============================*/

// function scrapeAmazon() {
//      var dealDiv = document.getElementById("priceblock_dealprice_row");
//      var availabilityDiv = document.getElementById("availability_feature_div");

//      var title = document.getElementById("productTitle").innerText;
//      var imageUrl = document.querySelector("li.selected img").src;

//      var price = "";
//      //var discountPrice = '';

//      if (dealDiv) {
//           price = document.querySelector(".priceBlockStrikePriceString").textContent;
//           // discountPrice = document.getElementById('priceblock_dealprice').innerText;
//      } else if (availabilityDiv) {
//           var priceBlockElem = document.querySelector("#priceblock_ourprice");

//           if (priceBlockElem) {
//                price = priceBlockElem.innerText;
//                //  discountPrice= '-'
//           } else {
//                price = document.querySelector("#availability span") ? document.querySelector("#availability span").innerText : "";
//                if (price == "Temporarily out of stock." || price == "Currently unavailable.") {
//                     price = "Sold Out";
//                     // discountPrice = '-'
//                }
//           }
//      } else {
//           price = document.getElementById("priceblock_ourprice").innerText;
//           // discountPrice = document.getElementById('priceblock_ourprice').innerText;
//      }

//      var scrapedProduct = {
//           title: title,
//           imageUrl: imageUrl,
//           availability: "IN_STOCK",
//           referenceUrl: window.location.href,
//           website: "Amazon",
//           firstPrice: price,
//      };

//      console.log("DATA",scrapedProduct);

//      return scrapedProduct;
// }

function scrapeAmazon() {
     try {
          var title = document.getElementById("productTitle").innerText;
          var imageUrl = document.querySelector("li.selected img").src;
          var price1 = document.querySelector("#price_inside_buybox");
          var price2 = document.querySelector("#priceblock_ourprice");
          var price3 = document.querySelector("#priceblock_saleprice");

          let price = "";
          if (price1) {
               price = price1.innerText;
          } else if (price2) {
               price = price2.innerText;
          } else if (price3) {
               price = price3.innerText;
          }
          var scrapedProduct = {
               title: title,
               imageUrl: imageUrl,
               availability: "IN_STOCK",
               referenceUrl: window.location.href,
               website: "Amazon",
               firstPrice: price,
          };

          return scrapedProduct;
     } catch (e) {
          console.log(e);
     }
}
function scrapeCurrys() {
     try {
          var title = document.querySelector(".page-title").innerText;
          var price = document.querySelector(".ProductPriceBlock__Price-eXasuq").innerText;
          var imageUrl = document.querySelector(".iiz__img").src;

          var scrapedProduct = {
               title: title,
               imageUrl: imageUrl,
               availability: "IN_STOCK",
               referenceUrl: window.location.href,
               website: "Currys",
               firstPrice: price,
          };

          return scrapedProduct;
     } catch (e) {
          console.log(e);
     }
}

function scrapeWayfair() {
     try {
          var title = document.querySelector("h1.pl-Heading").innerText;
          var price = document.querySelector(".StandardPriceBlock").innerText;
          var image1 = document.querySelector(".pl-FluidImage-image");
          var image2 = document.querySelector(".ImageComponent-image");
          var imageUrl;
          if (image1) {
               imageUrl = image1.src;
          } else if (image2) {
               imageUrl = image2.src;
          }
          var scrapedProduct = {
               title: title,
               imageUrl: imageUrl,
               availability: "IN_STOCK",
               referenceUrl: window.location.href,
               website: "Wayfair",
               firstPrice: price,
          };

          return scrapedProduct;
     } catch (e) {
          console.log(e);
     }
}

function scrapeZara() {
     try {
          var title = document.querySelector("h1.product-detail-info__name").innerText;
          var price = document.querySelector(".price__amount").innerText;
          var imageUrl = document.querySelector(".media-image__image.media__wrapper--media").src;

          var scrapedProduct = {
               title: title,
               imageUrl: imageUrl,
               availability: "IN_STOCK",
               referenceUrl: window.location.href,
               website: "Zara",
               firstPrice: price,
          };

          return scrapedProduct;
     } catch (e) {
          console.log(e);
     }
}

function scrapeAsos() {
     try {
          var title = document.querySelector(".product-hero h1").innerText;
          var price = document.querySelector('[data-id="current-price"]').textContent;
          var imageUrl = document.querySelectorAll("div.image-container.zoomable")[1].querySelector("img").src;

          var scrapedProduct = {
               title: title,
               imageUrl: imageUrl,
               availability: "IN_STOCK",
               referenceUrl: window.location.href,
               website: "Asos",
               firstPrice: price,
          };

          return scrapedProduct;
     } catch (e) {
          console.log(e);
     }
}

function scrapeIKEA() {
     try {
          // var title = document.querySelector('.to-print h1').innerText
          // var price = document.querySelector('span[class^=ProductPriceBlock__Price-]').innerText
          // var imageUrl = document.querySelector('.product-image').src;

          var title = document.querySelector("h1.range-revamp-header-section").innerText;
          var price = document.querySelector(".range-revamp-pip-price-package__main-price").innerText;
          var imageUrl = document.querySelector("div.range-revamp-media-grid__media-container img").src;

          var scrapedProduct = {
               title: title,
               imageUrl: imageUrl,
               availability: "IN_STOCK",
               referenceUrl: window.location.href,
               website: "Ikea",
               firstPrice: price,
          };

          return scrapedProduct;
     } catch (e) {
          console.log(e);
     }
}

function scrapeNETAPORTER() {
     try {
          var desiner = document.querySelector(".ProductInformation83__designer").innerText;
          var title = document.querySelector("p.ProductInformation83__name").innerText;
          var priceDOM = document.querySelector("span.PriceWithSchema9__value--details");
          var salePriceDOM = document.querySelector("div.PriceWithSchema9__value--sale");

          // console.log(priceDOM, priceDOM.innerText);

          var price = "";

          if (!priceDOM) {
               price = salePriceDOM.innerText;
          } else price = priceDOM.innerText;

          var imageUrl = document.querySelector("picture img").src;

          var scrapedProduct = {
               title: desiner + " " + title,
               imageUrl: imageUrl,
               availability: "IN_STOCK",
               referenceUrl: window.location.href,
               website: "Porter",
               firstPrice: price,
          };

          return scrapedProduct;
     } catch (e) {
          console.log(e);
     }
}

function scrapeJohnLewis() {
     try {
          var title = document.querySelector(".product-header__title").innerText;
          var price = document.querySelector(".price.price--large.price--large--anyday").innerText;
          // var salePriceDOM = document.querySelector("div.PriceWithSchema9__value--sale");
          var imageUrl = document.querySelector(".swiper-slide img").src;

          var scrapedProduct = {
               title: title,
               imageUrl: imageUrl,
               availability: "IN_STOCK",
               referenceUrl: window.location.href,
               website: "JohnLewis",
               firstPrice: price,
          };

          return scrapedProduct;
     } catch (e) {
          console.log(e);
     }
}

function scrapeMade() {
     try {
          var title = document.querySelector(".styles__ProductName-sc-1f0ybwc-7").innerText;
          var price = document.querySelector(".ProductPrice__Price-z224l3-1").innerText;
          // var salePriceDOM = document.querySelector("div.PriceWithSchema9__value--sale");

          var imageUrl = document.querySelector(".ResponsiveImage__Image-sc-1oncuu5-0").src;

          var scrapedProduct = {
               title: title,
               imageUrl: imageUrl,
               availability: "IN_STOCK",
               referenceUrl: window.location.href,
               website: "Made",
               firstPrice: price,
          };

          return scrapedProduct;
     } catch (e) {
          console.log(e);
     }
}

function scrapeHabitat() {
     try {
          var title = document.querySelector(".Namestyles__Main-sc-269llv-1 span").innerText;

          var price = document.querySelector(".Pricestyles__Li-sc-1oev7i-0  h2").innerText;
          // var salePriceDOM = document.querySelector("div.PriceWithSchema9__value--sale");

          var imageUrl = document.querySelector(".MediaGallerystyles__ImageWrapper-sc-1jwueuh-2 img").src;

          var scrapedProduct = {
               title: title,
               imageUrl: imageUrl,
               availability: "IN_STOCK",
               referenceUrl: window.location.href,
               website: "Habitat",
               firstPrice: price,
          };

          return scrapedProduct;
     } catch (e) {
          console.log(e);
     }
}

function scrapeHandM() {
     try {
          var title = document.querySelector(".product-item-headline").innerText;

          var price = document.querySelector(".ProductPrice-module--productItemPrice__2rpyB").innerText;

          var imageUrl = document.querySelector(".product-detail-main-image-container img").src;

          var scrapedProduct = {
               title: title,
               imageUrl: imageUrl,
               availability: "IN_STOCK",
               referenceUrl: window.location.href,
               website: "HandM",
               firstPrice: price,
          };

          return scrapedProduct;
     } catch (e) {
          console.log(e);
     }
}

function scrapeSelfridges() {
     try {
          var title = document.querySelector(".a-txt-product-description").innerText;

          var price = document.querySelector(".o-price").innerText;

          var imageUrl = document.querySelector(".c-image-gallery__img img").src;

          var scrapedProduct = {
               title: title,
               imageUrl: imageUrl,
               availability: "IN_STOCK",
               referenceUrl: window.location.href,
               website: "Selfridges",
               firstPrice: price,
          };

          return scrapedProduct;
     } catch (e) {
          console.log(e);
     }
}

function scrapeNext() {
     try {
          var title = document.querySelector(".Title h1").innerText;

          var price = document.querySelector(".nowPrice").innerText;

          var imageUrl = document.querySelector(".ProductImagery img").src;

          var scrapedProduct = {
               title: title,
               imageUrl: imageUrl,
               availability: "IN_STOCK",
               referenceUrl: window.location.href,
               website: "Next",
               firstPrice: price,
          };

          return scrapedProduct;
     } catch (e) {
          console.log(e);
     }
}

function scrapeEndclothing() {
     try {
          var title = document.querySelector("span[data-test='ProductDetails__Title']").innerText;
          var price = document.querySelector("span[data-test='PDP__Details__FinalPrice']").innerText;
          var imageUrl = document.querySelector("div[data-test='Gallery__Images'] img").src;
          var scrapedProduct = {
               title: title,
               imageUrl: imageUrl,
               availability: "IN_STOCK",
               referenceUrl: window.location.href,
               website: "Endclothing",
               firstPrice: price,
          };

          return scrapedProduct;
     } catch (e) {
          console.log(e);
     }
}

function scrapeUrbanoutfitters() {
     try {
          var title = document.querySelector(".c-pwa-product-meta-heading").innerText;
          var originalPrice = document.querySelector(".c-pwa-product-price__original");
          var currentPrice = document.querySelector(".c-pwa-product-price__current");

          var discountPrice = document.querySelector(".c-pwa-product-price__current--sale-temporary");
          var imageUrl = document.querySelector(".c-pwa-image-viewer__img img").src;

          var price = "";

          if (discountPrice) {
               price = discountPrice.innerText;
          } else if (currentPrice) price = currentPrice.innerText;
          else if (originalPrice) price = originalPrice.innerText;

          var scrapedProduct = {
               title: title,
               imageUrl: imageUrl,
               availability: "IN_STOCK",
               referenceUrl: window.location.href,
               website: "Urbanoutfitters",
               firstPrice: price,
          };

          return scrapedProduct;
     } catch (e) {
          console.log(e);
     }
}

function scrapeSportsDirect() {
     try {
          var title = document.querySelector("#lblProductName").innerText;
          var discountPrice = document.querySelector("#lblSellingPrice");
          var ogPrice = document.querySelector("#lblTicketPrice");
          var imageUrl = document.querySelector("#imgProduct").src;

          var price = "";

          if (discountPrice) {
               price = discountPrice.innerText;
          } else price = ogPrice.innerText;

          var scrapedProduct = {
               title: title,
               imageUrl: imageUrl,
               availability: "IN_STOCK",
               referenceUrl: window.location.href,
               website: "Sportsdirect",
               firstPrice: price,
          };

          return scrapedProduct;
     } catch (e) {
          console.log(e);
     }
}

function scrapeBoohoo() {
     try {
          var title = document.querySelector(".product-name").innerText;
          var discountPrice = document.querySelector(".price-sales");
          var ogPrice = document.querySelector(".price-standard");
          var imageUrl = document.querySelector(".product-thumbnails-list img").src;

          var price = "";

          if (discountPrice) {
               price = discountPrice.innerText;
          } else price = ogPrice.innerText;

          var scrapedProduct = {
               title: title,
               imageUrl: imageUrl,
               availability: "IN_STOCK",
               referenceUrl: window.location.href,
               website: "Boohoo",
               firstPrice: price,
          };

          return scrapedProduct;
     } catch (e) {
          console.log(e);
     }
}

function scrapeShein() {
     try {
          var title = document.querySelector(".product-intro__head-name").innerText;
          var price = document.querySelector(".product-intro__head-price").innerText;
          var imageUrl = document.querySelector(".product-intro__main-item  img").src;

          var scrapedProduct = {
               title: title,
               imageUrl: imageUrl,
               availability: "IN_STOCK",
               referenceUrl: window.location.href,
               website: "Shein",
               firstPrice: price,
          };

          return scrapedProduct;
     } catch (e) {
          console.log(e);
     }
}

function scrapeOffice() {
     try {
          var title = document.querySelector(".product__name").innerText;
          var nonSale = document.querySelector(".price__price");
          var salePrice = document.querySelector(".product__saleprice--now");
          var imageUrl = document.querySelector(".product-grid img").src;

          console.log(document.querySelector(".product-grid img"));
          console.log(document.querySelector(".product-grid img").src);
          var Brand = document.querySelector(".product__brand");

          if (Brand) {
               title = Brand.innerText + " - " + title;
          }
          let price;
          if (nonSale) {
               price = nonSale.innerText;
          } else if (salePrice) {
               price = salePrice.innerText;
          }
          var scrapedProduct = {
               title: title,
               imageUrl: imageUrl,
               availability: "IN_STOCK",
               referenceUrl: window.location.href,
               website: "Office",
               firstPrice: price,
          };

          console.log(scrapedProduct);
          return scrapedProduct;
     } catch (e) {
          console.log(e);
     }
}

function scrapeUniqlo() {
     try {
          var title = document.querySelector(".pdp__title").innerText;
          var price = document.querySelector(".pdp-price-current").innerText;
          var imageUrl = document.querySelector(".pdp__mainImg").src;

          var scrapedProduct = {
               title: title,
               imageUrl: imageUrl,
               availability: "IN_STOCK",
               referenceUrl: window.location.href,
               website: "Uniqlo",
               firstPrice: price,
          };
          return scrapedProduct;
     } catch (e) {
          console.log(e);
     }
}

function scrapeMatchesfashion() {
     try {
          var designer = document.querySelector("span[data-testid='ProductMainDescription-designer-link']");
          var title = document.querySelector("span[data-testid='ProductMainDescription-name']").innerText;
          var price = document.querySelector("span[data-testid='ProductPrice-billing-price']").innerText;
          var imageUrl = document.querySelector(".carousel__inner-slide img").src;

          if (designer) {
               title = designer.innerText + " - " + title;
          }

          var scrapedProduct = {
               title: title,
               imageUrl: imageUrl,
               availability: "IN_STOCK",
               referenceUrl: window.location.href,
               website: "Matchesfashion",
               firstPrice: price,
          };
          return scrapedProduct;
     } catch (e) {
          console.log(e);
     }
}

// async function scrapeZaraHome() {
//      await sleep(4000);

//      var title = document.querySelector(".header h2 span").innerText;

//      var price = document.querySelector(".price").innerText;

//      var imageUrl = document.querySelector(".detail-image").src;

//      var scrapedProduct = {
//           title: title,
//           imageUrl: imageUrl,
//           availability: "IN_STOCK",
//           referenceUrl: window.location.href,
//           website: "ZaraHome",
//           firstPrice: price,
//      };

//      return scrapedProduct;
// }
