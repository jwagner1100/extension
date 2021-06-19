import apis from "./apis/apis.js";
import mixpanel from "./mixpanel";
let user_signed_in = false;

const CLIENT_ID = "239651112786-2hfq7alul07n77o2e37kiet05pl7g0ir.apps.googleusercontent.com";
const RESPONSE_TYPE = "id_token";
const REDIRECT_URI = "https://fmaceobkgpcdmljgdicmicdahpdkamem.chromiumapp.org";
const STATE = "asdklfjsd";
const SCOPE = "profile email";
const PROMPT = "consent";

function create_oauth2_url() {
     let nonce = encodeURIComponent(
          Math.random()
               .toString(36)
               .substring(2, 15) +
               Math.random()
                    .toString(36)
                    .substring(2, 15)
     );

     let url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&state=${STATE}&scope=${SCOPE}&prompt=${PROMPT}&nonce=${nonce}`;
     return url;
}

function is_user_signed_in() {
     return user_signed_in;
}

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
     if (request.message === "login") {
          if (is_user_signed_in()) {
               console.log("user is already signed in");
          } else {
               chrome.identity.launchWebAuthFlow(
                    {
                         url: create_oauth2_url(),

                         interactive: true,
                    },
                    async function(redirect_url) {
                         // console.log(redirect_url);
                         try {
                              let id_token = redirect_url.substring(redirect_url.indexOf("id_token=") + 9);
                              // console.log(id_token, "token");
                              id_token = id_token.substring(0, id_token.indexOf("&"));

                              // console.log("bab");
                              let resp = await apis.loginUser(id_token);

                              let token = resp.data.token;
                              let name = resp.data.user.name;
                              let picture = resp.data.user.picture;
                              let email = resp.data.user.email;

                              chrome.storage.sync.set({ userToken: token, userName: name, userPicture: picture, userEmail: email }, () => {
                                   mixpanel.login(email, name, picture);
                              });
                         } catch (e) {
                              sendResponse({ resp: "failed" });
                         }

                         sendResponse({ resp: "success" });
                    }
               );
               // return true;

               // let authURL = "https://accounts.google.com/o/oauth2/v2/auth";
               // const redirectURL = chrome.identity.getRedirectURL("oauth2");
               // console.log(redirectURL);
               // const auth_params = {
               //      client_id: CLIENT_ID,
               //      redirect_uri: redirectURL,
               //      response_type: "code",
               //      access_type: "offline",
               //      scope: "https://www.googleapis.com/auth/spreadsheets",
               // };
               // chrome.identity.launchWebAuthFlow({ url: create_oauth2_url(), interactive: true }, (responseURL) => console.log(responseURL));
          }
     } else if (request.message == "trolliItemAdded") {
          mixpanel.addItem(request.item, "Website Widget");
     }
});

// browser.tabs.executeScript({
//      file: "content-script.js",
// });

// console.log("hi");

// chrome.cookies.get({ url: "https://yourtrolli.com", name: "connect.sid" }, function(cookie) {
//      if (cookie) {
//           console.log(cookie.value);
//      } else {
//           console.log("Can't get cookie! Check the name!");
//      }
// });

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
// read changeInfo data and do something with it
// like send the new url to contentscripts.js
// console.log(changeInfo);
// if (changeInfo.status !== "complete" && changeInfo.status !== "loading") {
//      console.log("page url change");
//      chrome.tabs.sendMessage(tabId, {
//           message: "restart",
//      });
// }
// });
