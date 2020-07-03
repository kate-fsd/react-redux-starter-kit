import React from "react";
import {
  Input,
  IconButton,
  InputLabel,
  InputAdornment,
  FormHelperText,
  FormControl,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { block } from "bem-cn";

import { tKeys, ITranslationProps, withTranslation } from "services/i18n";
import "./PasswordTextField.scss";

type IState = {
  password: string;
  isShown: boolean;
};

type IProps = {
  hasHelpers?: boolean;
  onPasswordChanged: (password: string) => void;
  verification?: {
    hasLowcaseLetter: boolean;
    hasUppercaseLetter: boolean;
    hasDigit: boolean;
    hasEightSigns: boolean;
  };
  isError?: boolean;
};

const b = block("password-text-field");
const { authorization: intl } = tKeys.features;

function PasswordTextFieldComponent(props: IProps & ITranslationProps) {
  const [values, setValues] = React.useState<IState>({
    password: "",
    isShown: false,
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

  const renderHelpers = () => {
    const { t, verification: v } = props;
    if (!v) return;
    type IGetClasses = (condition: boolean) => string;
    const getClasses: IGetClasses = (condition?: boolean): string =>
      condition ? b("helper", { type: "success" }) : b("helper");

    return (
      <FormHelperText component="div">
        <div className={b("helpers")}>
          <div className={b("helpers-column")}>
            <div className={getClasses(v.hasLowcaseLetter)}>
              {t(intl.ruleLowcaseLetter)}
            </div>
            <div className={getClasses(v.hasUppercaseLetter)}>
              {t(intl.ruleUppercaseLetter)}
            </div>
          </div>

          <div className={b("helpers-column")}>
            <div className={getClasses(v.hasDigit)}>{t(intl.ruleDigit)}</div>
            <div className={getClasses(v.hasEightSigns)}>
              {t(intl.ruleMinSigns)}
            </div>
          </div>
        </div>
      </FormHelperText>
    );
  };

  return (
    <FormControl
      fullWidth={true}
      required={true}
      error={props.isError}
    >
      <InputLabel htmlFor="password-text-field">
        {props.t(intl.password)}
      </InputLabel>
      <Input
        id="password-text-field"
        name="password"
        type={values.isShown ? "text" : "password"}
        value={values.password}
        onChange={handleChange("password")}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
            >
              {values.isShown ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        aria-describedby="password-text-field-helper"
      />
      {props.hasHelpers && props.verification && renderHelpers()}
    </FormControl>
  );
}

const PasswordTextField = withTranslation()(PasswordTextFieldComponent);
export { PasswordTextField };
