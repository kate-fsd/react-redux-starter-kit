import { withStyleSheet, WithStyles, Theme } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = (_theme: Theme) => ({
  root: rule({
    padding: '20px',
  }),
  paper: rule({
    width: 300,
  }),
  gridItem: rule({
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    margin: 20,
  }),
});

export const provideStyles = withStyleSheet(styles);
export type StylesProps = WithStyles<typeof styles>;
