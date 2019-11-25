// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth: {
    clientId: "W1dkklCZ0Le14gWwsVlQK1GGv1hC6Lr7",
    domain: "dev-wfu-vo-p.auth0.com",
    audience: "http://localhost:4200",
    redirect: "http://localhost:4200/home"
  },
  api: {
    uri: 'http://localhost:80/LaComanda/public/'
  },
  recaptcha: {
    siteKey : "6Lf08b8UAAAAAK8RH2kNOj0KoiyMsktaTS4ftqH1"
  }
};

export const firebaseConfig = {
  apiKey: "AIzaSyA7Eq9PIvwgntnIMg3Wnh2O3QMxLJisi6k",
  authDomain: "la-comada-web.firebaseapp.com",
  databaseURL: "https://la-comada-web.firebaseio.com",
  projectId: "la-comada-web",
  storageBucket: "la-comada-web.appspot.com",
  messagingSenderId: "722061289657",
  appId: "1:722061289657:web:a073d3bbe79d5a00849368"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
