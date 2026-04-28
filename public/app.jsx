// Browser-React (geladen via CDN in index.html)
const { useState, useRef, useEffect } = React;

// Lucide-Icons werden als einfache SVG-Komponenten ersetzt
const Icon = ({ d, size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>{d}</svg>
);
const Wrench = (p) => <Icon {...p} d={<><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></>} />;
const X = (p) => <Icon {...p} d={<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>} />;
const ArrowRight = (p) => <Icon {...p} d={<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>} />;
const ArrowLeft = (p) => <Icon {...p} d={<><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>} />;
const Camera = (p) => <Icon {...p} d={<><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></>} />;
const AlertTriangle = (p) => <Icon {...p} d={<><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>} />;
const RefreshCw = (p) => <Icon {...p} d={<><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></>} />;
const FileText = (p) => <Icon {...p} d={<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>} />;
const Check = (p) => <Icon {...p} d={<polyline points="20 6 9 17 4 12"/>} />;
const User = (p) => <Icon {...p} d={<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>} />;
const ClipboardList = (p) => <Icon {...p} d={<><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="15" y2="16"/></>} />;
const MessageCircle = (p) => <Icon {...p} d={<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>} />;
const Plus = (p) => <Icon {...p} d={<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>} />;
const Search = (p) => <Icon {...p} d={<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>} />;
const ChevronRight = (p) => <Icon {...p} d={<polyline points="9 18 15 12 9 6"/>} />;
const LogOut = (p) => <Icon {...p} d={<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>} />;
const Hourglass = (p) => <Icon {...p} d={<><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></>} />;
const Package = (p) => <Icon {...p} d={<><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>} />;
const CheckCircle2 = (p) => <Icon {...p} d={<><circle cx="12" cy="12" r="10"/><polyline points="9 12 12 15 16 9"/></>} />;
const PlayCircle = (p) => <Icon {...p} d={<><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></>} />;
const Send = (p) => <Icon {...p} d={<><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>} />;
const Copy = (p) => <Icon {...p} d={<><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>} />;
const BarChart3 = (p) => <Icon {...p} d={<><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></>} />;
const ImageIcon = (p) => <Icon {...p} d={<><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>} />;
const Calendar = (p) => <Icon {...p} d={<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>} />;
const Link2 = (p) => <Icon {...p} d={<><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" y1="12" x2="16" y2="12"/></>} />;
const Globe = (p) => <Icon {...p} d={<><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>} />;
const Shield = (p) => <Icon {...p} d={<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>} />;
const Eye = (p) => <Icon {...p} d={<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>} />;
const Printer = (p) => <Icon {...p} d={<><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></>} />;
const Loader = (p) => <Icon {...p} d={<><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></>} />;
const Cloud = (p) => <Icon {...p} d={<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>} />;

const SHOP_NAME = 'Expert Repair';
const SHOP_LOCATION = 'Berlin';
const WARRANTY_MONTHS = 6;
const TRACKING_BASE_URL = window.location.origin + '/track';
const GOOGLE_REVIEW_URL = 'https://g.page/r/CXc8tGqEXAMPLE/review';

const PIN_STORAGE_KEY = 'expert-repair-pin';
const ROLE_STORAGE_KEY = 'expert-repair-role';

// === API-CLIENT ===
async function apiCall(endpoint, body) {
  const pin = localStorage.getItem(PIN_STORAGE_KEY) || '';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-shop-pin': pin,
    },
    body: JSON.stringify(body),
  });
  if (res.status === 401) {
    localStorage.removeItem(PIN_STORAGE_KEY);
    localStorage.removeItem(ROLE_STORAGE_KEY);
    window.location.reload();
    throw new Error('PIN abgelaufen');
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Server-Fehler ${res.status}`);
  }
  return res.json();
}

const api = {
  loadAll: () => apiCall('/api/db', { action: 'load_all' }),
  createCustomer: (data) => apiCall('/api/db', { action: 'create_customer', ...data }),
  createJob: (data) => apiCall('/api/db', { action: 'create_job', ...data }),
  updateStatus: (id, status, note) => apiCall('/api/db', { action: 'update_job_status', id, status, note }),
  updateNotes: (id, technician_notes) => apiCall('/api/db', { action: 'update_job_notes', id, technician_notes }),
  updatePartsNotes: (id, parts_notes) => apiCall('/api/db', { action: 'update_job_parts_notes', id, parts_notes }),
  uploadAfterImage: (id, imageBase64, imageMediaType) => apiCall('/api/db', { action: 'upload_after_image', id, imageBase64, imageMediaType }),
  rejectDiagnosis: (data) => apiCall('/api/db', { action: 'reject_diagnosis', ...data }),
  diagnose: (imageBase64, mediaType, device, description) => apiCall('/api/diagnose', { imageBase64, mediaType, device, description }),
};

const LANGUAGES = {
  de: { label: 'Deutsch', flag: '🇩🇪', dir: 'ltr', short: 'DE' },
  tr: { label: 'Türkçe', flag: '🇹🇷', dir: 'ltr', short: 'TR' },
  en: { label: 'English', flag: '🇬🇧', dir: 'ltr', short: 'EN' },
  ar: { label: 'العربية', flag: '🇸🇦', dir: 'rtl', short: 'AR' },
  ru: { label: 'Русский', flag: '🇷🇺', dir: 'ltr', short: 'RU' },
};

const STATUSES = {
  eingegangen: { label: 'Eingegangen', color: '#857d70', bg: '#1f1c17', icon: Hourglass,
    i18n: { de: 'Eingegangen', tr: 'Alındı', en: 'Received', ar: 'تم الاستلام', ru: 'Принято' } },
  in_arbeit: { label: 'In Arbeit', color: '#e8b04b', bg: '#3a2f1a', icon: PlayCircle,
    i18n: { de: 'In Arbeit', tr: 'Tamir Ediliyor', en: 'In Progress', ar: 'قيد الإصلاح', ru: 'В работе' } },
  wartet_auf_teile: { label: 'Wartet auf Teile', color: '#e87a5b', bg: '#3a1f1a', icon: Package,
    i18n: { de: 'Wartet auf Teile', tr: 'Parça Bekliyor', en: 'Waiting for Parts', ar: 'بانتظار قطع الغيار', ru: 'Ожидание запчастей' } },
  fertig: { label: 'Fertig', color: '#7dd99c', bg: '#1a3a2a', icon: CheckCircle2,
    i18n: { de: 'Fertig zur Abholung', tr: 'Teslim Almaya Hazır', en: 'Ready for Pickup', ar: 'جاهز للاستلام', ru: 'Готово к выдаче' } },
  abgeholt: { label: 'Abgeholt', color: '#5c554a', bg: '#1a1815', icon: Check,
    i18n: { de: 'Abgeholt', tr: 'Teslim Alındı', en: 'Picked Up', ar: 'تم الاستلام', ru: 'Получено' } },
};

const ROLES = {
  tresen: { pin: '1111', label: 'Tresen', icon: User, color: '#e8904b' },
  techniker: { pin: '2222', label: 'Techniker', icon: Wrench, color: '#e8b04b' },
  chef: { pin: '3333', label: 'Chef/in', icon: BarChart3, color: '#7dd99c' },
};

const SIX_MONTHS = 86400000 * 30 * 6;

// Helper für Date-Konvertierung (DB liefert ISO-Strings, App erwartet Timestamps)
const normalizeJob = (j) => ({
  ...j,
  image: j.image_url,
  image_after: j.image_after_url,
  warranty_until: j.warranty_until ? new Date(j.warranty_until).getTime() : null,
  created_at: j.created_at ? new Date(j.created_at).getTime() : Date.now(),
  updated_at: j.updated_at ? new Date(j.updated_at).getTime() : Date.now(),
  history: j.history || [],
});
const normalizeCustomer = (c) => ({
  ...c,
  created_at: c.created_at ? new Date(c.created_at).getTime() : Date.now(),
});

const formatRelative = (ts) => {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  const hr = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (min < 1) return 'gerade eben';
  if (min < 60) return `vor ${min} Min`;
  if (hr < 24) return `vor ${hr} Std`;
  if (d === 1) return 'gestern';
  return `vor ${d} Tagen`;
};
const formatDate = (ts) => new Date(ts).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
const formatDateOnly = (ts) => new Date(ts).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });

const isWarrantyActive = (job) => {
  if (!job.warranty_until) return false;
  if (job.status !== 'abgeholt' && job.status !== 'fertig') return false;
  return job.warranty_until > Date.now();
};
const getActiveWarranties = (customerId, jobs) => jobs.filter(j => j.customer_id === customerId && isWarrantyActive(j));
const trackingUrl = (jobId) => `${TRACKING_BASE_URL}?id=J${jobId}`;
const priceStr = (job) => job.price_min === job.price_max ? `${job.price_min}€` : `${job.price_min}–${job.price_max}€`;

const TEMPLATE_LABELS = {
  de: { annahme: 'Annahme bestätigen', fertig: 'Reparatur fertig', teile: 'Wartet auf Teile', erinnerung: 'Erinnerung Abholung', bewertung: '⭐ Bewertung anfragen', individuell: 'Eigene Nachricht' },
  tr: { annahme: 'Sipariş Onayı', fertig: 'Tamir Tamamlandı', teile: 'Parça Bekliyor', erinnerung: 'Teslim Hatırlatması', bewertung: '⭐ Değerlendirme İste', individuell: 'Özel Mesaj' },
  en: { annahme: 'Confirm Receipt', fertig: 'Repair Done', teile: 'Waiting for Parts', erinnerung: 'Pickup Reminder', bewertung: '⭐ Request Review', individuell: 'Custom Message' },
  ar: { annahme: 'تأكيد الاستلام', fertig: 'الإصلاح جاهز', teile: 'بانتظار القطع', erinnerung: 'تذكير الاستلام', bewertung: '⭐ طلب تقييم', individuell: 'رسالة مخصصة' },
  ru: { annahme: 'Заказ принят', fertig: 'Ремонт готов', teile: 'Ожидание запчастей', erinnerung: 'Напоминание', bewertung: '⭐ Запрос отзыва', individuell: 'Своё сообщение' },
};

const buildTemplate = (key, lang, ctx) => {
  const { first, device, repair, price, duration, id, tracking, review } = ctx;
  const T = {
    de: {
      annahme: `Hallo ${first}, wir haben Ihr ${device} angenommen. ✅\n\n• Reparatur: ${repair}\n• Preis: ${price}\n• Voraussichtlich: ${duration}\n• Auftragsnr.: #${id}\n\nStatus jederzeit verfolgen:\n${tracking}\n\nViele Grüße,\n${SHOP_NAME} ${SHOP_LOCATION}`,
      fertig: `Hallo ${first}, Ihr ${device} ist fertig repariert. ✅\n\nSie können das Gerät zu unseren Öffnungszeiten abholen:\n• Auftragsnr.: #${id}\n• Endpreis: ${price}\n• Garantie: ${WARRANTY_MONTHS} Monate auf die Reparatur 🛡️\n\nViele Grüße,\n${SHOP_NAME} ${SHOP_LOCATION}`,
      teile: `Hallo ${first}, kurze Info zu Ihrem ${device} (Auftrag #${id}): Die Ersatzteile sind bestellt und treffen voraussichtlich in 2-3 Werktagen ein. Wir melden uns sofort, sobald die Reparatur fertig ist.\n\nDanke für Ihre Geduld!\n${SHOP_NAME} ${SHOP_LOCATION}`,
      erinnerung: `Hallo ${first}, freundliche Erinnerung: Ihr ${device} wartet auf Abholung (Auftrag #${id}, ${price}). Sie können das Gerät zu unseren Öffnungszeiten abholen.\n\nViele Grüße,\n${SHOP_NAME} ${SHOP_LOCATION}`,
      bewertung: `Hallo ${first}, vielen Dank, dass Sie Ihr ${device} bei uns reparieren lassen haben! 🛠️\n\nWenn Sie zufrieden waren, würden wir uns sehr über eine kurze Google-Bewertung freuen — das hilft uns als kleinem Familiengeschäft sehr:\n\n👉 ${review}\n\nDanke für Ihr Vertrauen!\n${SHOP_NAME} ${SHOP_LOCATION}`,
      individuell: `Hallo ${first},\n\n[hier Nachricht eintippen]\n\nViele Grüße,\n${SHOP_NAME} ${SHOP_LOCATION}`,
    },
    tr: {
      annahme: `Merhaba ${first}, ${device} cihazınızı teslim aldık. ✅\n\n• Tamir: ${repair}\n• Ücret: ${price}\n• Tahmini süre: ${duration}\n• İş No.: #${id}\n\nDurumu istediğiniz zaman takip edin:\n${tracking}\n\nSaygılarımızla,\n${SHOP_NAME} ${SHOP_LOCATION}`,
      fertig: `Merhaba ${first}, ${device} cihazınızın tamiri tamamlandı. ✅\n\nÇalışma saatlerimizde teslim alabilirsiniz:\n• İş No.: #${id}\n• Toplam: ${price}\n• Garanti: Tamir üzerine ${WARRANTY_MONTHS} ay 🛡️\n\nSaygılarımızla,\n${SHOP_NAME} ${SHOP_LOCATION}`,
      teile: `Merhaba ${first}, ${device} cihazınız hakkında kısa bilgi (İş No. #${id}): Yedek parçalar sipariş edildi, 2-3 iş günü içinde gelecek. Tamir tamamlandığında hemen haber vereceğiz.\n\nSabrınız için teşekkürler!\n${SHOP_NAME} ${SHOP_LOCATION}`,
      erinnerung: `Merhaba ${first}, dostane bir hatırlatma: ${device} cihazınız teslim alınmayı bekliyor (İş No. #${id}, ${price}). Çalışma saatlerimizde mağazadan teslim alabilirsiniz.\n\nSaygılarımızla,\n${SHOP_NAME} ${SHOP_LOCATION}`,
      bewertung: `Merhaba ${first}, ${device} cihazınızı bizde tamir ettirdiğiniz için teşekkür ederiz! 🛠️\n\nMemnun kaldıysanız, kısa bir Google değerlendirmesi yapmanız bizi çok mutlu eder — küçük bir aile işletmesi olarak çok yardımcı olur:\n\n👉 ${review}\n\nGüveniniz için teşekkürler!\n${SHOP_NAME} ${SHOP_LOCATION}`,
      individuell: `Merhaba ${first},\n\n[buraya mesaj yazın]\n\nSaygılarımızla,\n${SHOP_NAME} ${SHOP_LOCATION}`,
    },
    en: {
      annahme: `Hello ${first}, we've received your ${device}. ✅\n\n• Repair: ${repair}\n• Price: ${price}\n• Estimated time: ${duration}\n• Order #${id}\n\nTrack status anytime:\n${tracking}\n\nBest regards,\n${SHOP_NAME} ${SHOP_LOCATION}`,
      fertig: `Hello ${first}, your ${device} has been repaired. ✅\n\nYou can pick it up during our opening hours:\n• Order #${id}\n• Total: ${price}\n• Warranty: ${WARRANTY_MONTHS} months on the repair 🛡️\n\nBest regards,\n${SHOP_NAME} ${SHOP_LOCATION}`,
      teile: `Hello ${first}, quick update on your ${device} (Order #${id}): The spare parts are on order and should arrive in 2-3 business days. We'll notify you immediately once the repair is complete.\n\nThank you for your patience!\n${SHOP_NAME} ${SHOP_LOCATION}`,
      erinnerung: `Hello ${first}, friendly reminder: Your ${device} is waiting for pickup (Order #${id}, ${price}). You can collect it during our opening hours.\n\nBest regards,\n${SHOP_NAME} ${SHOP_LOCATION}`,
      bewertung: `Hello ${first}, thank you for trusting us with your ${device}! 🛠️\n\nIf you were satisfied, we'd really appreciate a short Google review — it helps us a lot as a small family business:\n\n👉 ${review}\n\nThank you for your trust!\n${SHOP_NAME} ${SHOP_LOCATION}`,
      individuell: `Hello ${first},\n\n[type your message here]\n\nBest regards,\n${SHOP_NAME} ${SHOP_LOCATION}`,
    },
    ar: {
      annahme: `مرحباً ${first}،\n\nاستلمنا جهازك ${device} ✅\n\n• الإصلاح: ${repair}\n• السعر: ${price}\n• المدة المتوقعة: ${duration}\n• رقم الطلب: #${id}\n\nيمكنك متابعة الحالة في أي وقت:\n${tracking}\n\nمع أطيب التحيات،\n${SHOP_NAME} ${SHOP_LOCATION}`,
      fertig: `مرحباً ${first}،\n\nتم إصلاح جهازك ${device} ✅\n\nيمكنك استلامه خلال ساعات عملنا:\n• رقم الطلب: #${id}\n• المبلغ: ${price}\n• الضمان: ${WARRANTY_MONTHS} أشهر على الإصلاح 🛡️\n\nمع أطيب التحيات،\n${SHOP_NAME} ${SHOP_LOCATION}`,
      teile: `مرحباً ${first}،\n\nتحديث بشأن جهازك ${device} (طلب #${id}): تم طلب قطع الغيار وستصل خلال 2-3 أيام عمل. سنعلمك فور الانتهاء من الإصلاح.\n\nشكراً لصبرك!\n${SHOP_NAME} ${SHOP_LOCATION}`,
      erinnerung: `مرحباً ${first}،\n\nتذكير ودي: جهازك ${device} جاهز للاستلام (طلب #${id}، ${price}). يمكنك استلامه خلال ساعات عملنا.\n\nمع أطيب التحيات،\n${SHOP_NAME} ${SHOP_LOCATION}`,
      bewertung: `مرحباً ${first}،\n\nشكراً لاختيارك إصلاح جهازك ${device} لدينا! 🛠️\n\nإذا كنت راضياً، يسعدنا جداً أن تترك تقييماً قصيراً على Google — هذا يساعدنا كثيراً كمحل عائلي صغير:\n\n👉 ${review}\n\nشكراً لثقتك بنا!\n${SHOP_NAME} ${SHOP_LOCATION}`,
      individuell: `مرحباً ${first}،\n\n[اكتب الرسالة هنا]\n\nمع أطيب التحيات،\n${SHOP_NAME} ${SHOP_LOCATION}`,
    },
    ru: {
      annahme: `Здравствуйте, ${first}!\n\nМы приняли Ваш ${device}. ✅\n\n• Ремонт: ${repair}\n• Цена: ${price}\n• Ориентировочное время: ${duration}\n• Номер заказа: #${id}\n\nОтслеживание статуса:\n${tracking}\n\nС уважением,\n${SHOP_NAME} ${SHOP_LOCATION}`,
      fertig: `Здравствуйте, ${first}! Ваш ${device} отремонтирован. ✅\n\nВы можете забрать устройство в рабочие часы:\n• Заказ #${id}\n• Итог: ${price}\n• Гарантия: ${WARRANTY_MONTHS} месяцев на ремонт 🛡️\n\nС уважением,\n${SHOP_NAME} ${SHOP_LOCATION}`,
      teile: `Здравствуйте, ${first}! Краткое обновление по ${device} (заказ #${id}): Запчасти заказаны, прибудут через 2-3 рабочих дня. Сообщим сразу после готовности.\n\nСпасибо за терпение!\n${SHOP_NAME} ${SHOP_LOCATION}`,
      erinnerung: `Здравствуйте, ${first}! Дружеское напоминание: Ваш ${device} готов к получению (заказ #${id}, ${price}). Можете забрать в рабочие часы.\n\nС уважением,\n${SHOP_NAME} ${SHOP_LOCATION}`,
      bewertung: `Здравствуйте, ${first}! Спасибо, что доверили нам ремонт Вашего ${device}! 🛠️\n\nЕсли Вы остались довольны, будем благодарны за короткий отзыв на Google — это очень помогает нам как маленькому семейному бизнесу:\n\n👉 ${review}\n\nСпасибо за доверие!\n${SHOP_NAME} ${SHOP_LOCATION}`,
      individuell: `Здравствуйте, ${first}!\n\n[введите сообщение здесь]\n\nС уважением,\n${SHOP_NAME} ${SHOP_LOCATION}`,
    },
  };
  return T[lang]?.[key] || T.de[key];
};

