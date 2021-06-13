// IGNORE
import { FC } from 'react';
import {
  Box, makeStyles, Theme, useTheme,
} from '@material-ui/core';

type EventDividerProps = {
  fontBold?: boolean,
  gutterBottom?: boolean,
}

// A horizontal divider with content-like text in between.
const useStyles = makeStyles((theme: Theme) => ({
  container: (props: EventDividerProps) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: props.gutterBottom ? '0.5em' : '0',
  }),
  border: {
    borderBottom: '1px solid black',
    flexGrow: 1,
  },
  content: (props: EventDividerProps) => ({
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    fontWeight: props.fontBold ? 'bold' : 'normal',
    fontSize: 22,
    fontFamily: theme.typography.fontFamily,
  }),
}));

const EventDivider: FC<EventDividerProps> = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.container}>
      <div className={classes.border} />
      <div className={classes.content}>
        {props.children}
      </div>
      <div className={classes.border} />
    </div>
  );
};

export { EventDivider };
