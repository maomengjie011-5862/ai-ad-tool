import { NextRequest, NextResponse } from "next/server"

// 平台名称映射
const platformNames: Record<string, string> = {
  amazon: "Amazon",
  tiktok: "TikTok",
  instagram: "Instagram",
  facebook: "Facebook",
  temu: "Temu",
}

// 文案风格映射
const styleDescriptions: Record<string, { zh: string; en: string }> = {
  professional: { zh: "专业严谨", en: "Professional" },
  casual: { zh: "轻松随性", en: "Casual" },
  engaging: { zh: "活泼种草", en: "Engaging" },
  premium: { zh: "高端质感", en: "Premium" },
}

// 模拟生成文案的函数
// TODO: 替换为豆包/火山方舟的真实API
function generateMockCopy(
  productName: string,
  sellingPoints: string,
  platform: string,
  language: string,
  style: string
): string {
  const platformName = platformNames[platform] || platform
  const styleInfo = styleDescriptions[style] || styleDescriptions.professional

  if (language === "zh") {
    const stylePrefix = getStylePrefixZh(style)
    return `${stylePrefix}

🔥【${platformName}热销爆款】${productName}

✨ 核心亮点：
${sellingPoints
  .split("\n")
  .filter((p) => p.trim())
  .map((point) => `• ${point.trim()}`)
  .join("\n")}

🎁 限时优惠进行中！
💰 现在下单立享超值折扣
🚚 快速配送，品质保证

📢 ${platformName}独家发售，错过再等一年！
👇 点击链接立即购买

#${productName.replace(/\s+/g, "")} #${platformName}购物 #好物推荐 #品质生活

---
📝 文案风格：${styleInfo.zh}`
  } else {
    const stylePrefix = getStylePrefixEn(style)
    return `${stylePrefix}

🔥【${platformName} Best Seller】${productName}

✨ Key Features:
${sellingPoints
  .split("\n")
  .filter((p) => p.trim())
  .map((point) => `• ${point.trim()}`)
  .join("\n")}

🎁 Limited Time Offer!
💰 Order now for exclusive discounts
🚚 Fast shipping, quality guaranteed

📢 ${platformName} Exclusive - Don't miss out!
👇 Click the link to buy now

#${productName.replace(/\s+/g, "")} #${platformName}Shopping #MustHave #QualityLife

---
📝 Copy Style: ${styleInfo.en}`
  }
}

function getStylePrefixZh(style: string): string {
  switch (style) {
    case "professional":
      return "【专业测评】深度体验报告"
    case "casual":
      return "【分享好物】轻松聊聊我的新发现~"
    case "engaging":
      return "【种草安利】姐妹们冲啊！！！"
    case "premium":
      return "【臻选品质】匠心之作，品位生活"
    default:
      return ""
  }
}

function getStylePrefixEn(style: string): string {
  switch (style) {
    case "professional":
      return "【Expert Review】In-Depth Analysis"
    case "casual":
      return "【Casual Share】Just found something cool~"
    case "engaging":
      return "【Must Have】OMG You NEED This!!!"
    case "premium":
      return "【Premium Selection】Crafted Excellence"
    default:
      return ""
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, sellingPoints, platform, language, style } = body

    // 验证必填字段
    if (!name || !sellingPoints) {
      return NextResponse.json(
        { error: "产品名称和核心卖点为必填项" },
        { status: 400 }
      )
    }

    // 模拟API延迟
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // TODO: 替换为真实的AI API调用
    // 示例调用豆包/火山方舟API:
    // const response = await fetch('YOUR_AI_API_ENDPOINT', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.AI_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     model: 'your-model-name',
    //     messages: [
    //       {
    //         role: 'system',
    //         content: '你是一个专业的电商广告文案撰写专家...'
    //       },
    //       {
    //         role: 'user',
    //         content: `请为以下产品生成${platform}平台的广告文案：\n产品名称：${name}\n核心卖点：${sellingPoints}\n风格：${style}`
    //       }
    //     ]
    //   })
    // })
    // const data = await response.json()
    // const copy = data.choices[0].message.content

    const copy = generateMockCopy(name, sellingPoints, platform, language, style || "professional")

    return NextResponse.json({ copy })
  } catch (error) {
    console.error("生成文案失败:", error)
    return NextResponse.json(
      { error: "生成文案失败，请稍后重试" },
      { status: 500 }
    )
  }
}
