import React from 'react';
import block from 'bem-cn';

import * as login from 'features/authorization';
import { withAsyncFeatures } from 'core';
import { useTranslation, tKeys } from 'services/i18n';

import { Layout } from '../../../../shared';
import './LoginLayout.scss';

interface IFeatureProps {
  loginFeatureEntry: login.Entry;
}

type IProps = IFeatureProps;

const b = block('login-layout');

function LoginLayoutComponent(props: IProps) {
  const { loginFeatureEntry: { containers } } = props;
  const { LoginCard } = containers;
  const { t } = useTranslation();

  return (
    <Layout title={t(tKeys.features.authorization.login)}>
      <div className={b()}>
        <LoginCard />
      </div>
    </Layout>
  );
}

const LoginLayout = withAsyncFeatures({
  loginFeatureEntry: login.loadEntry,
})(LoginLayoutComponent);

export { LoginLayout, LoginLayoutComponent, IProps as ILoginLayoutProps };