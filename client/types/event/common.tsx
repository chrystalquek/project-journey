import {FormDisabledReason} from "@utils/helpers/event/EventDetails/EventDetails";
import {SignUpData} from "@type/signUp";

export type FormStatus = {
  disabled: boolean,
  reason: FormDisabledReason,
  details: {
    acceptedSignUp: Array<SignUpData> | null,
  }
}
