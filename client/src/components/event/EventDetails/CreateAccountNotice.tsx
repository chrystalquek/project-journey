import React, {FC} from "react";
import {Box, Button, makeStyles, Paper, Typography} from "@material-ui/core";
import {useRouter} from "next/router";
import {LOGIN_ROUTE, SIGNUP_ROUTE} from "@constants/routes";
import {EventTypography} from "@components/common/event/EventTypography";
import PersonIcon from '@material-ui/icons/Person';
import {EventButton} from "@components/common/event/EventButton";

type CreateAccountNoticeProps = {
  // nothing yet
}

const useStyles = makeStyles({
  gutterBottom: {
    marginBottom: '0.7em',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#E5F8FB',
    borderRadius: '2em',
    padding: '1.5em 0'
  },
  icon: {
    fontSize: '5em',
  }
});

const CreateAccountNotice: FC<CreateAccountNoticeProps> = () => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <>
      <EventTypography fontSize='h3' textCenter borderTop borderBottom gutterBottom fontBold text="Register Here" />
      <Paper className={classes.paper} variant='outlined'>
        <PersonIcon className={classes.icon} />
        <EventTypography fontSize='h4' fontBold text="You need an account to register events." />
        <EventTypography fontSize='h4' gutterBottom text="It takes less than 2mins to create one" />
        <Box margin={3}>
          <EventButton disableRipple onClick={() => router.push(SIGNUP_ROUTE)}>Sign up</EventButton>
          <Typography display='inline'>{' '}or{' '}</Typography>
          <Button onClick={() => router.push(LOGIN_ROUTE)}>Login</Button>
        </Box>
      </Paper>
    </>
  )
}

export default CreateAccountNotice;
