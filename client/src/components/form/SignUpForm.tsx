import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { signUp, SignUpArgs } from '@redux/actions/user';
import { VOLUNTEER_TYPE } from '@type/volunteer';
import { QuestionList, HeaderQuestionList } from '@type/questions';
import { SignUpResponse } from '@utils/api/response';
import SignUpFormGenerator from './SignUpFormGenerator';

type SignUpFormProps = {
  type: VOLUNTEER_TYPE;
  questionWithHeader: HeaderQuestionList;
}

function SignUpForm({ type, questionWithHeader } : SignUpFormProps) {
  const dispatch = useDispatch();
  const handleSignUp = useCallback(
    (values: SignUpArgs) => dispatch(signUp(values)),
    [dispatch],
  );

  // @ts-ignore types are too complicated
  return SignUpFormGenerator({ type, questionWithHeader, handleSignUp });
}

export default SignUpForm;
