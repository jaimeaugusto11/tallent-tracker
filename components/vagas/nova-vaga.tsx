"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormVagasStep01 from "./formVagasStep01";

const formSchema = z.object({
  nomeVaga: z.string().min(2, {
    message: "O nome da vaga deve ter pelo menos 2 caracteres.",
  }),
  departamento: z.string().min(2, {
    message: "O departamento deve ter pelo menos 2 caracteres.",
  }),
  quantidade: z.string(),
  codigoInterno: z.string(),
  tipovaga: z.string(),
  pais: z.string(),
  provincia: z.string(),
});

export default function NovaVagaForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeVaga: "",
      departamento: "",
      quantidade: "",
      codigoInterno: "",
      tipovaga: "",
      pais: "",
      provincia: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form Enviado:", data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-screen flex flex-col">
        {/* Abas + Conteúdo scrollável */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <Tabs defaultValue="inf" className="flex flex-col h-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger
                value="inf"
                className="data-[state=active]:bg-[#D1196F] data-[state=active]:text-white"
              >
                Informações da Vaga
              </TabsTrigger>
              <TabsTrigger
                value="interna"
                className="data-[state=active]:bg-[#D1196F] data-[state=active]:text-white"
              >
                Informações Internas
              </TabsTrigger>
              <TabsTrigger
                value="estrutura"
                className="data-[state=active]:bg-[#D1196F] data-[state=active]:text-white"
              >
                Estrutura do Processo Seletivo
              </TabsTrigger>
              <TabsTrigger
                value="divulgar"
                className="data-[state=active]:bg-[#D1196F] data-[state=active]:text-white"
              >
                Divulgação e Integrações
              </TabsTrigger>
            </TabsList>

            {/* Conteúdo com scroll interno */}
            <div className="flex-1 overflow-y-auto p-4">
              <TabsContent value="inf">
                <FormVagasStep01 />
              </TabsContent>

              <TabsContent value="interna" >
                <div>Conteúdo da aba Interna</div>
              </TabsContent>

              <TabsContent value="estrutura">
                <div>Conteúdo da aba Estrutura</div>
              </TabsContent>

              <TabsContent value="divulgar">
                <div>Conteúdo da aba Divulgação</div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Botão fixo no rodapé */}
        <div className="p-4 border-t bg-white sticky bottom-0 z-10">
          <div className="flex justify-end">
            <Button type="submit" className="bg-[#D1196F]">Salvar Vaga</Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
