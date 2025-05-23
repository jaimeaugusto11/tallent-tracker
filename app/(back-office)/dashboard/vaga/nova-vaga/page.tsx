import PageHeader from "@/components/PageHeader";
import NovaVagaForm from "@/components/vagas/nova-vaga";
import { BriefcaseBusiness, Plus } from "lucide-react";
import React from "react";

export default function NovaVaga() {
  return (
    <div className="h-screen flex flex-col overflow-hidden dark:bg-gray-700">
      <PageHeader>
        <Plus />
        <BriefcaseBusiness className="h-6 w-6" />
        <h3 className="text-lg font-semibold">Nova vaga</h3>
      </PageHeader>

      <div className="overflow-hidden ">

        <NovaVagaForm/>
      </div>
    </div>
  );
}
