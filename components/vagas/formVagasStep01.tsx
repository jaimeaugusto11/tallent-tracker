"use client";
import { marked } from "marked";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import RichTextEditor from "../blocks/rich-text-editor";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Cat,
  Dog,
  Fish,
  Rabbit,
  Sparkles,
  Turtle,
  Briefcase,
  Heart,
  ShieldCheck,
  Gift,
  PiggyBank,
} from "lucide-react";
import { MultiSelect } from "../multi-select";

export default function FormVagasStep01() {
  const form = useFormContext(); // pega o contexto do form global
  const [post, setPost] = useState("");
  const onChange = (content: string) => {
    setPost(content);
    console.log(content);
  };

  const [descricao, setDescricao] = useState("");
  const [salario, setSalario] = useState("");
  const [loading, setLoading] = useState(false);
  const nomeVaga = form.getValues("nomeVaga");
  const frameworksList = [
    { value: "react", label: "React", icon: Turtle },
    { value: "angular", label: "Angular", icon: Cat },
    { value: "vue", label: "Vue", icon: Dog },
    { value: "svelte", label: "Svelte", icon: Rabbit },
    { value: "ember", label: "Ember", icon: Fish },
  ];

  const beneficiosList = [
    { value: "plano_saude", label: "Plano de Saúde", icon: Heart },
    { value: "vale_refeicao", label: "Vale-Refeição", icon: Gift },
    { value: "vale_transporte", label: "Vale-Transporte", icon: Briefcase },
    { value: "seguro_vida", label: "Seguro de Vida", icon: ShieldCheck },
    { value: "bonus", label: "Bônus por Desempenho", icon: PiggyBank },
  ];

  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
    "react",
    "angular",
  ]);

  const [SelectedbeneficiosList, setSelectedbeneficiosList] = useState<
    string[]
  >([]);

  async function handleGenerateDescription() {
    setLoading(true);
    try {
      const nomeVaga = form.getValues("nomeVaga"); // pega o nome da vaga do form

      if (!nomeVaga) {
        setDescricao("Por favor, preencha o título da vaga antes.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:3333/api/call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: nomeVaga, // envia o título da vaga como prompt
        }),
      });

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }

      const data = await response.json();
      console.log("Resposta da API:", data);
      const texto = data.result?.parts?.[0]?.text || "Sem descrição";
      const htmlContent = await marked.parse(texto);
      // Atualiza o estado da descrição com a resposta da API
      setDescricao(htmlContent || "Sem descrição retornada");
    } catch (error) {
      console.error("Erro ao gerar descrição:", error);
      setDescricao("Erro ao gerar descrição");
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateSalario() {
    setLoading(true);
    try {
      const nomeVaga = form.getValues("nomeVaga"); // pega o nome da vaga do form

      if (!nomeVaga) {
        setDescricao("Por favor, preencha o título da vaga antes.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:3333/api/salario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: nomeVaga, // envia o título da vaga como prompt
        }),
      });

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }

      const data = await response.json();
      console.log("Resposta da API:", data);
      const texto = data.result?.parts?.[0]?.text || "Sem descrição";

      // Atualiza o estado da descrição com a resposta da API
      setSalario(texto || "Sem descrição retornada");
    } catch (error) {
      console.error("Erro ao gerar descrição:", error);
      setSalario("Erro ao gerar descrição");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" justify-between gap-3 h-full overflow-hidden py-2 p-2">
      <div className="p-2 space-y-10 w-full ">
        {/*Informaçõesda vaga */}
        <div className="flex flex-row justify-between">
          <div className="shadow-lg border w-full p-3 bg-white dark:bg-gray-800 dark:text-white">
            <h2 className="font-medium text-gray-400 text-lg dark:text-white">
              Informações da Vaga
            </h2>
            <div className="py-2 grid sm:grid-cols-2 sm:gap-6 gap-4">
              <FormField
                control={form.control}
                name="nomeVaga"
                render={({ field }) => (
                  <FormItem className="col-span-4 ">
                    <FormLabel className="text-gray-400 dark:text-white">
                      Título da Vaga
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da vaga" {...field} className="dark:text-white dark:bg-slate-700" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="departamento"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-gray-400">
                      Departamento da Vaga
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="dark:text-white dark:bg-slate-700" >
                          <SelectValue placeholder="Seleccionar Departamento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="dark:text-white dark:bg-slate-700">
                        <SelectItem value="m@example.com">
                          m@example.com
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          m@google.com
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          m@support.com
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="codigo"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-gray-400">
                      Código de controle interno
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <FormControl>
                          <Input placeholder="001" {...field}className="dark:text-white dark:bg-slate-700" />
                        </FormControl>
                      </FormControl>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div></div> <div></div>
              <FormField
                control={form.control}
                name="Quantidade"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-gray-400">
                      Quandidade de Posições
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <FormControl>
                          <Input placeholder="" {...field} type="number" className="dark:text-white dark:bg-slate-700"/>
                        </FormControl>
                      </FormControl>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="w-3/6 p-2 space-y-10 hidden lg:block ">
            <div className="p-5 bg-transparent">
              <h3 className="font-semibold dark:text-white">Boas Práticas:</h3>
              <p>
                Use os nomes mais comuns para as vagas que você for anunciar.
                Exemplo: use "Programador PHP Sênior" ao invés de "Programador
                Sênior"
              </p>
              <br />
              <h3 className="font-semibold">Código de Controle Interno:</h3>
              Esse é o número que torna essa vaga única dentro do sistema, como
              se fosse o CPF da vaga.
            </div>
          </div>
        </div>

        {/*local vaga */}
        <div className="flex flex-row justify-between">
          <div className="shadow-lg border w-full p-3 mt-10 bg-white ">
            <h2 className="font-medium text-gray-400 text-lg">Local da Vaga</h2>
            <div className="py-2 grid sm:grid-cols-2 sm:gap-6 gap-4">
              <FormField
                control={form.control}
                name="departamento"
                render={({ field }) => (
                  <FormItem className="">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">
                          m@example.com
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          m@google.com
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          m@support.com
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div></div>
              <FormField
                control={form.control}
                name="pais"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-gray-400">País</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da vaga" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="provincia"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-gray-400">Provincia</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <FormControl>
                          <Input placeholder="001" {...field} />
                        </FormControl>
                      </FormControl>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cidade"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-gray-400">Cidade</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <FormControl>
                          <Input placeholder="001" {...field} />
                        </FormControl>
                      </FormControl>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-3/6 p-2 space-y-10 hidden lg:block py-10">
            <div className="p-5 bg-transparent">
              <p>
                Insira o local de trabalho da vaga para que atraia candidatos
                preferencialmente na região. Caso a vaga seja 100% remota, faça
                a marcação de "A Vaga é Inteiramente Remota"
              </p>
              <br />
              <p>
                {" "}
                Nos casos em que a vaga é Híbrida (Presencial e Remoto), marque
                a opção "Híbrido". E, quando a vaga aceitar candidatos tanto
                presenciais quanto remotos, marque a opção "Presencial ou
                Remoto".
              </p>
            </div>
          </div>
        </div>

        {/*local vaga */}
        <div className="flex flex-row justify-between">
          <div className="shadow-lg border w-full p-3 mt-10 bg-white ">
            <h2 className="font-medium text-gray-400 text-lg">
              Anúncio da Vaga
            </h2>
            <div className="py-2 grid sm:grid-cols-2 sm:gap-6 gap-4">
              <FormField
                control={form.control}
                name="provincia"
                render={({ field }) => (
                  <FormItem className="col-span-4 ">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <FormControl>
                          <Button
                            type="button"
                            onClick={handleGenerateDescription}
                            disabled={loading}
                            className="p-5 text-sm bg-[#D1196F]"
                          >
                            <Sparkles />
                            {loading
                              ? "Gerando..."
                              : "Gerar Descrição da Vaga com IA"}
                          </Button>
                        </FormControl>
                      </FormControl>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="descricao" // campo do form para descrição (você pode criar se ainda não existir)
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel htmlFor="descricao" className="text-gray-400">
                      Descrição da Vaga
                    </FormLabel>
                    <FormControl>
                      <RichTextEditor
                        content={descricao}
                        onChange={setDescricao}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="provincia"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel className="text-gray-400">
                      Conhecimentos e Habilidades Necessários
                    </FormLabel>

                    <FormControl>
                      <MultiSelect
                        options={frameworksList}
                        onValueChange={setSelectedFrameworks}
                        defaultValue={selectedFrameworks}
                        placeholder="Habilidades"
                        variant="inverted"
                        animation={2}
                        maxCount={3}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="provincia"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel className="text-gray-400">Benefícios</FormLabel>

                    <FormControl>
                      <MultiSelect
                        options={beneficiosList}
                        onValueChange={setSelectedbeneficiosList}
                        defaultValue={SelectedbeneficiosList}
                        placeholder="Benefícios"
                        variant="inverted"
                        animation={2}
                        maxCount={3}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="departamento"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-gray-400">
                      Regime de Contratação
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar Departamento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">
                          m@example.com
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          m@google.com
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          m@support.com
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="codigo"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-gray-400">
                      Carga Horária Semanal
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <FormControl>
                          <Input placeholder="" {...field} type="number" />
                        </FormControl>
                      </FormControl>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="w-3/6 p-2 space-y-10 hidden lg:block py-10">
            <div className="p-5 bg-transparent">
              <h3 className="font-semibold">Boas Práticas:</h3>
              <p>
                -Não utilize emojis na descrição da vaga, pois o editor não os
                suporta.
              </p>{" "}
              <br />
              <p>-Insira ao menos 400 caracteres na descrição da vaga</p> <br />
              <p>
                -Use opções de formatação, como negrito, itálico e sublinhadom
                para tornar o texto mais fácil de ler
              </p>{" "}
              <br />
              <p>-Evite linguagem discriminatória</p> <br />
              <h3 className="font-semibold">Gerar Descrição da Vaga:</h3>
              <p>
                A Rê, nossa Inteligência Artificial, pode te ajudar a criar a
                descrição da sua vaga baseada no título que você escolheu.
                Atenção! Lembre-se sempre de conferir se a descrição gerada pela
                Rê faz sentido para sua vaga.
              </p>{" "}
              <br />
              <p>
                A Geração de Descrições de Vagas com IA estão em BETA. Portanto,
                pode ser que algumas descrições não saiam exatamente como
                esperado. Revise-as sempre antes de publicar.
              </p>{" "}
              <h3 className="font-semibold">Carga Horária:</h3>
              <p>
                Caso você não deseje divulgar a carga horária, ou não faça
                sentido exibir essa informação, escreva "0" (zero). Dessa forma,
                a carga horária não será exibida na página da vaga. Ideal para
                vagas PJ.
              </p>{" "}
              <br />
            </div>
          </div>
        </div>

        {/*local vaga */}
        <div className="flex flex-row justify-between">
          <div className="shadow-lg border p-3 w-full mt-10 bg-white mb-10  ">
            <h2 className="font-medium text-gray-400 text-lg">
              Salário da Vaga
            </h2>
            <div className="py-2 grid sm:grid-cols-2 sm:gap-6 gap-4">
              <FormField
                control={form.control}
                name="pais"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-gray-400">
                      Valor do salário
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da vaga" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="departamento"
                render={({ field }) => (
                  <FormItem className="">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormLabel className="text-gray-400">Periódo</FormLabel>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">
                          m@example.com
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          m@google.com
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          m@support.com
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="w-3/6 p-2  space-y-10 hidden lg:block py-10">
            <div className="p-5 bg-transparent">
              <p>
                {" "}
                <span className="font-semibold">Boas Práticas:</span>
                Use os nomes mais comuns para as vagas que você for anunciar.
                Exemplo: use "Programador PHP Sênior" ao invés de "Programador
                Sênior"
              </p>{" "}
              <br />
              <p>
                {" "}
                <span className="font-semibold">Regime de Contratação:</span>
                Carteira assinada ou outro tipo de contrato?
              </p>{" "}
              <br />
              <p>
                {" "}
                <span className="font-semibold">
                  Análise de Média Salarial:
                </span>
                A Tally (IA) analisa dados de mercado em relação à vaga proposta
                e a localização.
              </p>{" "}
              <br />
              <div>
                <Button
                  type="button"
                  onClick={handleGenerateSalario}
                  disabled={loading}
                  className="p-5 text-sm bg-[#D1196F]"
                >
                  <Sparkles />
                  {loading ? "Gerando..." : "Verificar Média Salarial da Vaga"}
                </Button>

                {salario && salario.length > 0 && (
                  <div className="py-2">
                    <h3>👉{salario}</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Coluna de ajuda */}
    </div>
  );
}
