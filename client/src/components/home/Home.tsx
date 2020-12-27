import Head from '@components/common/Header';
import NavBar from '@components/common/NavBar';
import PaddedGrid from '@components/common/PaddedGrid';
import PendingApproval from '@containers/home/PendingApproval';
import UpcomingEvent from '@containers/home/UpcomingEvent';
import { Grid, useMediaQuery, useTheme } from '@material-ui/core';
import { Footer } from 'antd/lib/layout/layout';
import React, { FC } from 'react';
import { UserState } from '@redux/reducers/user';
import { isAdmin } from '@utils/helpers/auth';

type HomeProps = {
    user: UserState
}

const Home: FC<HomeProps> = ({
    user
}: HomeProps) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <>
            <Head title="Blessings in a Bag" />
            <NavBar />

            <PaddedGrid>
                {isMobile ?
                    <Grid container spacing={5} >
                        <Grid item>
                            {isAdmin(user) &&
                                <PendingApproval />}
                        </Grid>
                        <Grid item>

                            <UpcomingEvent />
                        </Grid>
                    </Grid>
                    : <Grid container direction="row" spacing={5} >
                        <Grid item xs={9}>
                            <UpcomingEvent />
                        </Grid>
                        <Grid item xs={3}>
                            {isAdmin(user) &&
                                <PendingApproval />}
                        </Grid>
                    </Grid>}

            </PaddedGrid>
            <Footer />
        </>
    );
}

export default Home;
