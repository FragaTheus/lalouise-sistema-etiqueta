import { InputProps } from "@/components/Input";
import textContent from "@/textContent/loginPageTextContent.json"

export const loginInputProps = [
  {
    type: "email" as const,
    name: "email",
    placeholder: textContent.form.email.placeholder,
  },
  {
    type: "password" as const,
    name: "password",
    placeholder: textContent.form.password.placeholder,
  },
] satisfies InputProps[];



