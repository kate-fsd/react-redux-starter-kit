import React from "react";
// import { withStyles } from "@material-ui/core/styles";
// import { green } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
// import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@material-ui/icons/CheckBox";
// import Favorite from "@material-ui/icons/Favorite";
// import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

type IProps = { text: string };

export default function CheckboxComponent(props: IProps) {
  // const [state, setState] = React.useState({
  //   checkedA: true,
  // });

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            //checked={state.checkedA}
            //onChange={handleChange}
            //name="checkbox"
          />
        }
        label={props.text}
      />
    </FormGroup>
  );
}

export { CheckboxComponent as Checkbox };
