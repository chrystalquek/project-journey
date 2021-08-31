import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
} from "@material-ui/core";
import {
  DataGrid,
  GridColDef,
  GridPageChangeParams,
  GridRowParams,
} from "@material-ui/data-grid";
import React, { FC, useCallback } from "react";
import { ROWS_PER_PAGE } from "@api/request";
import { useIsMobile } from "@utils/helpers/layout";
import SearchBar from "../SearchBar";
import RightDrawer from "../RightDrawer";
import FilterAccordionGroup from "../surfaces/accordion/FilterAccordionGroup";

// NOTE: column getters
// valueGetter: combine fields -> string
// valueFormatter: change only that field
// renderCell: can be React element

const useStyles = makeStyles((theme) => ({
  dataGrid: {
    fontSize: theme.typography.body1.fontSize,
    // no greenbox on select
    "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus":
      {
        outline: "none",
      },
    // no border around table
    "&.MuiDataGrid-root": {
      border: 0,
    },
    // don't display weird column header separator
    "&.MuiDataGrid-root .MuiDataGrid-iconSeparator": {
      display: "none",
    },
    // remove padding in column title
    "&.MuiDataGrid-root .MuiDataGrid-columnHeaderTitleContainer": {
      padding: 0,
    },
    height: 700,
  },
  "&. header": {
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

type TableProps = {
  columns: GridColDef[];
  rows: Array<{ _id: string; [key: string]: any }>;

  onRowClick?: (param: GridRowParams) => void;

  searchText?: string;
  onSearch?: (searchText: string) => void;

  selectedSort?: string;
  onSort?: (value: string) => void;

  filterOptions?: JSX.Element;
  onApplyFilter?: () => void;

  paginationMode?: "server" | "client";
  onPageChange?: (newPage: number) => void;
  page?: number; // current page
  rowCount?: number; // no of rows in total
};

const Table: FC<TableProps> = (props) => {
  const {
    columns,
    rows,
    searchText,
    onSearch,
    selectedSort,
    onSort,
    filterOptions,
    onApplyFilter,
    paginationMode,
    onPageChange,
    page,
    rowCount,
  } = props;
  const classes = useStyles(props);
  const isDesktop = !useIsMobile();

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onSort) {
        onSort(e.target.value);
      }
    },
    [onSort]
  );

  const sortableColumns = columns.filter((col) => col.sortable);

  const sortMenu = (
    <FormControl fullWidth variant="outlined" size="small" margin="dense">
      <InputLabel htmlFor="uncontrolled-native">Sort By:</InputLabel>
      <Select value={selectedSort} onChange={handleSortChange}>
        {sortableColumns.map((field) => (
          <MenuItem value={field.field} key={field.field}>
            {field.headerName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const searchBar = (
    <SearchBar
      setFilterFunction={onSearch ?? (() => {})}
      key="Search field"
      value={searchText}
    />
  );

  const filterAccordionGroup = (
    <FilterAccordionGroup>{filterOptions}</FilterAccordionGroup>
  );

  const hasSearch = searchText !== undefined && onSearch; // cos empty str is a falsy value
  const hasSort = selectedSort && onSort;
  const hasFilter = filterOptions;

  const isControlledPagination =
    onPageChange && page !== undefined && rowCount !== undefined; // 0 is a falsy value

  return (
    <Grid
      container
      xs={12}
      spacing={2}
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid item container xs={8} spacing={5}>
        {hasSearch && (
          <Grid item xs={12} md={8}>
            {searchBar}
          </Grid>
        )}
        {hasSort && (
          <Grid item xs={6} md={4}>
            {sortMenu}
          </Grid>
        )}
        {!isDesktop && hasFilter && (
          <Grid item xs={12}>
            <RightDrawer
              buttonTitle={<>Filter results</>}
              content={filterAccordionGroup}
              handleApplyFilter={onApplyFilter}
            />
          </Grid>
        )}
      </Grid>

      <Grid
        item
        container
        xs={12}
        spacing={5}
        style={{
          display: "flex",
          justifyContent: isDesktop && hasFilter ? "flex-end" : "center",
        }}
      >
        <Grid item container xs={8}>
          <DataGrid
            columns={columns.map((column) => ({
              ...column,
              sortable: false,
              headerClassName: "header",
              ...(!column.width && !column.flex && { flex: 1 }), // equal column width if both flex and width is not defined
            }))}
            rows={rows}
            disableColumnMenu
            disableColumnSelector
            disableDensitySelector
            hideFooterSelectedRowCount
            disableSelectionOnClick
            pagination
            paginationMode={paginationMode ?? "client"}
            {...(isControlledPagination
              ? {
                  onPageChange: (params: GridPageChangeParams) => {
                    if (onPageChange) {
                      onPageChange(params.page);
                    }
                  },
                  page,
                  rowCount,
                }
              : {})}
            rowsPerPageOptions={[ROWS_PER_PAGE]}
            pageSize={ROWS_PER_PAGE}
            getRowId={(row) => row._id}
            className={classes.dataGrid}
          />
        </Grid>
        {isDesktop && hasFilter && (
          <Grid item md={2}>
            {filterAccordionGroup}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Table;
