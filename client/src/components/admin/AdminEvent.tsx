import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {reactLogo} from "@constants/imagePaths";
import {Box} from "@material-ui/core";
import {FC} from "react";
import {EventData} from "@type/event";
import {getVacancies, parseDate} from "@utils/event";

type AdminEventProps = {
  event: EventData,
}

const AdminEvent: FC<AdminEventProps> = ({ event }) => {
  const vacancies = getVacancies(event);
  const filled = vacancies[0];
  const total = vacancies[1];
  let date = parseDate(event.start_date, event.end_date)

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          image={reactLogo}
          title="TBD"
        />
        <CardContent>
          <Typography component="div">
            <Box fontWeight="fontWeightBold" my={1}>
              {event && event.name ? event.name : 'No event name provided'}
            </Box>
          </Typography>
          <Typography component="div">
            <Box fontWeight="fontWeightRegular" my={2}>
              {date ? date : 'No date provided'}
            </Box>
          </Typography>
          <Typography component="div">
            <Box fontWeight="fontWeightRegular" my={1}>
              {filled}/{total} vacancies left
            </Box>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default AdminEvent;