/* eslint-disable class-methods-use-this */
import * as firebase from "firebase";

import "firebase/auth";

import { firebaseConfig } from "./firebaseConfig";

import UserCredential = firebase.auth.UserCredential;

class Authorization {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth();
  }

  public signUp = async (
    email: string,
    password: string
  ): Promise<UserCredential> =>
    await firebase.auth().createUserWithEmailAndPassword(email, password);

  public signIn = async (
    email: string,
    password: string
  ): Promise<UserCredential> =>
    await firebase.auth().signInWithEmailAndPassword(email, password);

  public resetPassword = async (email: string): Promise<void> => {
    await firebase.auth().sendPasswordResetEmail(email);
  };

  public signOut = async (): Promise<void> => {
    await firebase.auth().signOut();
  };

  // public signInByGoogle = async (): Promise<void> => {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   await firebase.auth().signInWithPopup(provider);
  // };

  public signInByGoogle = async (): Promise<UserCredential> => {
    var provider = new firebase.auth.GoogleAuthProvider();
    //let userCredential: UserCredential;
    return await firebase.auth().signInWithPopup(provider);

    //return userCredential;
  };

  public async stateChanged(setUser: (user: string) => void): Promise<void> {
    firebase.auth().onAuthStateChanged((user) => {
      if (user && user.email) {
        setUser(user.email);
      } else {
        setUser("");
      }
    });
  }
}

export { Authorization as AuthorizationApi };
