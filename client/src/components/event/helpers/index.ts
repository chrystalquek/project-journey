import { SignUpData, SignUpStatus } from "@type/signUp";

export function getAcceptedSignUp(signUp: SignUpData | null): string | null {
  if (signUp?.status === SignUpStatus.ACCEPTED && signUp?.acceptedRole) {
    return signUp.acceptedRole;
  }
  return null;
}
