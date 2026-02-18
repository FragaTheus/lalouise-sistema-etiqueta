import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";

export type InfoField = {
  label: string;
  value: React.ReactNode;
};

type InfoViewProps = {
  title: string;
  description: string;
  fields?: InfoField[];
  onEdit?: () => void;
  onDelete?: () => void;
  actions?: React.ReactNode;
};

export default function InfoView({
  title,
  description,
  fields = [],
  onEdit,
  onDelete,
  actions,
}: InfoViewProps) {
  return (
    <section className="bg-surface rounded-lg flex-1 p-4 lg:p-12 flex flex-col gap-2">
      <div className="">
        <header>
          <h2 className="text-primary">{title}</h2>
        </header>

        <div>
          <small className="text-gray-500 font-semibold">{description}</small>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <dl className="flex flex-col items-start justify-evenly flex-1">
          {fields.map((f, i) => (
            <div key={i}>
              <dt className="text-small font-semibold text-gray-600">
                {f.label}
              </dt>
              <dd className="text-p">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="flex items-center justify-between">
        {actions}

        {onEdit && (
          <button
            type="button"
            className="p-2 bg-primary rounded-sm text-white flex items-center hover:scale-101 active:scale-99 transition-all gap-2"
            onClick={onEdit}
          >
            <PencilIcon className="w-5 h-5" /> Editar
          </button>
        )}

        {onDelete && (
          <button
            type="button"
            className="p-2 bg-secondary-light rounded-sm text-white flex items-center hover:scale-101 active:scale-99 transition-all gap-2"
            onClick={onDelete}
          >
            <TrashIcon className="w-5 h-5" />
            Excluir
          </button>
        )}
      </div>
    </section>
  );
}
