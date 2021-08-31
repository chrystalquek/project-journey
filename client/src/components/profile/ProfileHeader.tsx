import DataRow from "@components/common/DataRow";
import BecomeCommitedDialog from "@components/profile/BecomeCommitedDialog";
import { Grid, Typography, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { getCommitmentApplications } from "@redux/actions/commitmentApplication";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { CommitmentApplicationStatus } from "@type/commitmentApplication";
import { VolunteerData, VolunteerType } from "@type/volunteer";
import { formatDDMMYYYY } from "@utils/helpers/date";
import _ from "lodash";
import React, { FC, useEffect } from "react";
import ApproveCommitmentApplication from "./ApproveCommitmentApplication";
import ChangeVolunteerType from "./ChangeVolunteerType";
import ProfilePicture from "./ProfilePicture";

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: "left",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  grid: {
    backgroundColor: theme.palette.secondary.light,
    padding: "20px",
  },
  personIcon: {
    fontSize: 60,
  },
}));

type props = {
  profilePageData: VolunteerData;
};

const ProfileHeader: FC<props> = ({ profilePageData }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const direction = isMobile ? "column" : "row";
  const justify = isMobile ? "center" : "flex-start";
  const user = useAppSelector((state) => state.user);
  const userData = user?.user;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCommitmentApplications({ volunteerId: userData?._id }));
  }, [dispatch, userData?._id]);

  const commitmentApplicationState = useAppSelector(
    (state) => state.commitmentApplication
  );

  // Get the latest application.
  const commitmentApplication = _.chain(commitmentApplicationState.ownIds)
    .map((id) => commitmentApplicationState.data[id])
    .orderBy((data) => data.createdAt, "desc")
    .head()
    .value();

  return (
    <Grid
      container
      alignItems="center"
      direction={direction}
      justify={justify}
      spacing={2}
      className={classes.grid}
    >
      {/* Avatar icon */}
      <Grid item xs={12} sm="auto">
        <ProfilePicture profilePageData={profilePageData} />
      </Grid>

      {/* User details */}
      <Grid item xs={12} sm="auto">
        <Typography
          variant="h2"
          style={{ fontWeight: "bold" }}
          className={classes.header}
        >
          {profilePageData.name}
        </Typography>
        <Grid item container alignItems="center" direction="column">
          <Grid item>
            <DataRow
              header="Volunteer Status"
              data={profilePageData?.volunteerType?.toString()}
              xs1={9}
              xs2={3}
            />
          </Grid>
          <Grid item>
            <Typography>
              Member Since {formatDDMMYYYY(profilePageData?.createdAt)}
            </Typography>
          </Grid>
          <Grid item>
            {userData?.volunteerType === VolunteerType.ADMIN && (
              <ChangeVolunteerType />
            )}
          </Grid>
        </Grid>
        {/* Only shows rejected if the loggedInUser
        is viewing own profile and has a rejected commitmentApplication */}
        {profilePageData.volunteerType === VolunteerType.ADHOC &&
          userData?._id === profilePageData._id &&
          commitmentApplication?.status ===
            CommitmentApplicationStatus.Rejected && (
            <Typography>
              <i>Conversion Application: Rejected</i>
            </Typography>
          )}
        {/* Only shows the option to become committed if the loggedInUser
        is viewing own profile and is still an adhoc volunteer */}
        {profilePageData.volunteerType === VolunteerType.ADHOC &&
          userData?._id === profilePageData._id && <BecomeCommitedDialog />}
        {/* Approval button if loggedInUser is admin and volunteerProfile
        has a pending commitmentApplication */}
        {userData?.volunteerType === VolunteerType.ADMIN &&
          commitmentApplication?.status ===
            CommitmentApplicationStatus.Pending && (
            <ApproveCommitmentApplication
              commitmentApplication={commitmentApplication}
            />
          )}
      </Grid>
    </Grid>
  );
};

export default ProfileHeader;
