import ResetPassword from "@components/user/ResetPassword";
import { useRouter } from "next/router";

const ResetPasswordPage = () => {
  const router = useRouter();
  const token = router.query.token as string;

  return (
    <>
      <ResetPassword token={token} />
    </>
  );
};

export default ResetPasswordPage;
