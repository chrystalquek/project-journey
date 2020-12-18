import { Grid, Paper } from '@material-ui/core';
import AdminEvent from '@components/admin/AdminEvent';
import {FC, useEffect} from "react";
import {EventData} from "@type/event";

type AdminEventsProps = {
  events: Array<EventData>,
  getAdminEvents: () => any,
};

const AdminEvents: FC<AdminEventsProps> = ({ events, getAdminEvents }) => {
  useEffect(() => {
    getAdminEvents()
  }, [])

  return (
    <Grid container>
      {events?.map((event) => (
        <AdminEvent event={event} />
      ))}
    </Grid>
  );
}

export default AdminEvents;
