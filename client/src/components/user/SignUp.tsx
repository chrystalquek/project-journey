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
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import SignUpForm from "@components/form/SignUpForm";
import { VolunteerType } from "@type/volunteer";
import Header from "@components/common/Header";

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
    padding: "5px 50px 5px 50px",
    borderRadius: 20,
  },
  backButton: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.black,
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
    color: theme.palette.error.main,
  },
  dividerLine: {
    backgroundColor: theme.palette.primary.main,
    height: 1,
  },
  dividerText: {
    fontSize: 16,
    fontWeight: 500,
  },
  card: {
    borderRadius: "10px",
  },
  cardHeaderAdhoc: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: theme.typography.h2.fontSize,
    borderRadius: "10px 10px 0px 0px",
  },
  cardHeaderRegular: {
    background: theme.palette.secondary.main,
    color: theme.palette.common.white,
    fontSize: theme.typography.h2.fontSize,
    borderRadius: "10px 10px 0px 0px",
  },
  signUpInstructions: {
    justifyContent: "center",
    textAlign: "left",
  },
  centerContent: {
    justifyContent: "center",
  },
  cardContainer: {
    padding: 24,
  },
  login: {
    color: theme.palette.secondary.main,
    textDecoration: "underline",
    cursor: "pointer",
  },
  loginFooter: {
    marginTop: theme.spacing(6),
  },
}));

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [volunteerType, setVolunteerType] = useState<VolunteerType>(
    VolunteerType.ADHOC
  ); // default set as ad-hoc
  const classes = useStyles();

  // Proceed to next step
  const nextStep = () => {
    // TODO: Replace once we use new url pathway for signup
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setCurrentStep(currentStep + 1);
  };

  // Go back to prev step
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const selectAdhoc = () => {
    setVolunteerType(VolunteerType.ADHOC);
    nextStep();
  };

  const selectCommitted = () => {
    setVolunteerType(VolunteerType.COMMITTED);
    nextStep();
  };

  const TextDivider = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
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

  const VolunteerTypeSelection = () => (
    <Box>
      <Box className={classes.content}>
        <div>
          <Grid container className={classes.signUpInstructions}>
            <Grid item md={12}>
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
            <Grid item sm={12}>
              <TextDivider>
                <Typography variant="h1">Sign Up As</Typography>
              </TextDivider>
            </Grid>
          </Grid>
          <div className={classes.cardContainer}>
            <Grid container spacing={6} className={classes.centerContent}>
              <Grid item md={6}>
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
              <Grid item md={6}>
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

        <div className={classes.loginFooter}>
          <Typography variant="body1">Already have an account?</Typography>
          <Link href="/login">
            <Typography className={classes.login}>Log in</Typography>
          </Link>
        </div>
      </Box>
    </Box>
  );

  const VolunteerInfo = () => (
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
              <SignUpForm type={volunteerType} />
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

  const VolunteerSignUp = () => {
    if (currentStep === 0) {
      return (
        <div>
          <VolunteerTypeSelection />
        </div>
      );
    }
    return <VolunteerInfo />;
  };

  return (
    <>
      <Header title="Sign Up" />
      <VolunteerSignUp />
    </>
  );
};

export default SignUp;
