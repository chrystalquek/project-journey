import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { questions as questionList } from './signup-questions/SignUpQuestionList';
import FormGenerator from './signup-questions/SignUpFormGenerator';

function SignUpForm() {
  const dispatch = useDispatch();
  const handleSignUp = useCallback((values: Record<string, any>) => {
    dispatch(values);
  }, [dispatch]);

  return <>{FormGenerator({ questionList, handleSignUp })}</>;
}

export default SignUpForm;
