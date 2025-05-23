import PageHeader from "@/components/PageHeader";
import { SquareCheck } from "lucide-react";

export default function TasksPage() {
  return (
    <PageHeader>
      <SquareCheck className="h-6 w-6" />
      <h3 className="text-lg font-semibold">Tasks</h3>
    </PageHeader>
  );
}
