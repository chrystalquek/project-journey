import React, {FC} from "react";
import {Box, Button} from "@material-ui/core";
import {useRouter} from "next/router";
import {LOGIN_ROUTE, SIGNUP_ROUTE} from "@constants/routes";
import {EventTypography} from "@components/common/event/EventTypography";

type CreateAccountNoticeProps = {
  // nothing yet
}

const CreateAccountNotice: FC<CreateAccountNoticeProps> = () => {
  const router = useRouter();

  return (
    <>
      <EventTypography fontSize='h3' textCenter borderTop borderBottom gutterBottom fontBold text="Register Here" />
      <p>You need an account to register events.</p>
      <p>It takes less than 2mins to create one</p>
      <div>
        <Button variant="contained" onClick={() => router.push(SIGNUP_ROUTE)}>Sign up</Button>
        or
        <Button onClick={() => router.push(LOGIN_ROUTE)}>Login</Button>
      </div>
    </>
  )
}

export default CreateAccountNotice;
