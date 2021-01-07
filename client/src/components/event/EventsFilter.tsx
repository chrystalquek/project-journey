import React, { FC, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { EventFilterOptions, EventFilters } from '@type/event';

import { KeyboardDatePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';

type AdminEventsFilterProps = {
  filters: EventFilterOptions;
  setFilters: (options: EventFilterOptions) => void;
};

// TODO: Switch to makeStyles; seemsthat withStyles isn't overriding
const Accordion = withStyles({
  root: {
    borderBottom: '1px solid grey',
    boxShadow: 'none',
    background: 'none',
    padding: '0',
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    background: 'none',
    padding: '0',
    margin: '0',
    minHeight: '54px',
    '&$expanded': {
      minHeight: '54px',
    },
  },
  content: {
    margin: '12px 0',
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles({
  root: {
    padding: '0',
  },
})(MuiAccordionDetails);

const EventsFilter: FC<AdminEventsFilterProps> = ({
  filters,
  setFilters,
}: AdminEventsFilterProps) => {
  const [dateExpanded, setDateExpanded] = useState(false);
  const [eventTypeExpanded, setEventTypeExpanded] = useState(false);
  const [volTypeExpanded, setVolTypeExpanded] = useState(false);

  const handleDateChange = (date) => {
    const newFilters = { ...filters, [EventFilters.DATE]: date };
    setFilters(newFilters);
  };

  const handleCheckboxChange = (event) => {
    const newFilters = { ...filters };
    switch (event.target.name) {
      case EventFilters.ADHOC:
      case EventFilters.COMMITTED:
        newFilters[EventFilters.VOLUNTEERTYPE][event.target.name] =
          event.target.checked;
        break;
      case EventFilters.HANGOUTS:
      case EventFilters.VOLUNTEERING:
      case EventFilters.WORKSHOPS:
        newFilters[EventFilters.EVENTTYPE][event.target.name] =
          event.target.checked;
        break;
      default:
      // do nothing
    }
    setFilters(newFilters);
  };

  return (
    <>
      <Box marginBottom='4px' fontWeight='bold'>
        <Typography variant='body2'>Filter By</Typography>
      </Box>
      <div style={{ width: '100%' }}>
        <Accordion
          expanded={dateExpanded}
          onChange={() => setDateExpanded(!dateExpanded)}
          square
        >
          <AccordionSummary
            expandIcon={dateExpanded ? <RemoveIcon /> : <AddIcon />}
            aria-controls='panel-date'
            id='panel-date'
          >
            <Typography>Date</Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{ justifyContent: 'center', paddingBottom: '15px' }}
          >
            <KeyboardDatePicker
              value={filters.date}
              variant='inline'
              onChange={(date) => handleDateChange(date)}
              minDate={dayjs(new Date())}
              format='MM/DD/YYYY'
              inputVariant='outlined'
              margin='dense'
              placeholder='dd/MM/yyyy'
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={eventTypeExpanded}
          onChange={() => setEventTypeExpanded(!eventTypeExpanded)}
          square
        >
          <AccordionSummary
            expandIcon={eventTypeExpanded ? <RemoveIcon /> : <AddIcon />}
            aria-controls='panel-eventType'
            id='panel-eventType'
          >
            <Typography>Event Type</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.eventType.volunteering}
                    onChange={handleCheckboxChange}
                    name={EventFilters.VOLUNTEERING}
                    size='small'
                  />
                }
                label='Volunteering'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.eventType.workshops}
                    onChange={handleCheckboxChange}
                    name={EventFilters.WORKSHOPS}
                    size='small'
                  />
                }
                label='Workshops'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.eventType.hangouts}
                    onChange={handleCheckboxChange}
                    name={EventFilters.HANGOUTS}
                    disableRipple
                    size='small'
                  />
                }
                label='Hangouts'
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={volTypeExpanded}
          onChange={() => setVolTypeExpanded(!volTypeExpanded)}
          square
        >
          <AccordionSummary
            expandIcon={volTypeExpanded ? <RemoveIcon /> : <AddIcon />}
            aria-controls='panel-volType'
            id='panel-volType'
          >
            <Typography>Volunteer Type</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.volunteerType.adhoc}
                    onChange={handleCheckboxChange}
                    name={EventFilters.ADHOC}
                    size='small'
                  />
                }
                label='Adhoc'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.volunteerType.committed}
                    onChange={handleCheckboxChange}
                    name={EventFilters.COMMITTED}
                    size='small'
                  />
                }
                label='Committed'
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default EventsFilter;
