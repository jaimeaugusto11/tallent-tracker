import PageHeader from "@/components/PageHeader";
import { FolderClosed } from "lucide-react";

export default function ProjectsPage() {
  return (
    <PageHeader>
      <FolderClosed className="h-6 w-6" />
      <h3 className="text-lg font-semibold">Projects</h3>
    </PageHeader>
  );
}
