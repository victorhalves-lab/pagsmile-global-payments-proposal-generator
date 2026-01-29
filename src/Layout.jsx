import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from './utils';
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  Kanban,
  Table2,
  Menu,
  X,
  Copy,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Layout({ children, currentPageName }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', page: 'Dashboard', icon: LayoutDashboard },
    { name: 'Criar Proposta', page: 'ProposalCreation', icon: FileText },
    { name: 'Central de Propostas', page: 'ProposalCenter', icon: ClipboardList },
    { name: 'Questionários', page: 'QuestionnaireCenter', icon: ClipboardList },
    { name: 'Pipeline', page: 'PipelineKanban', icon: Kanban },
    { name: 'Taxas Interchange', page: 'InterchangeViewer', icon: Table2 },
  ];

  const questionnaireLink = `${window.location.origin}${createPageUrl('QuestionnaireForm')}`;

  const copyQuestionnaireLink = () => {
    navigator.clipboard.writeText(questionnaireLink);
    setCopied(true);
    toast.success('Link do questionário copiado!');
    setTimeout(() => setCopied(false), 2000);
  };

  const isPublicPage = currentPageName === 'QuestionnaireForm' || currentPageName === 'PublicProposal';

  if (isPublicPage) {
    return <>{children}</>;
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
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = currentPageName === item.page;
              return (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${isActive 
                      ? 'bg-[#2bc196] text-white' 
                      : 'text-white/70 hover:bg-[#2bc196]/20 hover:text-white'
                    }
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Questionnaire Link */}
          <div className="p-4 border-t border-[#2bc196]/20">
            <p className="text-white/60 text-xs mb-2">Link do Questionário:</p>
            <Button
              onClick={copyQuestionnaireLink}
              variant="outline"
              className="w-full justify-start gap-2 bg-transparent border-[#2bc196]/40 text-white hover:bg-[#2bc196]/20"
            >
              {copied ? <CheckCircle className="h-4 w-4 text-[#2bc196]" /> : <Copy className="h-4 w-4" />}
              <span className="truncate text-sm">Copiar Link</span>
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