import React from 'react';
import { motion } from 'motion/react';

interface GeometrySVGProps {
  step: number;
}

export const GeometrySVG: React.FC<GeometrySVGProps> = ({ step }) => {
  // 物理级精确坐标系统 (基于 600x600 画布)
  // 设定 B(150, 500), C(450, 500) -> BC = 300 像素，对应长度 4
  // 1 长度 = 75 像素
  const B = { x: 150, y: 500 };
  const C = { x: 450, y: 500 };
  
  // A 点坐标：由 75, 60, 45 度角推导
  // A.x = B.x + (3-sqrt(3))*75 ≈ 150 + 95.1 ≈ 245
  // A.y = B.y - (3+sqrt(3))*75 ≈ 500 - 354.9 ≈ 145
  const A = { x: 245.1, y: 145.1 };
  
  // D 点坐标（动点）：在第三步及之后，显示最大面积情况（垂足）
  // 垂足 D.x = A.x ≈ 245
  const D = { x: 245.1, y: 500 };

  // 辅助函数：计算点相对线段的对称点
  const reflect = (p: {x: number, y: number}, a: {x: number, y: number}, b: {x: number, y: number}) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const angle = Math.atan2(dy, dx);
    const cos2 = Math.cos(2 * angle);
    const sin2 = Math.sin(2 * angle);
    const nx = a.x + (p.x - a.x) * cos2 + (p.y - a.y) * sin2;
    const ny = a.y + (p.x - a.x) * sin2 - (p.y - a.y) * cos2;
    return { x: nx, y: ny };
  };

  const E = reflect(D, A, B);
  const F = reflect(D, A, C);

  return (
    <svg viewBox="0 80 600 650" className="w-full h-full drop-shadow-sm">
      <defs>
        <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#f1f5f9" strokeWidth="1" />
        </pattern>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
        </marker>
      </defs>

      {/* 背景装饰 */}
      <rect x="0" y="80" width="600" height="500" fill="url(#grid)" />
      
      {/* 步骤 2: 辅助线 BO */}
      {step === 1 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
           <line x1={B.x} y1={B.y} x2={345} y2={326} stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
           <text x={350} y={320} className="text-sm fill-red-500 font-bold italic">O</text>
           <rect x={335} y={320} width="10" height="10" fill="none" stroke="#ef4444" strokeWidth="1" transform="rotate(30 345 326)" />
        </motion.g>
      )}

      {/* 目标四边形 EBCF 填充 (由步骤 2 开始显示过渡) */}
      <motion.polygon
        points={`${E.x},${E.y} ${B.x},${B.y} ${C.x},${C.y} ${F.x},${F.y}`}
        fill="#3b82f6"
        fillOpacity="0.05"
        stroke="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 2 ? 1 : 0 }}
      />

      {/* 线段绘制 */}
      {/* BC 边 */}
      <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke="#334155" strokeWidth="3" strokeLinecap="round" />
      
      {/* AB, AC 边 */}
      <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#64748b" strokeWidth="2" />
      <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="#64748b" strokeWidth="2" />
      
      {/* AD 线 (动点) */}
      <motion.line 
        x1={A.x} y1={A.y} x2={D.x} y2={D.y} 
        stroke="#3b82f6" strokeWidth="2.5" 
        strokeDasharray={step === 3 ? "0" : "4,4"}
        animate={{ stroke: step === 3 ? "#ef4444" : "#3b82f6" }}
      />

      {/* 翻折出的边 */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: step >= 2 ? 1 : 0 }}>
        <line x1={A.x} y1={A.y} x2={E.x} y2={E.y} stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" />
        <line x1={A.x} y1={A.y} x2={F.x} y2={F.y} stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" />
        <line x1={B.x} y1={B.y} x2={E.x} y2={E.y} stroke="#334155" strokeWidth="2" />
        <line x1={C.x} y1={C.y} x2={F.x} y2={F.y} stroke="#334155" strokeWidth="2" />
        <line x1={E.x} y1={E.y} x2={F.x} y2={F.y} stroke="#1e293b" strokeWidth="2.5" />
      </motion.g>

      {/* 标注与数值 */}
      {step === 0 && (
         <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={280} y={530} className="text-sm fill-slate-500 font-bold">BC = 4</text>
            <text x={180} y={150} className="text-xs fill-slate-400 font-bold">45°</text>
            <text x={380} y={490} className="text-xs fill-slate-400 font-bold">60°</text>
         </motion.g>
      )}

      {/* 直角 EAF 标记 */}
      {step >= 2 && (
        <motion.path 
          d={`M ${A.x - 14} ${A.y + 14} L ${A.x} ${A.y + 28} L ${A.x + 14} ${A.y + 14}`} 
          fill="none" stroke="#f59e0b" strokeWidth="1.8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}

      {/* 关键数值 h */}
      {step >= 3 && (
        <motion.g initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <text x={A.x + 10} y={(A.y + D.y)/2} className="text-sm fill-red-500 font-bold">h = 3+√3</text>
        </motion.g>
      )}

      {/* 顶点名称 */}
      <g className="text-2xl font-serif italic fill-slate-800 pointer-events-none select-none">
        <text x={A.x - 10} y={A.y - 15}>A</text>
        <text x={B.x - 25} y={B.y + 20}>B</text>
        <text x={C.x + 10} y={C.y + 20}>C</text>
        <text x={D.x - 5} y={D.y + 25} className="fill-blue-600">D</text>
        {step >= 2 && (
          <>
            <motion.text x={E.x - 25} y={E.y + 10} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>E</motion.text>
            <motion.text x={F.x + 10} y={F.y + 10} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>F</motion.text>
          </>
        )}
      </g>
    </svg>
  );
};
