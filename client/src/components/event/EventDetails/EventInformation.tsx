import React, {FC} from "react";
import {EventData} from "@type/event";
import {getEventInfo, TableData} from "@utils/helpers/event/EventDetails/EventDetails";
import {
  Box,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from "@material-ui/core";
import {EventTypography} from "@components/common/event/EventTypography";

type EventInformationProps = {
  event: EventData
}

const useStyles = makeStyles({
  root: {
    background: 'none',
    borderBottom: 'none',
  },
  gutterBottom: {
    marginBottom: '0.35em',
  }
});

const EventInformation: FC<EventInformationProps> = ({ event }) => {
  const classes = useStyles();
  const rows: Array<TableData> = getEventInfo(event);

  return (
    <>
      <EventTypography fontSize='h3' fontBold borderBottom gutterBottom text='Event Information' />
      <TableContainer className={classes.gutterBottom}>
        <Table aria-label='event information table'>
          <TableBody>
            {rows.map((row: TableData) => (
              <TableRow key={row.title}>
                <TableCell className={classes.root} padding="none" component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell className={classes.root} padding="none" align="left">
                  {row.isHighlight ? <strong>{row.description}</strong> : row.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography gutterBottom>
        {event.description}
      </Typography>
    </>
  )
}

export default EventInformation;