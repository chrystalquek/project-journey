import React, { FC } from 'react';
import { EventData } from '@type/event';
import { getEventInfo, TableData } from '@utils/helpers/event/EventDetails/EventDetails';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow,
} from '@material-ui/core';

type EventInformationProps = {
  event: EventData
}

const EventInformation: FC<EventInformationProps> = ({ event }) => {
  const rows: Array<TableData> = getEventInfo(event);
  return (
    <>
      <Box fontWeight="bold" fontSize="h3.fontSize">
        Event Information
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="event information table">
          <TableBody>
            {rows.map((row: TableData) => (
              <TableRow key={row.title}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="left">
                  {row.isHighlight ? <strong>{row.description}</strong> : row.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p>
        {event.description}
      </p>
    </>
  );
};

export default EventInformation;
