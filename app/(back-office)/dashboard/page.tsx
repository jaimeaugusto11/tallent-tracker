import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import PageHeader from "@/components/PageHeader";
import { SectionCards } from "@/components/section-cards";
import { LayoutGrid } from "lucide-react";

import data from "../../../data/data.json";
import { BarChar } from "@/components/blocks/graficos/bar";
import { Barh } from "@/components/blocks/graficos/barh";
import { Pizza } from "@/components/blocks/graficos/pizza";
import { Top5 } from "@/components/blocks/graficos/top-5";

export default function Home() {
  return (
    <div className="dark:bg-gray-800">
      <PageHeader>
        <LayoutGrid className="h-6 w-6" />
        <h3 className="text-lg font-semibold">Dashboard OverView</h3>
      </PageHeader>

      <div className="flex flex-1 flex-col h-screen">
        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6 ">
                <div className="w-full">
                  <ChartAreaInteractive />
                </div>

                <div className="flex flex-1 flex-row justify-between py-4">
                  <BarChar />
                  <Barh />
                  <Pizza />
                  <Top5/>
                  
                </div>
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
