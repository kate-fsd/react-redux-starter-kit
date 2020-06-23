import { autobind } from 'core-decorators';
import React from 'react';
import block from 'bem-cn';

import * as signUp from 'features/authorization';
import { withAsyncFeatures } from 'core';
import { withTranslation, ITranslationProps, useTranslation, tKeys } from 'services/i18n';

import { Layout } from '../../../../shared';
//import { SignUpCard } from 'features/authorization/view/containers';
//import './UsersSearchLayout.scss';

interface IFeatureProps {
  signUpFeatureEntry: signUp.Entry;
}

type IProps = IFeatureProps;

const b = block('sign-up-layout');

// class SignUpLayoutComponent extends React.PureComponent<IProps, IState> {
//   const { signUpFeatureEntry: { containers } } = props;
//   const { SignUpCard } = containers;
//   const { t } = useTranslation();

//   return (
//     <Layout title={t(tKeys.features.authorization.signUp.title)}>
//       <div className={b('sing-up-card')}>
//         <SignUpCard />
//         уеые
//       </div>
//     </Layout>
//   );

// }

function SignUpLayoutComponent(props: IProps) {
  const { signUpFeatureEntry: { containers } } = props;
  const { SignUpCard } = containers;
  const { t } = useTranslation();

  return (
    <Layout title={t(tKeys.features.authorization.signUp.title)}>
      <div className={b('sing-up-card')}>
        <SignUpCard />
        уеые
      </div>
    </Layout>
  );
}

const SignUpLayout = withAsyncFeatures({
  signUpFeatureEntry: signUp.loadEntry,
})(SignUpLayoutComponent);

export { SignUpLayout, SignUpLayoutComponent, IProps as ISignUpLayoutProps };




// function SignUpLayoutComponent(props: IProps) {
//   const { signUpFeatureEntry: { containers } } = props;
//   const { SignUpCard } = containers;
//   const { t } = useTranslation();

//   return (
//     <Layout title={t(tKeys.features.authorization.signUp.title)}>
//       <div className={b('sing-up-card')}>
//         <SignUpCard />
//         уеые
//       </div>
//     </Layout>
//   );

// }
