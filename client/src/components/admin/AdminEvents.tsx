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
    <Grid container spacing={3}>
      {events.map((event) => (
        <Grid item xs={6}>
          <AdminEvent event={event} />
        </Grid>
      ))}
    </Grid>
  );
}

export default AdminEvents;
