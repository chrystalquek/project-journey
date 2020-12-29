import {
  Box, Grid, Button, TextField, Typography, Paper
} from '@material-ui/core'
import React, { FC, useEffect, useState } from 'react';
import {
  Layout, Divider, Row, Col, Card,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import styles from '@styles/auth/login.styles';
import NavBar from '@components/common/NavBar';
import Footer from '@components/common/Footer';
import { SignupArgs } from '@redux/actions/user';
import { UserState } from '@redux/reducers/user';
import axios from 'axios';

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

const { Content } = Layout;

type SignupProps = {
  user: UserState
  handleFormSubmit: (formData: SignupArgs) => Promise<void>
}

const Signup: FC<SignupProps> = ({
  user,
  handleFormSubmit,
}: SignupProps) => {
  const [form] = useForm();
  const router = useRouter();
  const classes = useStyles();
  const isFormDisabled = !form.isFieldsTouched(true)
  || !!form.getFieldsError().filter(({ errors }) => errors.length).length;
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepChange = (event, newCurrentStep) => {
    setCurrentStep(newCurrentStep);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    let signupArgs: SignupArgs = {
      name: e.target.email.name,
      email: e.target.email.value,
      password: e.target.password.value,
      birthday: e.target.birthday.value,
      gender: "male",
      citizenship: "singapore",
      race: "other",
      hasVolunteered: true,
      hasChildrenExperience: true,
      hasExternalVolunteerExperience: true,
      hasFirstAidCertification: true,
      volunteerFrequency: 1,
      volunteerReason: "Want to",
      volunteerContribution: "string"

    }
    console.log(JSON.stringify(signupArgs))
    handleFormSubmit(signupArgs)
    // try {
    //   axios.post("http://localhost:5000/volunteer", signupArgs )
    //   .then(res => {
    //     console.log("This is the error" + res);
    //   })
    // } catch (error) {
    //   console.log(error)
    // }
  }

  const VolunteerType = props => {
    return (
      <Layout>
        <Content style={{
          padding: '80px 150px 0px 150px', marginTop: 80, textAlign: 'center', minHeight: '90vh',
        }}
        >
          <div>
            <Row style={{ justifyContent: 'center', textAlign: 'left' }}>
              <Col span={12}>
                <p>
                  Yay! We are excited that you are interested to volunteer with us.
                  (information to help the users make a decision)
                  Please be reminded that there is a minimum commitment of 3 months
                  (serving a minimum of 3 sessions a month) in order to have direction
                  interaction with our learning community (aged 6 to 16 years old).
                  We have this policy for a number of reasons:
                  <ul>
                    <li>
                      Limit the emotional trauma in our children that occurs
                      when volunteers come for a few sessions and leave
                    </li>
                    <li>
                      It takes time for children to warm up to
                      new faces and it won&apos;t happen instantly.
                    </li>
                    <li>
                      3 months provides you with the opportunity to witness the progression
                      and impact you&apos;re making (in yourself and in our children)
                    </li>
                    <li>
                      You&apos;ll be journeying with other individuals who share
                      a commitment and passion for our program.  There are opportunities
                      to meet new people and develop friendships.
                    </li>
                    <li>
                      Allows you time to be on-boarded, mentored
                      and guided by some incredible WCA Captains on the team.
                    </li>
                  </ul>
                </p>
              </Col>
            </Row>
          </div>
          <div>
            <Row style={{ justifyContent: 'center' }}>
              <Col span={12}>
                <Divider style={{ borderColor: '#D0DE39', borderWidth: 3 }}>
                  Sign Up As
                </Divider>
              </Col>
            </Row>
            <div style={{ padding: 24 }}>
              <Row gutter={24} style={{ justifyContent: 'center' }}>
                <Col span={6}>
                  <Card hoverable title="Ad-hoc Volunteer" headStyle={{ background: '#D0DE39', color: '#fff', borderRadius: '10px 10px 0px 0px' }} bordered={false} style={{ borderRadius: '10px' }}>
                    You are only intending to volunteer one-off at Blessings in a Bag
                  </Card>
                </Col>
                <Col span={6}>
                  <Card hoverable title="Regular Volunteer" headStyle={{ background: '#00BADC', color: '#fff', borderRadius: '10px 10px 0px 0px' }} bordered={false} style={{ borderRadius: '10px' }}>
                    You are able to commit to a minimum of 3 months at Blessings in a Bag
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
  
          <div className="section">
            Already have an account?
            {' '}
            <br />
            <Link href="/auth/login">
              Log in
            </Link>
          </div>
        </Content>
      </Layout>
    );
  }

  const VolunteerInfo = props => {
    return (
      <>
      <Box>
        <Box style={styles.content}>
          <Grid container style={styles.rowContent}>
            <Grid item xs={4}>
              <Typography className={classes.pageHeader}>Registration</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <Typography className={classes.header}> Name </Typography>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    // required
                    fullWidth
                    id='name'
                    label="e.g. John Doe"
                    name='name'
                    autoComplete='name'
                  />
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
                  <Typography className={classes.header}> Date of Birth </Typography>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    // required
                    fullWidth
                    id='birthday'
                    name='birthday'
                    type='date'
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <Typography className={classes.header}> Comments </Typography>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    // required
                    fullWidth
                    multiline
                    id='comments'
                    label="e.g. This is a long multiline answer"
                    name='comments'
                  />
                  <div className="section">
                    <div>
                      <span>
                        By signing up, I agree to the&nbsp;
                        <Link href="/">
                        Privacy
                        </Link>
                        &nbsp;and&nbsp;
                        <Link href="/">
                        Terms of Service
                        </Link>
                        &nbsp;of Blessings in a Bag
                      </span>
                    </div>
                  </div>
                  <Grid className={classes.loginButtonContainer}>
                    <Button
                      color="primary"
                      type="submit"
                      disabled={isFormDisabled}
                      className={classes.loginButton}
                      size="large"
                    >
                      Sign Up
                    </Button>
                  </Grid>
              </form>
              <div className="section">
                Already have an account?
                {' '}
                <br />
                <Link href="/auth/login">
                  Log in
                </Link>
              </div>
              <br />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
    )
  }

  return (
    <React.Fragment>
      <Head>
        <title>Signup</title>
      </Head>
      <NavBar />
      <VolunteerType />
      <VolunteerInfo />
      <Footer />
    </React.Fragment>
  )
}


export default Signup;
