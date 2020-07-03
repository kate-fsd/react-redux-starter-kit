import * as firebase from "firebase";

import "firebase/auth";

import { firebaseConfig } from "./firebaseConfig";
import { ILoginServices } from "./namespace";

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

  public signInByService = async (service: ILoginServices): Promise<UserCredential> => {
    let provider;

    console.log(service)

    switch (service) {
      case "GOOGLE":
        provider = new firebase.auth.GoogleAuthProvider();
        break;
      case "FACEBOOK":
        provider = new firebase.auth.FacebookAuthProvider();
        break;
      case "TWITTER":
        provider = new firebase.auth.TwitterAuthProvider();
        break;
      case "GITHUB":
        provider = new firebase.auth.GithubAuthProvider();
        break;
      default:
        provider = null;
    }

    if (!provider) throw new Error('Oops, something went wrong!');

    return await firebase.auth().signInWithPopup(provider);
  };
}

export { Authorization as AuthorizationApi };
