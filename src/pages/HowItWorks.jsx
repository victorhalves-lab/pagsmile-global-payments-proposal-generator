import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  ClipboardList, 
  FileText, 
  Send, 
  CheckCircle, 
  XCircle, 
  RefreshCw,
  Kanban,
  Calculator,
  Table2,
  LayoutDashboard,
  ArrowRight,
  ArrowDown,
  Users,
  Link as LinkIcon,
  Copy,
  Eye,
  Edit,
  Trash2,
  History,
  CopyPlus,
  Filter,
  FileDown,
  DollarSign,
  Percent,
  TrendingUp,
  Globe,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function HowItWorks() {
  const { t, i18n } = useTranslation();
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    flow1: true,
    flow2: true,
    pages: true,
    features: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const isPortuguese = i18n.language === 'pt';

  const content = {
    pt: {
      title: "Como Funciona",
      subtitle: "Guia completo de todas as funcionalidades e fluxos da plataforma Pagsmile Pricing Tool",
      
      overviewTitle: "Visão Geral da Plataforma",
      overviewDesc: "O Pagsmile Pricing Tool é uma ferramenta completa para gestão de propostas comerciais de processamento de pagamentos. A plataforma permite criar propostas personalizadas com cálculo automático de taxas baseado em interchange, gerenciar leads através de questionários, acompanhar o pipeline de vendas e simular receitas.",
      
      mainObjectives: "Objetivos Principais",
      objectives: [
        "Automatizar o cálculo de taxas de processamento de pagamentos",
        "Gerenciar todo o ciclo de vida de propostas comerciais",
        "Capturar e qualificar leads através de questionários",
        "Acompanhar o pipeline de vendas em tempo real",
        "Simular receitas potenciais com diferentes cenários"
      ],

      flow1Title: "Fluxo 1: Captação via Questionário",
      flow1Subtitle: "Processo completo desde o preenchimento do questionário até a conversão",
      flow1Steps: [
        {
          title: "1. Compartilhamento do Link",
          icon: LinkIcon,
          color: "bg-blue-500",
          description: "O processo começa quando um membro da equipe comercial compartilha o link do questionário com um potencial cliente.",
          details: [
            "O link do questionário está disponível na sidebar do sistema",
            "Basta clicar em 'Copiar Link' para copiar o URL",
            "O link pode ser enviado por email, WhatsApp, LinkedIn, etc.",
            "É uma página pública que não requer login"
          ]
        },
        {
          title: "2. Preenchimento do Questionário",
          icon: ClipboardList,
          color: "bg-purple-500",
          description: "O potencial cliente acessa o link e preenche o formulário com informações sobre sua empresa e necessidades.",
          details: [
            "Dados de Contato: Nome, email, telefone (com código do país), cargo",
            "Dados da Empresa: Nome, tipo de negócio, modelo de negócio, produtos/serviços",
            "Dados Financeiros: TPV mensal estimado, ticket médio (o volume de transações é calculado automaticamente)",
            "Parceiro Atual: Se já possui parceiro de pagamentos, qual a taxa e fee atuais",
            "Expectativas: Prazo de recebimento desejado (D+2/D+3, D+7 ou D+15)"
          ]
        },
        {
          title: "3. Recebimento e Análise",
          icon: Eye,
          color: "bg-green-500",
          description: "O questionário preenchido aparece na Central de Questionários para análise da equipe comercial.",
          details: [
            "O questionário entra automaticamente com status 'Leads' no pipeline",
            "A equipe pode visualizar todos os detalhes do questionário",
            "É possível filtrar por status, TPV, se possui parceiro atual",
            "Os dados podem ser exportados para CSV para análise externa"
          ]
        },
        {
          title: "4. Geração da Proposta",
          icon: FileText,
          color: "bg-orange-500",
          description: "A partir do questionário, a equipe pode gerar uma proposta comercial personalizada.",
          details: [
            "Clique em 'Gerar Proposta' no card do questionário",
            "Os dados do cliente são pré-preenchidos automaticamente",
            "Selecione os MCCs aplicáveis ao tipo de negócio",
            "Escolha o tipo de interchange (Visa, Mastercard ou combinado)",
            "Defina o markup da Pagsmile e taxas adicionais",
            "O sistema calcula automaticamente a taxa final"
          ]
        },
        {
          title: "5. Envio da Proposta",
          icon: Send,
          color: "bg-cyan-500",
          description: "A proposta é criada com um link público único que pode ser compartilhado com o cliente.",
          details: [
            "Cada proposta tem um token único para acesso público",
            "O link pode ser copiado e enviado ao cliente",
            "O cliente pode visualizar todos os detalhes da proposta",
            "A proposta tem uma data de validade configurável"
          ]
        },
        {
          title: "6. Resposta do Cliente",
          icon: CheckCircle,
          color: "bg-emerald-500",
          description: "O cliente acessa o link e pode aceitar, recusar ou fazer uma contraproposta.",
          details: [
            "ACEITAR: A proposta é marcada como aceita e o pipeline é atualizado",
            "RECUSAR: A proposta é marcada como recusada e o lead é movido para 'Proposta Perdida'",
            "CONTRAPROPOSTA: O cliente pode sugerir nova taxa, fee e prazo de recebimento",
            "Todas as ações são registradas e visíveis no sistema"
          ]
        },
        {
          title: "7. Acompanhamento no Pipeline",
          icon: Kanban,
          color: "bg-pink-500",
          description: "Todo o processo pode ser acompanhado visualmente no Pipeline Kanban.",
          details: [
            "Leads: Questionários recebidos aguardando análise",
            "Proposta Enviada: Propostas enviadas aguardando resposta",
            "Proposta Aceita: Deals fechados com sucesso",
            "Contraproposta: Negociações em andamento",
            "Proposta Perdida: Leads que não converteram"
          ]
        }
      ],

      flow2Title: "Fluxo 2: Criação Direta de Proposta",
      flow2Subtitle: "Processo para criar propostas sem questionário prévio",
      flow2Steps: [
        {
          title: "1. Acesso à Criação",
          icon: FileText,
          color: "bg-blue-500",
          description: "Inicie uma nova proposta diretamente pelo menu 'Criar Proposta' ou pelo Dashboard.",
          details: [
            "Clique em 'Criar Proposta' na sidebar",
            "Ou clique no botão 'Nova Proposta' no Dashboard",
            "Ou clique em 'Nova Proposta' na Central de Propostas"
          ]
        },
        {
          title: "2. Informações do Cliente",
          icon: Users,
          color: "bg-purple-500",
          description: "Preencha manualmente os dados do cliente e empresa.",
          details: [
            "Nome do cliente/empresa",
            "Nome do contato principal",
            "Email do contato (para onde será enviado o link)"
          ]
        },
        {
          title: "3. Seleção de MCCs",
          icon: Table2,
          color: "bg-green-500",
          description: "Selecione os códigos MCC (Merchant Category Code) aplicáveis ao negócio.",
          details: [
            "MCCs definem a categoria do comerciante",
            "Importantes para compliance e análise de risco",
            "A proposta só é válida para os MCCs selecionados",
            "Múltiplos MCCs podem ser selecionados"
          ]
        },
        {
          title: "4. Configuração de Interchange",
          icon: Percent,
          color: "bg-orange-500",
          description: "Escolha a base de cálculo do interchange para a proposta.",
          details: [
            "Visa Low/Avg/High: Usa taxas Visa (menor, média ou maior)",
            "Mastercard Low/Avg/High: Usa taxas Mastercard",
            "Combinado Low/Avg/High: Média entre Visa e Mastercard",
            "Customizado: Defina manualmente a taxa e tarifa fixa",
            "Veja a tabela completa clicando em 'Ver Tabela de Interchange'"
          ]
        },
        {
          title: "5. Markup e Taxas",
          icon: DollarSign,
          color: "bg-cyan-500",
          description: "Configure o markup Pagsmile e todas as taxas adicionais.",
          details: [
            "Markup Percentual: Margem percentual da Pagsmile",
            "Gateway Fee: Tarifa fixa por transação (em centavos USD)",
            "Setup Fee: Taxa única de configuração",
            "Refund Fee: Taxa por reembolso processado",
            "Chargeback Fee: Taxa por chargeback",
            "Risk Control Fee: Taxa de controle de risco",
            "Rolling Reserve: Percentual e dias de retenção",
            "Settlement Days: Prazo de recebimento"
          ]
        },
        {
          title: "6. Preview e Criação",
          icon: Eye,
          color: "bg-emerald-500",
          description: "Visualize o breakdown completo das taxas antes de criar.",
          details: [
            "O sistema mostra em tempo real o cálculo:",
            "Custo Base Pagsmile (fixo 0.5%)",
            "+ Interchange (baseado na seleção)",
            "+ Markup Pagsmile",
            "= Taxa Final Percentual",
            "Fee Fixo = Interchange Fixo + Gateway Fee",
            "Defina a data de validade da proposta",
            "Clique em 'Criar Proposta' para finalizar"
          ]
        },
        {
          title: "7. Gestão da Proposta",
          icon: Edit,
          color: "bg-pink-500",
          description: "Após criada, a proposta pode ser gerenciada de várias formas.",
          details: [
            "Editar: Altere qualquer informação da proposta",
            "Visualizar: Veja todos os detalhes",
            "Duplicar: Crie uma cópia para outro cliente",
            "Histórico: Veja versões anteriores da proposta",
            "Copiar Link: Copie o link público para enviar",
            "Ver Proposta: Abra a visualização pública",
            "Excluir: Remova a proposta do sistema"
          ]
        }
      ],

      pagesTitle: "Páginas e Funcionalidades",
      pagesSubtitle: "Descrição detalhada de cada página do sistema",
      pages: [
        {
          name: "Dashboard",
          icon: LayoutDashboard,
          color: "bg-blue-500",
          description: "Visão geral de performance e métricas principais.",
          features: [
            "KPIs em tempo real: TPV Total, Receita Estimada, Total de Leads",
            "TPV Ganho vs TPV Perdido para análise de conversão",
            "Taxa de conversão (Win Rate) calculada automaticamente",
            "Lista das propostas mais recentes com status",
            "Lista dos questionários mais recentes com status no pipeline",
            "Ações rápidas para criar proposta, acessar pipeline e interchange"
          ]
        },
        {
          name: "Criar Proposta",
          icon: FileText,
          color: "bg-green-500",
          description: "Formulário completo para criação de propostas comerciais.",
          features: [
            "Formulário de dados do cliente com validação",
            "Seletor de MCCs com busca e múltipla seleção",
            "Configurador de interchange com 10 opções pré-definidas + customizado",
            "Modal com tabela completa de taxas Visa e Mastercard",
            "Campos para todas as taxas adicionais com valores padrão",
            "Preview em tempo real do breakdown de taxas",
            "Seletor de prazo de recebimento e data de validade"
          ]
        },
        {
          name: "Central de Propostas",
          icon: ClipboardList,
          color: "bg-purple-500",
          description: "Gestão centralizada de todas as propostas.",
          features: [
            "Grid de cards com todas as propostas",
            "Filtros por texto (cliente/contato), status e período",
            "Badge de status com cores diferenciadas",
            "Exibição da taxa final e MCCs em cada card",
            "7 ações por proposta: Editar, Ver, Duplicar, Histórico, Copiar Link, Abrir, Excluir",
            "Modal de detalhes com todas as informações",
            "Modal de histórico de versões",
            "Exportação para CSV",
            "Visualização de contrapropostas recebidas"
          ]
        },
        {
          name: "Questionários",
          icon: ClipboardList,
          color: "bg-orange-500",
          description: "Central de gestão dos questionários recebidos.",
          features: [
            "Lista de todos os questionários com informações principais",
            "Filtros por texto, status no pipeline, TPV e parceiro atual",
            "Badge de status do pipeline com cores",
            "TPV e ticket médio exibidos em cada card",
            "Ações: Ver detalhes, Gerar Proposta, Excluir",
            "Modal com todos os detalhes do questionário",
            "Botão direto para gerar proposta pré-preenchida",
            "Exportação para CSV"
          ]
        },
        {
          name: "Pipeline Kanban",
          icon: Kanban,
          color: "bg-pink-500",
          description: "Visualização e gestão do funil de vendas.",
          features: [
            "5 colunas: Leads, Proposta Enviada, Proposta Aceita, Contraproposta, Proposta Perdida",
            "Drag and drop para mover cards entre colunas",
            "KPIs globais: TPV Total, Total de Leads, Win Rate",
            "KPIs por coluna: quantidade e TPV de cada etapa",
            "Cards com nome da empresa, contato, email, TPV e ticket médio",
            "Atualização automática do status ao arrastar"
          ]
        },
        {
          name: "Simulador de Receita",
          icon: Calculator,
          color: "bg-cyan-500",
          description: "Ferramenta para simular receitas com diferentes cenários.",
          features: [
            "Parâmetros de entrada: TPV mensal, ticket médio, taxa %, fee fixo",
            "Configuração de interchange e custo base",
            "Configuração de chargebacks e refunds (taxa e fee)",
            "Cálculo automático de: Receita Bruta, Custos, Receita Líquida, Margem",
            "Projeção de receita líquida anual",
            "Gráfico de projeção anual com crescimento de 5%/mês",
            "Gráfico de breakdown de custos (Interchange, Base, Chargebacks, Refunds)",
            "Sliders interativos para ajuste rápido de valores"
          ]
        },
        {
          name: "Taxas de Interchange",
          icon: Table2,
          color: "bg-amber-500",
          description: "Tabela completa de taxas de interchange.",
          features: [
            "Aba Resumo: Cards com taxa menor, média e maior de Visa, Mastercard e Combinado",
            "Aba Visa: Tabela completa com todos os programas Visa Card Not Present",
            "Aba Mastercard: Tabela completa com todos os programas Mastercard Card Not Present",
            "Colunas: Programa, Tipo de Cartão, Taxa %, Taxa Fixa USD",
            "Legenda explicando cada categoria de taxa"
          ]
        },
        {
          name: "Proposta Pública",
          icon: Globe,
          color: "bg-emerald-500",
          description: "Página pública para o cliente visualizar e responder à proposta.",
          features: [
            "Acesso sem login via token único",
            "Cabeçalho com logo Pagsmile e dados do cliente",
            "Aviso de MCCs aplicáveis com lista completa",
            "Tabela de Payment Processing Fee (Card, Wallet)",
            "Grid de Other Fees (Setup, Gateway, Refund, Chargeback, Risk, Rolling Reserve)",
            "Seção Settlement com prazo de recebimento",
            "Disclaimer sobre aprovação de compliance",
            "3 botões de ação: Aceitar (verde), Contraproposta (amarelo), Recusar (vermelho)",
            "Modal de contraproposta com campos para nova taxa, fee, prazo e observações",
            "Modal de confirmação de recusa",
            "Alertas de status (expirada, já aceita, já recusada, contraproposta enviada)"
          ]
        },
        {
          name: "Formulário Questionário",
          icon: ClipboardList,
          color: "bg-violet-500",
          description: "Formulário público para potenciais clientes.",
          features: [
            "Acesso sem login - página pública",
            "Seção Dados do Contato: Nome, email, telefone com código país, cargo",
            "Seção Dados da Empresa: Nome, tipo, modelo de negócio, produtos/serviços",
            "Seção Dados Financeiros: TPV mensal, ticket médio, cálculo automático de transações",
            "Seção Parceiro Atual: Se possui, quais as taxas atuais",
            "Seção Expectativas: Prazo de recebimento desejado",
            "Tela de sucesso após envio com mensagem de agradecimento"
          ]
        }
      ],

      featuresTitle: "Funcionalidades Adicionais",
      featuresSubtitle: "Recursos extras disponíveis na plataforma",
      features: [
        {
          name: "Internacionalização (i18n)",
          description: "Todo o sistema está disponível em Português e Inglês. O seletor de idioma está na sidebar."
        },
        {
          name: "Versionamento de Propostas",
          description: "Cada alteração em uma proposta cria uma nova versão. O histórico completo pode ser visualizado."
        },
        {
          name: "Duplicação de Propostas",
          description: "Propostas podem ser duplicadas para criar novas com base em configurações existentes."
        },
        {
          name: "Exportação CSV",
          description: "Tanto propostas quanto questionários podem ser exportados para análise em planilhas."
        },
        {
          name: "Filtros Avançados",
          description: "Todas as listas possuem filtros por texto, status, data e campos específicos."
        },
        {
          name: "Cálculo Automático",
          description: "Taxas finais, volume de transações e métricas são calculados automaticamente."
        },
        {
          name: "Links Públicos",
          description: "Propostas e questionários têm páginas públicas acessíveis sem login."
        },
        {
          name: "Pipeline Visual",
          description: "Kanban com drag and drop para gestão visual do funil de vendas."
        }
      ],

      tipsTitle: "Dicas de Uso",
      tips: [
        "Sempre verifique os MCCs corretos antes de enviar uma proposta",
        "Use o Simulador de Receita para validar cenários antes de propor taxas",
        "Acompanhe o Pipeline diariamente para não perder oportunidades",
        "Exporte relatórios periodicamente para análise de performance",
        "Use a duplicação para criar propostas similares rapidamente",
        "Mantenha propostas com datas de validade curtas para criar urgência"
      ]
    },
    en: {
      title: "How It Works",
      subtitle: "Complete guide to all features and flows of the Pagsmile Pricing Tool platform",
      
      overviewTitle: "Platform Overview",
      overviewDesc: "The Pagsmile Pricing Tool is a comprehensive tool for managing commercial proposals for payment processing. The platform allows you to create customized proposals with automatic rate calculation based on interchange, manage leads through questionnaires, track the sales pipeline, and simulate revenues.",
      
      mainObjectives: "Main Objectives",
      objectives: [
        "Automate payment processing rate calculations",
        "Manage the entire lifecycle of commercial proposals",
        "Capture and qualify leads through questionnaires",
        "Track the sales pipeline in real-time",
        "Simulate potential revenues with different scenarios"
      ],

      flow1Title: "Flow 1: Lead Capture via Questionnaire",
      flow1Subtitle: "Complete process from questionnaire submission to conversion",
      flow1Steps: [
        {
          title: "1. Link Sharing",
          icon: LinkIcon,
          color: "bg-blue-500",
          description: "The process begins when a sales team member shares the questionnaire link with a potential client.",
          details: [
            "The questionnaire link is available in the system sidebar",
            "Simply click 'Copy Link' to copy the URL",
            "The link can be sent via email, WhatsApp, LinkedIn, etc.",
            "It's a public page that doesn't require login"
          ]
        },
        {
          title: "2. Questionnaire Completion",
          icon: ClipboardList,
          color: "bg-purple-500",
          description: "The potential client accesses the link and fills out the form with information about their company and needs.",
          details: [
            "Contact Data: Name, email, phone (with country code), role",
            "Company Data: Name, business type, business model, products/services",
            "Financial Data: Estimated monthly TPV, average ticket (transaction volume is calculated automatically)",
            "Current Partner: If they have a payment partner, current rates and fees",
            "Expectations: Desired settlement period (D+2/D+3, D+7 or D+15)"
          ]
        },
        {
          title: "3. Receipt and Analysis",
          icon: Eye,
          color: "bg-green-500",
          description: "The completed questionnaire appears in the Questionnaire Center for sales team analysis.",
          details: [
            "The questionnaire automatically enters with 'Leads' status in the pipeline",
            "The team can view all questionnaire details",
            "Filtering by status, TPV, and current partner is possible",
            "Data can be exported to CSV for external analysis"
          ]
        },
        {
          title: "4. Proposal Generation",
          icon: FileText,
          color: "bg-orange-500",
          description: "From the questionnaire, the team can generate a customized commercial proposal.",
          details: [
            "Click 'Generate Proposal' on the questionnaire card",
            "Client data is automatically pre-filled",
            "Select applicable MCCs for the business type",
            "Choose the interchange type (Visa, Mastercard or combined)",
            "Define Pagsmile markup and additional fees",
            "The system automatically calculates the final rate"
          ]
        },
        {
          title: "5. Proposal Sending",
          icon: Send,
          color: "bg-cyan-500",
          description: "The proposal is created with a unique public link that can be shared with the client.",
          details: [
            "Each proposal has a unique token for public access",
            "The link can be copied and sent to the client",
            "The client can view all proposal details",
            "The proposal has a configurable expiration date"
          ]
        },
        {
          title: "6. Client Response",
          icon: CheckCircle,
          color: "bg-emerald-500",
          description: "The client accesses the link and can accept, reject, or make a counter proposal.",
          details: [
            "ACCEPT: The proposal is marked as accepted and the pipeline is updated",
            "REJECT: The proposal is marked as rejected and the lead is moved to 'Proposal Lost'",
            "COUNTER PROPOSAL: The client can suggest a new rate, fee, and settlement period",
            "All actions are recorded and visible in the system"
          ]
        },
        {
          title: "7. Pipeline Tracking",
          icon: Kanban,
          color: "bg-pink-500",
          description: "The entire process can be visually tracked in the Pipeline Kanban.",
          details: [
            "Leads: Received questionnaires awaiting analysis",
            "Proposal Made: Proposals sent awaiting response",
            "Proposal Accepted: Successfully closed deals",
            "Counter Proposal: Ongoing negotiations",
            "Proposal Lost: Leads that didn't convert"
          ]
        }
      ],

      flow2Title: "Flow 2: Direct Proposal Creation",
      flow2Subtitle: "Process to create proposals without a prior questionnaire",
      flow2Steps: [
        {
          title: "1. Access Creation",
          icon: FileText,
          color: "bg-blue-500",
          description: "Start a new proposal directly from the 'Create Proposal' menu or from the Dashboard.",
          details: [
            "Click 'Create Proposal' in the sidebar",
            "Or click the 'New Proposal' button on the Dashboard",
            "Or click 'New Proposal' in the Proposal Center"
          ]
        },
        {
          title: "2. Client Information",
          icon: Users,
          color: "bg-purple-500",
          description: "Manually fill in the client and company data.",
          details: [
            "Client/company name",
            "Main contact name",
            "Contact email (where the link will be sent)"
          ]
        },
        {
          title: "3. MCC Selection",
          icon: Table2,
          color: "bg-green-500",
          description: "Select the MCC (Merchant Category Code) codes applicable to the business.",
          details: [
            "MCCs define the merchant category",
            "Important for compliance and risk analysis",
            "The proposal is only valid for selected MCCs",
            "Multiple MCCs can be selected"
          ]
        },
        {
          title: "4. Interchange Configuration",
          icon: Percent,
          color: "bg-orange-500",
          description: "Choose the interchange calculation basis for the proposal.",
          details: [
            "Visa Low/Avg/High: Uses Visa rates (lowest, average, or highest)",
            "Mastercard Low/Avg/High: Uses Mastercard rates",
            "Combined Low/Avg/High: Average between Visa and Mastercard",
            "Custom: Manually define the rate and fixed fee",
            "See the complete table by clicking 'View Interchange Table'"
          ]
        },
        {
          title: "5. Markup and Fees",
          icon: DollarSign,
          color: "bg-cyan-500",
          description: "Configure Pagsmile markup and all additional fees.",
          details: [
            "Percentage Markup: Pagsmile's percentage margin",
            "Gateway Fee: Fixed fee per transaction (in USD cents)",
            "Setup Fee: One-time setup fee",
            "Refund Fee: Fee per processed refund",
            "Chargeback Fee: Fee per chargeback",
            "Risk Control Fee: Risk control fee",
            "Rolling Reserve: Percentage and retention days",
            "Settlement Days: Settlement period"
          ]
        },
        {
          title: "6. Preview and Creation",
          icon: Eye,
          color: "bg-emerald-500",
          description: "View the complete rate breakdown before creating.",
          details: [
            "The system shows the calculation in real-time:",
            "Pagsmile Base Cost (fixed 0.5%)",
            "+ Interchange (based on selection)",
            "+ Pagsmile Markup",
            "= Final Percentage Rate",
            "Fixed Fee = Fixed Interchange + Gateway Fee",
            "Set the proposal expiration date",
            "Click 'Create Proposal' to finish"
          ]
        },
        {
          title: "7. Proposal Management",
          icon: Edit,
          color: "bg-pink-500",
          description: "Once created, the proposal can be managed in various ways.",
          details: [
            "Edit: Change any proposal information",
            "View: See all details",
            "Duplicate: Create a copy for another client",
            "History: See previous versions of the proposal",
            "Copy Link: Copy the public link to send",
            "View Proposal: Open the public view",
            "Delete: Remove the proposal from the system"
          ]
        }
      ],

      pagesTitle: "Pages and Features",
      pagesSubtitle: "Detailed description of each system page",
      pages: [
        {
          name: "Dashboard",
          icon: LayoutDashboard,
          color: "bg-blue-500",
          description: "Performance overview and main metrics.",
          features: [
            "Real-time KPIs: Total TPV, Estimated Revenue, Total Leads",
            "Won TPV vs Lost TPV for conversion analysis",
            "Automatically calculated conversion rate (Win Rate)",
            "List of most recent proposals with status",
            "List of most recent questionnaires with pipeline status",
            "Quick actions to create proposal, access pipeline and interchange"
          ]
        },
        {
          name: "Create Proposal",
          icon: FileText,
          color: "bg-green-500",
          description: "Complete form for creating commercial proposals.",
          features: [
            "Client data form with validation",
            "MCC selector with search and multiple selection",
            "Interchange configurator with 10 pre-defined options + custom",
            "Modal with complete Visa and Mastercard rate table",
            "Fields for all additional fees with default values",
            "Real-time rate breakdown preview",
            "Settlement period and expiration date selector"
          ]
        },
        {
          name: "Proposal Center",
          icon: ClipboardList,
          color: "bg-purple-500",
          description: "Centralized management of all proposals.",
          features: [
            "Card grid with all proposals",
            "Filters by text (client/contact), status and period",
            "Status badge with differentiated colors",
            "Display of final rate and MCCs on each card",
            "7 actions per proposal: Edit, View, Duplicate, History, Copy Link, Open, Delete",
            "Details modal with all information",
            "Version history modal",
            "CSV export",
            "View received counter proposals"
          ]
        },
        {
          name: "Questionnaires",
          icon: ClipboardList,
          color: "bg-orange-500",
          description: "Management center for received questionnaires.",
          features: [
            "List of all questionnaires with main information",
            "Filters by text, pipeline status, TPV and current partner",
            "Pipeline status badge with colors",
            "TPV and average ticket displayed on each card",
            "Actions: View details, Generate Proposal, Delete",
            "Modal with all questionnaire details",
            "Direct button to generate pre-filled proposal",
            "CSV export"
          ]
        },
        {
          name: "Pipeline Kanban",
          icon: Kanban,
          color: "bg-pink-500",
          description: "Visualization and management of the sales funnel.",
          features: [
            "5 columns: Leads, Proposal Made, Proposal Accepted, Counter Proposal, Proposal Lost",
            "Drag and drop to move cards between columns",
            "Global KPIs: Total TPV, Total Leads, Win Rate",
            "KPIs per column: quantity and TPV of each stage",
            "Cards with company name, contact, email, TPV and average ticket",
            "Automatic status update when dragging"
          ]
        },
        {
          name: "Revenue Simulator",
          icon: Calculator,
          color: "bg-cyan-500",
          description: "Tool to simulate revenues with different scenarios.",
          features: [
            "Input parameters: Monthly TPV, average ticket, rate %, fixed fee",
            "Interchange and base cost configuration",
            "Chargebacks and refunds configuration (rate and fee)",
            "Automatic calculation of: Gross Revenue, Costs, Net Revenue, Margin",
            "Annual net revenue projection",
            "Annual projection chart with 5%/month growth",
            "Cost breakdown chart (Interchange, Base, Chargebacks, Refunds)",
            "Interactive sliders for quick value adjustment"
          ]
        },
        {
          name: "Interchange Rates",
          icon: Table2,
          color: "bg-amber-500",
          description: "Complete interchange rate table.",
          features: [
            "Summary tab: Cards with lowest, average and highest rates for Visa, Mastercard and Combined",
            "Visa tab: Complete table with all Visa Card Not Present programs",
            "Mastercard tab: Complete table with all Mastercard Card Not Present programs",
            "Columns: Program, Card Type, Rate %, Fixed Rate USD",
            "Legend explaining each rate category"
          ]
        },
        {
          name: "Public Proposal",
          icon: Globe,
          color: "bg-emerald-500",
          description: "Public page for the client to view and respond to the proposal.",
          features: [
            "Access without login via unique token",
            "Header with Pagsmile logo and client data",
            "Applicable MCCs notice with complete list",
            "Payment Processing Fee table (Card, Wallet)",
            "Other Fees grid (Setup, Gateway, Refund, Chargeback, Risk, Rolling Reserve)",
            "Settlement section with settlement period",
            "Disclaimer about compliance approval",
            "3 action buttons: Accept (green), Counter Proposal (yellow), Reject (red)",
            "Counter proposal modal with fields for new rate, fee, period and notes",
            "Rejection confirmation modal",
            "Status alerts (expired, already accepted, already rejected, counter proposal sent)"
          ]
        },
        {
          name: "Questionnaire Form",
          icon: ClipboardList,
          color: "bg-violet-500",
          description: "Public form for potential clients.",
          features: [
            "Access without login - public page",
            "Contact Data section: Name, email, phone with country code, role",
            "Company Data section: Name, type, business model, products/services",
            "Financial Data section: Monthly TPV, average ticket, automatic transaction calculation",
            "Current Partner section: If they have one, current rates",
            "Expectations section: Desired settlement period",
            "Success screen after submission with thank you message"
          ]
        }
      ],

      featuresTitle: "Additional Features",
      featuresSubtitle: "Extra resources available on the platform",
      features: [
        {
          name: "Internationalization (i18n)",
          description: "The entire system is available in Portuguese and English. The language selector is in the sidebar."
        },
        {
          name: "Proposal Versioning",
          description: "Each change to a proposal creates a new version. The complete history can be viewed."
        },
        {
          name: "Proposal Duplication",
          description: "Proposals can be duplicated to create new ones based on existing configurations."
        },
        {
          name: "CSV Export",
          description: "Both proposals and questionnaires can be exported for spreadsheet analysis."
        },
        {
          name: "Advanced Filters",
          description: "All lists have filters by text, status, date and specific fields."
        },
        {
          name: "Automatic Calculation",
          description: "Final rates, transaction volumes and metrics are calculated automatically."
        },
        {
          name: "Public Links",
          description: "Proposals and questionnaires have public pages accessible without login."
        },
        {
          name: "Visual Pipeline",
          description: "Kanban with drag and drop for visual sales funnel management."
        }
      ],

      tipsTitle: "Usage Tips",
      tips: [
        "Always verify the correct MCCs before sending a proposal",
        "Use the Revenue Simulator to validate scenarios before proposing rates",
        "Monitor the Pipeline daily to not miss opportunities",
        "Export reports periodically for performance analysis",
        "Use duplication to quickly create similar proposals",
        "Keep proposals with short expiration dates to create urgency"
      ]
    }
  };

  const c = isPortuguese ? content.pt : content.en;

  const SectionHeader = ({ title, section, icon: Icon }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
    >
      <div className="flex items-center gap-3">
        <Icon className="h-6 w-6 text-[#2bc196]" />
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      {expandedSections[section] ? (
        <ChevronUp className="h-5 w-5 text-white/60" />
      ) : (
        <ChevronDown className="h-5 w-5 text-white/60" />
      )}
    </button>
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BookOpen className="h-10 w-10 text-[#2bc196]" />
          <h1 className="text-4xl font-bold text-white">{c.title}</h1>
        </div>
        <p className="text-white/70 text-lg max-w-3xl mx-auto">{c.subtitle}</p>
      </div>

      {/* Overview Section */}
      <div className="space-y-4">
        <SectionHeader title={c.overviewTitle} section="overview" icon={LayoutDashboard} />
        
        {expandedSections.overview && (
          <Card className="bg-white/5 border-[#2bc196]/20">
            <CardContent className="pt-6 space-y-6">
              <p className="text-white/80 text-lg leading-relaxed">{c.overviewDesc}</p>
              
              <div>
                <h3 className="text-[#2bc196] font-semibold text-lg mb-3">{c.mainObjectives}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {c.objectives.map((obj, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 bg-white/5 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-[#2bc196] mt-0.5 flex-shrink-0" />
                      <span className="text-white/80">{obj}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Flow 1 */}
      <div className="space-y-4">
        <SectionHeader title={c.flow1Title} section="flow1" icon={ClipboardList} />
        
        {expandedSections.flow1 && (
          <Card className="bg-white/5 border-[#2bc196]/20">
            <CardHeader>
              <p className="text-white/60">{c.flow1Subtitle}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {c.flow1Steps.map((step, index) => (
                <div key={index} className="relative">
                  {index < c.flow1Steps.length - 1 && (
                    <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-[#2bc196]/30" />
                  )}
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 pb-6">
                      <h4 className="text-white font-semibold text-lg mb-2">{step.title}</h4>
                      <p className="text-white/70 mb-3">{step.description}</p>
                      <div className="bg-white/5 rounded-lg p-4 space-y-2">
                        {step.details.map((detail, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <ArrowRight className="h-4 w-4 text-[#2bc196] mt-1 flex-shrink-0" />
                            <span className="text-white/60 text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Flow 2 */}
      <div className="space-y-4">
        <SectionHeader title={c.flow2Title} section="flow2" icon={FileText} />
        
        {expandedSections.flow2 && (
          <Card className="bg-white/5 border-[#2bc196]/20">
            <CardHeader>
              <p className="text-white/60">{c.flow2Subtitle}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {c.flow2Steps.map((step, index) => (
                <div key={index} className="relative">
                  {index < c.flow2Steps.length - 1 && (
                    <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-[#2bc196]/30" />
                  )}
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 pb-6">
                      <h4 className="text-white font-semibold text-lg mb-2">{step.title}</h4>
                      <p className="text-white/70 mb-3">{step.description}</p>
                      <div className="bg-white/5 rounded-lg p-4 space-y-2">
                        {step.details.map((detail, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <ArrowRight className="h-4 w-4 text-[#2bc196] mt-1 flex-shrink-0" />
                            <span className="text-white/60 text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pages */}
      <div className="space-y-4">
        <SectionHeader title={c.pagesTitle} section="pages" icon={LayoutDashboard} />
        
        {expandedSections.pages && (
          <div className="space-y-4">
            <p className="text-white/60 px-4">{c.pagesSubtitle}</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {c.pages.map((page, index) => (
                <Card key={index} className="bg-white/5 border-[#2bc196]/20">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${page.color} rounded-lg flex items-center justify-center`}>
                        <page.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg">{page.name}</CardTitle>
                        <p className="text-white/60 text-sm">{page.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {page.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-[#2bc196] mt-0.5 flex-shrink-0" />
                          <span className="text-white/70 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Additional Features */}
      <div className="space-y-4">
        <SectionHeader title={c.featuresTitle} section="features" icon={TrendingUp} />
        
        {expandedSections.features && (
          <Card className="bg-white/5 border-[#2bc196]/20">
            <CardHeader>
              <p className="text-white/60">{c.featuresSubtitle}</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {c.features.map((feature, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-lg">
                    <h4 className="text-[#2bc196] font-semibold mb-2">{feature.name}</h4>
                    <p className="text-white/70 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Tips */}
      <Card className="bg-gradient-to-r from-[#2bc196]/20 to-[#002443] border-[#2bc196]">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            {c.tipsTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {c.tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-white/5 rounded-lg">
                <Badge className="bg-[#2bc196] text-[#002443] text-xs">{index + 1}</Badge>
                <span className="text-white/80 text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}