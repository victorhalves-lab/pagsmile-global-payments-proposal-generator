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
  BookOpen,
  MousePointer,
  Eye,
  Edit,
  Trash2,
  Filter,
  Download,
  CreditCard,
  PiggyBank,
  TrendingUp,
  History,
  Settings,
  AlertTriangle,
  Clock,
  ArrowDown,
  Layers
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function HowItWorks() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-[#2bc196] rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="h-8 w-8 text-[#002443]" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Documentação Completa</h1>
        <p className="text-white/70 text-lg max-w-3xl mx-auto">
          Guia completo, detalhado e microscópico de todas as funcionalidades, fluxos, páginas e elementos da plataforma Pagsmile Pricing Tool
        </p>
      </div>

      {/* Índice */}
      <Card className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-xl">
            <Layers className="h-6 w-6" />
            Índice de Conteúdo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <a href="#visao-geral" className="text-white/80 hover:text-[#2bc196] transition-colors p-2 rounded hover:bg-white/5">1. Visão Geral da Plataforma</a>
            <a href="#fluxos" className="text-white/80 hover:text-[#2bc196] transition-colors p-2 rounded hover:bg-white/5">2. Fluxos de Trabalho Completos</a>
            <a href="#dashboard" className="text-white/80 hover:text-[#2bc196] transition-colors p-2 rounded hover:bg-white/5">3. Página: Dashboard</a>
            <a href="#questionario-form" className="text-white/80 hover:text-[#2bc196] transition-colors p-2 rounded hover:bg-white/5">4. Página: Formulário de Questionário</a>
            <a href="#questionario-center" className="text-white/80 hover:text-[#2bc196] transition-colors p-2 rounded hover:bg-white/5">5. Página: Central de Questionários</a>
            <a href="#proposta-criacao" className="text-white/80 hover:text-[#2bc196] transition-colors p-2 rounded hover:bg-white/5">6. Página: Criação de Proposta</a>
            <a href="#proposta-center" className="text-white/80 hover:text-[#2bc196] transition-colors p-2 rounded hover:bg-white/5">7. Página: Central de Propostas</a>
            <a href="#proposta-publica" className="text-white/80 hover:text-[#2bc196] transition-colors p-2 rounded hover:bg-white/5">8. Página: Proposta Pública</a>
            <a href="#pipeline" className="text-white/80 hover:text-[#2bc196] transition-colors p-2 rounded hover:bg-white/5">9. Página: Pipeline Kanban</a>
            <a href="#simulador" className="text-white/80 hover:text-[#2bc196] transition-colors p-2 rounded hover:bg-white/5">10. Página: Simulador de Receita</a>
            <a href="#interchange" className="text-white/80 hover:text-[#2bc196] transition-colors p-2 rounded hover:bg-white/5">11. Página: Tabela de Interchange</a>
            <a href="#dicas" className="text-white/80 hover:text-[#2bc196] transition-colors p-2 rounded hover:bg-white/5">12. Dicas e Boas Práticas</a>
          </div>
        </CardContent>
      </Card>

      {/* ==================== VISÃO GERAL ==================== */}
      <Card id="visao-geral" className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <Target className="h-7 w-7" />
            1. Visão Geral da Plataforma
          </CardTitle>
        </CardHeader>
        <CardContent className="text-white/80 space-y-6">
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">1.1 O que é o Pagsmile Pricing Tool?</h3>
            <p>
              O <strong className="text-[#2bc196]">Pagsmile Pricing Tool</strong> é uma plataforma completa e integrada para gestão de propostas comerciais 
              de processamento de pagamentos internacionais. A ferramenta foi desenvolvida especificamente para a equipe comercial da Pagsmile, 
              permitindo automatizar o cálculo de taxas complexas, gerenciar o pipeline de vendas de forma visual e facilitar toda a comunicação 
              com potenciais clientes (merchants) que desejam utilizar os serviços de processamento de pagamentos da Pagsmile.
            </p>

            <h3 className="text-white font-bold text-lg mt-6">1.2 Qual problema a plataforma resolve?</h3>
            <p>
              Antes desta ferramenta, o processo de criação de propostas comerciais era manual e propenso a erros. Os analistas precisavam:
            </p>
            <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
              <li>Calcular manualmente as taxas de interchange de cada bandeira (Visa, Mastercard)</li>
              <li>Somar custos base, markups e taxas adicionais em planilhas</li>
              <li>Criar propostas em documentos Word ou PDFs</li>
              <li>Enviar propostas por email e acompanhar respostas manualmente</li>
              <li>Atualizar planilhas de pipeline de vendas separadamente</li>
            </ul>
            <p className="mt-4">
              Com o Pagsmile Pricing Tool, todo esse processo é automatizado, centralizado e rastreável.
            </p>

            <h3 className="text-white font-bold text-lg mt-6">1.3 Estrutura da Plataforma</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-white/5 p-4 rounded-lg">
                <div className="text-3xl font-bold text-[#2bc196]">8</div>
                <div className="text-white font-medium">Páginas Principais</div>
                <div className="text-white/50 text-sm mt-1">Dashboard, Questionários, Propostas, Pipeline, Simulador, Interchange, Formulário Público, Proposta Pública</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <div className="text-3xl font-bold text-[#2bc196]">3</div>
                <div className="text-white font-medium">Entidades de Dados</div>
                <div className="text-white/50 text-sm mt-1">Questionnaire (leads), Proposal (propostas), InterchangeRate (taxas)</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <div className="text-3xl font-bold text-[#2bc196]">2</div>
                <div className="text-white font-medium">Idiomas Suportados</div>
                <div className="text-white/50 text-sm mt-1">Português (BR) e English (US)</div>
              </div>
            </div>

            <h3 className="text-white font-bold text-lg mt-6">1.4 Conceitos Fundamentais</h3>
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-lg border-l-4 border-[#2bc196]">
                <h4 className="text-[#2bc196] font-semibold">TPV (Total Payment Volume)</h4>
                <p className="text-white/70 mt-1">Volume total de pagamentos processados mensalmente pelo merchant. É o principal indicador de tamanho do cliente e base para cálculo de receitas.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border-l-4 border-blue-400">
                <h4 className="text-blue-400 font-semibold">Interchange</h4>
                <p className="text-white/70 mt-1">Taxa cobrada pelas bandeiras de cartão (Visa, Mastercard) sobre cada transação. É o principal componente de custo e varia conforme o tipo de cartão e programa.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border-l-4 border-yellow-400">
                <h4 className="text-yellow-400 font-semibold">MCC (Merchant Category Code)</h4>
                <p className="text-white/70 mt-1">Código de 4 dígitos que categoriza o tipo de negócio do merchant. Exemplo: 5411 (Supermercados), 5812 (Restaurantes), 7399 (Serviços Gerais).</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border-l-4 border-purple-400">
                <h4 className="text-purple-400 font-semibold">Settlement (Liquidação)</h4>
                <p className="text-white/70 mt-1">Prazo para o merchant receber os valores das transações após a captura. Exemplo: D+2 significa 2 dias úteis após a transação.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border-l-4 border-red-400">
                <h4 className="text-red-400 font-semibold">Rolling Reserve</h4>
                <p className="text-white/70 mt-1">Percentual retido das transações como garantia contra chargebacks e fraudes. Liberado após um período determinado (ex: 180 dias).</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ==================== FLUXOS DE TRABALHO ==================== */}
      <Card id="fluxos" className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <Workflow className="h-7 w-7" />
            2. Fluxos de Trabalho Completos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* FLUXO 1: INBOUND */}
          <div className="border border-[#2bc196]/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#2bc196] rounded-full flex items-center justify-center text-[#002443] font-bold text-sm">1</span>
              Fluxo Inbound (Via Questionário)
            </h3>
            <p className="text-white/70 mb-6">
              Este é o fluxo ideal quando o lead chega até você através de marketing digital, indicações, eventos ou qualquer forma de prospecção passiva. 
              O potencial cliente preenche um formulário online com suas informações e necessidades, criando automaticamente um registro no sistema.
            </p>
            
            <div className="space-y-4">
              {/* Etapa 1.1 */}
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <div className="w-12 h-12 bg-[#2bc196]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#2bc196] font-bold">1.1</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">Obter o Link do Questionário</h4>
                  <p className="text-white/60 text-sm mt-1">
                    <strong>Onde encontrar:</strong> Na sidebar (menu lateral) da plataforma, você verá uma seção na parte inferior com o texto "Link do Questionário" e um botão "Copiar Link".
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    <strong>Como funciona:</strong> Ao clicar no botão, o sistema copia automaticamente para sua área de transferência o URL completo do formulário público. 
                    Um toast de confirmação aparece: "Link do questionário copiado!".
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    <strong>Onde usar:</strong> Este link pode ser:
                  </p>
                  <ul className="text-white/50 text-sm mt-1 space-y-1 list-disc list-inside ml-4">
                    <li>Enviado por email para leads em potencial</li>
                    <li>Compartilhado via WhatsApp, LinkedIn ou outras redes</li>
                    <li>Incorporado em seu site institucional ou landing pages</li>
                    <li>Usado em assinaturas de email da equipe comercial</li>
                    <li>Distribuído em eventos, feiras e conferências (via QR Code)</li>
                  </ul>
                  <p className="text-white/60 text-sm mt-2">
                    <strong>Importante:</strong> O link é público e não requer login. Qualquer pessoa com o link pode preencher o formulário.
                  </p>
                </div>
              </div>

              {/* Etapa 1.2 */}
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <div className="w-12 h-12 bg-[#2bc196]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#2bc196] font-bold">1.2</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">Cliente Preenche o Questionário</h4>
                  <p className="text-white/60 text-sm mt-1">
                    <strong>Experiência do cliente:</strong> Ao acessar o link, o cliente vê uma página com visual limpo e profissional, com o logo da Pagsmile e um formulário dividido em seções lógicas.
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    <strong>Seções do formulário:</strong>
                  </p>
                  <div className="mt-2 space-y-2">
                    <div className="bg-white/5 p-2 rounded text-sm">
                      <span className="text-[#2bc196]">📋 Dados do Contato:</span>
                      <span className="text-white/50 ml-2">Nome completo*, Email*, Telefone (com seletor de país e código), Cargo na empresa</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded text-sm">
                      <span className="text-[#2bc196]">🏢 Dados da Empresa:</span>
                      <span className="text-white/50 ml-2">Nome da empresa*, Tipo de negócio, Modelo de negócio, Produtos/Serviços oferecidos</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded text-sm">
                      <span className="text-[#2bc196]">💰 Dados Financeiros:</span>
                      <span className="text-white/50 ml-2">TPV mensal estimado (USD)*, Ticket médio (USD)*, Volume de transações (calculado automaticamente)</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded text-sm">
                      <span className="text-[#2bc196]">🤝 Parceiro Atual:</span>
                      <span className="text-white/50 ml-2">Se já possui processador de pagamentos (Sim/Não), Taxa percentual atual, Tarifa fixa atual</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded text-sm">
                      <span className="text-[#2bc196]">⏱️ Expectativas:</span>
                      <span className="text-white/50 ml-2">Prazo de recebimento esperado (D+2/D+3, D+7, ou D+15)</span>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm mt-2">
                    <strong>Cálculo automático:</strong> O sistema calcula automaticamente o número estimado de transações mensais dividindo o TPV pelo ticket médio.
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    <strong>Após o envio:</strong> O cliente vê uma tela de confirmação com ícone de sucesso verde e a mensagem "Obrigado! Seus dados foram enviados com sucesso. Nossa equipe entrará em contato em breve."
                  </p>
                </div>
              </div>

              {/* Etapa 1.3 */}
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <div className="w-12 h-12 bg-[#2bc196]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#2bc196] font-bold">1.3</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">Lead Aparece na Central de Questionários</h4>
                  <p className="text-white/60 text-sm mt-1">
                    <strong>O que acontece:</strong> Imediatamente após o envio do formulário, um novo registro é criado na entidade "Questionnaire" com status "leads" no pipeline.
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    <strong>Onde visualizar:</strong> Acesse "Questionários" no menu lateral. Você verá o novo lead como um card com todas as informações preenchidas.
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    <strong>Informações visíveis no card:</strong>
                  </p>
                  <ul className="text-white/50 text-sm mt-1 space-y-1 list-disc list-inside ml-4">
                    <li>Nome da empresa e nome do contato</li>
                    <li>Email e telefone do contato</li>
                    <li>TPV mensal estimado</li>
                    <li>Ticket médio e número de transações</li>
                    <li>Status no pipeline (badge colorido)</li>
                    <li>Se tem parceiro atual ou não</li>
                  </ul>
                </div>
              </div>

              {/* Etapa 1.4 */}
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <div className="w-12 h-12 bg-[#2bc196]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#2bc196] font-bold">1.4</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">Gerar Proposta a partir do Questionário</h4>
                  <p className="text-white/60 text-sm mt-1">
                    <strong>Como fazer:</strong> No card do questionário, clique no botão "Gerar Proposta" (ícone de arquivo com sinal de +).
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    <strong>O que acontece:</strong> O sistema redireciona você para a página de Criação de Proposta, mas com uma diferença importante: 
                    os campos de dados do cliente (Nome da Empresa, Nome do Contato, Email) já vêm preenchidos automaticamente com os dados do questionário.
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    <strong>Benefícios:</strong>
                  </p>
                  <ul className="text-white/50 text-sm mt-1 space-y-1 list-disc list-inside ml-4">
                    <li>Economia de tempo (não precisa digitar novamente)</li>
                    <li>Redução de erros de digitação</li>
                    <li>Vínculo automático entre questionário e proposta</li>
                    <li>Atualização automática do status no pipeline quando a proposta for criada</li>
                  </ul>
                </div>
              </div>

              {/* Etapa 1.5 */}
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <div className="w-12 h-12 bg-[#2bc196]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#2bc196] font-bold">1.5</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">Configurar e Enviar a Proposta</h4>
                  <p className="text-white/60 text-sm mt-1">
                    Complete a configuração da proposta (MCCs, interchange, markup, taxas) e clique em "Gerar Proposta". 
                    A proposta é criada com status "draft". Copie o link público e envie para o cliente por email ou WhatsApp.
                  </p>
                </div>
              </div>

              {/* Etapa 1.6 */}
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <div className="w-12 h-12 bg-[#2bc196]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#2bc196] font-bold">1.6</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">Cliente Responde à Proposta</h4>
                  <p className="text-white/60 text-sm mt-1">
                    O cliente acessa o link público, visualiza todos os detalhes e tem 3 opções: Aceitar, Fazer Contraproposta ou Recusar. 
                    A resposta atualiza automaticamente o status da proposta e o pipeline do questionário vinculado.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FLUXO 2: OUTBOUND */}
          <div className="border border-[#2bc196]/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#2bc196] rounded-full flex items-center justify-center text-[#002443] font-bold text-sm">2</span>
              Fluxo Outbound (Proposta Direta)
            </h3>
            <p className="text-white/70 mb-6">
              Este fluxo é utilizado quando você já possui todas as informações do cliente através de reuniões, ligações telefônicas, 
              emails ou outras formas de comunicação direta. Não há necessidade de passar pelo questionário.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 font-bold">2.1</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">Criar Proposta Diretamente</h4>
                  <p className="text-white/60 text-sm mt-1">
                    Clique em "Criar Proposta" no menu lateral ou no botão do Dashboard. Preencha manualmente todos os dados do cliente e configure as taxas normalmente.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 font-bold">2.2</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">Enviar e Acompanhar</h4>
                  <p className="text-white/60 text-sm mt-1">
                    Após criar a proposta, copie o link público e envie para o cliente. Acompanhe o status na Central de Propostas. 
                    Neste fluxo, não há questionário vinculado, então o pipeline é gerenciado diretamente pelo status da proposta.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Diagrama Visual do Fluxo */}
          <div className="mt-8">
            <h3 className="text-white font-bold text-lg mb-4">Diagrama Visual do Ciclo de Vida</h3>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
              <div className="bg-gray-500/30 px-4 py-2 rounded-lg text-white">Lead Entra</div>
              <ArrowRight className="h-4 w-4 text-[#2bc196]" />
              <div className="bg-gray-500/30 px-4 py-2 rounded-lg text-white">Questionário</div>
              <ArrowRight className="h-4 w-4 text-[#2bc196]" />
              <div className="bg-blue-500/30 px-4 py-2 rounded-lg text-white">Proposta Criada</div>
              <ArrowRight className="h-4 w-4 text-[#2bc196]" />
              <div className="bg-blue-500/30 px-4 py-2 rounded-lg text-white">Proposta Enviada</div>
              <ArrowRight className="h-4 w-4 text-[#2bc196]" />
              <div className="flex gap-2">
                <div className="bg-green-500/30 px-3 py-2 rounded-lg text-white text-xs">Aceita ✓</div>
                <div className="bg-yellow-500/30 px-3 py-2 rounded-lg text-white text-xs">Contra ↻</div>
                <div className="bg-red-500/30 px-3 py-2 rounded-lg text-white text-xs">Recusa ✗</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ==================== PÁGINA: DASHBOARD ==================== */}
      <Card id="dashboard" className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <BarChart3 className="h-7 w-7" />
            3. Página: Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-white/60 text-sm">
              <strong className="text-white">Caminho de acesso:</strong> Menu lateral → Dashboard (primeira opção)
            </p>
            <p className="text-white/60 text-sm mt-1">
              <strong className="text-white">Propósito:</strong> Visão geral consolidada de todas as métricas de negócio em uma única tela, permitindo análise rápida do desempenho.
            </p>
          </div>

          <h3 className="text-white font-bold text-lg">3.1 KPIs (Key Performance Indicators)</h3>
          <p className="text-white/70">
            Na parte superior da página, 6 cards exibem as métricas principais do negócio em tempo real:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-[#2bc196]">
                <DollarSign className="h-5 w-5" />
                <span className="font-semibold">TPV Total</span>
              </div>
              <p className="text-white/60 text-sm mt-2">
                <strong>O que é:</strong> Soma do TPV mensal de todos os questionários recebidos.
              </p>
              <p className="text-white/60 text-sm mt-1">
                <strong>Como é calculado:</strong> Σ (monthly_tpv de cada Questionnaire)
              </p>
              <p className="text-white/60 text-sm mt-1">
                <strong>Por que importa:</strong> Indica o tamanho total da oportunidade de mercado no pipeline.
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-[#2bc196]">
                <TrendingUp className="h-5 w-5" />
                <span className="font-semibold">Receita Estimada</span>
              </div>
              <p className="text-white/60 text-sm mt-2">
                <strong>O que é:</strong> Estimativa de receita baseada em 1% do TPV total.
              </p>
              <p className="text-white/60 text-sm mt-1">
                <strong>Como é calculado:</strong> TPV Total × 0.01
              </p>
              <p className="text-white/60 text-sm mt-1">
                <strong>Por que importa:</strong> Dá uma noção rápida do potencial de receita se todos os leads fecharem.
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-[#2bc196]">
                <Users className="h-5 w-5" />
                <span className="font-semibold">Total de Leads</span>
              </div>
              <p className="text-white/60 text-sm mt-2">
                <strong>O que é:</strong> Quantidade total de questionários recebidos.
              </p>
              <p className="text-white/60 text-sm mt-1">
                <strong>Como é calculado:</strong> Contagem de registros em Questionnaire
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">TPV Ganho</span>
              </div>
              <p className="text-white/60 text-sm mt-2">
                <strong>O que é:</strong> TPV dos leads cujas propostas foram aceitas.
              </p>
              <p className="text-white/60 text-sm mt-1">
                <strong>Como é calculado:</strong> Σ TPV onde pipeline_status = 'proposal_accepted'
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-red-400">
                <XCircle className="h-5 w-5" />
                <span className="font-semibold">TPV Perdido</span>
              </div>
              <p className="text-white/60 text-sm mt-2">
                <strong>O que é:</strong> TPV dos leads cujas propostas foram rejeitadas.
              </p>
              <p className="text-white/60 text-sm mt-1">
                <strong>Como é calculado:</strong> Σ TPV onde pipeline_status = 'proposal_lost'
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-[#2bc196]">
                <Percent className="h-5 w-5" />
                <span className="font-semibold">Win Rate</span>
              </div>
              <p className="text-white/60 text-sm mt-2">
                <strong>O que é:</strong> Taxa de conversão baseada em TPV.
              </p>
              <p className="text-white/60 text-sm mt-1">
                <strong>Como é calculado:</strong> (TPV Ganho / (TPV Ganho + TPV Perdido)) × 100%
              </p>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">3.2 Seções do Dashboard</h3>
          
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-white font-semibold">📄 Propostas Recentes</h4>
              <p className="text-white/60 text-sm mt-2">
                Exibe as 5 propostas mais recentes com: nome do cliente, taxa final (% + fixo), e badge de status colorido.
                Clicando em "Central de Propostas" na parte inferior, você é redirecionado para a página completa.
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-white font-semibold">📋 Questionários Recentes</h4>
              <p className="text-white/60 text-sm mt-2">
                Exibe os 5 questionários mais recentes com: nome da empresa, TPV mensal, e badge de status no pipeline.
                Clicando em "Central de Questionários" na parte inferior, você é redirecionado para a página completa.
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-white font-semibold">⚡ Ações Rápidas</h4>
              <p className="text-white/60 text-sm mt-2">
                Três botões de acesso rápido para as ações mais comuns:
              </p>
              <ul className="text-white/50 text-sm mt-2 space-y-1 list-disc list-inside ml-4">
                <li><strong>Criar Proposta:</strong> Vai direto para a página de criação de proposta</li>
                <li><strong>Pipeline:</strong> Acessa o Kanban visual do pipeline</li>
                <li><strong>Taxas de Interchange:</strong> Consulta a tabela completa de interchange</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ==================== PÁGINA: FORMULÁRIO DE QUESTIONÁRIO ==================== */}
      <Card id="questionario-form" className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <ClipboardList className="h-7 w-7" />
            4. Página: Formulário de Questionário (Público)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-white/60 text-sm">
              <strong className="text-white">Caminho de acesso:</strong> Link público (obtido na sidebar → "Copiar Link")
            </p>
            <p className="text-white/60 text-sm mt-1">
              <strong className="text-white">Propósito:</strong> Captura de leads qualificados através de formulário público acessível sem login.
            </p>
            <p className="text-white/60 text-sm mt-1">
              <strong className="text-white">Quem usa:</strong> Potenciais clientes (merchants) interessados nos serviços da Pagsmile.
            </p>
          </div>

          <h3 className="text-white font-bold text-lg">4.1 Estrutura Visual</h3>
          <p className="text-white/70">
            A página tem um design limpo com fundo em gradiente azul escuro, logo da Pagsmile centralizado no topo, 
            título "Formulário de Interesse" e um card branco contendo o formulário.
          </p>

          <h3 className="text-white font-bold text-lg mt-6">4.2 Campos do Formulário (Detalhados)</h3>
          
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg border-l-4 border-[#2bc196]">
              <h4 className="text-[#2bc196] font-semibold">Seção: Dados do Contato</h4>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-white">Nome Completo</span>
                  <span className="text-white/50">Obrigatório* | Texto livre</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-white">Email</span>
                  <span className="text-white/50">Obrigatório* | Validação de formato email</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-white">Telefone</span>
                  <span className="text-white/50">Opcional | Seletor de país (20 países) + número</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-white">Cargo</span>
                  <span className="text-white/50">Opcional | Texto livre</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-lg border-l-4 border-blue-400">
              <h4 className="text-blue-400 font-semibold">Seção: Dados da Empresa</h4>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-white">Nome da Empresa</span>
                  <span className="text-white/50">Obrigatório* | Texto livre</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-white">Tipo de Negócio</span>
                  <span className="text-white/50">Opcional | Ex: E-commerce, SaaS, Marketplace</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-white">Modelo de Negócio</span>
                  <span className="text-white/50">Opcional | Ex: B2B, B2C, D2C</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-white">Produtos/Serviços</span>
                  <span className="text-white/50">Opcional | Área de texto multilinha</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="text-yellow-400 font-semibold">Seção: Dados Financeiros</h4>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-white">TPV Mensal Estimado (USD)</span>
                  <span className="text-white/50">Obrigatório* | Número inteiro</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-white">Ticket Médio (USD)</span>
                  <span className="text-white/50">Obrigatório* | Número inteiro</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-white">Transações Mensais</span>
                  <span className="text-white/50">Calculado automaticamente | TPV ÷ Ticket | Campo desabilitado</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-lg border-l-4 border-purple-400">
              <h4 className="text-purple-400 font-semibold">Seção: Parceiro Atual</h4>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-white">Já possui processador?</span>
                  <span className="text-white/50">Opcional | Radio: Sim / Não</span>
                </div>
                <p className="text-white/50 text-xs mt-2">Se "Sim" for selecionado, aparecem campos adicionais:</p>
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-white">Taxa Atual (%)</span>
                  <span className="text-white/50">Condicional | Número decimal</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-white">Tarifa Fixa Atual (USD)</span>
                  <span className="text-white/50">Condicional | Número decimal</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-lg border-l-4 border-green-400">
              <h4 className="text-green-400 font-semibold">Seção: Prazo de Recebimento</h4>
              <div className="mt-3 text-sm">
                <div className="flex justify-between items-center py-1">
                  <span className="text-white">Prazo Esperado</span>
                  <span className="text-white/50">Opcional | Select: D+2/D+3, D+7, D+15</span>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">4.3 Comportamento Após Envio</h3>
          <p className="text-white/70">
            Ao clicar em "Enviar Formulário", o sistema:
          </p>
          <ol className="text-white/60 text-sm mt-2 space-y-2 list-decimal list-inside ml-4">
            <li>Valida todos os campos obrigatórios</li>
            <li>Calcula automaticamente o número de transações (TPV ÷ Ticket)</li>
            <li>Cria um registro na entidade Questionnaire com pipeline_status = "leads"</li>
            <li>Exibe tela de sucesso com ícone verde e mensagem de agradecimento</li>
          </ol>
        </CardContent>
      </Card>

      {/* ==================== PÁGINA: CENTRAL DE QUESTIONÁRIOS ==================== */}
      <Card id="questionario-center" className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <ClipboardList className="h-7 w-7" />
            5. Página: Central de Questionários
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-white/60 text-sm">
              <strong className="text-white">Caminho de acesso:</strong> Menu lateral → Questionários
            </p>
            <p className="text-white/60 text-sm mt-1">
              <strong className="text-white">Propósito:</strong> Gerenciar todos os questionários recebidos, filtrar, visualizar detalhes, gerar propostas e exportar dados.
            </p>
          </div>

          <h3 className="text-white font-bold text-lg">5.1 Barra de Filtros</h3>
          <p className="text-white/70">
            No topo da página, uma barra horizontal permite filtrar os questionários por múltiplos critérios:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div className="bg-white/5 p-3 rounded-lg">
              <span className="text-[#2bc196] text-sm font-semibold">🔍 Busca</span>
              <p className="text-white/50 text-xs mt-1">Campo de texto para buscar por nome da empresa ou contato</p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <span className="text-[#2bc196] text-sm font-semibold">📊 Status</span>
              <p className="text-white/50 text-xs mt-1">Select com opções: Todos, Leads, Proposta Enviada, Aceita, Contraproposta, Perdida</p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <span className="text-[#2bc196] text-sm font-semibold">🤝 Parceiro</span>
              <p className="text-white/50 text-xs mt-1">Select: Todos, Com Parceiro, Sem Parceiro</p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <span className="text-[#2bc196] text-sm font-semibold">💰 TPV Mínimo</span>
              <p className="text-white/50 text-xs mt-1">Campo numérico para filtrar por TPV mínimo</p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <span className="text-[#2bc196] text-sm font-semibold">💰 TPV Máximo</span>
              <p className="text-white/50 text-xs mt-1">Campo numérico para filtrar por TPV máximo</p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <span className="text-[#2bc196] text-sm font-semibold">⚙️ Ações</span>
              <p className="text-white/50 text-xs mt-1">Botões: Resetar Filtros, Exportar CSV</p>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">5.2 Cards de Questionário</h3>
          <p className="text-white/70">
            Cada questionário é exibido como um card contendo:
          </p>
          <div className="bg-white/5 p-4 rounded-lg mt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[#2bc196] font-semibold">Informações Visíveis:</p>
                <ul className="text-white/60 mt-2 space-y-1 list-disc list-inside">
                  <li>Ícone de empresa + Nome da empresa</li>
                  <li>Nome do contato</li>
                  <li>Badge de status no pipeline (colorido)</li>
                  <li>TPV mensal formatado como moeda</li>
                  <li>Ticket médio</li>
                  <li>Número de transações estimadas</li>
                  <li>Se tem parceiro atual (badge Sim/Não)</li>
                </ul>
              </div>
              <div>
                <p className="text-[#2bc196] font-semibold">Botões de Ação:</p>
                <ul className="text-white/60 mt-2 space-y-1 list-disc list-inside">
                  <li><Eye className="h-3 w-3 inline" /> Ver Detalhes - Abre modal com todas as informações</li>
                  <li><FileText className="h-3 w-3 inline" /> Gerar Proposta - Cria proposta pré-preenchida</li>
                  <li><Trash2 className="h-3 w-3 inline" /> Excluir - Remove o questionário (confirmação)</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">5.3 Modal de Detalhes</h3>
          <p className="text-white/70">
            Ao clicar em "Ver Detalhes", um modal exibe todas as informações do questionário organizadas em seções:
          </p>
          <ul className="text-white/60 text-sm mt-2 space-y-1 list-disc list-inside ml-4">
            <li>Dados completos do contato (nome, email, telefone, cargo)</li>
            <li>Dados da empresa (nome, tipo, modelo, produtos)</li>
            <li>Dados financeiros (TPV, ticket, transações)</li>
            <li>Informações do parceiro atual (se aplicável)</li>
            <li>Prazo de recebimento esperado</li>
            <li>Data de criação do registro</li>
          </ul>

          <h3 className="text-white font-bold text-lg mt-6">5.4 Exportação CSV</h3>
          <p className="text-white/70">
            O botão "Exportar CSV" gera um arquivo com todos os questionários filtrados, contendo as colunas:
            Empresa, Contato, Email, TPV, Ticket, Transações, Tem Parceiro, Taxa Atual, Status, Data.
          </p>
        </CardContent>
      </Card>

      {/* ==================== PÁGINA: CRIAÇÃO DE PROPOSTA ==================== */}
      <Card id="proposta-criacao" className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <FileText className="h-7 w-7" />
            6. Página: Criação de Proposta (Detalhado)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-white/60 text-sm">
              <strong className="text-white">Caminho de acesso:</strong> Menu lateral → Criar Proposta | ou | Dashboard → Nova Proposta | ou | Questionários → Gerar Proposta
            </p>
            <p className="text-white/60 text-sm mt-1">
              <strong className="text-white">Propósito:</strong> Configurar todos os parâmetros de pricing e gerar propostas profissionais automaticamente.
            </p>
          </div>

          <h3 className="text-white font-bold text-lg">6.1 Layout da Página</h3>
          <p className="text-white/70">
            A página é dividida em duas colunas:
          </p>
          <ul className="text-white/60 text-sm mt-2 space-y-1 list-disc list-inside ml-4">
            <li><strong>Coluna da esquerda (2/3):</strong> Formulários de configuração empilhados verticalmente</li>
            <li><strong>Coluna da direita (1/3):</strong> Preview em tempo real da taxa final (sticky - acompanha scroll)</li>
          </ul>

          <h3 className="text-white font-bold text-lg mt-6">6.2 Seção: Dados do Cliente</h3>
          <div className="bg-white/5 p-4 rounded-lg border-l-4 border-[#2bc196]">
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-white font-medium">Nome da Empresa *</span>
                <p className="text-white/50">Campo de texto. Nome comercial que aparecerá na proposta.</p>
                <p className="text-white/50">Se veio de questionário: preenchido automaticamente com company_name.</p>
              </div>
              <div>
                <span className="text-white font-medium">Nome do Contato *</span>
                <p className="text-white/50">Campo de texto. Pessoa responsável pela negociação.</p>
              </div>
              <div>
                <span className="text-white font-medium">Email do Contato *</span>
                <p className="text-white/50">Campo de texto com validação de formato email.</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">6.3 Seção: MCCs Aplicáveis</h3>
          <div className="bg-white/5 p-4 rounded-lg border-l-4 border-yellow-400">
            <p className="text-white/70 mb-3">
              Uma grade scrollável com todos os MCCs disponíveis (códigos de 4 dígitos). Clique para selecionar/deselecionar.
            </p>
            <p className="text-white/60 text-sm">
              <strong>Por que é importante:</strong> Os MCCs selecionados aparecem na proposta como disclaimer, indicando para quais categorias de negócio as taxas são válidas.
            </p>
            <p className="text-white/60 text-sm mt-2">
              <strong>Validação:</strong> É obrigatório selecionar pelo menos 1 MCC para criar a proposta.
            </p>
            <p className="text-white/60 text-sm mt-2">
              <strong>Contador:</strong> Um badge no título mostra quantos MCCs estão selecionados (ex: "3 selecionado(s)").
            </p>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">6.4 Seção: Taxa de Interchange</h3>
          <div className="bg-white/5 p-4 rounded-lg border-l-4 border-blue-400">
            <p className="text-white/70 mb-3">
              Esta é a seção mais crítica. Você seleciona qual base de interchange usar para o cálculo.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-[#2bc196] font-semibold text-sm">Opções de Seleção Rápida:</p>
                <ul className="text-white/60 text-xs mt-2 space-y-1">
                  <li><span className="text-blue-400">●</span> Visa - Menor / Média / Maior</li>
                  <li><span className="text-orange-400">●</span> Mastercard - Menor / Média / Maior</li>
                  <li><span className="text-[#2bc196]">●</span> Combinado - Menor / Média / Maior</li>
                  <li><span className="text-purple-400">●</span> Personalizado (via tabela)</li>
                </ul>
              </div>
              <div>
                <p className="text-[#2bc196] font-semibold text-sm">Botão "Ver Tabela Completa":</p>
                <p className="text-white/60 text-xs mt-2">
                  Abre um modal com a tabela completa de interchange de Visa e Mastercard. 
                  Cada linha tem um botão "Selecionar" que define essa taxa específica como personalizada.
                </p>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg mt-4">
              <p className="text-yellow-400 text-sm">
                <strong>💡 Dica:</strong> Use "Combinado Média" para uma estimativa balanceada entre Visa e Mastercard. 
                Use "Personalizado" quando souber exatamente a composição do mix de bandeiras do cliente.
              </p>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">6.5 Seção: Markup e Taxas Pagsmile</h3>
          <div className="bg-white/5 p-4 rounded-lg border-l-4 border-green-400">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-white font-medium">Custo Base Pagsmile</span>
                  <p className="text-white/50 text-xs">Fixo em 0.5% - não editável</p>
                </div>
                <span className="text-[#2bc196] font-bold">0.50%</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-white font-medium">Markup (%)</span>
                  <p className="text-white/50 text-xs">Margem de lucro adicional. Campo editável.</p>
                </div>
                <span className="text-white/50">Padrão: 0%</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-white font-medium">Gateway Fee (centavos USD)</span>
                  <p className="text-white/50 text-xs">Tarifa fixa por transação. Digite em centavos (ex: 15 = $0.15)</p>
                </div>
                <span className="text-white/50">Padrão: 0</span>
              </div>
            </div>

            <div className="bg-white/5 p-3 rounded-lg mt-4">
              <p className="text-[#2bc196] text-sm font-semibold">Fórmula de Cálculo:</p>
              <p className="text-white/70 text-sm mt-1">Taxa Final % = Interchange % + Custo Base (0.5%) + Markup %</p>
              <p className="text-white/70 text-sm">Fee Final = Interchange Fixo + Gateway Fee</p>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">6.6 Seção: Outras Taxas</h3>
          <div className="bg-white/5 p-4 rounded-lg border-l-4 border-red-400">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-white font-medium">Setup Fee (USD)</span>
                <p className="text-white/50 text-xs">Taxa única de configuração. Padrão: $0</p>
              </div>
              <div>
                <span className="text-white font-medium">Refund Fee (USD)</span>
                <p className="text-white/50 text-xs">Taxa por reembolso. Padrão: $1</p>
              </div>
              <div>
                <span className="text-white font-medium">Chargeback Fee (USD)</span>
                <p className="text-white/50 text-xs">Taxa por chargeback. Padrão: $15</p>
              </div>
              <div>
                <span className="text-white font-medium">Risk Control Fee (USD)</span>
                <p className="text-white/50 text-xs">Taxa de análise de risco. Padrão: $0.10</p>
              </div>
              <div>
                <span className="text-white font-medium">Rolling Reserve (%)</span>
                <p className="text-white/50 text-xs">Percentual retido. Padrão: 8%</p>
              </div>
              <div>
                <span className="text-white font-medium">Rolling Reserve (dias)</span>
                <p className="text-white/50 text-xs">Período de retenção. Padrão: 180</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-white font-medium">Prazo de Recebimento (Settlement)</span>
              <p className="text-white/50 text-xs">Select: D+2/D+3, D+7, D+15. Padrão: D+7</p>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">6.7 Preview em Tempo Real</h3>
          <div className="bg-gradient-to-br from-[#2bc196]/20 to-[#002443] border border-[#2bc196] p-4 rounded-lg">
            <p className="text-white/70 mb-3">
              O card de preview no lado direito atualiza em tempo real conforme você ajusta os parâmetros:
            </p>
            <ul className="text-white/60 text-sm space-y-2">
              <li><strong>Breakdown Percentual:</strong> Custo Base + Interchange + Markup = Taxa Total</li>
              <li><strong>Breakdown Fixo:</strong> Interchange Fixo + Gateway Fee = Fee Total</li>
              <li><strong>MCCs Selecionados:</strong> Lista com badges dos códigos selecionados</li>
              <li><strong>Botão "Gerar Proposta":</strong> Cria a proposta com todos os parâmetros</li>
            </ul>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">6.8 Processo de Criação</h3>
          <p className="text-white/70">
            Ao clicar em "Gerar Proposta", o sistema:
          </p>
          <ol className="text-white/60 text-sm mt-2 space-y-2 list-decimal list-inside ml-4">
            <li>Valida campos obrigatórios (nome, email, MCCs)</li>
            <li>Gera um token UUID único para o link público</li>
            <li>Define validade de 15 dias a partir da criação</li>
            <li>Cria registro na entidade Proposal com status "draft"</li>
            <li>Se veio de questionário, atualiza o status do questionário para "proposal_made"</li>
            <li>Redireciona para a Central de Propostas</li>
            <li>Exibe toast: "Proposta criada com sucesso!"</li>
          </ol>
        </CardContent>
      </Card>

      {/* ==================== PÁGINA: CENTRAL DE PROPOSTAS ==================== */}
      <Card id="proposta-center" className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <Building2 className="h-7 w-7" />
            7. Página: Central de Propostas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-white/60 text-sm">
              <strong className="text-white">Caminho de acesso:</strong> Menu lateral → Central de Propostas
            </p>
            <p className="text-white/60 text-sm mt-1">
              <strong className="text-white">Propósito:</strong> Gerenciar todas as propostas criadas - visualizar, editar, duplicar, copiar links e acompanhar status.
            </p>
          </div>

          <h3 className="text-white font-bold text-lg">7.1 Barra de Filtros</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div className="bg-white/5 p-3 rounded-lg">
              <span className="text-[#2bc196] text-sm font-semibold">🔍 Busca</span>
              <p className="text-white/50 text-xs mt-1">Por nome do cliente ou contato</p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <span className="text-[#2bc196] text-sm font-semibold">📊 Status</span>
              <p className="text-white/50 text-xs mt-1">Draft, Sent, Accepted, Counter, Rejected</p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <span className="text-[#2bc196] text-sm font-semibold">📅 Data Inicial</span>
              <p className="text-white/50 text-xs mt-1">Filtrar por data de criação (de)</p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <span className="text-[#2bc196] text-sm font-semibold">📅 Data Final</span>
              <p className="text-white/50 text-xs mt-1">Filtrar por data de criação (até)</p>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">7.2 Cards de Proposta</h3>
          <p className="text-white/70">
            Cada proposta é exibida como um card contendo:
          </p>
          <div className="bg-white/5 p-4 rounded-lg mt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[#2bc196] font-semibold">Informações:</p>
                <ul className="text-white/60 mt-2 space-y-1 list-disc list-inside">
                  <li>Nome do cliente + Nome do contato</li>
                  <li>Badge de status colorido</li>
                  <li>Taxa final: X.XX% + $X.XX</li>
                  <li>Lista de MCCs (até 5 + contador)</li>
                  <li>Data de validade</li>
                </ul>
              </div>
              <div>
                <p className="text-[#2bc196] font-semibold">7 Botões de Ação:</p>
                <ul className="text-white/60 mt-2 space-y-1 list-disc list-inside">
                  <li><Edit className="h-3 w-3 inline" /> Editar proposta</li>
                  <li><Eye className="h-3 w-3 inline" /> Ver detalhes (modal)</li>
                  <li><Copy className="h-3 w-3 inline" /> Duplicar proposta</li>
                  <li><History className="h-3 w-3 inline" /> Histórico de versões</li>
                  <li><LinkIcon className="h-3 w-3 inline" /> Copiar link público</li>
                  <li><Download className="h-3 w-3 inline" /> Ver proposta pública</li>
                  <li><Trash2 className="h-3 w-3 inline text-red-400" /> Excluir</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">7.3 Funcionalidades Especiais</h3>
          
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-[#2bc196] font-semibold">📋 Duplicar Proposta</h4>
              <p className="text-white/60 text-sm mt-2">
                Cria uma cópia exata da proposta com novo token, nova validade (15 dias), status "draft" e versão 1. 
                Útil para criar propostas similares para diferentes clientes ou testar variações.
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-[#2bc196] font-semibold">📜 Histórico de Versões</h4>
              <p className="text-white/60 text-sm mt-2">
                Quando você edita uma proposta e salva, o sistema mantém o histórico. 
                O modal de histórico mostra todas as versões anteriores com data, número da versão e notas de alteração.
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-[#2bc196] font-semibold">📊 Exportar CSV</h4>
              <p className="text-white/60 text-sm mt-2">
                Exporta todas as propostas filtradas em formato CSV com colunas: Cliente, Contato, Email, Taxa %, Fee Fixo, Status, Settlement, Criado em, Válido até.
              </p>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">7.4 Status das Propostas</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-center text-sm mt-4">
            <div className="bg-gray-500/20 p-3 rounded">
              <div className="text-gray-400 font-bold">Draft</div>
              <div className="text-white/50 text-xs">Rascunho, não enviada</div>
            </div>
            <div className="bg-blue-500/20 p-3 rounded">
              <div className="text-blue-400 font-bold">Sent</div>
              <div className="text-white/50 text-xs">Link compartilhado</div>
            </div>
            <div className="bg-green-500/20 p-3 rounded">
              <div className="text-green-400 font-bold">Accepted</div>
              <div className="text-white/50 text-xs">Cliente aceitou</div>
            </div>
            <div className="bg-yellow-500/20 p-3 rounded">
              <div className="text-yellow-400 font-bold">Counter</div>
              <div className="text-white/50 text-xs">Contraproposta</div>
            </div>
            <div className="bg-red-500/20 p-3 rounded">
              <div className="text-red-400 font-bold">Rejected</div>
              <div className="text-white/50 text-xs">Cliente recusou</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ==================== PÁGINA: PROPOSTA PÚBLICA ==================== */}
      <Card id="proposta-publica" className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <Globe className="h-7 w-7" />
            8. Página: Proposta Pública (Visão do Cliente)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-white/60 text-sm">
              <strong className="text-white">Caminho de acesso:</strong> Link único gerado para cada proposta (ex: /PublicProposal?token=abc-123-xyz)
            </p>
            <p className="text-white/60 text-sm mt-1">
              <strong className="text-white">Propósito:</strong> Permitir que o cliente visualize a proposta e responda (aceitar, contraproposta ou recusar).
            </p>
            <p className="text-white/60 text-sm mt-1">
              <strong className="text-white">Quem usa:</strong> O potencial cliente (merchant) que recebeu o link.
            </p>
          </div>

          <h3 className="text-white font-bold text-lg">8.1 Layout da Página</h3>
          <p className="text-white/70">
            Design profissional com fundo gradiente azul, logo Pagsmile, e um card branco central com todas as informações.
          </p>

          <h3 className="text-white font-bold text-lg mt-6">8.2 Alertas de Status</h3>
          <div className="space-y-3">
            <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg flex items-center gap-3">
              <Clock className="h-5 w-5 text-red-400" />
              <p className="text-red-300 text-sm">Se a proposta estiver expirada, aparece alerta vermelho informando a data de expiração.</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <p className="text-green-300 text-sm">Se já foi aceita, aparece alerta verde: "Esta proposta já foi aceita."</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg flex items-center gap-3">
              <RefreshCw className="h-5 w-5 text-yellow-400" />
              <p className="text-yellow-300 text-sm">Se tem contraproposta, aparece alerta amarelo: "Uma contraproposta foi enviada."</p>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg flex items-center gap-3">
              <XCircle className="h-5 w-5 text-red-400" />
              <p className="text-red-300 text-sm">Se foi rejeitada, aparece alerta vermelho: "Esta proposta foi recusada."</p>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">8.3 Conteúdo da Proposta</h3>
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-[#2bc196] font-semibold">Cabeçalho</h4>
              <p className="text-white/60 text-sm mt-2">Nome do cliente, nome do contato, email, data de validade.</p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-[#2bc196] font-semibold">⚠️ MCCs Aplicáveis (Disclaimer)</h4>
              <p className="text-white/60 text-sm mt-2">
                Box amarelo com aviso: "Esta proposta é válida apenas para os MCCs listados abaixo." 
                Lista de badges com os códigos MCC selecionados.
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-[#2bc196] font-semibold">💳 Tabela de Taxas de Processamento</h4>
              <p className="text-white/60 text-sm mt-2">
                Tabela com cabeçalho verde mostrando: Método de Pagamento, Descrição, Preço.
                Linhas: Credit/Debit Card (Visa, Mastercard), Digital Wallet (Apple Pay, Google Pay).
                Ambas mostram a taxa final: X.XX% + $X.XX
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-[#2bc196] font-semibold">💰 Outras Taxas</h4>
              <p className="text-white/60 text-sm mt-2">
                Grid 2x3 mostrando: Setup Fee, Gateway Fee, Refund Fee, Chargeback Fee, Risk Control Fee, Rolling Reserve (% e dias).
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-[#2bc196] font-semibold">⏱️ Prazo de Recebimento</h4>
              <p className="text-white/60 text-sm mt-2">
                Box informativo explicando o prazo de settlement em USD.
              </p>
            </div>

            <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
              <h4 className="text-yellow-400 font-semibold">⚠️ Disclaimer Final</h4>
              <p className="text-white/60 text-sm mt-2">
                Aviso legal: "As taxas apresentadas são estimativas e podem variar conforme análise de risco e volume real de transações."
              </p>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">8.4 Botões de Ação do Cliente</h3>
          <p className="text-white/70">
            Se a proposta não estiver expirada e ainda não tiver resposta, aparecem 3 botões:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-green-500/20 p-4 rounded-lg text-center">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h4 className="text-green-400 font-semibold">Aceitar Proposta</h4>
              <p className="text-white/50 text-xs mt-2">
                Clique único. Atualiza status para "accepted".
                Se houver questionário vinculado, atualiza pipeline para "proposal_accepted".
              </p>
            </div>

            <div className="bg-yellow-500/20 p-4 rounded-lg text-center">
              <RefreshCw className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <h4 className="text-yellow-400 font-semibold">Fazer Contraproposta</h4>
              <p className="text-white/50 text-xs mt-2">
                Abre modal com campos: Taxa proposta (%), Fee proposta ($), Settlement preferido, Observações.
                Salva os valores e atualiza status para "counter_proposal".
              </p>
            </div>

            <div className="bg-red-500/20 p-4 rounded-lg text-center">
              <XCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <h4 className="text-red-400 font-semibold">Recusar Proposta</h4>
              <p className="text-white/50 text-xs mt-2">
                Abre modal de confirmação: "Tem certeza? Esta ação não pode ser desfeita."
                Confirma e atualiza status para "rejected".
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ==================== PÁGINA: PIPELINE KANBAN ==================== */}
      <Card id="pipeline" className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <Kanban className="h-7 w-7" />
            9. Página: Pipeline Kanban
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-white/60 text-sm">
              <strong className="text-white">Caminho de acesso:</strong> Menu lateral → Pipeline
            </p>
            <p className="text-white/60 text-sm mt-1">
              <strong className="text-white">Propósito:</strong> Visualização Kanban do funil de vendas com drag-and-drop para mover leads entre estágios.
            </p>
          </div>

          <h3 className="text-white font-bold text-lg">9.1 KPIs Globais</h3>
          <p className="text-white/70">
            Na parte superior, 6 KPIs idênticos ao Dashboard: TPV Total, Receita Estimada, Total de Leads, TPV Ganho, TPV Perdido, Win Rate.
          </p>

          <h3 className="text-white font-bold text-lg mt-6">9.2 Colunas do Kanban</h3>
          <div className="grid grid-cols-5 gap-2 text-center text-xs mt-4">
            <div className="bg-gray-500/20 p-2 rounded">
              <div className="w-3 h-3 rounded-full bg-gray-500 mx-auto mb-1"></div>
              <div className="text-gray-400 font-bold">Leads</div>
              <div className="text-white/50">Novos contatos</div>
            </div>
            <div className="bg-blue-500/20 p-2 rounded">
              <div className="w-3 h-3 rounded-full bg-blue-500 mx-auto mb-1"></div>
              <div className="text-blue-400 font-bold">Proposta Enviada</div>
              <div className="text-white/50">Aguardando</div>
            </div>
            <div className="bg-green-500/20 p-2 rounded">
              <div className="w-3 h-3 rounded-full bg-green-500 mx-auto mb-1"></div>
              <div className="text-green-400 font-bold">Aceita</div>
              <div className="text-white/50">Deal fechado</div>
            </div>
            <div className="bg-yellow-500/20 p-2 rounded">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mx-auto mb-1"></div>
              <div className="text-yellow-400 font-bold">Contraproposta</div>
              <div className="text-white/50">Negociando</div>
            </div>
            <div className="bg-red-500/20 p-2 rounded">
              <div className="w-3 h-3 rounded-full bg-red-500 mx-auto mb-1"></div>
              <div className="text-red-400 font-bold">Perdida</div>
              <div className="text-white/50">Não converteu</div>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">9.3 Métricas por Coluna</h3>
          <p className="text-white/70">
            Cada coluna mostra: contagem de itens (badge), TPV total da coluna, e receita estimada (1% do TPV).
          </p>

          <h3 className="text-white font-bold text-lg mt-6">9.4 Cards Draggáveis</h3>
          <p className="text-white/70">
            Cada lead é um card que pode ser arrastado entre colunas. O card mostra:
          </p>
          <ul className="text-white/60 text-sm mt-2 space-y-1 list-disc list-inside ml-4">
            <li>Ícone de empresa + Nome da empresa</li>
            <li>Nome do contato</li>
            <li>TPV mensal</li>
          </ul>

          <h3 className="text-white font-bold text-lg mt-6">9.5 Drag and Drop</h3>
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-white/70">
              <strong>Como funciona:</strong> Clique e segure um card, arraste para outra coluna e solte. 
              O sistema atualiza automaticamente o campo pipeline_status do questionário no banco de dados.
            </p>
            <p className="text-white/60 text-sm mt-2">
              <strong>Feedback visual:</strong> Durante o arraste, a coluna de destino fica destacada com borda verde. 
              O card mostra uma sombra e borda verde enquanto está sendo arrastado.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ==================== PÁGINA: SIMULADOR DE RECEITA ==================== */}
      <Card id="simulador" className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <Calculator className="h-7 w-7" />
            10. Página: Simulador de Receita
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-white/60 text-sm">
              <strong className="text-white">Caminho de acesso:</strong> Menu lateral → Simulador de Receita
            </p>
            <p className="text-white/60 text-sm mt-1">
              <strong className="text-white">Propósito:</strong> Simular cenários de receita com diferentes volumes e taxas para análise financeira e planejamento.
            </p>
          </div>

          <h3 className="text-white font-bold text-lg">10.1 Parâmetros de Entrada (Coluna Esquerda)</h3>
          
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-[#2bc196] font-semibold flex items-center gap-2">
                <DollarSign className="h-4 w-4" /> Card: Volume
              </h4>
              <ul className="text-white/60 text-sm mt-2 space-y-1 list-disc list-inside">
                <li><strong>TPV Mensal (USD):</strong> Campo + Slider (0 a 5.000.000, step 10.000)</li>
                <li><strong>Ticket Médio (USD):</strong> Campo numérico</li>
                <li><strong>Transações Estimadas:</strong> Calculado automaticamente (TPV ÷ Ticket) - exibido como info</li>
              </ul>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-[#2bc196] font-semibold flex items-center gap-2">
                <Percent className="h-4 w-4" /> Card: Taxas
              </h4>
              <ul className="text-white/60 text-sm mt-2 space-y-1 list-disc list-inside">
                <li><strong>Taxa Cobrada (%):</strong> Campo + Slider (0 a 10%, step 0.1)</li>
                <li><strong>Fee Fixo (USD):</strong> Campo numérico</li>
                <li><strong>Interchange (%):</strong> Campo numérico</li>
                <li><strong>Custo Base Pagsmile (%):</strong> Campo numérico</li>
              </ul>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-[#2bc196] font-semibold flex items-center gap-2">
                <CreditCard className="h-4 w-4" /> Card: Chargebacks & Refunds
              </h4>
              <ul className="text-white/60 text-sm mt-2 space-y-1 list-disc list-inside">
                <li><strong>Chargeback Rate (%):</strong> Percentual de transações com chargeback</li>
                <li><strong>Chargeback Fee (USD):</strong> Custo por chargeback</li>
                <li><strong>Refund Rate (%):</strong> Percentual de reembolsos</li>
                <li><strong>Refund Fee (USD):</strong> Custo por reembolso</li>
              </ul>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">10.2 Resultados (Coluna Direita)</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#2bc196]/20 p-3 rounded-lg text-center">
                <p className="text-white/60 text-xs">Receita Bruta</p>
                <p className="text-[#2bc196] font-bold">mensal</p>
              </div>
              <div className="bg-red-500/20 p-3 rounded-lg text-center">
                <p className="text-white/60 text-xs">Custos Totais</p>
                <p className="text-red-400 font-bold">mensal</p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-lg text-center">
                <p className="text-white/60 text-xs">Receita Líquida</p>
                <p className="text-green-400 font-bold">mensal</p>
              </div>
              <div className="bg-purple-500/20 p-3 rounded-lg text-center">
                <p className="text-white/60 text-xs">Margem</p>
                <p className="text-purple-400 font-bold">%</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#2bc196]/30 to-[#002443] border border-[#2bc196] p-4 rounded-lg">
              <h4 className="text-[#2bc196] font-semibold flex items-center gap-2">
                <PiggyBank className="h-5 w-5" /> Projeção de Receita Líquida Anual
              </h4>
              <p className="text-white/60 text-sm mt-2">
                Destaque grande mostrando Receita Líquida × 12 meses.
              </p>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">10.3 Gráficos</h3>
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-[#2bc196] font-semibold">📈 Projeção Anual (com 5% crescimento/mês)</h4>
              <p className="text-white/60 text-sm mt-2">
                Gráfico de área mostrando receita mensal e acumulada ao longo de 12 meses, assumindo crescimento de 5% ao mês.
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-[#2bc196] font-semibold">📊 Breakdown de Custos</h4>
              <p className="text-white/60 text-sm mt-2">
                Gráfico de barras horizontais mostrando: Interchange, Custo Base, Chargebacks, Refunds.
                Abaixo, 4 boxes com valores numéricos de cada componente.
              </p>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">10.4 Fórmulas de Cálculo</h3>
          <div className="bg-white/5 p-4 rounded-lg font-mono text-sm">
            <p className="text-[#2bc196]">// Receita Bruta</p>
            <p className="text-white/70">grossRevenue = (TPV × rate%) + (transactions × fixedFee)</p>
            <p className="text-[#2bc196] mt-2">// Custos</p>
            <p className="text-white/70">interchangeCost = TPV × interchange%</p>
            <p className="text-white/70">baseCost = TPV × baseCost%</p>
            <p className="text-white/70">chargebackCost = (transactions × cbRate%) × cbFee</p>
            <p className="text-white/70">refundCost = (transactions × refundRate%) × refundFee</p>
            <p className="text-[#2bc196] mt-2">// Receita Líquida</p>
            <p className="text-white/70">netRevenue = grossRevenue - totalCosts</p>
            <p className="text-white/70">margin% = (netRevenue / grossRevenue) × 100</p>
          </div>
        </CardContent>
      </Card>

      {/* ==================== PÁGINA: TABELA DE INTERCHANGE ==================== */}
      <Card id="interchange" className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <Table2 className="h-7 w-7" />
            11. Página: Tabela de Interchange
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-white/60 text-sm">
              <strong className="text-white">Caminho de acesso:</strong> Menu lateral → Taxas de Interchange
            </p>
            <p className="text-white/60 text-sm mt-1">
              <strong className="text-white">Propósito:</strong> Consulta completa das taxas de interchange para transações Card Not Present (CNP) nos EUA.
            </p>
          </div>

          <h3 className="text-white font-bold text-lg">11.1 Abas da Página</h3>
          <div className="flex gap-2 mt-4">
            <div className="bg-[#2bc196] px-4 py-2 rounded-lg text-[#002443] font-semibold">Resumo</div>
            <div className="bg-white/10 px-4 py-2 rounded-lg text-white/70">Visa</div>
            <div className="bg-white/10 px-4 py-2 rounded-lg text-white/70">Mastercard</div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">11.2 Aba: Resumo</h3>
          <p className="text-white/70">
            Três cards lado a lado mostrando estatísticas resumidas:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-blue-400 font-semibold mb-3">💳 Visa</h4>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-green-500/10 p-2 rounded">
                  <p className="text-green-400">MENOR</p>
                  <p className="text-white font-bold">X.XX%</p>
                  <p className="text-white/50">$X.XX</p>
                </div>
                <div className="bg-yellow-500/10 p-2 rounded">
                  <p className="text-yellow-400">MÉDIA</p>
                  <p className="text-white font-bold">X.XX%</p>
                  <p className="text-white/50">$X.XX</p>
                </div>
                <div className="bg-red-500/10 p-2 rounded">
                  <p className="text-red-400">MAIOR</p>
                  <p className="text-white font-bold">X.XX%</p>
                  <p className="text-white/50">$X.XX</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-orange-400 font-semibold mb-3">💳 Mastercard</h4>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-green-500/10 p-2 rounded">
                  <p className="text-green-400">MENOR</p>
                  <p className="text-white font-bold">X.XX%</p>
                  <p className="text-white/50">$X.XX</p>
                </div>
                <div className="bg-yellow-500/10 p-2 rounded">
                  <p className="text-yellow-400">MÉDIA</p>
                  <p className="text-white font-bold">X.XX%</p>
                  <p className="text-white/50">$X.XX</p>
                </div>
                <div className="bg-red-500/10 p-2 rounded">
                  <p className="text-red-400">MAIOR</p>
                  <p className="text-white font-bold">X.XX%</p>
                  <p className="text-white/50">$X.XX</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-[#2bc196] font-semibold mb-3">💳 Combinado</h4>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-green-500/10 p-2 rounded">
                  <p className="text-green-400">MENOR</p>
                  <p className="text-white font-bold">X.XX%</p>
                  <p className="text-white/50">$X.XX</p>
                </div>
                <div className="bg-yellow-500/10 p-2 rounded">
                  <p className="text-yellow-400">MÉDIA</p>
                  <p className="text-white font-bold">X.XX%</p>
                  <p className="text-white/50">$X.XX</p>
                </div>
                <div className="bg-red-500/10 p-2 rounded">
                  <p className="text-red-400">MAIOR</p>
                  <p className="text-white font-bold">X.XX%</p>
                  <p className="text-white/50">$X.XX</p>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">11.3 Aba: Visa / Mastercard</h3>
          <p className="text-white/70">
            Tabela completa com todas as taxas de interchange da bandeira, contendo colunas:
          </p>
          <ul className="text-white/60 text-sm mt-2 space-y-1 list-disc list-inside ml-4">
            <li><strong>Programa:</strong> Nome do programa (ex: CPS/CNP, Recurring, Merit I)</li>
            <li><strong>Tipo de Cartão:</strong> Badge com categoria (ex: Consumer Credit, Business, World Elite)</li>
            <li><strong>Taxa (%):</strong> Valor percentual</li>
            <li><strong>Fixo (USD):</strong> Valor fixo por transação</li>
          </ul>

          <h3 className="text-white font-bold text-lg mt-6">11.4 Legenda</h3>
          <div className="bg-white/5 p-4 rounded-lg">
            <ul className="text-white/60 text-sm space-y-2">
              <li><span className="text-green-400">● Menor:</span> A taxa mais baixa disponível para cada bandeira.</li>
              <li><span className="text-yellow-400">● Média:</span> A média aritmética de todas as taxas de cada bandeira.</li>
              <li><span className="text-red-400">● Maior:</span> A taxa mais alta disponível para cada bandeira.</li>
              <li><span className="text-[#2bc196]">● Combinado:</span> Média ponderada entre Visa e Mastercard para cada categoria.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* ==================== DICAS E BOAS PRÁTICAS ==================== */}
      <Card id="dicas" className="bg-gradient-to-br from-[#2bc196]/20 to-[#002443] border-[#2bc196]">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <Lightbulb className="h-7 w-7" />
            12. Dicas e Boas Práticas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="text-white/80 space-y-3">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#2bc196] flex-shrink-0 mt-0.5" />
              <span><strong>Verifique os MCCs:</strong> Sempre confirme os MCCs corretos do merchant antes de criar a proposta. MCCs incorretos podem invalidar a proposta.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#2bc196] flex-shrink-0 mt-0.5" />
              <span><strong>Use o simulador:</strong> Antes de enviar uma proposta, simule a receita para garantir que a margem é adequada para o volume do cliente.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#2bc196] flex-shrink-0 mt-0.5" />
              <span><strong>Mantenha o pipeline atualizado:</strong> Mova os cards no Kanban conforme a negociação avança para ter visibilidade real do funil.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#2bc196] flex-shrink-0 mt-0.5" />
              <span><strong>Analise contrapropostas:</strong> Quando receber uma contraproposta, revise os valores sugeridos no modal de detalhes da proposta.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#2bc196] flex-shrink-0 mt-0.5" />
              <span><strong>Duplique propostas:</strong> Use a função de duplicar para criar rapidamente propostas similares para diferentes clientes.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#2bc196] flex-shrink-0 mt-0.5" />
              <span><strong>Exporte relatórios:</strong> Use a exportação CSV periodicamente para relatórios gerenciais e análise de performance.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#2bc196] flex-shrink-0 mt-0.5" />
              <span><strong>Acompanhe a validade:</strong> Propostas têm validade de 15 dias. Renove ou duplique propostas expiradas se necessário.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#2bc196] flex-shrink-0 mt-0.5" />
              <span><strong>Use o histórico:</strong> Consulte o histórico de versões para entender a evolução de uma negociação.</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center py-8">
        <p className="text-white/40 text-sm">
          Pagsmile Pricing Tool - Documentação v2.0 | Última atualização: Janeiro 2026
        </p>
      </div>
    </div>
  );
}