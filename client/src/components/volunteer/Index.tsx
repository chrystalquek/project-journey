import { FC, useState, useEffect } from "react";
import {
  AccordionDetails,
  capitalize,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@material-ui/core";
import { VolunteerType } from "@type/volunteer";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { useRouter } from "next/router";
import { useIsMobile } from "@utils/helpers/layout";
import { getVolunteers } from "@redux/actions/volunteer/index";
import { formatDDMMYYYY } from "@utils/helpers/date";
import LoadingIndicator from "@components/common/LoadingIndicator";
import ErrorPage from "@components/common/ErrorPage";
import Header from "@components/common/Header";
import Accordion from "@components/common/surfaces/accordion/Accordion";
import AccordionSummary from "@components/common/surfaces/accordion/AccordionSummary";
import { VolunteerSortFieldsType } from "@api/request";
import Table from "@components/common/data-display/Table";
import {
  GridCellParams,
  GridValueFormatterParams,
} from "@material-ui/data-grid";
import VolunteerBreadCrumbs from "./VolunteerBreadCrumbs";

const Index: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isMobile = useIsMobile();

  const volunteerState = useAppSelector((state) => state.volunteer.index);
  const { filters } = volunteerState.collate;
  const { sort } = volunteerState.collate;
  const { name } = volunteerState.collate.search;
  const { volunteers } = volunteerState;
  const { count, pageNo } = volunteerState.pagination;
  const [volunteerType, setVolunteerType] = useState(filters.volunteerType);
  const [openFilter, setOpenFilter] = useState(isMobile);

  // Only load on initial render to prevent infinite loop
  useEffect(() => {
    dispatch(getVolunteers({}));
  }, [dispatch]);

  const handleApplyFilter = () => {
    dispatch(
      getVolunteers({
        newCollate: {
          filters: {
            volunteerType,
          },
        },
      })
    );
  };

  // filter functions
  const handleFilterVolunteerTypeChange = (event) => {
    setVolunteerType({
      ...volunteerType,
      [event.target.name]: !volunteerType[event.target.name],
    });
    if (!isMobile) {
      dispatch(
        getVolunteers({
          newCollate: {
            filters: {
              volunteerType: {
                ...volunteerType,
                [event.target.name]: !volunteerType[event.target.name],
              },
            },
          },
        })
      );
    }
  };

  const filterOptions = (
    <Accordion
      expanded={openFilter}
      onChange={() => setOpenFilter(!openFilter)}
    >
      <AccordionSummary title="Volunteer Type" isExpanded={openFilter} />
      <AccordionDetails>
        <FormGroup>
          {Object.values(VolunteerType).map((volType) => (
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={volunteerType[volType]}
                  onChange={handleFilterVolunteerTypeChange}
                  name={volType}
                  key={volType}
                />
              }
              label={<Typography>{capitalize(volType)}</Typography>}
              key={volType}
            />
          ))}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );

  // search function
  const onSearch = (newNameToSearch: string) =>
    dispatch(
      getVolunteers({
        newCollate: { search: { name: newNameToSearch } },
        newPagination: { pageNo: 0 },
      })
    );

  // sort function
  const handleSortChange = (newSort: string) => {
    dispatch(
      getVolunteers({
        newCollate: { sort: newSort as VolunteerSortFieldsType },
      })
    );
  };

  // change page function
  const handleChangePage = (newPage: number) => {
    dispatch(getVolunteers({ newPagination: { pageNo: newPage } }));
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      sortable: true,
      renderCell: (params: GridCellParams) => (
        <Typography
          style={{ fontWeight: "bold" }}
          onClick={() =>
            router.push(`/profile/${params.getValue(params.id, "_id")}`)
          }
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "volunteerType",
      headerName: "Volunteer Type",
      sortable: false,
      valueFormatter: (params: GridValueFormatterParams) =>
        capitalize(params.value as VolunteerType),
    },
    {
      field: "createdAt",
      headerName: "Member Since",
      sortable: true,
      valueFormatter: (params: GridValueFormatterParams) =>
        formatDDMMYYYY(params.value as string),
    },
  ];

  // use these for all pages
  const { isLoading, error } = volunteerState;
  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <ErrorPage message={error.message} />;
  }

  return (
    <>
      <Header title="Volunteers" />
      <Grid
        direction="row"
        container
        spacing={4}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid item xs={8}>
          {!isMobile && <VolunteerBreadCrumbs />}
        </Grid>
        <Grid item xs={12}>
          <Table
            columns={columns}
            rows={volunteers}
            searchText={name}
            onSearch={onSearch}
            selectedSort={sort}
            onSort={handleSortChange}
            filterOptions={filterOptions}
            onApplyFilter={handleApplyFilter}
            paginationMode="server"
            rowCount={count}
            page={pageNo}
            onPageChange={handleChangePage}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Index;
