import { getAcceptedSignUp } from "@components/event/helpers";
import { FormDisabledReason } from "@components/event/helpers/EventDetails/EventDetails";
import { Box, Typography } from "@material-ui/core";
import theme from "@styles/theme";
import { SignUpData } from "@type/signUp";
import React, { useCallback } from "react";

type Props = {
  reason: FormDisabledReason | null;
  signUpData: SignUpData | null;
};

const SignUpStatusBox = ({ ...props }: Props) => {
  const render = useCallback(({ reason, signUpData }: Props) => {
    switch (reason) {
      case FormDisabledReason.SIGNUP_PENDING:
        return (
          <Box
            py={4}
            px={8}
            bgcolor={theme.palette.secondary.light}
            borderRadius={12}
          >
            <Typography style={{ fontWeight: "bold" }}>
              Sign-up Pending.
            </Typography>
            <Typography>Pending approval by admin.</Typography>
          </Box>
        );
      case FormDisabledReason.SIGNUP_ACCEPTED:
        return (
          <Box
            py={4}
            px={8}
            bgcolor={theme.palette.secondary.light}
            borderRadius={12}
          >
            <Typography style={{ fontWeight: "bold" }}>
              Successful registration!
            </Typography>
            <Typography>{`Accepted role: ${
              getAcceptedSignUp(signUpData) || "Error retrieving accepted role."
            }`}</Typography>
          </Box>
        );
      default:
        return <></>;
    }
  }, []);

  return render(props);
};

export default SignUpStatusBox;
