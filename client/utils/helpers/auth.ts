import { resetUser, UserState } from '@redux/reducers/user';
import { StoreState } from '@redux/store';
import { VolunteerData } from '@type/volunteer';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

export const isAdmin = (user: UserState | VolunteerData) => {
  if ((user as VolunteerData)?.volunteerType === 'admin') {
    return true;
  }

  if ((user as UserState)?.user?.volunteerType === 'admin') {
    return true;
  }

  return false;
};

export const checkLoggedIn = () => {
  const router = useRouter();
  const { user } = useSelector((state: StoreState) => state.user);
  const dispatch = useDispatch();

  if (!user) {
    dispatch(resetUser());
    router.push('/login');
  }
};
