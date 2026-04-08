import React from 'react';
import { motion } from 'motion/react';
import { StepData } from '../data/steps';
import { BookOpen, Play, Pause } from 'lucide-react';

interface StepPanelProps {
  steps: StepData[];
  currentStep: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const StepPanel: React.FC<StepPanelProps> = ({
  steps,
  currentStep,
  isPlaying,
  onTogglePlay
}) => {
  const step = steps[currentStep];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-blue-50 rounded-md">
          <BookOpen className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-lg font-bold text-slate-800">题目解析</h2>
      </div>

      {/* Content Cards */}
      <div className="flex-1 overflow-y-auto pr-2 pb-4">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {/* Main Description Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-lg font-medium text-slate-800 leading-relaxed">
              {step.desc}
            </h3>
          </div>

          {/* Detailed Derivation Card */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-slate-500 mb-3">详细推导过程</h4>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">
              {step.detail}
            </p>
          </div>
        </motion.div>
      </div>

      {/* TTS Control Button */}
      <div className="pt-4 mt-auto">
        <button
          onClick={onTogglePlay}
          className={`w-full py-3.5 px-6 rounded-xl font-medium text-base flex items-center justify-center gap-2 transition-all duration-300 ${
            isPlaying 
              ? 'bg-[#e88b00] text-white hover:bg-[#d17d00] shadow-md' 
              : 'bg-[#2563eb] text-white hover:bg-blue-700 shadow-md'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-5 h-5 fill-current" />
              暂停讲解
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current" />
              👩‍🏫 Tina老师讲解
            </>
          )}
        </button>
      </div>
    </div>
  );
};
