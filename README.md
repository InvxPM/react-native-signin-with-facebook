# react-native-signin-with-facebook

---

First of all install below depandancy

```{
npm install react-native-fbsdk
```

#### Step 1 : Create App On Facebook Developers And Add Basic App Info

**a )**

> Login with your facebook account and go to https://developers.facebook.com/ and create new app

![Screenshot](https://miro.medium.com/max/1400/1*iAt1Vn_SthnT3f9VJDHBlA.gif)

> On successful creation of app you will have an app id like my app id is “964336743958925” . Keep it safe . It will be used in future

---

**b )Add Basic Information**

> Go to your facebook app dashboard settings https://developers.facebook.com/apps/{app_id}/settings/basic/
> “app_id” , change it with our facebook app id
> Add “Contact Email, Privacy Policy Url, Category, App Icon, Business use” and then save

![Screenshot](https://miro.medium.com/max/1400/1*LOrBWkXGjCjydZxSirsSCA.png)

---

**c)Add Platform IOS**
Go to bottom of Basic Settings and add platform IOS . You have to add Bundle identifier of your app . You can find Bundle identifier in Xcode General Tab . As my app bundle identifier is “org.reactjs.native.example.FbSdkSample”

![Screenshot](https://miro.medium.com/max/1400/1*snFT8-8nOvsVnXpAuogfng.png)

#### See Steps For Add Platform IOS

![Screenshot](https://miro.medium.com/max/1400/1*_aejlhS93ea1FWVAnSRNQA.gif)

**D)Add Platform ANDROID**

You need to check “applicationId” of your android project which you can find in “android/app/build.gradle”

![Screenshot](https://miro.medium.com/max/1400/1*f5b3B3sIo8jLZahHpiS6gg.png)

#### _See Steps For Add Platform ANDROID_

![Screenshot](https://miro.medium.com/max/1400/1*m6iIJ4LgPhqGlOLaI2CW2Q.gif)

> i ) **Add “Google Play Package Name”** : which is **applicationId of android like my app have** “com.fbsdksample”
> **ii ) Class Name** : which will be for my app “com.fbsdksample.MainActivity” . Please Change according to your app id
> Note : If popup comes for package name verification select “**Use this package name**”

![Screenshot](https://miro.medium.com/max/902/1*q8q5x04WQTaKNx_Y2s_4Bg.png)

> iii ) **You have to Add** “Key Hashes” **for Debug and Release Build**

![Screenshot](https://miro.medium.com/max/1400/1*Z9D9M4hRRQjKFBIspdIqjw.png)

#### Please check these links to create hash key(Debug and Release)

- a ) Stackoverflow Link
- b) Stackoverflow Link
- c ) Fb Link

---

**Note : You do not need release hash key if you only want to test and do not want to publish app with release key store.**

---

**E )Make Facebook App Live**
![Screenshot](https://miro.medium.com/max/1400/1*Yg7mjxD_bCA34rgdvMWOdw.png)

#### Step 2: Add react-native-fbsdk library and link library

**a ) Add library**

```
yarn add react-native-fbsdk
```

Or, if using npm:

```{
npm install react-native-fbsdk
```

**b ) Link library**

- if react native ≥0.60

you have to just run this command for **IOS** only and nothing have to done for **ANDROID**

```
cd ios && pod install
```

**if react native version <0.60**

#### Step 3 : Configuration ANDROID/IOS Projects

**A) Android Configuration**

---

**a ) Add Facebook App ID**

1. Open your */app/res/values/strings.xml* file.
2. Add a *string* element with the name attribute facebook_app_id and value as your Facebook App ID (Replace it with your App Id)to the file. For example

```javascript
<string name="facebook_app_id">Facebook App ID</string>
<string name="facebook_client_token">Facebook Client Token</string>
```

**b ) Add uses-permission**

1.  Open /app/manifests/AndroidManifest.xml

2.  Add a uses-permission element to the manifest:
    <<uses-permission android:name="android.permission.INTERNET"/>>

