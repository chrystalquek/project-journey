import { useAppSelector } from "@redux/store";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const user = useAppSelector((state) => state.user.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/home");
    }
  }, [user]);

  return null;
};

export default Index;
