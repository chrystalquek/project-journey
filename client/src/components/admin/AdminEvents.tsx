import { Grid } from '@material-ui/core';
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
      <Grid container spacing={2} style={{ margin: '1rem' }}>
        {events?.map((event) => (
          <Grid xs={12} sm={6} md={4}>
            <AdminEvent key={event.name+event.description} event={event} />
          </Grid>
        ))}
      </Grid>
  );
}

export default AdminEvents;
