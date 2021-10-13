import React from "react";
import { useSnackbar } from "notistack";
import Box from "@material-ui/core/Box";
import { useAppDispatch } from "@redux/store";
import { signUp } from "@redux/actions/session";
import { useRouter } from "next/router";
import { unwrapResult } from "@reduxjs/toolkit";
import { objectFilter } from "@utils/helpers/objectFilter";
import { VolunteerType } from "@type/volunteer";
import { uploadAndGetFileUrl } from "@utils/helpers/uploadAndGetFileUrl";
import SectionalForm from "./generator/SectionalForm";
import {
  formData as adhocFormFields,
  schema as adhocSchema,
} from "./questions/SignUpAdhocQuestionList";
import {
  formData as committedFormFields,
  schema as committedSchema,
} from "./questions/SignUpCommittedQuestionList";

type SignUpFormProps = {
  type: VolunteerType;
};

function SignUpForm({ type }: SignUpFormProps) {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (formValues: Record<string, any>) => {
    // @ts-ignore type exists
    const values = objectFilter(
      formValues,
      (element) => typeof element === "boolean" || element
    );

    // Upload and get cover image URL
    if (values.photoUrl && typeof values.photoUrl !== "string") {
      values.photoUrl = await uploadAndGetFileUrl(values.photoUrl, "image");
    }

    await dispatch(
      signUp({
        name: `${values.firstName} ${values.lastName}`,
        volunteerType: type,
        password: values.password,

        nickname: values.nickname,
        gender: values.gender,
        citizenship: values.citizenship,
        birthday: values.birthday.toISOString(),
        mobileNumber: values.mobileNumber,
        photoUrl: values.photoUrl,
        email: values.email,

        socialMediaPlatform: values.socialMediaPlatform,
        instagramHandle: values.instagramHandle,

        organization: values.organization,
        position: values.position,
        race: values.race,

        languages: values.languages
          ?.split(",")
          .map((element) => element.trimStart().trimEnd()), // Delete whitespaces
        referralSources: values.referralSources,

        hasVolunteered: values.hasVolunteered,
        biabVolunteeringDuration: values.biabVolunteeringDuration,

        hasVolunteeredExternally: values.hasVolunteeredExternally,
        volunteeringExperience: values.volunteeringExperience,

        hasChildrenExperience: values.hasChildrenExperience,
        childrenExperience: values.childrenExperience,

        sessionsPerMonth: values.sessionsPerMonth,
        sessionPreference: values.sessionPreference,

        hasFirstAidCertification: values.hasFirstAidCertification,
        leadershipInterest: values.leadershipInterest,
        interests: values.interests,

        skills: values.skills,

        personality: values.personality,
        strengths: values.strengths
          ?.split(",")
          .map((element) => element.trimStart().trimEnd()),
        volunteeringOpportunityInterest: values.volunteeringOpportunityInterest,

        volunteerReason: values.volunteerReason,
        volunteerContribution: values.volunteerContribution,
        hasCriminalRecord: values.hasCriminalRecord,

        // WCA Registration: Medical Information
        hasMedicalNeeds: values.hasMedicalNeeds,
        medicalNeeds: values.medicalNeeds,
        hasAllergies: values.hasAllergies,
        allergies: values.allergies,
        hasMedicationDuringDay: values.hasMedicalDuringDay,

        // WCA Registration: Emergency Contact
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        emergencyContactEmail: values.emergencyContactEmail,
        emergencyContactRelationship: values.emergencyContactRelationship,
      })
    )
      .then(unwrapResult)
      .then(() => {
        enqueueSnackbar("You have signed up successfully", {
          variant: "success",
        });
        router.push("/login");
      })
      .catch((err) => {
        enqueueSnackbar(`Error: ${err.message}`, {
          variant: "error",
        });
      });
  };

  const data =
    type === VolunteerType.ADHOC ? adhocFormFields : committedFormFields;
  const schema = type === VolunteerType.ADHOC ? adhocSchema : committedSchema;

  return (
    <Box textAlign="left">
      <SectionalForm
        sectionalFormFields={data}
        validationSchema={schema}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}

export default SignUpForm;
