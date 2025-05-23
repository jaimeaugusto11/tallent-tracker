import PageHeader from "@/components/PageHeader";
import { PieChart } from "lucide-react";

export default function ReportsPage() {
  return (
    <PageHeader>
      <PieChart className="h-6 w-6" />
      <h3 className="text-lg font-semibold">Reports</h3>
    </PageHeader>
  );
}
