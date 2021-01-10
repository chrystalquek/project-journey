import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { questions as questionList } from './signup-questions/SignUpQuestionList';
import FormGenerator from './signup-questions/SignUpFormGenerator';
import { signUp, SignUpArgs } from '@redux/actions/user';

function SignUpForm() {
  const dispatch = useDispatch();
  const handleSignUp = useCallback(
    (values: SignUpArgs) => {
      dispatch(signUp(values));
    },
    [dispatch]
  );

  return <>{FormGenerator({ questionList, handleSignUp })}</>;
}

export default SignUpForm;
