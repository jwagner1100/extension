import mixpanel from "mixpanel-browser";
mixpanel.init("8fed34c2856185b24f5c8abd383fafe4");
export default {
     test() {
          try {
               mixpanel.track("test");
          } catch (e) {
               console.log("error", e);
          }
     },

     homeVisit() {
          try {
               mixpanel.track("Trolli Main Page");
          } catch (e) {
               console.log("error", e);
          }
     },
     settingsVisit() {
          try {
               mixpanel.track("Trolli Settings Page");
          } catch (e) {
               console.log("error", e);
          }
     },

     deleteItem(item) {
          try {
               mixpanel.track("Delete Trolli Item", {
                    ItemName: item.title,
                    ItemFirstPrice: item.firstPrice,
                    ItemCurrentPrice: item.price,
                    ItemShop: item.website,
                    ItemURL: item.referenceUrl,
                    ItemImg: item.imageUrl,
                    ItemBasket: item.category,
                    ItemAvailability: item.availability,
               });
          } catch (e) {
               console.log("error", e);
          }
     },

     addItem(item, widgetSource) {
          try {
               mixpanel.track("Add Trolli Item", {
                    ItemName: item.title,
                    ItemFirstPrice: item.firstPrice,
                    ItemCurrentPrice: item.price,
                    ItemShop: item.website,
                    ItemURL: item.referenceUrl,
                    ItemImg: item.imageUrl,
                    ItemBasket: item.category,
                    ItemAvailability: item.availability,
                    WidgetSource: widgetSource,
               });
          } catch (e) {
               console.log("error", e);
          }
     },

     login(email, name, pic) {
          try {
               mixpanel.identify(email);
               mixpanel.track("Login Complete");
               mixpanel.people.set({
                    $email: email,
                    $name: name,
                    $avatar: pic,
               });
          } catch (e) {
               console.log("error", e);
          }
     },

     loginStart() {
          try {
               mixpanel.track("Login start");
          } catch (e) {
               console.log("error", e);
          }
     },
     loginPage() {
          try {
               mixpanel.track("Trolli Login Page ");
          } catch (e) {
               console.log("error", e);
          }
     },
     newBasket(basketName) {
          try {
               mixpanel.track("New Basket", { BasketName: basketName });
          } catch (e) {
               console.log("error", e);
          }
     },
     deleteBasket(basketName, noOfItems) {
          try {
               mixpanel.track("Delete Basket", { BasketName: basketName, NumberOfItemsInBasket: noOfItems });
          } catch (e) {
               console.log("error", e);
          }
     },

     logout() {
          try {
               mixpanel.track("Logout");
          } catch (e) {
               console.log("error", e);
          }
     },

     widgetToggle(pos) {
          try {
               mixpanel.track("WidgetToggle", { position: pos });
          } catch (e) {
               console.log("error", e);
          }
     },
};
