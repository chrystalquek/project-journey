import Header from "@components/common/Header";
import { resetUser } from "@redux/reducers/user";
import { useAppDispatch } from "@redux/store";
import { useRouter } from "next/router";

export const LoginRedirect = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  dispatch(resetUser());
  router.push("/login");
  return (
    <>
      <Header title="Blessings in a Bag" />
    </>
  );
};
