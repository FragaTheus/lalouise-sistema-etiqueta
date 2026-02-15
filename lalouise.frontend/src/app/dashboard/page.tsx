"use client";

import {
  AccountContent,
  ProductContent,
  SectorContent,
  TagContent,
} from "@/components/AccountChildrenDashCard";
import { motion } from "framer-motion";

interface ICard {
  index: number;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

function Card(i: ICard) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i.index * 0.3 }}
      className="bg-primary/5 shadow-2xs rounded-sm p-2 w-full h-full relative active:scale-95 transition-all flex-1 max-w-lg"
    >
      <div className="">{i.children}</div>
      <div className="h-1/3 absolute w-full left-0 bottom-0 rounded-b-sm bg-surface p-2 overflow-hidden">
        <p className="font-bold">{i.title}</p>
        <small className="text-gray-500/70 font-semibold">{i.subtitle}</small>
      </div>
    </motion.div>
  );
}

const titles = [
  { t: "Contas", s: "Gestão de Usuários", content: <AccountContent /> },
  { t: "Setores", s: "Gerencie setores", content: <SectorContent /> },
  { t: "Produtos", s: "Gerencie produtos", content: <ProductContent /> },
  { t: "Etiquetas", s: "Gerencie etiquetas", content: <TagContent /> },
];

export default function Dashboard() {
  return (
    <div className="h-full w-full p-4 flex flex-col">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-10 py-4"
      >
        <h2>Ola Thais.</h2>
        <h2>O que fermos hoje?</h2>
      </motion.div>
      <div className="grid grid-cols-2 items-center justify-items-center gap-2 flex-1">
        {titles.map((c, i) => (
          <Card key={i} index={i} title={c.t} subtitle={c.s}>
            {c.content}
          </Card>
        ))}
      </div>
    </div>
  );
}
