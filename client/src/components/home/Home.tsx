import PendingApproval from "@components/home/PendingApproval";
import UpcomingEvent from "@components/home/UpcomingEvent";
import { Grid, useMediaQuery, useTheme } from "@material-ui/core";
import React, { FC } from "react";
import { isAdmin } from "@utils/helpers/auth";
import { useAppSelector } from "@redux/store";
import Header from "@components/common/Header";

const Home: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const user = useAppSelector((state) => state?.user);

  return (
    <Grid item xs={8}>
      <Header title="Dashboard" />
      {isMobile ? (
        <Grid container direction="column">
          <Grid item>{isAdmin(user) && <PendingApproval />}</Grid>
          <Grid item>
            <UpcomingEvent />
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="row" spacing={5}>
          <Grid item xs={8}>
            <UpcomingEvent />
          </Grid>
          <Grid item xs={4}>
            {isAdmin(user) && <PendingApproval />}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Home;
