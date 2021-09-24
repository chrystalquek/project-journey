import { ROWS_PER_PAGE, VolunteerSortFieldsType } from "@api/request";
import Table from "@components/common/data-display/Table";
import ErrorPage from "@components/common/ErrorPage";
import Header from "@components/common/Header";
import LoadingIndicator from "@components/common/LoadingIndicator";
import Accordion from "@components/common/surfaces/accordion/Accordion";
import AccordionSummary from "@components/common/surfaces/accordion/AccordionSummary";
import VolunteerBreadCrumbs from "@components/volunteer/VolunteerBreadCrumbs";
import { ERROR_MESSAGE } from "@constants/messages";
import {
  AccordionDetails,
  capitalize,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@material-ui/core";
import {
  GridCellParams,
  GridValueFormatterParams,
} from "@material-ui/data-grid";
import { listVolunteers } from "@redux/actions/volunteer/index";
import { selectVolunteersByIds } from "@redux/reducers/volunteer";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { VolunteerType } from "@type/volunteer";
import { formatDDMMYYYY } from "@utils/helpers/date";
import {
  convertFilterObjectToArray,
  initializeFilterObject,
} from "@utils/helpers/filterObject";
import { useIsMobile } from "@utils/helpers/layout";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { useDebounce } from "react-use";

const Index: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isMobile = useIsMobile();

  const volunteers = useAppSelector((state) =>
    selectVolunteersByIds(state, state.volunteer.index.listVolunteersIds)
  );
  const totalCount = useAppSelector(
    (state) => state.volunteer.index.totalCount
  );
  const status = useAppSelector((state) => state.volunteer.index.status);
  const error = useAppSelector((state) => state.volunteer.index.error);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [pageNum, setPageNum] = useState(0);
  const [sortBy, setSortBy] = useState<VolunteerSortFieldsType>("name");
  const [volunteerTypeFilter, setVolunteerTypeFilter] = useState(
    initializeFilterObject(VolunteerType)
  );

  const [openFilter, setOpenFilter] = useState(isMobile);
  const [isChoosingFilter, setIsChoosingFilter] = useState(false);

  useEffect(() => {
    if (!isChoosingFilter) {
      dispatch(
        listVolunteers({
          name: debouncedSearchQuery,
          pageNo: pageNum,
          sort: sortBy,
          volunteerType: convertFilterObjectToArray(volunteerTypeFilter),
          size: ROWS_PER_PAGE,
        })
      );
    }
  }, [
    debouncedSearchQuery,
    dispatch,
    isChoosingFilter,
    pageNum,
    sortBy,
    volunteerTypeFilter,
  ]);

  const handleMobileFilterDrawerClose = () => {
    setIsChoosingFilter(false);
  };

  // filter functions
  const handleFilterVolunteerTypeChange = (event) => {
    setVolunteerTypeFilter((prevFilter) => ({
      ...prevFilter,
      [event.target.name]: !prevFilter[event.target.name],
    }));
    setPageNum(0);

    if (isMobile) {
      setIsChoosingFilter(true);
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
                  checked={volunteerTypeFilter[volType]}
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
  const onSearch = (newNameToSearch: string) => {
    setSearchQuery(newNameToSearch);
  };
  useDebounce(
    () => {
      setDebouncedSearchQuery(searchQuery);
      setPageNum(0);
    },
    1000,
    [searchQuery]
  );

  // sort function
  const handleSortChange = (newSortBy: VolunteerSortFieldsType) => {
    setSortBy(newSortBy);
    setPageNum(0);
  };

  // change page function
  const handleChangePage = (nextPageNum: number) => {
    setPageNum(nextPageNum);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      sortable: true,
      renderCell: (params: GridCellParams) => (
        <Typography
          style={{ fontWeight: "bold", cursor: "pointer" }}
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

  if (status === "pending") {
    return <LoadingIndicator />;
  }
  if (status === "rejected" && error) {
    return <ErrorPage message={error.message ?? ERROR_MESSAGE} />;
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
            searchText={searchQuery}
            onSearch={onSearch}
            selectedSort={sortBy}
            onSort={handleSortChange}
            filterOptions={filterOptions}
            onApplyFilter={handleMobileFilterDrawerClose}
            paginationMode="server"
            rowCount={totalCount}
            page={pageNum}
            onPageChange={handleChangePage}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Index;
