'use client';
import { useUser, SignInButton, UserButton } from '@clerk/nextjs';
import { useState } from 'react';

export default function Home() {
  const { user } = useUser();
  const [remaining, setRemaining] = useState<number>(
    (user?.publicMetadata?.remainingGenerations as number) ?? 3
  );

  const handleGenerate = async () => {
    if (!user) return alert('请先登录！');
    if (remaining <= 0) return alert('次数已用完，请充值解锁！');

    // 这里替换成你的AI生成逻辑
    alert('生成中...');

    await user.update({
      publicMetadata: {
        remainingGenerations: remaining - 1
      }
    });
    setRemaining(prev => prev - 1);
    alert(`生成成功！剩余次数：${remaining - 1}`);
  };

  return (
    <main className="p-4">
      <header className="flex justify-end mb-8">
        {user ? <UserButton afterSignOutUrl="/" /> : <SignInButton />}
      </header>

      <h1 className="text-2xl font-bold mb-4">AI 广告生成工具</h1>
      <button
        onClick={handleGenerate}
        disabled={remaining <= 0}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        开始生成（剩余{remaining}次）
      </button>
    </main>
  );
}
