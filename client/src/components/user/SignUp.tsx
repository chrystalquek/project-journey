import {
  Box, Grid, Button, TextField, Typography, Divider, Card, CardContent, CardHeader, CardActionArea, useMediaQuery, useTheme
} from '@material-ui/core'
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'antd/lib/form/Form';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import NavBar from '@components/common/NavBar';
import Footer from '@components/common/Footer';
import { SignUpArgs } from '@redux/actions/user';
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
    }
  },
  rowContent: {
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: theme.palette.primary.main,
    color: "black",
    textTransform: "none",
    padding: "5px 50px 5px 50px",
    borderRadius: 20,
  },
  backButton: {
    backgroundColor: theme.palette.secondary.main,
    color: "black",
    textTransform: "none",
    padding: "5px 50px 5px 50px",
    borderRadius: 20,
    marginBottom: "20px",
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
  invalidText: {
    marginBottom: "10px",
    color: "#e60026"
  },
  dividerLine: {
    backgroundColor: '#D0DE39',
    height: 1
  },
  dividerText: {
    fontSize: 16,
    fontWeight: 500
  },
  card: {
    borderRadius: '10px'
  },
  cardHeaderAdhoc: {
    background: '#D0DE39',
    color: '#fff',
    borderRadius: '10px 10px 0px 0px'
  },
  cardHeaderRegular: {
    background: '#00BADC',
    color: '#fff',
    borderRadius: '10px 10px 0px 0px'
  },
  signUpInstructions: {
    justifyContent: 'center',
    textAlign: 'left'
  },
  centerContent: {
    justifyContent: 'center'
  },
  cardContainer: {
    padding: 24
  }
}));

type SignUpProps = {
  user: UserState;
  handleFormSubmit: (formData: SignUpArgs) => Promise<void>;
};

const SignUp: FC<SignUpProps> = ({ user, handleFormSubmit }: SignUpProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [volunteerType, setVolunteerType] = useState("ad-hoc"); // default set as ad-hoc
  const [invalid, setInvalid] = useState(false);
  const [form] = useForm();
  const router = useRouter();
  const classes = useStyles();
  const isFormDisabled =
    !form.isFieldsTouched(true) ||
    !!form.getFieldsError().filter(({ errors }) => errors.length).length;

  // Proceed to next step
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Go back to prev step
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const selectAdhoc = () => {
    setVolunteerType("ad-hoc");
    nextStep();
  };

  const selectCommitted = () => {
    setVolunteerType("committed");
    nextStep();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signUpArgs: SignUpArgs = {
      name: e.target.name.value,
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
      volunteerContribution: "string",
      volunteerType,
    };
    const response = await handleFormSubmit(signUpArgs);
    // @ts-ignore
    if (response?.type == "volunteer//fulfilled") {
      router.push("/login");
    } else {
      setInvalid(true);
    }
  };

  const TextDivider = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
    if (isMobile) {
      return (
        <Grid container>
          <Grid item className={classes.dividerText}>{children}</Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container>
          <Grid item xs={4} ><Divider className={classes.dividerLine} /></Grid>
          <Grid item xs={4} className={classes.dividerText}>{children}</Grid>
          <Grid item xs={4} className={classes.dividerLine}><Divider /></Grid>
        </Grid>
      );
    }
  };

  const VolunteerType = props => {
    return (
      <Box>
        <Box className={classes.content}>
          <div>
            <Grid container className={classes.signUpInstructions}>
              <Grid item md={6}>
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
              </Grid>
            </Grid>
          </div>
          <div>
            <Grid container className={classes.centerContent}>
              <Grid item sm={6}>
                <TextDivider>
                  Sign Up As
                </TextDivider>
              </Grid>
            </Grid>
            <div className={classes.cardContainer}>
              <Grid container spacing={6} className={classes.centerContent}>
                <Grid item md={3}>
                  <Card className={classes.card} onClick={selectAdhoc}>
                    <CardActionArea>
                      <CardHeader title="Ad-hoc Volunteer" className={classes.cardHeaderAdhoc} />
                      <CardContent>
                        You are only intending to volunteer one-off at Blessings in a Bag
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid item md={3}>
                  <Card className={classes.card} onClick={selectCommitted}>
                    <CardActionArea>
                      <CardHeader title="Regular Volunteer" className={classes.cardHeaderRegular} />
                      <CardContent>
                        You are able to commit to a minimum of 3 months at Blessings in a Bag
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              </Grid>
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
        </Box>
      </Box>
    );
  }

  const InvalidCredentials = (props) => {
    if (invalid) {
      return (
        <Typography className={classes.invalidText}>
          Email address already exists
        </Typography>
      );
    }
    return <></>;
  };

  const VolunteerInfo = (props) => (
    <>
      <Box>
        <Box className={classes.content}>
          <Grid container className={classes.rowContent}>
            <Grid item lg={6}>
              <Button className={classes.backButton} onClick={prevStep}>Back</Button>
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
                  label="e.g. Additional Comments"
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
                  <InvalidCredentials />
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
                Already have an account? <br />
                <Link href="/auth/login">Log in</Link>
              </div>
              <br />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );

  const VolunteerSignUp = (props) => {
    if (currentStep == 0) {
      return <div><VolunteerType /></div>
    } else {
      return <VolunteerInfo />
    }
    return <VolunteerInfo />;
  };

  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <NavBar userData={null} />
      <VolunteerSignUp />
      <Footer />
    </>
  );
};

export default SignUp;
