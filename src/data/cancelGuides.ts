export interface CancelGuideItem {
  id: string;
  serviceName: string;
  category: 'ott' | 'music' | 'shopping' | 'ai' | 'appstore';
  directUrl?: string;
  appScheme?: string;
  difficulty: '쉬움' | '보통' | '까다로움';
  warningNotice?: string;
  steps: string[];
  tips?: string;
}

export const CANCEL_GUIDES: CancelGuideItem[] = [
  {
    id: 'netflix',
    serviceName: '넷플릭스',
    category: 'ott',
    directUrl: 'https://www.netflix.com/youraccount',
    difficulty: '쉬움',
    steps: [
      '넷플릭스 웹사이트 로그인 후 우측 상단 프로필 아이콘 클릭',
      '[계정] 메뉴 선택',
      '멤버십 & 결제 정보 영역에서 [멤버십 해지] 버튼 클릭',
      '[해지 완료] 버튼을 누르면 다음 결제 예정일까지 시청 후 자동 종료'
    ],
    tips: '해지해도 결제 주기 마지막 날까지 계속 시청할 수 있습니다.'
  },
  {
    id: 'youtube',
    serviceName: '유튜브 프리미엄',
    category: 'ott',
    directUrl: 'https://www.youtube.com/paid_memberships',
    difficulty: '보통',
    steps: [
      '유튜브 앱 우측 상단 프로필 [나] 아이콘 터치',
      '[구매 항목 및 멤버십] 메뉴 터치',
      '멤버십 항목에서 [멤버십 관리] 터치',
      '[비활성화] 터치 후 일시중지 권유 화면에서 [그대로 취소] 선택',
      '취소 사유 선택 후 [취소 확인] 완료'
    ],
    tips: '아이폰 유저는 유튜브 앱이 아닌 Safari 웹이나 Apple ID 구독 설정에서 취소해야 수수료 없이 깔끔합니다.'
  },
  {
    id: 'coupang',
    serviceName: '쿠팡 와우 멤버십',
    category: 'shopping',
    directUrl: 'https://mc.coupang.com/ssr/desktop/order/regular-delivery',
    difficulty: '까다로움',
    warningNotice: '해지 방어 팝업이 2~3회 반복됩니다. 끝까지 "혜택 포기"를 누르셔야 합니다.',
    steps: [
      '쿠팡 앱 하단 [마이쿠팡] 터치',
      '[와우 멤버십] 메뉴 터치',
      '화면을 맨 아래로 내려 회색 작은 글씨 [해지하기] 터치',
      '혜택 유지 권유 페이지에서 [내가 받고 있는 혜택 포기하기] 터치',
      '두 번째 방어 화면에서도 [해지 신청하기] 터치하면 완료'
    ],
    tips: '해지 후 남은 기간 일할 환불 또는 다음 결제일 해지 중 선택할 수 있습니다.'
  },
  {
    id: 'tving',
    serviceName: '티빙 (TVING)',
    category: 'ott',
    directUrl: 'https://www.tving.com/my/subscription',
    difficulty: '보통',
    steps: [
      '티빙 앱 또는 웹 로그인 후 [MY] 메뉴 이동',
      '[이용권 / 캐시 내역] 터치',
      '[정기결제 해지] 버튼 클릭',
      '해지 방어 팝업에서 [해지 신청] 완료'
    ],
    tips: '네이버플러스 멤버십을 통해 이용 중이라면 네이버 멤버십 MY에서 해지해야 합니다.'
  },
  {
    id: 'disney',
    serviceName: '디즈니+',
    category: 'ott',
    directUrl: 'https://www.disneyplus.com/account',
    difficulty: '보통',
    steps: [
      '디즈니+ 로그인 후 우측 상단 프로필 터치',
      '[계정] 메뉴 선택',
      '[멤버십] 항목에서 구독 중인 요금제 클릭',
      '[멤버십 취소] 클릭 후 취소 사유 선택',
      '[취소 계속 진행] 누르면 완료'
    ]
  },
  {
    id: 'naver',
    serviceName: '네이버 플러스 멤버십',
    category: 'shopping',
    directUrl: 'https://nid.naver.com/membership/my',
    difficulty: '쉬움',
    steps: [
      '네이버 앱 좌측 상단 [Naver Pay] 터치',
      '우측 상단 톱니바퀴 [설정] > [네이버플러스 멤버십 관리]',
      '맨 하단 [네이버플러스 멤버십 해지하기] 터치',
      '[정기결제 해지하기] 클릭하면 완료'
    ]
  },
  {
    id: 'melon',
    serviceName: '멜론 (Melon)',
    category: 'music',
    directUrl: 'https://www.melon.com/commerce/pamphlet/prod/service_cancel.htm',
    difficulty: '까다로움',
    warningNotice: '모바일 앱에서는 메뉴가 숨겨져 있어 모바일 웹(m.melon.com)에서 진행하는 것이 훨씬 빠릅니다.',
    steps: [
      '모바일 웹 브라우저(Safari/Chrome)에서 m.melon.com 접속 후 로그인',
      '메뉴 [내 정보] > [이용권/쿠폰/캐시 관리]',
      '[변경/해지] 탭 선택',
      '[결제방법변경/해지] > [해지신청] 클릭',
      '할인 혜택 팝업을 지나 [그래도 해지할래요] 선택'
    ]
  },
  {
    id: 'spotify',
    serviceName: '스포티파이',
    category: 'music',
    directUrl: 'https://www.spotify.com/account/overview/',
    difficulty: '쉬움',
    steps: [
      '스포티파이 웹사이트 계정 페이지 접속',
      '[내 요금제] 섹션의 [요금제 변경] 클릭',
      '스크롤을 내려 [Premium 취소하기] 클릭',
      '[계속해서 취소하기] 누르면 무료 플랜으로 전환'
    ]
  },
  {
    id: 'chatgpt',
    serviceName: 'ChatGPT Plus',
    category: 'ai',
    directUrl: 'https://chatgpt.com',
    difficulty: '쉬움',
    steps: [
      'ChatGPT 좌측 하단 본인 계정 프로필 클릭',
      '[My Plan] (내 플랜) 선택',
      '[Manage my subscription] 클릭 (Stripe 결제창 열림)',
      '[Cancel plan] (플랜 취소) 클릭하면 즉시 완료'
    ]
  },
  {
    id: 'apple_appstore',
    serviceName: '아이폰 App Store 구독 전체 관리',
    category: 'appstore',
    appScheme: 'itms-apps://apps.apple.com/account/subscriptions',
    difficulty: '쉬움',
    steps: [
      '아이폰 [설정] 앱 실행',
      '상단 본인 이름 (Apple ID) 터치',
      '[구독] 메뉴 터치',
      '해지하고 싶은 구독 앱 선택 후 [구독 취소] 터치'
    ],
    tips: '앱스토어 인앱결제로 구독한 모든 서비스를 한곳에서 확인할 수 있습니다.'
  },
  {
    id: 'google_play',
    serviceName: '안드로이드 Google Play 정기결제 전체 관리',
    category: 'appstore',
    directUrl: 'https://play.google.com/store/account/subscriptions',
    difficulty: '쉬움',
    steps: [
      'Google Play 스토어 앱 실행',
      '우측 상단 프로필 아이콘 터치',
      '[결제 및 정기 결제] > [정기 결제] 터치',
      '취소할 구독 선택 후 [구독 취소] 터치'
    ]
  }
];
