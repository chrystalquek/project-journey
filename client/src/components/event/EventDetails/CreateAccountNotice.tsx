import React, { FC } from 'react';
import { Box, Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@constants/routes';

type CreateAccountNoticeProps = {
  // nothing yet
}

const CreateAccountNotice: FC<CreateAccountNoticeProps> = () => {
  const router = useRouter();

  return (
    <>
      <Box fontWeight="bold" fontSize="h3.fontSize">
        Register Here
      </Box>
      <p>You need an account to register events.</p>
      <p>It takes less than 2mins to create one</p>
      <div>
        <Button variant="contained" onClick={() => router.push(SIGNUP_ROUTE)}>Sign up</Button>
        or
        <Button onClick={() => router.push(LOGIN_ROUTE)}>Login</Button>
      </div>
    </>
  );
};

export default CreateAccountNotice;
