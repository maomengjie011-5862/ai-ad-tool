import { NextRequest, NextResponse } from "next/server"

// 示例图片URLs - 使用公共测试图片
// TODO: 替换为真实的AI图片生成API（如火山方舟、Stable Diffusion等）
const sampleImages: Record<string, string[]> = {
  amazon: [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
  ],
  tiktok: [
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80",
  ],
  instagram: [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
  ],
  facebook: [
    "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80",
    "https://images.unsplash.com/photo-1491553895911-0055uj6b75d?w=800&q=80",
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
  ],
  temu: [
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    "https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800&q=80",
  ],
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, sellingPoints, platform } = body

    // 验证必填字段
    if (!name || !sellingPoints) {
      return NextResponse.json(
        { error: "产品名称和核心卖点为必填项" },
        { status: 400 }
      )
    }

    // 模拟API延迟
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // TODO: 替换为真实的AI图片生成API调用
    // 示例调用火山方舟图片生成API:
    // const response = await fetch('YOUR_IMAGE_API_ENDPOINT', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.IMAGE_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     model: 'your-image-model',
    //     prompt: `为${platform}平台生成一张关于${name}的电商广告图片，产品卖点：${sellingPoints}`,
    //     size: '1024x1024',
    //     quality: 'hd',
    //   })
    // })
    // const data = await response.json()
    // const imageUrl = data.data[0].url

    // 随机选择一张示例图片
    const platformImages = sampleImages[platform] || sampleImages.amazon
    const randomIndex = Math.floor(Math.random() * platformImages.length)
    const imageUrl = platformImages[randomIndex]

    return NextResponse.json({ imageUrl })
  } catch (error) {
    console.error("生成图片失败:", error)
    return NextResponse.json(
      { error: "生成图片失败，请稍后重试" },
      { status: 500 }
    )
  }
}
