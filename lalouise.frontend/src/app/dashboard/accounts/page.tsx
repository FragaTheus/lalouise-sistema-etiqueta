import Card from "@/components/Card";
import { accountsCards } from "@/constants/accountsCardsProps";
import DashPageLayout from "@/layout/DashPageLayout";

export default function Accounts() {
  return (
    <DashPageLayout>
      {accountsCards.map((dc, i) => (
        <Card
          key={i}
          index={i}
          Icon={dc.Icon}
          title={dc.title}
          description={dc.description}
          href={dc.href}
          children={dc.children}
        ></Card>
      ))}
    </DashPageLayout>
  );
}
