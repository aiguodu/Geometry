import { BookOpen, Compass, Calculator, PenTool, CheckCircle, Lightbulb } from 'lucide-react';
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
    title: "解题思路总览",
    icon: <Lightbulb className="w-5 h-5" />,
    desc: "利用翻折对称性，将面积问题转化为求线段最短距离问题。",
    detail: "1. **翻折性质**：翻折前后的三角形全等，面积相等。这能帮我们转化复杂的四边形面积。\n\n2. **关键角度**：通过翻折发现 $\\angle EAF = 2\\angle BAC = 90^\\circ$，这是解题的突破口。\n\n3. **面积建模**：发现 $S_{EBCF} = 2S_{ABC} - S_{AEF}$。因为 $S_{AEF}$ 只与 $AD$ 相关，所以求面积最大值即求 $AD$ 的最小值（垂线段最短）。",
    tts: "同学们好！今天我们来挑战这道翻折与最值的综合题。题目虽然看起来复杂，但只要我们抓住翻折的‘对称性’，一切就迎刃而解了。首先，我们要利用翻折全等来转化面积；接着，我们会发现一个神奇的 90 度直角，这能极大地简化我们的计算；最后，我们会发现求面积最大值，其实就是寻找点 A 到底边的最短距离。这就是我们的解题地图，让我们开始吧！"
  },
  {
    title: "第一步：计算基础图形参数",
    icon: <Compass className="w-5 h-5" />,
    desc: "利用“特殊角”作高，求出 $\\triangle ABC$ 的面积与底边之高。",
    detail: "过点 $B$ 作 $BO \\perp AC$。在 $Rt\\triangle BOC$ 中，$\\angle C=60^\\circ, BC=4$：\n$OC = 2, BO = 2\\sqrt{3}$\n\n在 $Rt\\triangle ABO$ 中，$\\angle A=45^\\circ$：\n$AO = BO = 2\\sqrt{3}$\n\n得 $AC = 2\\sqrt{3} + 2$，则：\n$S_{\\triangle ABC} = \\frac{1}{2} \\times (2\\sqrt{3}+2) \\times 2\\sqrt{3} = 6 + 2\\sqrt{3}$\n\n设 $BC$ 边上的高为 $h$，则 $\\frac{1}{2} \\times 4 \\times h = 6 + 2\\sqrt{3}$：\n$h = 3 + \\sqrt{3}$",
    tts: "首先，我们要摸清原三角形的底细。在初中几何里，看到 45 度和 60 度，最常用的办法就是‘作高’。我们过点 B 作一条垂线，由于 BC 是 4，我们很快就能算出 BO 和 OC 的长度。结合 45 度角的等腰直角性质，整条 AC 的长度和平面积就都算出来了。最后，我们反求出点 A 到底边 BC 的高 h 等于 3 加根号 3，这对后面求最值至关重要。"
  },
  {
    title: "第二步：建立面积转化模型",
    icon: <PenTool className="w-5 h-5" />,
    desc: "发现 $\\angle EAF = 90^\\circ$（即 $45^\\circ \\times 2$），进行面积拆解。",
    detail: "根据翻折全等：$S_{EAB} = S_{DAB}, S_{FAC} = S_{DAC}$\n四边形 $EBCF$ 面积 = $S_{EAB} + S_{ABC} + S_{FAC} - S_{AEF}$\n由于 $S_{EAB} + S_{FAC} = S_{DAB} + S_{DAC} = S_{ABC}$\n\n得：$Area = 2S_{ABC} - S_{AEF}$\n\n又由翻折可知：$\\angle EAB = \\angle DAB, \\angle FAC = \\angle DAC$\n$\\angle EAF = 2\\angle BAC = 45^\\circ \\times 2 = 90^\\circ$",
    tts: "现在到了核心的‘转化’环节。根据翻折的对称性，左右两个三角形的面积其实就是原三角形的面积。把四边形拆开来看，它的面积刚好等于两倍的三角形 ABC 减去重叠的三角形 AEF。最妙的是，因为翻折，角 EAF 恰好是原来 45 度角的两倍，也就是 90 度！这个直角出现后，三角形 AEF 的面积计算就变得非常简单了。"
  },
  {
    title: "第三步：分析最值取得的条件",
    icon: <Calculator className="w-5 h-5" />,
    desc: "将面积最大值问题，转化为求 $AD$ 的最小值（点到直线的距离）。",
    detail: "由公式 $Area = 2S_{ABC} - \\frac{1}{2} AD^2$ 可知：\n1. 基准面积 $2S_{ABC}$ 是固定常数。\n2. 要使总面积最大，只需使减去的 $\\frac{1}{2} AD^2$ 达到最小。\n\n因为 $AD$ 是定点 $A$ 到动点 $D$ 的距离，根据“垂线段最短”原理，当 $AD \\perp BC$ 时，$AD$ 取得最小值 $h$。\n\n此时 $h = 3 + \\sqrt{3}$（第一步已算出）。",
    tts: "既然四边形面积等于两倍的 ABC 减去二分之一的 AD 平方，那么想要面积最大，就要让减去的这一项尽可能小。也就是让 AD 尽可能短。在初中我们学过，点到直线的所有线段中，垂线段是最短的。所以，当点 D 刚好运动到底边垂足位置时，AD 的长度就是我们之前算出的高 h，此时面积达到最大值。"
  },
  {
    title: "第四步：最终结果展示",
    icon: <CheckCircle className="w-5 h-5" />,
    desc: "代入数值，计算最终最大面积。",
    detail: "$Area_{max} = 2(6 + 2\\sqrt{3}) - \\frac{1}{2}(3 + \\sqrt{3})^2$\n$Area_{max} = 12 + 4\\sqrt{3} - \\frac{1}{2}(9 + 3 + 6\\sqrt{3})$\n$Area_{max} = 12 + 4\\sqrt{3} - (6 + 3\\sqrt{3})$\n$Area_{max} = \\mathbf{6 + \\sqrt{3}}$",
    tts: "最后，我们把数值代入公式。两倍的三角形面积是 12 加 4 根号 3，减去 AD 平方的一半，也就是 6 加 3 根号 3。最后的计算结果非常清爽，就是 6 加根号 3。同学们，回想一下，这道题的难点就在于如何把面积最大值问题转化为求垂线段最短的问题，你学会了吗？"
  }
];
