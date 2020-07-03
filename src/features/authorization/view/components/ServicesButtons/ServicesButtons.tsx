import React from "react";
import { block } from 'bem-cn';

import google from "./images/google.svg";
import facebook from "./images/facebook.svg";
import twitter from "./images/twitter.svg";
import github from "./images/github.svg";

import './ServicesButtons.scss';

type IProps = {
  loginByService: (payload: {service: string}) => void;
}
const b = block("services-buttons");


function ServicesButtons(props: IProps) {
  const login = props.loginByService;

  const handleClickOnGoogle = () => login({service: 'GOOGLE'});
  const handleClickOnFacebook = () => login({service: 'FACEBOOK'});
  const handleClickOnTwitter = () => login({service: 'TWITTER'});
  const handleClickOnGithub = () => login({service: 'GITHUB'});

  return (
    <div className={b()}>
      <img className={b('button')} src={google} onClick={handleClickOnGoogle}/>
      <img className={b('button')} src={facebook} onClick={handleClickOnFacebook}/>
      <img className={b('button')} src={twitter} onClick={handleClickOnTwitter}/>
      <img className={b('button')} src={github} onClick={handleClickOnGithub}/>
    </div>
  )  
}

export { ServicesButtons };