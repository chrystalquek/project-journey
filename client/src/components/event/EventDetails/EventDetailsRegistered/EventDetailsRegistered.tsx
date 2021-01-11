import { EventData } from '@type/event';
import React, { FC, useEffect } from 'react';
import { VOLUNTEER_TYPE, VolunteerData } from '@type/volunteer';
import EventDetailsCommitted from '@components/event/EventDetails/EventDetailsRegistered/EventDetailsCommitted';
import EventDetailsAdhoc from '@components/event/EventDetails/EventDetailsRegistered/EventDetailsAdhoc';
import { FormState } from '@components/event/EventDetails/EventRegisterForm';
import { createSignUp, getSignUps } from '@redux/actions/signUp';
import { useDispatch, useSelector } from 'react-redux';
import { CreateSignUpRequest, UpdateSignUpRequest } from '@utils/api/request';
import { FormDisabledReason, getFormData } from '@utils/helpers/event/EventDetails/EventDetails';
import { StoreState } from '@redux/store';
import { SignUpIdType } from '@type/signUp';
import { getEventVacancies } from '@utils/helpers/event/EventsPageBody';
import apiClient from '@utils/api/apiClient';

type EventDetailsProps = {
  event: EventData,
  user: VolunteerData
}

const EventDetailsRegistered: FC<EventDetailsProps> = ({ event, user }) => {
  const dispatch = useDispatch();
  const currSignUps = useSelector((state: StoreState) => state.signUp.getSignUps.currSignUps);

  useEffect(() => {
    dispatch(getSignUps({ id: user._id, idType: 'userId' as SignUpIdType }));
  }, []);

  const signUpInfo = currSignUps.filter((signUp) => signUp.eventId === event._id);
  const isEventFull = getEventVacancies(event).remaining === 0;
  const hasPendingSignUp = signUpInfo.length > 0
                            && signUpInfo[0].status === 'pending';
  const hasAcceptedSignUp = signUpInfo.length > 0
                              && Array.isArray(signUpInfo[0].status)
                              && signUpInfo[0].status[0] === 'accepted';
  let reason;
  if (isEventFull) {
    reason = FormDisabledReason.EVENT_FULL;
  } else if (hasPendingSignUp) {
    reason = FormDisabledReason.SIGNUP_PENDING;
  } else if (hasAcceptedSignUp) {
    reason = FormDisabledReason.SIGNUP_ACCEPTED;
  } else {
    reason = '';
  }
  const formStatus = {
    disabled: isEventFull || hasPendingSignUp || hasAcceptedSignUp, // default disabled reasons
    reason,
  };

  const formHandlers = {
    signUpAndAccept: async (uid: string, eid: string, form: FormState) => {
      const request: CreateSignUpRequest = {
        ...getFormData(uid, eid, form),
        status: 'pending',
      };
      // TODO: redux action not really working, need help to fix
      apiClient.createSignUp(request)
        .then((res) => {
          const query = { id: res.signUpId, idType: 'signUpId' as SignUpIdType };
          const newReq: UpdateSignUpRequest = {
            ...request,
            status: ['accepted', form.firstChoice],
          };
          return apiClient.updateSignUp(query, newReq);
        })
        .then(() => console.log('Success!'));
      // dispatch(createAndAcceptSignUp( {request, form})); // possibly check for failure
    },
    signUpOnly: async (uid: string, eid: string, form: FormState) => {
      const request: CreateSignUpRequest = {
        ...getFormData(uid, eid, form),
        status: 'pending',
      };
      dispatch(createSignUp(request));
    },
  };

  const renderDetails = (volunteerType: VOLUNTEER_TYPE): React.ReactNode => {
    switch (volunteerType) {
      case VOLUNTEER_TYPE.ADHOC:
        // adhoc volunteers can't register for events opened to committed volunteers
        formStatus.disabled = event.volunteerType === VOLUNTEER_TYPE.COMMITED || formStatus.disabled;
        return (
          <EventDetailsAdhoc
            formStatus={formStatus}
            formHandlers={formHandlers}
            event={event}
            user={user}
          />
        );
      case VOLUNTEER_TYPE.COMMITED:
      case VOLUNTEER_TYPE.ADMIN:
        return (
          <EventDetailsCommitted
            formStatus={formStatus}
            formHandlers={formHandlers}
            event={event}
            user={user}
          />
        );
      default:
        // this path shouldn't be reached
        return null;
    }
  };

  return (
    <>
      {renderDetails(user.volunteerType)}
    </>
  );
};

export default EventDetailsRegistered;
