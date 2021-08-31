import { Tabs } from "@components/common/Tabs";
import { ERROR_MESSAGE } from "@constants/messages";
import {
  getPendingSignUps,
  getPendingVolunteers,
} from "@redux/actions/common/pendingRequestsTabs";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { useRouter } from "next/dist/client/router";
import React, { FC, useEffect } from "react";
import ErrorPage from "./ErrorPage";
import LoadingIndicator from "./LoadingIndicator";

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
  }, [dispatch]);

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
    return <ErrorPage message={error.message ?? ERROR_MESSAGE} />;
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
