export type ItemsProps = {
  itemHref: string;
  ItemIcon: React.ElementType;
  itemText: string;
};

export interface AppSideBarGroupItems {
  TriggerIcon: React.ElementType;
  triggerText: string;
  items: ItemsProps[];
}