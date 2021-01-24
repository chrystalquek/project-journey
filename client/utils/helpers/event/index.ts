import { EventData } from '@type/event';
import {useSelector} from "react-redux";
import {StoreState} from "@redux/store";

/**
 * Stores common helper functions used in the /event endpoint.
 */
export function getStoreEvent(eid: string): EventData | null {
  if (eid) {
    return useSelector(((state: StoreState) => state.event.data[eid]));
  }
  return null;
}
