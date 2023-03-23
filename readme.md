# Using Google Sheets API with a Chrome Extension MV3 #

#### Overview ###

I recently had a project I was working on that used a chrome extension to display data from a google sheet on the Options page. With the update to MV3 this made it challenging to use the Google sheets api since it doesn't accept a reference to external sites where code is stored. 

#### Checklist before starting ####

1. Go to [title] (https://console.cloud.google.com/)  Create a project here.  
2. Go to Enabled APIs and Services and click on "Enable APIS and Services" Here you will Add Google Sheets API. 
3. Once you have the Google Sheets API enabled you can click on "Credentials" and then "Create Credentials" Select "Oath ClientID" from the dropdown. Then Select "Chrome app" for the Application type. 
4. When you move to the next step in creating the Oath credentials you will need to add Scopes. Add the following: "https://www.googleapis.com/auth/drive", "https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive.readonly",
      "https://www.googleapis.com/auth/drive.file", "https://www.googleapis.com/auth/userinfo.email"

5. The Application ID can be retrieved by going to Chrome://extensions in your chrome browser and then making sure developer mode is enabled. From there you can click on "Pack Extension" and then browse to the directory you have your Chrome Extension.  Once you do that you will have a file created that says yourappname.pem. Open this with Notepad and that will be your "key". You can save your key in the Manifest.json file where you see "Key".  

6. In your project it will ask for an App ID. You can find this by going to your extension in Chrome://extensions and it will be located under the title of your app. You will put that in the AppID.  

#### Things to Note ####

1. I am working on getting this published so you will be able to see that it works. Right now it is in development so you will need permission. You can email me with the email address you use in Chrome and I will add you to the developer list. 
2. I am not an expert programmer by any means. So if you see something that can be improved on you can do a pull request and I appreciate the help. 
3. As you look in the code for the Edit, Create, and delete it is important to pay attention to the order of the input. Make sure it matches what is in the spreadsheet. 
