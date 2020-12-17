import React, { FC } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

type EventCardProps = {
  title: string;
  date: string;
  time: string;
  currentVacancy: string;
  maximumVacancy: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 400,
    },
    media: {
      height: 0,
      paddingTop: "100%", // 16:9
    },
    bold: {
      fontWeight: 600,
    },
  })
);

export default function RecipeReviewCard(props: EventCardProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="https://eventnook.s3.amazonaws.com/eventlogo/eventlogo_1871.png"
        title={props.title}
      />
      <CardContent>
        <Typography
          variant="h6"
          color="textPrimary"
          component="p"
          className={classes.bold}
        >
          {props.title}
        </Typography>
        <Typography variant="body1" color="textPrimary" component="p">
          {props.date}
        </Typography>
        <Typography variant="body1" color="textPrimary" component="p">
          {props.time}
        </Typography>
        <Typography
          variant="body1"
          color="textPrimary"
          component="p"
          className={classes.bold}
        >
          {props.currentVacancy}/{props.maximumVacancy} vacancies left
        </Typography>
      </CardContent>
    </Card>
  );
}
