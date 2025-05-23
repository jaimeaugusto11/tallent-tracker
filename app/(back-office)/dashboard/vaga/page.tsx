import PageHeader from "@/components/PageHeader";
import Vagas from "@/components/vagas";
import { BarChart3, Briefcase, BriefcaseBusiness } from "lucide-react";

export default function ActivityPage() {
  return (
    <main>
      <PageHeader>
        <BriefcaseBusiness className="h-6 w-6" />
        <h3 className="text-lg font-semibold">Vagas</h3>
      </PageHeader>

      <div className="p-10">
        <Vagas />
      </div>
    </main>
  );
}
