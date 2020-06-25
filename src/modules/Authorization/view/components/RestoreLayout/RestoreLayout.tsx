import React from 'react';
import block from 'bem-cn';

//import * as features from 'features';
import * as restore from 'features/authorization';
import { withAsyncFeatures } from 'core';
import { useTranslation, tKeys } from 'services/i18n';

import { Layout } from '../../../../shared';
//import './RestoreLayout.scss';

interface IFeatureProps {
  restoreFeatureEntry: restore.Entry;
}

type IProps = IFeatureProps;

const b = block('restore-layout');

function RestoreLayoutComponent(props: IProps) {
  const { restoreFeatureEntry: { containers } } = props;
  const { RestoreCard } = containers;
  const { t } = useTranslation();

  return (
    <Layout title={t(tKeys.features.authorization.restore)}>
      <div className={b()}>
        <RestoreCard />
      </div>
    </Layout>
  );
}

const RestoreLayout = withAsyncFeatures({
  restoreFeatureEntry: restore.loadEntry,
})(RestoreLayoutComponent);

export { RestoreLayout, RestoreLayoutComponent, IProps as IRestoreLayoutProps };