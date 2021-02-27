import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { ActionableDialog } from '@components/common/ActionableDialog';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '@redux/store';
import { CommitmentApplicationStatus } from '@type/commitmentApplication';
import { updateCommitmentApplication } from '@redux/actions/commitmentApplication';
import { VOLUNTEER_TYPE } from '@type/volunteer';
import { updateVolunteer } from '@redux/actions/user';

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'left',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
}));


const ApproveCommitmentApplication = ({ commitmentApplication }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const profilePageData = useSelector((state: StoreState) => state.profilePage.data);

  const DialogContent = "Are you sure you want to approve " + profilePageData.name + "?"

  const handleApproveEvent = () => {
    // Change the status of the commitment Application
    const updatedCommitmentApplication = { ...commitmentApplication, status: CommitmentApplicationStatus.Accepted }
    dispatch(updateCommitmentApplication(updatedCommitmentApplication))

    // Change the volunteerType of the user in the profile page
    const updatedVolunteerData = { ...profilePageData, volunteerType: VOLUNTEER_TYPE.COMMITED}
    dispatch(updateVolunteer({ email: updatedVolunteerData.email, updatedVolunteerData: updatedVolunteerData}))
  }

  return (
    <div className={classes.header}>
        <Typography variant="body2"> Pending approval for conversion to committed volunteer </Typography>
        <ActionableDialog
          open={isOpen}
          setOpen={() => setIsOpen(!isOpen)}
          content={DialogContent}
          buttonTitle="Approve"
          buttonOnClick={handleApproveEvent}
          openCloseButtonTitle="Approve Conversion"
          recommendedAction="cancel"
        />
    </div>
  )
}

export default ApproveCommitmentApplication