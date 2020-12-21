import {
  Form, Input, Layout
} from 'antd';
import {
  Grid, Button, TextField, Typography
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
  }
}));

const { Content } = Layout;

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

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Layout>
        <NavBar />
        <Content style={styles.content}>
          <Grid container style={styles.rowContent}>
            <Grid item xs={4}>
              <Typography className={classes.pageHeader}>Login</Typography>
              <form className={classes.form} noValidate>
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
        </Content>
        <Footer />
      </Layout>
    </>
  );
};

export default Login;
