import axios from "axios";

import store from "../store";

export default  () => {
     return {
          base: axios.create({
               baseURL: "https://api.yourtrolli.com/",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + store.state.token,
                    // 'Authorization': 'Bearer ' +"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMmE2MWU1YjI1MjBmYTIzNWE2MjFjMDk5ZjNjZTYzMzIyZTFjYTk3MmY2NzgyYmRiMDBmM2EwZTRhYWU5Y2MwMDc4MjRkMDYzOTI2Y2ExNGQiLCJpYXQiOjE1NzM3Mjk0NzksIm5iZiI6MTU3MzcyOTQ3OSwiZXhwIjoxNjA1MzUxODc5LCJzdWIiOiIxMTIiLCJzY29wZXMiOltdfQ.BCSwucuaU7aLK6MyYKM1JOGSTPmW3KuKuDYmMYkHou5myXjlm86jh1Rzk4qSNGBxDciwRCbcKus16y5e-zEZu-KXV-UqiWIek6fPn8PzHm81t1D-8ON0T8NIZ3KhBwH5GiUA8Cw-HuwTQdS394groBdN8nJNCtfFxRi_kRmIbZdGV2mH1czmaxeVUGklO0CvnmtaL_GkpIEm607FpHXYPnXBqLQlhpH038QjCUHRK4b49w6TZmBfUxZCsovGFGSemw61l5tc70mh9ooZLoakSkgTLRGMVyGftQU-WH_bwSU5FM6tfb5_XpDWcBM_e87gfJqg2TAqJTVmDtBeAiXeqHlu5WiFSapLIcPsPeHuI0g8Vi0nmv5chjfbJQjq9ExAQi_8gVaMgNp6v81fW7evthLmRx7UlvLS-_74jnlyxiCG2cJMox9lWK7dc_CqkiDEHa02rp4Sus8QXOcjQC0olLEF9ZpxacC7N4pwC5xLswoK6yudwFoc9wB-frEn0rzTm9VUV0OqsWBlJooHoNOZiYvBIxuQ0umbhmxIKG8NOFjkLAcwXnMGIHr085W5pxyp74RoNOSLMpq0QZr7FfmrVsXtZbcaow2mCMcLMcuob4ARSQy2J8rChRbtC5_Naigm4FNwF8uGMAL1TGh4LOt5KrCPjsakjhCqvqRzCE_B7wI"
               },
          }),
     };
};

// import axios from "axios";

// import store from "../store";

// function getToken() {
//      return new Promise((resolve, reject) => {
//           chrome.storage.sync.get(["token"], (result) => {
//                if (result.token) {
//                     resolve(result.token);
//                } else {
//                     reject();
//                }
//           });
//      });
// }

// export default () => {
//      return {
//           async base() {
//                return {
//                     base: axios.create({
//                          baseURL: "https://api.yourtrolli.com/",
//                          headers: {
//                               "Content-Type": "application/json",
//                               Authorization: "Bearer " + (await getToken()),
//                               // 'Authorization': 'Bearer ' +"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMmE2MWU1YjI1MjBmYTIzNWE2MjFjMDk5ZjNjZTYzMzIyZTFjYTk3MmY2NzgyYmRiMDBmM2EwZTRhYWU5Y2MwMDc4MjRkMDYzOTI2Y2ExNGQiLCJpYXQiOjE1NzM3Mjk0NzksIm5iZiI6MTU3MzcyOTQ3OSwiZXhwIjoxNjA1MzUxODc5LCJzdWIiOiIxMTIiLCJzY29wZXMiOltdfQ.BCSwucuaU7aLK6MyYKM1JOGSTPmW3KuKuDYmMYkHou5myXjlm86jh1Rzk4qSNGBxDciwRCbcKus16y5e-zEZu-KXV-UqiWIek6fPn8PzHm81t1D-8ON0T8NIZ3KhBwH5GiUA8Cw-HuwTQdS394groBdN8nJNCtfFxRi_kRmIbZdGV2mH1czmaxeVUGklO0CvnmtaL_GkpIEm607FpHXYPnXBqLQlhpH038QjCUHRK4b49w6TZmBfUxZCsovGFGSemw61l5tc70mh9ooZLoakSkgTLRGMVyGftQU-WH_bwSU5FM6tfb5_XpDWcBM_e87gfJqg2TAqJTVmDtBeAiXeqHlu5WiFSapLIcPsPeHuI0g8Vi0nmv5chjfbJQjq9ExAQi_8gVaMgNp6v81fW7evthLmRx7UlvLS-_74jnlyxiCG2cJMox9lWK7dc_CqkiDEHa02rp4Sus8QXOcjQC0olLEF9ZpxacC7N4pwC5xLswoK6yudwFoc9wB-frEn0rzTm9VUV0OqsWBlJooHoNOZiYvBIxuQ0umbhmxIKG8NOFjkLAcwXnMGIHr085W5pxyp74RoNOSLMpq0QZr7FfmrVsXtZbcaow2mCMcLMcuob4ARSQy2J8rChRbtC5_Naigm4FNwF8uGMAL1TGh4LOt5KrCPjsakjhCqvqRzCE_B7wI"
//                          },
//                     }),
//                };
//           },
//      };
//      console.log("heeee");
// };
