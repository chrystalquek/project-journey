import React, { FC } from "react";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@utils/constants/routes";
import { EventTypography } from "@components/common/event/EventTypography";
import PersonIcon from "@material-ui/icons/Person";
import { EventButton } from "@components/common/event/EventButton";
import { EventDivider } from "@components/common/event/EventDivider";

type CreateAccountNoticeProps = {
  // nothing yet
};

const useStyles = makeStyles({
  gutterBottom: {
    marginBottom: "0.7em",
  },
  icon: {
    fontSize: "5em",
  },
});

const CreateAccountNotice: FC<CreateAccountNoticeProps> = () => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <>
      <EventDivider>Register Here</EventDivider>
      <PersonIcon className={classes.icon} />
      <EventTypography
        fontSize="h2"
        fontBold
        text="You need an account to register events."
      />
      <EventTypography
        fontSize="h2"
        gutterBottom
        text="It takes less than 2mins to create one"
      />
      <Box margin={3}>
        <EventButton disableRipple onClick={() => router.push(SIGNUP_ROUTE)}>
          Sign up
        </EventButton>
        <Typography display="inline"> or </Typography>
        <Button onClick={() => router.push(LOGIN_ROUTE)}>Login</Button>
      </Box>
    </>
  );
};

export default CreateAccountNotice;