**c ) Add a meta-data element to the application element:** 3. Open* /app/manifests/AndroidManifest.xml* 4. Add a *meta-data *element to the manifest:

        <application android:label="@string/app_name" ...>

            <meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>
            <meta-data android:name="com.facebook.sdk.ClientToken" android:value="@string/facebook_client_token"/>

        </application>

![Screenshot](https://miro.medium.com/max/1400/1*KTPPsgseuhH0ksSQO6SHvA.png)

---

**B) IOS Configuration**

**a )Configure Info.plist**

1.  In Xcode, right-click your project’s Info.plist file and select Open As -> Source Code.
2.  Insert the following XML snippet into the body of your file just before the final `</dict> `element.

    <key>CFBundleURLTypes</key>
    <array>
    <dict>
    <key>CFBundleURLSchemes</key>
    <array>
    <string>fb{your-app-id}</string>
    </array>
    </dict>
    </array>
    <key>FacebookAppID</key>
    <string>{your-app-id}</string>
    <key>FacebookDisplayName</key>
    <string>{your-app-name}</string>
    <key>LSApplicationQueriesSchemes</key>
    <array>
    <string>fbapi</string>
    <string>fb-messenger-share-api</string>
    <string>fbauth2</string>
    <string>fbshareextension</string>
    </array>

---

**Note : Replace {your-app-id}, and {your-app-name} with your app's App's ID and name found on the Facebook App Dashboard.**

![Screenshot](https://miro.medium.com/max/1400/1*nrCWMhuRGKiebYFZC2xHcg.png)

---

**b )Connect App Delegate**

> To post-process the results from actions that require you to switch to the native Facebook app or Safari, such as Facebook Login or Facebook Dialogs, you need to connect your AppDelegate class to the FBSDKApplicationDelegate object. To accomplish this, add the following code to your AppDelegate.m file.

    //  AppDelegate.m
    #import <FBSDKCoreKit/FBSDKCoreKit.h>

    - (BOOL)application:(UIApplication *)application
        didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

      // You can skip this line if you have the latest version of the SDK installed
      [[FBSDKApplicationDelegate sharedInstance] application:application
        didFinishLaunchingWithOptions:launchOptions];
      // Add any custom logic here.
      return YES;
    }

    - (BOOL)application:(UIApplication *)application
                openURL:(NSURL *)url
                options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {

      BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
        openURL:url
        sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
        annotation:options[UIApplicationOpenURLOptionsAnnotationKey]
      ];
      // Add any custom logic here.
      return handled;
    }

![Screenshot](https://miro.medium.com/max/1400/1*xFCdHUw1KKJ6EdHInu1msQ.png)

> Now add this line into app/build.gradlew

    implementation 'com.facebook.android:facebook-login:latest.release'

**Import this in your js file**

```javascript
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";

import FB from "react-native-signin-with-facebook";

const App = () => {
  const [FBData, setFBData] = useState([]);
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <TouchableOpacity
        style={styles.login_box}
        onPress={() => {
          //You will get particular data Like
          // id,name,email,first_name,last_name,picture

          FB("login", "name", "email", "id", "picture").then((i) => {
            // setFBData(i);
            console.log("====================================");
            console.log("My_data", JSON.stringify(i, null, 4));
            console.log("====================================");
          });
          // you can also get all data using 'all_data'

          FB("login", "all_data").then((i) => {
            // setFBData(i);
            console.log("====================================");
            console.log("My_data", JSON.stringify(i, null, 4));
            console.log("====================================");
          });
        }}
      >
        <Text style={styles.txt}>Login With Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logout_box}
        onPress={() => {
          FB("logout");
          setFBData([]);
        }}
      >
        <Text style={styles.txt}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  txt: {
    fontSize: 16,
    color: "white",
  },
  login_box: {
    backgroundColor: "darkblue",
    borderColor: "skyblue",
    borderWidth: 1,
    borderRadius: 12,
    width: "95%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  logout_box: {
    backgroundColor: "red",
    borderColor: "orange",
    borderWidth: 1,
    borderRadius: 12,
    width: "95%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
});
```
