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
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import '@/components/i18n/i18n';
import LanguageSelector from '@/components/i18n/LanguageSelector';

export default function Layout({ children, currentPageName }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const location = useLocation();
  const { t } = useTranslation();

  const isPublicPage = currentPageName === 'PublicProposal';

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
    { name: t('nav.createProposal'), page: 'ProposalCreation', icon: FileText },
    { name: t('nav.proposalCenter'), page: 'ProposalCenter', icon: ClipboardList },
    { name: t('nav.questionnaires'), page: 'QuestionnaireCenter', icon: ClipboardList },
    { name: t('nav.pipeline'), page: 'PipelineKanban', icon: Kanban },
    { name: t('nav.revenueSimulator'), page: 'RevenueSimulator', icon: Calculator },
    { name: t('nav.interchangeRates'), page: 'InterchangeViewer', icon: Table2 },
    { name: t('nav.howItWorks'), page: 'HowItWorks', icon: BookOpen },
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
        fixed inset-y-0 left-0 z-40 w-64 bg-[#002443] border-r border-[#2bc196]/20
        transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-[#2bc196]/20">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68351d4d439cb9574d90dc86/807e8736c_Logo-modo-escuro.png"
              alt="Pagsmile"
              className="h-10 w-auto"
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1.5">
            {navigation.map((item) => {
              const isActive = currentPageName === item.page;
              return (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'bg-[#2bc196] text-[#002443] shadow-lg shadow-[#2bc196]/20' 
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }
                  `}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? '' : 'opacity-70'}`} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Language Selector */}
          <div className="p-4 border-t border-[#2bc196]/20">
            <LanguageSelector />
          </div>

          {/* Questionnaire Link */}
          <div className="p-4 border-t border-white/10">
            <p className="text-white/40 text-xs mb-2 uppercase tracking-wider">{t('nav.questionnaireLink')}:</p>
            <Button
              onClick={copyQuestionnaireLink}
              variant="outline"
              size="sm"
              className="w-full justify-start"
            >
              {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span className="truncate">{t('nav.copyLink')}</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:pl-64 min-h-screen">
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