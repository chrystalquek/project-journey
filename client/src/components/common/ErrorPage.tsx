import { Typography } from '@material-ui/core';
import React, { FC } from 'react';

interface ErrorPageProps {
    message: string
}

// not done styling
const ErrorPage: FC<ErrorPageProps> = (props: ErrorPageProps) => {
  const { message } = props;
  return <Typography variant="h1" align="center">{message}</Typography>;
};

export default ErrorPage;
