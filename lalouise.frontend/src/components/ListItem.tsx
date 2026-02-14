import { motion } from "framer-motion";
import Link from "next/link";

interface IListItem {
  index: number;
  href: string;
  children: React.ReactNode;
  text: string;
}

export default function ListItem(i: IListItem) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i.index * 0.1 }}
      className="w-full"
    >
      <Link href={i.href}>
        <div className="flex p-2 rounded-md items-center gap-2 group transition-all hover:bg-primary/20 active:scale-95">
          <div className="w-6 h-6 text-gray-500 group-hover:text-primary group-hover:scale-110">
            {i.children}
          </div>
          <small className="text-gray-500 group-hover:text-primary font-semibold hidden md:block">
            {i.text}
          </small>
        </div>
      </Link>
    </motion.li>
  );
}
