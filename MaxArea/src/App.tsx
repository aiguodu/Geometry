import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, RotateCcw, Play, Pause, Loader } from 'lucide-react';
import { steps } from './data/steps';
import { GeometrySVG } from './components/GeometrySVG';
import { Formula } from './components/Formula';
import { generateAndPlayTts, stopCurrentTts } from './ttsService';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type TtsState = 'idle' | 'loading' | 'playing' | 'paused' | 'error';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const renderTextWithMath = (text: string) => {
  const parts = text.split(/(\$[^$]+\$)/g);
  return parts.map((part, index) => {
    if (part.startsWith('$') && part.endsWith('$')) {
      const tex = part.slice(1, -1);
      return <Formula key={index} tex={tex} />;
    }
    return part;
  });
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function App() {
  const [currentStep, setCurrentStep] = useState(0);

  // TTS state
  const [ttsState, setTtsState] = useState<TtsState>('idle');
  const [ttsError, setTtsError] = useState<string | null>(null);
  const [subtitle, setSubtitle] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Stop TTS when step changes
  useEffect(() => {
    stopCurrentTts();
    audioRef.current = null;
    setTtsState('idle');
    setTtsError(null);
    setSubtitle(null);
  }, [currentStep]);

  // TTS playback
  const handlePlayPause = useCallback(async () => {
    if (ttsState === 'loading') return;

    if (ttsState === 'playing') {
      audioRef.current?.pause();
      setTtsState('paused');
      return;
    }

    if (ttsState === 'paused' && audioRef.current) {
      audioRef.current.play();
      setTtsState('playing');
      return;
    }

    setTtsState('loading');
    setTtsError(null);
    const ttsText = steps[currentStep].tts;
    setSubtitle(ttsText);

    try {
      const audio = await generateAndPlayTts(
        ttsText,
        undefined,
        () => {
          setTtsState('idle');
        }
      );
      audioRef.current = audio;
      setTtsState('playing');
    } catch (err) {
      console.error('[TTS]', err);
      setTtsError('TTS 失败');
      setTtsState('error');
    }
  }, [ttsState, currentStep]);

  const ttsIcon = () => {
    switch (ttsState) {
      case 'loading': return <Loader className="w-5 h-5 animate-spin" />;
      case 'playing': return <Pause className="w-5 h-5" />;
      default:        return <Play  className="w-5 h-5" />;
    }
  };

  const nextStep = () => setCurrentStep(s => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(s => Math.max(s - 1, 0));
  const reset = () => setCurrentStep(0);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 flex items-center justify-center font-sans">
      <div className="flex flex-col w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-slate-100">
        
        {/* ── Header ── */}
        <header className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-4">
             <div className="w-2 h-8 bg-blue-600 rounded-full" />
             <h1 className="text-2xl font-black text-slate-800 tracking-tight">
               翻折中的面积最大值
             </h1>
             <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
               几何综合题
             </span>
          </div>
          <div className="text-sm font-bold text-slate-400 bg-slate-50 px-4 py-2 rounded-2xl">
            Step {currentStep + 1} / {steps.length}
          </div>
        </header>

        {/* ── Main Content Area ── */}
        <div className="flex flex-col md:flex-row h-[580px]">
          
          {/* ── Left: Visual Area (55%) ── */}
          <div className="w-full md:w-[55%] relative bg-[#fdfdfd] border-r border-slate-50 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full p-8 flex items-center justify-center">
              <GeometrySVG step={currentStep} />
            </div>

            {/* Subtitle Overlay (Glassmorphism) */}
            <AnimatePresence>
              {subtitle && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-6 left-6 right-6 z-20"
                >
                  <div className="bg-slate-900/80 backdrop-blur-xl text-white p-5 rounded-2xl shadow-2xl border border-white/10">
                    <div className="flex gap-4 items-start">
                      <div className="bg-blue-500 p-2 rounded-lg shrink-0">
                        <Play className="w-3 h-3 fill-white" />
                      </div>
                      <p className="text-sm leading-relaxed font-medium opacity-90">
                        {subtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Right: Explanation Area (45%) ── */}
          <div className="w-full md:w-[45%] bg-slate-50/50 flex flex-col overflow-y-auto custom-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 p-8 flex flex-col gap-6"
              >
                {/* Step title */}
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-blue-600">
                    {steps[currentStep].icon}
                  </div>
                  <h2 className="text-2xl font-black text-slate-800">{steps[currentStep].title}</h2>
                </div>

                {/* Description (Highlighted Core) */}
                <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100">
                  <p className="text-slate-700 text-lg leading-relaxed font-semibold">
                    {renderTextWithMath(steps[currentStep].desc)}
                  </p>
                </div>

                {/* Detail derivation (Monospace/Math feel) */}
                <div className="bg-blue-50/30 p-6 rounded-2xl border border-blue-100/50">
                  <h3 className="text-[10px] font-black text-blue-400 mb-4 uppercase tracking-[0.2em]">Detailed Logic</h3>
                  <div className="text-slate-600 leading-loose whitespace-pre-line text-[15px] font-medium">
                    {renderTextWithMath(steps[currentStep].detail)}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Footer ── */}
        <footer className="bg-white px-8 py-6 border-t border-slate-50 flex justify-between items-center">
          <button 
            onClick={reset}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-800 transition-all font-bold text-sm px-4 py-2 hover:bg-slate-50 rounded-xl"
          >
            <RotateCcw className="w-4 h-4" />
            重置
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={handlePlayPause}
              disabled={ttsState === 'loading'}
              className={`flex items-center justify-center gap-3 px-8 py-3 rounded-2xl font-black transition-all shadow-lg active:scale-95 ${
                ttsState === 'playing' ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' :
                'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200/50'
              } disabled:opacity-50 text-sm`}
            >
              {ttsIcon()}
              {ttsState === 'playing' ? '暂停讲解' : 'Tina老师讲解'}
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="p-3 rounded-2xl border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-slate-900 text-white hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed transition-all font-black text-sm"
            >
              {currentStep === steps.length - 1 ? '完成' : '下一步'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}
