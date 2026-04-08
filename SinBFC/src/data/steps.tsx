import React, { ReactNode } from 'react';
import { Lightbulb, Share2, Ruler, Target, Compass } from 'lucide-react';

export interface StepData {
  title: string;
  icon: ReactNode;
  desc: string;
  detail: string;
  tts: string;
}

export const steps: StepData[] = [
  {
    title: "解题思路：相似变换模型",
    icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
    desc: "识别图形中的“手拉手”相似模型。",
    detail: "观察发现，△ABC 和 △ADE 都是直角三角形，且直角边比例相同（3:4）。这意味着这两个三角形相似。它们共用顶点 A，且顶角 ∠BAC = ∠DAE，这是一个典型的旋转相似（手拉手）模型。我们将通过证明另一对隐藏的相似三角形来解决问题。",
    tts: "同学们，看到这类有两个共顶点且形状相似的直角三角形题目，我们要立刻联想到‘手拉手’模型。因为 △ABC 相似于 △ADE，它们之间存在着一种旋转和缩放的关系。接下来，我们将通过这种相似性，挖掘出更多隐藏的比例和角度关系。"
  },
  {
    title: "第一步：证明 △ABD ∽ △ACE",
    icon: <Share2 className="w-5 h-5 text-blue-500" />,
    desc: "利用边比例和夹角相等证明相似。",
    detail: "∵ △ABC ∽ △ADE (∠ABC=∠ADE=90°, AB/BC=AD/DE=3/4)\n∴ AB/AD = AC/AE = 3/5，且 ∠BAC = ∠DAE。\n∴ ∠BAC - ∠BAE = ∠DAE - ∠BAE\n即 ∠BAD = ∠CAE。\n根据 SAS，可得 △ABD ∽ △ACE。",
    tts: "首先，我们来找一对隐藏的相似三角形。由于 △ABC 和 △ADE 相似，我们可以得到 AB 比 AD 等于 AC 比 AE。再看它们的夹角，∠BAC 和 ∠DAE 相等，减去公共部分 ∠BAE 后，剩下的 ∠BAD 和 ∠CAE 也相等。所以，△ABD 和 △ACE 也是相似的。"
  },
  {
    title: "第二步：求解 BD/CE 的值",
    icon: <Ruler className="w-5 h-5 text-emerald-500" />,
    desc: "利用相似比直接得出线段比例。",
    detail: "∵ △ABD ∽ △ACE\n∴ BD/CE = AB/AC\n在 Rt△ABC 中，AB/BC = 3/4\n设 AB = 3k, BC = 4k，则 AC = 5k\n∴ BD/CE = 3k/5k = 3/5。",
    tts: "既然证明了 △ABD 相似于 △ACE，那么对应边的比值就等于相似比。BD 比上 CE 应该等于 AB 比上 AC。在直角三角形 ABC 中，两条直角边是 3 比 4，斜边就是 5，所以 AB 比 AC 的值就是 5 分之 3。第一小问我们就轻松解决啦。"
  },
  {
    title: "第三步：分析交点 F 的角度关系",
    icon: <Compass className="w-5 h-5 text-purple-500" />,
    desc: "通过相似三角形的对应角相等进行等角转换。",
    detail: "∵ △ABD ∽ △ACE\n∴ ∠ABD = ∠ACE\n设 BD 与 AC 交于点 G\n在 △ABG 和 △FCG 中：\n∠BAG + ∠ABG + ∠AGB = 180°\n∠BFC + ∠FCG + ∠FGC = 180°\n∵ ∠AGB = ∠FGC (对顶角), ∠ABG = ∠FCG\n∴ ∠BFC = ∠BAG = ∠BAC。",
    tts: "现在看第二问。延长 CE 交 BD 于点 F，要求 sin∠BFC。由前面的相似可知，角 ABD 等于角 ACE。我们观察三角形 ABG 和三角形 FCG，它们有一对对顶角，还有一对相等的对应角。根据三角形内角和定理，剩下的角 BFC 必然等于角 BAC。"
  },
  {
    title: "第四步：计算 Sin∠BFC 的值",
    icon: <Target className="w-5 h-5 text-rose-500" />,
    desc: "将待求角转化到已知直角三角形中计算。",
    detail: "由上一步可知 ∠BFC = ∠BAC\n在 Rt△ABC 中：\nsin∠BAC = BC/AC\n∵ BC = 4k, AC = 5k\n∴ sin∠BAC = 4/5\n∴ sin∠BFC = 4/5。",
    tts: "最后一步，既然角 BFC 等于角 BAC，我们只需要在直角三角形 ABC 中计算 sin∠BAC 即可。根据定义，正弦值等于对边比斜边，也就是 BC 比 AC，结果是 5 分之 4。这样，我们就完整地解决了这道题目。通过相似变换，复杂的求角问题转化为了简单的直角三角形函数计算。"
  }
];
