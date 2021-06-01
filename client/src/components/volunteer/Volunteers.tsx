import React, { FC, useEffect } from 'react';
import {
  Button,
  capitalize,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { VOLUNTEER_TYPE } from '@type/volunteer';
import RightDrawer from '@components/common/RightDrawer';
import { StoreState } from '@redux/store';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '@components/common/SearchBar';
import { useRouter } from 'next/router';
import { checkLoggedIn } from '@utils/helpers/auth';
import { getPaginatedVolunteers } from '@redux/actions/volunteer/index';
import { formatDDMMYYYY } from '@utils/helpers/date';
import { VolunteerSortFieldsType } from '@redux/reducers/volunteer/index';
import LoadingIndicator from '@components/common/LoadingIndicator';

// constants
export const rowsPerPage = 10; // for VolunteerProfile, its default is 10

const useStyles = makeStyles((theme) => ({
  link: {
    color: '#069',
    textDecoration: 'underline',
    cursor: 'pointer',
    textTransform: 'none',
    textAlign: 'left',
  },
  rightButton: {
    float: 'right',
    padding: 1,
  },
  border: {
    padding: theme.spacing(2),
  },
  nameRow: {
    cursor: 'pointer',
  },
}));

const Volunteers: FC<{}> = ({ }) => {
  checkLoggedIn()
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const volunteerState = useSelector((state: StoreState) => state.volunteer);
  const { volunteerType } = volunteerState.collate.filters;
  const { sort } = volunteerState.collate;
  const { volunteers } = volunteerState;
  const { total, pageNo } = volunteerState.pagination;

  const { loadingStatus } = volunteerState

  // Only load on initial render to prevent infinite loop
  useEffect(() => {
    dispatch(getPaginatedVolunteers({}));
  }, []);



  // filter functions
  const handleFilterVolunteerTypeChange = (event) => {
    dispatch(getPaginatedVolunteers({
      filters: {
        volunteerType: {
          ...volunteerType,
          [event.target.name]: !volunteerType[event.target.name],
        },
      }
    }))
  };
  const handleClearAllFilters = () => {
    var clearedVolunteerTypeFilters = Object.assign({}, volunteerType);
    Object.values(VOLUNTEER_TYPE).forEach(function (key) { clearedVolunteerTypeFilters[key] = false });

    dispatch(getPaginatedVolunteers({
      filters: {
        volunteerType: clearedVolunteerTypeFilters
      }
    }))
  }

  // filter state and components
  const isDisableClearFilters = Object.values(VOLUNTEER_TYPE).every(volType => !volunteerType[volType]);
  const [openFilter, setOpenFilter] = React.useState(isMobile);
  const filterOptions = (
    <TableContainer>
      <Table>
        <TableHead>
          <TableCell>
            <b>Filter By</b>
          </TableCell>
        </TableHead>
        <TableRow>
          <TableCell>
            Volunteer Type
            <Button className={classes.rightButton} size="small" onClick={() => setOpenFilter(!openFilter)}>{openFilter ? <RemoveIcon fontSize="small" /> : <AddIcon fontSize="small" />}</Button>
            {openFilter
              && (
                <>
                  <FormGroup>
                    {Object.values(VOLUNTEER_TYPE).map((volType) => (
                      <FormControlLabel
                        control={<Checkbox size="small" checked={volunteerType[volType]} onChange={handleFilterVolunteerTypeChange} name={volType} key={volType} />}
                        label={<Typography variant="body1">{capitalize(volType)}</Typography>}
                      />
                    ))}

                  </FormGroup>
                  <Button className={classes.link} disabled={isDisableClearFilters} onClick={handleClearAllFilters}><u>Clear</u></Button>
                </>
              )}
          </TableCell>
        </TableRow>
      </Table>
    </TableContainer>

  );

  // search function
  const onSearch = (newNameToSearch: string) => dispatch(getPaginatedVolunteers({ search: { name: newNameToSearch } }))

  // search component
  const searchBar = <SearchBar setFilterFunction={onSearch} />;

  // sort function
  const handleSortChange = (event: React.ChangeEvent<{ value: VolunteerSortFieldsType }>) => {
    dispatch(getPaginatedVolunteers({ sort: event.target.value as VolunteerSortFieldsType }));
  };

  // sort component
  const volunteerSortFields = [{ label: 'Name', value: 'name' }, { label: 'Member Since', value: 'createdAt' }];
  const sortMenu = (
    <FormControl fullWidth variant="outlined" size="small" margin="dense">
      <InputLabel>Sort By:</InputLabel>
      <Select
        value={sort}
        onChange={handleSortChange}
      >
        {volunteerSortFields.map((field) => <MenuItem value={field.value} key={field.value}>{field.label}</MenuItem>)}

      </Select>
    </FormControl>
  );

  // change page function
  const handleChangePage = (event, newPage: number) => {
    dispatch(getPaginatedVolunteers({ pageNo: newPage }));
  };


  const volunteerTable = (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Volunteer Type</b></TableCell>
              <TableCell><b>Member Since</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {volunteers.map((vol) => (
              <TableRow key={vol.email}>
                <TableCell onClick={() => router.push(`/profile/${vol._id}`)} className={classes.nameRow}><b>{vol.name}</b></TableCell>
                <TableCell>{capitalize(vol.volunteerType)}</TableCell>
                <TableCell>{formatDDMMYYYY(vol.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[rowsPerPage]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={pageNo}
        onChangePage={handleChangePage}
      />
    </>
  );

  return (
    <>
      <LoadingIndicator status={loadingStatus} />
      {!isMobile
        ? (
          <Grid >
            <Grid direction="row" container spacing={6}>
              <Grid item xs={2} />
              <Grid item xs={4}>
                {searchBar}
              </Grid>
              <Grid item xs={3}>
                {sortMenu}
              </Grid>
              <Grid item xs={3} />
            </Grid>

            <Grid direction="row" container spacing={10}>
              <Grid item xs={2} />
              <Grid item xs={7}>
                {volunteerTable}
              </Grid>
              <Grid item xs={3}>
                {filterOptions}
              </Grid>
            </Grid>
          </Grid>
        )
        : (
          <Grid className={classes.border} direction="column" container spacing={3}>
            <Grid item>
              {searchBar}
            </Grid>
            <Grid item>
              {sortMenu}
            </Grid>
            <Grid item>
              <RightDrawer buttonTitle={<div className={classes.link}>Filter results</div>} content={filterOptions} />
            </Grid>
            <Grid item>
              {volunteerTable}
            </Grid>
          </Grid>
        )}

    </>
  );
};

export default Volunteers;
