import { resetUser, UserState } from '@redux/reducers/user';
import { StoreState } from '@redux/store';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

export const isAdmin = (user: UserState) => (user.user?.volunteerType == 'admin');

export const checkLoggedIn = () => {
    const router = useRouter();
    const user = useSelector((state: StoreState) => state.user).user;
    const dispatch = useDispatch();

    if (!user) {
        dispatch(resetUser());
        router.push('/login');
    }
}
