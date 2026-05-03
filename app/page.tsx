'use client';
import { useUser, SignInButton, UserButton } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

export default function Home() {
  const { user } = useUser();

  // 积分：从用户登录信息读取，新用户默认 50 积分
  const [points, setPoints] = useState<number>(50);

  // 每次用户登录时，从 Clerk 加载积分
  useEffect(() => {
    if (user?.publicMetadata?.points) {
      setPoints(Number(user.publicMetadata.points));
    }
  }, [user]);

  // 消耗规则（完全对标 Vidu）
  const COST = {
    text: 10,    // 文案
    image: 50,   // 图片
    video: 200   // 视频
  };

  // 付费套餐（你要求的价格）
  const packages = [
    { name: "标准版", price: "49元", points: 1000, desc: "个人轻度使用" },
    { name: "专业版", price: "199元", points: 5000, desc: "高频创作者" },
    { name: "旗舰版", price: "499元", points: 8000, desc: "团队商业使用" },
  ];

  // 生成功能
  const handleGenerate = async (type: 'text' | 'image' | 'video') => {
    if (!user) {
      alert("请先登录！");
      return;
    }

    const cost = COST[type];

    if (points < cost) {
      alert(`积分不足！需要 ${cost} 积分，当前 ${points} 积分`);
      return;
    }

    // 扣积分
    const newPoints = points - cost;
    setPoints(newPoints);

    // 保存到用户账号
    await user.update({
      publicMetadata: {
        points: newPoints
      }
    });

    alert(`✅ 生成成功！消耗 ${cost} 积分，剩余 ${newPoints} 积分`);
  };

  return (
    <main style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* 登录区域 */}
      <header style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        {user ? <UserButton afterSignOutUrl="/" /> : <SignInButton />}
      </header>

      <h1 style={{ fontSize: '22px', fontWeight: 'bold' }}>AI广告生成工具</h1>

      {/* 积分显示 */}
      <div style={{
        background: '#f5f7fa',
        padding: '12px 16px',
        borderRadius: 10,
        margin: '15px 0'
      }}>
        <strong>当前积分：{points}</strong>
      </div>

      {/* 生成按钮 */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 30 }}>
        <button onClick={() => handleGenerate('text')}
          style={{ flex: 1, padding: 12, background: '#0071e3', color: 'white', border: 0, borderRadius: 8 }}>
          文案<br/>10积分
        </button>
        <button onClick={() => handleGenerate('image')}
          style={{ flex: 1, padding: 12, background: '#0071e3', color: 'white', border: 0, borderRadius: 8 }}>
          图片<br/>50积分
        </button>
        <button onClick={() => handleGenerate('video')}
          style={{ flex: 1, padding: 12, background: '#0071e3', color: 'white', border: 0, borderRadius: 8 }}>
          视频<br/>200积分
        </button>
      </div>

      {/* 付费套餐 */}
      <h2 style={{ marginBottom: 10 }}>充值套餐</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {packages.map((item, i) => (
          <div key={i} style={{ border: '1px solid #ddd', borderRadius: 12, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>{item.name}</strong>
                <div>{item.points} 积分</div>
                <div style={{ fontSize: 12, color: '#666' }}>{item.desc}</div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 'bold', color: '#0071e3' }}>
                {item.price}
              </div>
            </div>
            <button
              onClick={() => alert(`请支付 ${item.price}，充值 ${item.points} 积分`)}
              style={{ width: '100%', marginTop: 10, padding: 10, background: '#0071e3', color: 'white', border: 0, borderRadius: 8 }}>
              立即购买
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
