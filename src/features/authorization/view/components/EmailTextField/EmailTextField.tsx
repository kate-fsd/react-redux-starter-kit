import React from "react";

//import './EmailTextField.scss';
import TextField from '@material-ui/core/TextField';


type IProps = {
  onEmailChanged: (email: string) => void;
  isError: boolean;
  error: string;
  value: string
};

function EmailTextField(props: IProps) {

  const handleChange = () => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const email = event.target.value;
    props.onEmailChanged(email);
  };
  
  const helperText: string | null = props.isError ? props.error : null;

  return (
    <TextField
    id="email-text-field"
    name="email"
    type="email"
    label="Email"
    required={true}
    //value={value}
    onChange={handleChange()}
    error={props.isError}
    helperText={helperText}
    className={'email-text-field'}
    fullWidth={true}
    value={props.value}
    variant="outlined"
  />
  );
}

export { EmailTextField };
