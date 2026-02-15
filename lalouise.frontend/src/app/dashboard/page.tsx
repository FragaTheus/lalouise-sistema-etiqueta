"use client";

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
      className="bg-primary/10 shadow-2xs rounded-sm p-4 w-full h-full relative"
    >
      <div className="">{i.children}</div>
      <div className="h-1/3 absolute w-full left-0 bottom-0 rounded-b-sm bg-surface p-2">
        <p className="font-bold">{i.title}</p>
        <small className="text-gray-500/70 font-semibold">{i.subtitle}</small>
      </div>
    </motion.div>
  );
}

const titles = [
  { t: "Contas", s: "Gerencie seus funcinarios" },
  { t: "Setores", s: "Gerencie seus setores" },
  { t: "Produtos", s: "Gerencie seus produtos" },
  { t: "Etiquetas", s: "Gerencie suas etiquetas" },
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
            Children
          </Card>
        ))}
      </div>
    </div>
  );
}
