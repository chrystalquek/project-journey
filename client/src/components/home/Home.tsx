import Head from '@components/common/Header';
import NavBar from '@components/common/NavBar';
import PaddedGrid from '@components/common/PaddedGrid';
import PendingApproval from '@components/home/PendingApproval';
import UpcomingEvent from '@components/home/UpcomingEvent';
import { Grid, useMediaQuery, useTheme } from '@material-ui/core';
import { Footer } from 'antd/lib/layout/layout';
import React, { FC } from 'react';
import { isAdmin } from '@utils/helpers/auth';
import { StoreState } from '@redux/store';
import { useSelector } from 'react-redux';

const Home: FC<{}> = ({ }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const user = useSelector((state: StoreState) => state.user);

  return (
    <>
      <Head title="Blessings in a Bag" />
      <NavBar />

      <PaddedGrid>
        {isMobile
          ? (
            <Grid container spacing={5}>
              <Grid item>
                {isAdmin(user)
                                && <PendingApproval />}
              </Grid>
              <Grid item>

                <UpcomingEvent />
              </Grid>
            </Grid>
          )
          : (
            <Grid container direction="row" spacing={5}>
              <Grid item xs={9}>
                <UpcomingEvent />
              </Grid>
              <Grid item xs={3}>
                {isAdmin(user)
                                && <PendingApproval />}
              </Grid>
            </Grid>
          )}

      </PaddedGrid>
      <Footer />
    </>
  );
};

export default Home;
