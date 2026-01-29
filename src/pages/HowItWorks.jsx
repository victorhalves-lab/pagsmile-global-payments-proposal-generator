import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  ClipboardList, 
  Kanban, 
  Calculator, 
  Table2,
  ArrowRight,
  CheckCircle,
  Users,
  Send,
  RefreshCw,
  XCircle,
  Link as LinkIcon,
  Copy,
  Building2,
  DollarSign,
  Percent,
  BarChart3,
  Globe,
  Mail,
  Phone,
  Target,
  Workflow,
  Lightbulb,
  BookOpen
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function HowItWorks() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-[#2bc196] rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="h-8 w-8 text-[#002443]" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">How It Works</h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Guia completo de todas as funcionalidades e fluxos da plataforma Pagsmile Pricing Tool
        </p>
      </div>

      {/* Visão Geral */}
      <Card className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <Target className="h-7 w-7" />
            Visão Geral da Plataforma
          </CardTitle>
        </CardHeader>
        <CardContent className="text-white/80 space-y-4">
          <p>
            O <strong className="text-[#2bc196]">Pagsmile Pricing Tool</strong> é uma plataforma completa para gestão de propostas comerciais 
            de processamento de pagamentos. A ferramenta automatiza o cálculo de taxas, gerencia o pipeline de vendas 
            e facilita a comunicação com potenciais clientes (merchants).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/5 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-[#2bc196]">6</div>
              <div className="text-white/60 text-sm">Páginas Principais</div>
            </div>
            <div className="bg-white/5 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-[#2bc196]">2</div>
              <div className="text-white/60 text-sm">Fluxos de Captação</div>
            </div>
            <div className="bg-white/5 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-[#2bc196]">5</div>
              <div className="text-white/60 text-sm">Status de Proposta</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fluxos Principais */}
      <Card className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <Workflow className="h-7 w-7" />
            Fluxos de Trabalho
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Fluxo 1: Via Questionário */}
          <div className="border border-[#2bc196]/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#2bc196] rounded-full flex items-center justify-center text-[#002443] font-bold text-sm">1</span>
              Fluxo via Questionário (Inbound)
            </h3>
            <p className="text-white/70 mb-6">
              Este fluxo é ideal quando o cliente potencial chega até você através de marketing, indicação ou prospecção. 
              O cliente preenche um formulário com suas informações e necessidades.
            </p>
            
            <div className="space-y-4">
              {/* Etapa 1.1 */}
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <div className="w-10 h-10 bg-[#2bc196]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <LinkIcon className="h-5 w-5 text-[#2bc196]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">1.1 Compartilhar Link do Questionário</h4>
                  <p className="text-white/60 text-sm mt-1">
                    Na sidebar da plataforma, você encontra o botão "Copiar Link" do questionário. 
                    Este link pode ser enviado por email, WhatsApp, ou incorporado em seu site/landing page.
                    O link direciona para uma página pública que não requer login.
                  </p>
                </div>
              </div>

              {/* Etapa 1.2 */}
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <div className="w-10 h-10 bg-[#2bc196]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <ClipboardList className="h-5 w-5 text-[#2bc196]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">1.2 Cliente Preenche o Questionário</h4>
                  <p className="text-white/60 text-sm mt-1">
                    O cliente acessa o formulário e preenche todas as informações solicitadas:
                  </p>
                  <ul className="text-white/60 text-sm mt-2 space-y-1 list-disc list-inside">
                    <li><strong>Dados de Contato:</strong> Nome, email, telefone, cargo</li>
                    <li><strong>Dados da Empresa:</strong> Nome, tipo de negócio, modelo de negócio, produtos/serviços</li>
                    <li><strong>Dados Financeiros:</strong> TPV mensal estimado, ticket médio (calcula automaticamente o volume de transações)</li>
                    <li><strong>Parceiro Atual:</strong> Se já possui processador de pagamentos, qual taxa atual</li>
                    <li><strong>Expectativas:</strong> Prazo de recebimento esperado (D+2/D+3, D+7 ou D+15)</li>
                  </ul>
                </div>
              </div>

              {/* Etapa 1.3 */}
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <div className="w-10 h-10 bg-[#2bc196]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-[#2bc196]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">1.3 Lead Aparece na Central de Questionários</h4>
                  <p className="text-white/60 text-sm mt-1">
                    Após o envio, o questionário aparece automaticamente na página "Questionários" com status "Leads" no pipeline.
                    Você pode visualizar todos os detalhes, filtrar por status, TPV ou presença de parceiro atual.
                  </p>
                </div>
              </div>

              {/* Etapa 1.4 */}
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <div className="w-10 h-10 bg-[#2bc196]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-[#2bc196]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">1.4 Gerar Proposta a partir do Questionário</h4>
                  <p className="text-white/60 text-sm mt-1">
                    Clique em "Gerar Proposta" no card do questionário. O sistema pré-preenche automaticamente 
                    os dados do cliente na tela de criação de proposta, economizando tempo e evitando erros de digitação.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fluxo 2: Proposta Direta */}
          <div className="border border-[#2bc196]/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#2bc196] rounded-full flex items-center justify-center text-[#002443] font-bold text-sm">2</span>
              Fluxo de Proposta Direta (Outbound)
            </h3>
            <p className="text-white/70 mb-6">
              Este fluxo é utilizado quando você já possui as informações do cliente (reunião, ligação, etc.) 
              e deseja criar uma proposta diretamente, sem passar pelo questionário.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <div className="w-10 h-10 bg-[#2bc196]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-[#2bc196]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">2.1 Criar Nova Proposta</h4>
                  <p className="text-white/60 text-sm mt-1">
                    Acesse "Criar Proposta" no menu. Preencha manualmente todos os dados do cliente e configure as taxas.
                    Este método é mais rápido quando você já tem todas as informações em mãos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Criação de Proposta - Detalhado */}
      <Card className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <FileText className="h-7 w-7" />
            Criação de Proposta (Detalhado)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-white/80">
          <p>
            A página de criação de proposta é o coração da plataforma. Aqui você configura todos os parâmetros 
            de pricing e gera propostas profissionais automaticamente.
          </p>

          {/* Seção 1: Dados do Cliente */}
          <div className="border-l-4 border-[#2bc196] pl-4">
            <h4 className="text-white font-bold text-lg mb-2">📋 Seção 1: Dados do Cliente</h4>
            <ul className="text-white/60 space-y-2 text-sm">
              <li><strong>Nome do Cliente/Empresa:</strong> Nome comercial que aparecerá na proposta</li>
              <li><strong>Nome do Contato:</strong> Pessoa responsável pela negociação</li>
              <li><strong>Email do Contato:</strong> Email para envio da proposta</li>
            </ul>
          </div>

          {/* Seção 2: MCCs */}
          <div className="border-l-4 border-[#2bc196] pl-4">
            <h4 className="text-white font-bold text-lg mb-2">🏷️ Seção 2: Seleção de MCCs</h4>
            <p className="text-white/60 text-sm mb-2">
              MCCs (Merchant Category Codes) são códigos que categorizam o tipo de negócio do merchant. 
              A seleção correta é fundamental pois impacta nas taxas de interchange aplicáveis.
            </p>
            <ul className="text-white/60 space-y-1 text-sm">
              <li>• Selecione um ou mais MCCs aplicáveis ao negócio do cliente</li>
              <li>• Os MCCs selecionados aparecerão na proposta final como disclaimer</li>
              <li>• Exemplo: 5411 (Supermercados), 5812 (Restaurantes), 7399 (Serviços)</li>
            </ul>
          </div>

          {/* Seção 3: Interchange */}
          <div className="border-l-4 border-[#2bc196] pl-4">
            <h4 className="text-white font-bold text-lg mb-2">💳 Seção 3: Configuração de Interchange</h4>
            <p className="text-white/60 text-sm mb-2">
              O interchange é a taxa cobrada pelas bandeiras (Visa/Mastercard) sobre cada transação. 
              Este é o principal componente de custo.
            </p>
            <div className="bg-white/5 p-4 rounded-lg mt-3">
              <h5 className="text-white font-semibold mb-2">Opções de Seleção:</h5>
              <ul className="text-white/60 space-y-2 text-sm">
                <li><strong>Visa (Low/Avg/High):</strong> Taxas mínima, média ou máxima da Visa</li>
                <li><strong>Mastercard (Low/Avg/High):</strong> Taxas mínima, média ou máxima da Mastercard</li>
                <li><strong>Combined (Low/Avg/High):</strong> Média ponderada entre Visa e Mastercard</li>
                <li><strong>Custom:</strong> Digite manualmente a taxa percentual e fixa</li>
              </ul>
            </div>
            <p className="text-white/60 text-sm mt-3">
              💡 <strong>Dica:</strong> Use "Combined Avg" para uma estimativa balanceada, ou "Custom" quando 
              souber exatamente a composição do mix de bandeiras do cliente.
            </p>
          </div>

          {/* Seção 4: Markup */}
          <div className="border-l-4 border-[#2bc196] pl-4">
            <h4 className="text-white font-bold text-lg mb-2">📈 Seção 4: Markup Pagsmile</h4>
            <p className="text-white/60 text-sm mb-2">
              O markup é a margem de lucro da Pagsmile sobre a operação.
            </p>
            <ul className="text-white/60 space-y-2 text-sm">
              <li><strong>Custo Base Pagsmile (fixo 0.5%):</strong> Custo operacional mínimo</li>
              <li><strong>Markup Percentual:</strong> Margem adicional (ajustável)</li>
              <li><strong>Gateway Fee:</strong> Tarifa fixa por transação em centavos USD</li>
            </ul>
            <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg mt-3">
              <p className="text-yellow-400 text-sm">
                <strong>Cálculo da Taxa Final:</strong><br/>
                Taxa Final = Interchange % + Custo Base (0.5%) + Markup %<br/>
                Fee Final = Interchange Fixo + Gateway Fee
              </p>
            </div>
          </div>

          {/* Seção 5: Taxas Adicionais */}
          <div className="border-l-4 border-[#2bc196] pl-4">
            <h4 className="text-white font-bold text-lg mb-2">💰 Seção 5: Taxas Adicionais</h4>
            <ul className="text-white/60 space-y-2 text-sm">
              <li><strong>Setup Fee:</strong> Taxa única de configuração (geralmente $0)</li>
              <li><strong>Refund Fee:</strong> Taxa cobrada por cada reembolso processado</li>
              <li><strong>Chargeback Fee:</strong> Taxa cobrada por cada contestação (chargeback)</li>
              <li><strong>Risk Control Fee:</strong> Taxa por análise de risco por transação</li>
              <li><strong>Rolling Reserve:</strong> Percentual retido como garantia + período de retenção em dias</li>
              <li><strong>Settlement Days:</strong> Prazo para recebimento (D+2/D+3, D+7 ou D+15)</li>
              <li><strong>Válido Até:</strong> Data de validade da proposta</li>
            </ul>
          </div>

          {/* Preview */}
          <div className="border-l-4 border-[#2bc196] pl-4">
            <h4 className="text-white font-bold text-lg mb-2">👁️ Preview em Tempo Real</h4>
            <p className="text-white/60 text-sm">
              No lado direito da tela, você visualiza em tempo real o breakdown completo das taxas e o resultado final. 
              Isso permite ajustar os parâmetros até encontrar o equilíbrio ideal entre competitividade e margem.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Ciclo de Vida da Proposta */}
      <Card className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <RefreshCw className="h-7 w-7" />
            Ciclo de Vida da Proposta
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-white/70">
            Após criar uma proposta, ela passa por diferentes estados conforme o cliente interage com ela.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Draft */}
            <div className="bg-gray-500/20 p-4 rounded-lg text-center">
              <div className="w-12 h-12 bg-gray-500/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <FileText className="h-6 w-6 text-gray-400" />
              </div>
              <h5 className="text-white font-semibold">Draft</h5>
              <p className="text-white/50 text-xs mt-1">Proposta criada, ainda não enviada</p>
            </div>

            {/* Sent */}
            <div className="bg-blue-500/20 p-4 rounded-lg text-center">
              <div className="w-12 h-12 bg-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <Send className="h-6 w-6 text-blue-400" />
              </div>
              <h5 className="text-white font-semibold">Sent</h5>
              <p className="text-white/50 text-xs mt-1">Link compartilhado com o cliente</p>
            </div>

            {/* Accepted */}
            <div className="bg-green-500/20 p-4 rounded-lg text-center">
              <div className="w-12 h-12 bg-green-500/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
              <h5 className="text-white font-semibold">Accepted</h5>
              <p className="text-white/50 text-xs mt-1">Cliente aceitou a proposta</p>
            </div>

            {/* Counter Proposal */}
            <div className="bg-yellow-500/20 p-4 rounded-lg text-center">
              <div className="w-12 h-12 bg-yellow-500/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <RefreshCw className="h-6 w-6 text-yellow-400" />
              </div>
              <h5 className="text-white font-semibold">Counter</h5>
              <p className="text-white/50 text-xs mt-1">Cliente fez contraproposta</p>
            </div>

            {/* Rejected */}
            <div className="bg-red-500/20 p-4 rounded-lg text-center">
              <div className="w-12 h-12 bg-red-500/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <XCircle className="h-6 w-6 text-red-400" />
              </div>
              <h5 className="text-white font-semibold">Rejected</h5>
              <p className="text-white/50 text-xs mt-1">Cliente recusou a proposta</p>
            </div>
          </div>

          {/* Ações do Cliente */}
          <div className="mt-6 bg-white/5 p-6 rounded-lg">
            <h4 className="text-white font-bold mb-4">🔗 Link Público da Proposta</h4>
            <p className="text-white/60 text-sm mb-4">
              Cada proposta gera um link único que pode ser compartilhado com o cliente. 
              Ao acessar o link, o cliente visualiza:
            </p>
            <ul className="text-white/60 text-sm space-y-2">
              <li>✓ Detalhes completos das taxas de processamento</li>
              <li>✓ Taxas adicionais (setup, refund, chargeback, etc.)</li>
              <li>✓ Prazo de recebimento</li>
              <li>✓ MCCs aplicáveis com disclaimer</li>
              <li>✓ Validade da proposta</li>
            </ul>
            <p className="text-white/60 text-sm mt-4">
              O cliente tem 3 opções de ação:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-green-500/10 p-3 rounded border border-green-500/30">
                <h5 className="text-green-400 font-semibold">✓ Aceitar</h5>
                <p className="text-white/50 text-xs mt-1">Aceita os termos apresentados</p>
              </div>
              <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/30">
                <h5 className="text-yellow-400 font-semibold">↻ Contraproposta</h5>
                <p className="text-white/50 text-xs mt-1">Sugere taxa, fee e prazo alternativos</p>
              </div>
              <div className="bg-red-500/10 p-3 rounded border border-red-500/30">
                <h5 className="text-red-400 font-semibold">✗ Recusar</h5>
                <p className="text-white/50 text-xs mt-1">Rejeita a proposta</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Central de Propostas */}
      <Card className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <Building2 className="h-7 w-7" />
            Central de Propostas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-white/80">
          <p>
            A Central de Propostas é onde você gerencia todas as propostas criadas. 
            Funcionalidades disponíveis:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h5 className="text-white font-semibold flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-[#2bc196]" />
                Visualizar Propostas
              </h5>
              <p className="text-white/60 text-sm">Cards com resumo de cada proposta: cliente, taxa final, status e validade.</p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h5 className="text-white font-semibold flex items-center gap-2 mb-2">
                <Copy className="h-4 w-4 text-[#2bc196]" />
                Duplicar Proposta
              </h5>
              <p className="text-white/60 text-sm">Cria uma cópia da proposta para usar como base para outro cliente.</p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h5 className="text-white font-semibold flex items-center gap-2 mb-2">
                <RefreshCw className="h-4 w-4 text-[#2bc196]" />
                Histórico de Versões
              </h5>
              <p className="text-white/60 text-sm">Visualiza todas as versões anteriores de uma proposta editada.</p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h5 className="text-white font-semibold flex items-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4 text-[#2bc196]" />
                Exportar Relatório
              </h5>
              <p className="text-white/60 text-sm">Exporta lista de propostas filtradas para arquivo CSV.</p>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-lg mt-4">
            <h5 className="text-white font-semibold mb-2">🔍 Filtros Disponíveis:</h5>
            <ul className="text-white/60 text-sm space-y-1">
              <li>• Busca por nome do cliente ou contato</li>
              <li>• Filtro por status (Draft, Sent, Accepted, Counter Proposal, Rejected)</li>
              <li>• Filtro por período de criação</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Kanban */}
      <Card className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <Kanban className="h-7 w-7" />
            Pipeline Kanban
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-white/80">
          <p>
            O Pipeline Kanban oferece uma visão visual do funil de vendas, permitindo 
            acompanhar o progresso de cada oportunidade de forma intuitiva.
          </p>

          <div className="grid grid-cols-5 gap-2 text-center text-sm">
            <div className="bg-gray-500/20 p-3 rounded">
              <div className="text-gray-400 font-bold">Leads</div>
              <div className="text-white/50 text-xs">Novos contatos</div>
            </div>
            <div className="bg-blue-500/20 p-3 rounded">
              <div className="text-blue-400 font-bold">Proposta Enviada</div>
              <div className="text-white/50 text-xs">Aguardando resposta</div>
            </div>
            <div className="bg-green-500/20 p-3 rounded">
              <div className="text-green-400 font-bold">Aceita</div>
              <div className="text-white/50 text-xs">Deal fechado</div>
            </div>
            <div className="bg-yellow-500/20 p-3 rounded">
              <div className="text-yellow-400 font-bold">Contraproposta</div>
              <div className="text-white/50 text-xs">Em negociação</div>
            </div>
            <div className="bg-red-500/20 p-3 rounded">
              <div className="text-red-400 font-bold">Perdida</div>
              <div className="text-white/50 text-xs">Não converteu</div>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-lg">
            <h5 className="text-white font-semibold mb-2">📊 KPIs do Pipeline:</h5>
            <ul className="text-white/60 text-sm space-y-1">
              <li><strong>TPV Total:</strong> Soma do TPV de todos os leads</li>
              <li><strong>Total de Leads:</strong> Quantidade de questionários recebidos</li>
              <li><strong>TPV Ganho:</strong> TPV das propostas aceitas</li>
              <li><strong>TPV Perdido:</strong> TPV das propostas rejeitadas</li>
              <li><strong>Win Rate:</strong> Taxa de conversão (TPV Ganho / Total)</li>
            </ul>
          </div>

          <p className="text-white/60 text-sm">
            💡 <strong>Drag & Drop:</strong> Arraste os cards entre as colunas para atualizar o status 
            do lead no pipeline de forma rápida e visual.
          </p>
        </CardContent>
      </Card>

      {/* Simulador de Receita */}
      <Card className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <Calculator className="h-7 w-7" />
            Simulador de Receita
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-white/80">
          <p>
            Ferramenta para simular a receita potencial com diferentes cenários de volume e taxas. 
            Ideal para planejamento financeiro e análise de viabilidade.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-white font-semibold mb-3">📥 Parâmetros de Entrada:</h5>
              <ul className="text-white/60 text-sm space-y-2">
                <li><strong>TPV Mensal:</strong> Volume total processado</li>
                <li><strong>Ticket Médio:</strong> Valor médio por transação</li>
                <li><strong>Taxa Percentual:</strong> % cobrado do merchant</li>
                <li><strong>Fee Fixo:</strong> Valor fixo por transação</li>
                <li><strong>Interchange:</strong> Custo da bandeira</li>
                <li><strong>Custo Base:</strong> Custo operacional Pagsmile</li>
                <li><strong>Chargeback Rate/Fee:</strong> Taxa e custo de chargebacks</li>
                <li><strong>Refund Rate/Fee:</strong> Taxa e custo de reembolsos</li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-3">📤 Resultados Calculados:</h5>
              <ul className="text-white/60 text-sm space-y-2">
                <li><strong>Receita Bruta:</strong> Total faturado</li>
                <li><strong>Custos Totais:</strong> Interchange + Base + Chargebacks + Refunds</li>
                <li><strong>Receita Líquida:</strong> Lucro após custos</li>
                <li><strong>Margem:</strong> Percentual de lucro</li>
                <li><strong>Projeção Anual:</strong> Receita líquida × 12</li>
              </ul>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-lg">
            <h5 className="text-white font-semibold mb-2">📈 Gráficos Inclusos:</h5>
            <ul className="text-white/60 text-sm space-y-1">
              <li>• Projeção anual com crescimento de 5% ao mês</li>
              <li>• Breakdown visual dos custos (interchange, base, chargebacks, refunds)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Taxas de Interchange */}
      <Card className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <Table2 className="h-7 w-7" />
            Tabela de Interchange
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-white/80">
          <p>
            Consulta completa das taxas de interchange para transações "Card Not Present" (CNP) nos EUA.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h5 className="text-blue-400 font-semibold mb-2">💳 Visa</h5>
              <p className="text-white/60 text-sm">
                Taxas organizadas por programa (Recurring, Product 1, CPS/CNP, Non-Qualified) 
                e tipo de cartão (Consumer Credit, Business, etc.)
              </p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h5 className="text-orange-400 font-semibold mb-2">💳 Mastercard</h5>
              <p className="text-white/60 text-sm">
                Taxas por programa (Merit I, Merit III Base, Standard, Full UCAF) 
                e categoria (Core, World Elite, etc.)
              </p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h5 className="text-[#2bc196] font-semibold mb-2">📊 Resumo Combinado</h5>
              <p className="text-white/60 text-sm">
                Visão consolidada com valores mínimos, médios e máximos 
                de cada bandeira e combinado.
              </p>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
            <p className="text-yellow-400 text-sm">
              <strong>⚠️ Importante:</strong> As taxas de interchange são atualizadas periodicamente pelas bandeiras. 
              Consulte sempre a documentação oficial para valores vigentes em negociações específicas.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard */}
      <Card className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <BarChart3 className="h-7 w-7" />
            Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-white/80">
          <p>
            Visão geral consolidada de todas as métricas importantes do negócio em uma única tela.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white/5 p-3 rounded-lg text-center">
              <DollarSign className="h-6 w-6 text-[#2bc196] mx-auto mb-1" />
              <div className="text-white text-sm font-semibold">TPV Total</div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg text-center">
              <Percent className="h-6 w-6 text-[#2bc196] mx-auto mb-1" />
              <div className="text-white text-sm font-semibold">Receita Estimada</div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg text-center">
              <Users className="h-6 w-6 text-[#2bc196] mx-auto mb-1" />
              <div className="text-white text-sm font-semibold">Total de Leads</div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg text-center">
              <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-1" />
              <div className="text-white text-sm font-semibold">TPV Ganho</div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg text-center">
              <XCircle className="h-6 w-6 text-red-400 mx-auto mb-1" />
              <div className="text-white text-sm font-semibold">TPV Perdido</div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg text-center">
              <Target className="h-6 w-6 text-[#2bc196] mx-auto mb-1" />
              <div className="text-white text-sm font-semibold">Win Rate</div>
            </div>
          </div>

          <p className="text-white/60 text-sm">
            O dashboard também exibe as propostas e questionários mais recentes com acesso rápido 
            às ações principais (criar proposta, acessar pipeline, consultar interchange).
          </p>
        </CardContent>
      </Card>

      {/* Internacionalização */}
      <Card className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <Globe className="h-7 w-7" />
            Internacionalização (i18n)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-white/80">
          <p>
            A plataforma suporta múltiplos idiomas. Atualmente disponível em:
          </p>
          <div className="flex gap-4">
            <div className="bg-white/5 px-4 py-2 rounded-lg flex items-center gap-2">
              <span className="text-2xl">🇧🇷</span>
              <span className="text-white">Português</span>
            </div>
            <div className="bg-white/5 px-4 py-2 rounded-lg flex items-center gap-2">
              <span className="text-2xl">🇺🇸</span>
              <span className="text-white">English</span>
            </div>
          </div>
          <p className="text-white/60 text-sm">
            Use o seletor de idioma na sidebar para alternar entre os idiomas disponíveis. 
            A preferência é salva automaticamente no navegador.
          </p>
        </CardContent>
      </Card>

      {/* Dicas e Boas Práticas */}
      <Card className="bg-gradient-to-br from-[#2bc196]/20 to-[#002443] border-[#2bc196]">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <Lightbulb className="h-7 w-7" />
            Dicas e Boas Práticas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="text-white/80 space-y-3">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#2bc196] flex-shrink-0 mt-0.5" />
              <span>Sempre verifique os MCCs corretos do merchant antes de criar a proposta</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#2bc196] flex-shrink-0 mt-0.5" />
              <span>Use o simulador de receita para validar a viabilidade da operação antes de enviar</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#2bc196] flex-shrink-0 mt-0.5" />
              <span>Mantenha o pipeline atualizado movendo os cards conforme a negociação avança</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#2bc196] flex-shrink-0 mt-0.5" />
              <span>Quando receber uma contraproposta, analise os valores sugeridos no detalhe da proposta</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#2bc196] flex-shrink-0 mt-0.5" />
              <span>Use a função de duplicar proposta para agilizar criação de propostas similares</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#2bc196] flex-shrink-0 mt-0.5" />
              <span>Exporte relatórios periodicamente para acompanhamento gerencial</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center py-8">
        <p className="text-white/40 text-sm">
          Pagsmile Pricing Tool © {new Date().getFullYear()} - Documentação v1.0
        </p>
      </div>
    </div>
  );
}