import { resetUser, UserState } from '@redux/reducers/user';
import { useAppSelector, useAppDispatch } from '@redux/store';
import { VolunteerData } from '@type/volunteer';
import { useRouter } from 'next/router';

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
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  if (!user) {
    dispatch(resetUser());
    router.push('/login');
  }
};
