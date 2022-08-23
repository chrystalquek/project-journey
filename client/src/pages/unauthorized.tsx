import Header from "@components/common/Header";
import { HOME_ROUTE } from "@constants/routes";
import { Button, Grid, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

const Unauthorized = () => {
  const router = useRouter();
  return (
    <>
      <Header title="Blessings in a Bag" />
      <Grid container direction="column" alignItems="center">
        <Grid item />
        <Grid item>
          <Typography align="center">
            Sorry you do not have permissions to access this page.
            <br />
            Contact an administrator to get permissions or go to the home page
            and browse other pages.
          </Typography>
        </Grid>
        <Grid item>
          <Button onClick={() => router.push(HOME_ROUTE)}>GO TO HOME</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Unauthorized;
