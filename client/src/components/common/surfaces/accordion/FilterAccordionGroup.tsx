import { makeStyles, Box } from "@material-ui/core";
import React, { FC } from "react";

const useStyles = makeStyles((theme) => ({
  border: {
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.action.disabled, // supposed to be 585858
    borderBottomWidth: "thin",
    paddingBottom: theme.spacing(2),
  },
}));

const FilterAccordionGroup: FC<{}> = (props) => {
  const { children } = props;
  const classes = useStyles();
  return (
    <>
      <Box fontWeight="fontWeightMedium" className={classes.border}>
        Filter By
      </Box>
      {children}
    </>
  );
};

export default FilterAccordionGroup;
