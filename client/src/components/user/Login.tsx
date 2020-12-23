import {
  Box, Grid, Button, TextField, Typography, Paper
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import React, { FC, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'antd/lib/form/Form';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';
import styles from '@styles/auth/login.styles';

import NavBar from '@components/common/NavBar';
import Footer from '@components/common/Footer';
import { LoginArgs } from '@redux/actions/user';
import { UserState } from '@redux/reducers/user';

const useStyles = makeStyles((theme) => ({
  loginButton: {
    backgroundColor: theme.palette.primary.main,
    color: 'black',
    textTransform: 'none',
    padding: '5px 50px 5px 50px',
    borderRadius: 20,

  },
  pageHeader: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "40px"
  },
  loginButtonContainer: {
    padding: "20px 0px 20px 0px"
  },
  form: {
    
  },
  header: {
    textAlign: 'left',
    marginTop: '10px',
    fontWeight: "bold",
    fontSize: "14px"
  },
  formContainer: {
    padding: "20px"
  }
}));

type LoginProps = {
  user: UserState
  handleFormSubmit: (formData: LoginArgs) => Promise<void>
}

const Login: FC<LoginProps> = ({
  user,
  handleFormSubmit,
}: LoginProps) => {
  const [form] = useForm();
  const router = useRouter();

  const classes = useStyles();
  const isFormDisabled = !form.isFieldsTouched(true)
    || !!form.getFieldsError().filter(({ errors }) => errors.length).length;

  useEffect(() => {
    if (user.token) {
      router.push('/');
    }
  }, [user]);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        router.push('/');
      }
    } catch (e) {
      console.error(e)
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.email.value)
    console.log(e.target.password.value)
    let loginArgs: LoginArgs = {
      email: e.target.email.value,
      password: e.target.password.value,
    }
    handleFormSubmit(loginArgs)
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Box>
        <NavBar />
        <Box style={styles.content}>
          <Grid container style={styles.rowContent}>
            <Grid item xs={4}>
              <Typography className={classes.pageHeader}>Login</Typography>
              <Paper className={classes.formContainer}>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <Typography className={classes.header}> Email </Typography>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    // required
                    fullWidth
                    id='email'
                    label="e.g. username@gmail.com"
                    name='email'
                    autoComplete='email'
                  />
                  <Typography className={classes.header}> Password </Typography>
                  <TextField
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
                    <Button
                      color="primary"
                      type="submit"
                      disabled={isFormDisabled}
                      className={classes.loginButton}
                      size="large"
                    >
                      Log In
                    </Button>
                  </Grid>
              </form>
            </Paper>

              <div className="section">
                <div>
                  <span>
                    Don&apos;t have an account?
                  </span>
                </div>
                <Link href="/auth/signup">
                  Sign up
                </Link>
              </div>
            </Grid>
          </Grid>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Login;
