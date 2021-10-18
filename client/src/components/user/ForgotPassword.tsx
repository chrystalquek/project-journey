import { Box, Grid, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { useRouter } from "next/dist/client/router";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { forgotPassword, ForgotPasswordArgs } from "@redux/actions/session";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { HOME_ROUTE } from "@utils/constants/routes";
import Header from "@components/common/Header";

export const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: theme.spacing(10),
    textAlign: "center",
    minHeight: "90vh",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(20, 12.5, 0, 12.5),
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(20, 25, 0, 25),
    },
  },
  rowContent: {
    justifyContent: "center",
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.black,
    textTransform: "none",
    padding: theme.spacing(1.25, 12.5),
    borderRadius: 20,
  },
  pageHeader: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: theme.spacing(5),
  },
  details: {
    margin: theme.spacing(0, 7.5, 4),
  },
  buttonContainer: {
    padding: theme.spacing(5, 0, 5, 0),
  },
  header: {
    textAlign: "left",
    marginTop: theme.spacing(2.5),
    fontWeight: "bold",
    fontSize: "14px",
  },
  formContainer: {
    padding: theme.spacing(5),
  },
  loginText: {
    color: theme.palette.secondary.main,
    textDecoration: "underline",
    cursor: "pointer",
  },
  invalidText: {
    marginBottom: theme.spacing(2.5),
    color: theme.palette.error.main,
  },
  section: {
    margin: theme.spacing(5),
  },
}));

type Props = {
  resetStatus: () => void;
};

const ForgotPassword: FC<Props> = ({ resetStatus }: Props) => {
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

  useEffect(() => {
    window.addEventListener("beforeunload", resetStatus);
    return () => {
      window.removeEventListener("beforeunload", resetStatus);
    };
  }, [resetStatus]);

  const handleSubmit = async (values) => {
    const forgotPasswordArgs: ForgotPasswordArgs = {
      email: values.email,
    };
    await dispatch(forgotPassword(forgotPasswordArgs))
      .then(unwrapResult)
      .then(() => {
        setInvalid(false);
        enqueueSnackbar(`An email has been sent to ${values.email}`, {
          variant: "success",
        });
      })
      .catch(() => {
        setInvalid(true);
      });
  };
  const InvalidCredentials = () => {
    if (invalid) {
      return (
        <Typography className={classes.invalidText}>
          Invalid email address
        </Typography>
      );
    }
    return <></>;
  };

  const validate = (values) => {
    const errors: Partial<ForgotPasswordArgs> = {};

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!values.email) {
      errors.email = "Required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  return (
    <>
      <Header title="Forgot Password" />
      <Box style={{ width: "100%" }}>
        <Box className={classes.content}>
          <Grid container className={classes.rowContent}>
            <Grid item xs={12} sm={9} md={6}>
              <Typography className={classes.pageHeader}>
                Forgot Password
              </Typography>
              <Typography className={classes.details}>
                {`Don't worry! Just fill in your email and we'll send you a
                link to reset your password`}
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
                    <Typography className={classes.header}> Email </Typography>
                    <Field
                      component={TextField}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="email"
                      name="email"
                      autoComplete="email"
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
              <div className={classes.section}>
                <div>
                  <Typography>Remember your credentials?</Typography>
                </div>
                <Link href="/login">
                  <Typography className={classes.loginText}>Log In</Typography>
                </Link>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ForgotPassword;
