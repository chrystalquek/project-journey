import { makeStyles, Grid, Card, CardContent, Typography } from '@material-ui/core';
import React, { FC, useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    shapeCircle: {
        backgroundColor: theme.palette.primary.main,
        width: 40,
        height: 40,
        borderRadius: '50%',
        textAlign: 'center',
        // verticalAlign: 'middle',
        // margin: 'auto',
        fontSize: 'large',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
}));

type PendingApprovalProps = {
    // volunteers: VolunteerState
    // getAllVolunteers: () => Promise<void>
}

const PendingApproval: FC<PendingApprovalProps> = ({
    // volunteers,
    // getAllVolunteers,
}: PendingApprovalProps) => {
    const classes = useStyles();

    // Only load on initial render to prevent infinite loop
    useEffect(() => {
        // getAllVolunteers();
    }, []);

    return (<Card><CardContent>
        <Grid container direction="row">
            <Grid item xs={10}>
                <Typography variant="h4">Pending Approvals</Typography>
                <Typography>5 pending volunteer approvals</Typography>
                <Typography>4 pending volunteer approvals</Typography>
            </Grid>
            <Grid item xs={2}>
                <div className={classes.shapeCircle}>4</div>
            </Grid>
        </Grid>
    </CardContent></Card>);
}

export default PendingApproval;