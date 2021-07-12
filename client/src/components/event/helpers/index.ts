import { EventData } from "@type/event";
import { useSelector } from "react-redux";
import { StoreState } from "@redux/store";
import { SignUpData, SignUpStatus } from "@type/signUp";

/**
 * Stores common helper functions used in the /event endpoint.
 */
export function getStoreEvent(eid: string): EventData | null {
  if (eid) {
    return useSelector((state: StoreState) => state.event.event.data[eid]);
  }
  return null;
}

export function getAcceptedSignUp(signUp: SignUpData): string | null {
  if (signUp?.status === SignUpStatus.ACCEPTED) {
    return signUp.acceptedRole;
  }
  return null;
}
