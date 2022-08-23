import { Box, Grid, Button, Typography } from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useRouter } from "next/dist/client/router";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { resetPassword, ResetPasswordArgs } from "@redux/actions/session";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { HOME_ROUTE, LOGIN_ROUTE } from "@utils/constants/routes";
import Header from "@components/common/Header";
import { useStyles } from "@components/user/ForgotPassword";

type Props = {
  token: string;
};

type ResetPasswordForm = {
  password: string;
  repeatPassword: string;
};

const ResetPassword: FC<Props> = ({ token }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [invalid, setInvalid] = useState(false);
  const classes = useStyles();
  const user = useAppSelector((state) => state.session.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      router.push(HOME_ROUTE);
    }
  }, [router, user]);

  const handleSubmit = async (values) => {
    const resetPasswordArgs: ResetPasswordArgs = {
      token,
      newPassword: values.password,
    };
    await dispatch(resetPassword(resetPasswordArgs))
      .then(unwrapResult)
      .then(() => {
        setInvalid(false);
        enqueueSnackbar(
          `Password reset successful. Please try logging in with the new password.`,
          {
            variant: "success",
          }
        );
        router.push(LOGIN_ROUTE);
      })
      .catch(() => {
        setInvalid(true);
      });
  };
  const InvalidCredentials = () => {
    if (invalid) {
      return (
        <Typography className={classes.invalidText}>
          Invalid reset password link
        </Typography>
      );
    }
    return <></>;
  };

  const validate = (values) => {
    const errors: Partial<ResetPasswordForm> = {};

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Password must contain at least 8 characters";
    }

    if (!values.repeatPassword) {
      errors.repeatPassword = "Required";
    } else if (values.repeatPassword !== values.password) {
      errors.repeatPassword = "Password does not match";
    }

    return errors;
  };

  return (
    <>
      <Header title="Reset Password" />
      <Box style={{ width: "100%" }}>
        <Box className={classes.content}>
          <Grid container className={classes.rowContent}>
            <Grid item xs={12} sm={9} md={6}>
              <Typography className={classes.pageHeader}>
                Reset Password
              </Typography>
              <Formik
                initialValues={{
                  email: "",
                }}
                validate={validate}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Typography className={classes.header}>
                      {" "}
                      New Password{" "}
                    </Typography>
                    <Field
                      component={TextField}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    <Typography className={classes.header}>
                      {" "}
                      Confirm Password{" "}
                    </Typography>
                    <Field
                      component={TextField}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="repeatPassword"
                      type="password"
                      id="repeatPassword"
                      autoComplete="current-password"
                    />
                    <Grid className={classes.buttonContainer}>
                      <InvalidCredentials />
                      <Button
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                        className={classes.button}
                        size="large"
                      >
                        Reset Password
                      </Button>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ResetPassword;
