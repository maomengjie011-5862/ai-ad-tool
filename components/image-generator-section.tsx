"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
import type { ProductInfo } from "@/app/page"
import type { UILanguage } from "@/lib/i18n"
import { useTranslation } from "@/lib/i18n"
import { ImageIcon, Download, ZoomIn } from "lucide-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

interface ImageGeneratorSectionProps {
  productInfo: ProductInfo
  isFormValid: boolean
  uiLanguage: UILanguage
}

export function ImageGeneratorSection({ productInfo, isFormValid, uiLanguage }: ImageGeneratorSectionProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [generatedImage, setGeneratedImage] = useState("")
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const t = useTranslation(uiLanguage)

  const handleGenerate = async () => {
    if (!isFormValid || isLoading) return

    setIsLoading(true)
    setGeneratedImage("")

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productInfo),
      })

      const data = await response.json()
      setGeneratedImage(data.imageUrl || "")
    } catch (error) {
      console.error("生成图片失败:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async () => {
    if (generatedImage) {
      const link = document.createElement("a")
      link.href = generatedImage
      link.download = `ad-image-${productInfo.platform}-${Date.now()}.jpg`
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <>
      <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
              <ImageIcon className="w-5 h-5 text-emerald-500" />
              {t.imageGeneration}
            </CardTitle>
            <Button
              onClick={handleGenerate}
              disabled={!isFormValid || isLoading}
              className="bg-emerald-500 hover:bg-emerald-600 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  {t.generating}
                </>
              ) : (
                t.generateImage
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="min-h-[200px] bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[200px]">
                <Spinner className="h-8 w-8 text-emerald-500" />
                <p className="mt-3 text-gray-500 text-sm">{t.aiGeneratingImage}</p>
              </div>
            ) : generatedImage ? (
              <div className="relative group">
                <img
                  src={generatedImage}
                  alt="Generated ad image"
                  className="w-full h-auto object-cover cursor-pointer"
                  onClick={() => setIsPreviewOpen(true)}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button
                    onClick={() => setIsPreviewOpen(true)}
                    className="p-3 rounded-full bg-white/90 hover:bg-white transition-colors"
                    title={t.enlargePreview}
                  >
                    <ZoomIn className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={handleDownload}
                    className="p-3 rounded-full bg-white/90 hover:bg-white transition-colors"
                    title={t.downloadImage}
                  >
                    <Download className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[200px] text-gray-400">
                <p>{t.imagePlaceholder}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 图片预览弹窗 */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl w-full p-2 bg-black/95 border-0">
          <VisuallyHidden>
            <DialogTitle>{t.imagePreview}</DialogTitle>
          </VisuallyHidden>
          <img
            src={generatedImage}
            alt="Ad image preview"
            className="w-full h-auto"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
