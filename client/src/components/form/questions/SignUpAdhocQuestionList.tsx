import { Link } from "@material-ui/core";
import { SectionalFormFields } from "@type/form/form";
import { Citizenship, Gender } from "@type/volunteer";
import Typography from "@material-ui/core/Typography";
import * as yup from "yup";

export const formData: SectionalFormFields = [
  {
    header: "Personal Information",
    fields: [
      {
        name: "firstName",
        displayText: ["First Name *"],
        type: "shortAnswer",
        initialValue: "",
        isRequired: true,
      },
      {
        name: "lastName",
        displayText: ["Last Name (Family Name) *"],
        type: "shortAnswer",
        initialValue: "",
        isRequired: true,
      },
      {
        name: "email",
        displayText: ["Email *"],
        type: "shortAnswer",
        initialValue: "",
        isRequired: true,
      },
      {
        name: "password",
        displayText: ["Password *"],
        type: "password",
        initialValue: "",
        isRequired: true,
      },
      {
        name: "confirmPassword",
        displayText: ["Confirm password *"],
        type: "password",
        initialValue: "",
        isRequired: true,
      },
      {
        name: "nickname",
        displayText: [
          "Do you go by any aliases/nicknames? If so, please state below",
        ],
        type: "shortAnswer",
        initialValue: "",
        isRequired: false,
      },
      {
        name: "gender",
        displayText: ["Gender *"],
        type: "mcq",
        initialValue: "",
        options: [
          { value: Gender.MALE, label: "Male" },
          { value: Gender.FEMALE, label: "Female" },
        ],
        isRequired: true,
      },
      {
        name: "citizenship",
        displayText: ["Citizenship *"],
        type: "mcq",
        initialValue: "",
        options: [
          { value: Citizenship.SINGAPORE, label: "Singapore Citizen" },
          { value: Citizenship.PR, label: "Singapore Permanent Resident" },
          {
            value: Citizenship.FOREIGNER,
            label: "Foreigner requiring work pass to work in Singapore",
          },
        ],
        isRequired: true,
      },
      {
        name: "birthday",
        displayText: ["Date of Birth *"],
        type: "date",
        initialValue: new Date(),
        isRequired: true,
      },
      {
        name: "mobileNumber",
        displayText: ["Mobile Number *"],
        type: "shortAnswer",
        initialValue: "",
        isRequired: true,
      },
      {
        name: "photoUrl",
        displayText: ["Upload profile picture *"],
        type: "image",
        initialValue: null,
        isRequired: true,
      },
      {
        name: "instagramHandle",
        displayText: ["What is your instagram handle?"],
        type: "shortAnswer",
        initialValue: "",
        isRequired: false,
      },
      {
        name: "organization",
        displayText: ["School / company name"],
        type: "shortAnswer",
        initialValue: "",
        isRequired: false,
      },
      {
        name: "position",
        displayText: ["Year Level / Position"],
        type: "shortAnswer",
        initialValue: "",
        isRequired: false,
      },
      {
        name: "languages",
        displayText: [
          "What languages do you speak (please put your first language at the start of your response, separate each language with a comma)",
        ],
        type: "shortAnswer",
        initialValue: "",
        isRequired: false,
      },
      {
        name: "referralSources",
        displayText: ["How did you hear about us/Beyond Awesome? *"],
        type: "checkboxes",
        initialValue: [],

        // Need clarification for the value assigned
        options: [
          { value: "biab_website", label: "Blessings in a Bag Website" },
          { value: "biab_facebook", label: "Blessings in a Bag Facebook" },
          { value: "biab_instagram", label: "Blessings in a Bag Instagram" },
          { value: "beyond_website", label: "Beyond Awesome Website" },
          { value: "beyond_facebook", label: "Beyond Awesome Facebook Page" },
          { value: "beyond_instagram", label: "Beyond Awesome Instagram" },
          { value: "google_search", label: "Google Search" },
          { value: "friend", label: "Friend (Word of Mouth)" },
          { value: "newspaper", label: "Newspaper" },
          { value: "giving_sg", label: "Giving SG" },
          { value: "other", label: "Other" },
        ],
        isRequired: true,
      },
      {
        name: "hasVolunteered",
        displayText: [
          "Have you volunteered with us before? (eg ad-hoc volunteer or other event) *",
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
        name: "volunteerReason",
        displayText: [
          "Please tell us why you're interested in volunteering with our program *",
        ],
        type: "longAnswer",
        initialValue: "",
        isRequired: true,
      },
    ],
  },

  // Medical Information
  {
    header: "WCA Registration: Medical Information",
    info: "The information in this section is collected in the unlikely event of a medical emergency. This information will not be used for any other purposes.",
    fields: [
      {
        name: "hasMedicalNeeds",
        displayText: [
          "Do you have medical needs we should be aware of (e.g., heart conditions, asthma, seizures, diabetes, hearing or sight loss, etc.)?",
        ],
        type: "mcq",
        initialValue: "",
        options: [
          { value: true, label: "Yes" },
          { value: false, label: "No" },
        ],
        isRequired: false,
      },
      {
        name: "medicalNeeds",
        displayText: ["If yes, please explain"],
        type: "shortAnswer",
        initialValue: "",
        isRequired: false,
      },
      {
        name: "hasAllergies",
        displayText: [
          "Do you have any allergies (medications, foods, materials)?",
        ],
        type: "mcq",
        initialValue: "",
        options: [
          { value: true, label: "Yes" },
          { value: false, label: "No" },
        ],
        isRequired: false,
      },
      {
        name: "allergies",
        displayText: ["If yes, please explain"],
        type: "shortAnswer",
        initialValue: "",
        isRequired: false,
      },
      {
        name: "hasMedicalDuringDay",
        displayText: [
          "Do you take any medication during the day that we should be aware of?",
        ],
        type: "mcq",
        initialValue: "",
        options: [
          { value: true, label: "Yes" },
          { value: false, label: "No" },
        ],
        isRequired: false,
      },
    ],
  },

  // Emergency Contact Information
  {
    header: "WCA Registration: Emergency Contact Information",
    fields: [
      {
        name: "emergencyContactName",
        displayText: ["Emergency Contact Full Name *"],
        type: "shortAnswer",
        initialValue: "",
        isRequired: true,
      },
      {
        name: "emergencyContactNumber",
        displayText: ["Emergency Contact Mobile Number *"],
        type: "shortAnswer",
        initialValue: "",
        isRequired: true,
      },
      {
        name: "emergencyContactEmail",
        displayText: ["Emergency Contact Email Address *"],
        type: "shortAnswer",
        initialValue: "",
        isRequired: true,
      },
      {
        name: "emergencyContactRelationship",
        displayText: ["Emergency Contact Relationship *"],
        type: "shortAnswer",
        initialValue: "",
        isRequired: true,
      },
    ],
  },

  // Email Collection & Communication Permission
  {
    header:
      "WCA Registration: Permission for Email Collection and Communication",
    fields: [
      {
        name: "permissionEmailCollection",
        displayText: [
          "For purposes of communicating with our community about current and upcoming program opportunities and events, Beyond Awesome and Blessings in a Bag Limited may collect email addresses and email individuals ages 13 and above. This information will be used solely for program, event, and alumni engagement purposes by the program and will not be used for any commercial purpose or given to any third party. Individuals may opt out of these communications at any time.",

          "I have read all of the above information, and hereby acknowledge and accept the terms and conditions set forth herein. *",
        ],
        type: "mcq",
        initialValue: "",
        options: [
          { value: true, label: "Yes" },
          { value: false, label: "No" },
        ],
        isRequired: true,
      },
    ],
  },

  // Acknowledgement
  {
    header: "WCA Registration: Acknowledgements",
    fields: [
      {
        name: "personalInformationConsent",
        displayText: [
          "I give Beyond Awesome (A program by Blessings in a Bag Limited) to communicate my personal information to volunteer mentors in order to support my experience, development and journey with the program *",
        ],
        type: "mcq",
        initialValue: "",
        options: [{ value: true, label: "Yes" }],
        isRequired: true,
      },
      {
        name: "safetyProtection",
        displayText: [
          "Blessings In A Bag is committed to the safety and protection of its community. This Code of Conduct applies to all guests, volunteers and participants who represent the organisation and who interact with children or young people in both a direct and/or unsupervised capacity.",

          "The public and private conduct of volunteers acting on behalf of Blessings In A Bag can inspire and motivate those with whom they interact, or can cause great harm if inappropriate. We must, at all times, be aware of the responsibilities that accompany our work.",

          "I agree:",

          "(a) Not to take any photos or video documentation on my phone of students or volunteers participating in the program.  I am aware that I can, however, take photo and video documentation of myself and/or the surrounding environment such as the classroom space, interesting projects, etc.",

          "(b) To respect the guidance of the WCA Captain in the activity I am participating in and seek for assistance or clarification from the WCA Captain",

          "(c) To respect the value the rights, religious beliefs and practices of individuals. Refrain from actions and behaviours that constitute harassment or discrimination and strive to be sensitive to the feelings of others.",

          // A bit nasty, but it needs link here.
          <Typography>
            (d) To report any accidents or situations involving any member of
            the community (Student, WCA, etc) and to record this in our record
            book as soon as practically possible (Including incidents such as
            misbehaviour on the bus, during program, having a personal challenge
            that directly impacts the safety and well being of the community (eg
            a stalker), etc:
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSdaVJ4OTtXyuucvL4U59TifnIsXhQB6a93zmFhdmcjJIiIS-Q/viewform"
              color="secondary"
            >
              Click here
            </Link>
          </Typography>,
          "(e) To be responsible for familiarising myself with building/facility safety issues, such as, fire procedures, location of emergency exits, location of emergency telephones and first aid equipment.",

          "(f) To be committed to the dates I've scheduled myself for in the roster and will give notice at least 1 day before the scheduled date should I not be able to make it due to unforeseen circumstances. *",
        ],
        type: "mcq",
        initialValue: "",
        options: [{ value: true, label: "Yes" }],
        isRequired: true,
      },
      {
        name: "acknowledgeTnC",
        displayText: [
          "I have read all of the above information, and hereby acknowledge and accept the terms and conditions set forth herein *",
        ],
        type: "mcq",
        initialValue: "",
        options: [{ value: true, label: "Yes" }],
        isRequired: true,
      },
    ],
  },

  // Informed Consent and License Agreement
  {
    header: "WCA Registration: Informed Consent and License Agreement",
    fields: [
      {
        name: "informedConsent",
        displayText: [
          "PUBLISHING PERMISSION: This form grants Beyond Awesome (of Blessings in a Bag Limited) the right to edit and publish the above named individual's work (including writing, audio recordings, and any other products) in any manner in any type of publication or materials affiliated with Beyond Awesome (of Blessings in a Bag Limited), now existing or which may be created in the future. This is a non-exclusive agreement, meaning that the author can also publish their work in publications unaffiliated with Beyond Awesome (of Blessings in a Bag Limited), as well. Publication by another person or entity shall not have any effect on Beyond Awesome (of Blessings in a Bag Limited) rights under this agreement. The author warrants to Beyond Awesome (of Blessings in a Bag Limited) that to the extent the author's material contains any accounts of non-fictional individuals or events, that the information is substantially true, does not defame or slander or place in a false light any individual or group, and does not disclose private or personal facts regarding any third party without that third party's written consent. Beyond Awesome (of Blessings in a Bag Limited) also asks students to refrain from writing inappropriate language and about incidents that may hurt, degrade, or endanger others and the author agrees to advise Beyond Awesome (of Blessings in a Bag Limited) if its work is not in compliance with this request. We do retain the right to paraphrase or re-word passages during the editing process.",

          "FILM, PHOTOGRAPHY, AND AUDIO PERMISSION: During Beyond Awesome (of Blessings in a Bag Limited) programming, Beyond Awesome (of Blessings in a Bag Limited) may document the work of the individual through photography, film, video, audio, or other recording technique. Individuals agree that these images and recordings may thereafter appear in Beyond Awesome (of Blessings in a Bag Limited) publications, reports, film productions, websites, or social or online media platforms. This documentation is intended to display the hard work of the individuals and the type and effectiveness of the programming Beyond Awesome (of Blessings in a Bag Limited). No material will be used for commercial purposes but rather will be used for furthering the Beyond Awesome (of Blessings in a Bag Limited) goals of supporting and serving under-resourced students. Consent to such use, including any waiver of any right to publicity or privacy, is given.",

          "MEDIA PERMISSION: While individuals are engaged in programming at Beyond Awesome (of Blessings in a Bag Limited), they may appear in photographs, video or audio that Beyond Awesome (of Blessings in a Bag Limited) may wish to use on the radio, television, in press articles, or other media about Beyond Awesome (of Blessings in a Bag Limited). These materials help provide the public with information about programs at Beyond Awesome (of Blessings in a Bag Limited) and allow individuals the opportunity to have their work shared with a broader audience. Consent to such use, including any waiver of any right to publicity or privacy, is given.",

          "FEEDBACK PERMISSION: In order to gain information about the effectiveness of our programs and better address the needs of students, communities and the program in general, Beyond Awesome (of Blessings in a Bag Limited) may request access for feedback and survey completion by individuals, including (but not limited to): focus groups, online surveys, feedback forms, reflection sheets, etc.  At no point is participation in any of these required and no identifying information will be attached to any results that are collected or disseminated unless otherwise confirmed or agreed upon between the individual and the organisation. Findings will be shared for the purposes of demonstrating our programs and their impact to funders and partners. Furthermore, Beyond Awesome (of Blessings in a Bag Limited) reserves the right to communicate within leadership regarding individual achievement, development and well-being.",

          "Please note that although participation in Beyond Awesome (of Blessings in a Bag Limited) programs is voluntary, once this agreement is signed, it cannot be withdrawn and remains in effect even after the individual is no longer participating in any Beyond Awesome (of Blessings in a Bag Limited) programming.",

          "I have read and agree to each of the terms and conditions of this Informed Consent and License Agreement, and agree to waive any and all claims for monetary compensation from Beyond Awesome (of Blessings in a Bag Limited), acknowledging that Blessings in a Bag Limited is a purpose-driven entity focusing on youth development with a focus on under-resourced students and the community at large. *",
        ],
        type: "mcq",
        initialValue: "",
        options: [{ value: true, label: "Yes" }],
        isRequired: true,
      },
    ],
  },
];

const phoneRegex = /^(\+65)?[689]\d{7}$/;

export const schema = yup.object({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().required("Required").email("Invalid email"),
  password: yup
    .string()
    .required("Required")
    .min(8, "Password must be at least 8 characters!"),
  confirmPassword: yup.string().when("password", {
    is: (val: string) => val && val.length > 0,
    then: yup
      .string()
      .oneOf(
        [yup.ref("password")],
        "Confirm Password need to be the same as Password field"
      )
      .required("Required"),
  }),
  nickname: yup.string(),
  gender: yup
    .string()
    .required("Required")
    .oneOf(Object.values(Gender), "Invalid choice"),
  citizenship: yup
    .string()
    .required("Required")
    .oneOf(Object.values(Citizenship), "Invalid choice"),
  birthday: yup.date().required("Required"),
  mobileNumber: yup
    .string()
    .matches(phoneRegex, "Mobile phone is not valid")
    .required("Required"),
  photoUrl: yup.mixed().required("Required"),
  instagramHandle: yup.string(),
  organization: yup.string(),
  position: yup.string(),
  languages: yup.string(),
  referralSources: yup
    .array()
    .required("Required")
    .min(1, "Choose at least one option below"),
  hasVolunteered: yup.boolean().required("Required"),
  volunteerReason: yup.string().required("Required"),
  hasMedicalNeeds: yup.boolean(),
  medicalNeeds: yup.string().when("hasMedicalNeeds", {
    is: true,
    then: yup.string().required("Required"),
    otherwise: yup.string(),
  }),
  hasAllergies: yup.boolean(),
  allergies: yup.string().when("hasAllergies", {
    is: true,
    then: yup.string().required("Required"),
    otherwise: yup.string(),
  }),
  hasMedicalDuringDay: yup.boolean(),
  emergencyContactName: yup.string().required("Required"),
  emergencyContactNumber: yup
    .string()
    .matches(phoneRegex, "Mobile phone is not valid")
    .required("Required"),
  emergencyContactEmail: yup
    .string()
    .required("Required")
    .email("Invalid email"),
  emergencyContactRelationship: yup.string().required("Required"),
  biabVolunteeringDuration: yup
    .number()
    .integer("Input must be an integer")
    .positive("Input must be a positive integer"),
  sessionsPerMonth: yup
    .number()
    .integer("Input must be an integer")
    .positive("Input must be a positive integer"),
  permissionEmailCollection: yup.boolean().required("Required"),
  personalInformationConsent: yup
    .boolean()
    .required("Required")
    .oneOf([true], "You have to agree in order to proceed"),
  safetyProtection: yup
    .boolean()
    .required("Required")
    .oneOf([true], "You have to agree in order to proceed"),
  acknowledgeTnC: yup
    .boolean()
    .required("Required")
    .oneOf([true], "You have to agree to proceed"),
  informedConsent: yup
    .boolean()
    .required("Required")
    .oneOf([true], "You have to agree to proceed"),
});
