import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button, Dialog, Grid, Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(10),
    textAlign: 'center',
  },
  unrecommendedButton: {
    padding: theme.spacing(5),
    margin: theme.spacing(5),
    height: 30,
    backgroundColor: '#D3D3D3',
    borderRadius: '5em',
    fontSize: 'small',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendedButton: {
    padding: theme.spacing(5),
    margin: theme.spacing(5),
    backgroundColor: theme.palette.primary.main,
    height: 30,
    borderRadius: '5em',
    fontSize: 'small',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export interface ActionableDialogProps {
  open: boolean;
  setOpen: () => void;
  content: string | JSX.Element;
  buttonTitle: string | JSX.Element;
  buttonOnClick: () => void;
  openCloseButtonTitle: string | JSX.Element;
  openCloseButtonStyle?: string;
  recommendedAction?: 'cancel' | 'other';
}

// only for dialogs with a question + 2 buttons (cancel on left, some other button on right thats defined by props)
export function ActionableDialog(props: ActionableDialogProps) {
  const classes = useStyles();
  const {
    open, setOpen, content, buttonTitle, buttonOnClick, openCloseButtonTitle, openCloseButtonStyle, recommendedAction
  } = props;

  return (
    <>
      <Button className={openCloseButtonStyle ?? classes.recommendedButton} onClick={setOpen}>{openCloseButtonTitle}</Button>
      <Dialog onClose={setOpen} aria-labelledby="simple-dialog-title" open={open}>
        <Grid className={classes.dialog} container direction="column" spacing={5} justify="center">
          <Grid item>
            <Typography variant="h4">{content}</Typography>
          </Grid>

          <Grid container direction="row" spacing={5} justify="center">
            <Button className={recommendedAction == 'cancel' ? classes.recommendedButton : classes.unrecommendedButton} onClick={setOpen}>Cancel</Button>
            <Button className={recommendedAction == 'cancel' ? classes.unrecommendedButton : classes.recommendedButton} onClick={buttonOnClick}>{buttonTitle}</Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
