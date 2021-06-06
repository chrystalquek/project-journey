import { useCallback } from 'react';
import { useAppDispatch } from '@redux/store';
import { signUp } from '@redux/actions/user';
import { VolunteerData, VolunteerType } from '@type/volunteer';
import SignUpFormGenerator from './SignUpFormGenerator';
import { HeaderQuestionList } from '@type/form/form';

type SignUpFormProps = {
  type: VolunteerType;
  questionWithHeader: HeaderQuestionList;
}

function SignUpForm({ type, questionWithHeader }: SignUpFormProps) {
  const dispatch = useAppDispatch();
  const handleSignUp = useCallback(
    (values: VolunteerData) => dispatch(signUp(values)),
    [dispatch],
  );

  // @ts-ignore types are too complicated
  return SignUpFormGenerator({ type, questionWithHeader, handleSignUp });
}

export default SignUpForm;
