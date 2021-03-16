import React from 'react'
import FormGenerator from './FormGenerator';
import { conversionFormQuestions } from './questions/CommittedConversionQuestionList';
import * as Yup from 'yup';

const CommittedConversionForm = ({handleSubmit}) => {
  const personalityRegex = /(I|E)(N|S)(F|T)(J|P)-(A|T)/;

  const conversionSchema = {
    address: Yup.string().required('Required'),
    race: Yup.mixed().required('Required'),
    biabVolunteeringDuration: Yup.string().required('Required'),
    hasVolunteeredExternally: Yup.boolean().required('Required'),
    volunteeringExperience: Yup.string().when('hasVolunteeredExternally', {
      is: true,
      then: Yup.string().required()
    }), // Dependent validation
    hasChildrenExperience: Yup.boolean().required('Required'),
    childrenExperience: Yup.string().when('hasChildrenExperience', {
      is: true,
      then: Yup.string().required()
    }), // Dependent validation
    sessionsPerMonth: Yup.number().required('Required'),
    sessionPreference: Yup.string().required('Required'),
    hasFirstAidCertification: Yup.boolean().required('Required'),
    leadershipInterest: Yup.string().required('Required'),
    interests: Yup.string().required('Required'),
    personality: Yup.string().matches(personalityRegex, 'Invalid value').required('Required'),
    strengths: Yup.string().required('Required'),
    volunteerContribution: Yup.string().required('Required'),
    hasCriminalRecord: Yup.boolean().required('Required'),
    isAwareOfGroupInvite: Yup.boolean().required('Required').oneOf([true], "Please acknowledge to proceed"), // Has to be true
    isAwareOfCommitmentExpectation: Yup.boolean().required('Required').oneOf([true], "Please acknowledge to proceed"), // Has to be true
    isAwareOfConfidentiality: Yup.boolean().required('Required').oneOf([true], "Please acknowledge to proceed"), // Has to be true
    isAwareOfBackgroundCheck: Yup.boolean().required('Required').oneOf([true], "Please acknowledge to proceed"), // Has to be true
  }

  return (
    <FormGenerator
      handleSubmit={handleSubmit}
      questionsList={conversionFormQuestions}
      validationObj={conversionSchema}
    />
  )
}

export default CommittedConversionForm;