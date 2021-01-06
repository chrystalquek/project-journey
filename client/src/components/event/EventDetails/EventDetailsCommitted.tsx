import React, {FC} from "react";
import {EventData} from "@type/event";
import {VolunteerData} from "@type/volunteer";
import {Box, Chip, Grid} from "@material-ui/core";
import {testEventImage1} from "@constants/imagePaths";
import EventInformation from "@components/event/EventDetails/EventInformation";
import VolunteerRoles from "@components/event/EventDetails/VolunteerRoles";
import EventRegisterForm, {FormState} from "@components/event/EventDetails/EventRegisterForm";
import EventBreadCrumbs from "@components/event/EventBreadCrumbs";
import {COMMITTED_VOLUNTEER_TAG} from "@constants/index";
import {FormDisabledReason} from "@utils/helpers/event/EventDetails/EventDetails";

type EventDetailsCommittedProps = {
  event: EventData,
  user: VolunteerData,
  formStatus: {
    disabled: boolean,
    reason: FormDisabledReason,
  },
  formHandlers: {
    signUpAndAccept: (uid: string, eid: string, form: FormState) => void,
    signUpOnly: (uid: string, eid: string, form: FormState) => void
  }
}

const EventDetailsCommitted: FC<EventDetailsCommittedProps> = ({ formStatus, formHandlers, event, user }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <EventBreadCrumbs eid={event._id} />
      </Grid>
      <Grid item xs={12}>
        <Box fontWeight='bold' fontSize="h1.fontSize">
          {event.name}
        </Box>
      </Grid>

      <Grid item xs={12}>
        {/*TODO: Replace with actual image*/}
        <img src={testEventImage1} alt={event.name} />
      </Grid>

      <Grid item xs={12}>
        <Chip color="secondary" label={COMMITTED_VOLUNTEER_TAG} />
      </Grid>

      {/*TODO: Style*/}
      {formStatus.reason === FormDisabledReason.SIGNUP_PENDING
        ? <h1>Sign-up Pending.</h1>
        : null
      }
      {formStatus.reason === FormDisabledReason.SIGNUP_ACCEPTED
        ? <h1>Successful registration!</h1>
        : null
      }

      <Grid item xs={12}>
        <EventInformation event={event} />
      </Grid>

      <Grid item xs={12}>
        <VolunteerRoles event={event} />
      </Grid>

      <Grid item xs={12}>
        <EventRegisterForm isDisabled={formStatus.disabled}
                           event={event}
                           user={user}
                           formHandlers={formHandlers}
        />
      </Grid>
    </Grid>
  )
}

export default EventDetailsCommitted;