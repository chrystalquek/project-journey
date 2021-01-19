import {
  Box, Grid, Button, Typography, Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

import { LoginArgs } from '@redux/actions/user';
import { UserState } from '@redux/reducers/user';

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: 80,
    textAlign: 'center',
    minHeight: '90vh',
    [theme.breakpoints.down('sm')]: {
      padding: '80px 50px 0px 50px',
    },
    [theme.breakpoints.up('md')]: {
      padding: '80px 100px 0px 100px',
    },
  },
  rowContent: {
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: theme.palette.primary.main,
    color: 'black',
    textTransform: 'none',
    padding: '5px 50px',
    borderRadius: 20,
  },
  pageHeader: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '40px',
  },
  loginButtonContainer: {
    padding: '20px 0px 20px 0px',
  },
  form: {},
  header: {
    textAlign: 'left',
    marginTop: '10px',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  formContainer: {
    padding: '20px',
  },
  signUpText: {
    fontWeight: 'bold',
    color: '#000',
    cursor: 'pointer',
  },
  invalidText: {
    marginBottom: '10px',
    color: '#e60026',
  },
  section: {
    margin: '20px',
  },
}));

type LoginProps = {
  user: UserState;
  handleFormSubmit: (formData: LoginArgs) => Promise<void>;
  resetStatus: () => void;
};

const Login: FC<LoginProps> = ({ user, handleFormSubmit, resetStatus }: LoginProps) => {
  const router = useRouter();
  const [invalid, setInvalid] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (user.token) {
      router.push('/');
    }
  }, [user]);

  useEffect(() => {
    if (user.status === 'rejected') {
      alert('Login failed');
    } else if (user.status === 'fulfilled') {
      router.push('/');
    }
  }, [user.status]);

  useEffect(() => {
    window.addEventListener('beforeunload', resetStatus);
    return () => {
      window.removeEventListener('beforeunload', resetStatus);
    };
  }, []);

  const handleSubmit = async (values) => {
    const loginArgs: LoginArgs = {
      email: values.email,
      password: values.password,
    };
    const response = await handleFormSubmit(loginArgs);
    // @ts-ignore type exists
    if (response?.type === 'user/login/rejected') {
      setInvalid(true);
    }
  };
  const InvalidCredentials = (props) => {
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
    const errors: Partial<LoginArgs> = {};

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!values.email) {
      errors.email = 'Required';
    } else if (!emailRegex.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must contain at least 8 characters';
    }

    return errors;
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Box>
        <Box className={classes.content}>
          <Grid container className={classes.rowContent}>
            <Grid item sm={6} lg={4}>
              <Typography className={classes.pageHeader}>Login</Typography>
              <Paper className={classes.formContainer}>
                <Formik
                  initialValues={{
                    email: '',
                    password: '',
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
                        // required
                        fullWidth
                        id="email"
                        label="e.g. user@email.com"
                        name="email"
                        autoComplete="email"
                      />
                      <Typography className={classes.header}> Password </Typography>
                      <Field
                        component={TextField}
                        variant="outlined"
                        margin="normal"
                        // required
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
              </Paper>

              <div className={classes.section}>
                <div>
                  <Typography>Don&apos;t have an account?</Typography>
                </div>
                <Link
                  href="/signup"
                >
                  <Typography
                    className={classes.signUpText}
                  >
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
