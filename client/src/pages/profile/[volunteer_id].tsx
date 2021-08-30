import React, { useEffect, useRef } from "react";
import { Grid } from "@material-ui/core";
import ProfileHeader from "@components/profile/ProfileHeader";
import Remarks from "@components/profile/Remarks";
import ContactInformation from "@components/profile/ContactInformation";
import SignUpInformation from "@components/profile/SignUpInformation";
import EventCount from "@components/profile/EventCount";
import { useAppDispatch, useAppSelector } from "@redux/store";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { VolunteerType } from "@type/volunteer";
import { getVolunteerById } from "@redux/actions/profilePage";
import LoadingIndicator from "@components/common/LoadingIndicator";
import Header from "@components/common/Header";

const Profile = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const profilePageId = useRef<string>(router.query.volunteer_id as string);

  const loggedInUser = useAppSelector((state) => state.user);
  const profilePageData = useAppSelector((state) => state.profilePage.data);

  // First time load page, send request to receive data
  useEffect(() => {
    profilePageId.current = router.query.volunteer_id as string;
    dispatch(getVolunteerById(profilePageId.current));
  }, [dispatch, router]);

  // Guard clause, user cannot view other users
  // Only admin can view other users
  if (
    loggedInUser.user === null ||
    (loggedInUser.user.volunteerType !== VolunteerType.ADMIN &&
      loggedInUser.user._id !== profilePageId.current)
  ) {
    return <ErrorPage statusCode={404} />;
  }

  return profilePageData === null ||
    profilePageData?._id !== profilePageId.current ? (
    <LoadingIndicator />
  ) : (
    <>
      <Header title={profilePageData.name} />
      <Grid container direction="column">
        <Grid item />
        <Grid item container>
          <Grid item md={2} />
          <Grid item container direction="column" xs={12} md={8}>
            <Grid item>
              <ProfileHeader profilePageData={profilePageData} />
            </Grid>
            <Grid item container>
              <Grid item xs={12} md={7}>
                <Remarks profilePageData={profilePageData} />
              </Grid>
              <Grid item xs={12} md={5}>
                <ContactInformation profilePageData={profilePageData} />
              </Grid>
              <Grid item xs={12} md={7}>
                <SignUpInformation profilePageData={profilePageData} />
              </Grid>
              <Grid item xs={12} md={5}>
                <EventCount profilePageData={profilePageData} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={2} />
        </Grid>
      </Grid>
    </>
  );
};
export default Profile;
