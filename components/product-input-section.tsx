"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { ProductInfo, Platform, Language, CopyStyle } from "@/app/page"
import type { UILanguage } from "@/lib/i18n"
import { useTranslation } from "@/lib/i18n"
import { Package, Sparkles, Globe, Languages, Palette } from "lucide-react"

interface ProductInputSectionProps {
  productInfo: ProductInfo
  onProductInfoChange: (info: ProductInfo) => void
  uiLanguage: UILanguage
}

const platforms: { id: Platform; name: string; color: string; bgColor: string; borderColor: string }[] = [
  { id: "amazon", name: "Amazon", color: "text-white", bgColor: "bg-orange-500", borderColor: "border-orange-500" },
  { id: "tiktok", name: "TikTok", color: "text-white", bgColor: "bg-black", borderColor: "border-black" },
  { id: "instagram", name: "Instagram", color: "text-white", bgColor: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400", borderColor: "border-pink-500" },
  { id: "facebook", name: "Facebook", color: "text-white", bgColor: "bg-blue-600", borderColor: "border-blue-600" },
  { id: "temu", name: "Temu", color: "text-white", bgColor: "bg-emerald-500", borderColor: "border-emerald-500" },
]

export function ProductInputSection({ productInfo, onProductInfoChange, uiLanguage }: ProductInputSectionProps) {
  const t = useTranslation(uiLanguage)

  const handlePlatformChange = (platform: Platform) => {
    onProductInfoChange({ ...productInfo, platform })
  }

  const handleLanguageChange = (language: Language) => {
    onProductInfoChange({ ...productInfo, language })
  }

  const handleStyleChange = (style: CopyStyle) => {
    onProductInfoChange({ ...productInfo, style })
  }

  const copyStyles: { id: CopyStyle; label: string }[] = [
    { id: "professional", label: t.styleProfessional },
    { id: "casual", label: t.styleCasual },
    { id: "engaging", label: t.styleEngaging },
    { id: "premium", label: t.stylePremium },
  ]

  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 sticky top-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
          <Package className="w-5 h-5 text-blue-500" />
          {t.productInfo}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* 产品名称 */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Sparkles className="w-4 h-4 text-blue-500" />
            {t.productName} <span className="text-red-500">{t.required}</span>
          </label>
          <Input
            placeholder={t.productNamePlaceholder}
            value={productInfo.name}
            onChange={(e) => onProductInfoChange({ ...productInfo, name: e.target.value })}
            className="bg-gray-50 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
          />
        </div>

        {/* 核心卖点 */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Sparkles className="w-4 h-4 text-purple-500" />
            {t.keyFeatures} <span className="text-red-500">{t.required}</span>
          </label>
          <Textarea
            placeholder={t.keyFeaturesPlaceholder}
            value={productInfo.sellingPoints}
            onChange={(e) => onProductInfoChange({ ...productInfo, sellingPoints: e.target.value })}
            className="bg-gray-50 border-gray-200 focus:border-blue-400 focus:ring-blue-400 min-h-[120px] resize-none"
          />
        </div>

        {/* 投放平台 */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Globe className="w-4 h-4 text-green-500" />
            {t.platform}
          </label>
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => handlePlatformChange(platform.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border-2",
                  productInfo.platform === platform.id
                    ? `${platform.bgColor} ${platform.color} ${platform.borderColor} shadow-md scale-105`
                    : "bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200"
                )}
              >
                {platform.name}
              </button>
            ))}
          </div>
        </div>

        {/* 文案语言 */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Languages className="w-4 h-4 text-indigo-500" />
            {t.copyLanguage}
          </label>
          <Select
            value={productInfo.language}
            onValueChange={(value: Language) => handleLanguageChange(value)}
          >
            <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-blue-400 focus:ring-blue-400">
              <SelectValue placeholder={t.copyLanguage} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="zh">{t.chinese}</SelectItem>
              <SelectItem value="en">{t.english}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 文案风格 */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Palette className="w-4 h-4 text-pink-500" />
            {t.copyStyle}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {copyStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => handleStyleChange(style.id)}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2",
                  productInfo.style === style.id
                    ? "bg-indigo-500 text-white border-indigo-500 shadow-md"
                    : "bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200"
                )}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>

        {/* 提示信息 */}
        <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-700">
          <p>💡 {t.tipContent}</p>
        </div>
      </CardContent>
    </Card>
  )
}
