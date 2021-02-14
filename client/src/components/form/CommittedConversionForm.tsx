import React from 'react'
import FormGenerator from './FormGenerator';
import { conversionFormQuestions } from './questions/CommittedConversionQuestionList';


const CommittedConversionForm = () => {

  const handleSubmit = () => {
    // dispatch(createCommitmentApplication());
  }

  return (
    <FormGenerator
      handleSubmit={handleSubmit}
      questionsList={conversionFormQuestions}
    />
  )
}

export default CommittedConversionForm;