import Head from '@components/common/Header';
import NavBar from '@components/common/NavBar';
import PaddedGrid from '@components/common/PaddedGrid';
import PendingApproval from '@containers/home/PendingApproval';
import UpcomingEvent from '@containers/home/UpcomingEvent';
import { makeStyles, Grid } from '@material-ui/core';
import { Footer } from 'antd/lib/layout/layout';
import React, { FC } from 'react';

const useStyles = makeStyles(() => ({
    // table: {
    //     margin: theme.spacing(10),
    // },
}));

type HomeProps = {}

const Home: FC<HomeProps> = ({
}: HomeProps) => {

    return (
        <>
            <Head title="Blessings in a Bag" />
            <NavBar />
            <PaddedGrid>
                <Grid container direction="row" spacing={5} >
                    <Grid item xs={9}>
                        <UpcomingEvent />
                    </Grid>
                    <Grid item xs={3}>
                        {(true || isAdmin) &&
                            <PendingApproval />}
                    </Grid>
                </Grid>
                <Footer />
            </PaddedGrid>
        </>
    );
}

export default Home;