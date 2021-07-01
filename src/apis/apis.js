import config from "./config.js";
import axios from "axios";

function getToken() {
     return new Promise((resolve, reject) => {
          chrome.storage.sync.get(["userToken"], (result) => {
               if (result.userToken) {
                    resolve(result.userToken);
               } else {
                    resolve(false);
               }
          });
     });
}

export default {
     async getTrolliItems() {
          return await config().base.get(`wishlist?pageNumber=1&pageSize=500`);
     },
     async addProduct(data) {
          return await config().base.post(`wishlist/`, data);
     },
     async getBaskets() {
          return await config().base.get(`wishlist/categories`);
     },
     async deleteItem(id) {
          return await config().base.delete(`wishlist/${id}`);
     },
     async deleteCategory(id) {
          return await config().base.delete(`wishlist/category?&category=${id}`);
     },
     async renameBasket(oldName, newName) {
          return await config().base.patch(`wishlist?category=${newName}&oldCategory=${oldName}`);
     },
     async search(txt) {
          return await config().base.get(`wishlist/search?text=${txt}`);
     },
     async updateCategory(id, val) {
          return await config().base.patch(`wishlist?id=${id}&category=${val}`);
     },
     async loginUser(token) {
          return await config().base.get(`/user/${token}`);
     },

     async checkItem(url) {
          return await config().base.post(`https://api.yourtrolli.com/wishlist/check`, { referenceUrl: url });
     },

     /*================================ without auth ==============================*/

     async addProduct2(data) {
          let token = await getToken();

          // console.log("akmar ", token);
          const res = await axios.post("https://api.yourtrolli.com/wishlist/", data, {
               headers: {
                    Authorization: "Bearer " + token,
               },
          });

          return res;
     },

     async checkItem2(url) {
          let token = await getToken();

          // console.log("akmar ", token);
          const res = await axios.post(
               "https://api.yourtrolli.com/wishlist/check",
               { referenceUrl: url },
               {
                    headers: {
                         Authorization: "Bearer " + token,
                    },
               }
          );

          return res;
     },

     async scrape(url) {
          let token = await getToken();
          const res = await axios.get(`https://api.yourtrolli.com/check/website?url=${url}`, {
               headers: {
                    Authorization: "Bearer " + token,
               },
          });
          return res;
     },

     //      async scrape(url) {
     //      let token = await getToken();
     //      const res = await axios.get(`https://api.yourtrolli.com/wishlist/product?url=${url}`, {
     //           headers: {
     //                Authorization: "Bearer " + token,
     //           },
     //      });
     //      return res;
     // },
};
