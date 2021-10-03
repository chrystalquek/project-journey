import Header from "@components/common/Header";
import { logout } from "@redux/reducers/session";
import { useAppDispatch } from "@redux/store";
import { useRouter } from "next/router";

export const LoginRedirect = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  dispatch(logout());
  router.push("/login");
  return (
    <>
      <Header title="Blessings in a Bag" />
    </>
  );
};
