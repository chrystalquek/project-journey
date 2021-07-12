import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@redux/store";
import {
  getPendingSignUps,
  getPendingVolunteers,
} from "@redux/actions/common/pendingRequestsTabs";
import { Tabs } from "@components/common/Tabs";
import { useRouter } from "next/dist/client/router";
import LoadingIndicator from "./LoadingIndicator";
import ErrorPage from "./ErrorPage";

interface TabsProps {
  clickedOn: number;
}

const PendingRequestsTabs: FC<TabsProps> = (props: TabsProps) => {
  const { clickedOn } = props;

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getPendingVolunteers());
    dispatch(getPendingSignUps());
  }, []);

  // volunteer no
  const { pendingVolunteers, pendingSignUps, isLoading, error } =
    useAppSelector((state) => state.common.pendingRequestsTabs);

  const upcomingEventsWithPendingSignUpsCount = new Set(
    pendingSignUps.map((signUp) => signUp.eventId)
  ).size;

  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <ErrorPage message={error.message} />;
  }

  const tabs = [
    {
      label: `Volunteers (${pendingVolunteers.length})`,
      onClick: () => router.push("/volunteer/pending-requests"),
    },
    {
      label: `Events (${upcomingEventsWithPendingSignUpsCount})`,
      onClick: () => router.push("/event/pending-requests"),
    },
  ];

  return <Tabs tabs={tabs} clickedOn={clickedOn} />;
};

export default PendingRequestsTabs;
