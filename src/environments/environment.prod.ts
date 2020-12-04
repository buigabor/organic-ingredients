import * as env from '../../env.json';

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: `${env.FIREBASE_API_KEY}`,
    authDomain: 'shopping-for-ingredients.firebaseapp.com',
    databaseURL: 'https://shopping-for-ingredients.firebaseio.com',
    projectId: 'shopping-for-ingredients',
    storageBucket: 'shopping-for-ingredients.appspot.com',
    messagingSenderId: '119935973729',
    appId: '1:119935973729:web:8051084c24e8653ff02d20',
  },
};
