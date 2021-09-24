import { Tabs } from "@components/common/Tabs";
import { useRouter } from "next/dist/client/router";
import React, { FC } from "react";

interface TabsProps {
  clickedOn: number;
}

const PendingRequestsTabs: FC<TabsProps> = (props: TabsProps) => {
  const { clickedOn } = props;
  const router = useRouter();
  const tabs = [
    {
      label: `Volunteers`,
      onClick: () => router.push("/volunteer/pending-requests"),
    },
    {
      label: `Events`,
      onClick: () => router.push("/event/pending-requests"),
    },
  ];

  return <Tabs tabs={tabs} clickedOn={clickedOn} />;
};

export default PendingRequestsTabs;
