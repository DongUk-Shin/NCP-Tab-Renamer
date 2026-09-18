# NCP Tab Renamer

<img width="1333" height="368" alt="dd" src="https://github.com/user-attachments/assets/1f96e5ad-8b54-4224-941e-648903685147" />

네이버 클라우드 콘솔의 URL을 기반으로 브라우저 탭 이름을 서비스명으로 자동 변경하는 Chrome 확장 프로그램입니다.

## 지원 콘솔

- **민간 클라우드**: [console.ncloud.com](https://console.ncloud.com)
- **금융 클라우드**: [console.fin-ncloud.com](https://console.fin-ncloud.com)
- **공공 클라우드**: [console.gov-ncloud.com](https://console.gov-ncloud.com)

## 주요 기능

- 네이버 클라우드 서비스명 기반 탭 제목 표시
- 일반 페이지 이동 및 SPA 화면 전환 지원
- 서버, 네트워크, 스토리지, 데이터베이스 등 다양한 서비스 지원

## 탭 이름 규칙

- **Server · VPC**: 하위 카테고리명으로 표시합니다.  
  예: `/vpc-network/subnet` → `Subnet Management`
- **그 외 서비스**: 상위 서비스명으로 표시합니다.  
  예: `/vpc-load-balancer/targetGroup` → `Load Balancer`

## 링크

- [Chrome 웹 스토어](https://chromewebstore.google.com/detail/kepchlbcpcbgklloofocpmmhdfnoebid?utm_source=item-share-cb)
- [GitHub](https://github.com/DongUk-Shin/NCP-Tab-Renamer)
- [문의 및 버그 제보](https://github.com/DongUk-Shin/NCP-Tab-Renamer/issues)
