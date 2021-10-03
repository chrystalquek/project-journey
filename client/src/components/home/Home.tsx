import Header from "@components/common/Header";
import PendingApproval from "@components/home/PendingApproval";
import UpcomingEvent from "@components/home/UpcomingEvent";
import { LOGIN_ROUTE } from "@constants/routes";
import { Grid, useMediaQuery, useTheme } from "@material-ui/core";
import { useAppSelector } from "@redux/store";
import { isAdmin } from "@utils/helpers/auth";
import { useRouter } from "next/router";
import React, { FC } from "react";

const Home: FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const user = useAppSelector((state) => state.session.user);
  if (!user) {
    router.push(LOGIN_ROUTE);
    return null;
  }

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
