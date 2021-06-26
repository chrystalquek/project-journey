import React, { FC } from "react";
import { EventData } from "@type/event";
import {
  getEventInfo,
  TableData,
} from "@components/event/helpers/EventDetails/EventDetails";
import {
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import { EventTypography } from "@components/common/event/EventTypography";

type EventInformationProps = {
  event: EventData;
};

const useStyles = makeStyles((theme) => ({
  root: {
    background: "none",
    borderBottom: "none",
  },
  gutterBottom: {
    marginBottom: "0.35em",
  },
  highlight: {
    color: theme.palette.text.secondary,
  },
  row: {
    height: "20px",
  },
}));

const EventInformation: FC<EventInformationProps> = ({ event }) => {
  const classes = useStyles();
  const rows: Array<TableData> = getEventInfo(event);
  return (
    <Grid container spacing={5} direction="column">
      <Grid
        item
        style={{
          paddingBottom: 0,
        }}
      >
        <EventTypography
          fontSize="h3"
          fontBold
          borderBottom
          gutterBottom
          text="Event Information"
        />
      </Grid>
      <Grid item>
        <TableContainer className={classes.gutterBottom}>
          <Table aria-label="event information table">
            <TableBody>
              {rows.map((row: TableData) => (
                <TableRow key={row.title} className={classes.row}>
                  <TableCell
                    className={classes.root}
                    padding="none"
                    component="th"
                    scope="row"
                  >
                    {row.isHighlight ? (
                      <strong className={classes.highlight}>{row.title}</strong>
                    ) : (
                      <strong>{row.title}</strong>
                    )}
                  </TableCell>
                  <TableCell
                    className={classes.root}
                    padding="none"
                    align="left"
                  >
                    {row.isHighlight ? (
                      <strong className={classes.highlight}>
                        {row.description}
                      </strong>
                    ) : (
                      <strong>{row.description}</strong>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item>
        <EventTypography text={event.description || "No event description."} />
      </Grid>
    </Grid>
  );
};

export default EventInformation;
