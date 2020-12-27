import Head from '@components/common/Header';
import NavBar from '@components/common/NavBar';
import PaddedGrid from '@components/common/PaddedGrid';
import { makeStyles, Grid, Card, CardContent, Typography } from '@material-ui/core';
import { Footer } from 'antd/lib/layout/layout';
import React, { FC, useEffect } from 'react';
import PendingApproval from './PendingApproval';
import UpcomingEvent from './UpcomingEvent';

const useStyles = makeStyles((theme) => ({
    // table: {
    //     margin: theme.spacing(10),
    // },
}));

type HomeProps = {
    // volunteers: VolunteerState
    // getAllVolunteers: () => Promise<void>
}

const Home: FC<HomeProps> = ({
    // volunteers,
    // getAllVolunteers,
}: HomeProps) => {
    const classes = useStyles();

    // Only load on initial render to prevent infinite loop
    useEffect(() => {
        // getAllVolunteers();
    }, []);

    const defaultEvent = {
        name: "Volunteering",
        startDate: new Date(),
        endDate: new Date(),
    };

    // admin: TODO is it only those than I'm facilitating?
    // volunteer:
    const upcomingEvents = [defaultEvent, defaultEvent, defaultEvent, defaultEvent, defaultEvent];


    return (
        <>
            <Head title="Blessings in a Bag" />
            <NavBar />
            <PaddedGrid>
                <Grid container direction="row" spacing={5} >
                    <Grid item xs={9}>
                        <UpcomingEvent events={upcomingEvents} />
                    </Grid>
                    <Grid item xs={3}>
                        <PendingApproval />
                    </Grid>
                </Grid>
                <Footer />
            </PaddedGrid>
        </>
    );
}

export default Home;