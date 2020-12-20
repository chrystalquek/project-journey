import Container from '@material-ui/core/Container';
import AdminBreadCrumbs from '@components/admin/AdminBreadCrumbs';
import SearchBar from '@components/common/SearchBar';
import AdminEvents from '@components/admin/AdminEvents';
import {makeStyles, Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {EventData} from "@type/event";
import {FC, useEffect} from "react";

type AdminEventsPageProps = {
  events: Array<EventData>,
  getAdminEvents: () => any,
};

const useStyles = makeStyles({
  box: {
    marginBottom: '1rem',
    lineHeight: '2rem'
  }
})

const AdminEventsPage: FC<AdminEventsPageProps> = ({ events, getAdminEvents }) => {
  const classes = useStyles();

  useEffect(() => {
    getAdminEvents()
  }, [])

  return (
    <Container fixed>
      <AdminBreadCrumbs />
      <SearchBar />
      <Box className={classes.box} fontWeight='bold'>
        <Typography display='inline' color='secondary'>{
          events ? events.length : 0}
        </Typography> Upcoming Events
      </Box>
      <AdminEvents events={events}/>
    </Container>
  );
};

export default AdminEventsPage;
