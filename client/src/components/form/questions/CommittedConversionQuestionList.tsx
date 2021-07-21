import { FormFields } from "@type/form/form";
import { Race } from "@type/volunteer";
import * as yup from "yup";

export const conversionFormQuestions: FormFields = [
  {
    name: "address",
    displayText: ["Home Address *"],
    type: "shortAnswer",
    initialValue: "",
    isRequired: true,
  },
  {
    name: "race",
    displayText: ["Race / Ethnicity"],
    type: "mcq",
    initialValue: "",
    options: [
      { value: Race.CHINESE, label: "Chinese" },
      { value: Race.MALAY, label: "Malay" },
      { value: Race.INDIAN, label: "Indian" },
      { value: Race.CAUCASIAN, label: "Caucasian" },
      { value: Race.OTHER, label: "Other" },
    ],
    isRequired: false,
  },
  {
    name: "biabVolunteeringDuration",
    displayText: ["How long have you been with us? *"],
    type: "mcq",
    initialValue: "",
    options: [
      { value: "1-3 months", label: "1-3 months" },
      { value: "4-7 months", label: "4-7 months" },
      { value: "8-11 months", label: "8-11 months" },
      { value: "12+ months", label: "12+ months" },
      { value: "2+ years", label: "2+ years" },
    ],
    isRequired: true,
  },
  {
    name: "hasVolunteeredExternally",
    displayText: ["Have you volunteered with other organizations before *"],
    type: "mcq",
    initialValue: "",
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
    isRequired: true,
  },
  {
    name: "volunteeringExperience",
    displayText: [
      "If you answered YES to above, please briefly explain with whom, and what sort of roles.",
    ],
    type: "shortAnswer",
    initialValue: "",
    isRequired: false,
  },
  {
    name: "hasChildrenExperience",
    displayText: ["Do you have any experience working with children? *"],
    type: "mcq",
    initialValue: "",
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
    isRequired: true,
  },
  {
    name: "childrenExperience",
    displayText: ["If you answered YES, please explain."],
    type: "shortAnswer",
    initialValue: "",
    isRequired: false,
  },
  {
    name: "sessionsPerMonth",
    displayText: [
      "How many sessions can you volunteer (realistically) per month? *",
    ],
    type: "number",
    initialValue: "",
    isRequired: true,
  },
  {
    name: "sessionPreference",
    displayText: [
      "We run weekly sessions, which sessions are you most able to commit to on a regular basis? *",
    ],
    type: "mcq",
    initialValue: "",
    options: [
      { value: "Thursday 6PM-10PM", label: "Thursday 6PM-10PM" },
      { value: "Saturday 2.30PM-6PM", label: "Saturday 2.30PM-6PM" },
      { value: "Either", label: "Either" },
    ],
    isRequired: true,
  },
  {
    name: "hasFirstAidCertification",
    displayText: ["Are you certified in FIRST AID? *"],
    type: "mcq",
    initialValue: "",
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
    isRequired: true,
  },
  {
    name: "leadershipInterest",
    displayText: [
      "Would you be interested in taking on a leadership role that would offer you leadership + personal development opportunities? *",
    ],
    type: "mcq",
    initialValue: "",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      {
        value: "maybe",
        label: "Perhaps in the future when I'm more confident",
      },
    ],
    isRequired: true,
  },
  {
    name: "interests",
    displayText: ["What are your interests/passions? *"],
    type: "shortAnswer",
    initialValue: "",
    isRequired: true,
  },
  {
    name: "skills",
    displayText: [
      "It takes a village to run our programs and we would love specialised support! Do you have any specialised skills? Or feel you can contribute? *",
    ],
    type: "checkboxes",
    initialValue: [],
    options: [
      { value: "P.R./Marketing", label: "P.R./Marketing" },
      {
        value: "Developing Corporate Partnerships",
        label: "Developing Corporate Partnerships",
      },
      {
        value: "Community Outreach - Helping bring more kids to the programme",
        label: "Community Outreach - Helping bring more kids to the programme",
      },
      {
        value: "Translating (for Community Engagement)",
        label: "Translating (for Community Engagement)",
      },
      {
        value: "Grant Writing/Fundraising",
        label: "Grant Writing/Fundraising",
      },
      {
        value: "Organizing our Headquarters (Donations etc)",
        label: "Organizing our Headquarters (Donations etc)",
      },
      { value: "Graphic Design", label: "Graphic Design" },
      { value: "Website", label: "Website" },
      { value: "Journalism", label: "Journalism" },
      { value: "Other", label: "Other" },
    ],
    isRequired: false,
  },
  {
    name: "personality",
    displayText: [
      "What is your personality type via www.16personalities.com? (For example: INTJ-A) *",
    ],
    type: "shortAnswer",
    initialValue: "",
    isRequired: true,
  },
  {
    name: "strengths",
    displayText: [
      "What are your 5 strengths on https://high5test.com (please list below, separated by comma) *",
    ],
    type: "shortAnswer",
    initialValue: "",
    isRequired: true,
  },
  {
    name: "volunteerContribution",
    displayText: [
      "Please tell us how you feel you can contribute or add to our program *",
    ],
    type: "longAnswer",
    initialValue: "",
    isRequired: true,
  },
  {
    name: "hasCriminalRecord",
    displayText: [
      "Have you ever been convicted of a crime, or have you ever been or are currently under investigation for neglect or impropriety in the fields of childcare or education? *",
    ],
    type: "mcq",
    initialValue: "",
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
    isRequired: true,
  },
  {
    name: "isAwareOfGroupInvite",
    displayText: [
      "I am aware that participating in this program means that I will be added to Whatsapp group(s) where I will receive communication and updates on program information/sessions/change of venue, etc. *",
    ],
    type: "mcq",
    initialValue: "",
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
    isRequired: true,
  },
  {
    name: "isAwareOfCommitmentExpectation",
    displayText: [
      "I acknowledge that I am fully aware that the MINIMUM commitment expectation to volunteer with the Beyond Awesome program (under Blessings in a Bag Limited) is 3 months, serving 3 times a month (9 sessions all together) and that I am more than welcome to commit to more than the minimum requirement. *",
    ],
    type: "mcq",
    initialValue: "",
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
    isRequired: true,
  },
  {
    name: "isAwareOfConfidentiality",
    displayText: [
      "If ever I am privy to private and confidential material or documentation related to Beyond Awesome stakeholders (under Blessings in a Bag Limited), I will not release information or share details outside of the organisation. *",
    ],
    type: "mcq",
    initialValue: "",
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
    isRequired: true,
  },
  {
    name: "isAwareOfBackgroundCheck",
    displayText: [
      "I give Beyond Awesome (under Blessings in a Bag Limited) permission to conduct a background check with the relevant authorities and understand that they will notify me before conducting this process. *",
    ],
    type: "mcq",
    initialValue: "",
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
    isRequired: true,
  },
];

