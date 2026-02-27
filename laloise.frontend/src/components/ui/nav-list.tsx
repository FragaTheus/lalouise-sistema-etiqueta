import Link from "next/link";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "./field";
import { Button } from "./button";

export default function NavList() {
  return (
    <ul>
      <FieldSet>
        <FieldLegend>Paginas</FieldLegend>
        <FieldGroup>
          <Field>
            <Button>Home</Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </ul>
  );
}
