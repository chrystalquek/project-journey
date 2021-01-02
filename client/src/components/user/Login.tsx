import { Box, Grid, Button, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

import NavBar from "@components/common/NavBar";
import Footer from "@components/common/Footer";
import { LoginArgs } from "@redux/actions/user";
import { UserState } from "@redux/reducers/user";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: "80px auto 0px auto",
    marginTop: 80,
    textAlign: "center",
    minHeight: "90vh",
  },
  loginButton: {
    backgroundColor: theme.palette.primary.main,
    color: "black",
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
    minWidth: "400px",
    maxWidth: "500px",
    width: "50%",
    padding: "20px",
    margin: "auto",
  },
  signupText: {
    fontWeight: "bold",
    color: "#000",
  },
  invalidText: {
    marginBottom: "10px",
    color: "#e60026",
  },
}));

type LoginProps = {
  user: UserState;
  handleFormSubmit: (formData: LoginArgs) => Promise<void>;
};

const Login: FC<LoginProps> = ({ user, handleFormSubmit }: LoginProps) => {
  const router = useRouter();
  const [invalid, setInvalid] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (user.token) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    if (user.status === "rejected") {
      alert("Login failed");
    } else if (user.status === "fulfilled") {
      router.push("/");
    }
  }, [user.status]);

  const handleSubmit = async (values) => {
    const loginArgs: LoginArgs = {
      email: values.email,
      password: values.password,
    };
    const response = await handleFormSubmit(loginArgs);
    // @ts-ignore type exists
    if (response?.type === "user/login/rejected") {
      setInvalid(true);
    }
  };
  const InvalidCredentials = (props) => {
    if (invalid) {
      return (
        <Typography className={classes.invalidText}>
          Invalid email &absp; password
        </Typography>
      );
    }
    return <></>;
  };

  const validate = (values) => {
    const errors: Partial<LoginArgs> = {};

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
      <Head>
        <title>Login</title>
      </Head>
      <Box>
        <NavBar userData={null} />
        <Box className={classes.content}>
          <Typography className={classes.pageHeader}>Login</Typography>
          <Paper className={classes.formContainer}>
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
                    variant='outlined'
                    margin='normal'
                    // required
                    fullWidth
                    id='email'
                    placeholder='e.g. username@gmail.com'
                    name='email'
                    autoComplete='email'
                  />
                  <Typography className={classes.header}> Password </Typography>
                  <Field
                    component={TextField}
                    variant='outlined'
                    margin='normal'
                    // required
                    fullWidth
                    name='password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                  />
                  <Grid className={classes.loginButtonContainer}>
                    <InvalidCredentials />
                    <Button
                      color='primary'
                      type='submit'
                      disabled={isSubmitting}
                      className={classes.loginButton}
                      size='large'
                    >
                      Log In
                    </Button>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Paper>

          <div className='section'>
            <div>
              <Typography>Don&apos;t have an account?</Typography>
            </div>
            <Link href='/auth/signup'>
              <Typography className={classes.signupText}>Sign up</Typography>
            </Link>
          </div>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Login;
