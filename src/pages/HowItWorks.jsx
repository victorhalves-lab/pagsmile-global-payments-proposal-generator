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
  DollarSign,
  Percent,
  BarChart3,
  Globe,
  Target,
  Workflow,
  Lightbulb,
  BookOpen,
  Eye,
  Trash2,
  TrendingUp,
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
        <h1 className="text-4xl font-bold text-white mb-4">{t('howItWorks.pageTitle')}</h1>
        <p className="text-white/70 text-lg max-w-3xl mx-auto">
          {t('howItWorks.pageSubtitle')}
        </p>
      </div>

      {/* Índice */}
      <Card className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-xl">
            <Layers className="h-6 w-6" />
            {t('howItWorks.tableOfContents')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <a href="#visao-geral" className="text-white/80 hover:text-[#2bc196] transition-colors p-2 rounded hover:bg-white/5">{t('howItWorks.overview.title')}</a>
            <a href="#fluxos" className="text-white/80 hover:text-[#2bc196] transition-colors p-2 rounded hover:bg-white/5">{t('howItWorks.flows.title')}</a>
            <a href="#dashboard" className="text-white/80 hover:text-[#2bc196] transition-colors p-2 rounded hover:bg-white/5">{t('howItWorks.dashboard.title')}</a>
            <a href="#questionario-form" className="text-white/80 hover:text-[#2bc196] transition-colors p-2 rounded hover:bg-white/5">{t('howItWorks.questionnaireForm.title')}</a>
            <a href="#questionario-center" className="text-white/80 hover:text-[#2bc196] transition-colors p-2 rounded hover:bg-white/5">{t('howItWorks.questionnaireCenter.title')}</a>
            <a href="#proposta-criacao" className="text-white/80 hover:text-[#2bc196] transition-colors p-2 rounded hover:bg-white/5">{t('howItWorks.proposalCreation.title')}</a>
            <a href="#proposta-center" className="text-white/80 hover:text-[#2bc196] transition-colors p-2 rounded hover:bg-white/5">{t('howItWorks.proposalCenter.title')}</a>
            <a href="#proposta-publica" className="text-white/80 hover:text-[#2bc196] transition-colors p-2 rounded hover:bg-white/5">{t('howItWorks.publicProposal.title')}</a>
            <a href="#pipeline" className="text-white/80 hover:text-[#2bc196] transition-colors p-2 rounded hover:bg-white/5">{t('howItWorks.pipelineKanban.title')}</a>
            <a href="#simulador" className="text-white/80 hover:text-[#2bc196] transition-colors p-2 rounded hover:bg-white/5">{t('howItWorks.revenueSimulator.title')}</a>
            <a href="#interchange" className="text-white/80 hover:text-[#2bc196] transition-colors p-2 rounded hover:bg-white/5">{t('howItWorks.interchangeTable.title')}</a>
            <a href="#dicas" className="text-white/80 hover:text-[#2bc196] transition-colors p-2 rounded hover:bg-white/5">{t('howItWorks.tips.title')}</a>
          </div>
        </CardContent>
      </Card>

      {/* ==================== VISÃO GERAL ==================== */}
      <Card id="visao-geral" className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <Target className="h-7 w-7" />
            {t('howItWorks.overview.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-white/80 space-y-6">
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">{t('howItWorks.overview.whatIs')}</h3>
            <p>{t('howItWorks.overview.whatIsDesc')}</p>

            <h3 className="text-white font-bold text-lg mt-6">{t('howItWorks.overview.problemSolved')}</h3>
            <p>{t('howItWorks.overview.problemSolvedDesc')}</p>
            <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
              <li>{t('howItWorks.overview.problemList.item1')}</li>
              <li>{t('howItWorks.overview.problemList.item2')}</li>
              <li>{t('howItWorks.overview.problemList.item3')}</li>
              <li>{t('howItWorks.overview.problemList.item4')}</li>
              <li>{t('howItWorks.overview.problemList.item5')}</li>
            </ul>
            <p className="mt-4">{t('howItWorks.overview.problemSolution')}</p>

            <h3 className="text-white font-bold text-lg mt-6">{t('howItWorks.overview.structure')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-white/5 p-4 rounded-lg">
                <div className="text-3xl font-bold text-[#2bc196]">8</div>
                <div className="text-white font-medium">{t('howItWorks.overview.mainPages')}</div>
                <div className="text-white/50 text-sm mt-1">{t('howItWorks.overview.mainPagesDesc')}</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <div className="text-3xl font-bold text-[#2bc196]">3</div>
                <div className="text-white font-medium">{t('howItWorks.overview.dataEntities')}</div>
                <div className="text-white/50 text-sm mt-1">{t('howItWorks.overview.dataEntitiesDesc')}</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <div className="text-3xl font-bold text-[#2bc196]">2</div>
                <div className="text-white font-medium">{t('howItWorks.overview.supportedLanguages')}</div>
                <div className="text-white/50 text-sm mt-1">{t('howItWorks.overview.supportedLanguagesDesc')}</div>
              </div>
            </div>

            <h3 className="text-white font-bold text-lg mt-6">{t('howItWorks.overview.concepts')}</h3>
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-lg border-l-4 border-[#2bc196]">
                <h4 className="text-[#2bc196] font-semibold">{t('howItWorks.overview.tpvTitle')}</h4>
                <p className="text-white/70 mt-1">{t('howItWorks.overview.tpvDesc')}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border-l-4 border-blue-400">
                <h4 className="text-blue-400 font-semibold">{t('howItWorks.overview.interchangeTitle')}</h4>
                <p className="text-white/70 mt-1">{t('howItWorks.overview.interchangeDesc')}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border-l-4 border-yellow-400">
                <h4 className="text-yellow-400 font-semibold">{t('howItWorks.overview.mccTitle')}</h4>
                <p className="text-white/70 mt-1">{t('howItWorks.overview.mccDesc')}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border-l-4 border-purple-400">
                <h4 className="text-purple-400 font-semibold">{t('howItWorks.overview.settlementTitle')}</h4>
                <p className="text-white/70 mt-1">{t('howItWorks.overview.settlementDesc')}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border-l-4 border-red-400">
                <h4 className="text-red-400 font-semibold">{t('howItWorks.overview.rollingReserveTitle')}</h4>
                <p className="text-white/70 mt-1">{t('howItWorks.overview.rollingReserveDesc')}</p>
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
            {t('howItWorks.flows.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* FLUXO 1: INBOUND */}
          <div className="border border-[#2bc196]/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#2bc196] rounded-full flex items-center justify-center text-[#002443] font-bold text-sm">1</span>
              {t('howItWorks.flows.inbound.title')}
            </h3>
            <p className="text-white/70 mb-6">{t('howItWorks.flows.inbound.desc')}</p>
            
            <div className="space-y-4">
              {/* Etapa 1.1 */}
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <div className="w-12 h-12 bg-[#2bc196]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#2bc196] font-bold">1.1</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">{t('howItWorks.flows.inbound.step1Title')}</h4>
                  <p className="text-white/60 text-sm mt-1">
                    <strong>{t('howItWorks.flows.inbound.step1Where')}</strong> {t('howItWorks.flows.inbound.step1WhereDesc')}
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    <strong>{t('howItWorks.flows.inbound.step1How')}</strong> {t('howItWorks.flows.inbound.step1HowDesc')}
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    <strong>{t('howItWorks.flows.inbound.step1Use')}</strong>
                  </p>
                  <ul className="text-white/50 text-sm mt-1 space-y-1 list-disc list-inside ml-4">
                    <li>{t('howItWorks.flows.inbound.step1UseList.item1')}</li>
                    <li>{t('howItWorks.flows.inbound.step1UseList.item2')}</li>
                    <li>{t('howItWorks.flows.inbound.step1UseList.item3')}</li>
                    <li>{t('howItWorks.flows.inbound.step1UseList.item4')}</li>
                    <li>{t('howItWorks.flows.inbound.step1UseList.item5')}</li>
                  </ul>
                  <p className="text-white/60 text-sm mt-2">
                    <strong>{t('howItWorks.flows.inbound.step1Important')}</strong> {t('howItWorks.flows.inbound.step1ImportantDesc')}
                  </p>
                </div>
              </div>

              {/* Etapa 1.2 */}
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <div className="w-12 h-12 bg-[#2bc196]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#2bc196] font-bold">1.2</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">{t('howItWorks.flows.inbound.step2Title')}</h4>
                  <p className="text-white/60 text-sm mt-1">
                    <strong>{t('howItWorks.flows.inbound.step2Experience')}</strong> {t('howItWorks.flows.inbound.step2ExperienceDesc')}
                  </p>
                  <p className="text-white/60 text-sm mt-2"><strong>{t('howItWorks.flows.inbound.step2Sections')}</strong></p>
                  <div className="mt-2 space-y-2">
                    <div className="bg-white/5 p-2 rounded text-sm">
                      <span className="text-[#2bc196]">📋 {t('howItWorks.flows.inbound.step2ContactData')}</span>
                      <span className="text-white/50 ml-2">{t('howItWorks.flows.inbound.step2ContactDataFields')}</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded text-sm">
                      <span className="text-[#2bc196]">🏢 {t('howItWorks.flows.inbound.step2CompanyData')}</span>
                      <span className="text-white/50 ml-2">{t('howItWorks.flows.inbound.step2CompanyDataFields')}</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded text-sm">
                      <span className="text-[#2bc196]">💰 {t('howItWorks.flows.inbound.step2FinancialData')}</span>
                      <span className="text-white/50 ml-2">{t('howItWorks.flows.inbound.step2FinancialDataFields')}</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded text-sm">
                      <span className="text-[#2bc196]">🤝 {t('howItWorks.flows.inbound.step2PartnerData')}</span>
                      <span className="text-white/50 ml-2">{t('howItWorks.flows.inbound.step2PartnerDataFields')}</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded text-sm">
                      <span className="text-[#2bc196]">⏱️ {t('howItWorks.flows.inbound.step2Expectations')}</span>
                      <span className="text-white/50 ml-2">{t('howItWorks.flows.inbound.step2ExpectationsFields')}</span>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm mt-2">
                    <strong>{t('howItWorks.flows.inbound.step2AutoCalc')}</strong> {t('howItWorks.flows.inbound.step2AutoCalcDesc')}
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    <strong>{t('howItWorks.flows.inbound.step2AfterSubmit')}</strong> {t('howItWorks.flows.inbound.step2AfterSubmitDesc')}
                  </p>
                </div>
              </div>

              {/* Etapa 1.3 */}
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <div className="w-12 h-12 bg-[#2bc196]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#2bc196] font-bold">1.3</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">{t('howItWorks.flows.inbound.step3Title')}</h4>
                  <p className="text-white/60 text-sm mt-1">
                    <strong>{t('howItWorks.flows.inbound.step3What')}</strong> {t('howItWorks.flows.inbound.step3WhatDesc')}
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    <strong>{t('howItWorks.flows.inbound.step3Where')}</strong> {t('howItWorks.flows.inbound.step3WhereDesc')}
                  </p>
                  <p className="text-white/60 text-sm mt-2"><strong>{t('howItWorks.flows.inbound.step3Visible')}</strong></p>
                  <ul className="text-white/50 text-sm mt-1 space-y-1 list-disc list-inside ml-4">
                    <li>{t('howItWorks.flows.inbound.step3VisibleList.item1')}</li>
                    <li>{t('howItWorks.flows.inbound.step3VisibleList.item2')}</li>
                    <li>{t('howItWorks.flows.inbound.step3VisibleList.item3')}</li>
                    <li>{t('howItWorks.flows.inbound.step3VisibleList.item4')}</li>
                    <li>{t('howItWorks.flows.inbound.step3VisibleList.item5')}</li>
                    <li>{t('howItWorks.flows.inbound.step3VisibleList.item6')}</li>
                  </ul>
                </div>
              </div>

              {/* Etapa 1.4 */}
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <div className="w-12 h-12 bg-[#2bc196]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#2bc196] font-bold">1.4</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">{t('howItWorks.flows.inbound.step4Title')}</h4>
                  <p className="text-white/60 text-sm mt-1">
                    <strong>{t('howItWorks.flows.inbound.step4How')}</strong> {t('howItWorks.flows.inbound.step4HowDesc')}
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    <strong>{t('howItWorks.flows.inbound.step4What')}</strong> {t('howItWorks.flows.inbound.step4WhatDesc')}
                  </p>
                  <p className="text-white/60 text-sm mt-2"><strong>{t('howItWorks.flows.inbound.step4Benefits')}</strong></p>
                  <ul className="text-white/50 text-sm mt-1 space-y-1 list-disc list-inside ml-4">
                    <li>{t('howItWorks.flows.inbound.step4BenefitsList.item1')}</li>
                    <li>{t('howItWorks.flows.inbound.step4BenefitsList.item2')}</li>
                    <li>{t('howItWorks.flows.inbound.step4BenefitsList.item3')}</li>
                    <li>{t('howItWorks.flows.inbound.step4BenefitsList.item4')}</li>
                  </ul>
                </div>
              </div>

              {/* Etapa 1.5 */}
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <div className="w-12 h-12 bg-[#2bc196]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#2bc196] font-bold">1.5</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">{t('howItWorks.flows.inbound.step5Title')}</h4>
                  <p className="text-white/60 text-sm mt-1">{t('howItWorks.flows.inbound.step5Desc')}</p>
                </div>
              </div>

              {/* Etapa 1.6 */}
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <div className="w-12 h-12 bg-[#2bc196]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#2bc196] font-bold">1.6</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">{t('howItWorks.flows.inbound.step6Title')}</h4>
                  <p className="text-white/60 text-sm mt-1">{t('howItWorks.flows.inbound.step6Desc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* FLUXO 2: OUTBOUND */}
          <div className="border border-[#2bc196]/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#2bc196] rounded-full flex items-center justify-center text-[#002443] font-bold text-sm">2</span>
              {t('howItWorks.flows.outbound.title')}
            </h3>
            <p className="text-white/70 mb-6">{t('howItWorks.flows.outbound.desc')}</p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 font-bold">2.1</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">{t('howItWorks.flows.outbound.step1Title')}</h4>
                  <p className="text-white/60 text-sm mt-1">{t('howItWorks.flows.outbound.step1Desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 font-bold">2.2</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">{t('howItWorks.flows.outbound.step2Title')}</h4>
                  <p className="text-white/60 text-sm mt-1">{t('howItWorks.flows.outbound.step2Desc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Diagrama Visual do Fluxo */}
          <div className="mt-8">
            <h3 className="text-white font-bold text-lg mb-4">{t('howItWorks.flows.diagram')}</h3>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
              <div className="bg-gray-500/30 px-4 py-2 rounded-lg text-white">{t('howItWorks.flows.diagramSteps.leadEnters')}</div>
              <ArrowRight className="h-4 w-4 text-[#2bc196]" />
              <div className="bg-gray-500/30 px-4 py-2 rounded-lg text-white">{t('howItWorks.flows.diagramSteps.questionnaire')}</div>
              <ArrowRight className="h-4 w-4 text-[#2bc196]" />
              <div className="bg-blue-500/30 px-4 py-2 rounded-lg text-white">{t('howItWorks.flows.diagramSteps.proposalCreated')}</div>
              <ArrowRight className="h-4 w-4 text-[#2bc196]" />
              <div className="bg-blue-500/30 px-4 py-2 rounded-lg text-white">{t('howItWorks.flows.diagramSteps.proposalSent')}</div>
              <ArrowRight className="h-4 w-4 text-[#2bc196]" />
              <div className="flex gap-2">
                <div className="bg-green-500/30 px-3 py-2 rounded-lg text-white text-xs">{t('howItWorks.flows.diagramSteps.accepted')}</div>
                <div className="bg-yellow-500/30 px-3 py-2 rounded-lg text-white text-xs">{t('howItWorks.flows.diagramSteps.counter')}</div>
                <div className="bg-red-500/30 px-3 py-2 rounded-lg text-white text-xs">{t('howItWorks.flows.diagramSteps.rejected')}</div>
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
            {t('howItWorks.dashboard.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-white/60 text-sm">
              <strong className="text-white">{t('howItWorks.dashboard.path')}</strong> {t('howItWorks.dashboard.pathDesc')}
            </p>
            <p className="text-white/60 text-sm mt-1">
              <strong className="text-white">{t('howItWorks.dashboard.purpose')}</strong> {t('howItWorks.dashboard.purposeDesc')}
            </p>
          </div>

          <h3 className="text-white font-bold text-lg">{t('howItWorks.dashboard.kpis')}</h3>
          <p className="text-white/70">{t('howItWorks.dashboard.kpisDesc')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-[#2bc196]">
                <DollarSign className="h-5 w-5" />
                <span className="font-semibold">{t('howItWorks.dashboard.totalTPV')}</span>
              </div>
              <p className="text-white/60 text-sm mt-2"><strong>{t('howItWorks.dashboard.totalTPVWhat')}</strong> {t('howItWorks.dashboard.totalTPVWhatDesc')}</p>
              <p className="text-white/60 text-sm mt-1"><strong>{t('howItWorks.dashboard.totalTPVHow')}</strong> {t('howItWorks.dashboard.totalTPVHowDesc')}</p>
              <p className="text-white/60 text-sm mt-1"><strong>{t('howItWorks.dashboard.totalTPVWhy')}</strong> {t('howItWorks.dashboard.totalTPVWhyDesc')}</p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-[#2bc196]">
                <TrendingUp className="h-5 w-5" />
                <span className="font-semibold">{t('howItWorks.dashboard.estimatedRevenue')}</span>
              </div>
              <p className="text-white/60 text-sm mt-2"><strong>{t('howItWorks.dashboard.estimatedRevenueWhat')}</strong> {t('howItWorks.dashboard.estimatedRevenueWhatDesc')}</p>
              <p className="text-white/60 text-sm mt-1"><strong>{t('howItWorks.dashboard.estimatedRevenueHow')}</strong> {t('howItWorks.dashboard.estimatedRevenueHowDesc')}</p>
              <p className="text-white/60 text-sm mt-1"><strong>{t('howItWorks.dashboard.estimatedRevenueWhy')}</strong> {t('howItWorks.dashboard.estimatedRevenueWhyDesc')}</p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-[#2bc196]">
                <Users className="h-5 w-5" />
                <span className="font-semibold">{t('howItWorks.dashboard.totalLeads')}</span>
              </div>
              <p className="text-white/60 text-sm mt-2"><strong>{t('howItWorks.dashboard.totalLeadsWhat')}</strong> {t('howItWorks.dashboard.totalLeadsWhatDesc')}</p>
              <p className="text-white/60 text-sm mt-1"><strong>{t('howItWorks.dashboard.totalLeadsHow')}</strong> {t('howItWorks.dashboard.totalLeadsHowDesc')}</p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">{t('howItWorks.dashboard.wonTPV')}</span>
              </div>
              <p className="text-white/60 text-sm mt-2"><strong>{t('howItWorks.dashboard.wonTPVWhat')}</strong> {t('howItWorks.dashboard.wonTPVWhatDesc')}</p>
              <p className="text-white/60 text-sm mt-1"><strong>{t('howItWorks.dashboard.wonTPVHow')}</strong> {t('howItWorks.dashboard.wonTPVHowDesc')}</p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-red-400">
                <Percent className="h-5 w-5" />
                <span className="font-semibold">{t('howItWorks.dashboard.lostTPV')}</span>
              </div>
              <p className="text-white/60 text-sm mt-2"><strong>{t('howItWorks.dashboard.lostTPVWhat')}</strong> {t('howItWorks.dashboard.lostTPVWhatDesc')}</p>
              <p className="text-white/60 text-sm mt-1"><strong>{t('howItWorks.dashboard.lostTPVHow')}</strong> {t('howItWorks.dashboard.lostTPVHowDesc')}</p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-[#2bc196]">
                <Percent className="h-5 w-5" />
                <span className="font-semibold">{t('howItWorks.dashboard.winRate')}</span>
              </div>
              <p className="text-white/60 text-sm mt-2"><strong>{t('howItWorks.dashboard.winRateWhat')}</strong> {t('howItWorks.dashboard.winRateWhatDesc')}</p>
              <p className="text-white/60 text-sm mt-1"><strong>{t('howItWorks.dashboard.winRateHow')}</strong> {t('howItWorks.dashboard.winRateHowDesc')}</p>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">{t('howItWorks.dashboard.sections')}</h3>
          
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-white font-semibold">{t('howItWorks.dashboard.recentProposals')}</h4>
              <p className="text-white/60 text-sm mt-2">{t('howItWorks.dashboard.recentProposalsDesc')}</p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-white font-semibold">{t('howItWorks.dashboard.recentQuestionnaires')}</h4>
              <p className="text-white/60 text-sm mt-2">{t('howItWorks.dashboard.recentQuestionnairesDesc')}</p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-white font-semibold">{t('howItWorks.dashboard.quickActions')}</h4>
              <p className="text-white/60 text-sm mt-2">{t('howItWorks.dashboard.quickActionsDesc')}</p>
              <ul className="text-white/50 text-sm mt-2 space-y-1 list-disc list-inside ml-4">
                <li><strong>{t('howItWorks.dashboard.quickActionsList.createProposal')}</strong> {t('howItWorks.dashboard.quickActionsList.createProposalDesc')}</li>
                <li><strong>{t('howItWorks.dashboard.quickActionsList.pipeline')}</strong> {t('howItWorks.dashboard.quickActionsList.pipelineDesc')}</li>
                <li><strong>{t('howItWorks.dashboard.quickActionsList.interchange')}</strong> {t('howItWorks.dashboard.quickActionsList.interchangeDesc')}</li>
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
            {t('howItWorks.questionnaireForm.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-white/60 text-sm"><strong className="text-white">{t('howItWorks.questionnaireForm.path')}</strong> {t('howItWorks.questionnaireForm.pathDesc')}</p>
            <p className="text-white/60 text-sm mt-1"><strong className="text-white">{t('howItWorks.questionnaireForm.purpose')}</strong> {t('howItWorks.questionnaireForm.purposeDesc')}</p>
            <p className="text-white/60 text-sm mt-1"><strong className="text-white">{t('howItWorks.questionnaireForm.whoUses')}</strong> {t('howItWorks.questionnaireForm.whoUsesDesc')}</p>
          </div>

          <h3 className="text-white font-bold text-lg">{t('howItWorks.questionnaireForm.visualStructure')}</h3>
          <p className="text-white/70">{t('howItWorks.questionnaireForm.visualStructureDesc')}</p>

          <h3 className="text-white font-bold text-lg mt-6">{t('howItWorks.questionnaireForm.formFields')}</h3>
          
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg border-l-4 border-[#2bc196]">
              <h4 className="text-[#2bc196] font-semibold">{t('howItWorks.questionnaireForm.contactSection')}</h4>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-white">{t('howItWorks.questionnaireForm.fullName')}</span>
                  <span className="text-white/50">{t('howItWorks.questionnaireForm.fullNameReq')}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-white">{t('howItWorks.questionnaireForm.email')}</span>
                  <span className="text-white/50">{t('howItWorks.questionnaireForm.emailReq')}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-white">{t('howItWorks.questionnaireForm.phone')}</span>
                  <span className="text-white/50">{t('howItWorks.questionnaireForm.phoneReq')}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-white">{t('howItWorks.questionnaireForm.role')}</span>
                  <span className="text-white/50">{t('howItWorks.questionnaireForm.roleReq')}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-lg border-l-4 border-blue-400">
              <h4 className="text-blue-400 font-semibold">{t('howItWorks.questionnaireForm.companySection')}</h4>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-white">{t('howItWorks.questionnaireForm.companyName')}</span>
                  <span className="text-white/50">{t('howItWorks.questionnaireForm.companyNameReq')}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-white">{t('howItWorks.questionnaireForm.businessType')}</span>
                  <span className="text-white/50">{t('howItWorks.questionnaireForm.businessTypeReq')}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-white">{t('howItWorks.questionnaireForm.businessModel')}</span>
                  <span className="text-white/50">{t('howItWorks.questionnaireForm.businessModelReq')}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-white">{t('howItWorks.questionnaireForm.products')}</span>
                  <span className="text-white/50">{t('howItWorks.questionnaireForm.productsReq')}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="text-yellow-400 font-semibold">{t('howItWorks.questionnaireForm.financialSection')}</h4>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-white">{t('howItWorks.questionnaireForm.monthlyTPV')}</span>
                  <span className="text-white/50">{t('howItWorks.questionnaireForm.monthlyTPVReq')}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-white">{t('howItWorks.questionnaireForm.avgTicket')}</span>
                  <span className="text-white/50">{t('howItWorks.questionnaireForm.avgTicketReq')}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-white">{t('howItWorks.questionnaireForm.monthlyTransactions')}</span>
                  <span className="text-white/50">{t('howItWorks.questionnaireForm.monthlyTransactionsReq')}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-lg border-l-4 border-purple-400">
              <h4 className="text-purple-400 font-semibold">{t('howItWorks.questionnaireForm.partnerSection')}</h4>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-white">{t('howItWorks.questionnaireForm.hasPartner')}</span>
                  <span className="text-white/50">{t('howItWorks.questionnaireForm.hasPartnerReq')}</span>
                </div>
                <p className="text-white/50 text-xs mt-2">{t('howItWorks.questionnaireForm.conditionalNote')}</p>
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-white">{t('howItWorks.questionnaireForm.currentRate')}</span>
                  <span className="text-white/50">{t('howItWorks.questionnaireForm.currentRateReq')}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-white">{t('howItWorks.questionnaireForm.currentFee')}</span>
                  <span className="text-white/50">{t('howItWorks.questionnaireForm.currentFeeReq')}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-lg border-l-4 border-green-400">
              <h4 className="text-green-400 font-semibold">{t('howItWorks.questionnaireForm.settlementSection')}</h4>
              <div className="mt-3 text-sm">
                <div className="flex justify-between items-center py-1">
                  <span className="text-white">{t('howItWorks.questionnaireForm.expectedSettlement')}</span>
                  <span className="text-white/50">{t('howItWorks.questionnaireForm.expectedSettlementReq')}</span>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">{t('howItWorks.questionnaireForm.afterSubmit')}</h3>
          <p className="text-white/70">{t('howItWorks.questionnaireForm.afterSubmitDesc')}</p>
          <ol className="text-white/60 text-sm mt-2 space-y-2 list-decimal list-inside ml-4">
            <li>{t('howItWorks.questionnaireForm.afterSubmitList.item1')}</li>
            <li>{t('howItWorks.questionnaireForm.afterSubmitList.item2')}</li>
            <li>{t('howItWorks.questionnaireForm.afterSubmitList.item3')}</li>
            <li>{t('howItWorks.questionnaireForm.afterSubmitList.item4')}</li>
          </ol>
        </CardContent>
      </Card>

      {/* ==================== PÁGINA: CENTRAL DE QUESTIONÁRIOS ==================== */}
      <Card id="questionario-center" className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <ClipboardList className="h-7 w-7" />
            {t('howItWorks.questionnaireCenter.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-white/60 text-sm"><strong className="text-white">{t('howItWorks.questionnaireCenter.path')}</strong> {t('howItWorks.questionnaireCenter.pathDesc')}</p>
            <p className="text-white/60 text-sm mt-1"><strong className="text-white">{t('howItWorks.questionnaireCenter.purpose')}</strong> {t('howItWorks.questionnaireCenter.purposeDesc')}</p>
          </div>

          <h3 className="text-white font-bold text-lg">{t('howItWorks.questionnaireCenter.filters')}</h3>
          <p className="text-white/70">{t('howItWorks.questionnaireCenter.filtersDesc')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div className="bg-white/5 p-3 rounded-lg">
              <span className="text-[#2bc196] text-sm font-semibold">{t('howItWorks.questionnaireCenter.filterSearch')}</span>
              <p className="text-white/50 text-xs mt-1">{t('howItWorks.questionnaireCenter.filterSearchDesc')}</p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <span className="text-[#2bc196] text-sm font-semibold">{t('howItWorks.questionnaireCenter.filterStatus')}</span>
              <p className="text-white/50 text-xs mt-1">{t('howItWorks.questionnaireCenter.filterStatusDesc')}</p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <span className="text-[#2bc196] text-sm font-semibold">{t('howItWorks.questionnaireCenter.filterPartner')}</span>
              <p className="text-white/50 text-xs mt-1">{t('howItWorks.questionnaireCenter.filterPartnerDesc')}</p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <span className="text-[#2bc196] text-sm font-semibold">{t('howItWorks.questionnaireCenter.filterTPVMin')}</span>
              <p className="text-white/50 text-xs mt-1">{t('howItWorks.questionnaireCenter.filterTPVMinDesc')}</p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <span className="text-[#2bc196] text-sm font-semibold">{t('howItWorks.questionnaireCenter.filterTPVMax')}</span>
              <p className="text-white/50 text-xs mt-1">{t('howItWorks.questionnaireCenter.filterTPVMaxDesc')}</p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <span className="text-[#2bc196] text-sm font-semibold">{t('howItWorks.questionnaireCenter.filterActions')}</span>
              <p className="text-white/50 text-xs mt-1">{t('howItWorks.questionnaireCenter.filterActionsDesc')}</p>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">{t('howItWorks.questionnaireCenter.cards')}</h3>
          <p className="text-white/70">{t('howItWorks.questionnaireCenter.cardsDesc')}</p>
          <div className="bg-white/5 p-4 rounded-lg mt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[#2bc196] font-semibold">{t('howItWorks.questionnaireCenter.visibleInfo')}</p>
                <ul className="text-white/60 mt-2 space-y-1 list-disc list-inside">
                  <li>{t('howItWorks.questionnaireCenter.visibleInfoList.item1')}</li>
                  <li>{t('howItWorks.questionnaireCenter.visibleInfoList.item2')}</li>
                  <li>{t('howItWorks.questionnaireCenter.visibleInfoList.item3')}</li>
                  <li>{t('howItWorks.questionnaireCenter.visibleInfoList.item4')}</li>
                  <li>{t('howItWorks.questionnaireCenter.visibleInfoList.item5')}</li>
                  <li>{t('howItWorks.questionnaireCenter.visibleInfoList.item6')}</li>
                  <li>{t('howItWorks.questionnaireCenter.visibleInfoList.item7')}</li>
                </ul>
              </div>
              <div>
                <p className="text-[#2bc196] font-semibold">{t('howItWorks.questionnaireCenter.actionButtons')}</p>
                <ul className="text-white/60 mt-2 space-y-1 list-disc list-inside">
                  <li><Eye className="h-3 w-3 inline" /> {t('howItWorks.questionnaireCenter.actionButtonsList.viewDetails')}</li>
                  <li><FileText className="h-3 w-3 inline" /> {t('howItWorks.questionnaireCenter.actionButtonsList.generateProposal')}</li>
                  <li><Trash2 className="h-3 w-3 inline" /> {t('howItWorks.questionnaireCenter.actionButtonsList.delete')}</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">{t('howItWorks.questionnaireCenter.detailsModal')}</h3>
          <p className="text-white/70">{t('howItWorks.questionnaireCenter.detailsModalDesc')}</p>
          <ul className="text-white/60 text-sm mt-2 space-y-1 list-disc list-inside ml-4">
            <li>{t('howItWorks.questionnaireCenter.detailsModalList.item1')}</li>
            <li>{t('howItWorks.questionnaireCenter.detailsModalList.item2')}</li>
            <li>{t('howItWorks.questionnaireCenter.detailsModalList.item3')}</li>
            <li>{t('howItWorks.questionnaireCenter.detailsModalList.item4')}</li>
            <li>{t('howItWorks.questionnaireCenter.detailsModalList.item5')}</li>
            <li>{t('howItWorks.questionnaireCenter.detailsModalList.item6')}</li>
          </ul>

          <h3 className="text-white font-bold text-lg mt-6">{t('howItWorks.questionnaireCenter.csvExport')}</h3>
          <p className="text-white/70">{t('howItWorks.questionnaireCenter.csvExportDesc')}</p>
        </CardContent>
      </Card>

      {/* ==================== PÁGINA: CRIAÇÃO DE PROPOSTA ==================== */}
      <Card id="proposta-criacao" className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <FileText className="h-7 w-7" />
            {t('howItWorks.proposalCreation.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-white/60 text-sm"><strong className="text-white">{t('howItWorks.proposalCreation.path')}</strong> {t('howItWorks.proposalCreation.pathDesc')}</p>
            <p className="text-white/60 text-sm mt-1"><strong className="text-white">{t('howItWorks.proposalCreation.purpose')}</strong> {t('howItWorks.proposalCreation.purposeDesc')}</p>
          </div>

          <h3 className="text-white font-bold text-lg">{t('howItWorks.proposalCreation.layout')}</h3>
          <p className="text-white/70">{t('howItWorks.proposalCreation.layoutDesc')}</p>
          <ul className="text-white/60 text-sm mt-2 space-y-1 list-disc list-inside ml-4">
            <li><strong>{t('howItWorks.proposalCreation.layoutList.left')}</strong> {t('howItWorks.proposalCreation.layoutList.leftDesc')}</li>
            <li><strong>{t('howItWorks.proposalCreation.layoutList.right')}</strong> {t('howItWorks.proposalCreation.layoutList.rightDesc')}</li>
          </ul>

          <h3 className="text-white font-bold text-lg mt-6">{t('howItWorks.proposalCreation.mccSection')}</h3>
          <div className="bg-white/5 p-4 rounded-lg border-l-4 border-yellow-400">
            <p className="text-white/70 mb-3">{t('howItWorks.proposalCreation.mccSectionDesc')}</p>
            <p className="text-white/60 text-sm"><strong>{t('howItWorks.proposalCreation.mccImportant')}</strong> {t('howItWorks.proposalCreation.mccImportantDesc')}</p>
            <p className="text-white/60 text-sm mt-2"><strong>{t('howItWorks.proposalCreation.mccValidation')}</strong> {t('howItWorks.proposalCreation.mccValidationDesc')}</p>
            <p className="text-white/60 text-sm mt-2"><strong>{t('howItWorks.proposalCreation.mccCounter')}</strong> {t('howItWorks.proposalCreation.mccCounterDesc')}</p>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">{t('howItWorks.proposalCreation.interchangeSection')}</h3>
          <div className="bg-white/5 p-4 rounded-lg border-l-4 border-blue-400">
            <p className="text-white/70 mb-3">{t('howItWorks.proposalCreation.interchangeSectionDesc')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-[#2bc196] font-semibold text-sm">{t('howItWorks.proposalCreation.quickSelectOptions')}</p>
                <ul className="text-white/60 text-xs mt-2 space-y-1">
                  <li><span className="text-blue-400">●</span> {t('howItWorks.proposalCreation.quickSelectList.visa')}</li>
                  <li><span className="text-orange-400">●</span> {t('howItWorks.proposalCreation.quickSelectList.mastercard')}</li>
                  <li><span className="text-[#2bc196]">●</span> {t('howItWorks.proposalCreation.quickSelectList.combined')}</li>
                  <li><span className="text-purple-400">●</span> {t('howItWorks.proposalCreation.quickSelectList.custom')}</li>
                </ul>
              </div>
              <div>
                <p className="text-[#2bc196] font-semibold text-sm">{t('howItWorks.proposalCreation.viewFullTable')}</p>
                <p className="text-white/60 text-xs mt-2">{t('howItWorks.proposalCreation.viewFullTableDesc')}</p>
              </div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg mt-4">
              <p className="text-yellow-400 text-sm"><strong>{t('howItWorks.proposalCreation.tip')}</strong> {t('howItWorks.proposalCreation.tipDesc')}</p>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">{t('howItWorks.proposalCreation.creationProcess')}</h3>
          <p className="text-white/70">{t('howItWorks.proposalCreation.creationProcessDesc')}</p>
          <ol className="text-white/60 text-sm mt-2 space-y-2 list-decimal list-inside ml-4">
            <li>{t('howItWorks.proposalCreation.creationProcessList.item1')}</li>
            <li>{t('howItWorks.proposalCreation.creationProcessList.item2')}</li>
            <li>{t('howItWorks.proposalCreation.creationProcessList.item3')}</li>
            <li>{t('howItWorks.proposalCreation.creationProcessList.item4')}</li>
            <li>{t('howItWorks.proposalCreation.creationProcessList.item5')}</li>
            <li>{t('howItWorks.proposalCreation.creationProcessList.item6')}</li>
            <li>{t('howItWorks.proposalCreation.creationProcessList.item7')}</li>
          </ol>
        </CardContent>
      </Card>

      {/* ==================== PÁGINA: CENTRAL DE PROPOSTAS ==================== */}
      <Card id="proposta-center" className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <FileText className="h-7 w-7" />
            {t('howItWorks.proposalCenter.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-white/60 text-sm"><strong className="text-white">{t('howItWorks.proposalCenter.path')}</strong> {t('howItWorks.proposalCenter.pathDesc')}</p>
            <p className="text-white/60 text-sm mt-1"><strong className="text-white">{t('howItWorks.proposalCenter.purpose')}</strong> {t('howItWorks.proposalCenter.purposeDesc')}</p>
          </div>

          <h3 className="text-white font-bold text-lg">{t('howItWorks.proposalCenter.specialFeatures')}</h3>
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-[#2bc196] font-semibold">{t('howItWorks.proposalCenter.duplicateProposal')}</h4>
              <p className="text-white/60 text-sm mt-2">{t('howItWorks.proposalCenter.duplicateProposalDesc')}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-[#2bc196] font-semibold">{t('howItWorks.proposalCenter.versionHistory')}</h4>
              <p className="text-white/60 text-sm mt-2">{t('howItWorks.proposalCenter.versionHistoryDesc')}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-[#2bc196] font-semibold">{t('howItWorks.proposalCenter.csvExport')}</h4>
              <p className="text-white/60 text-sm mt-2">{t('howItWorks.proposalCenter.csvExportDesc')}</p>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">{t('howItWorks.proposalCenter.proposalStatus')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-center text-sm mt-4">
            <div className="bg-gray-500/20 p-3 rounded">
              <div className="text-gray-400 font-bold">{t('howItWorks.proposalCenter.statusDraft')}</div>
              <div className="text-white/50 text-xs">{t('howItWorks.proposalCenter.statusDraftDesc')}</div>
            </div>
            <div className="bg-blue-500/20 p-3 rounded">
              <div className="text-blue-400 font-bold">{t('howItWorks.proposalCenter.statusSent')}</div>
              <div className="text-white/50 text-xs">{t('howItWorks.proposalCenter.statusSentDesc')}</div>
            </div>
            <div className="bg-green-500/20 p-3 rounded">
              <div className="text-green-400 font-bold">{t('howItWorks.proposalCenter.statusAccepted')}</div>
              <div className="text-white/50 text-xs">{t('howItWorks.proposalCenter.statusAcceptedDesc')}</div>
            </div>
            <div className="bg-yellow-500/20 p-3 rounded">
              <div className="text-yellow-400 font-bold">{t('howItWorks.proposalCenter.statusCounter')}</div>
              <div className="text-white/50 text-xs">{t('howItWorks.proposalCenter.statusCounterDesc')}</div>
            </div>
            <div className="bg-red-500/20 p-3 rounded">
              <div className="text-red-400 font-bold">{t('howItWorks.proposalCenter.statusRejected')}</div>
              <div className="text-white/50 text-xs">{t('howItWorks.proposalCenter.statusRejectedDesc')}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ==================== PÁGINA: PROPOSTA PÚBLICA ==================== */}
      <Card id="proposta-publica" className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <Globe className="h-7 w-7" />
            {t('howItWorks.publicProposal.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-white/60 text-sm"><strong className="text-white">{t('howItWorks.publicProposal.path')}</strong> {t('howItWorks.publicProposal.pathDesc')}</p>
            <p className="text-white/60 text-sm mt-1"><strong className="text-white">{t('howItWorks.publicProposal.purpose')}</strong> {t('howItWorks.publicProposal.purposeDesc')}</p>
            <p className="text-white/60 text-sm mt-1"><strong className="text-white">{t('howItWorks.publicProposal.whoUses')}</strong> {t('howItWorks.publicProposal.whoUsesDesc')}</p>
          </div>

          <h3 className="text-white font-bold text-lg">{t('howItWorks.publicProposal.clientActions')}</h3>
          <p className="text-white/70">{t('howItWorks.publicProposal.clientActionsDesc')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-green-500/20 p-4 rounded-lg text-center">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h4 className="text-green-400 font-semibold">{t('howItWorks.publicProposal.acceptButton')}</h4>
              <p className="text-white/50 text-xs mt-2">{t('howItWorks.publicProposal.acceptButtonDesc')}</p>
            </div>
            <div className="bg-yellow-500/20 p-4 rounded-lg text-center">
              <ArrowRight className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <h4 className="text-yellow-400 font-semibold">{t('howItWorks.publicProposal.counterButton')}</h4>
              <p className="text-white/50 text-xs mt-2">{t('howItWorks.publicProposal.counterButtonDesc')}</p>
            </div>
            <div className="bg-red-500/20 p-4 rounded-lg text-center">
              <Percent className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <h4 className="text-red-400 font-semibold">{t('howItWorks.publicProposal.rejectButton')}</h4>
              <p className="text-white/50 text-xs mt-2">{t('howItWorks.publicProposal.rejectButtonDesc')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ==================== PÁGINA: PIPELINE KANBAN ==================== */}
      <Card id="pipeline" className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <Kanban className="h-7 w-7" />
            {t('howItWorks.pipelineKanban.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-white/60 text-sm"><strong className="text-white">{t('howItWorks.pipelineKanban.path')}</strong> {t('howItWorks.pipelineKanban.pathDesc')}</p>
            <p className="text-white/60 text-sm mt-1"><strong className="text-white">{t('howItWorks.pipelineKanban.purpose')}</strong> {t('howItWorks.pipelineKanban.purposeDesc')}</p>
          </div>

          <h3 className="text-white font-bold text-lg">{t('howItWorks.pipelineKanban.columns')}</h3>
          <div className="grid grid-cols-5 gap-2 text-center text-xs mt-4">
            <div className="bg-gray-500/20 p-2 rounded">
              <div className="w-3 h-3 rounded-full bg-gray-500 mx-auto mb-1"></div>
              <div className="text-gray-400 font-bold">{t('howItWorks.pipelineKanban.columnLeads')}</div>
              <div className="text-white/50">{t('howItWorks.pipelineKanban.columnLeadsDesc')}</div>
            </div>
            <div className="bg-blue-500/20 p-2 rounded">
              <div className="w-3 h-3 rounded-full bg-blue-500 mx-auto mb-1"></div>
              <div className="text-blue-400 font-bold">{t('howItWorks.pipelineKanban.columnProposalSent')}</div>
              <div className="text-white/50">{t('howItWorks.pipelineKanban.columnProposalSentDesc')}</div>
            </div>
            <div className="bg-green-500/20 p-2 rounded">
              <div className="w-3 h-3 rounded-full bg-green-500 mx-auto mb-1"></div>
              <div className="text-green-400 font-bold">{t('howItWorks.pipelineKanban.columnAccepted')}</div>
              <div className="text-white/50">{t('howItWorks.pipelineKanban.columnAcceptedDesc')}</div>
            </div>
            <div className="bg-yellow-500/20 p-2 rounded">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mx-auto mb-1"></div>
              <div className="text-yellow-400 font-bold">{t('howItWorks.pipelineKanban.columnCounter')}</div>
              <div className="text-white/50">{t('howItWorks.pipelineKanban.columnCounterDesc')}</div>
            </div>
            <div className="bg-red-500/20 p-2 rounded">
              <div className="w-3 h-3 rounded-full bg-red-500 mx-auto mb-1"></div>
              <div className="text-red-400 font-bold">{t('howItWorks.pipelineKanban.columnLost')}</div>
              <div className="text-white/50">{t('howItWorks.pipelineKanban.columnLostDesc')}</div>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">{t('howItWorks.pipelineKanban.dragAndDrop')}</h3>
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-white/70"><strong>{t('howItWorks.pipelineKanban.dragAndDropHow')}</strong> {t('howItWorks.pipelineKanban.dragAndDropHowDesc')}</p>
            <p className="text-white/60 text-sm mt-2"><strong>{t('howItWorks.pipelineKanban.dragAndDropFeedback')}</strong> {t('howItWorks.pipelineKanban.dragAndDropFeedbackDesc')}</p>
          </div>
        </CardContent>
      </Card>

      {/* ==================== PÁGINA: SIMULADOR DE RECEITA ==================== */}
      <Card id="simulador" className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <Calculator className="h-7 w-7" />
            {t('howItWorks.revenueSimulator.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-white/60 text-sm"><strong className="text-white">{t('howItWorks.revenueSimulator.path')}</strong> {t('howItWorks.revenueSimulator.pathDesc')}</p>
            <p className="text-white/60 text-sm mt-1"><strong className="text-white">{t('howItWorks.revenueSimulator.purpose')}</strong> {t('howItWorks.revenueSimulator.purposeDesc')}</p>
          </div>

          <h3 className="text-white font-bold text-lg">{t('howItWorks.revenueSimulator.results')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#2bc196]/20 p-3 rounded-lg text-center">
              <p className="text-white/60 text-xs">{t('howItWorks.revenueSimulator.grossRevenue')}</p>
              <p className="text-[#2bc196] font-bold">{t('howItWorks.revenueSimulator.grossRevenueDesc')}</p>
            </div>
            <div className="bg-red-500/20 p-3 rounded-lg text-center">
              <p className="text-white/60 text-xs">{t('howItWorks.revenueSimulator.totalCosts')}</p>
              <p className="text-red-400 font-bold">{t('howItWorks.revenueSimulator.totalCostsDesc')}</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-lg text-center">
              <p className="text-white/60 text-xs">{t('howItWorks.revenueSimulator.netRevenue')}</p>
              <p className="text-green-400 font-bold">{t('howItWorks.revenueSimulator.netRevenueDesc')}</p>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-lg text-center">
              <p className="text-white/60 text-xs">{t('howItWorks.revenueSimulator.margin')}</p>
              <p className="text-purple-400 font-bold">{t('howItWorks.revenueSimulator.marginDesc')}</p>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">{t('howItWorks.revenueSimulator.charts')}</h3>
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-[#2bc196] font-semibold">{t('howItWorks.revenueSimulator.annualChart')}</h4>
              <p className="text-white/60 text-sm mt-2">{t('howItWorks.revenueSimulator.annualChartDesc')}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-[#2bc196] font-semibold">{t('howItWorks.revenueSimulator.costBreakdown')}</h4>
              <p className="text-white/60 text-sm mt-2">{t('howItWorks.revenueSimulator.costBreakdownDesc')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ==================== PÁGINA: TABELA DE INTERCHANGE ==================== */}
      <Card id="interchange" className="bg-white/5 border-[#2bc196]/20">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <Table2 className="h-7 w-7" />
            {t('howItWorks.interchangeTable.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-white/60 text-sm"><strong className="text-white">{t('howItWorks.interchangeTable.path')}</strong> {t('howItWorks.interchangeTable.pathDesc')}</p>
            <p className="text-white/60 text-sm mt-1"><strong className="text-white">{t('howItWorks.interchangeTable.purpose')}</strong> {t('howItWorks.interchangeTable.purposeDesc')}</p>
          </div>

          <h3 className="text-white font-bold text-lg">{t('howItWorks.interchangeTable.tabs')}</h3>
          <div className="flex gap-2 mt-4">
            <div className="bg-[#2bc196] px-4 py-2 rounded-lg text-[#002443] font-semibold">{t('howItWorks.interchangeTable.tabSummary')}</div>
            <div className="bg-white/10 px-4 py-2 rounded-lg text-white/70">{t('howItWorks.interchangeTable.tabVisa')}</div>
            <div className="bg-white/10 px-4 py-2 rounded-lg text-white/70">{t('howItWorks.interchangeTable.tabMastercard')}</div>
          </div>

          <h3 className="text-white font-bold text-lg mt-6">{t('howItWorks.interchangeTable.legend')}</h3>
          <div className="bg-white/5 p-4 rounded-lg">
            <ul className="text-white/60 text-sm space-y-2">
              <li><span className="text-green-400">{t('howItWorks.interchangeTable.legendLowest')}</span> {t('howItWorks.interchangeTable.legendLowestDesc')}</li>
              <li><span className="text-yellow-400">{t('howItWorks.interchangeTable.legendAverage')}</span> {t('howItWorks.interchangeTable.legendAverageDesc')}</li>
              <li><span className="text-red-400">{t('howItWorks.interchangeTable.legendHighest')}</span> {t('howItWorks.interchangeTable.legendHighestDesc')}</li>
              <li><span className="text-[#2bc196]">{t('howItWorks.interchangeTable.legendCombined')}</span> {t('howItWorks.interchangeTable.legendCombinedDesc')}</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* ==================== DICAS E BOAS PRÁTICAS ==================== */}
      <Card id="dicas" className="bg-gradient-to-br from-[#2bc196]/20 to-[#002443] border-[#2bc196]">
        <CardHeader>
          <CardTitle className="text-[#2bc196] flex items-center gap-3 text-2xl">
            <Lightbulb className="h-7 w-7" />
            {t('howItWorks.tips.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="text-white/80 space-y-3">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#2bc196] flex-shrink-0 mt-0.5" />
              <span><strong>{t('howItWorks.tips.tip1')}</strong> {t('howItWorks.tips.tip1Desc')}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#2bc196] flex-shrink-0 mt-0.5" />
              <span><strong>{t('howItWorks.tips.tip2')}</strong> {t('howItWorks.tips.tip2Desc')}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#2bc196] flex-shrink-0 mt-0.5" />
              <span><strong>{t('howItWorks.tips.tip3')}</strong> {t('howItWorks.tips.tip3Desc')}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#2bc196] flex-shrink-0 mt-0.5" />
              <span><strong>{t('howItWorks.tips.tip4')}</strong> {t('howItWorks.tips.tip4Desc')}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#2bc196] flex-shrink-0 mt-0.5" />
              <span><strong>{t('howItWorks.tips.tip5')}</strong> {t('howItWorks.tips.tip5Desc')}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#2bc196] flex-shrink-0 mt-0.5" />
              <span><strong>{t('howItWorks.tips.tip6')}</strong> {t('howItWorks.tips.tip6Desc')}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#2bc196] flex-shrink-0 mt-0.5" />
              <span><strong>{t('howItWorks.tips.tip7')}</strong> {t('howItWorks.tips.tip7Desc')}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#2bc196] flex-shrink-0 mt-0.5" />
              <span><strong>{t('howItWorks.tips.tip8')}</strong> {t('howItWorks.tips.tip8Desc')}</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center py-8">
        <p className="text-white/40 text-sm">{t('howItWorks.footer')}</p>
      </div>
    </div>
  );
}