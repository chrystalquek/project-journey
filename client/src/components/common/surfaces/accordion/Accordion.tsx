import { makeStyles, Accordion as MuiAccordion } from "@material-ui/core";
import { FC } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.action.disabled, // supposed to be 585858
    borderBottomWidth: "thin",
    boxShadow: "none",
    background: "none",
    padding: 0,
    margin: 0,
  },
}));

type AccordionProps = {
  expanded: boolean;
  onChange: () => void;
};

const Accordion: FC<AccordionProps> = ({ expanded, onChange, children }) => {
  const classes = useStyles();
  return children ? (
    <MuiAccordion
      expanded={expanded}
      onChange={onChange}
      square
      className={classes.root}
    >
      {children}
    </MuiAccordion>
  ) : (
    <> </>
  );
};

export default Accordion;
