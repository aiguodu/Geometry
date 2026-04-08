import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, RotateCcw, BookOpen, Loader, Play, Pause } from 'lucide-react';
import GeometrySVG from './components/GeometrySVG';
import StepPanel from './components/StepPanel';
import { steps } from './data/steps';
import { generateAndPlayTts, stopCurrentTts } from './ttsService';

type TtsState = 'idle' | 'loading' | 'playing' | 'paused' | 'error';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [ttsState, setTtsState] = useState<TtsState>('idle');
  const [subtitle, setSubtitle] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleReset = () => {
    setCurrentStep(0);
    stopCurrentTts();
    setTtsState('idle');
    setSubtitle(null);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

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
      setTtsState('error');
    }
  }, [ttsState, currentStep]);

  useEffect(() => {
    stopCurrentTts();
    audioRef.current = null;
    setTtsState('idle');
    setSubtitle(steps[currentStep].tts);
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">几何综合 · 相似变换</span>
              <h1 className="text-lg font-bold text-slate-800">旋转相似模型与 Sin∠BFC 计算</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {steps.map((_, idx) => (
              <div 
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentStep ? 'w-6 bg-blue-500' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col md:flex-row h-[570px] relative">
          {/* Left: Graphic Area (55%) */}
          <div className="w-full md:w-[55%] h-full relative bg-white flex items-start justify-center pt-8 overflow-hidden border-r border-slate-50">
            <div className="w-full h-full flex items-start justify-center pb-24">
               <GeometrySVG step={currentStep} />
            </div>
            
            {/* Subtitle Overlay */}
            <AnimatePresence>
              {subtitle && (
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  key={currentStep}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-20"
                >
                  <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/10 flex items-center gap-4">
                    <div className="flex-1 text-slate-100 text-sm leading-relaxed line-clamp-3 text-center px-4 font-medium">
                      {subtitle}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Logic Area (45%) */}
          <div className="w-full md:w-[45%] h-full bg-slate-50 overflow-y-auto custom-scrollbar p-6">
            <StepPanel 
              currentStep={currentStep} 
              steps={steps} 
              isPlaying={ttsState === 'playing'}
              onTogglePlay={handlePlayPause}
            />
          </div>
        </main>

        {/* Footer */}
        <footer className="h-16 bg-white border-t border-slate-100 flex items-center justify-between px-8">
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            重新开始
          </button>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold text-sm transition-all ${
                currentStep === 0 
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed' 
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-200 hover:bg-blue-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              上一步
            </button>
            <button 
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              className={`flex items-center gap-2 px-8 py-2 rounded-xl font-bold text-sm transition-all ${
                currentStep === steps.length - 1
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  : 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95'
              }`}
            >
              {currentStep === steps.length - 1 ? '讲解完成' : '下一步'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
