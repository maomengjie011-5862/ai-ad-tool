"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import type { ProductInfo } from "@/app/page"
import type { UILanguage } from "@/lib/i18n"
import { useTranslation } from "@/lib/i18n"
import { Video, Play, Pause, Download } from "lucide-react"

interface VideoGeneratorSectionProps {
  productInfo: ProductInfo
  isFormValid: boolean
  uiLanguage: UILanguage
}

export function VideoGeneratorSection({ productInfo, isFormValid, uiLanguage }: VideoGeneratorSectionProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [generatedVideo, setGeneratedVideo] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const t = useTranslation(uiLanguage)

  const handleGenerate = async () => {
    if (!isFormValid || isLoading) return

    setIsLoading(true)
    setGeneratedVideo("")
    setIsPlaying(false)

    try {
      const response = await fetch("/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productInfo),
      })

      const data = await response.json()
      setGeneratedVideo(data.videoUrl || "")
    } catch (error) {
      console.error("生成视频失败:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVideoEnded = () => {
    setIsPlaying(false)
  }

  const handleDownload = () => {
    if (generatedVideo) {
      const link = document.createElement("a")
      link.href = generatedVideo
      link.download = `ad-video-${productInfo.platform}-${Date.now()}.mp4`
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
            <Video className="w-5 h-5 text-purple-500" />
            {t.videoGeneration}
          </CardTitle>
          <Button
            onClick={handleGenerate}
            disabled={!isFormValid || isLoading}
            className="bg-purple-500 hover:bg-purple-600 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                {t.generating}
              </>
            ) : (
              t.generateVideo
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="min-h-[200px] bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[200px]">
              <Spinner className="h-8 w-8 text-purple-500" />
              <p className="mt-3 text-gray-500 text-sm">{t.aiGeneratingVideo}</p>
            </div>
          ) : generatedVideo ? (
            <div className="relative group">
              <video
                ref={videoRef}
                src={generatedVideo}
                className="w-full h-auto"
                onEnded={handleVideoEnded}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                controls
                playsInline
              />
              <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
                  title={isPlaying ? t.pause : t.play}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-gray-700" />
                  ) : (
                    <Play className="w-5 h-5 text-gray-700" />
                  )}
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
                  title={t.downloadVideo}
                >
                  <Download className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[200px] text-gray-400">
              <p>{t.videoPlaceholder}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
