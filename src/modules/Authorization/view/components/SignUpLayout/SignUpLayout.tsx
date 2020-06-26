import React from 'react';
import block from 'bem-cn';

import * as signUp from 'features/authorization';
import { withAsyncFeatures } from 'core';
import { useTranslation, tKeys } from 'services/i18n';

import { Layout } from '../../../../shared';
import './SignUpLayout.scss';

interface IFeatureProps {
  signUpFeatureEntry: signUp.Entry;
}

type IProps = IFeatureProps;

const b = block('sign-up-layout');

function SignUpLayoutComponent(props: IProps) {
  const { signUpFeatureEntry: { containers } } = props;
  const { SignUpCard } = containers;
  const { t } = useTranslation();

  return (
    <Layout title={t(tKeys.features.authorization.signUp)}>
      <div className={b()}>
        <SignUpCard />
      </div>
    </Layout>
  );
}

const SignUpLayout = withAsyncFeatures({
  signUpFeatureEntry: signUp.loadEntry,
})(SignUpLayoutComponent);

export { SignUpLayout, SignUpLayoutComponent, IProps as ISignUpLayoutProps };