const waTemplates = (job, customer, lang) => {
  const ctx = { first: customer.name.split(' ')[0], device: job.device, repair: job.repair,
    price: priceStr(job), duration: job.duration, id: String(job.id).toUpperCase(),
    tracking: trackingUrl(job.id), review: GOOGLE_REVIEW_URL };
  const labels = TEMPLATE_LABELS[lang] || TEMPLATE_LABELS.de;
  const out = {};
  ['annahme', 'fertig', 'teile', 'erinnerung', 'bewertung', 'individuell'].forEach(k => {
    out[k] = { label: labels[k], text: buildTemplate(k, lang, ctx) };
  });
  return out;
};

const waLink = (phone, text) => {
  const cleaned = phone.replace(/[^\d+]/g, '').replace(/^\+/, '');
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(text)}`;
};

function App() {
  // === Normaler Mitarbeiter-Modus ===
  const [role, setRole] = useState(() => localStorage.getItem(ROLE_STORAGE_KEY) || null);
  const [view, setView] = useState('home');
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [pendingDiagnosis, setPendingDiagnosis] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [waJob, setWaJob] = useState(null);
  const [trackingPreviewId, setTrackingPreviewId] = useState(null);
  const [rejectedDiagnoses, setRejectedDiagnoses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);

  // Daten initial laden, wenn eingeloggt
  const reloadAll = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const data = await api.loadAll();
      setCustomers((data.customers || []).map(normalizeCustomer));
      setJobs((data.jobs || []).map(normalizeJob));
      setRejectedDiagnoses(data.rejected || []);
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role) reloadAll();
  }, [role]);

  // Auto-refresh alle 60 Sekunden — damit Tresen-Tablet den Stand des Technikers sieht
  useEffect(() => {
    if (!role) return;
    const interval = setInterval(reloadAll, 60000);
    return () => clearInterval(interval);
  }, [role]);

  const handleLogin = (newRole) => {
    localStorage.setItem(ROLE_STORAGE_KEY, newRole);
    setRole(newRole);
  };

  const handleLogout = () => {
    localStorage.removeItem(ROLE_STORAGE_KEY);
    setRole(null);
    setView('home');
  };

  const updateJob = async (id, patch, historyEntry) => {
    // Optimistic update
    setJobs(prev => prev.map(j => {
      if (j.id !== id) return j;
      const updated = { ...j, ...patch, updated_at: Date.now() };
      if (historyEntry) updated.history = [...(j.history || []), { ...historyEntry, at: Date.now() }];
      return updated;
    }));
    // Server-Sync
    try {
      if (patch.status) {
        await api.updateStatus(id, patch.status, historyEntry?.note);
      }
      if (patch.technician_notes !== undefined) {
        await api.updateNotes(id, patch.technician_notes);
      }
      if (patch.image_after) {
        // Wird in handleAfterImage separat gemacht
      }
    } catch (err) {
      alert('Speichern fehlgeschlagen: ' + err.message);
      reloadAll();
    }
  };

  const addJob = (job) => setJobs(prev => [normalizeJob(job), ...prev]);
  const addCustomer = (c) => setCustomers(prev => [normalizeCustomer(c), ...prev]);
  const addRejected = async (customer, diagnosis) => {
    try {
      let resolvedCustomer = customer;
      if (customer.isNew) {
        const newC = await api.createCustomer({
          name: customer.name, phone: customer.phone,
          notes: customer.notes, language: customer.language,
        });
        addCustomer(newC);
        resolvedCustomer = newC;
      }
      const r = await api.rejectDiagnosis({
        customer_id: resolvedCustomer.id,
        device: diagnosis.device, repair: diagnosis.repair,
        price_min: diagnosis.price_min, price_max: diagnosis.price_max,
        damage: diagnosis.damage,
        imageBase64: diagnosis.imageBase64, imageMediaType: diagnosis.imageMediaType,
      });
      setRejectedDiagnoses(prev => [r, ...prev]);
    } catch (err) {
      alert('Fehler: ' + err.message);
    }
  };

  const getCustomer = (id) => customers.find(c => c.id === id);
  const selectedJob = jobs.find(j => j.id === selectedJobId);

  if (trackingPreviewId) {
    const j = jobs.find(jj => jj.id === trackingPreviewId);
    const c = j ? getCustomer(j.customer_id) : null;
    if (j && c) return <PublicTracking job={j} customer={c} onExit={() => setTrackingPreviewId(null)} />;
  }

  return (
    <div className="min-h-screen w-full" style={{ background: '#0a0908', color: '#f0e9dc', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;700&family=Noto+Sans+Arabic:wght@400;500;600&display=swap');
        @keyframes fadeup { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .fadeup { animation: fadeup 0.35s ease-out forwards; }
        .pulse { animation: pulse 2s ease-in-out infinite; }
        .display-serif { font-family: 'Instrument Serif', serif; font-style: italic; letter-spacing: -0.02em; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .arabic { font-family: 'Noto Sans Arabic', 'Bricolage Grotesque', sans-serif; }
        .scanline::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 0%, rgba(232, 144, 75, 0.18) 50%, transparent 100%); animation: scan 2s ease-in-out infinite; pointer-events: none; }
        button { transition: all 0.15s; }
        button:active { transform: scale(0.98); }
        input, textarea, select { font-family: inherit; }
        input:focus, textarea:focus, select:focus { outline: none; }
        .scrollbar::-webkit-scrollbar { width: 6px; }
        .scrollbar::-webkit-scrollbar-thumb { background: #2a2620; border-radius: 3px; }

        @media print {
          body * { visibility: hidden !important; }
          #annahmeschein-print, #annahmeschein-print * { visibility: visible !important; }
          #annahmeschein-print {
            position: absolute !important;
            top: 0 !important; left: 0 !important;
            width: 100% !important;
            background: white !important;
            color: black !important;
            padding: 30px !important;
          }
          #annahmeschein-print .print-only { display: block !important; }
        }
        #annahmeschein-print { display: none; }
        @media print {
          #annahmeschein-print { display: block; }
        }
      `}</style>

      {!role && <LoginScreen onLogin={handleLogin} />}
      {role && (
        <>
          <Header role={role} onLogout={handleLogout} onHome={() => setView('home')} loading={loading} onReload={reloadAll} />
          {loadError && (
            <div className="max-w-5xl mx-auto px-5 mt-4">
              <div className="p-4 rounded-md flex items-start gap-3" style={{ background: '#2a1a17', border: '1px solid #5a3328' }}>
                <AlertTriangle size={18} style={{ color: '#e87a5b', flexShrink: 0, marginTop: 2 }} />
                <div className="flex-1 text-sm" style={{ color: '#e8b8a8' }}>
                  Daten konnten nicht geladen werden: {loadError}
                </div>
                <button onClick={reloadAll} className="text-sm underline" style={{ color: '#e87a5b' }}>Erneut versuchen</button>
              </div>
            </div>
          )}
          <main className="max-w-5xl mx-auto px-5 py-8">
            {view === 'home' && (
              <Home role={role} jobs={jobs} customers={customers} rejected={rejectedDiagnoses}
                onNew={() => { setPendingDiagnosis(null); setView('diagnose'); }}
                onList={() => setView('jobList')}
                onJob={(id) => { setSelectedJobId(id); setView('jobDetail'); }} />
            )}
            {view === 'diagnose' && (
              <DiagnoseFlow onBack={() => setView('home')}
                onComplete={(diagnosis, image, mediaType, base64) => {
                  setPendingDiagnosis({ diagnosis, image, mediaType, base64 });
                  setView('newJob');
                }} />
            )}
            {view === 'newJob' && pendingDiagnosis && (
              <NewJobForm diagnosis={pendingDiagnosis} customers={customers} jobs={jobs}
                onCancel={() => { setPendingDiagnosis(null); setView('home'); }}
                onCreate={async (customer, jobData) => {
                  try {
                    let resolvedCustomer = customer;
                    if (customer.isNew) {
                      const newC = await api.createCustomer({
                        name: customer.name, phone: customer.phone,
                        notes: customer.notes, language: customer.language,
                      });
                      addCustomer(newC);
                      resolvedCustomer = newC;
                    }
                    const newJob = await api.createJob({
                      customer_id: resolvedCustomer.id,
                      device: jobData.device,
                      device_type: jobData.diagnosis_data?.geraete_typ,
                      damage: jobData.damage,
                      repair: jobData.repair,
                      price_min: jobData.price_min,
                      price_max: jobData.price_max,
                      duration: jobData.duration,
                      deposit: jobData.deposit,
                      diagnosis_data: jobData.diagnosis_data,
                      imageBase64: pendingDiagnosis.base64,
                      imageMediaType: pendingDiagnosis.mediaType,
                    });
                    // Reload um Historie korrekt zu haben
                    await reloadAll();
                    setPendingDiagnosis(null);
                    setSelectedJobId(newJob.id);
                    setView('jobDetail');
                  } catch (err) {
                    alert('Speichern fehlgeschlagen: ' + err.message);
                  }
                }}
                onReject={async (customer, diagnosis) => {
                  await addRejected(customer, {
                    ...diagnosis,
                    imageBase64: pendingDiagnosis.base64,
                    imageMediaType: pendingDiagnosis.mediaType,
                  });
                  setPendingDiagnosis(null);
                  setView('home');
                }} />
            )}
            {view === 'jobList' && (
              <JobList jobs={jobs} customers={customers}
                onJob={(id) => { setSelectedJobId(id); setView('jobDetail'); }}
                onBack={() => setView('home')} role={role} />
            )}
            {view === 'jobDetail' && selectedJob && (
              <JobDetail job={selectedJob} customer={getCustomer(selectedJob.customer_id)}
                allJobs={jobs} role={role}
                onBack={() => setView('jobList')}
                onUpdateStatus={(status, note) => updateJob(selectedJob.id, { status, technician_notes: note ?? selectedJob.technician_notes }, { status, note: note || STATUSES[status].label })}
                onUpdateNotes={(note) => updateJob(selectedJob.id, { technician_notes: note })}
                onUpdateAfterImage={async (imageBase64, mediaType) => {
                  try {
                    const result = await api.uploadAfterImage(selectedJob.id, imageBase64, mediaType);
                    setJobs(prev => prev.map(j => j.id === selectedJob.id ? { ...j, image_after: result.image_after_url, image_after_url: result.image_after_url } : j));
                  } catch (err) {
                    alert('Upload fehlgeschlagen: ' + err.message);
                  }
                }}
                onWhatsApp={() => setWaJob(selectedJob)}
                onTrackingPreview={() => setTrackingPreviewId(selectedJob.id)} />
            )}
          </main>
        </>
      )}

      {waJob && <WhatsAppModal job={waJob} customer={getCustomer(waJob.customer_id)} onClose={() => setWaJob(null)} />}

      {/* Verstecktes Print-Element: nur sichtbar beim Drucken */}
      {selectedJob && (
        <AnnahmescheinPrint job={selectedJob} customer={getCustomer(selectedJob.customer_id)} />
      )}
    </div>
  );
}

