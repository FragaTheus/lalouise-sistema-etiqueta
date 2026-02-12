"use client";

import { Input, InputProps } from "./Input";

type FormProps = {
  fields: InputProps[];
  buttonText: string;
  //onSubmitAction: (data: any) => Promise<any>;
  //onSuccess?: (result: any) => void;
};

export default function Form({
  fields,
  buttonText,
  //onSubmitAction,
  //onSuccess,
}: FormProps) {
  return (
    <form className="rounded-md mb-20">
      {fields.map((f, i) => (
        <Input key={i} {...f} />
      ))}

      <button
        type="submit"
        className="w-1/2 mt-1 bg-primary text-white font-bold p-2 rounded-sm 
                   hover:scale-[1.02] transition-all active:scale-[0.98] 
                   disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {buttonText}
      </button>
    </form>
  );
}