const personalityRegex = /(I|E)(N|S)(F|T)(J|P)-(A|T)/;

export const conversionSchema = yup.object({
  address: yup.string().required("Required"),
  race: yup.string().optional().oneOf(Object.values(Race), "Invalid choice"),
  biabVolunteeringDuration: yup.string().required("Required"),
  hasVolunteeredExternally: yup.boolean().required("Required"),
  volunteeringExperience: yup.string().when("hasVolunteeredExternally", {
    is: true,
    then: yup.string().required("Required"),
  }), // Dependent validation
  hasChildrenExperience: yup.boolean().required("Required"),
  childrenExperience: yup.string().when("hasChildrenExperience", {
    is: true,
    then: yup.string().required("Required"),
  }), // Dependent validation
  sessionsPerMonth: yup
    .number()
    .integer("Input must be an integer")
    .required("Required")
    .min(1, "You have to be able to commit at least one session."),
  sessionPreference: yup.string().required("Required"),
  hasFirstAidCertification: yup.boolean().required("Required"),
  leadershipInterest: yup.string().required("Required"),
  interests: yup.string().required("Required"),
  personality: yup
    .string()
    .matches(personalityRegex, "Invalid value")
    .required("Required"),
  strengths: yup.string().required("Required"),
  volunteerContribution: yup.string().required("Required"),
  hasCriminalRecord: yup.boolean().required("Required"),
  isAwareOfGroupInvite: yup
    .boolean()
    .required("Required")
    .oneOf([true], "Please acknowledge to proceed"), // Has to be true
  isAwareOfCommitmentExpectation: yup
    .boolean()
    .required("Required")
    .oneOf([true], "Please acknowledge to proceed"), // Has to be true
  isAwareOfConfidentiality: yup
    .boolean()
    .required("Required")
    .oneOf([true], "Please acknowledge to proceed"), // Has to be true
  isAwareOfBackgroundCheck: yup
    .boolean()
    .required("Required")
    .oneOf([true], "Please acknowledge to proceed"), // Has to be true
});
