import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IListItem {
  index: number;
  href: string;
  children: React.ReactNode;
  text: string;
}

export default function ListItem(i: IListItem) {
  const pathname = usePathname();
  const isActive = pathname === i.href;

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i.index * 0.1 }}
      className="w-full"
    >
      <Link href={i.href}>
        <div className="flex p-4 lg:p-2 rounded-md items-center gap-4 group transition-all hover:bg-primary/20 active:scale-95 duration-300">
          <div
            className={`w-5 text-gray-500 group-hover:text-primary group-hover:scale-110 duration-300
              ${isActive ? "scale-110 text-primary" : ""}`}
          >
            {i.children}
          </div>
          <small
            className={`text-gray-500 group-hover:text-primary font-semibold hidden md:block duration-300 active:scale-95
              ${isActive ? "text-primary" : ""}`}
          >
            {i.text}
          </small>
        </div>
      </Link>
    </motion.li>
  );
}
