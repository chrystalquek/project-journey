import React, { FC } from 'react';
import { EventData } from '@type/event';
import { getEventInfo, TableData } from '@utils/helpers/event/EventDetails/EventDetails';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import { EventTypography } from '@components/common/event/EventTypography';

type EventInformationProps = {
  event: EventData
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'none',
    borderBottom: 'none',
  },
  gutterBottom: {
    marginBottom: '0.35em',
  },
  highlight: {
    color: theme.palette.text.secondary,
  },
  container: {
    marginTop: theme.spacing(5),
  },
}));

const EventInformation: FC<EventInformationProps> = ({ event }) => {
  const classes = useStyles();
  const rows: Array<TableData> = getEventInfo(event);
  return (
    <div className={classes.container}>
      <EventTypography fontSize="h3" fontBold borderBottom gutterBottom text="Event Information" />
      <TableContainer className={classes.gutterBottom}>
        <Table aria-label="event information table">
          <TableBody>
            {rows.map((row: TableData) => (
              <TableRow
                key={row.title}
              >
                <TableCell className={classes.root} padding="none" component="th" scope="row">
                  <strong>{row.title}</strong>
                </TableCell>
                <TableCell className={classes.root} padding="none" align="left">
                  {row.isHighlight
                    ? <strong className={classes.highlight}>{row.description}</strong>
                    : <strong>{row.description}</strong>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EventTypography text={event.description || 'No event description.'} gutterTop />
    </div>
  );
};

export default EventInformation;
