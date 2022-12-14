import React, { FC, useState } from "react";
import { Grid } from "@material-ui/core";
import PaddedGrid from "@components/common/surfaces/PaddedGrid";
import RemarksTextField from "@components/profile/RemarksTextField";
import { VolunteerData, VolunteerType } from "@type/volunteer";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { updateVolunteer } from "@redux/actions/volunteer";
import TypographyWithUnderline from "@components/common/data-display/TypographyWithUnderline";
import { isAdmin } from "@utils/helpers/auth";
import { useSnackbar } from "notistack";

type props = {
  profilePageData: VolunteerData;
};

const Remarks: FC<props> = ({ profilePageData }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.session.user);
  const volunteerFetchStatus = useAppSelector(
    (state) => state.volunteer.status
  );

  let originalVolunteerRemarks = profilePageData.volunteerRemarks;
  let originalAdministratorRemarks = profilePageData.administratorRemarks;

  const [volunteerRemarks, setVolunteerRemarks] = useState<string>(
    originalVolunteerRemarks ?? ""
  );
  const [administratorRemarks, setAdministratorRemarks] = useState<string>(
    originalAdministratorRemarks ?? ""
  );
  const [volunteerRemarksChanged, setVolunteerRemarksChanged] =
    useState<boolean>(false);
  const [administratorRemarksChanged, setAdministratorRemarksChanged] =
    useState<boolean>(false);

  const handleVolunteerRemarks = (event) => {
    setVolunteerRemarks(event.target.value);
    setVolunteerRemarksChanged(event.target.value !== originalVolunteerRemarks);
  };

  const handleAdministratorRemarks = (event) => {
    setAdministratorRemarks(event.target.value);
    setAdministratorRemarksChanged(
      event.target.value !== originalAdministratorRemarks
    );
  };

  const { enqueueSnackbar } = useSnackbar();

  const saveVolunteerRemarks = () => {
    dispatch(
      updateVolunteer({
        _id: profilePageData._id,
        data: {
          volunteerRemarks,
        },
      })
    );
    if (volunteerFetchStatus === "rejected") {
      enqueueSnackbar("Update remarks failed.", {
        variant: "error",
      });
    } else if (volunteerFetchStatus === "fulfilled") {
      enqueueSnackbar("Successfully Updated Remarks!", {
        variant: "success",
      });
    }

    originalVolunteerRemarks = volunteerRemarks;
    setVolunteerRemarksChanged(false);
  };
  const saveAdministratorRemarks = () => {
    dispatch(
      updateVolunteer({
        _id: profilePageData._id,
        data: {
          administratorRemarks,
        },
      })
    );
    if (volunteerFetchStatus === "rejected") {
      enqueueSnackbar("Update remarks failed.", {
        variant: "error",
      });
    } else if (volunteerFetchStatus === "fulfilled") {
      enqueueSnackbar("Successfully Updated Remarks!", {
        variant: "success",
      });
    }

    originalAdministratorRemarks = administratorRemarks;
    setAdministratorRemarksChanged(false);
  };

  const discardVolunteerRemarks = () => {
    setVolunteerRemarks(profilePageData.volunteerRemarks ?? "");
    setVolunteerRemarksChanged(false);
  };
  const discardAdministratorRemarks = () => {
    setAdministratorRemarks(profilePageData.administratorRemarks ?? "");
    setAdministratorRemarksChanged(false);
  };

  return (
    <PaddedGrid>
      <Grid item>
        <TypographyWithUnderline fontWeight="fontWeightMedium" fontSize="h3">
          Remarks
        </TypographyWithUnderline>
      </Grid>
      <Grid item container direction="column" spacing={2}>
        {/* Volunteer remarks */}
        <RemarksTextField
          value={volunteerRemarks}
          onChange={handleVolunteerRemarks}
          label="Notes for Admin"
          show={volunteerRemarksChanged}
          onSave={saveVolunteerRemarks}
          onDiscard={discardVolunteerRemarks}
          // Admin cannot edit the remarks written by the volunteer
          // But admin can edit remarks of him/herself
          disabled={isAdmin(user) && profilePageData._id !== user?._id}
        />

        {/* Admin remarks not rendered if the profilePageData is admin
        and only shows the admin remarks if the user is admin */}
        {profilePageData.volunteerType !== VolunteerType.ADMIN &&
          user?.volunteerType === VolunteerType.ADMIN && (
            <RemarksTextField
              value={administratorRemarks}
              onChange={handleAdministratorRemarks}
              label="Notes on volunteer"
              show={administratorRemarksChanged}
              onSave={saveAdministratorRemarks}
              onDiscard={discardAdministratorRemarks}
              disabled={!isAdmin(user)}
            />
          )}
      </Grid>
    </PaddedGrid>
  );
};

export default Remarks;
