import DataRow from "@components/common/DataRow";
import LoadingIndicator from "@components/common/LoadingIndicator";
import BecomeCommitedDialog from "@components/profile/BecomeCommitedDialog";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { listCommitmentApplications } from "@redux/actions/commitmentApplication";
import { selectCommitmentApplicationsByIds } from "@redux/reducers/commitmentApplication";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { CommitmentApplicationStatus } from "@type/commitmentApplication";
import { VolunteerData, VolunteerType } from "@type/volunteer";
import { formatDDMMYYYY } from "@utils/helpers/date";
import { useIsMobile } from "@utils/helpers/layout";
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

type Props = {
  profilePageData: VolunteerData;
};

const ProfileHeader: FC<Props> = ({ profilePageData }) => {
  const classes = useStyles();
  const isMobile = useIsMobile();
  const direction = isMobile ? "column" : "row";
  const justify = isMobile ? "center" : "flex-start";
  const user = useAppSelector((state) => state.session.user);
  const isLoading = useAppSelector(
    (state) => state.commitmentApplication.status === "pending"
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user) {
      dispatch(listCommitmentApplications({ volunteerId: user._id }));
    }
  }, [dispatch, user]);

  const commitmentApplications = useAppSelector((state) =>
    selectCommitmentApplicationsByIds(
      state,
      state.commitmentApplication.listCommitmentApplicationIds
    )
  );

  // Get the latest application.
  const latestCommitmentApplication = _.head(
    _.orderBy(commitmentApplications, (ca) => ca.createdAt, "desc")
  );

  if (isLoading) {
    return <LoadingIndicator />;
  }

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
            {user?.volunteerType === VolunteerType.ADMIN && (
              <ChangeVolunteerType {...{ profilePageData }} />
            )}
          </Grid>
        </Grid>
        {/* Only shows rejected if the loggedInUser
        is viewing own profile and has a rejected commitmentApplication */}
        {profilePageData.volunteerType === VolunteerType.ADHOC &&
          user?._id === profilePageData._id &&
          latestCommitmentApplication?.status ===
            CommitmentApplicationStatus.Rejected && (
            <Typography>
              <i>Conversion Application: Rejected</i>
            </Typography>
          )}
        {/* Only shows the option to become committed if the loggedInUser
        is viewing own profile and is still an adhoc volunteer */}
        {profilePageData.volunteerType === VolunteerType.ADHOC &&
          user?._id === profilePageData._id && <BecomeCommitedDialog />}
        {/* Approval button if loggedInUser is admin and volunteerProfile
        has a pending commitmentApplication */}
        {user?.volunteerType === VolunteerType.ADMIN &&
          latestCommitmentApplication?.status ===
            CommitmentApplicationStatus.Pending && (
            <ApproveCommitmentApplication
              {...{
                commitmentApplication: latestCommitmentApplication,
                profilePageData,
              }}
            />
          )}
      </Grid>
    </Grid>
  );
};

export default ProfileHeader;
