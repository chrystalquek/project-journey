import Head from "next/head";
import { favicon } from "@utils/constants/imagePaths";
import { FC } from "react";

type HeaderProps = {
  title: string;
};

// https://nextjs.org/docs/api-reference/next/head
const Header: FC<HeaderProps> = ({ title }) => (
  <Head>
    <title>{title}</title>
    <link rel="icon" href={favicon} />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
    />
    <meta
      name="description"
      content="Blessings in a Bag is a Singapore based purpose-driven organization that enables local
        volunteer communities to make an social impact on the world around them."
    />
  </Head>
);

export default Header;
