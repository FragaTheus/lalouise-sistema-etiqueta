import { FormFieldConfig } from "@/components/app-form";
import { LoginFormData } from "@/constants/loginSchema";
import textContent from "@/constants/loginTextContent.json";

export const loginDefaultValues = textContent.login.form.defaultValues;

export const loginFields: FormFieldConfig<LoginFormData>[] = textContent.login
  .form.fields as FormFieldConfig<LoginFormData>[];

export const loginBtnText = textContent.login.form.btnText;