function LoginScreen({ onLogin }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  const checkPin = async (val) => {
    setChecking(true);
    setError('');
    // Lokaler Rollen-Match
    const roleEntry = Object.entries(ROLES).find(([k, v]) => v.pin === val);
    if (!roleEntry) {
      setError('Falscher PIN');
      setChecking(false);
      setTimeout(() => setPin(''), 800);
      return;
    }
    // PIN für Backend-Calls speichern (alle 3 Rollen-PINs sind gültig für Backend)
    localStorage.setItem(PIN_STORAGE_KEY, val);
    // Test-Call gegen Backend, ob das Backend den PIN akzeptiert (oder kein PIN gesetzt ist)
    try {
      const res = await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-shop-pin': val },
        body: JSON.stringify({ action: 'load_all' }),
      });
      if (res.status === 401) {
        setError('PIN vom Backend abgelehnt — bitte SHOP_PIN-Variable im Vercel-Setting prüfen');
        setChecking(false);
        localStorage.removeItem(PIN_STORAGE_KEY);
        setTimeout(() => setPin(''), 1500);
        return;
      }
      if (!res.ok) {
        setError('Backend-Fehler. Erneut versuchen.');
        setChecking(false);
        setTimeout(() => setPin(''), 1500);
        return;
      }
      onLogin(roleEntry[0]);
    } catch (err) {
      setError('Verbindungsfehler — Internet prüfen');
      setChecking(false);
      setTimeout(() => setPin(''), 1500);
    }
  };

  useEffect(() => {
    if (pin.length === 4 && !checking) {
      checkPin(pin);
    }
  }, [pin]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 fadeup">
      <div className="w-14 h-14 rounded-md flex items-center justify-center mb-6" style={{ background: '#e8904b', color: '#0a0908' }}>
        <Wrench size={28} strokeWidth={2.5} />
      </div>
      <div className="text-3xl mb-1">
        <span className="display-serif">Expert</span><span className="font-light" style={{ color: '#857d70' }}> Repair</span>
      </div>
      <div className="mono text-[10px] uppercase tracking-[0.25em] mb-10" style={{ color: '#857d70' }}>Werkstatt-System · Berlin</div>
      <div className="mono text-[10px] uppercase tracking-widest mb-3" style={{ color: '#e8904b' }}>
        {checking ? 'Prüfe...' : 'Mitarbeiter-PIN'}
      </div>
      <input type="tel" inputMode="numeric" pattern="[0-9]*" maxLength={4} value={pin}
        onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))} placeholder="••••" autoFocus
        disabled={checking}
        className="w-48 py-5 px-6 text-3xl text-center rounded-md tracking-[0.5em]"
        style={{ background: '#13110e', border: `1.5px solid ${error ? '#5a3328' : '#2a2620'}`, color: '#f0e9dc' }} />
      {error && <div className="mt-3 text-sm text-center max-w-xs px-4" style={{ color: '#e87a5b' }}>{error}</div>}
      <div className="mt-12 p-4 rounded-md max-w-xs text-center" style={{ background: '#13110e', border: '1px solid #1f1c17' }}>
        <div className="mono text-[10px] uppercase tracking-widest mb-2" style={{ color: '#857d70' }}>PIN-Codes</div>
        <div className="text-xs space-y-1" style={{ color: '#a89e8d' }}>
          <div><span className="mono" style={{ color: '#e8904b' }}>1111</span> Tresen-Mitarbeiter</div>
          <div><span className="mono" style={{ color: '#e8b04b' }}>2222</span> Techniker</div>
          <div><span className="mono" style={{ color: '#7dd99c' }}>3333</span> Chef/in</div>
        </div>
      </div>
    </div>
  );
}

// Loading & Error Screens
function LoadingScreen({ text }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center fadeup" style={{ background: '#0a0908', color: '#f0e9dc' }}>
      <div className="w-12 h-12 rounded-md flex items-center justify-center mb-4" style={{ background: '#e8904b', color: '#0a0908' }}>
        <Wrench size={24} strokeWidth={2.5} />
      </div>
      <div className="text-xl mb-2">{text || 'Laden...'}</div>
      <div className="flex gap-1.5 mt-3">
        {[0,1,2].map(i => (
          <div key={i} className="w-1.5 h-1.5 rounded-full pulse" style={{ background: '#e8904b', animationDelay: i * 0.2 + 's' }} />
        ))}
      </div>
    </div>
  );
}

function PublicTrackingError({ msg }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: '#0a0908', color: '#f0e9dc' }}>
      <div className="w-12 h-12 rounded-md flex items-center justify-center mb-4" style={{ background: '#3a1f1a' }}>
        <AlertTriangle size={22} style={{ color: '#e87a5b' }} />
      </div>
      <div className="text-2xl mb-2 text-center">Auftrag nicht gefunden</div>
      <div className="text-sm text-center max-w-sm" style={{ color: '#857d70' }}>
        Bitte prüfen Sie Ihre Auftragsnummer oder kontaktieren Sie uns telefonisch.
      </div>
      <div className="mt-8 mono text-[10px] uppercase tracking-widest" style={{ color: '#5c554a' }}>
        Expert Repair · Berlin
      </div>
    </div>
  );
}

// Live-Tracking-Komponente (für Kunden, ohne Login)
function PublicTrackingLive({ data }) {
  const lang = data.language || 'de';
  const isRTL = LANGUAGES[lang].dir === 'rtl';
  const i18n = {
    de: { greeting: 'Hallo', tracking: 'Reparatur-Status', order: 'Auftragsnummer', device: 'Gerät', updated: 'Letzte Aktualisierung', shop: 'Bei Fragen kontaktieren Sie uns' },
    tr: { greeting: 'Merhaba', tracking: 'Tamir Durumu', order: 'İş Numarası', device: 'Cihaz', updated: 'Son güncelleme', shop: 'Sorularınız için bizimle iletişime geçin' },
    en: { greeting: 'Hello', tracking: 'Repair Status', order: 'Order Number', device: 'Device', updated: 'Last update', shop: 'Contact us for questions' },
    ar: { greeting: 'مرحباً', tracking: 'حالة الإصلاح', order: 'رقم الطلب', device: 'الجهاز', updated: 'آخر تحديث', shop: 'تواصل معنا لأي استفسار' },
    ru: { greeting: 'Здравствуйте', tracking: 'Статус ремонта', order: 'Номер заказа', device: 'Устройство', updated: 'Последнее обновление', shop: 'Свяжитесь с нами при вопросах' },
  };
  const t = i18n[lang] || i18n.de;
  const statusOrder = ['eingegangen', 'in_arbeit', 'fertig', 'abgeholt'];
  const currentIdx = data.status === 'wartet_auf_teile' ? statusOrder.indexOf('in_arbeit') : statusOrder.indexOf(data.status);

  return (
    <div className={`min-h-screen w-full ${isRTL ? 'arabic' : ''}`} style={{ background: '#0a0908', color: '#f0e9dc', fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "'Bricolage Grotesque', sans-serif", direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="max-w-md mx-auto px-6 py-12 fadeup">
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-md flex items-center justify-center mx-auto mb-4" style={{ background: '#e8904b', color: '#0a0908' }}>
            <Wrench size={22} strokeWidth={2.5} />
          </div>
          <div className="text-2xl mb-1">
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>Expert</span>
            <span style={{ color: '#857d70', fontWeight: 300 }}> Repair</span>
          </div>
          <div className="text-[10px] uppercase tracking-[0.25em] mt-2" style={{ color: '#857d70', fontFamily: "'JetBrains Mono', monospace" }}>{SHOP_LOCATION}</div>
        </div>

        <div className="text-lg mb-2" style={{ color: '#a89e8d' }}>{t.greeting} {data.customer_first_name},</div>
        <div className="text-3xl mb-8" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>{t.tracking}</div>

        <div className="p-5 rounded-md mb-6" style={{ background: '#13110e', border: '1px solid #1f1c17' }}>
          <div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: '#857d70', fontFamily: "'JetBrains Mono', monospace" }}>{t.device}</div>
          <div className="text-xl mb-3">{data.device}</div>
          <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: '#857d70', fontFamily: "'JetBrains Mono', monospace" }}>{t.order}</div>
          <div className="text-sm" style={{ fontFamily: "'JetBrains Mono', monospace", color: '#e8904b' }}>#J{data.id}</div>
        </div>

        <div className="p-5 rounded-md mb-6" style={{ background: '#13110e', border: '1px solid #1f1c17' }}>
          <div className="text-[10px] uppercase tracking-widest mb-5" style={{ color: '#857d70', fontFamily: "'JetBrains Mono', monospace" }}>{t.tracking}</div>
          <div className="space-y-5">
            {statusOrder.map((sk, i) => {
              const sst = STATUSES[sk];
              const StIcon = sst.icon;
              const reached = i <= currentIdx;
              const current = i === currentIdx && data.status !== 'abgeholt';
              return (
                <div key={sk} className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: reached ? sst.bg : '#1f1c17', border: `2px solid ${reached ? sst.color : '#2a2620'}` }}>
                      <StIcon size={15} style={{ color: reached ? sst.color : '#5c554a' }} />
                    </div>
                    {current && (
                      <div className="absolute -inset-1 rounded-full pulse" style={{ border: `2px solid ${sst.color}`, opacity: 0.4 }}></div>
                    )}
                  </div>
                  <div>
                    <div className="text-base" style={{ color: reached ? '#f0e9dc' : '#5c554a' }}>{sst.i18n[lang] || sst.label}</div>
                    {current && (
                      <div className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: sst.color, fontFamily: "'JetBrains Mono', monospace" }}>● Aktuell</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center text-xs mb-8" style={{ color: '#857d70' }}>
          {t.updated}: <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{formatDate(new Date(data.updated_at).getTime())}</span>
        </div>

        <div className="text-center text-xs pt-6" style={{ color: '#5c554a', borderTop: '1px solid #1f1c17' }}>
          {t.shop}<br />
          <span style={{ color: '#a89e8d' }}>{SHOP_NAME} · {SHOP_LOCATION}</span>
        </div>
      </div>
      <style>{`
        @keyframes fadeup { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .fadeup { animation: fadeup 0.5s ease-out forwards; }
        .pulse { animation: pulse 2s ease-in-out infinite; }
        .arabic { font-family: 'Noto Sans Arabic', sans-serif; }
      `}</style>
    </div>
  );
}

