import React, { FC, useEffect } from 'react';
import Head from 'next/head';

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
import { getVolunteersVolunteerProfile } from '@redux/actions/volunteer';
import SearchBar from '@components/common/SearchBar';
import { useRouter } from 'next/router';
import { checkLoggedIn } from '@utils/helpers/auth';

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

const volunteerSortFields = [{ label: 'Name', value: 'name' }, { label: 'Member Since', value: 'createdAt' }]; // what is "Last Activity"
export type VolunteerSortFieldsType = 'name' | 'createdAt';

const VolunteerProfile: FC<{}> = ({ }) => {
  checkLoggedIn()
  const classes = useStyles();
  const dispatch = useDispatch();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const volunteers = useSelector((state: StoreState) => state.volunteer);

  const { volunteerType } = volunteers.volunteerProfile.filters;
  const { name } = volunteers.volunteerProfile.search;
  const { sort } = volunteers.volunteerProfile;

  const fillOtherParams = (params: { pageNo?: number, volunteerType?: Record<VOLUNTEER_TYPE, boolean>, name?: string, sort?: VolunteerSortFieldsType }) => ({
    pageNo: params.pageNo || 0,
    filters: {
      volunteerType: params.volunteerType || volunteerType,
    },
    search: {
      name: params.name || name,
    },
    sort: params.sort || sort,
  });

  // Only load on initial render to prevent infinite loop
  useEffect(() => {
    dispatch(getVolunteersVolunteerProfile(fillOtherParams({ volunteerType, name, sort })));
  }, []);

  // filter
  const handleFilterVolunteerTypeChange = (event) => {
    dispatch(getVolunteersVolunteerProfile(
      fillOtherParams({
        volunteerType: {
          ...volunteerType,
          [event.target.name]: !volunteerType[event.target.name],
        },
      }),
    ));
  };

  const [openFilter, setOpenFilter] = React.useState(isMobile);

  const filterOptions = (
    <TableContainer>
      <Table>
        <TableRow>
          <TableCell>
            <b>Filter By</b>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Volunteer Type
            <Button className={classes.rightButton} size="small" onClick={() => setOpenFilter(!openFilter)}>{openFilter ? <RemoveIcon fontSize="small" /> : <AddIcon fontSize="small" />}</Button>
            {openFilter
              && (
                <FormGroup>
                  {Object.values(VOLUNTEER_TYPE).map((volType) => (
                    <FormControlLabel
                      control={<Checkbox size="small" checked={volunteerType[volType]} onChange={handleFilterVolunteerTypeChange} name={volType} />}
                      label={<Typography variant="body1">{capitalize(volType)}</Typography>}
                    />
                  ))}
                </FormGroup>
              )}
          </TableCell>
        </TableRow>
      </Table>
    </TableContainer>

  );

  // search
  const onSearch = (name: string) => dispatch(getVolunteersVolunteerProfile(fillOtherParams({ name })));
  const searchBar = <SearchBar setFilterFunction={onSearch} />;

  // sort
  const handleSortChange = (event: React.ChangeEvent<{ value: VolunteerSortFieldsType }>) => {
    dispatch(getVolunteersVolunteerProfile(fillOtherParams({ sort: event.target.value as VolunteerSortFieldsType })));
  };

  const sortMenu = (
    <FormControl fullWidth variant="outlined" size="small" margin="dense">
      <InputLabel>Sort By:</InputLabel>
      <Select
        value={volunteers.volunteerProfile.sort}
        onChange={handleSortChange}
      >
        {volunteerSortFields.map((field) => <MenuItem value={field.value}>{field.label}</MenuItem>)}

      </Select>
    </FormControl>
  );

  // change page
  const handleChangePage = (event, newPage: number) => {
    dispatch(getVolunteersVolunteerProfile(fillOtherParams({ pageNo: newPage })));
  };

  // display table
  const currentPageVolunteers = volunteers.volunteerProfile.ids.map((id) => volunteers.data[id]);

  const router = useRouter();
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
            {currentPageVolunteers.map((vol) => (
              <TableRow key={vol.email}>
                <TableCell onClick={() => router.push(`/profile/${vol._id}`)} className={classes.nameRow}><b>{vol.name}</b></TableCell>
                <TableCell>{capitalize(vol.volunteerType)}</TableCell>
                <TableCell>{vol.createdAt.toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[rowsPerPage]}
        component="div"
        count={volunteers.volunteerProfile.count}
        rowsPerPage={rowsPerPage}
        page={volunteers.volunteerProfile.pageNo}
        onChangePage={handleChangePage}
      />
    </>
  );

  return (
    <>
      <Head>
        <title>Volunteer Profiles</title>
      </Head>

      {!isMobile
        ? (
          <Grid>
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

export default VolunteerProfile;
