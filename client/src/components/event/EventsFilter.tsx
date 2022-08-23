import React, { FC, useState } from "react";
import Accordion from "@components/common/surfaces/accordion/Accordion";
import AccordionSummary from "@components/common/surfaces/accordion/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import { EventFilterOptions, EventFilters } from "@type/event";

import { KeyboardDatePicker } from "@material-ui/pickers";
import dayjs from "dayjs";
import FilterAccordionGroup from "@components/common/surfaces/accordion/FilterAccordionGroup";

type AdminEventsFilterProps = {
  filters: EventFilterOptions;
  setFilters: (options: EventFilterOptions) => void;
};

const EventsFilter: FC<AdminEventsFilterProps> = ({
  filters,
  setFilters,
}: AdminEventsFilterProps) => {
  const [dateExpanded, setDateExpanded] = useState<boolean>(false);
  const [eventTypeExpanded, setEventTypeExpanded] = useState<boolean>(false);
  const [volTypeExpanded, setVolTypeExpanded] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [roleExpanded, setRoleExpanded] = useState<boolean>(false);

  const handleDateChange = (date) => {
    const newFilters = { ...filters, [EventFilters.DATE]: date };
    setFilters(newFilters);
    setIsCalendarOpen(false);
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
      case EventFilters.EVENT_LEAD:
      case EventFilters.PHOTOGRAPHER:
      case EventFilters.SOCIAL_MEDIA:
      case EventFilters.KIDS:
      case EventFilters.FUNDRAISING:
      case EventFilters.OTHERS:
        newFilters[EventFilters.ROLE][event.target.name] = event.target.checked;
        break;
      default:
      // do nothing
    }
    setFilters(newFilters);
  };

  return (
    <FilterAccordionGroup>
      <Accordion
        expanded={dateExpanded}
        onChange={() => setDateExpanded(!dateExpanded)}
      >
        <AccordionSummary title="Date" isExpanded={dateExpanded} />
        <AccordionDetails>
          <KeyboardDatePicker
            value={filters.date}
            variant="inline"
            open={isCalendarOpen}
            onClose={() => setIsCalendarOpen(false)}
            onOpen={() => setIsCalendarOpen(true)}
            onChange={(date) => handleDateChange(date)}
            minDate={dayjs(new Date())}
            format="dd/MM/yyyy"
            inputVariant="outlined"
            margin="dense"
            placeholder="dd/MM/yyyy"
            PopoverProps={{
              anchorOrigin: { horizontal: "left", vertical: "bottom" },
              transformOrigin: { horizontal: "left", vertical: "top" },
            }}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={eventTypeExpanded}
        onChange={() => setEventTypeExpanded(!eventTypeExpanded)}
      >
        <AccordionSummary title="Event Type" isExpanded={eventTypeExpanded} />
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.eventType.volunteering}
                  onChange={handleCheckboxChange}
                  name={EventFilters.VOLUNTEERING}
                  size="small"
                />
              }
              label="Volunteering"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.eventType.workshops}
                  onChange={handleCheckboxChange}
                  name={EventFilters.WORKSHOPS}
                  size="small"
                />
              }
              label="Workshops"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.eventType.hangouts}
                  onChange={handleCheckboxChange}
                  name={EventFilters.HANGOUTS}
                  disableRipple
                  size="small"
                />
              }
              label="Hangouts"
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={volTypeExpanded}
        onChange={() => setVolTypeExpanded(!volTypeExpanded)}
      >
        <AccordionSummary title="Volunteer Type" isExpanded={volTypeExpanded} />
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.volunteerType.adhoc}
                  onChange={handleCheckboxChange}
                  name={EventFilters.ADHOC}
                  size="small"
                />
              }
              label="Adhoc"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.volunteerType.committed}
                  onChange={handleCheckboxChange}
                  name={EventFilters.COMMITTED}
                  size="small"
                />
              }
              label="Committed"
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={roleExpanded}
        onChange={() => setRoleExpanded(!roleExpanded)}
      >
        <AccordionSummary title="Role" isExpanded={roleExpanded} />
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.role.eventlead}
                  onChange={handleCheckboxChange}
                  name={EventFilters.EVENT_LEAD}
                  size="small"
                />
              }
              label="Event Lead"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.role.photographer}
                  onChange={handleCheckboxChange}
                  name={EventFilters.PHOTOGRAPHER}
                  size="small"
                />
              }
              label="Photographer"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.role.socialmedia}
                  onChange={handleCheckboxChange}
                  name={EventFilters.SOCIAL_MEDIA}
                  size="small"
                />
              }
              label="Social Media"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.role.kids}
                  onChange={handleCheckboxChange}
                  name={EventFilters.KIDS}
                  size="small"
                />
              }
              label="Kids"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.role.fundraising}
                  onChange={handleCheckboxChange}
                  name={EventFilters.FUNDRAISING}
                  size="small"
                />
              }
              label="Fundraising"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.role.others}
                  onChange={handleCheckboxChange}
                  name={EventFilters.OTHERS}
                  size="small"
                />
              }
              label="Others"
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </FilterAccordionGroup>
  );
};

export default EventsFilter;