function Header({ role, onLogout, onHome, loading, onReload }) {
  const r = ROLES[role];
  const RoleIcon = r.icon;
  return (
    <header style={{ borderBottom: '1px solid #1f1c17' }}>
      <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
        <button onClick={onHome} className="flex items-center gap-3">
          <div className="w-9 h-9 rounded flex items-center justify-center" style={{ background: '#e8904b', color: '#0a0908' }}>
            <Wrench size={18} strokeWidth={2.5} />
          </div>
          <div className="text-left">
            <div className="text-base font-semibold leading-none">Expert Repair</div>
            <div className="mono text-[9px] uppercase tracking-widest mt-1 flex items-center gap-1.5" style={{ color: '#857d70' }}>
              {loading ? (
                <><Cloud size={10} className="pulse" style={{ color: '#e8904b' }} /> sync...</>
              ) : (
                <><Cloud size={10} style={{ color: '#7dd99c' }} /> Werkstatt</>
              )}
            </div>
          </div>
        </button>
        <div className="flex items-center gap-2">
          {onReload && (
            <button onClick={onReload} disabled={loading} className="p-2 rounded" style={{ color: '#857d70' }} title="Neu laden">
              <RefreshCw size={14} className={loading ? 'pulse' : ''} />
            </button>
          )}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded" style={{ background: '#1f1c17', border: '1px solid #2a2620' }}>
            <RoleIcon size={13} style={{ color: r.color }} />
            <span className="mono text-[10px] uppercase tracking-widest" style={{ color: r.color }}>{r.label}</span>
          </div>
          <button onClick={onLogout} className="p-2 rounded" style={{ color: '#857d70' }}><LogOut size={16} /></button>
        </div>
      </div>
    </header>
  );
}

