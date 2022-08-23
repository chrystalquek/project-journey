import Button from "@components/common/Button";
import TypographyWithUnderline from "@components/common/data-display/TypographyWithUnderline";
import {
  Box,
  Button as MuiButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@utils/constants/routes";
import { useRouter } from "next/router";
import React, { FC } from "react";

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
      <TypographyWithUnderline fontSize="h1" fontWeight="fontWeightBold">
        Register Here
      </TypographyWithUnderline>
      <PersonIcon className={classes.icon} />
      <Typography style={{ fontWeight: "bold" }} variant="h2">
        You need an account to register events.
      </Typography>
      <Typography style={{ fontWeight: "bold" }} variant="h2">
        It takes less than 2mins to create one
      </Typography>
      <Box margin={3}>
        <Button disableRipple onClick={() => router.push(SIGNUP_ROUTE)}>
          Sign up
        </Button>
        <Typography display="inline"> or </Typography>
        <MuiButton onClick={() => router.push(LOGIN_ROUTE)}>Login</MuiButton>
      </Box>
    </>
  );
};

export default CreateAccountNotice;
