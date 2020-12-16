import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {reactLogo} from "@constants/imagePaths";
import {Box} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 345,
    height: 345,
    borderRadius: 8
  },
  media: {
    height: 140,
  },
});

// TODO: Use event data and populate
const AdminEvent = ({ event }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={reactLogo}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography component="div">
            <Box fontWeight="fontWeightBold" my={1}>
              Volunteering: Regular Session [Committed]
            </Box>
          </Typography>
          <Typography component="div">
            <Box fontWeight="fontWeightRegular" my={2}>
              29th October 2020
              2.30pm - 6.00pm
            </Box>
          </Typography>
          <Typography component="div">
            <Box fontWeight="fontWeightRegular" my={1}>
              10/15 vacancies left
            </Box>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default AdminEvent;