import PageHeader from "@/components/PageHeader";
import { Users } from "lucide-react";

export default function TeamPage() {
  return (
    <PageHeader>
      <Users className="h-6 w-6" />
      <h3 className="text-lg font-semibold">Candidatos</h3>
    </PageHeader>
  );
}
