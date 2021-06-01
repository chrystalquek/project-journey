import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { StoreState } from '@redux/store';
import ErrorPage from 'next/error';

const useStyles = makeStyles((theme) => ({
    centralize: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
}));

interface LoadingIndicatorProps {
    status: boolean
}

const LoadingIndicator: FC<LoadingIndicatorProps> = (props: LoadingIndicatorProps) => {
    const classes = useStyles();

    return !props.status
        ? <></>
        : (
            <div className={classes.centralize}>
                <CircularProgress />
            </div>
        );
};

export default LoadingIndicator;
