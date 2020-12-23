import Container from '@material-ui/core/Container';
import AdminBreadCrumbs from '@components/admin/AdminBreadCrumbs';
import SearchBar from '@components/common/SearchBar';
import AdminEvents from '@components/admin/AdminEvents';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Drawer,
  Grid,
  makeStyles,
  Typography
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {EventData} from "@type/event";
import {FC, useEffect, useState} from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from '@material-ui/core/styles';
import AdminEvent from "@components/admin/AdminEvent";
import AddIcon from '@material-ui/icons/Add';

type AdminEventsPageProps = {
  events: Array<EventData>,
  getAdminEvents: () => any,
};

const useStyles = makeStyles({
  box: {
    marginBottom: '1rem',
    lineHeight: '2rem'
  },
  card: {
    display: 'flex'
  }
})

const AdminEventsPage: FC<AdminEventsPageProps> = ({ events, getAdminEvents }) => {
  const theme = useTheme();
  const classes = useStyles();
  const screenSmall = useMediaQuery(theme.breakpoints.only('sm'));

  const [expanded, setExpanded] = useState(false);
  const handleChange = () => (event, isExpanded) => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    getAdminEvents()
  }, [])

  if (screenSmall) {
    return (
      <Container fixed>
        <AdminBreadCrumbs />
        <SearchBar />
        <Button variant="contained">Click me!</Button>
        <Box className={classes.box} fontWeight='bold'>
          <Typography display='inline' color='secondary'>{
            events ? events.length : 0}
          </Typography> Upcoming Events
        </Box>
        <Grid container spacing={4}>
          {events?.map((event) => (
            <Grid item className={classes.card} sm={6} md={4}>
              <AdminEvent key={event.name+event.description} event={event} />
            </Grid>
          ))}
        </Grid>
      </Container>
    )
  } else {
    return (
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item sm={12}><AdminBreadCrumbs/></Grid>
          <Grid item sm={9}><SearchBar/></Grid>
          <Grid item sm={3}><Button variant="contained">Create new event</Button></Grid>
          <Grid item sm={12}>
            <Box className={classes.box} fontWeight='bold'>
              <Typography display='inline' color='secondary'>{
                events ? events.length : 0}
              </Typography> Upcoming Events
            </Box>
          </Grid>
          <Grid item container sm={9} spacing={2}>
            {events?.map((event) => (
              <Grid item className={classes.card} sm={6} md={4}>
                <AdminEvent key={event.name+event.description} event={event} />
              </Grid>
            ))}
          </Grid>
          <Grid item sm={3}>
            <Accordion expanded={expanded} onChange={handleChange()}>
              <AccordionSummary
                expandIcon={<AddIcon />}
                aria-controls='panel-content'
                id='panel-header'
              >
                <Typography>Date</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  PEEKABO!!
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>

      </Container>
    );
  }
};

export default AdminEventsPage;
