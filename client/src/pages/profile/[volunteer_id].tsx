import Header from "@components/common/Header";
import LoadingIndicator from "@components/common/LoadingIndicator";
import ContactInformation from "@components/profile/ContactInformation";
import EventCount from "@components/profile/EventCount";
import ProfileHeader from "@components/profile/ProfileHeader";
import Remarks from "@components/profile/Remarks";
import SignUpInformation from "@components/profile/SignUpInformation";
import { UNAUTHORIZED } from "@constants/routes";
import { Grid } from "@material-ui/core";
import { getVolunteer } from "@redux/actions/volunteer";
import { selectVolunteerById } from "@redux/reducers/volunteer";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { VolunteerType } from "@type/volunteer";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Profile = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const profileId = router.query.volunteer_id as string;

  const loggedInUser = useAppSelector((state) => state.session.user);
  const profileData = useAppSelector((state) =>
    selectVolunteerById(state, profileId)
  );
  const isLoading = useAppSelector(
    (state) => state.volunteer.status === "pending"
  );

  // First time load page, send request to receive data
  useEffect(() => {
    dispatch(getVolunteer(profileId));
  }, [dispatch, profileId]);

  // Guard clause, user cannot view other users
  // Only admin can view other users
  if (
    !loggedInUser ||
    (loggedInUser.volunteerType !== VolunteerType.ADMIN &&
      loggedInUser._id !== profileId)
  ) {
    router.push(UNAUTHORIZED);
    return null;
  }

  if (!profileData || isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Header title={profileData.name} />
      <Grid container direction="column">
        <Grid item />
        <Grid item container>
          <Grid item md={2} />
          <Grid item container direction="column" xs={12} md={8}>
            <Grid item>
              <ProfileHeader profilePageData={profileData} />
            </Grid>
            <Grid item container>
              <Grid item xs={12} md={7}>
                <Remarks profilePageData={profileData} />
              </Grid>
              <Grid item xs={12} md={5}>
                <ContactInformation profilePageData={profileData} />
              </Grid>
              <Grid item xs={12} md={7}>
                <SignUpInformation profileData={profileData} />
              </Grid>
              <Grid item xs={12} md={5}>
                <EventCount profilePageData={profileData} />
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
