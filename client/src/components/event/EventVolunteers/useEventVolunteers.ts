import { getEvent } from "@redux/actions/event";
import { getSignUpsUpcomingEvent } from "@redux/actions/signUp";
import { getVolunteersById } from "@redux/actions/volunteer";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { SignUpData, SignUpStatus } from "@type/signUp";
import { useState, useEffect, useCallback } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import _ from "lodash";

export const useEventVolunteers = (eid: string) => {
  const dispatch = useAppDispatch();

  // Redux states.
  const signUps = useAppSelector((state) => state.signUp);
  const event = useAppSelector((state) => state.event.event.data[eid]);
  const roles = event?.roles;

  // Volunteers.
  const [volunteerIds, setVolunteerIds] = useState<string[]>([]);
  const [volunteerData, setVolunteerData] = useState({});

  // Sign ups.
  const [approvedSignUps, setApprovedSignUps] = useState<SignUpData[]>([]);
  const [nonApprovedSignUps, setNonApprovedSignUps] = useState<SignUpData[]>(
    []
  );

  // Filtered sign ups.
  const [filteredApprovedSignUps, setFilteredApprovedSignUps] = useState<
    SignUpData[]
  >([]);
  const [filteredNonApprovedSignUps, setFilteredNonApprovedSignUps] = useState<
    SignUpData[]
  >([]);

  // Roles.
  const [roleVacancies, setRoleVacancies] = useState({});

  // Sort.
  const [selectedSort, setSelectedSort] = useState("name");

  const sortByName = useCallback(
    (array: SignUpData[]): SignUpData[] =>
      _.orderBy(array, (signUp) => volunteerData[signUp.userId].name, "asc"),
    [volunteerData]
  );

  const sortByRole = useCallback(
    (array: SignUpData[]): SignUpData[] =>
      _.orderBy(array, (signUp) => signUp.acceptedRole, "asc"),
    []
  );

  // Search.
  const [searchString, setSearchString] = useState("");

  // Tabs.
  const [isApprovedTab, setIsApprovedTab] = useState(true);

  // Get event and sign up.
  useEffect(() => {
    if (eid) {
      dispatch(getEvent(eid));
      dispatch(getSignUpsUpcomingEvent({ id: eid, idType: "eventId" }));
    }
  }, [dispatch, eid]);

  // Get signed up volunteer ids.
  useEffect(() => {
    if (signUps && eid) {
      const signUpsData = signUps.data;
      const ids = Object.values(signUpsData)
        .filter((signUp) => signUp && signUp.eventId === eid && signUp.userId)
        .map((signUp) => signUp!.userId);

      setVolunteerIds(ids);
    }
  }, [eid, signUps]);

  // Get signed up volunteers' data.
  const getVolunteerData = useCallback(async () => {
    const data = await dispatch(getVolunteersById({ ids: volunteerIds }))
      // @ts-ignore type exists
      .then(unwrapResult)
      .then((result) => result.data);
    return data;
  }, [volunteerIds, dispatch]);

  // Update volunteer id to volunteer data map.
  useEffect(() => {
    const updateVolunteerData = async () => {
      const volunteerDataMap = {};
      const volunteers = await getVolunteerData();

      volunteers.forEach((volunteer) => {
        volunteerDataMap[volunteer._id] = volunteer;
      });
      setVolunteerData(volunteerDataMap);
    };

    if (volunteerIds.length) updateVolunteerData();
  }, [volunteerIds, getVolunteerData]);

  // Get vacancies for all roles.
  const getVacanciesForAllRoles = useCallback(() => {
    const vacancies = {};
    roles?.forEach((role) => {
      const num = role.capacity - role.volunteers.length;
      vacancies[role.name] = num > 0 ? num : 0;
    });

    return vacancies;
  }, [roles]);
  useEffect(() => {
    setRoleVacancies(getVacanciesForAllRoles());
  }, [event, getVacanciesForAllRoles, roles]);

  // Partition sign ups based on approved status.
  useEffect(() => {
    const signUpData = signUps.data;

    const approved: SignUpData[] = [];
    const nonApproved: SignUpData[] = [];

    Object.values(signUpData)
      .filter((signUp) => signUp?.eventId === eid)
      .forEach((signUp) => {
        if (signUp?.status === SignUpStatus.ACCEPTED) {
          approved.push(signUp);
        } else if (signUp) {
          nonApproved.push(signUp);
        }
      });

    setApprovedSignUps(approved);
    setFilteredApprovedSignUps(approved);

    setNonApprovedSignUps(nonApproved);
    setFilteredNonApprovedSignUps(nonApproved);
  }, [dispatch, eid, signUps]);

  // Sort and filter sign ups.
  useEffect(() => {
    let currentSignUps = isApprovedTab
      ? [...approvedSignUps]
      : [...nonApprovedSignUps];
    // Filter.
    currentSignUps = currentSignUps.filter(
      (signUp) =>
        volunteerData[signUp.userId]?.name.search(
          new RegExp(searchString, "i")
        ) >= 0
    );

    // Sort.
    switch (selectedSort) {
      case "name":
        currentSignUps = sortByName(currentSignUps);
        break;
      case "role":
        currentSignUps = isApprovedTab
          ? sortByRole(currentSignUps)
          : currentSignUps;
        break;
      default:
    }

    if (isApprovedTab) setFilteredApprovedSignUps(currentSignUps);
    else setFilteredNonApprovedSignUps(currentSignUps);

    /* eslint-disable react-hooks/exhaustive-deps */
  }, [
    volunteerData,
    approvedSignUps,
    isApprovedTab,
    nonApprovedSignUps,
    searchString,
    selectedSort,
    sortByName,
    sortByRole,
  ]);

  return {
    // Sign ups.
    signUps,
    approvedSignUps,
    nonApprovedSignUps,
    filteredApprovedSignUps,
    filteredNonApprovedSignUps,
    // Event.
    event,
    // Roles.
    roles,
    roleVacancies,
    // Volunteers.
    volunteerIds,
    volunteerData,
    // Tabs.
    isApprovedTab,
    setIsApprovedTab,
    // Sort.
    selectedSort,
    setSelectedSort,
    // Search.
    searchString,
    setSearchString,
  };
};
