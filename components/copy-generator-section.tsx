"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import type { ProductInfo } from "@/app/page"
import type { UILanguage } from "@/lib/i18n"
import { useTranslation } from "@/lib/i18n"
import { FileText, Copy, Check } from "lucide-react"

interface CopyGeneratorSectionProps {
  productInfo: ProductInfo
  isFormValid: boolean
  uiLanguage: UILanguage
}

export function CopyGeneratorSection({ productInfo, isFormValid, uiLanguage }: CopyGeneratorSectionProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [generatedCopy, setGeneratedCopy] = useState("")
  const [copied, setCopied] = useState(false)

  const t = useTranslation(uiLanguage)

  const handleGenerate = async () => {
    if (!isFormValid || isLoading) return

    setIsLoading(true)
    setGeneratedCopy("")

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productInfo),
      })

      const data = await response.json()
      setGeneratedCopy(data.copy || t.generateFailed)
    } catch (error) {
      console.error("生成文案失败:", error)
      setGeneratedCopy(t.networkError)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    if (generatedCopy) {
      await navigator.clipboard.writeText(generatedCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
            <FileText className="w-5 h-5 text-blue-500" />
            {t.copyGeneration}
          </CardTitle>
          <Button
            onClick={handleGenerate}
            disabled={!isFormValid || isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                {t.generating}
              </>
            ) : (
              t.generateCopy
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative min-h-[150px] bg-gray-50 rounded-lg p-4 border border-gray-200">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[120px]">
              <Spinner className="h-8 w-8 text-blue-500" />
              <p className="mt-3 text-gray-500 text-sm">{t.aiGeneratingCopy}</p>
            </div>
          ) : generatedCopy ? (
            <>
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed pr-10">
                {generatedCopy}
              </div>
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-2 rounded-lg bg-white shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                title={t.copyToClipboard}
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-500" />
                )}
              </button>
            </>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[120px] text-gray-400">
              <p>{t.copyPlaceholder}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
