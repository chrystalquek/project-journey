import React from 'react'
import FormGenerator from './FormGenerator';
import { conversionFormQuestions } from './questions/CommittedConversionQuestionList';
import * as Yup from 'yup';

const CommittedConversionForm = () => {

  const handleSubmit = async (formValues: Record<string, any>) => {
    // dispatch(createCommitmentApplication());
    console.log(formValues);
  }

  const conversionSchema = {
    homeAddress: Yup.string().required('Required'),
    // how to validate enums?
    biabVolunteeringDuration: Yup.string().required('Required'),
    hasVolunteeredExternally: Yup.boolean().required('Required'),
    volunteeringExperience: Yup.string().when('hasVolunteeredExternally', {
      is: true,
      then: Yup.string().required()
    }), // Dependent validation
    hasChildrenExperience: Yup.string().required('Required'),
    childrenExperience: Yup.string().when('hasChildrenExperience', {
      is: true,
      then: Yup.string().required()
    }), // Dependent validation
    sessionsPerMonth: Yup.number().required('Required'),
    sessionPreference: Yup.string().required('Required'),
    hasFirstAidCertification: Yup.boolean().required('Required'),
    leadershipInterest: Yup.string().required('Required'),
    interests: Yup.string().required('Required'),
    personality: Yup.string().required('Required'),
    strengths: Yup.string().required('Required'),
    volunteerContribution: Yup.string().required('Required'),
    crimeAcknowledgement: Yup.boolean().required('Required'),
    addedToGroupAcknowledgement: Yup.boolean().test('ack-group', '', value => value).required(), // Has to be true
    commitmentExpectation: Yup.boolean().test('ack-commitment', '', value => value).required(), // Has to be true
    confidentiality: Yup.boolean().test('ack-confidentiality', '', value => value).required(), // Has to be true
    backgroundCheck: Yup.boolean().test('ack-backgroundCheck', '', value => value).required(), // Has to be true
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