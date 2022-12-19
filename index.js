import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from "react-native-fbsdk";
var arr = [];

const getPublicProfile = async (resolve, reject, ...item) => {
  const infoRequest = new GraphRequest(
    "/me?fields=id,name,picture,email,first_name,last_name",
    null,
    (error, result) => {
      var v = [];
      v.push(result);

      if (error) {
        console.log("Error fetching data: " + error.toString());
        reject(error);
      } else {
        let tempArr = [];

        item.map((x, i) => {
          tempArr.push({ [x]: result[x] });
        });

        if (item == "all_data") {
          resolve(result);
        } else {
          resolve(tempArr);
        }
      }
    }
  );
  new GraphRequestManager().addRequest(infoRequest).start();
};

const loginWithFacebook = (event, ...item) => {
  // arr.push(item)

  return new Promise((resolve, reject) => {
    if (event == "login") {
      LoginManager.logInWithPermissions(["public_profile", "email"]).then(
        function (result, error) {
          if (error) {
            console.log("login has error: " + result.error);
          } else if (result.isCancelled) {
            console.log("login is cancelled.");
          } else {
            // setLoggedIn(true);
            //   console.log("Login successfully");

            AccessToken.getCurrentAccessToken().then((data) => {
              console.log(data.accessToken.toString());
              getPublicProfile(resolve, reject, ...item);
            });
          }
        }
      );
    }

    if (event == "logout") {
      try {
        //   resolve(true);
        LoginManager.logOut();
        //   console.log("You are logout successfully");
        // Removing user Info
        // setgoogleData([]);
      } catch (error) {
        reject(error);
        console.error(error);
      }
    }
  });
};

module.exports = loginWithFacebook;
