import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StepData } from '../data/steps';
import { Play, Pause } from 'lucide-react';

interface StepPanelProps {
  currentStep: number;
  steps: StepData[];
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const StepPanel: React.FC<StepPanelProps> = ({
  currentStep,
  steps,
  isPlaying,
  onTogglePlay
}) => {
  const step = steps[currentStep];

  return (
    <div className="flex flex-col h-full">
      {/* 动态标题栏：显示每一步的具体标题和图标 */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentStep}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="p-2 bg-blue-50 rounded-xl shadow-sm border border-blue-100/50 text-blue-600">
            {step.icon}
          </div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            {step.title}
          </h2>
        </motion.div>
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto pr-2 pb-4 custom-scrollbar">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-5"
        >
          {/* 核心结论卡片 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm ring-4 ring-slate-100/50">
            <h3 className="text-lg font-semibold text-slate-800 leading-relaxed">
              {step.desc}
            </h3>
          </div>

          {/* 详细几何证明过程 */}
          <div className="bg-slate-100/50 border border-slate-200/60 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-5 underline decoration-slate-300 text-xs font-bold uppercase tracking-widest text-slate-900">
              Geometry Proof
            </div>
            <h4 className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              详细推导过程
            </h4>
            <div className="text-slate-700 leading-loose whitespace-pre-line font-serif text-[15px]">
              {step.detail}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="pt-6 mt-auto">
        <button
          onClick={onTogglePlay}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 active:scale-[0.98] ${
            isPlaying 
              ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-200' 
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200'
          }`}
        >
          {isPlaying ? (
            <>
              <div className="flex gap-1 items-center justify-center">
                <span className="w-1 h-4 bg-white animate-bounce" style={{ animationDelay: '0s' }} />
                <span className="w-1 h-4 bg-white animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="w-1 h-4 bg-white animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
              暂停讲解
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current" />
              👩‍🏫 老师讲解
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StepPanel;
