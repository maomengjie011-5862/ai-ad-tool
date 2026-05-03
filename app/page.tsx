"use client"

import { useState } from "react"
import { ProductInputSection } from "@/components/product-input-section"
import { CopyGeneratorSection } from "@/components/copy-generator-section"
import { ImageGeneratorSection } from "@/components/image-generator-section"
import { VideoGeneratorSection } from "@/components/video-generator-section"
import { SuccessCasesSection } from "@/components/success-cases-section"
import { useTranslation, type UILanguage } from "@/lib/i18n"

export type Platform = "amazon" | "tiktok" | "instagram" | "facebook" | "temu"
export type Language = "zh" | "en"
export type CopyStyle = "professional" | "casual" | "engaging" | "premium"

export interface ProductInfo {
  name: string
  sellingPoints: string
  platform: Platform
  language: Language
  style: CopyStyle
}

export default function Home() {
  const [uiLanguage, setUiLanguage] = useState<UILanguage>("zh")
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    name: "",
    sellingPoints: "",
    platform: "amazon",
    language: "zh",
    style: "professional",
  })

  const t = useTranslation(uiLanguage)
  const isFormValid = productInfo.name.trim() !== "" && productInfo.sellingPoints.trim() !== ""

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* 语言切换 */}
        <div className="flex justify-end mb-4">
          <div className="inline-flex rounded-lg bg-white shadow-sm p-1">
            <button
              onClick={() => setUiLanguage("zh")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                uiLanguage === "zh"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              中文
            </button>
            <button
              onClick={() => setUiLanguage("en")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                uiLanguage === "en"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* 标题区域 */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-balance">
            {t.title}
          </h1>
          <p className="text-gray-600 mt-2 text-lg">{t.subtitle}</p>
        </header>

        {/* 主内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 左侧：产品信息输入区 */}
          <div className="lg:col-span-4">
            <ProductInputSection
              productInfo={productInfo}
              onProductInfoChange={setProductInfo}
              uiLanguage={uiLanguage}
            />
          </div>

          {/* 右侧：生成模块区 */}
          <div className="lg:col-span-8 space-y-6">
            {/* 模块1：广告文案生成 */}
            <CopyGeneratorSection
              productInfo={productInfo}
              isFormValid={isFormValid}
              uiLanguage={uiLanguage}
            />

            {/* 模块2：电商广告图片生成 */}
            <ImageGeneratorSection
              productInfo={productInfo}
              isFormValid={isFormValid}
              uiLanguage={uiLanguage}
            />

            {/* 模块3：AI推广视频生成 */}
            <VideoGeneratorSection
              productInfo={productInfo}
              isFormValid={isFormValid}
              uiLanguage={uiLanguage}
            />

            {/* 模块4：成功案例参考 */}
            <SuccessCasesSection uiLanguage={uiLanguage} />
          </div>
        </div>
      </div>
    </main>
  )
}
