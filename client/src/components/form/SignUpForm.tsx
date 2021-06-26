import { useCallback } from "react";
import { useAppDispatch } from "@redux/store";
import { signUp } from "@redux/actions/user";
import { VolunteerType } from "@type/volunteer";
import { HeaderQuestionList } from "@type/form/form";
import { CreateVolunteerRequest } from "@api/request";
import SignUpFormGenerator from "./SignUpFormGenerator";

type SignUpFormProps = {
  type: VolunteerType;
  questionWithHeader: HeaderQuestionList;
};

function SignUpForm({ type, questionWithHeader }: SignUpFormProps) {
  const dispatch = useAppDispatch();
  const handleSignUp = useCallback(
    (values: CreateVolunteerRequest) => dispatch(signUp(values)),
    [dispatch]
  );

  // @ts-ignore types are too complicated
  return SignUpFormGenerator({ type, questionWithHeader, handleSignUp });
}

export default SignUpForm;
