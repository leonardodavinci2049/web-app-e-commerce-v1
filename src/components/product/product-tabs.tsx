"use client";

import { useState } from "react";

interface ProductTabsProps {
  brand?: string;
  category: string;
}

type TabType = "description" | "specifications" | "delivery";

/**
 * Product Tabs Component (Client-side)
 * Displays product information in tabbed interface
 */
export function ProductTabs({
  brand = "Profissional",
  category,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("description");

  const tabs = [
    { id: "description" as TabType, label: "Descrição do Produto" },
    { id: "specifications" as TabType, label: "Especificações" },
    { id: "delivery" as TabType, label: "Entrega" },
  ];

  return (
    <div className="mt-8 space-y-4">
      {/* Tab Navigation */}
      <div className="border-b">
        <div className="flex gap-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="rounded-lg border bg-card p-6">
        {activeTab === "description" && (
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <h3 className="text-lg font-semibold">Sobre o Produto</h3>
            <p className="text-muted-foreground">
              Este produto de alta qualidade foi desenvolvido para atender às
              necessidades profissionais e domésticas. Fabricado com materiais
              duráveis e tecnologia de ponta, garante eficiência e longevidade.
            </p>

            <h4 className="mt-4 font-semibold">Características Principais:</h4>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              <li>Design ergonômico para maior conforto durante o uso</li>
              <li>Construção robusta com materiais de alta qualidade</li>
              <li>Fácil manuseio e operação intuitiva</li>
              <li>Ideal para uso profissional e doméstico</li>
              <li>Garantia de fábrica incluída</li>
            </ul>

            <h4 className="mt-4 font-semibold">Aplicações:</h4>
            <p className="text-muted-foreground">
              Perfeito para diversos tipos de trabalho, desde tarefas simples de
              manutenção até projetos mais complexos. Amplamente utilizado por
              profissionais da construção civil, marcenaria e indústria em
              geral.
            </p>
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Especificações Técnicas</h3>

            <div className="grid gap-2">
              <div className="flex justify-between border-b py-2">
                <span className="font-medium">Marca:</span>
                <span className="text-muted-foreground">{brand}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="font-medium">Categoria:</span>
                <span className="text-muted-foreground">{category}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="font-medium">Garantia:</span>
                <span className="text-muted-foreground">30 dias</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="font-medium">Voltagem:</span>
                <span className="text-muted-foreground">
                  Bivolt (110V/220V)
                </span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="font-medium">Peso:</span>
                <span className="text-muted-foreground">2,5 kg</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="font-medium">Dimensões:</span>
                <span className="text-muted-foreground">30 x 20 x 15 cm</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">País de Origem:</span>
                <span className="text-muted-foreground">Brasil</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "delivery" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informações de Entrega</h3>

            <div className="space-y-3">
              <div className="rounded-lg bg-muted/50 p-4">
                <h4 className="font-semibold">Frete Grátis</h4>
                <p className="text-sm text-muted-foreground">
                  Para compras acima de R$ 199,00 em produtos selecionados.
                </p>
              </div>

              <div className="rounded-lg bg-muted/50 p-4">
                <h4 className="font-semibold">Prazo de Entrega</h4>
                <p className="text-sm text-muted-foreground">
                  Região Sudeste: 3 a 7 dias úteis
                  <br />
                  Outras regiões: 7 a 14 dias úteis
                </p>
              </div>

              <div className="rounded-lg bg-muted/50 p-4">
                <h4 className="font-semibold">Retirada na Loja</h4>
                <p className="text-sm text-muted-foreground">
                  Disponível para retirada em nossa loja física após a
                  confirmação do pagamento. Horário de atendimento: Segunda a
                  Sexta das 8h às 18h, Sábado das 8h às 12h.
                </p>
              </div>

              <div className="rounded-lg bg-muted/50 p-4">
                <h4 className="font-semibold">Rastreamento</h4>
                <p className="text-sm text-muted-foreground">
                  Você receberá um código de rastreamento por e-mail após o
                  despacho do pedido para acompanhar a entrega em tempo real.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
