import { LoginFormData } from "@/features/auth/constants/schemas/loginSchema";
import textContent from "@/features/auth/constants/loginTextContent.json";
import { FormFieldConfig } from "@/shared/components/app-form/app-form-types";

export const loginDefaultValues = textContent.login.form.defaultValues;

export const loginFields: FormFieldConfig<LoginFormData>[] = textContent.login
  .form.fields as FormFieldConfig<LoginFormData>[];

export const loginBtnText = textContent.login.form.btnText;
