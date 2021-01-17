import { QuestionList } from '@type/questions';
import { CITIZENSHIP, GENDER, RACE } from '@type/volunteer';

export const questions: QuestionList = [
  {
    name: 'firstName',
    displayText: ['First Name'],
    type: 'shortAnswer',
    initialValue: '',
    isRequired: true,
  },
  {
    name: 'lastName',
    displayText: ['Last Name (Family Name)'],
    type: 'shortAnswer',
    initialValue: '',
    isRequired: true,
  },
  {
    name: 'email',
    displayText: ['Email'],
    type: 'shortAnswer',
    initialValue: '',
    isRequired: true,
  },
  {
    name: 'password',
    displayText: ['Password'],
    type: 'password',
    initialValue: '',
    isRequired: true,
  },
  {
    name: 'confirmPassword',
    displayText: ['Confirm password'],
    type: 'password',
    initialValue: '',
    isRequired: true,
  },
  {
    name: 'nickname',
    displayText: [
      'Do you go by any aliases/nicknames? If so, please state below',
    ],
    type: 'shortAnswer',
    initialValue: '',
    isRequired: false,
  },
  {
    name: 'gender',
    displayText: ['Gender'],
    type: 'mcq',
    initialValue: GENDER.MALE,
    options: [
      { value: GENDER.MALE, label: 'Male' },
      { value: GENDER.FEMALE, label: 'Female' },
    ],
    isRequired: true,
  },
  {
    name: 'citizenship',
    displayText: ['Citizenship'],
    type: 'mcq',
    initialValue: 'singapore',
    options: [
      { value: CITIZENSHIP.SINGAPORE, label: 'Singapore Citizen' },
      { value: CITIZENSHIP.PR, label: 'Singapore Permanent Resident' },
      {
        value: CITIZENSHIP.FOREIGNER,
        label: 'Foreigner requiring work pass to work in Singapore',
      },
    ],
    isRequired: true,
  },
  {
    name: 'birthday',
    displayText: ['Date of Birth'],
    type: 'date',
    initialValue: new Date(),
    isRequired: true,
  },
  {
    name: 'mobileNumber',
    displayText: ['Mobile Number'],
    type: 'shortAnswer',
    initialValue: '',
    isRequired: true,
  },
  {
    name: 'photoUrl',
    displayText: ['Upload profile picture'],
    type: 'photo',
    initialValue: null,
    isRequired: false,
  },
  {
    name: 'instagramHandle',
    displayText: ['What is your instagram handle?'],
    type: 'shortAnswer',
    initialValue: '',
    isRequired: false,
  },
  {
    name: 'organization',
    displayText: ['School / company name'],
    type: 'shortAnswer',
    initialValue: '',
    isRequired: false,
  },
  {
    name: 'position',
    displayText: ['Year Level / Position'],
    type: 'shortAnswer',
    initialValue: '',
    isRequired: true,
  },
  {
    name: 'languages',
    displayText: [
      'What languages do you speak (please put your first language at the start of your response, separate each language with a comma)',
    ],
    type: 'shortAnswer',
    initialValue: '',
    isRequired: false,
  },
  {
    name: 'referralSources',
    displayText: ['How did you hear about us/Beyond Awesome?'],
    type: 'checkboxes',
    initialValue: [],
    
    // Need clarification for the value assigned
    options: [
      { value: 'biab_website', label: 'Blessings in a Bag Website' },
      { value: 'biab_facebook', label: 'Blessings in a Bag Facebook' },
      { value: 'biab_instagram', label: 'Blessings in a Bag Instagram' },
      { value: 'beyond_website', label: 'Beyond Awesome Website' },
      { value: 'beyond_facebook', label: 'Beyond Awesome Facebook Page' },
      { value: 'beyond_instagram', label: 'Beyond Awesome Instagram' },
      { value: 'google_search', label: 'Google Search' },
      { value: 'friend', label: 'Friend (Word of Mouth)' },
      { value: 'newspaper', label: 'Newspaper' },
      { value: 'giving_sg', label: 'Giving SG' },
      { value: 'other', label: 'Other' },
    ],
    isRequired: true,
  },
  {
    name: 'hasVolunteered',
    displayText: [
      'Have you volunteered with us before? (eg ad-hoc volunteer or other event)',
    ],
    type: 'mcq',
    initialValue: true,
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' },
    ],
    isRequired: true,
  },
  {
    name: 'volunteerReason',
    displayText: [
      "Please tell us why you're interested in volunteering with our program",
    ],
    type: 'longAnswer',
    initialValue: '',
    isRequired: true,
  },

  // Medical Information
  {
    name: 'hasMedicalNeeds',
    displayText: [
      'Do you have medical needs we should be aware of (e.g., heart conditions, asthma, seizures, diabetes, hearing or sight loss, etc.)?',
    ],
    type: 'mcq',
    initialValue: false,
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' },
    ],
    isRequired: false,
  },
  {
    name: 'medicalNeeds',
    displayText: ['If yes, please explain'],
    type: 'shortAnswer',
    initialValue: '',
    isRequired: false,
  },
  {
    name: 'hasAllergies',
    displayText: ['Do you have any allergies (medications, foods, materials)?'],
    type: 'mcq',
    initialValue: false,
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' },
    ],
    isRequired: false,
  },
  {
    name: 'allergies',
    displayText: ['If yes, please explain'],
    type: 'shortAnswer',
    initialValue: '',
    isRequired: false,
  },
  {
    name: 'hasMedicalDuringDay',
    displayText: [
      'Do you take any medication during the day that we should be aware of?',
    ],
    type: 'mcq',
    initialValue: false,
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' },
    ],
    isRequired: false,
  },

  // Emergency Contact Information
  {
    name: 'emergencyContactName',
    displayText: ['Emergency Contact Full Name #1'],
    type: 'shortAnswer',
    initialValue: '',
    isRequired: true,
  },
  {
    name: 'emergencyContactNumber',
    displayText: ['Emergency Contact Mobile Number #1'],
    type: 'shortAnswer',
    initialValue: '',
    isRequired: true,
  },
  {
    name: 'emergencyContactEmail',
    displayText: ['Emergency Contact Email Address #1'],
    type: 'shortAnswer',
    initialValue: '',
    isRequired: true,
  },
  {
    name: 'emergencyContactRelationship',
    displayText: ['Emergency Contact Relationship'],
    type: 'shortAnswer',
    initialValue: '',
    isRequired: true,
  },
  {
    name: 'emergencyContactOther',
    displayText: ['If Other, please specify'],
    type: 'shortAnswer',
    initialValue: '',
    isRequired: false,
  },

  // Permission for Email Collection and Communication
  {
    name: 'permissionEmailCollection',
    displayText: [
      'I have read all of the above information, and hereby acknowledge and accept the terms and conditions set forth herein.',
    ],
    type: 'mcq',
    initialValue: false,
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' },
    ],
    isRequired: true,
  },

  // Acknowledgements
  {
    name: 'personalInformationConsent',
    displayText: [
      'I give Beyond Awesome (A program by Blessings in a Bag Limited) to communicate my personal information to volunteer mentors in order to support my experience, development and journey with the program',
    ],
    type: 'mcq',
    initialValue: false,
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' },
    ],
    isRequired: true,
  },
  {
    name: 'acknowledgeTnC',
    displayText: [
      'I have read all of the above information, and hereby acknowledge and accept the terms and conditions set forth herein',
    ],
    type: 'mcq',
    initialValue: false,
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' },
    ],
    isRequired: true,
  },

  // Informed Consent and License Agreement
  {
    name: 'informedConsent',
    displayText: [
      "\"PUBLISHING PERMISSION: This form grants Beyond Awesome (of Blessings in a Bag Limited) the right to edit and publish the above named individual's work (including writing, audio recordings, and any other products) in any manner in any type of publication or materials affiliated with Beyond Awesome (of Blessings in a Bag Limited), now existing or which may be created in the future. This is a non-exclusive agreement, meaning that the author can also publish their work in publications unaffiliated with Beyond Awesome (of Blessings in a Bag Limited), as well. Publication by another person or entity shall not have any effect on Beyond Awesome (of Blessings in a Bag Limited) rights under this agreement. The author warrants to Beyond Awesome (of Blessings in a Bag Limited) that to the extent the author's material contains any accounts of non-fictional individuals or events, that the information is substantially true, does not defame or slander or place in a false light any individual or group, and does not disclose private or personal facts regarding any third party without that third party's written consent. Beyond Awesome (of Blessings in a Bag Limited) also asks students to refrain from writing inappropriate language and about incidents that may hurt, degrade, or endanger others and the author agrees to advise Beyond Awesome (of Blessings in a Bag Limited) if its work is not in compliance with this request. We do retain the right to paraphrase or re-word passages during the editing process.",

      'FILM, PHOTOGRAPHY, AND AUDIO PERMISSION: During Beyond Awesome (of Blessings in a Bag Limited) programming, Beyond Awesome (of Blessings in a Bag Limited) may document the work of the individual through photography, film, video, audio, or other recording technique. Individuals agree that these images and recordings may thereafter appear in Beyond Awesome (of Blessings in a Bag Limited) publications, reports, film productions, websites, or social or online media platforms. This documentation is intended to display the hard work of the individuals and the type and effectiveness of the programming Beyond Awesome (of Blessings in a Bag Limited). No material will be used for commercial purposes but rather will be used for furthering the Beyond Awesome (of Blessings in a Bag Limited) goals of supporting and serving under-resourced students. Consent to such use, including any waiver of any right to publicity or privacy, is given.',

      'MEDIA PERMISSION: While individuals are engaged in programming at Beyond Awesome (of Blessings in a Bag Limited), they may appear in photographs, video or audio that Beyond Awesome (of Blessings in a Bag Limited) may wish to use on the radio, television, in press articles, or other media about Beyond Awesome (of Blessings in a Bag Limited). These materials help provide the public with information about programs at Beyond Awesome (of Blessings in a Bag Limited) and allow individuals the opportunity to have their work shared with a broader audience. Consent to such use, including any waiver of any right to publicity or privacy, is given.',

      'FEEDBACK PERMISSION: In order to gain information about the effectiveness of our programs and better address the needs of students, communities and the program in general, Beyond Awesome (of Blessings in a Bag Limited) may request access for feedback and survey completion by individuals, including (but not limited to): focus groups, online surveys, feedback forms, reflection sheets, etc.  At no point is participation in any of these required and no identifying information will be attached to any results that are collected or disseminated unless otherwise confirmed or agreed upon between the individual and the organisation. Findings will be shared for the purposes of demonstrating our programs and their impact to funders and partners. Furthermore, Beyond Awesome (of Blessings in a Bag Limited) reserves the right to communicate within leadership regarding individual achievement, development and well-being.',

      'Please note that although participation in Beyond Awesome (of Blessings in a Bag Limited) programs is voluntary, once this agreement is signed, it cannot be withdrawn and remains in effect even after the individual is no longer participating in any Beyond Awesome (of Blessings in a Bag Limited) programming. "',
    ],
    type: 'mcq',
    initialValue: false,
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' },
    ],
    isRequired: true,
  },
];
