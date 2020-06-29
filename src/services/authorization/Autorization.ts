/* eslint-disable class-methods-use-this */
import * as firebase from 'firebase';

import 'firebase/auth';

import { firebaseConfig } from './firebaseConfig';

import UserCredential = firebase.auth.UserCredential;

class Authorization {
  // static googleSignIn(): ((event: import("react").MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined {
  //   throw new Error("Method not implemented.");
  // }
  constructor() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth();
  }

  public signUp = async (email: string, password: string): Promise<UserCredential> => 
    firebase.auth().createUserWithEmailAndPassword(email, password);
  
  public signIn = async (email: string, password: string): Promise<UserCredential> =>
    firebase.auth().signInWithEmailAndPassword(email, password);

  public signOut = async (): Promise<void> => {
    firebase.auth().signOut();
  };


  public googleSignIn = async (): Promise<void>  => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
  }


  public resetPassword = async (email: string): Promise<void> => {
    await firebase.auth().sendPasswordResetEmail(email);
  };

  public async stateChanged(setUser: (user: string) => void): Promise<void> {
    firebase.auth().onAuthStateChanged(user => {
      if (user && user.email) {
        setUser(user.email);
      } else {
        setUser('');
      }
    });
  }
}


// var provider = new firebase.auth.GoogleAuthProvider();

// function googleSignin() {
//    firebase.auth()
   
//    .signInWithPopup(provider).then(function(result) {
//       var token = result.credential.accessToken;
//       var user = result.user;
		
//       console.log(token)
//       console.log(user)
//    }).catch(function(error) {
//       var errorCode = error.code;
//       var errorMessage = error.message;
		
//       console.log(error.code)
//       console.log(error.message)
//    });
// }


export { Authorization as AuthorizationApi };