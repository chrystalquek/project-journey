import {
  makeStyles,
  AccordionSummary as MuiAccordionSummary,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import React, { FC } from "react";

// https://stackoverflow.com/questions/67233163/material-ui-prevent-accordion-summary-vertical-movement
const useStyles = makeStyles((theme) => ({
  root: {
    background: "none",
    padding: 0,
    margin: 0,
    "&.Mui-expanded": {
      minHeight: 0,
    },
    "& .MuiAccordionSummary-content.Mui-expanded": {
      margin: "auto",
    },
  },
  icon: { color: theme.palette.common.black },
}));

type AccordionSummaryProps = {
  title: string;
  isExpanded: boolean;
};

const AccordionSummary: FC<AccordionSummaryProps> = (props) => {
  const { title, isExpanded, children } = props;
  const classes = useStyles();
  return (
    <MuiAccordionSummary
      expandIcon={
        isExpanded ? (
          <RemoveIcon fontSize="small" className={classes.icon} />
        ) : (
          <AddIcon fontSize="small" className={classes.icon} />
        )
      }
      className={classes.root}
    >
      <Typography>{title}</Typography>
      {children}
    </MuiAccordionSummary>
  );
};

export default AccordionSummary;
