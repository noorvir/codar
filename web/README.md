# Codar: COVID-19 contact tracker


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Firebase

Install the firebase cli: `npm install -g firebase-tools`  
Log in: `firebase login`  

### `firebase deploy`

Deploys:  
* the `build` folder as the website (dont forget to run `npm run build` before a new deployment)  
* the database and storage security rules (`storage.rules`, `firestore.rules`)  
* the cloud functions inside the `functions` folder.

Only deploy the webiste: `firebase deploy --only hosting`  
Only deploy the firestore sec. rules: `firebase deploy --only firestore`  
Only deploy the storage sec. rules: `firebase deploy --only storage`  
Only deploy the cloud functions: `firebase deploy --only functions`   
Only deploy a specific cloud function: `firebase deploy --only functions:<function-name>`   

https://firebase.google.com/docs/cli  
https://firebase.google.com/docs/hosting  
https://firebase.google.com/docs/firestore  
https://firebase.google.com/docs/functions