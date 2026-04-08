import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GeometrySVGProps {
  step: number;
}

const GeometrySVG: React.FC<GeometrySVGProps> = ({ step }) => {
  // 基础坐标定义 (a = 200)
  const a = 200;
  const h = (Math.sqrt(3) / 2) * a; // 173.2
  
  const B = { x: 100, y: 400 };
  const C = { x: B.x + a, y: B.y };
  const A = { x: B.x + a / 2, y: B.y - h };
  const D = { x: A.x + a, y: A.y };
  const E = { x: B.x + a / 2, y: B.y };
  
  // 对角线 BD 的参数化位置
  // 直线方程: y - B.y = m * (x - B.x)
  // m = (D.y - B.y) / (D.x - B.x) = -h / (1.5a - 0) = -173.2 / 300 = -0.577
  
  // 动点 F 的位置，根据步骤变化
  let F = { x: B.x + 120, y: B.y - 120 * (h / (1.5 * a)) }; // 默认位置
  
  if (step >= 4) {
    // 临界情况：A, F, E 共线
    // AE 是垂直于 BC 的线，x = A.x = B.x + a/2 = 200
    // F 是 AE 与 BD 的交点
    F = { x: A.x, y: B.y - (A.x - B.x) * (h / (1.5 * a)) }; // x=200, y=400 - 100*0.577 = 342.3
  }

  return (
    <svg viewBox="0 0 600 500" className="w-full h-full font-serif italic">
      {/* 坐标轴参考 (可选，通常隐藏) */}
      
      {/* 菱形 ABCD */}
      <motion.path
        d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} L ${D.x} ${D.y} Z`}
        fill="rgba(59, 130, 246, 0.05)"
        stroke="#334155"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />

      {/* 对角线 BD */}
      <motion.line
        x1={B.x} y1={B.y} x2={D.x} y2={D.y}
        stroke="#94a3b8"
        strokeWidth="1"
        strokeDasharray="5,5"
      />

      {/* 辅助线 AC (在步骤 1, 2 中显示) */}
      {(step >= 1 && step <= 2) && (
        <motion.line
          x1={A.x} y1={A.y} x2={C.x} y2={C.y}
          stroke="#ef4444"
          strokeWidth="1"
          strokeDasharray="4,4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}

      {/* 线段 EF 和 CF/AF */}
      <AnimatePresence>
        {step >= 1 && (
          <>
            {/* EF */}
            <motion.line
              x1={E.x} y1={E.y} x2={F.x} y2={F.y}
              stroke="#10b981"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              exit={{ opacity: 0 }}
            />
            {/* CF (步骤 1 显示) */}
            {step === 1 && (
              <motion.line
                x1={C.x} y1={C.y} x2={F.x} y2={F.y}
                stroke="#3b82f6"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
              />
            )}
            {/* AF (步骤 2 开始显示) */}
            {step >= 2 && (
              <motion.line
                x1={A.x} y1={A.y} x2={F.x} y2={F.y}
                stroke="#f59e0b"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
              />
            )}
          </>
        )}
      </AnimatePresence>

      {/* 辅助线 AE (步骤 4, 5 显示) */}
      {step >= 4 && (
        <motion.line
          x1={A.x} y1={A.y} x2={E.x} y2={E.y}
          stroke="#ef4444"
          strokeWidth="1.5"
          strokeDasharray="4,2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
        />
      )}

      {/* 顶点标注 */}
      <text x={A.x - 10} y={A.y - 10} className="text-sm fill-slate-700">A</text>
      <text x={B.x - 20} y={B.y + 20} className="text-sm fill-slate-700">B</text>
      <text x={C.x + 10} y={C.y + 20} className="text-sm fill-slate-700">C</text>
      <text x={D.x + 10} y={D.y - 10} className="text-sm fill-slate-700">D</text>
      <text x={E.x - 5} y={E.y + 20} className="text-sm fill-slate-700">E</text>
      <text x={F.x - 10} y={F.y - 10} className="text-sm fill-slate-700">F</text>

      {/* 关键角度标注 (60°) */}
      <path d={`M ${B.x + 30} ${B.y} A 30 30 0 0 0 ${B.x + 15} ${B.y - 25.98}`} fill="none" stroke="#94a3b8" />
      <text x={B.x + 35} y={B.y - 10} className="text-xs italic fill-slate-400">60°</text>

      {/* 动点 F */}
      <motion.circle
        cx={F.x} cy={F.y} r="4"
        fill="#3b82f6"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    </svg>
  );
};

export default GeometrySVG;
