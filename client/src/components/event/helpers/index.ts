import { EventData } from "@type/event";
import { useAppSelector } from "@redux/store";
import { SignUpData, SignUpStatus } from "@type/signUp";

/**
 * Stores common helper functions used in the /event endpoint.
 */
export function useGetStoreEvent(eid: string): EventData | null {
  const storeEvent = useAppSelector((state) => state.event.event.data[eid]);
  return eid ? storeEvent : null;
}

export function getAcceptedSignUp(signUp: SignUpData | null): string | null {
  if (signUp?.status === SignUpStatus.ACCEPTED && signUp?.acceptedRole) {
    return signUp.acceptedRole;
  }
  return null;
}
