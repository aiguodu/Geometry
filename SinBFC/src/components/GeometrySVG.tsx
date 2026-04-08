import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GeometrySVGProps {
  step: number;
}

const GeometrySVG: React.FC<GeometrySVGProps> = ({ step }) => {
  // 核心坐标定义 - 扩大比例并优化布局中心
  // A, B 位于 x=260 线上，为左侧交点 G 和 F 预留充足空间
  const A = { x: 260, y: 40 };
  const B = { x: 260, y: 370 }; // AB = 330
  const C = { x: 700, y: 370 }; // BC = 440 (AB:BC = 3:4)
  
  // △ADE 相似于 △ABC，缩放比 0.62，旋转约 24 度
  const ratio = 0.62;
  const angle = 24 * Math.PI / 180;
  const lenAD = 330 * ratio; // 204.6
  const lenDE = 440 * ratio; // 272.8
  
  const D = { 
    x: A.x - lenAD * Math.sin(angle), 
    y: A.y + lenAD * Math.cos(angle) 
  };
  
  const E = {
    x: D.x + lenDE * Math.cos(angle),
    y: D.y + lenDE * Math.sin(angle)
  };

  // 辅助函数：计算两条直线的交点
  const getLineIntersection = (p1: any, p2: any, p3: any, p4: any) => {
    const x1 = p1.x, y1 = p1.y, x2 = p2.x, y2 = p2.y;
    const x3 = p3.x, y3 = p3.y, x4 = p4.x, y4 = p4.y;
    const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    if (Math.abs(denom) < 0.01) return { x: 0, y: 0 };
    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
    return { x: x1 + ua * (x2 - x1), y: y1 + ua * (y2 - y1) };
  };
  
  const F = getLineIntersection(C, E, B, D);
  const G = getLineIntersection(A, C, B, D);

  const RightAngle = ({ p1, p2, p3, size = 18 }: any) => {
    const v1 = { x: (p1.x - p2.x), y: (p1.y - p2.y) };
    const v3 = { x: (p3.x - p2.x), y: (p3.y - p2.y) };
    const l1 = Math.sqrt(v1.x**2 + v1.y**2);
    const l3 = Math.sqrt(v3.x**2 + v3.y**2);
    const u1 = { x: v1.x/l1 * size, y: v1.y/l1 * size };
    const u3 = { x: v3.x/l3 * size, y: v3.y/l3 * size };
    return (
      <path d={`M ${p2.x+u1.x} ${p2.y+u1.y} L ${p2.x+u1.x+u3.x} ${p2.y+u1.y+u3.y} L ${p2.x+u3.x} ${p2.y+u3.y}`} fill="none" stroke="#334155" strokeWidth="1.2" />
    );
  };

  return (
    <svg viewBox="0 0 750 500" className="w-full h-full font-serif italic select-none">
      <AnimatePresence>
        {step === 0 && (
          <g>
            <motion.polygon points={`${A.x},${A.y} ${D.x},${D.y} ${E.x},${E.y}`} fill="rgba(245, 158, 11, 0.08)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="rgba(59, 130, 246, 0.08)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          </g>
        )}
        {(step === 1 || step === 2) && (
          <g>
            <motion.polygon points={`${A.x},${A.y} ${B.x},${B.y} ${D.x},${D.y}`} fill="rgba(16, 185, 129, 0.12)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.polygon points={`${A.x},${A.y} ${C.x},${C.y} ${E.x},${E.y}`} fill="rgba(239, 68, 68, 0.1)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          </g>
        )}
      </AnimatePresence>

      <g stroke="#334155" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <motion.path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} Z`} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
        <motion.path d={`M ${A.x} ${A.y} L ${D.x} ${D.y} L ${E.x} ${E.y} Z`} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
      </g>

      <RightAngle p1={A} p2={B} p3={C} />
      <RightAngle p1={A} p2={D} p3={E} />

      {step >= 1 && (
        <g>
          <motion.line x1={B.x} y1={B.y} x2={D.x} y2={D.y} stroke="#10b981" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
          <motion.line x1={C.x} y1={C.y} x2={E.x} y2={E.y} stroke="#ef4444" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
        </g>
      )}

      {step >= 3 && (
        <g>
          {/* 辅助对角线 */}
          <motion.line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="#94a3b8" strokeWidth="1" strokeDasharray="5,3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
          {/* 辅助点 G */}
          <motion.circle cx={G.x} cy={G.y} r="3.5" fill="#475569" initial={{ scale: 0 }} animate={{ scale: 1 }} />
          <text x={G.x + 10} y={G.y + 15} className="text-base fill-slate-500 font-bold">G</text>
        </g>
      )}

      {step >= 3 && (
        <g>
          <motion.line x1={E.x} y1={E.y} x2={F.x} y2={F.y} stroke="#ef4444" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
          <motion.circle cx={F.x} cy={F.y} r="5" fill="#ef4444" initial={{ scale: 0 }} animate={{ scale: 1 }} />
          <text x={F.x - 22} y={F.y - 12} className="text-lg fill-red-600 font-extrabold">F</text>
        </g>
      )}

      {step >= 4 && (
        <motion.path
          d={`M ${F.x + 22} ${F.y + 12} A 25 25 0 0 0 ${F.x + 15} ${F.y - 20}`}
          fill="none" stroke="#f59e0b" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        />
      )}

      <g className="text-lg fill-slate-700 font-extrabold pointer-events-none">
        <text x={A.x - 10} y={A.y - 15}>A</text>
        <text x={B.x - 10} y={B.y + 30}>B</text>
        <text x={C.x + 10} y={C.y + 20}>C</text>
        <text x={D.x - 30} y={D.y + 10}>D</text>
        <text x={E.x + 10} y={E.y + 25}>E</text>
      </g>
    </svg>
  );
};

export default GeometrySVG;
