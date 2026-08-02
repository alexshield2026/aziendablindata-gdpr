'use client';
import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, ArrowRight, BookOpen, RotateCcw, CheckCircle2, Lock } from 'lucide-react';

interface Option {
  label: string;
  score: number;
  solution?: string;
}

interface Question {
  id: string;
  title: string;
  question: string;
  options: Option[];
}

const questions: Question[] = [
  {
    id: "mfa",
    title: "1. Controllo Accessi & Autenticazione",
    question: "Come gestite l'accesso alle email e ai software gestionali aziendali?",
    options: [
      { 
        label: "Tutti gli account utilizzano l'Autenticazione a Due Fattori (MFA/2FA)", 
        score: 0 
      },
      { 
        label: "L'MFA è attiva solo per alcuni account/utenti", 
        score: 10,
        solution: "🔑 Standardizzare l'MFA Obbligatoria: Estendere l'autenticazione a due fattori a TUTTI gli account (email, gestionali, VPN) eliminando eccezioni." 
      },
      { 
        label: "Nessun account utilizza l'MFA (solo password)", 
        score: 20,
        solution: "🚨 Attivazione MFA Immediata: Configurare l'autenticazione a due fattori come priorità assoluta per proteggere le credenziali da attacchi phishing." 
      }
    ]
  },
  {
    id: "backup",
    title: "2. Protezione Dati e Backup",
    question: "Qual è la vostra strategia per il salvataggio dei dati aziendali?",
    options: [
      { 
        label: "Backup automatici quotidiani, cifrati e testati regolarmente (Regola 3-2-1)", 
        score: 0 
      },
      { 
        label: "Backup automatico presente, ma mai testato il ripristino dei dati", 
        score: 10,
        solution: "💾 Test di Ripristino Dati: Pianificare simulazioni periodiche di Disaster Recovery per verificare la reale integrità dei backup." 
      },
      { 
        label: "Nessun backup automatico o salvataggi saltuari su supporto fisico", 
        score: 20,
        solution: "⚠️ Implementazione Backup Cifrato: Adottare una soluzione automatizzata off-site e in cloud conforme alla regola 3-2-1." 
      }
    ]
  },
  {
    id: "incident",
    title: "3. Gestione degli Incidenti e GDPR",
    question: "Avete un piano formalizzato in caso di attacco informatico o data breach?",
    options: [
      { 
        label: "Sì, piano d'incidente pronto con ruoli e consulenti definiti", 
        score: 0 
      },
      { 
        label: "Sappiamo chi contattare, ma manca una procedura scritta formalizzata", 
        score: 10,
        solution: "📜 Formalizzazione Piano Incidenti: Redigere una procedura scritta di Incident Response per rispettare le 72 ore di notifica GDPR." 
      },
      { 
        label: "Nessun piano formalizzato in caso di attacco informatico", 
        score: 20,
        solution: "🚨 Definizione Registro Incidenti: Creare le procedure di risposta alle emergenze e la gestione delle notifiche al Garante." 
      }
    ]
  }
];

export default function Assessment() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionId: string, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((a, b) => a + b, 0);
  };

  const totalScore = calculateScore();

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-4">
          <Lock className="w-4 h-4" /> Assessment GDPR & Cybersecurity
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Valutazione Rischio Aziendale</h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          Rispondi alle domande per analizzare lo stato di sicurezza e conformità della tua azienda.
        </p>
      </header>

      {!submitted ? (
        <div className="space-y-8">
          {questions.map((q) => (
            <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-2">{q.title}</h2>
              <p className="text-slate-400 mb-6">{q.question}</p>
              <div className="space-y-3">
                {q.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(q.id, opt.score)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      answers[q.id] === opt.score
                        ? 'bg-blue-600/20 border-blue-500 text-white'
                        : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={() => setSubmitted(true)}
            disabled={Object.keys(answers).length < questions.length}
            className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium disabled:opacity-50 transition-all flex items-center justify-center gap-2 text-lg"
          >
            Visualizza Risultati <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6">
          <div className="inline-flex p-4 rounded-full bg-blue-500/10 border border-blue-500/20 mb-2">
            {totalScore === 0 ? (
              <ShieldCheck className="w-16 h-16 text-emerald-400" />
            ) : (
              <ShieldAlert className="w-16 h-16 text-amber-400" />
            )}
          </div>
          <h2 className="text-3xl font-bold text-white">Rischio Calcolato: {totalScore} Punti</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            {totalScore === 0
              ? "Ottimo lavoro! La tua azienda rispetta le migliori pratiche di sicurezza informatica."
              : "Sono state rilevate delle criticità. Rivedi le raccomandazioni di sicurezza proposte."}
          </p>

          <button
            onClick={() => { setAnswers({}); setSubmitted(false); }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm transition-all"
          >
            <RotateCcw className="w-4 h-4" /> Ripeti il Test
          </button>
        </div>
      )}
    </main>
  );
}
