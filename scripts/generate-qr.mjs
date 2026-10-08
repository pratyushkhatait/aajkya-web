import QRCode from 'qrcode';
await QRCode.toFile(new URL('../public/media/play-store-qr.svg', import.meta.url).pathname,
  'https://play.google.com/store/apps/details?id=com.myspace.mealplanner',
  { type: 'svg', errorCorrectionLevel: 'M', margin: 4, color: { dark: '#203c30', light: '#f7f5ee' } });
