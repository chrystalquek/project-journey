import { makeStyles, Grid, Card, CardContent, Typography } from '@material-ui/core';
import { GetCountResponse } from 'api/response';
import React, { FC, useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    shapeCircle: {
        backgroundColor: theme.palette.primary.main,
        width: 40,
        height: 40,
        borderRadius: '50%',
        textAlign: 'center',
        fontSize: 'large',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
}));

type PendingApprovalProps = {
    getPendingSignUps: () => Promise<{ payload: GetCountResponse }>,
    getPendingVolunteers: () => Promise<{ payload: GetCountResponse }>
}

const PendingApproval: FC<PendingApprovalProps> = ({
    getPendingSignUps,
    getPendingVolunteers
}: PendingApprovalProps) => {
    const classes = useStyles();

    // Only load on initial render to prevent infinite loop
    useEffect(() => {
        getPendingSignUps().then((resp) => setPendingSignUpCount(resp.payload.count));
        getPendingVolunteers().then((resp) => setPendingVolunteerCount(resp.payload.count));
    }, []);

    const [pendingSignUpCount, setPendingSignUpCount] = React.useState(0);
    const [pendingVolunteerCount, setPendingVolunteerCount] = React.useState(0);

    return (<Card><CardContent>
        <Grid container direction="row">
            <Grid item xs={10}>
                <Typography variant="h4">Pending Approvals</Typography>
                <Typography>{pendingVolunteerCount} pending volunteer approvals</Typography>
                <Typography>{pendingSignUpCount} pending event approvals</Typography>
            </Grid>
            <Grid item xs={2}>
                <div className={classes.shapeCircle}>4</div>
            </Grid>
        </Grid>
    </CardContent></Card>);
}

export default PendingApproval;
