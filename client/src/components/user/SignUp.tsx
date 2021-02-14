import {
  Box,
  Grid,
  Button,
  Typography,
  Divider,
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React, { FC, useState } from 'react';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { SignUpArgs } from '@redux/actions/user';
import { UserState } from '@redux/reducers/user';
import SignUpForm from '@components/form/SignUpForm';
import { VOLUNTEER_TYPE } from '@type/volunteer';
import { questions as SignUpAdhocQuestionList } from '@components/form/questions/SignUpAdhocQuestionList';
import { questions as SignUpCommittedQuestionList } from '@components/form/questions/SignUpCommittedQuestionList';

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
    padding: '5px 50px 5px 50px',
    borderRadius: 20,
  },
  backButton: {
    backgroundColor: theme.palette.secondary.main,
    color: 'black',
    textTransform: 'none',
    padding: '5px 50px 5px 50px',
    borderRadius: 20,
    marginBottom: '20px',
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
  invalidText: {
    marginBottom: '10px',
    color: '#e60026',
  },
  dividerLine: {
    backgroundColor: '#D0DE39',
    height: 1,
  },
  dividerText: {
    fontSize: 16,
    fontWeight: 500,
  },
  card: {
    borderRadius: '10px',
  },
  cardHeaderAdhoc: {
    background: '#D0DE39',
    color: '#fff',
    borderRadius: '10px 10px 0px 0px',
  },
  cardHeaderRegular: {
    background: '#00BADC',
    color: '#fff',
    borderRadius: '10px 10px 0px 0px',
  },
  signUpInstructions: {
    justifyContent: 'center',
    textAlign: 'left',
  },
  centerContent: {
    justifyContent: 'center',
  },
  cardContainer: {
    padding: 24,
  },
  login: {
    fontWeight: 'bold',
    color: '#000',
    cursor: 'pointer',
  },
  loginFooter: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
  },
}));

type SignUpProps = {
  user: UserState;
  handleFormSubmit: (formData: SignUpArgs) => Promise<void>;
};

const SignUp: FC<SignUpProps> = ({ user, handleFormSubmit }: SignUpProps) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [volunteerType, setVolunteerType] = useState<VOLUNTEER_TYPE>(VOLUNTEER_TYPE.ADHOC); // default set as ad-hoc
  const [invalid, setInvalid] = useState<boolean>(false);
  const classes = useStyles();

  // Proceed to next step
  const nextStep = () => {
    // TODO: Replace once we use new url pathway for signup
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    setCurrentStep(currentStep + 1);
  };

  // Go back to prev step
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const selectAdhoc = () => {
    setVolunteerType(VOLUNTEER_TYPE.ADHOC);
    nextStep();
  };

  const selectCommitted = () => {
    setVolunteerType(VOLUNTEER_TYPE.COMMITED);
    nextStep();
  };

  const TextDivider = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    if (isMobile) {
      return (
        <Grid container>
          <Grid item className={classes.dividerText}>
            {children}
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid container>
        <Grid item xs={4}>
          <Divider className={classes.dividerLine} />
        </Grid>
        <Grid item xs={4} className={classes.dividerText}>
          {children}
        </Grid>
        <Grid item xs={4} className={classes.dividerLine}>
          <Divider />
        </Grid>
      </Grid>
    );
  };

  const VolunteerType = (props) => (
    <Box>
      <Box className={classes.content}>
        <div>
          <Grid container className={classes.signUpInstructions}>
            <Grid item md={6}>
              <Typography variant="body1">
                <p>
                  Yay! We are excited that you are interested to volunteer with
                  us. (information to help the users make a decision) Please be
                  reminded that there is a minimum commitment of 3 months
                  (serving a minimum of 3 sessions a month) in order to have
                  direction interaction with our learning community (aged 6 to
                  16 years old). We have this policy for a number of reasons:
                  <ul>
                    <li>
                      Limit the emotional trauma in our children that occurs
                      when volunteers come for a few sessions and leave
                    </li>
                    <li>
                      It takes time for children to warm up to new faces and it
                      won&apos;t happen instantly.
                    </li>
                    <li>
                      3 months provides you with the opportunity to witness the
                      progression and impact you&apos;re making (in yourself and
                      in our children)
                    </li>
                    <li>
                      You&apos;ll be journeying with other individuals who share
                      a commitment and passion for our program. There are
                      opportunities to meet new people and develop friendships.
                    </li>
                    <li>
                      Allows you time to be on-boarded, mentored and guided by
                      some incredible WCA Captains on the team.
                    </li>
                  </ul>
                </p>
              </Typography>
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container className={classes.centerContent}>
            <Grid item sm={6}>
              <TextDivider>
                <Typography variant="body1">Sign Up As</Typography>
              </TextDivider>
            </Grid>
          </Grid>
          <div className={classes.cardContainer}>
            <Grid container spacing={6} className={classes.centerContent}>
              <Grid item md={3}>
                <Card className={classes.card} onClick={selectAdhoc}>
                  <CardActionArea>
                    <CardHeader
                      title="Ad-hoc Volunteer"
                      className={classes.cardHeaderAdhoc}
                    />
                    <CardContent>
                      <Typography variant="body2">
                        You are only intending to volunteer one-off at Blessings
                        in a Bag
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item md={3}>
                <Card className={classes.card} onClick={selectCommitted}>
                  <CardActionArea>
                    <CardHeader
                      title="Regular Volunteer"
                      className={classes.cardHeaderRegular}
                    />
                    <CardContent>
                      <Typography variant="body2">
                        You are able to commit to a minimum of 3 months at
                        Blessings in a Bag
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </div>
        </div>

        <div className="section">
          <Typography variant="body1">
            Already have an account?
          </Typography>
          <Link href="/login">
            <Typography className={classes.login}>
              Log in
            </Typography>
          </Link>
        </div>
      </Box>
    </Box>
  );

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
            <Grid item md={2} />
            <Grid item xs={12} md={8}>
              <Button className={classes.backButton} onClick={prevStep}>
                Back
              </Button>
              <Typography className={classes.pageHeader}>
                Registration
              </Typography>
              <SignUpForm
                type={volunteerType}
                questionList={
                  volunteerType === VOLUNTEER_TYPE.ADHOC
                    ? SignUpAdhocQuestionList : SignUpCommittedQuestionList
                }
              />
              <div className={classes.loginFooter}>
                <Typography variant="body1">
                  Already have an account?
                </Typography>
                <Link href="/login">
                  <Typography variant="body2" className={classes.login}>
                    Log In
                  </Typography>
                </Link>
              </div>
              <br />
            </Grid>
            <Grid item md={2} />
          </Grid>
        </Box>
      </Box>
    </>
  );

  const VolunteerSignUp = (props) => {
    if (currentStep === 0) {
      return (
        <div>
          <VolunteerType />
        </div>
      );
    }
    return <VolunteerInfo />;
  };

  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <VolunteerSignUp />
    </>
  );
};

export default SignUp;
