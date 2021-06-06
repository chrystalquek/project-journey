import { Typography } from '@material-ui/core';
import React, { FC } from 'react';

interface ErrorPageProps {
    message: string
}

// not done styling
const ErrorPage: FC<ErrorPageProps> = (props: ErrorPageProps) => {
    return <Typography variant='h1' align='center'>{props.message}</Typography>
};

export default ErrorPage;