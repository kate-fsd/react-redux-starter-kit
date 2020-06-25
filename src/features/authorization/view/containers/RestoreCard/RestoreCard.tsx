import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { Form, FormRenderProps } from 'react-final-form';
import { Link } from 'react-router-dom';
import { autobind } from 'core-decorators';

import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';
import { TextInputField } from 'shared/view/form';
import { Button } from 'shared/view/elements';
import { IAppReduxState } from 'shared/types/app';

import { IRestorePayload } from '../../../namespace';
import { actionCreators, selectors } from '../../../redux';

//import './RestoreCard.scss';

interface IOwnProps {
  //onSubmit(values: IRestorePayload): void;
}

interface IStateProps {
  isUserSigningUp: boolean;
}

type IActionProps = typeof mapDispatch;
type IProps = IOwnProps & IStateProps & IActionProps & ITranslationProps;

const mapDispatch = {
  restore: actionCreators.restore,
};

function mapState(state: IAppReduxState): IStateProps {
  return {
    isUserSigningUp: selectors.selectCommunication(state, 'restore').isRequesting,
  };
}

const b = block('restore-card');
const { authorization: intl } = tKeys.features;

//const helper = (<div>Подсказка</div>);

class RestoreCardComponent extends React.PureComponent<IProps> {
  public render() {
    return (
      <Form
        onSubmit={this.handleFormSubmit}
        render={this.renderForm}
        subscription={{}}
      />
    );
  }

  @autobind
  private handleFormSubmit(values: IRestorePayload) {
    this.props.restore(values);
  }

  @autobind
  private renderForm({ handleSubmit }: FormRenderProps) {
    const { t } = this.props;
    return (
      <form className={b()} onSubmit={handleSubmit}>
        {/* {getState()} */}

        <Link to='/authorization/login'>
          {t(intl.login)}
        </Link>

        <p className={b('text')}>
          {t(intl.restoreText)}
        </p>

        <div className={b('text-input-field', 'email')}>
          <TextInputField
            id='email'
            name='email'
            required={true}
            type='email'
            label={t(intl.email)}
            t={t}
          />
        </div>

        <div className={b('button')}>
          <Button 
            variant="outlined" 
            type="submit"
          >
            {t(intl.buttonRestore)}
          </Button>
        </div>
      </form>
    )
  }
}

const connectedComponent = connect(mapState, mapDispatch)(RestoreCardComponent);
const RestoreCard = withTranslation()(connectedComponent);

export { RestoreCard, RestoreCardComponent, IProps as IRestoreProps }