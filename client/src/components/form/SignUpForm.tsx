import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import FormGenerator from './signup-questions/SignUpFormGenerator';
import { signUp, SignUpArgs } from '@redux/actions/user';
import { VOLUNTEER_TYPE } from '@type/volunteer';
import { QuestionList } from '@type/questions';
import { SignUpResponse } from '@utils/api/response';

type SignUpFormProps = {
  type: VOLUNTEER_TYPE;
  questionList: QuestionList;
}

function SignUpForm({ type, questionList } : SignUpFormProps) {
  const dispatch = useDispatch();
  const handleSignUp = useCallback(
    (values: SignUpArgs) => {
      return dispatch(signUp(values));
    },
    [dispatch]
  );
  
  // @ts-ignore types are too complicated
  return <>{FormGenerator({ type, questionList, handleSignUp })}</>;
}

export default SignUpForm;