function Home({ role, jobs, customers, rejected = [], onNew, onList, onJob }) {
  const [quickSearch, setQuickSearch] = useState('');
  const stats = {
    eingegangen: jobs.filter(j => j.status === 'eingegangen').length,
    in_arbeit: jobs.filter(j => j.status === 'in_arbeit').length,
    fertig: jobs.filter(j => j.status === 'fertig').length,
    teile: jobs.filter(j => j.status === 'wartet_auf_teile').length,
  };
  const recent = jobs.slice(0, 5);
  const todayUmsatz = jobs.filter(j => j.status === 'abgeholt' && Date.now() - j.updated_at < 86400000).reduce((s, j) => s + j.price_max, 0);
  const monthUmsatz = jobs.filter(j => j.status === 'abgeholt' && Date.now() - j.updated_at < 86400000 * 30).reduce((s, j) => s + j.price_max, 0);
  const aktiveGarantien = jobs.filter(isWarrantyActive).length;

  // Quick-Search: Auftrag finden per Nummer, Kundenname oder Telefon
  const quickResults = quickSearch.length >= 2 ? (() => {
    const q = quickSearch.toLowerCase().replace('#', '');
    return jobs.filter(j => {
      const c = customers.find(c => c.id === j.customer_id);
      return j.id.toLowerCase().includes(q) ||
        j.device.toLowerCase().includes(q) ||
        (c && (c.name.toLowerCase().includes(q) || c.phone.includes(q)));
    }).slice(0, 6);
  })() : [];

  return (
    <div className="fadeup">
      <div className="mono text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: '#e8904b' }}>{role === 'chef' ? 'Übersicht' : 'Heute'}</div>
      <h1 className="text-4xl sm:text-5xl mb-6 leading-none">
        <span className="display-serif">Werkstatt</span><span className="font-light" style={{ color: '#857d70' }}>.</span>
      </h1>

      {/* Quick-Search */}
      <div className="relative mb-8">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#5c554a' }} />
        <input
          type="text"
          value={quickSearch}
          onChange={(e) => setQuickSearch(e.target.value)}
          placeholder="Auftrag suchen: #J7K3M, Mehmet, +49157…"
          className="w-full pl-11 pr-4 py-3.5 rounded-md text-sm"
          style={{ background: '#13110e', border: '1px solid #2a2620', color: '#f0e9dc' }}
        />
        {quickResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 rounded-md overflow-hidden z-20 fadeup" style={{ background: '#1a1815', border: '1px solid #2a2620' }}>
            <div className="mono text-[9px] uppercase tracking-widest px-3 py-2" style={{ color: '#857d70', borderBottom: '1px solid #2a2620' }}>
              {quickResults.length} {quickResults.length === 1 ? 'Treffer' : 'Treffer'}
            </div>
            {quickResults.map(j => {
              const c = customers.find(c => c.id === j.customer_id);
              const s = STATUSES[j.status];
              const Icon = s.icon;
              return (
                <button key={j.id} onClick={() => { setQuickSearch(''); onJob(j.id); }} className="w-full px-3 py-3 text-left flex items-center gap-3" style={{ borderBottom: '1px solid #2a2620' }}>
                  <Icon size={14} style={{ color: s.color, flexShrink: 0 }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm flex items-center gap-2">
                      <span className="mono" style={{ color: '#e8904b' }}>#{String(j.id).toUpperCase()}</span>
                      <span className="truncate">{j.device}</span>
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: '#857d70' }}>{c?.name} · {s.label}</div>
                  </div>
                  <ChevronRight size={14} style={{ color: '#5c554a' }} />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {role !== 'chef' && (
        <div className="grid grid-cols-2 gap-3 mb-8">
          {role === 'tresen' && (
            <button onClick={onNew} className="p-5 rounded-md text-left flex flex-col gap-2" style={{ background: '#e8904b', color: '#0a0908' }}>
              <Plus size={22} />
              <div className="font-medium text-base">Neuer Auftrag</div>
              <div className="text-xs opacity-80">Foto · Diagnose · Kunde</div>
            </button>
          )}
          <button onClick={onList} className={`p-5 rounded-md text-left flex flex-col gap-2 ${role === 'techniker' ? 'col-span-2' : ''}`} style={{ background: '#13110e', border: '1px solid #2a2620' }}>
            <ClipboardList size={22} style={{ color: '#e8904b' }} />
            <div className="font-medium text-base">Aufträge</div>
            <div className="text-xs" style={{ color: '#857d70' }}>{jobs.length} insgesamt</div>
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {Object.entries(stats).map(([key, count]) => {
          const k = key === 'teile' ? 'wartet_auf_teile' : key;
          const s = STATUSES[k];
          const Icon = s.icon;
          return (
            <div key={key} className="p-4 rounded-md" style={{ background: '#13110e', border: '1px solid #1f1c17' }}>
              <Icon size={16} style={{ color: s.color, marginBottom: 8 }} />
              <div className="text-2xl font-medium" style={{ color: '#f0e9dc' }}>{count}</div>
              <div className="mono text-[9px] uppercase tracking-widest mt-1" style={{ color: '#857d70' }}>{s.label}</div>
            </div>
          );
        })}
      </div>

      {role === 'chef' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="p-5 rounded-md" style={{ background: '#1a1410', border: '1px solid #3a2a1a' }}>
            <div className="mono text-[10px] uppercase tracking-widest mb-2" style={{ color: '#e8904b' }}>Umsatz heute</div>
            <div className="text-3xl display-serif">{todayUmsatz}<span style={{ color: '#857d70' }}>€</span></div>
          </div>
          <div className="p-5 rounded-md" style={{ background: '#13110e', border: '1px solid #1f1c17' }}>
            <div className="mono text-[10px] uppercase tracking-widest mb-2" style={{ color: '#857d70' }}>Umsatz 30 Tage</div>
            <div className="text-3xl display-serif">{monthUmsatz}<span style={{ color: '#857d70' }}>€</span></div>
          </div>
          <div className="p-5 rounded-md" style={{ background: '#13110e', border: '1px solid #1f1c17' }}>
            <div className="mono text-[10px] uppercase tracking-widest mb-2 flex items-center gap-1" style={{ color: '#7dd99c' }}>
              <Shield size={11} /> Aktive Garantien
            </div>
            <div className="text-3xl display-serif">{aktiveGarantien}</div>
          </div>
          <div className="p-5 rounded-md" style={{ background: '#13110e', border: '1px solid #1f1c17' }}>
            <div className="mono text-[10px] uppercase tracking-widest mb-2" style={{ color: '#857d70' }}>Conversion-Rate</div>
            <div className="text-3xl display-serif">
              {(() => {
                const total = jobs.length + rejected.length;
                if (total === 0) return '–';
                return Math.round((jobs.length / total) * 100) + '%';
              })()}
            </div>
            <div className="mono text-[9px] uppercase tracking-widest mt-1" style={{ color: '#5c554a' }}>
              {jobs.length} angenommen · {rejected.length} abgelehnt
            </div>
          </div>
        </div>
      )}

      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="mono text-[10px] uppercase tracking-widest" style={{ color: '#857d70' }}>Aktuelle Aufträge</div>
          <button onClick={onList} className="mono text-[10px] uppercase tracking-widest flex items-center gap-1" style={{ color: '#e8904b' }}>
            Alle <ChevronRight size={12} />
          </button>
        </div>
        <div className="space-y-2">
          {recent.map(j => <JobRow key={j.id} job={j} customer={customers.find(c => c.id === j.customer_id)} onClick={() => onJob(j.id)} />)}
        </div>
      </div>
    </div>
  );
}

function JobRow({ job, customer, onClick }) {
  const s = STATUSES[job.status];
  const Icon = s.icon;
  const warrantyActive = isWarrantyActive(job);
  return (
    <button onClick={onClick} className="w-full p-4 rounded-md flex items-center gap-3 text-left" style={{ background: '#13110e', border: '1px solid #1f1c17' }}>
      <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
        <Icon size={16} style={{ color: s.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-medium truncate" style={{ color: '#f0e9dc' }}>{job.device}</span>
          <span className="mono text-[9px] uppercase tracking-widest flex-shrink-0" style={{ color: s.color }}>· {s.label}</span>
          {warrantyActive && <span title="Garantie aktiv" style={{ color: '#7dd99c' }}><Shield size={11} /></span>}
          {customer?.language && customer.language !== 'de' && (
            <span className="mono text-[9px] uppercase" style={{ color: '#857d70' }}>{LANGUAGES[customer.language].flag}</span>
          )}
        </div>
        <div className="text-xs flex items-center gap-2" style={{ color: '#857d70' }}>
          <span className="truncate">{customer?.name || 'Kunde'}</span>
          <span>·</span>
          <span className="mono">#{String(job.id).toUpperCase()}</span>
          <span>·</span>
          <span>{formatRelative(job.updated_at)}</span>
        </div>
      </div>
      <ChevronRight size={16} style={{ color: '#5c554a' }} />
    </button>
  );
}

function DiagnoseFlow({ onBack, onComplete }) {
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [imageMediaType, setImageMediaType] = useState(null);
  const [device, setDevice] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stage, setStage] = useState(0);
  const fileInputRef = useRef(null);
  const stages = ['Bild wird analysiert', 'Gerätemodell wird erkannt', 'Schaden wird klassifiziert', 'Reparatur wird kalkuliert'];

  useEffect(() => {
    if (!loading) return;
    let i = 0;
    const t = setInterval(() => { i = (i + 1) % 4; setStage(i); }, 1200);
    return () => clearInterval(t);
  }, [loading]);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
      setImageBase64(e.target.result.split(',')[1]);
      setImageMediaType(file.type);
    };
    reader.readAsDataURL(file);
  };

  const analyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.diagnose(imageBase64, imageMediaType, device, description);
      const text = data.content.filter(c => c.type === 'text').map(c => c.text).join('\n');
      const cleaned = text.replace(/```json\s*/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      onComplete(parsed, image, imageMediaType, imageBase64);
    } catch (err) {
      setError('Diagnose fehlgeschlagen: ' + err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16 flex flex-col items-center fadeup">
        <div className="relative w-32 h-32 mb-7 rounded-md overflow-hidden scanline" style={{ background: '#13110e', border: '1px solid #2a2620' }}>
          <img src={image} alt="" className="w-full h-full object-cover opacity-60" />
        </div>
        <div className="mono text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: '#e8904b' }}>Diagnose läuft</div>
        <div className="text-xl display-serif mb-5">{stages[stage]}…</div>
        <div className="flex gap-2">
          {[0,1,2,3].map(i => (
            <div key={i} className="w-2 h-2 rounded-full" style={{
              background: i === stage ? '#e8904b' : '#2a2620',
              transform: i === stage ? 'scale(1.4)' : 'scale(1)', transition: 'all 0.3s' }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fadeup">
      <button onClick={onBack} className="mono text-[10px] uppercase tracking-widest mb-4 flex items-center gap-1" style={{ color: '#857d70' }}>
        <ArrowLeft size={12} /> Zurück
      </button>
      <div className="mono text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: '#e8904b' }}>Schritt 01 — Schaden erfassen</div>
      <h1 className="text-4xl sm:text-5xl mb-6 leading-none">
        <span className="display-serif">Diagnose</span><span className="font-light" style={{ color: '#857d70' }}>.</span>
      </h1>

      {error && (
        <div className="mb-5 p-4 rounded-md flex items-start gap-3" style={{ background: '#2a1a17', border: '1px solid #5a3328' }}>
          <AlertTriangle size={18} style={{ color: '#e87a5b', flexShrink: 0, marginTop: 2 }} />
          <div className="text-sm" style={{ color: '#e8b8a8' }}>{error}</div>
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" capture="environment" onChange={(e) => handleFile(e.target.files?.[0])} className="hidden" />

      <div onClick={() => !image && fileInputRef.current?.click()} className="rounded-md overflow-hidden cursor-pointer" style={{ border: '1.5px dashed #2a2620', background: '#13110e', minHeight: image ? 'auto' : '280px' }}>
        {image ? (
          <div className="relative">
            <img src={image} alt="" className="w-full max-h-[400px] object-contain" />
            <button onClick={(e) => { e.stopPropagation(); setImage(null); setImageBase64(null); }} className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(10,9,8,0.8)', border: '1px solid #2a2620' }}>
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-12 px-6">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: '#1f1c17', border: '1px solid #2a2620' }}>
              <Camera size={22} style={{ color: '#e8904b' }} />
            </div>
            <div className="text-lg mb-1">Foto vom Schaden machen</div>
            <div className="text-sm" style={{ color: '#857d70' }}>Tippen zum Auswählen oder Foto machen</div>
          </div>
        )}
      </div>

      {image && (
        <div className="mt-6 space-y-4 fadeup">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="mono text-[10px] uppercase tracking-widest block mb-2" style={{ color: '#857d70' }}>Gerätemodell</label>
              <input type="text" value={device} onChange={(e) => setDevice(e.target.value)} placeholder="z.B. iPhone 13 Pro" className="w-full px-4 py-3 rounded-md" style={{ background: '#13110e', border: '1px solid #2a2620', color: '#f0e9dc' }} />
            </div>
            <div>
              <label className="mono text-[10px] uppercase tracking-widest block mb-2" style={{ color: '#857d70' }}>Was ist passiert?</label>
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="z.B. heruntergefallen" className="w-full px-4 py-3 rounded-md" style={{ background: '#13110e', border: '1px solid #2a2620', color: '#f0e9dc' }} />
            </div>
          </div>
          <button onClick={analyze} className="w-full py-4 rounded-md font-medium flex items-center justify-center gap-2" style={{ background: '#e8904b', color: '#0a0908' }}>
            Schaden analysieren <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

function NewJobForm({ diagnosis, customers, jobs, onCancel, onCreate, onReject }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [language, setLanguage] = useState('de');
  const [matchedCustomer, setMatchedCustomer] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const d = diagnosis.diagnosis;

  // Editierbare Felder mit KI-Vorbelegung
  const [device, setDevice] = useState(d.geraet_erkannt || '');
  const [repair, setRepair] = useState(d.reparatur_empfehlung || '');
  const [priceMin, setPriceMin] = useState(d.preis_min || 0);
  const [priceMax, setPriceMax] = useState(d.preis_max || 0);
  const [duration, setDuration] = useState(d.dauer || '');
  const [deposit, setDeposit] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(name.toLowerCase()) || c.phone.includes(name)
  ).slice(0, 5);

  const activeWarranties = matchedCustomer ? getActiveWarranties(matchedCustomer.id, jobs) : [];

  const buildCustomer = () => {
    if (matchedCustomer) return matchedCustomer;
    return { id: 'c' + Date.now(), name, phone, notes, language, isNew: true, created_at: Date.now() };
  };

  const create = () => {
    if (!name || !phone) return;
    const customer = buildCustomer();
    const now = Date.now();
    const job = {
      id: 'j' + Date.now(), customer_id: customer.id,
      device, damage: d.schadensbild, repair,
      price_min: Number(priceMin), price_max: Number(priceMax), duration,
      deposit: Number(deposit) || 0,
      status: 'eingegangen', technician_notes: '',
      image: diagnosis.image, image_after: null, diagnosis_data: d,
      warranty_until: now + SIX_MONTHS,
      created_at: now, updated_at: now,
      history: [{ status: 'eingegangen', at: now, note: deposit > 0 ? `Auftrag angelegt · Anzahlung ${deposit}€ erhalten` : 'Auftrag angelegt' }]
    };
    onCreate(customer, job);
  };

  const reject = () => {
    if (!name || !phone) return;
    const customer = buildCustomer();
    onReject(customer, {
      device, repair, price_min: Number(priceMin), price_max: Number(priceMax),
      damage: d.schadensbild, image: diagnosis.image,
    });
  };

  const selectCustomer = (c) => {
    setMatchedCustomer(c); setName(c.name); setPhone(c.phone);
    setNotes(c.notes || ''); setLanguage(c.language || 'de'); setSearchOpen(false);
  };

  return (
    <div className="fadeup">
      <button onClick={onCancel} className="mono text-[10px] uppercase tracking-widest mb-4 flex items-center gap-1" style={{ color: '#857d70' }}>
        <ArrowLeft size={12} /> Zurück
      </button>
      <div className="mono text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: '#e8904b' }}>Schritt 02 — Kundendaten</div>
      <h1 className="text-3xl mb-6">
        <span className="display-serif">Auftrag</span><span className="font-light" style={{ color: '#857d70' }}> anlegen.</span>
      </h1>

      <div className="p-4 rounded-md mb-4" style={{ background: '#13110e', border: '1px solid #1f1c17' }}>
        <div className="flex justify-between items-start mb-3">
          <div className="mono text-[10px] uppercase tracking-widest flex items-center gap-2" style={{ color: '#857d70' }}>
            <FileText size={11} /> KI-Diagnose
            {d.wirtschaftlich_sinnvoll === false && (
              <span className="px-2 py-0.5 rounded text-[9px]" style={{ background: '#3a1f1a', color: '#e87a5b' }}>
                ⚠ Reparatur evtl. nicht wirtschaftlich
              </span>
            )}
          </div>
          {!editMode && (
            <button onClick={() => setEditMode(true)} className="mono text-[10px] uppercase tracking-widest" style={{ color: '#e8904b' }}>
              Bearbeiten
            </button>
          )}
        </div>

        <div className="flex gap-3 mb-3">
          {diagnosis.image && <img src={diagnosis.image} alt="" className="w-16 h-16 rounded object-cover flex-shrink-0" />}
          <div className="flex-1 min-w-0">
            {editMode ? (
              <div className="space-y-3">
                <div>
                  <label className="mono text-[9px] uppercase tracking-widest block mb-1" style={{ color: '#857d70' }}>Gerät</label>
                  <input type="text" value={device} onChange={(e) => setDevice(e.target.value)} className="w-full px-3 py-2 rounded text-sm" style={{ background: '#1f1c17', border: '1px solid #2a2620', color: '#f0e9dc' }} />
                </div>
                <div>
                  <label className="mono text-[9px] uppercase tracking-widest block mb-1" style={{ color: '#857d70' }}>Reparatur</label>
                  <textarea value={repair} onChange={(e) => setRepair(e.target.value)} rows={2} className="w-full px-3 py-2 rounded text-sm resize-none" style={{ background: '#1f1c17', border: '1px solid #2a2620', color: '#f0e9dc' }} />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="mono text-[9px] uppercase tracking-widest block mb-1" style={{ color: '#857d70' }}>Min €</label>
                    <input type="number" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} className="w-full px-3 py-2 rounded text-sm mono" style={{ background: '#1f1c17', border: '1px solid #2a2620', color: '#f0e9dc' }} />
                  </div>
                  <div>
                    <label className="mono text-[9px] uppercase tracking-widest block mb-1" style={{ color: '#857d70' }}>Max €</label>
                    <input type="number" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} className="w-full px-3 py-2 rounded text-sm mono" style={{ background: '#1f1c17', border: '1px solid #2a2620', color: '#f0e9dc' }} />
                  </div>
                  <div>
                    <label className="mono text-[9px] uppercase tracking-widest block mb-1" style={{ color: '#857d70' }}>Dauer</label>
                    <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full px-3 py-2 rounded text-sm" style={{ background: '#1f1c17', border: '1px solid #2a2620', color: '#f0e9dc' }} />
                  </div>
                </div>
                <button onClick={() => setEditMode(false)} className="mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded" style={{ background: '#1a3a2a', color: '#7dd99c', border: '1px solid #2a4a3a' }}>
                  ✓ Übernehmen
                </button>
              </div>
            ) : (
              <>
                <div className="font-medium mb-0.5">{device}</div>
                <div className="text-xs mb-2" style={{ color: '#a89e8d' }}>{repair}</div>
                <div className="flex gap-3 text-xs">
                  <span style={{ color: '#e8904b' }}>{priceMin === priceMax ? `${priceMin}€` : `${priceMin}–${priceMax}€`}</span>
                  <span style={{ color: '#857d70' }}>{duration}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {d.wirtschaftlich_sinnvoll === false && d.wirtschaftlich_hinweis && (
          <div className="text-xs p-2 rounded" style={{ background: '#3a1f1a', color: '#e8b8a8' }}>
            💡 {d.wirtschaftlich_hinweis}
          </div>
        )}
      </div>

      {/* WARNUNG: Funktionstest eingeschränkt — KRITISCH für Streitvermeidung */}
      {d.funktionstest_eingeschraenkt && (
        <div className="p-4 rounded-md mb-4 fadeup" style={{ background: '#3a2f1a', border: '2px solid #d97706' }}>
          <div className="flex items-start gap-3 mb-3">
            <AlertTriangle size={20} style={{ color: '#fbbf24', flexShrink: 0, marginTop: 2 }} />
            <div className="flex-1">
              <div className="font-medium mb-1" style={{ color: '#fbbf24' }}>
                ⚠ Funktionstest eingeschränkt — bitte mit Kunde besprechen!
              </div>
              <div className="text-xs leading-relaxed" style={{ color: '#fde68a' }}>
                Wegen des Schadens sind folgende Komponenten <b>nicht prüfbar</b> bei Annahme. Der Kunde muss zur Kenntnis nehmen, dass deren Zustand erst nach Reparatur festgestellt werden kann:
              </div>
            </div>
          </div>
          {d.nicht_pruefbar && d.nicht_pruefbar.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {d.nicht_pruefbar.map((item, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded" style={{ background: '#451a03', color: '#fed7aa', border: '1px solid #92400e' }}>
                  ○ {item}
                </span>
              ))}
            </div>
          )}
          <div className="text-xs p-2.5 rounded" style={{ background: '#1c1208', color: '#fde68a', border: '1px solid #92400e' }}>
            💬 <b>Was du dem Kunden sagen sollst:</b><br />
            „Wir können wegen dem Schaden gerade nicht testen, ob z.B. Mikrofon und Lautsprecher noch funktionieren. Erst nach der Reparatur sehen wir, ob da auch was kaputt ist. Falls ja, wäre das eine separate Reparatur. Sie unterschreiben das auf dem Annahmeschein, ja?"
          </div>
        </div>
      )}

      {/* Ablehnen-Button: Kunde will Reparatur nicht */}
      <button
        onClick={reject}
        disabled={!name || !phone}
        className="w-full py-2.5 rounded-md text-xs flex items-center justify-center gap-2 disabled:opacity-30 mb-6"
        style={{ background: '#1f1c17', color: '#857d70', border: '1px solid #2a2620' }}
      >
        <X size={12} /> Kunde lehnt Reparatur ab — als „Nur Diagnose" speichern
      </button>

      <div className="space-y-4">
        <div>
          <label className="mono text-[10px] uppercase tracking-widest block mb-2" style={{ color: '#857d70' }}>Name</label>
          <div className="relative">
            <input type="text" value={name}
              onChange={(e) => { setName(e.target.value); setMatchedCustomer(null); setSearchOpen(true); }}
              onFocus={() => setSearchOpen(true)} placeholder="z.B. Mehmet Demir"
              className="w-full px-4 py-3 rounded-md" style={{ background: '#13110e', border: '1px solid #2a2620', color: '#f0e9dc' }} />
            {searchOpen && name.length > 1 && filteredCustomers.length > 0 && !matchedCustomer && (
              <div className="absolute top-full left-0 right-0 mt-1 rounded-md overflow-hidden z-10" style={{ background: '#1a1815', border: '1px solid #2a2620' }}>
                <div className="mono text-[9px] uppercase tracking-widest px-3 py-2" style={{ color: '#857d70', borderBottom: '1px solid #2a2620' }}>Stammkunden</div>
                {filteredCustomers.map(c => (
                  <button key={c.id} onClick={() => selectCustomer(c)} className="w-full px-3 py-3 text-left flex justify-between items-center" style={{ borderBottom: '1px solid #2a2620' }}>
                    <div>
                      <div className="text-sm flex items-center gap-2">{c.name}{c.language && c.language !== 'de' && <span className="text-xs">{LANGUAGES[c.language].flag}</span>}</div>
                      <div className="text-xs mono" style={{ color: '#857d70' }}>{c.phone}</div>
                    </div>
                    <ChevronRight size={14} style={{ color: '#5c554a' }} />
                  </button>
                ))}
              </div>
            )}
          </div>
          {matchedCustomer && (
            <div className="mt-2 mono text-[10px] uppercase tracking-widest flex items-center gap-1" style={{ color: '#7dd99c' }}>
              <Check size={12} /> Stammkunde erkannt
            </div>
          )}
        </div>

        {activeWarranties.length > 0 && (
          <div className="p-4 rounded-md flex gap-3 fadeup" style={{ background: '#1a3a2a', border: '1px solid #2a4a3a' }}>
            <Shield size={18} style={{ color: '#7dd99c', flexShrink: 0, marginTop: 2 }} />
            <div className="flex-1 text-sm">
              <div className="font-medium mb-2" style={{ color: '#7dd99c' }}>
                {activeWarranties.length === 1 ? 'Aktive Garantie' : `${activeWarranties.length} aktive Garantien`} bei diesem Kunden!
              </div>
              {activeWarranties.map(w => (
                <div key={w.id} className="text-xs mb-1" style={{ color: '#a8d9b8' }}>
                  • {w.device} · {w.repair} · gültig bis <span className="mono">{formatDateOnly(w.warranty_until)}</span>
                </div>
              ))}
              <div className="text-xs mt-2 italic" style={{ color: '#7dd99c' }}>
                Falls aktuelle Reparatur unter die Garantie fällt — kostenlos abwickeln.
              </div>
            </div>
          </div>
        )}

        <div>
          <label className="mono text-[10px] uppercase tracking-widest block mb-2" style={{ color: '#857d70' }}>Handynummer</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+49 157 12345678" className="w-full px-4 py-3 rounded-md mono" style={{ background: '#13110e', border: '1px solid #2a2620', color: '#f0e9dc' }} />
        </div>

        <div>
          <label className="mono text-[10px] uppercase tracking-widest block mb-2" style={{ color: '#857d70' }}>Sprache (für WhatsApp-Nachrichten)</label>
          <div className="grid grid-cols-5 gap-2">
            {Object.entries(LANGUAGES).map(([code, l]) => (
              <button key={code} onClick={() => setLanguage(code)} className="p-3 rounded-md text-center" style={{
                background: language === code ? '#e8904b' : '#13110e',
                color: language === code ? '#0a0908' : '#a89e8d',
                border: `1px solid ${language === code ? '#e8904b' : '#2a2620'}`,
              }}>
                <div className="text-lg mb-1">{l.flag}</div>
                <div className="mono text-[9px] uppercase tracking-widest">{l.short}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mono text-[10px] uppercase tracking-widest block mb-2" style={{ color: '#857d70' }}>Notiz (optional)</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="z.B. Express gewünscht..." rows={2} className="w-full px-4 py-3 rounded-md resize-none" style={{ background: '#13110e', border: '1px solid #2a2620', color: '#f0e9dc' }} />
        </div>

        <div>
          <label className="mono text-[10px] uppercase tracking-widest block mb-2 flex items-center gap-2" style={{ color: '#857d70' }}>
            Anzahlung (optional)
            {priceMax >= 200 && (
              <span className="px-2 py-0.5 rounded text-[9px]" style={{ background: '#3a2f1a', color: '#e8b04b' }}>
                Bei Reparaturen ≥200€ empfohlen
              </span>
            )}
          </label>
          <div className="relative">
            <input
              type="number"
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-3 rounded-md mono pr-10"
              style={{ background: '#13110e', border: '1px solid #2a2620', color: '#f0e9dc' }}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: '#857d70' }}>€</span>
          </div>
          {deposit > 0 && (
            <div className="mt-2 text-xs" style={{ color: '#7dd99c' }}>
              ✓ Anzahlung wird auf Annahmeschein und WhatsApp-Nachricht vermerkt. Restbetrag bei Abholung: {Math.max(0, priceMax - deposit)}€
            </div>
          )}
        </div>

        <div className="p-3 rounded-md flex items-center gap-3" style={{ background: '#1a1410', border: '1px solid #2a2017' }}>
          <Shield size={16} style={{ color: '#7dd99c' }} />
          <div className="text-xs" style={{ color: '#a89e8d' }}>
            Diese Reparatur erhält automatisch <span style={{ color: '#7dd99c' }}>{WARRANTY_MONTHS} Monate Garantie</span>.
          </div>
        </div>

        <button onClick={create} disabled={!name || !phone} className="w-full py-4 rounded-md font-medium flex items-center justify-center gap-2 disabled:opacity-40" style={{ background: '#e8904b', color: '#0a0908' }}>
          Auftrag anlegen <Check size={18} />
        </button>
      </div>
    </div>
  );
}

function JobList({ jobs, customers, onJob, onBack }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  let filtered = jobs;
  if (filter === 'garantie') filtered = filtered.filter(isWarrantyActive);
  else if (filter !== 'all') filtered = filtered.filter(j => j.status === filter);

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(j => {
      const c = customers.find(c => c.id === j.customer_id);
      return j.device.toLowerCase().includes(q) || j.id.toLowerCase().includes(q) ||
        (c && (c.name.toLowerCase().includes(q) || c.phone.includes(q)));
    });
  }

  const filters = [
    { key: 'all', label: 'Alle' },
    { key: 'eingegangen', label: 'Eingegangen' },
    { key: 'in_arbeit', label: 'In Arbeit' },
    { key: 'wartet_auf_teile', label: 'Wartet' },
    { key: 'fertig', label: 'Fertig' },
    { key: 'abgeholt', label: 'Abgeholt' },
    { key: 'garantie', label: '🛡 Garantie' },
  ];

  return (
    <div className="fadeup">
      <button onClick={onBack} className="mono text-[10px] uppercase tracking-widest mb-4 flex items-center gap-1" style={{ color: '#857d70' }}>
        <ArrowLeft size={12} /> Home
      </button>
      <div className="mono text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: '#e8904b' }}>Aufträge</div>
      <h1 className="text-3xl mb-6">
        <span className="display-serif">Alle</span><span className="font-light" style={{ color: '#857d70' }}> Aufträge.</span>
      </h1>

      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#5c554a' }} />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Suche nach Gerät, Kunde, Auftragsnummer…" className="w-full pl-9 pr-4 py-3 rounded-md text-sm" style={{ background: '#13110e', border: '1px solid #2a2620', color: '#f0e9dc' }} />
      </div>

      <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
        {filters.map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)} className="mono text-[10px] uppercase tracking-widest px-3 py-2 rounded whitespace-nowrap" style={{
            background: filter === f.key ? '#e8904b' : '#1f1c17',
            color: filter === f.key ? '#0a0908' : '#a89e8d',
            border: filter === f.key ? 'none' : '1px solid #2a2620',
          }}>{f.label}</button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-12" style={{ color: '#5c554a' }}><div className="text-sm">Keine Aufträge</div></div>
        )}
        {filtered.map(j => <JobRow key={j.id} job={j} customer={customers.find(c => c.id === j.customer_id)} onClick={() => onJob(j.id)} />)}
      </div>
    </div>
  );
}

function JobDetail({ job, customer, role, onBack, onUpdateStatus, onUpdateNotes, onUpdateAfterImage, onWhatsApp, onTrackingPreview }) {
  const [editNotes, setEditNotes] = useState(false);
  const [notesDraft, setNotesDraft] = useState(job.technician_notes || '');
  const [linkCopied, setLinkCopied] = useState(false);
  const afterFileRef = useRef(null);
  const s = STATUSES[job.status];
  const StatusIcon = s.icon;

  const canEdit = role !== 'chef';
  const canChangeStatus = role === 'techniker' || role === 'chef';
  const canUploadAfter = (role === 'techniker' || role === 'chef') && (job.status === 'in_arbeit' || job.status === 'fertig' || job.status === 'abgeholt');
  const warrantyActive = isWarrantyActive(job);

  const saveNotes = () => { onUpdateNotes(notesDraft); setEditNotes(false); };

  const handleAfterImage = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const base64 = dataUrl.split(',')[1];
      onUpdateAfterImage(base64, file.type);
    };
    reader.readAsDataURL(file);
  };

  const copyTracking = () => {
    navigator.clipboard?.writeText(trackingUrl(job.id));
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 1500);
  };

  return (
    <div className="fadeup">
      <button onClick={onBack} className="mono text-[10px] uppercase tracking-widest mb-4 flex items-center gap-1" style={{ color: '#857d70' }}>
        <ArrowLeft size={12} /> Aufträge
      </button>

      <div className="flex items-start gap-4 mb-2">
        {job.image && <img src={job.image} alt="" className="w-20 h-20 rounded-md object-cover flex-shrink-0" style={{ border: '1px solid #2a2620' }} />}
        <div className="flex-1 min-w-0">
          <div className="mono text-[10px] uppercase tracking-widest" style={{ color: '#857d70' }}>Auftrag #{String(job.id).toUpperCase()}</div>
          <div className="text-2xl display-serif mt-1 mb-2">{job.device}</div>
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded" style={{ background: s.bg }}>
              <StatusIcon size={13} style={{ color: s.color }} />
              <span className="mono text-[10px] uppercase tracking-widest" style={{ color: s.color }}>{s.label}</span>
            </div>
            {warrantyActive && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded" style={{ background: '#1a3a2a' }}>
                <Shield size={13} style={{ color: '#7dd99c' }} />
                <span className="mono text-[10px] uppercase tracking-widest" style={{ color: '#7dd99c' }}>Garantie bis {formatDateOnly(job.warranty_until)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-sm mb-6 mt-3" style={{ color: '#a89e8d' }}>{job.damage}</div>

      <div className="mb-4 p-4 rounded-md" style={{ background: '#13110e', border: '1px solid #1f1c17' }}>
        <div className="mono text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: '#857d70' }}>
          <Link2 size={11} /> Tracking-Link für Kunde
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <code className="mono text-xs px-2 py-1 rounded flex-1 truncate" style={{ background: '#1f1c17', color: '#7dd99c' }}>
            {trackingUrl(job.id)}
          </code>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button onClick={copyTracking} className="py-2.5 rounded text-xs flex items-center justify-center gap-1.5" style={{ background: '#1f1c17', color: '#a89e8d', border: '1px solid #2a2620' }}>
            {linkCopied ? <><Check size={13} /> Kopiert</> : <><Copy size={13} /> Link</>}
          </button>
          <button onClick={onTrackingPreview} className="py-2.5 rounded text-xs flex items-center justify-center gap-1.5" style={{ background: '#1f1c17', color: '#a89e8d', border: '1px solid #2a2620' }}>
            <Eye size={13} /> Vorschau
          </button>
          <button onClick={() => window.print()} className="py-2.5 rounded text-xs flex items-center justify-center gap-1.5" style={{ background: '#e8904b', color: '#0a0908' }}>
            <Printer size={13} /> Annahmeschein
          </button>
        </div>
      </div>

      {canChangeStatus && job.status !== 'abgeholt' && (
        <div className="mb-4 p-4 rounded-md" style={{ background: '#13110e', border: '1px solid #1f1c17' }}>
          <div className="mono text-[10px] uppercase tracking-widest mb-3" style={{ color: '#857d70' }}>Status ändern</div>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(STATUSES).filter(([k]) => k !== job.status).map(([key, st]) => {
              const Icon = st.icon;
              return (
                <button key={key} onClick={() => onUpdateStatus(key)} className="px-3 py-3 rounded text-left flex items-center gap-2" style={{ background: '#1f1c17', border: '1px solid #2a2620' }}>
                  <Icon size={14} style={{ color: st.color }} />
                  <span className="text-sm">{st.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mb-4 p-4 rounded-md" style={{ background: '#13110e', border: '1px solid #1f1c17' }}>
        <div className="mono text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: '#857d70' }}>
          <ImageIcon size={11} /> Vorher / Nachher
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="mono text-[9px] uppercase tracking-widest mb-2" style={{ color: '#e87a5b' }}>Vorher (Annahme)</div>
            {job.image ? (
              <img src={job.image} alt="" className="w-full aspect-square object-cover rounded" style={{ border: '1px solid #2a2620' }} />
            ) : (
              <div className="w-full aspect-square rounded flex items-center justify-center" style={{ background: '#1f1c17', border: '1px dashed #2a2620' }}>
                <span className="text-xs" style={{ color: '#5c554a' }}>Kein Foto</span>
              </div>
            )}
          </div>
          <div>
            <div className="mono text-[9px] uppercase tracking-widest mb-2" style={{ color: '#7dd99c' }}>Nachher (Repariert)</div>
            {job.image_after ? (
              <div className="relative">
                <img src={job.image_after} alt="" className="w-full aspect-square object-cover rounded" style={{ border: '1px solid #2a2620' }} />
                {canUploadAfter && (
                  <button onClick={() => afterFileRef.current?.click()} className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'rgba(10,9,8,0.85)', border: '1px solid #2a2620', color: '#f0e9dc' }}>
                    <RefreshCw size={11} />
                  </button>
                )}
              </div>
            ) : canUploadAfter ? (
              <button onClick={() => afterFileRef.current?.click()} className="w-full aspect-square rounded flex flex-col items-center justify-center gap-1" style={{ background: '#1a3a2a', border: '1.5px dashed #2a4a3a', color: '#7dd99c' }}>
                <Camera size={20} />
                <span className="text-xs">Foto hinzufügen</span>
              </button>
            ) : (
              <div className="w-full aspect-square rounded flex items-center justify-center" style={{ background: '#1f1c17', border: '1px dashed #2a2620' }}>
                <span className="text-xs" style={{ color: '#5c554a' }}>Noch nicht repariert</span>
              </div>
            )}
            <input ref={afterFileRef} type="file" accept="image/*" capture="environment" onChange={(e) => handleAfterImage(e.target.files?.[0])} className="hidden" />
          </div>
        </div>
        {job.image && job.image_after && (
          <div className="mt-3 mono text-[10px] uppercase tracking-widest text-center" style={{ color: '#7dd99c' }}>
            ✓ Reparatur dokumentiert
          </div>
        )}
      </div>

      <div className="mb-4 p-4 rounded-md" style={{ background: '#13110e', border: '1px solid #1f1c17' }}>
        <div className="mono text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: '#857d70' }}>
          <User size={11} /> Kunde
        </div>
        <div className="font-medium mb-1 flex items-center gap-2">
          {customer?.name}
          {customer?.language && (
            <span className="mono text-[9px] uppercase px-2 py-0.5 rounded" style={{ background: '#1f1c17', color: '#857d70' }}>
              {LANGUAGES[customer.language].flag} {LANGUAGES[customer.language].short}
            </span>
          )}
        </div>
        <div className="text-sm mono mb-3" style={{ color: '#a89e8d' }}>{customer?.phone}</div>
        {customer?.notes && (
          <div className="text-xs mb-3 p-2 rounded" style={{ background: '#1f1c17', color: '#a89e8d' }}>{customer.notes}</div>
        )}
        {job.status === 'abgeholt' && (
          <div className="mb-3 p-3 rounded text-xs flex items-start gap-2" style={{ background: '#1a3a2a', border: '1px solid #2a4a3a' }}>
            <span style={{ fontSize: 14, lineHeight: 1 }}>⭐</span>
            <span style={{ color: '#7dd99c' }}>Auftrag abgeholt — jetzt Bewertung anfragen!</span>
          </div>
        )}
        <button onClick={onWhatsApp} className="w-full py-3 rounded font-medium flex items-center justify-center gap-2 text-sm" style={{ background: '#1a3a2a', color: '#7dd99c', border: '1px solid #2a4a3a' }}>
          <MessageCircle size={15} /> WhatsApp-Nachricht senden
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        <div className="sm:col-span-2 p-4 rounded-md" style={{ background: '#13110e', border: '1px solid #1f1c17' }}>
          <div className="mono text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2" style={{ color: '#857d70' }}>
            <Wrench size={11} /> Reparatur
          </div>
          <div className="text-sm" style={{ color: '#f0e9dc' }}>{job.repair}</div>
        </div>
        <div className="p-4 rounded-md" style={{ background: '#1a1410', border: '1px solid #3a2a1a' }}>
          <div className="mono text-[10px] uppercase tracking-widest mb-2" style={{ color: '#e8904b' }}>Preis</div>
          <div className="text-2xl display-serif">
            {job.price_min === job.price_max ? job.price_min : `${job.price_min}–${job.price_max}`}<span style={{ color: '#857d70' }}>€</span>
          </div>
          <div className="mono text-[10px] uppercase tracking-widest mt-1" style={{ color: '#857d70' }}>{job.duration}</div>
          {job.deposit > 0 && (
            <div className="mt-3 pt-3" style={{ borderTop: '1px solid #3a2a1a' }}>
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: '#857d70' }}>Anzahlung</span>
                <span style={{ color: '#7dd99c' }}>{job.deposit}€</span>
              </div>
              <div className="flex justify-between text-xs font-medium">
                <span style={{ color: '#a89e8d' }}>Restbetrag</span>
                <span style={{ color: '#e8904b' }}>{Math.max(0, job.price_max - job.deposit)}€</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-4 p-4 rounded-md flex items-start gap-3" style={{ background: warrantyActive ? '#1a3a2a' : '#13110e', border: `1px solid ${warrantyActive ? '#2a4a3a' : '#1f1c17'}` }}>
        <Shield size={18} style={{ color: warrantyActive ? '#7dd99c' : '#5c554a', flexShrink: 0, marginTop: 2 }} />
        <div className="flex-1">
          <div className="mono text-[10px] uppercase tracking-widest mb-1" style={{ color: warrantyActive ? '#7dd99c' : '#857d70' }}>
            Garantie {warrantyActive ? 'aktiv' : 'inaktiv'}
          </div>
          <div className="text-sm" style={{ color: warrantyActive ? '#f0e9dc' : '#857d70' }}>
            {WARRANTY_MONTHS} Monate auf die Reparatur · gültig bis <span className="mono">{formatDateOnly(job.warranty_until)}</span>
          </div>
        </div>
      </div>

      {/* Funktionstest eingeschränkt - Warnung bleibt sichtbar */}
      {job.diagnosis_data?.funktionstest_eingeschraenkt && (
        <div className="mb-4 p-4 rounded-md" style={{ background: '#3a2f1a', border: '1px solid #92400e' }}>
          <div className="flex items-start gap-3 mb-2">
            <AlertTriangle size={18} style={{ color: '#fbbf24', flexShrink: 0, marginTop: 2 }} />
            <div className="flex-1">
              <div className="mono text-[10px] uppercase tracking-widest mb-1" style={{ color: '#fbbf24' }}>
                ⚠ Funktionstest war bei Annahme eingeschränkt
              </div>
              <div className="text-xs" style={{ color: '#fde68a' }}>
                Folgende Komponenten konnten nicht geprüft werden:
              </div>
            </div>
          </div>
          {job.diagnosis_data.nicht_pruefbar && job.diagnosis_data.nicht_pruefbar.length > 0 && (
            <div className="flex flex-wrap gap-1.5 ml-7">
              {job.diagnosis_data.nicht_pruefbar.map((item, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded" style={{ background: '#451a03', color: '#fed7aa', border: '1px solid #92400e' }}>
                  ○ {item}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mb-4 p-4 rounded-md" style={{ background: '#13110e', border: '1px solid #1f1c17' }}>
        <div className="flex justify-between items-center mb-3">
          <div className="mono text-[10px] uppercase tracking-widest flex items-center gap-2" style={{ color: '#857d70' }}>
            <FileText size={11} /> Techniker-Notizen
          </div>
          {canEdit && !editNotes && (
            <button onClick={() => setEditNotes(true)} className="mono text-[10px] uppercase tracking-widest" style={{ color: '#e8904b' }}>Bearbeiten</button>
          )}
        </div>
        {editNotes ? (
          <div className="space-y-2">
            <textarea value={notesDraft} onChange={(e) => setNotesDraft(e.target.value)} rows={3} placeholder="Notizen..." className="w-full px-3 py-2 rounded text-sm resize-none" style={{ background: '#1f1c17', border: '1px solid #2a2620', color: '#f0e9dc' }} />
            <div className="flex gap-2">
              <button onClick={saveNotes} className="flex-1 py-2 rounded text-sm font-medium" style={{ background: '#e8904b', color: '#0a0908' }}>Speichern</button>
              <button onClick={() => { setEditNotes(false); setNotesDraft(job.technician_notes || ''); }} className="px-4 py-2 rounded text-sm" style={{ background: '#1f1c17', color: '#a89e8d' }}>Abbrechen</button>
            </div>
          </div>
        ) : (
          <div className="text-sm" style={{ color: job.technician_notes ? '#f0e9dc' : '#5c554a' }}>
            {job.technician_notes || 'Keine Notizen'}
          </div>
        )}
      </div>

      {job.history && job.history.length > 0 && (
        <div className="p-4 rounded-md" style={{ background: '#13110e', border: '1px solid #1f1c17' }}>
          <div className="mono text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: '#857d70' }}>
            <Calendar size={11} /> Verlauf
          </div>
          <div className="space-y-3">
            {[...job.history].reverse().map((h, i) => {
              const hs = STATUSES[h.status];
              const Icon = hs?.icon || Check;
              return (
                <div key={i} className="flex gap-3 text-sm">
                  <Icon size={14} style={{ color: hs?.color || '#857d70', marginTop: 3, flexShrink: 0 }} />
                  <div className="flex-1">
                    <div style={{ color: '#f0e9dc' }}>{h.note}</div>
                    <div className="text-xs mono mt-0.5" style={{ color: '#857d70' }}>{formatDate(h.at)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function WhatsAppModal({ job, customer, onClose }) {
  const [lang, setLang] = useState(customer.language || 'de');
  const defaultTemplate = job.status === 'abgeholt' ? 'bewertung' :
    job.status === 'fertig' ? 'fertig' :
    job.status === 'wartet_auf_teile' ? 'teile' : 'annahme';
  const [selected, setSelected] = useState(defaultTemplate);
  const [text, setText] = useState(waTemplates(job, customer, lang)[defaultTemplate].text);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setText(waTemplates(job, customer, lang)[selected].text);
  }, [lang, selected]);

  const change = (key) => setSelected(key);

  const copy = () => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const isRTL = LANGUAGES[lang].dir === 'rtl';
  const templates = waTemplates(job, customer, lang);

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 fadeup" style={{ background: 'rgba(10,9,8,0.85)', backdropFilter: 'blur(8px)' }}>
      <div onClick={(e) => e.stopPropagation()} className="w-full sm:max-w-lg rounded-t-2xl sm:rounded-md max-h-[92vh] overflow-y-auto scrollbar" style={{ background: '#13110e', border: '1px solid #1f1c17' }}>
        <div className="p-5 flex justify-between items-start sticky top-0 z-10" style={{ borderBottom: '1px solid #1f1c17', background: '#13110e' }}>
          <div>
            <div className="mono text-[10px] uppercase tracking-widest mb-1" style={{ color: '#7dd99c' }}>WhatsApp</div>
            <div className="text-xl display-serif">An {customer.name.split(' ')[0]}</div>
            <div className="text-xs mono" style={{ color: '#857d70' }}>{customer.phone}</div>
          </div>
          <button onClick={onClose} className="p-1" style={{ color: '#857d70' }}><X size={20} /></button>
        </div>

        <div className="p-5">
          <div className="mono text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: '#857d70' }}>
            <Globe size={11} /> Sprache
          </div>
          <div className="grid grid-cols-5 gap-1.5 mb-5">
            {Object.entries(LANGUAGES).map(([code, l]) => (
              <button key={code} onClick={() => setLang(code)} className="py-2 rounded text-center" style={{
                background: lang === code ? '#1a3a2a' : '#1f1c17',
                border: `1px solid ${lang === code ? '#2a4a3a' : '#2a2620'}`,
              }}>
                <div className="text-base">{l.flag}</div>
                <div className="mono text-[8px] uppercase" style={{ color: lang === code ? '#7dd99c' : '#857d70' }}>{l.short}</div>
              </button>
            ))}
          </div>

          <div className="mono text-[10px] uppercase tracking-widest mb-3" style={{ color: '#857d70' }}>Vorlage</div>
          <div className="grid grid-cols-2 gap-2 mb-5">
            {Object.entries(templates).map(([key, tmpl]) => (
              <button key={key} onClick={() => change(key)} className="px-3 py-2 rounded text-xs text-left" style={{
                background: selected === key ? '#1a3a2a' : '#1f1c17',
                border: `1px solid ${selected === key ? '#2a4a3a' : '#2a2620'}`,
                color: selected === key ? '#7dd99c' : '#a89e8d',
              }}>{tmpl.label}</button>
            ))}
          </div>

          <div className="mono text-[10px] uppercase tracking-widest mb-3" style={{ color: '#857d70' }}>Nachricht</div>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={11}
            dir={isRTL ? 'rtl' : 'ltr'}
            className={`w-full px-4 py-3 rounded-md text-sm resize-none mb-4 ${isRTL ? 'arabic' : ''}`}
            style={{ background: '#1f1c17', border: '1px solid #2a2620', color: '#f0e9dc', whiteSpace: 'pre-wrap' }} />

          <a href={waLink(customer.phone, text)} target="_blank" rel="noopener noreferrer" className="w-full py-4 rounded-md font-medium flex items-center justify-center gap-2 mb-2" style={{ background: '#25D366', color: '#0a0908', textDecoration: 'none' }}>
            <Send size={18} /> In WhatsApp öffnen
          </a>

          <button onClick={copy} className="w-full py-3 rounded-md text-sm flex items-center justify-center gap-2" style={{ background: '#1f1c17', color: '#a89e8d', border: '1px solid #2a2620' }}>
            {copied ? <><Check size={14} /> Kopiert</> : <><Copy size={14} /> Text kopieren</>}
          </button>

          <div className="text-xs mt-4 text-center" style={{ color: '#5c554a' }}>
            Öffnet WhatsApp mit fertiger Nachricht in {LANGUAGES[lang].label}.
          </div>
        </div>
      </div>
    </div>
  );
}

function AnnahmescheinPrint({ job, customer }) {
  if (!job || !customer) return null;
  return (
    <div id="annahmeschein-print" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: 'black', background: 'white' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid black', paddingBottom: '15px', marginBottom: '20px' }}>
        <div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>EXPERT REPAIR</div>
          <div style={{ fontSize: '12px', marginTop: '4px' }}>Berlin · Handy · Tablet · Laptop · Konsolen</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '14px', fontWeight: 'bold' }}>ANNAHMESCHEIN</div>
          <div style={{ fontSize: '20px', fontFamily: 'monospace', marginTop: '4px' }}>#{String(job.id).toUpperCase()}</div>
          <div style={{ fontSize: '11px', marginTop: '2px' }}>Datum: {formatDateOnly(job.created_at)}</div>
        </div>
      </div>

      {/* Kunde */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#666', marginBottom: '6px' }}>Kunde</div>
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{customer.name}</div>
        <div style={{ fontSize: '14px', marginTop: '2px' }}>Tel: {customer.phone}</div>
      </div>

      {/* Gerät */}
      <div style={{ marginBottom: '20px', padding: '12px', background: '#f5f5f5', borderRadius: '4px' }}>
        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#666', marginBottom: '6px' }}>Gerät</div>
        <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{job.device}</div>
        <div style={{ fontSize: '12px', color: '#444' }}><b>Schadensbild:</b> {job.damage}</div>
        {job.image && (
          <img src={job.image} alt="" style={{ maxWidth: '200px', maxHeight: '150px', marginTop: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
        )}
      </div>

      {/* Reparatur + Preis */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '13px' }}>
        <tbody>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '8px 0', color: '#666', width: '40%' }}>Reparatur</td>
            <td style={{ padding: '8px 0', fontWeight: 'bold' }}>{job.repair}</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '8px 0', color: '#666' }}>Preis (KVA)</td>
            <td style={{ padding: '8px 0', fontWeight: 'bold' }}>
              {job.price_min === job.price_max ? `${job.price_min},00 €` : `${job.price_min},00 € – ${job.price_max},00 €`}
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '8px 0', color: '#666' }}>Voraussichtliche Dauer</td>
            <td style={{ padding: '8px 0' }}>{job.duration}</td>
          </tr>
          {job.deposit > 0 && (
            <>
              <tr style={{ borderBottom: '1px solid #ddd', background: '#fffae5' }}>
                <td style={{ padding: '8px 0', color: '#666' }}>Anzahlung erhalten</td>
                <td style={{ padding: '8px 0', fontWeight: 'bold' }}>{job.deposit},00 €</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px 0', color: '#666' }}>Restbetrag bei Abholung</td>
                <td style={{ padding: '8px 0', fontWeight: 'bold' }}>{Math.max(0, job.price_max - job.deposit)},00 €</td>
              </tr>
            </>
          )}
          <tr>
            <td style={{ padding: '8px 0', color: '#666' }}>Garantie</td>
            <td style={{ padding: '8px 0' }}>{WARRANTY_MONTHS} Monate auf die durchgeführte Reparatur</td>
          </tr>
        </tbody>
      </table>

      {/* Tracking-Hinweis */}
      <div style={{ padding: '10px', background: '#e8f4ff', borderRadius: '4px', marginBottom: '20px', fontSize: '12px' }}>
        📱 <b>Status jederzeit verfolgen:</b> {trackingUrl(job.id)}
      </div>

      {/* Funktionstest-Checkliste — KRITISCH für Streitvermeidung */}
      <div style={{ marginBottom: '20px', padding: '12px', border: '2px solid #d97706', borderRadius: '4px', background: '#fff7ed' }}>
        <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '4px', color: '#9a3412' }}>
          ⚠ Funktionstest bei Annahme — bitte sorgfältig prüfen
        </div>
        <div style={{ fontSize: '10px', color: '#7c2d12', marginBottom: '10px', lineHeight: '1.4' }}>
          Vor Reparaturbeginn wird geprüft, welche Funktionen sich noch testen lassen. Komponenten, die wegen des Schadens <b>nicht prüfbar</b> sind, werden als solche markiert. Der Kunde nimmt zur Kenntnis, dass für deren Funktionalität bei Annahme keine Aussage getroffen werden kann.
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
          <thead>
            <tr style={{ background: '#fed7aa' }}>
              <th style={{ padding: '6px 8px', textAlign: 'left', borderBottom: '1px solid #d97706', width: '50%' }}>Komponente / Funktion</th>
              <th style={{ padding: '6px 4px', textAlign: 'center', borderBottom: '1px solid #d97706', width: '17%' }}>✓ funktioniert</th>
              <th style={{ padding: '6px 4px', textAlign: 'center', borderBottom: '1px solid #d97706', width: '17%' }}>○ nicht prüfbar</th>
              <th style={{ padding: '6px 4px', textAlign: 'center', borderBottom: '1px solid #d97706', width: '16%' }}>✗ defekt</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              const items = [
                'Display / Touch',
                'Lautsprecher',
                'Mikrofon',
                'Hörmuschel (Telefonieren)',
                'Front-Kamera',
                'Haupt-Kamera + Blitz',
                'Lade-Anschluss / Buchse',
                'Akku-Funktion (Laden/Entladen)',
                'Buttons (Power, Lautstärke, Home)',
                'WLAN / Bluetooth',
                'Mobilfunk / SIM-Karte',
                'Face-ID / Fingerabdruck',
                'Vibrationsmotor',
                'Tastatur (bei Laptop)',
                'Lüfter / Geräusche',
                'Sonstiges:',
              ];
              const nichtPruefbar = job.diagnosis_data?.nicht_pruefbar || [];
              const isNichtPruefbar = (label) => {
                const l = label.toLowerCase();
                return nichtPruefbar.some(np => {
                  const np_l = np.toLowerCase();
                  return l.includes(np_l) || np_l.includes(l.split('/')[0].trim()) ||
                    (np_l.includes('mikro') && l.includes('mikrofon')) ||
                    (np_l.includes('lautsp') && l.includes('lautsprecher')) ||
                    (np_l.includes('kamera') && l.includes('kamera')) ||
                    (np_l.includes('touch') && l.includes('display')) ||
                    (np_l.includes('button') && l.includes('button')) ||
                    (np_l.includes('akku') && l.includes('akku'));
                });
              };
              return items.map((label, i) => {
                const preCheck = isNichtPruefbar(label);
                return (
                  <tr key={i} style={{ borderBottom: '1px solid #fed7aa', background: preCheck ? '#fffbeb' : 'transparent' }}>
                    <td style={{ padding: '5px 8px' }}>{label}</td>
                    <td style={{ textAlign: 'center', padding: '5px 4px' }}>☐</td>
                    <td style={{ textAlign: 'center', padding: '5px 4px', fontWeight: preCheck ? 'bold' : 'normal' }}>
                      {preCheck ? '☒' : '☐'}
                    </td>
                    <td style={{ textAlign: 'center', padding: '5px 4px' }}>☐</td>
                  </tr>
                );
              });
            })()}
          </tbody>
        </table>
        {job.diagnosis_data?.funktionstest_eingeschraenkt && (
          <div style={{ marginTop: '8px', padding: '6px 8px', background: '#fef3c7', borderRadius: '3px', fontSize: '10px', color: '#78350f' }}>
            ℹ <b>Hinweis der KI-Diagnose:</b> Wegen des Schadens sind bestimmte Komponenten <u>nicht testbar</u> — bereits vor-markiert. Bitte mit Kunde durchgehen und ggf. anpassen.
          </div>
        )}
        <div style={{ marginTop: '10px', fontSize: '10px', color: '#7c2d12', fontStyle: 'italic' }}>
          Notizen / besondere Beobachtungen: ____________________________________________________________
        </div>
      </div>

      {/* AGB / Disclaimer — erweitert um kritische Klausel */}
      <div style={{ fontSize: '10px', color: '#222', lineHeight: '1.6', marginBottom: '25px', padding: '12px', border: '1px solid #999', borderRadius: '4px', background: '#fafafa' }}>
        <b style={{ fontSize: '11px' }}>Allgemeine Bedingungen — bitte sorgfältig lesen:</b><br /><br />

        <b>1. Funktionstest und nicht prüfbare Komponenten:</b> Der Kunde nimmt zur Kenntnis, dass bei stark beschädigten Geräten (z.B. defektes Display, Wasserschaden, Kurzschluss, defekter Akku) ein vollständiger Funktionstest <b>nicht möglich ist</b>. Komponenten wie Mikrofon, Lautsprecher, Kameras, Tasten, WLAN, Mobilfunk, Akku-Lebensdauer und ähnliche können in solchen Fällen <u>erst nach erfolgter Reparatur geprüft werden</u>. Werden nach Reparatur weitere Defekte festgestellt, die mit dem ursprünglichen Schaden nicht in Zusammenhang stehen, sind diese <b>nicht Bestandteil des Reparaturauftrags</b> und werden auf Wunsch des Kunden als separater Auftrag mit eigenem Kostenvoranschlag bearbeitet. Die Garantie auf die durchgeführte Reparatur bleibt davon unberührt.<br /><br />

        <b>2. Kostenvoranschlag:</b> Der angegebene Preis ist ein Kostenvoranschlag auf Basis der bei Annahme erkennbaren Schäden. Werden während der Reparatur weitere relevante Defekte entdeckt, wird der Kunde <u>vor</u> Beginn der Mehrkosten kontaktiert. Eine Reparatur erfolgt erst nach ausdrücklicher Freigabe.<br /><br />

        <b>3. Datensicherheit:</b> Wir empfehlen <u>dringend</u> vor Abgabe ein Backup aller Daten. Bei Reparaturen kann es in seltenen Fällen zu Datenverlust kommen — wir übernehmen keine Haftung für Datenverlust, gelöschte Apps, Konten oder persönliche Inhalte.<br /><br />

        <b>4. Originalteile / kompatible Teile:</b> Wir verbauen nach Möglichkeit Originalteile. Wenn nicht verfügbar, werden hochwertige kompatible Teile mit gleicher Funktionalität verwendet. Der Kunde erhält darüber bei Abholung Auskunft.<br /><br />

        <b>5. Garantie:</b> Auf die durchgeführte Reparatur gewähren wir <b>{WARRANTY_MONTHS} Monate Garantie</b>. Diese gilt nicht bei mechanischer Beschädigung (Sturz, Druck), Wasserschaden nach der Reparatur oder Eingriff durch Dritte.<br /><br />

        <b>6. Abholung:</b> Nicht abgeholte Geräte werden nach 90 Tagen kostenpflichtig eingelagert (5€/Monat). Nach 6 Monaten ohne Reaktion gehen die Geräte in unser Eigentum über.<br /><br />

        <b>7. Anzahlung:</b> Geleistete Anzahlungen werden bei Stornierung nicht zurückerstattet, sofern bereits Ersatzteile bestellt wurden. Bei Stornierung vor Bestellung: volle Rückerstattung.<br /><br />

        <b>Mit der Unterschrift</b> bestätigt der Kunde: den Erhalt einer Kopie dieses Annahmescheins, die Richtigkeit der oben angegebenen Funktionstest-Ergebnisse, und die Kenntnisnahme sowie Akzeptanz dieser Bedingungen.
      </div>

      {/* Unterschriften */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '40px', marginTop: '50px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ borderTop: '1px solid black', paddingTop: '6px', fontSize: '11px', color: '#666' }}>
            Datum, Unterschrift Kunde
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ borderTop: '1px solid black', paddingTop: '6px', fontSize: '11px', color: '#666' }}>
            Datum, Unterschrift Mitarbeiter
          </div>
        </div>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '10px', color: '#888' }}>
        Expert Repair · Berlin · Vielen Dank für Ihr Vertrauen
      </div>
    </div>
  );
}

function PublicTracking({ job, customer, onExit }) {
  const lang = customer.language || 'de';
  const isRTL = LANGUAGES[lang].dir === 'rtl';

  const i18n = {
    de: { greeting: 'Hallo', tracking: 'Reparatur-Status', order: 'Auftragsnummer', device: 'Gerät', updated: 'Letzte Aktualisierung', shop: 'Bei Fragen kontaktieren Sie uns', closeBtn: 'Vorschau schließen' },
    tr: { greeting: 'Merhaba', tracking: 'Tamir Durumu', order: 'İş Numarası', device: 'Cihaz', updated: 'Son güncelleme', shop: 'Sorularınız için bizimle iletişime geçin', closeBtn: 'Önizlemeyi kapat' },
    en: { greeting: 'Hello', tracking: 'Repair Status', order: 'Order Number', device: 'Device', updated: 'Last update', shop: 'Contact us for questions', closeBtn: 'Close preview' },
    ar: { greeting: 'مرحباً', tracking: 'حالة الإصلاح', order: 'رقم الطلب', device: 'الجهاز', updated: 'آخر تحديث', shop: 'تواصل معنا لأي استفسار', closeBtn: 'إغلاق المعاينة' },
    ru: { greeting: 'Здравствуйте', tracking: 'Статус ремонта', order: 'Номер заказа', device: 'Устройство', updated: 'Последнее обновление', shop: 'Свяжитесь с нами при вопросах', closeBtn: 'Закрыть предпросмотр' },
  };
  const t = i18n[lang] || i18n.de;

  const statusOrder = ['eingegangen', 'in_arbeit', 'fertig', 'abgeholt'];
  const currentIdx = job.status === 'wartet_auf_teile' ? statusOrder.indexOf('in_arbeit') : statusOrder.indexOf(job.status);

  return (
    <div className={`min-h-screen w-full ${isRTL ? 'arabic' : ''}`} style={{ background: '#0a0908', color: '#f0e9dc', fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : "'Bricolage Grotesque', sans-serif", direction: isRTL ? 'rtl' : 'ltr' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;700&family=Noto+Sans+Arabic:wght@400;500;600&display=swap');
        @keyframes fadeup { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .fadeup { animation: fadeup 0.5s ease-out forwards; }
        .pulse { animation: pulse 2s ease-in-out infinite; }
      `}</style>

      <div className="px-4 py-2.5 text-center text-xs flex items-center justify-center gap-3" style={{ background: '#3a2f1a', color: '#e8b04b', borderBottom: '1px solid #4a3f2a' }}>
        <span>👁 Vorschau · So sieht der Kunde den Tracking-Link</span>
        <button onClick={onExit} className="underline" style={{ color: '#e8b04b' }}>{t.closeBtn}</button>
      </div>

      <div className="max-w-md mx-auto px-6 py-12 fadeup">
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-md flex items-center justify-center mx-auto mb-4" style={{ background: '#e8904b', color: '#0a0908' }}>
            <Wrench size={22} strokeWidth={2.5} />
          </div>
          <div className="text-2xl mb-1">
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>Expert</span>
            <span style={{ color: '#857d70', fontWeight: 300 }}> Repair</span>
          </div>
          <div className="text-[10px] uppercase tracking-[0.25em] mt-2" style={{ color: '#857d70', fontFamily: "'JetBrains Mono', monospace" }}>{SHOP_LOCATION}</div>
        </div>

        <div className="text-lg mb-2" style={{ color: '#a89e8d' }}>{t.greeting} {customer.name.split(' ')[0]},</div>
        <div className="text-3xl mb-8" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>{t.tracking}</div>

        <div className="p-5 rounded-md mb-6" style={{ background: '#13110e', border: '1px solid #1f1c17' }}>
          <div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: '#857d70', fontFamily: "'JetBrains Mono', monospace" }}>{t.device}</div>
          <div className="text-xl mb-3">{job.device}</div>
          <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: '#857d70', fontFamily: "'JetBrains Mono', monospace" }}>{t.order}</div>
          <div className="text-sm" style={{ fontFamily: "'JetBrains Mono', monospace", color: '#e8904b' }}>#{String(job.id).toUpperCase()}</div>
        </div>

        <div className="p-5 rounded-md mb-6" style={{ background: '#13110e', border: '1px solid #1f1c17' }}>
          <div className="text-[10px] uppercase tracking-widest mb-5" style={{ color: '#857d70', fontFamily: "'JetBrains Mono', monospace" }}>{t.tracking}</div>
          <div className="space-y-5">
            {statusOrder.map((sk, i) => {
              const sst = STATUSES[sk];
              const Icon = sst.icon;
              const reached = i <= currentIdx;
              const current = i === currentIdx && job.status !== 'abgeholt';
              return (
                <div key={sk} className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{
                      background: reached ? sst.bg : '#1f1c17',
                      border: `2px solid ${reached ? sst.color : '#2a2620'}`,
                    }}>
                      <Icon size={15} style={{ color: reached ? sst.color : '#5c554a' }} />
                    </div>
                    {current && (
                      <div className="absolute -inset-1 rounded-full pulse" style={{ border: `2px solid ${sst.color}`, opacity: 0.4 }}></div>
                    )}
                  </div>
                  <div>
                    <div className="text-base" style={{ color: reached ? '#f0e9dc' : '#5c554a' }}>
                      {sst.i18n[lang] || sst.label}
                    </div>
                    {current && (
                      <div className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: sst.color, fontFamily: "'JetBrains Mono', monospace" }}>
                        ● Aktuell
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center text-xs mb-8" style={{ color: '#857d70' }}>
          {t.updated}: <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{formatDate(job.updated_at)}</span>
        </div>

        <div className="text-center text-xs pt-6" style={{ color: '#5c554a', borderTop: '1px solid #1f1c17' }}>
          {t.shop}<br />
          <span style={{ color: '#a89e8d' }}>{SHOP_NAME} · {SHOP_LOCATION}</span>
        </div>
      </div>
    </div>
  );
}

// === Mount React-App ===
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
