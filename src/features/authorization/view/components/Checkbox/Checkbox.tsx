import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

type IProps = { text: string };

export default function CheckboxComponent(props: IProps) {
  return (
    <FormGroup row>
      <FormControlLabel control={<Checkbox />} label={props.text} />
    </FormGroup>
  );
}

export { CheckboxComponent as Checkbox };
