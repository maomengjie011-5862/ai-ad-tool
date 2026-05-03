"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, TrendingUp, Star, ShoppingCart } from "lucide-react"
import type { UILanguage } from "@/lib/i18n"
import { useTranslation } from "@/lib/i18n"

interface SuccessCasesSectionProps {
  uiLanguage: UILanguage
}

export function SuccessCasesSection({ uiLanguage }: SuccessCasesSectionProps) {
  const t = useTranslation(uiLanguage)

  const cases = [
    {
      icon: TrendingUp,
      title: t.caseTitle1,
      description: t.caseDesc1,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Star,
      title: t.caseTitle2,
      description: t.caseDesc2,
      color: "text-pink-500",
      bgColor: "bg-pink-50",
    },
    {
      icon: ShoppingCart,
      title: t.caseTitle3,
      description: t.caseDesc3,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
          <Trophy className="w-5 h-5 text-yellow-500" />
          {t.successCases}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cases.map((caseItem, index) => (
            <div
              key={index}
              className={`${caseItem.bgColor} rounded-lg p-4 transition-all hover:shadow-md`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-white shadow-sm`}>
                  <caseItem.icon className={`w-5 h-5 ${caseItem.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{caseItem.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{caseItem.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
