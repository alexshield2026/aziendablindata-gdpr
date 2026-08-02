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
    id: 'mfa',
    title: '1. Controllo Accessi & Autenticazione',
   question: "Come gestite l'accesso alle email e ai software gestionali aziendali?",
label: "Tutti gli account utilizzano l'Autenticazione a Due Fattori (MFA/2FA)",
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
        label: 'Usiamo solo password semplici / credenziali condivise', 
        score: 20,
        solution: '🚨 Azione Immediata MFA: L'assenza di MFA è la prima causa di violazione aziendale. Abilitare immediatamente l'MFA tramite App Authenticator su tutta la struttura.' 
      },
    ]
  },
  {
    id: 'backup',
    title: '2. Backup & Disaster Recovery',
    question: 'Qual è la frequenza e la modalità di salvataggio dei dati aziendali?',
    options: [
      { 
        label: 'Backup automatici giornalieri, cifrati e con copia off-site isolata', 
        score: 0 
      },
      { 
        label: 'Backup frequenti ma salvati solo su dischi locali / mai testati', 
        score: 10,
        solution: '💾 Test di Ripristino Periodico: Effettuare una simulazione di Disaster Recovery per verificare che i backup siano leggibili in caso di blocco totale.' 
      },
      { 
        label: 'Backup manuali, occasionali o assenti', 
        score: 20,
        solution: '🛡️ Implementare Regola 3-2-1: Configurare backup automatici cifrati off-site/cloud immutabili. Un backup non isolato viene cifrato insieme ai dati durante un attacco Ransomware.' 
      },
    ]
  },
  {
    id: 'databreach',
    title: '3. Procedura Data Breach (72h)',
    question: 'Avete una procedura formalizzata per gestire e notificare un Data Breach entro 72h al Garante?',
    options: [
      { 
        label: 'Sì, piano d'incidente pronto con ruoli e consulenti definiti', 
        score: 0 
      },
      { 
        label: 'Conosciamo la norma, ma non abbiamo una procedura scritta', 
        score: 10,
        solution: '📋 Schematizzare l'Incident Response: Creare un documento sintetico con ruoli, contatti di emergenza e checklist per la notifica preliminare entro 72 ore.' 
      },
      { 
        label: 'No, non sapremmo come intervenire', 
        score: 20,
        solution: '⚖️ Redazione Piano di Emergenza GDPR: La mancata notifica al Garante comporta sanzioni fino a 10 milioni di € o al 2% del fatturato. Nominare subito un referente per i Data Breach.' 
      },
    ]
  },
  {
    id: 'training',
    title: '4. Formazione del Personale',
    question: 'I dipendenti ricevono addestramento periodico contro email di Phishing e truffe?',
    options: [
      { 
        label: 'Sì, formazione e simulazioni periodiche attive', 
        score: 0 
      },
      { 
        label: 'Formazione fatta solo una volta in passato', 
        score: 10,
        solution: '🔄 Formazione Continua: Le tecniche di Social Engineering cambiano continuamente con l'IA. Pianificare aggiornamenti almeno semestrali.' 
      },
      { 
        label: 'Nessuna formazione erogata', 
        score: 20,
        solution: '👥 Training Cyber Hygiene: Il 90% degli attacchi parte da un click errato di un dipendente. Avviare subito un piano base di formazione contro il Phishing.' 
      },
    ]
  },
  {
    id: 'gdpr_docs',
    title: '5. Compliance & Registro Trattamenti',
    question: 'Il Registro dei Trattamenti e le nomine dei fornitori/IT sono aggiornati?',
    options: [
      { 
        label: 'Sì, documentazione completa e aggiornata', 
        score: 0 
      },
      { 
        label: 'Documentazione presente ma obsoleta', 
        score: 10,
        solution: '📄 Revisione Annuale Registro: Aggiornare il Registro dei Trattamenti includendo i nuovi strumenti cloud e di Intelligenza Artificiale eventualmente adottati.' 
      },
      { 
        label: 'Nessun Registro dei Trattamenti formalizzato', 
        score: 20,
        solution: '⚠️ Regolarizzazione Documentale (Art. 30): Formalizzare il Registro dei Trattamenti e stipulare gli accordi sulla gestione dati (DPA) con tutti i fornitori IT esterni.' 
      },
    ]
  }
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);

  const handleSelect = (option: Option) => {
    const nextScore = score + option.score;
    setScore(nextScore);

    if (option.solution) {
      setSelectedSolutions((prev) => [...prev, option.solution!]);
    }

    if (currentStep + 1 < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const resetAssessment = () => {
    setCurrentStep(0);
    setScore(0);
    setSelectedSolutions([]);
    setCompleted(false);
  };

  const getRiskLevel = () => {
    if (score <= 20) {
      return { 
        level: 'BASSO', 
        color: 'text-emerald-400', 
        bg: 'bg-emerald-950/40 border-emerald-800',
        icon: <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto mb-2" />,
        desc: 'La tua azienda mostra presidi di sicurezza adeguati. Mantieni aggiornate le procedure.'
      };
    }
    if (score <= 55) {
      return { 
        level: 'MODERATO', 
        color: 'text-amber-400', 
        bg: 'bg-amber-950/40 border-amber-800',
        icon: <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-2" />,
        desc: 'Sono presenti vulnerabilità operative che espongono l'azienda a sanzioni o perdita dati.'
      };
    }
    return { 
      level: 'CRITICO', 
      color: 'text-rose-500', 
      bg: 'bg-rose-950/40 border-rose-800',
      icon: <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto mb-2" />,
      desc: 'Rischio elevato di sanzioni GDPR e vulnerabilità critica contro attacchi Cyber/Ransomware.'
    };
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Lock className="w-6 h-6 text-blue-500" />
            <span className="font-bold text-lg tracking-tight text-white">AZIENDA BLINDATA</span>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-900/50 text-blue-300 border border-blue-700/50">
            GDPR & Cyber Risk Audit
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-10 flex flex-col justify-center">
        {!completed ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-2 rounded-full mb-8 overflow-hidden">
              <div 
                className="bg-blue-500 h-full transition-all duration-300 ease-out"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                Fase {currentStep + 1} di {questions.length}
              </span>
              <span className="text-xs text-slate-500">Self-Assessment Anonimo</span>
            </div>

            <h1 className="text-xl md:text-2xl font-bold mb-3 text-slate-100">
              {questions[currentStep].title}
            </h1>
            <p className="text-slate-300 mb-8 text-sm md:text-base leading-relaxed">
              {questions[currentStep].question}
            </p>

            <div className="space-y-4">
              {questions[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(opt)}
                  className="w-full text-left p-4 md:p-5 rounded-xl bg-slate-800/80 hover:bg-blue-600/10 hover:border-blue-500 border border-slate-700/80 transition-all duration-200 group flex items-center justify-between"
                >
                  <span className="text-sm md:text-base text-slate-200 group-hover:text-white pr-4">
                    {opt.label}
                  </span>
                  <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-8">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                Report di Valutazione GDPR & Cybersecurity
              </h2>
              <p className="text-slate-400 text-sm">Analisi basata sulle linee guida dell'art. 32 del Regolamento UE 2016/679</p>
            </div>

            {/* Risk Box */}
            <div className={`p-6 rounded-xl border text-center ${getRiskLevel().bg}`}>
              {getRiskLevel().icon}
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Livello di Rischio Complessivo</p>
              <p className={`text-4xl md:text-5xl font-black mt-1 mb-2 ${getRiskLevel().color}`}>
                {getRiskLevel().level} <span className="text-xl font-normal text-slate-400">({score}/100)</span>
              </p>
              <p className="text-sm text-slate-300 max-w-md mx-auto">{getRiskLevel().desc}</p>
            </div>

            {/* Solutions Section */}
            {selectedSolutions.length > 0 ? (
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  Piano di Intervento & Soluzioni Consigliate:
                </h3>
                <div className="space-y-3">
                  {selectedSolutions.map((sol, index) => (
                    <div key={index} className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/70 text-sm text-slate-200 leading-relaxed">
                      {sol}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-6 bg-emerald-950/20 border border-emerald-800/50 rounded-xl text-center text-emerald-300 text-sm">
                🎉 Complimenti! La tua struttura rispetta pienamente le principali misure di sicurezza tecniche e organizzative richieste dal GDPR.
              </div>
            )}

            {/* Call to Action */}
            <div className="pt-6 border-t border-slate-800 text-center space-y-4">
              <p className="text-sm text-slate-300">
                Vuoi mettere in sicurezza la tua azienda ed evitare sanzioni? Trovi la guida completa nel manuale:
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a
                  href="https://www.amazon.it/dp/B0HBYGDKXW"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-8 rounded-xl transition shadow-lg shadow-blue-600/20"
                >
                  <BookOpen className="w-5 h-5" />
                  Acquista "AZIENDA BLINDATA" su Amazon
                </a>
                <button
                  onClick={resetAssessment}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-3.5 px-6 rounded-xl border border-slate-700 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  Ripeti Audit
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-6 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Alex Shield — AZIENDA BLINDATA. Tool ad uso informativo di pre-assessment.</p>
      </footer>
    </div>
  );
}
