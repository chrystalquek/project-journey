import { LoginRequest } from "@api/request";
import Header from "@components/common/Header";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "@redux/actions/user";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { HOME_ROUTE } from "@utils/constants/routes";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: 80,
    textAlign: "center",
    minHeight: "90vh",
    [theme.breakpoints.down("sm")]: {
      padding: "80px 50px 0px 50px",
    },
    [theme.breakpoints.up("md")]: {
      padding: "80px 100px 0px 100px",
    },
  },
  rowContent: {
    justifyContent: "center",
  },
  loginButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.black,
    textTransform: "none",
    padding: "5px 50px",
    borderRadius: 20,
  },
  pageHeader: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "40px",
  },
  loginButtonContainer: {
    padding: "20px 0px 20px 0px",
  },
  form: {},
  header: {
    textAlign: "left",
    marginTop: "10px",
    fontWeight: "bold",
    fontSize: "14px",
  },
  formContainer: {
    padding: "20px",
  },
  signUpText: {
    color: theme.palette.secondary.main,
    textDecoration: "underline",
    cursor: "pointer",
  },
  invalidText: {
    marginBottom: "10px",
    color: theme.palette.error.main,
  },
  section: {
    margin: "20px",
  },
}));

type LoginProps = {
  resetStatus: () => void;
};

const Login: FC<LoginProps> = ({ resetStatus }: LoginProps) => {
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
    dispatch(
      login({
        email: values.email,
        password: values.password,
      })
    )
      .then(unwrapResult)
      .catch(() => setInvalid(true));
  };
  const InvalidCredentials = () => {
    if (invalid) {
      return (
        <Typography className={classes.invalidText}>
          Invalid email &amp; password
        </Typography>
      );
    }
    return <></>;
  };

  const validate = (values) => {
    const errors: Partial<LoginRequest> = {};

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!values.email) {
      errors.email = "Required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Password must contain at least 8 characters";
    }

    return errors;
  };

  return (
    <>
      <Header title="Login" />
      <Box style={{ width: "100%" }}>
        <Box className={classes.content}>
          <Grid container className={classes.rowContent}>
            <Grid item xs={12} sm={9} md={6}>
              <Typography className={classes.pageHeader}>Login</Typography>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
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
                    <Typography className={classes.header}>
                      {" "}
                      Password{" "}
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
                    <Grid className={classes.loginButtonContainer}>
                      <InvalidCredentials />
                      <Button
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                        className={classes.loginButton}
                        size="large"
                      >
                        Log In
                      </Button>
                    </Grid>
                  </Form>
                )}
              </Formik>

              <div className={classes.section}>
                <div>
                  <Typography>Don&apos;t have an account?</Typography>
                </div>
                <Link href="/signup">
                  <Typography className={classes.signUpText}>
                    Sign up
                  </Typography>
                </Link>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Login;
