import { BookOpen, Edit3, Triangle, Calculator, CheckCircle, Target } from 'lucide-react';
import React from 'react';

export interface StepData {
  title: string;
  icon: React.ReactNode;
  desc: string;
  detail: string;
  tts: string;
}

export const steps: StepData[] = [
  {
    title: "第一步：解题思路总览",
    icon: <BookOpen className="w-5 h-5" />,
    desc: "菱形动点最值：从面积转化到线段最值",
    detail: "1. 目标分析：菱形面积由底和高决定，通过转化，将面积问题变为求线段 AE 的最大值。\n\n2. 几何建模：利用轴对称转移线段，结合“两点之间线段最短”确定 AE 的取值范围。",
    tts: "大家好！这道题要求菱形面积的最大值，看起来无从下手。但我们要学会‘目标转化’：菱形的面积由边长决定，而在 60 度角的情况下，面积和三角形的高 AE 紧密相关。所以，我们的首要任务是把‘面积最大’翻译成‘线段 AE 最大’。接下来，老师带大家一步步突破。"
  },
  {
    title: "第二步：目标深度分析",
    icon: <Target className="w-5 h-5" />,
    desc: "明确：面积最大 ↔ 线段 AE 最大",
    detail: "∵ ∠ABC = 60° 且 ABCD 是菱形，∴ △ABC 是等边三角形。\n∵ E 是 BC 的中点，∴ AE ⊥ BC。\n菱形面积 S = BC × AE = a × AE。\n由于 a = AE / sin60° = (2/√3)AE，\n∴ S = (2/√3)AE²。可见，AE 越大，面积 S 越大。",
    tts: "同学们，咱们先看目标。因为菱形有个 60 度角，所以三角形 ABC 是等边三角形。E 是中点，那么 AE 就是底边 BC 上的高。菱形的面积公式可以写成底乘以高，也就是 BC 乘以 AE。经过简单的代数代换，你会发现面积其实只跟 AE 的平方成正比。所以啊，求面积最大，本质上就是求 AE 什么时候最长！"
  },
  {
    title: "第三步：利用对称性转化",
    icon: <Edit3 className="w-5 h-5" />,
    desc: "利用轴对称实现线段“移花接木”",
    detail: "∵ 对角线 BD 垂直平分 AC，点 F 在 BD 上。\n∴ CF = AF（轴对称性质）。\n已知 CF + EF = 3，转化得：AF + EF = 3。\n\n意义：将不在同一直线上的线段和，转化为以 A, E 为端点的折线段。",
    tts: "确定了求 AE 最大值的目标，咱们再来看条件。题目给的是 CF 加 EF 等于 3。由于点 F 在对角线 BD 上，根据菱形的对称性，CF 和 AF 是完全相等的。所以，我们可以‘移花接木’，把条件换成 AF 加 EF 等于 3。看，现在 AF 和 EF 连在一起了，形成了一条从 A 到 E 的折线。"
  },
  {
    title: "第四步：线段最值锁定",
    icon: <Triangle className="w-5 h-5" />,
    desc: "利用三角形不等式寻找 AE 的“天花板”",
    detail: "在 △AEF 中，根据三角形三边关系：\nAF + EF ≥ AE\n已知 AF + EF = 3，代入得：3 ≥ AE，即 AE ≤ 3。\n当 A, F, E 三点共线时，AE 达到最大值 3。",
    tts: "现在到了最关键的时刻！在三角形 AEF 中，两边之和大于第三边。所以 AF 加 EF 一定大于等于第三边 AE。题目说 AF 加 EF 固定等于 3，这意味着 AE 这根线段最长也就是 3，绝对超不过去。当点 F 正好落在 AE 这条直线上时，AE 就达到了它的最大值 3。"
  },
  {
    title: "第五步：计算边长最大值",
    icon: <Calculator className="w-5 h-5" />,
    desc: "由 AE 的最大值求出边长 a",
    detail: "当 AE = 3 时：\n∵ AE = (√3/2)a\n∴ a = 3 / (√3/2) = 2√3。\n\n此时菱形的边长达到最大值 2√3。",
    tts: "既然 AE 最大是 3，我们就可以反推边长了。在等边三角形中，高 AE 等于二分之根号三倍的边长 a。把 AE 等于 3 代进去，解方程就能算出边长 a 最大是二倍根号三。离胜利只剩最后一步计算了！"
  },
  {
    title: "第六步：得出最终结论",
    icon: <CheckCircle className="w-5 h-5" />,
    desc: "计算菱形面积的最大值",
    detail: "S_max = (√3/2) × a² = (√3/2) × (2√3)²\nS_max = (√3/2) × 12 = 6√3。\n\n结论：菱形 ABCD 面积的最大值为 6√3。",
    tts: "最后，咱们代入面积公式。菱形面积等于二分之根号三倍的 a 平方。把边长二倍根号三代进去，算出来的最大面积就是六倍根号三。回顾一下：我们先明确了要求 AE 的最大值，再用对称性转化条件，最后用三角形不等式一举锁定。这套‘目标驱动’的解法，是不是比盲目尝试要清晰得多呢？"
  }
];
