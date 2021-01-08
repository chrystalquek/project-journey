import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(10),
    textAlign: 'center',
  },
  cancelButton: {
    padding: theme.spacing(5),
    margin: theme.spacing(5),
    height: 30,
    backgroundColor: '#D3D3D3',
    borderRadius: '5em',
    fontSize: 'small',
    justifyContent: 'center',
    alignItems: 'center'
  },
  otherButton: {
    padding: theme.spacing(5),
    margin: theme.spacing(5),
    backgroundColor: theme.palette.primary.main,
    height: 30,
    borderRadius: '5em',
    fontSize: 'small',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export interface ActionableDialogProps {
  open: boolean;
  onClose: () => void;
  content: string;
  buttonTitle: string;
  buttonOnClick: () => void;
}

// only for dialogs with a question + 2 buttons (cancel on left, some other button on right thats defined by props)
export function ActionableDialog(props: ActionableDialogProps) {
  const classes = useStyles();
  const { onClose, open, content, buttonTitle, buttonOnClick } = props;

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <Grid className={classes.dialog} container direction="column" spacing={5}>
        <Grid item>
          <Typography variant="h4">{content}</Typography>
        </Grid>

        <Grid item direction="row" spacing={5}>
          <Button className={classes.cancelButton} onClick={onClose}>Cancel</Button>
          <Button className={classes.otherButton} onClick={buttonOnClick}>{buttonTitle}</Button>
        </Grid>
      </Grid>
    </Dialog>
  );
}
