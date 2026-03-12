export interface AppImageCardProps {
  title?: string;
  description: string;
  children: React.ReactNode;
  imgSrc: string;
  help?: string;
  separator?: string;
}