export type UILanguage = "zh" | "en"

export const translations = {
  zh: {
    // Header
    title: "跨境电商广告 AI 生成器",
    subtitle: "一键生成多平台文案、广告图、推广视频",
    
    // Product Input Section
    productInfo: "产品信息",
    productName: "产品名称",
    productNamePlaceholder: "请输入产品名称",
    keyFeatures: "核心卖点",
    keyFeaturesPlaceholder: "请输入产品的核心卖点，多个卖点请换行",
    platform: "投放平台",
    copyLanguage: "文案语言",
    copyStyle: "文案风格",
    required: "*",
    tipTitle: "提示",
    tipContent: "填写完产品信息后，右侧三个模块将共用这些数据进行AI生成",
    
    // Copy Styles
    styleProfessional: "专业严谨",
    styleCasual: "轻松随性",
    styleEngaging: "活泼种草",
    stylePremium: "高端质感",
    
    // Copy Generator
    copyGeneration: "广告文案生成",
    generateCopy: "生成文案",
    generating: "生成中...",
    copyPlaceholder: '点击"生成文案"按钮，AI将为您生成专业的广告文案',
    aiGeneratingCopy: "AI正在为您生成文案...",
    copyToClipboard: "复制文案",
    
    // Image Generator
    imageGeneration: "电商广告图片生成",
    generateImage: "生成广告图",
    imagePlaceholder: '点击"生成广告图"按钮，AI将为您生成精美的广告图片',
    aiGeneratingImage: "AI正在为您生成广告图片...",
    enlargePreview: "放大预览",
    downloadImage: "下载图片",
    imagePreview: "图片预览",
    
    // Video Generator
    videoGeneration: "AI推广视频生成",
    generateVideo: "生成推广视频",
    videoPlaceholder: '点击"生成推广视频"按钮，AI将为您生成精彩的推广视频',
    aiGeneratingVideo: "AI正在为您生成推广视频...",
    play: "播放",
    pause: "暂停",
    downloadVideo: "下载视频",
    
    // Success Cases
    successCases: "成功案例参考",
    caseTitle1: "智能手表广告",
    caseDesc1: "TikTok平台，播放量100万+，转化率提升35%",
    caseTitle2: "美妆产品推广",
    caseDesc2: "Instagram平台，互动量50万+，销量翻倍",
    caseTitle3: "家居好物种草",
    caseDesc3: "Amazon平台，点击率提升40%，ROI达到1:8",
    
    // Language names
    chinese: "中文",
    english: "English",
    
    // Errors
    generateFailed: "生成失败，请重试",
    networkError: "生成失败，请检查网络后重试",
  },
  en: {
    // Header
    title: "Cross-Border E-commerce Ad AI Generator",
    subtitle: "Generate copywriting, ad images, and promo videos in one click",
    
    // Product Input Section
    productInfo: "Product Info",
    productName: "Product Name",
    productNamePlaceholder: "Enter product name",
    keyFeatures: "Key Features",
    keyFeaturesPlaceholder: "Enter key selling points, one per line",
    platform: "Platform",
    copyLanguage: "Copy Language",
    copyStyle: "Copy Style",
    required: "*",
    tipTitle: "Tip",
    tipContent: "After filling in the product info, all three modules on the right will use this data for AI generation",
    
    // Copy Styles
    styleProfessional: "Professional",
    styleCasual: "Casual",
    styleEngaging: "Engaging",
    stylePremium: "Premium",
    
    // Copy Generator
    copyGeneration: "Ad Copy Generation",
    generateCopy: "Generate Copy",
    generating: "Generating...",
    copyPlaceholder: "Click \"Generate Copy\" button, AI will create professional ad copy for you",
    aiGeneratingCopy: "AI is generating copy for you...",
    copyToClipboard: "Copy to clipboard",
    
    // Image Generator
    imageGeneration: "Ad Image Generation",
    generateImage: "Generate Image",
    imagePlaceholder: "Click \"Generate Image\" button, AI will create stunning ad images for you",
    aiGeneratingImage: "AI is generating ad image for you...",
    enlargePreview: "Enlarge preview",
    downloadImage: "Download image",
    imagePreview: "Image Preview",
    
    // Video Generator
    videoGeneration: "AI Promo Video Generation",
    generateVideo: "Generate Video",
    videoPlaceholder: "Click \"Generate Video\" button, AI will create amazing promo videos for you",
    aiGeneratingVideo: "AI is generating promo video for you...",
    play: "Play",
    pause: "Pause",
    downloadVideo: "Download video",
    
    // Success Cases
    successCases: "Success Stories",
    caseTitle1: "Smart Watch Campaign",
    caseDesc1: "TikTok platform, 1M+ views, 35% conversion rate increase",
    caseTitle2: "Beauty Product Promotion",
    caseDesc2: "Instagram platform, 500K+ interactions, doubled sales",
    caseTitle3: "Home Goods Feature",
    caseDesc3: "Amazon platform, 40% CTR increase, 1:8 ROI",
    
    // Language names
    chinese: "中文",
    english: "English",
    
    // Errors
    generateFailed: "Generation failed, please try again",
    networkError: "Generation failed, please check your network",
  },
}

export type TranslationKeys = keyof typeof translations.zh

export function useTranslation(lang: UILanguage) {
  return translations[lang]
}
