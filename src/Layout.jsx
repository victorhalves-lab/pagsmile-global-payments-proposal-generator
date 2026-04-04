import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from './utils';
import { base44 } from '@/api/base44Client';
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  Kanban,
  Table2,
  Menu,
  X,
  Copy,
  CheckCircle,
  Calculator,
  BookOpen,
  Loader2,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import '@/components/i18n/i18n';
import LanguageSelector from '@/components/i18n/LanguageSelector';

export default function Layout({ children, currentPageName }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [complianceOpen, setComplianceOpen] = useState(
    currentPageName === 'ComplianceDashboard' || currentPageName === 'ComplianceReceived'
  );
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const location = useLocation();
  const { t } = useTranslation();

  const isPublicPage = currentPageName === 'PublicProposal' || currentPageName === 'QuestionnaireForm' || currentPageName === 'ComplianceForm';

  useEffect(() => {
    const checkAuth = async () => {
      if (isPublicPage) {
        setLoadingAuth(false);
        return;
      }

      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
        setLoadingAuth(false);
      } catch (error) {
        base44.auth.redirectToLogin(window.location.href);
      }
    };

    checkAuth();
  }, [isPublicPage]);

  const navigation = [
    { name: t('nav.dashboard'), page: 'Dashboard', icon: LayoutDashboard },
    { name: t('nav.leadQuestionnaire'), page: 'LeadQuestionnaireDashboard', icon: ClipboardList, highlight: true },
    { name: t('nav.createProposal'), page: 'ProposalCreation', icon: FileText },
    { name: t('nav.proposalCenter'), page: 'ProposalCenter', icon: ClipboardList },
    { name: t('nav.questionnaires'), page: 'QuestionnaireCenter', icon: ClipboardList },
    { name: t('nav.pipeline'), page: 'PipelineKanban', icon: Kanban },
    { name: t('nav.revenueSimulator'), page: 'RevenueSimulator', icon: Calculator },
    { name: t('nav.interchangeRates'), page: 'InterchangeViewer', icon: Table2 },
    { name: t('nav.howItWorks'), page: 'HowItWorks', icon: BookOpen },
  ];

  const complianceSubItems = [
    { name: t('nav.complianceForm'), page: 'ComplianceDashboard' },
    { name: t('nav.complianceReceived'), page: 'ComplianceReceived' },
  ];

  const questionnaireLink = `${window.location.origin}${createPageUrl('QuestionnaireForm')}`;

  const copyQuestionnaireLink = () => {
    navigator.clipboard.writeText(questionnaireLink);
    setCopied(true);
    toast.success('Link do questionário copiado!');
    setTimeout(() => setCopied(false), 2000);
  };

  // Página pública - renderiza sem verificação
  if (isPublicPage) {
    return <>{children}</>;
  }

  // Carregando autenticação
  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-[#002443] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-[#2bc196] animate-spin" />
          <p className="text-white/60">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Sem usuário logado (redirecionamento já foi feito no useEffect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#002443]">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white hover:bg-[#2bc196]/20"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 bg-[#002443] border-r border-[#2bc196]/20
        transform transition-all duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        ${sidebarCollapsed ? 'w-16' : 'w-64'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo + Collapse */}
          <div className="p-4 border-b border-[#2bc196]/20 flex items-center justify-between">
            {!sidebarCollapsed && (
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68351d4d439cb9574d90dc86/807e8736c_Logo-modo-escuro.png"
                alt="Pagsmile"
                className="h-8 w-auto"
              />
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-white/40 hover:bg-white/5 hover:text-white transition-all"
              title={sidebarCollapsed ? 'Expandir menu' : 'Recolher menu'}
            >
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${sidebarCollapsed ? '-rotate-90' : 'rotate-90'}`} />
            </button>
          </div>

          {/* Navigation - scrollable */}
          <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = currentPageName === item.page;
              return (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  onClick={() => setSidebarOpen(false)}
                  title={sidebarCollapsed ? item.name : undefined}
                  className={`
                    flex items-center gap-3 rounded-xl transition-all duration-200
                    ${sidebarCollapsed ? 'px-0 py-2.5 justify-center' : 'px-3 py-2.5'}
                    ${isActive 
                      ? 'bg-[#2bc196] text-[#002443] shadow-lg shadow-[#2bc196]/20' 
                      : item.highlight
                        ? 'text-[#2bc196] bg-[#2bc196]/5 border border-[#2bc196]/20 hover:bg-[#2bc196]/10'
                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }
                  `}
                >
                  <item.icon className={`h-5 w-5 shrink-0 ${isActive ? '' : 'opacity-70'}`} />
                  {!sidebarCollapsed && <span className="font-medium text-sm">{item.name}</span>}
                </Link>
              );
            })}

            {/* Compliance expandable section */}
            <div>
              <button
                onClick={() => sidebarCollapsed ? null : setComplianceOpen(!complianceOpen)}
                title={sidebarCollapsed ? t('nav.compliance') : undefined}
                className={`
                  w-full flex items-center gap-3 rounded-xl transition-all duration-200
                  ${sidebarCollapsed ? 'px-0 py-2.5 justify-center' : 'px-3 py-2.5'}
                  ${complianceOpen || currentPageName === 'ComplianceDashboard' || currentPageName === 'ComplianceReceived'
                    ? 'text-[#2bc196] bg-[#2bc196]/10'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                <ShieldCheck className="h-5 w-5 opacity-70 shrink-0" />
                {!sidebarCollapsed && (
                  <>
                    <span className="font-medium text-sm flex-1 text-left">{t('nav.compliance')}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${complianceOpen ? 'rotate-180' : ''}`} />
                  </>
                )}
              </button>
              {complianceOpen && !sidebarCollapsed && (
                <div className="ml-4 mt-1 space-y-0.5 border-l border-white/10 pl-3">
                  {complianceSubItems.map((sub) => {
                    const isSubActive = currentPageName === sub.page;
                    return (
                      <Link
                        key={sub.page}
                        to={createPageUrl(sub.page)}
                        onClick={() => setSidebarOpen(false)}
                        className={`
                          flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all duration-200
                          ${isSubActive
                            ? 'bg-[#2bc196] text-[#002443] shadow-lg shadow-[#2bc196]/20'
                            : 'text-white/50 hover:bg-white/5 hover:text-white'
                          }
                        `}
                      >
                        <span className="font-medium">{sub.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Language Selector */}
          {!sidebarCollapsed && (
            <div className="p-3 border-t border-[#2bc196]/20">
              <LanguageSelector />
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className={`min-h-screen transition-all duration-200 ${sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'}`}>
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}