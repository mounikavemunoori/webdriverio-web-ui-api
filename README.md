# WebDriverIoProject
 This projec supports for mobile, web, and api automation.
 To implement the web, api and mobile automation scripts , created the separate folder under test folder
 ```
 test
     web
     api
     mobile
```
Created the three different configs for api , web and mobile tests

# Prerequisites
```
 Node.js

 Appium Server

 Appium Inspector (to find selector)

 Android Studio (for device emulator)

 An Android emulator or real device

mobile debugging note- chrome://inspect/#devices (to find locator on web) for android

 Xcode (for iOS Simulator)
 ``` 

# WEB

## Step 1: Prerequisites
Make sure you have Node.js installed on your machine. webdriverio requires Node.js version 20 or above. You can check your Node.js version by running the command in your terminal.
```
node -v
```
## Step 2: Create a new project
Create a new directory for your project and navigate to it in your terminal.

## Step 3: Clone the repositoryand
```
Then navigate into the project
```
## Step4: How to setup:
Clone the project and run below command to install the packages

```
npm install
```

# API
TO API api automation, install the supertest node module

## Step 5: Run below command to install api node module
```
 npm install supertest --save-dev
```

## Step 6: To install Chai using npm, can run the following command in the project directory:
```
 npm install chai --save-dev
```

# APPIUM/MOBILE

## Step 7: To install Appium dependencies in project using npm
```
npm install @wdio/appium-service --save-dev
```

# How to run the test:

## Note:

Here I have created the three different configs for api , web and mobile 

## Step 8: Run web all tests use below command
```
npx wdio run .\wdio.web.conf.js
```

## Step 9: Run api all tests use below command
```
npx wdio run .\wdio.api.conf.js
```

## Step 10: Run mobile all tests use below command

Make sure before running the mobile test cases, need to start the appium server using below command
```
 appium server --allow-cors
```

### To execute the Android test cases
```
npx wdio run .\wdio.android.config.js
```
### To execute the ios test cases

```
npx wdio run .\wdio.ios.config.js
```

# specific spec / test file
npx wdio run .\wdio.android.config.js --spec .\tests\mobile\cheapFlightsHomePage.spec.js

# specific suite / test suite
```
npx wdio run .\wdio.android.config.js -- --suite "suiteName"
```

# specific test case
```
npx wdio run .\wdio.android.config.js -- --spec ./to/file/location.js --mochaOpts.grep "testcase name"
```

```
    npm run test-android -- --suite "suiteName" --mochaOpts.grep "testcase name"

    npx wdio run wdio.android.conf.js --spec test/mobile/ --mochaOpts.grep "TC01 - Verify Cheapflights logo is displayed on home page"
```

To inspect the hybrid mobile apps, we should connect with emulator/real device , then go to chrome type

```
chrome://inspect/#devices
```

# Step 11 : To Generate the reports run ,need to download the specific reports, 
```
npm install -g allure-commandline --save-dev
```

# Step 12: Need to change the wdio.config.js with below piece of code in reports config section
```
reporters: [
        ['allure', {
            outputDir: './allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
        }],
]
```

# Generate the reprots using below command
```
allure generate allure-results --clean -o allure-report
```
```
allure open
```

Reports will be stored in the allure-report folder 

