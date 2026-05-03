import { NextRequest, NextResponse } from "next/server"

// 示例视频URLs - 使用公共测试视频
// TODO: 替换为真实的AI视频生成API（如火山方舟、Runway等）
const sampleVideos: string[] = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
]

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

    // 模拟API延迟（视频生成通常需要更长时间）
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // TODO: 替换为真实的AI视频生成API调用
    // 示例调用火山方舟视频生成API:
    // const response = await fetch('YOUR_VIDEO_API_ENDPOINT', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.VIDEO_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     model: 'your-video-model',
    //     prompt: `为${platform}平台生成一段关于${name}的电商推广视频，产品卖点：${sellingPoints}`,
    //     duration: 15,
    //     resolution: '1080p',
    //   })
    // })
    // const data = await response.json()
    // const videoUrl = data.data.url

    // 随机选择一个示例视频
    const randomIndex = Math.floor(Math.random() * sampleVideos.length)
    const videoUrl = sampleVideos[randomIndex]

    return NextResponse.json({ 
      videoUrl,
      // 可选：返回视频生成的额外信息
      platform,
      productName: name,
      message: "视频生成成功（示例视频）"
    })
  } catch (error) {
    console.error("生成视频失败:", error)
    return NextResponse.json(
      { error: "生成视频失败，请稍后重试" },
      { status: 500 }
    )
  }
}
