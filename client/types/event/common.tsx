import { FormDisabledReason } from '@utils/helpers/event/EventDetails/EventDetails';
import { SignUpData } from '@type/signUp';

// Contains types used in /event
export type FormStatus = {
  disabled: boolean,
  reason: FormDisabledReason,
  details: {
    acceptedSignUp: SignUpData | null,
  }
}
