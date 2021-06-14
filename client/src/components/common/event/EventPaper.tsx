// IGNORE
import { FC } from 'react';
import { makeStyles, Paper } from '@material-ui/core';

type EventPaperProps = {
  alignItems?: 'flex-start' | 'flex-end' | 'center', // start = left, end = right
}

const useStyles = makeStyles({
  root: (props: EventPaperProps) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: props.alignItems || 'flex-start',
    background: '#E5F8FB',
    borderRadius: '1.5em',
    padding: '1.5em',
  }),
});

const EventPaper: FC<EventPaperProps> = (props) => {
  const classes = useStyles(props);
  const { children } = props;
  return (
    <Paper className={classes.root} variant="outlined">
      {children}
    </Paper>
  );
};

export { EventPaper };
