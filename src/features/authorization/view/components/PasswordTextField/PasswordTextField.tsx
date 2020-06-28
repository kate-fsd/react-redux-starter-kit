import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
//import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { block } from "bem-cn";
import { tKeys, ITranslationProps, withTranslation } from "services/i18n";
import './PasswordTextField.scss';
//import classNames from "classnames";

type IState = {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  isShown: boolean;
  isError: boolean;
};

type IProps = {
  test: string;
  hasHelpers: boolean;
  onPasswordChanged: (password: string) => void;
  verification: {
    hasLowcaseLetter: boolean;
    hasUppercaseLetter: boolean;
    hasDigit: boolean;
    hasEightSigns: boolean;
  }
  isError: boolean;
};

const b = block("password-text-field");
const { authorization: intl } = tKeys.features;

function PasswordTextFieldComponent(props: IProps & ITranslationProps) {
  const [values, setValues] = React.useState<IState>({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    isShown: false,
    isError: false
  });



  const handleChange = (prop: keyof IState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const password = event.target.value;
    setValues({ ...values, [prop]: password });
    props.onPasswordChanged(password);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, isShown: !values.isShown });
  };

  // const handleMouseDownPassword = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   event.preventDefault();
  // };


  const renderHelpers = () => {
    const { t, verification: v } = props;
    type IGetClasses = (condition: boolean) => string;
    const getClasses: IGetClasses = (condition: boolean): string =>
      condition ? b("helper", { type: "success" }) : b("helper");

    return (
      <FormHelperText id="password-text-field-helper">
        <div className={b("helpers")}>
          <div className={getClasses(v.hasLowcaseLetter)}>
            {t(intl.ruleLowcaseLetter)}
          </div>
          <div className={getClasses(v.hasUppercaseLetter)}>
            {t(intl.ruleUppercaseLetter)}
          </div>
          <div className={getClasses(v.hasDigit)}>{t(intl.ruleDigit)}</div>
          <div className={getClasses(v.hasEightSigns)}>
            {t(intl.ruleMinSigns)}
          </div>
        </div>
      </FormHelperText>
    );
  };

  return (
    <FormControl fullWidth={true} required={true} error={props.isError}>
      <InputLabel htmlFor="password-text-field">Password</InputLabel>
      <Input
        id="password-text-field"
        type={values.isShown ? "text" : "password"}
        value={values.password}
        onChange={handleChange("password")}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              //onMouseDown={handleMouseDownPassword}
            >
              {values.isShown ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        aria-describedby="password-text-field-helper"
      />
      {props.hasHelpers && renderHelpers()}
    </FormControl>
  );
}

const PasswordTextField = withTranslation()(PasswordTextFieldComponent);
export { PasswordTextField };
