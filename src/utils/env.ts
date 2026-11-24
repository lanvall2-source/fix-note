/**
 * 런타임 환경 감지 헬퍼 (토스 인앱 vs Vercel 웹 분기)
 * 
 * 1. Toss In-App WebView: User-Agent에 'Toss' 또는 'TOSSBANK' 포함
 * 2. Apps in Toss (AIT) 컨테이너: window.__AIT__ 또는 window.appsInToss 주입
 * 3. URL 파라미터: ?platform=toss 또는 ?source=toss
 */

export function isTossApp(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  // 1. Toss WebView UserAgent 검사
  const ua = window.navigator.userAgent || '';
  if (/toss|tossbank/i.test(ua)) {
    return true;
  }

  // 2. Apps in Toss 런타임 글로벌 객체 검사
  const win = window as any;
  if (win.__AIT__ || win.appsInToss || win.__TOSS__) {
    return true;
  }

  // 3. URL 쿼리 파라미터 검사 (디버그 및 임베드용)
  try {
    const params = new URLSearchParams(window.location.search);
    const platform = params.get('platform');
    const source = params.get('source');
    if (platform === 'toss' || source === 'toss') {
      return true;
    }
  } catch {
    // ignore
  }

  // 4. 레퍼러 검사
  if (typeof document !== 'undefined' && document.referrer) {
    if (document.referrer.includes('toss.im')) {
      return true;
    }
  }

  return false;
}

export function isVercelWeb(): boolean {
  return !isTossApp();
}
