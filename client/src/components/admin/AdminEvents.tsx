import { Grid } from '@material-ui/core';
import AdminEvent from '@components/admin/AdminEvent';
import {FC, useEffect} from "react";
import {EventData} from "@type/event";

type AdminEventsProps = {
  events: Array<EventData>,
};

const AdminEvents: FC<AdminEventsProps> = ({ events }) => {
  return (
      <Grid container spacing={4}>
        {events?.map((event) => (
          <Grid item xs={12} sm={6} md={4}>
            <AdminEvent key={event.name+event.description} event={event} />
          </Grid>
        ))}
      </Grid>
  );
}

export default AdminEvents;
