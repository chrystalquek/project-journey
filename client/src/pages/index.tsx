import { useAppSelector } from "@redux/store";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const user = useAppSelector((state) => state.session.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/home");
    }
  }, [user, router]);

  return null;
};

export default Index;
