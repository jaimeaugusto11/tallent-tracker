import PageHeader from "@/components/PageHeader";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <PageHeader>
      <Settings className="h-6 w-6" />
      <h3 className="text-lg font-semibold">Settings</h3>
    </PageHeader>
  );
}
