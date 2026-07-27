import {
  BizPage,
  StatStrip,
  GlassPanel,
  DataTable,
  Pill,
  PrimaryBtn,
  GhostBtn,
  useT,
  money,
  BarList,
} from '../components/BizKit';

/* ---------- Ana Bölümler ---------- */

export function FaturalarPage() {
  const t = useT();
  return (
    <BizPage
      title={t('Faturalar', 'Invoices')}
      subtitle={t('Satış ve alış faturalarını takip edin.', 'Track sales and purchase invoices.')}
      actions={<><GhostBtn>{t('Dışa Aktar', 'Export')}</GhostBtn><PrimaryBtn>{t('Yeni Fatura', 'New Invoice')}</PrimaryBtn></>}
    >
      <StatStrip items={[
        { label: t('Bu Ay', 'This Month'), value: money(428500), hint: '24 fatura' },
        { label: t('Tahsil Bekleyen', 'Receivable'), value: money(186200), tone: 'warn', hint: '8 açık' },
        { label: t('Ödenen', 'Paid'), value: money(242300), tone: 'up', hint: '+12%' },
        { label: t('İptal', 'Cancelled'), value: '3', tone: 'down' },
      ]} />
      <GlassPanel title={t('Son Faturalar', 'Recent Invoices')} right={<GhostBtn>{t('Filtrele', 'Filter')}</GhostBtn>}>
        <DataTable
          columns={[t('No', 'No'), t('Cari', 'Account'), t('Tarih', 'Date'), t('Tutar', 'Amount'), t('KDV', 'VAT'), t('Durum', 'Status')]}
          rows={[
            ['FT-2026-118', 'Anadolu Lojistik', '22 Tem', money(84500), 'KDV %20', <Pill tone="up">{t('Ödendi', 'Paid')}</Pill>],
            ['FT-2026-117', 'Nova Tekstil', '21 Tem', money(36200), 'KDV %20', <Pill tone="warn">{t('Bekliyor', 'Pending')}</Pill>],
            ['FT-2026-116', 'Delta Gıda A.Ş.', '20 Tem', money(128900), 'KDV %1', <Pill tone="up">{t('Ödendi', 'Paid')}</Pill>],
            ['FT-2026-115', 'Sky Export', '18 Tem', money(67200), 'KDV %20', <Pill tone="info">{t('Taslak', 'Draft')}</Pill>],
            ['FT-2026-114', 'Marmara Kimya', '16 Tem', money(24100), 'KDV %20', <Pill tone="down">{t('Gecikmiş', 'Overdue')}</Pill>],
          ]}
        />
      </GlassPanel>
    </BizPage>
  );
}

export function CariPage() {
  const t = useT();
  return (
    <BizPage
      title={t('Cari Hesaplar', 'Accounts')}
      subtitle={t('Müşteri ve tedarikçi bakiyeleri.', 'Customer and supplier balances.')}
      actions={<PrimaryBtn>{t('Cari Ekle', 'Add Account')}</PrimaryBtn>}
    >
      <StatStrip items={[
        { label: t('Alacak', 'Receivable'), value: money(912400), tone: 'up' },
        { label: t('Borç', 'Payable'), value: money(384100), tone: 'down' },
        { label: t('Net', 'Net'), value: money(528300), hint: t('Pozitif', 'Positive') },
        { label: t('Aktif Cari', 'Active'), value: '146' },
      ]} />
      <div className="biz-split">
        <GlassPanel title={t('En Yüksek Alacaklar', 'Top Receivables')}>
          <BarList items={[
            { label: 'Anadolu Lojistik', value: 186000 },
            { label: 'Nova Tekstil', value: 124500 },
            { label: 'Sky Export', value: 98000 },
            { label: 'Delta Gıda', value: 74200 },
          ]} />
        </GlassPanel>
        <GlassPanel title={t('Cari Listesi', 'Account List')}>
          <DataTable
            columns={[t('Unvan', 'Name'), t('Tip', 'Type'), t('Bakiye', 'Balance'), t('Risk', 'Risk')]}
            rows={[
              ['Anadolu Lojistik', t('Müşteri', 'Customer'), money(186000), <Pill tone="up">A</Pill>],
              ['Metro Tedarik', t('Tedarikçi', 'Supplier'), money(-54200), <Pill tone="warn">B</Pill>],
              ['Nova Tekstil', t('Müşteri', 'Customer'), money(124500), <Pill tone="up">A</Pill>],
              ['Ege Ambalaj', t('Tedarikçi', 'Supplier'), money(-22800), <Pill tone="info">A</Pill>],
            ]}
          />
        </GlassPanel>
      </div>
    </BizPage>
  );
}

export function KasaBankaPage() {
  const t = useT();
  return (
    <BizPage
      title={t('Kasa & Banka', 'Cash & Bank')}
      subtitle={t('Nakit ve banka hesap hareketleri.', 'Cash and bank account movements.')}
      actions={<PrimaryBtn>{t('Hareket Ekle', 'Add Entry')}</PrimaryBtn>}
    >
      <StatStrip items={[
        { label: t('Toplam Nakit', 'Total Cash'), value: money(1542800) },
        { label: 'Garanti TL', value: money(842000) },
        { label: 'İş Bankası USD', value: '$48.200' },
        { label: t('Kasa', 'Cash Desk'), value: money(38600) },
      ]} />
      <GlassPanel title={t('Son Hareketler', 'Recent Movements')}>
        <DataTable
          columns={[t('Tarih', 'Date'), t('Hesap', 'Account'), t('Açıklama', 'Description'), t('Giriş', 'In'), t('Çıkış', 'Out')]}
          rows={[
            ['24 Tem', 'Garanti TL', t('Müşteri tahsilatı', 'Customer collection'), money(45000), '—'],
            ['23 Tem', t('Kasa', 'Cash'), t('Ofis gideri', 'Office expense'), '—', money(1250)],
            ['22 Tem', 'İş Bankası USD', t('İhracat bedeli', 'Export payment'), '$12.400', '—'],
            ['21 Tem', 'Garanti TL', t('Tedarikçi ödemesi', 'Supplier payment'), '—', money(28600)],
          ]}
        />
      </GlassPanel>
    </BizPage>
  );
}

export function GiderlerPage() {
  const t = useT();
  return (
    <BizPage
      title={t('Giderler / Masraflar', 'Expenses')}
      subtitle={t('Operasyonel giderleri kategoriye göre izleyin.', 'Track operating expenses by category.')}
      actions={<PrimaryBtn>{t('Gider Ekle', 'Add Expense')}</PrimaryBtn>}
    >
      <StatStrip items={[
        { label: t('Bu Ay', 'This Month'), value: money(96400) },
        { label: t('Ortalama', 'Average'), value: money(88200), hint: t('Son 6 ay', 'Last 6 mo') },
        { label: t('En Yüksek', 'Highest'), value: t('Lojistik', 'Logistics'), hint: money(31200) },
        { label: t('Onay Bekleyen', 'Pending'), value: '5', tone: 'warn' },
      ]} />
      <div className="biz-split">
        <GlassPanel title={t('Kategori Dağılımı', 'By Category')}>
          <BarList items={[
            { label: t('Lojistik', 'Logistics'), value: 31200 },
            { label: t('Personel', 'Payroll'), value: 24800 },
            { label: t('Ofis', 'Office'), value: 16400 },
            { label: t('Pazarlama', 'Marketing'), value: 12800 },
            { label: t('Diğer', 'Other'), value: 11200 },
          ]} />
        </GlassPanel>
        <GlassPanel title={t('Gider Listesi', 'Expense List')}>
          <DataTable
            columns={[t('Kalem', 'Item'), t('Kategori', 'Category'), t('Tutar', 'Amount'), t('Durum', 'Status')]}
            rows={[
              [t('Depo kira', 'Warehouse rent'), t('Ofis', 'Office'), money(18500), <Pill tone="up">{t('Onaylı', 'Approved')}</Pill>],
              [t('Kargo', 'Shipping'), t('Lojistik', 'Logistics'), money(6400), <Pill tone="warn">{t('Bekliyor', 'Pending')}</Pill>],
              [t('Reklam', 'Ads'), t('Pazarlama', 'Marketing'), money(9200), <Pill tone="up">{t('Onaylı', 'Approved')}</Pill>],
            ]}
          />
        </GlassPanel>
      </div>
    </BizPage>
  );
}

/* ---------- İşlemler ---------- */

export function StokPage() {
  const t = useT();
  return (
    <BizPage
      title={t('Stok / Envanter', 'Inventory')}
      subtitle={t('Ürün stok seviyeleri ve kritik uyarılar.', 'Product stock levels and critical alerts.')}
      actions={<PrimaryBtn>{t('Stok Girişi', 'Stock In')}</PrimaryBtn>}
    >
      <StatStrip items={[
        { label: t('SKU', 'SKU'), value: '1.284' },
        { label: t('Toplam Değer', 'Total Value'), value: money(2450000) },
        { label: t('Kritik Stok', 'Low Stock'), value: '18', tone: 'down' },
        { label: t('Depolar', 'Warehouses'), value: '3' },
      ]} />
      <GlassPanel title={t('Ürünler', 'Products')}>
        <DataTable
          columns={[t('Kod', 'Code'), t('Ürün', 'Product'), t('Depo', 'Warehouse'), t('Adet', 'Qty'), t('Durum', 'Status')]}
          rows={[
            ['SKU-1042', t('Pamuklu Kumaş 30m', 'Cotton fabric 30m'), 'İstanbul', '420', <Pill tone="up">{t('Yeterli', 'OK')}</Pill>],
            ['SKU-0881', t('Karton Koli', 'Cardboard box'), 'Gebze', '64', <Pill tone="warn">{t('Düşük', 'Low')}</Pill>],
            ['SKU-2210', t('Etiket Rulosu', 'Label roll'), 'İstanbul', '12', <Pill tone="down">{t('Kritik', 'Critical')}</Pill>],
            ['SKU-0555', t('Palet', 'Pallet'), 'Ankara', '210', <Pill tone="up">{t('Yeterli', 'OK')}</Pill>],
          ]}
        />
      </GlassPanel>
    </BizPage>
  );
}

export function CekSenetPage() {
  const t = useT();
  return (
    <BizPage
      title={t('Çek & Senet', 'Cheques & Notes')}
      subtitle={t('Vadeli çek ve senet portföyü.', 'Portfolio of post-dated cheques and notes.')}
      actions={<PrimaryBtn>{t('Yeni Kayıt', 'New Entry')}</PrimaryBtn>}
    >
      <StatStrip items={[
        { label: t('Portföy', 'Portfolio'), value: money(612000) },
        { label: t('Bu Hafta Vade', 'Due This Week'), value: money(84000), tone: 'warn' },
        { label: t('Tahsil', 'Collected'), value: money(128000), tone: 'up' },
        { label: t('Karşılıksız', 'Bounced'), value: '1', tone: 'down' },
      ]} />
      <GlassPanel title={t('Vadesi Yaklaşanlar', 'Upcoming Maturities')}>
        <DataTable
          columns={[t('No', 'No'), t('Cari', 'Account'), t('Vade', 'Due'), t('Tutar', 'Amount'), t('Tip', 'Type')]}
          rows={[
            ['ÇK-8821', 'Nova Tekstil', '26 Tem', money(42000), t('Çek', 'Cheque')],
            ['SN-331', 'Delta Gıda', '28 Tem', money(26500), t('Senet', 'Note')],
            ['ÇK-8790', 'Sky Export', '01 Ağu', money(51000), t('Çek', 'Cheque')],
          ]}
        />
      </GlassPanel>
    </BizPage>
  );
}

export function MutabakatPage() {
  const t = useT();
  return (
    <BizPage
      title={t('Banka Mutabakatı', 'Bank Reconciliation')}
      subtitle={t('Banka ekstresi ile defter kayıtlarını eşleştirin.', 'Match bank statements with ledger entries.')}
      actions={<PrimaryBtn>{t('Ekstre Yükle', 'Upload Statement')}</PrimaryBtn>}
    >
      <StatStrip items={[
        { label: t('Eşleşen', 'Matched'), value: '128', tone: 'up' },
        { label: t('Bekleyen', 'Pending'), value: '14', tone: 'warn' },
        { label: t('Fark', 'Difference'), value: money(2450), tone: 'down' },
        { label: t('Son Ekstre', 'Last Statement'), value: '22 Tem' },
      ]} />
      <div className="biz-split">
        <GlassPanel title={t('Banka Satırları', 'Bank Lines')}>
          <DataTable
            columns={[t('Tarih', 'Date'), t('Açıklama', 'Description'), t('Tutar', 'Amount')]}
            rows={[
              ['22 Tem', 'EFT Anadolu Lojistik', money(45000)],
              ['21 Tem', 'POS Komisyon', `-${money(820)}`],
              ['20 Tem', 'Havale Metro Tedarik', `-${money(28600)}`],
            ]}
          />
        </GlassPanel>
        <GlassPanel title={t('Defter Satırları', 'Ledger Lines')}>
          <DataTable
            columns={[t('Fiş', 'Voucher'), t('Açıklama', 'Description'), t('Tutar', 'Amount'), '']}
            rows={[
              ['MH-441', t('Tahsilat', 'Collection'), money(45000), <Pill tone="up">{t('Eşleşti', 'Matched')}</Pill>],
              ['MH-438', t('Tedarikçi ödeme', 'Supplier pay'), money(28600), <Pill tone="up">{t('Eşleşti', 'Matched')}</Pill>],
              ['MH-436', t('Komisyon', 'Fee'), money(820), <Pill tone="warn">{t('Açık', 'Open')}</Pill>],
            ]}
          />
        </GlassPanel>
      </div>
    </BizPage>
  );
}

export function OcrPage() {
  const t = useT();
  return (
    <BizPage
      title={t('Fatura Yükle / OCR', 'Upload / OCR')}
      subtitle={t('Faturaları yükleyin; Cenan AI metni ve tutarları çıkarsın.', 'Upload invoices; Cenan AI extracts text and amounts.')}
    >
      <div className="biz-split">
        <GlassPanel title={t('Yükleme Alanı', 'Upload Zone')}>
          <div className="biz-drop">
            <strong>{t('Dosyayı sürükleyin veya seçin', 'Drag a file or browse')}</strong>
            <p>PDF, PNG, JPG · max 20MB</p>
            <PrimaryBtn>{t('Dosya Seç', 'Choose File')}</PrimaryBtn>
          </div>
        </GlassPanel>
        <GlassPanel title={t('Son OCR Sonuçları', 'Recent OCR Results')}>
          <DataTable
            columns={[t('Dosya', 'File'), t('Güven', 'Confidence'), t('Tutar', 'Amount'), t('Durum', 'Status')]}
            rows={[
              ['fatura_delta.pdf', '98%', money(128900), <Pill tone="up">{t('Tamam', 'Done')}</Pill>],
              ['fiş_market.jpg', '91%', money(842), <Pill tone="up">{t('Tamam', 'Done')}</Pill>],
              ['irsaliye_scan.png', '76%', '—', <Pill tone="warn">{t('Kontrol', 'Review')}</Pill>],
            ]}
          />
        </GlassPanel>
      </div>
    </BizPage>
  );
}

/* ---------- Raporlar ---------- */

export function MizanPage() {
  const t = useT();
  return (
    <BizPage title={t('Mizan', 'Trial Balance')} subtitle={t('Hesap planı borç/alacak bakiyeleri.', 'Chart of accounts debit/credit balances.')}>
      <StatStrip items={[
        { label: t('Toplam Borç', 'Total Debit'), value: money(4850000) },
        { label: t('Toplam Alacak', 'Total Credit'), value: money(4850000), tone: 'up' },
        { label: t('Fark', 'Difference'), value: money(0) },
        { label: t('Dönem', 'Period'), value: '2026-Q2' },
      ]} />
      <GlassPanel title={t('Hesap Bakiyeleri', 'Account Balances')}>
        <DataTable
          columns={[t('Hesap', 'Account'), t('Borç', 'Debit'), t('Alacak', 'Credit'), t('Bakiye', 'Balance')]}
          rows={[
            ['100 Kasa', money(38600), '—', money(38600)],
            ['102 Bankalar', money(842000), '—', money(842000)],
            ['120 Alıcılar', money(912400), '—', money(912400)],
            ['320 Satıcılar', '—', money(384100), money(-384100)],
            ['600 Yurt İçi Satış', '—', money(2140000), money(-2140000)],
          ]}
        />
      </GlassPanel>
    </BizPage>
  );
}

export function GelirGiderPage() {
  const t = useT();
  return (
    <BizPage title={t('Gelir-Gider / Kâr-Zarar', 'Income Statement')} subtitle={t('Dönemsel kârlılık özeti.', 'Period profitability summary.')}>
      <StatStrip items={[
        { label: t('Gelir', 'Revenue'), value: money(2140000), tone: 'up' },
        { label: t('Gider', 'Expense'), value: money(1485000), tone: 'down' },
        { label: t('Brüt Kâr', 'Gross Profit'), value: money(655000) },
        { label: t('Net Kâr', 'Net Profit'), value: money(412000), hint: '%19.2' },
      ]} />
      <div className="biz-split">
        <GlassPanel title={t('Gelir Kalemleri', 'Revenue Lines')}>
          <BarList items={[
            { label: t('Yurt içi satış', 'Domestic sales'), value: 1480000 },
            { label: t('İhracat', 'Export'), value: 520000 },
            { label: t('Diğer gelir', 'Other income'), value: 140000 },
          ]} />
        </GlassPanel>
        <GlassPanel title={t('Gider Kalemleri', 'Expense Lines')}>
          <BarList items={[
            { label: t('Satışların maliyeti', 'COGS'), value: 980000 },
            { label: t('Operasyon', 'Operations'), value: 312000 },
            { label: t('Finansman', 'Finance'), value: 98000 },
            { label: t('Vergi', 'Tax'), value: 95000 },
          ]} />
        </GlassPanel>
      </div>
    </BizPage>
  );
}

export function BilancoPage() {
  const t = useT();
  return (
    <BizPage title={t('Bilanço', 'Balance Sheet')} subtitle={t('Varlıklar, yükümlülükler ve özkaynaklar.', 'Assets, liabilities and equity.')}>
      <div className="biz-split">
        <GlassPanel title={t('Varlıklar', 'Assets')}>
          <DataTable
            columns={[t('Kalem', 'Item'), t('Tutar', 'Amount')]}
            rows={[
              [t('Dönen varlıklar', 'Current assets'), money(1890000)],
              [t('Duran varlıklar', 'Non-current assets'), money(1260000)],
              [t('Toplam varlık', 'Total assets'), money(3150000)],
            ]}
          />
        </GlassPanel>
        <GlassPanel title={t('Kaynaklar', 'Equity & Liabilities')}>
          <DataTable
            columns={[t('Kalem', 'Item'), t('Tutar', 'Amount')]}
            rows={[
              [t('Kısa vadeli yükümlülük', 'Current liabilities'), money(684000)],
              [t('Uzun vadeli yükümlülük', 'Long-term liabilities'), money(420000)],
              [t('Özkaynaklar', 'Equity'), money(2046000)],
              [t('Toplam kaynak', 'Total'), money(3150000)],
            ]}
          />
        </GlassPanel>
      </div>
    </BizPage>
  );
}

export function KdvRaporPage() {
  const t = useT();
  return (
    <BizPage title={t('KDV Raporu', 'VAT Report')} subtitle={t('İndirilecek / hesaplanan KDV özeti.', 'Input / output VAT summary.')}>
      <StatStrip items={[
        { label: t('Hesaplanan KDV', 'Output VAT'), value: money(286400) },
        { label: t('İndirilecek KDV', 'Input VAT'), value: money(198200) },
        { label: t('Ödenecek', 'Payable'), value: money(88200), tone: 'warn' },
        { label: t('Dönem', 'Period'), value: t('Temmuz 2026', 'July 2026') },
      ]} />
      <GlassPanel title={t('KDV Detayı', 'VAT Detail')}>
        <DataTable
          columns={[t('Oran', 'Rate'), t('Matrah', 'Base'), t('KDV', 'VAT'), t('Tip', 'Type')]}
          rows={[
            ['%20', money(1240000), money(248000), t('Satış', 'Sales')],
            ['%10', money(186000), money(18600), t('Satış', 'Sales')],
            ['%20', money(842000), money(168400), t('Alış', 'Purchase')],
            ['%1', money(98000), money(980), t('Alış', 'Purchase')],
          ]}
        />
      </GlassPanel>
    </BizPage>
  );
}

export function YaslandirmaPage() {
  const t = useT();
  return (
    <BizPage title={t('Cari Yaşlandırma', 'Aging Report')} subtitle={t('Alacakların vade dilimlerine göre dağılımı.', 'Receivables by aging buckets.')}>
      <StatStrip items={[
        { label: '0-30', value: money(412000), tone: 'up' },
        { label: '31-60', value: money(248000) },
        { label: '61-90', value: money(156000), tone: 'warn' },
        { label: '90+', value: money(96400), tone: 'down' },
      ]} />
      <GlassPanel title={t('Cari Bazında', 'By Account')}>
        <DataTable
          columns={[t('Cari', 'Account'), '0-30', '31-60', '61-90', '90+']}
          rows={[
            ['Anadolu Lojistik', money(120000), money(46000), money(20000), '—'],
            ['Nova Tekstil', money(64000), money(40500), money(20000), money(0)],
            ['Sky Export', money(38000), money(22000), money(18000), money(20000)],
            ['Marmara Kimya', money(12000), '—', money(8000), money(24100)],
          ]}
        />
      </GlassPanel>
    </BizPage>
  );
}

export function AiOzetPage() {
  const t = useT();
  return (
    <BizPage title={t('AI Özet & Anomali Tespiti', 'AI Summary & Anomaly')} subtitle={t('Cenan AI dönem özeti ve risk uyarıları.', 'Cenan AI period summary and risk alerts.')}>
      <div className="biz-split">
        <GlassPanel title={t('Dönem Özeti', 'Period Summary')}>
          <ul className="biz-list">
            <li>{t('Net kâr geçen aya göre %8 arttı.', 'Net profit is up 8% vs last month.')}</li>
            <li>{t('Alacak tahsil süresi 4 gün uzadı.', 'Receivable days sales outstanding rose by 4 days.')}</li>
            <li>{t('Lojistik giderleri bütçenin %12 üzerinde.', 'Logistics spend is 12% over budget.')}</li>
            <li>{t('İhracat USD tahsilatları stabil.', 'Export USD collections remain stable.')}</li>
          </ul>
        </GlassPanel>
        <GlassPanel title={t('Anomaliler', 'Anomalies')}>
          <DataTable
            columns={[t('Uyarı', 'Alert'), t('Etki', 'Impact'), t('Öneri', 'Suggestion')]}
            rows={[
              [t('Olağandışı tedarikçi ödemesi', 'Unusual supplier payment'), money(28600), t('Faturayı doğrula', 'Verify invoice')],
              [t('Tekrarlayan fiş', 'Duplicate voucher'), 'MH-436', t('Birini iptal et', 'Cancel one')],
              [t('Kritik stok', 'Critical stock'), 'SKU-2210', t('Sipariş öner', 'Suggest PO')],
            ]}
          />
        </GlassPanel>
      </div>
    </BizPage>
  );
}

/* ---------- Vergi & Destek ---------- */

export function BeyannamePage() {
  const t = useT();
  return (
    <BizPage title={t('Beyannameler', 'Declarations')} subtitle={t('KDV, Muhtasar ve kurumlar beyanname durumu.', 'VAT, withholding and corporate declaration status.')} actions={<PrimaryBtn>{t('Hazırla', 'Prepare')}</PrimaryBtn>}>
      <GlassPanel title={t('Beyanname Takibi', 'Declaration Tracker')}>
        <DataTable
          columns={[t('Tür', 'Type'), t('Dönem', 'Period'), t('Son Gün', 'Due'), t('Durum', 'Status')]}
          rows={[
            [t('KDV 1', 'VAT 1'), t('Haziran', 'June'), '26 Tem', <Pill tone="warn">{t('Hazırlanıyor', 'Preparing')}</Pill>],
            [t('Muhtasar', 'Withholding'), t('Haziran', 'June'), '26 Tem', <Pill tone="info">{t('Taslak', 'Draft')}</Pill>],
            [t('Geçici Vergi', 'Provisional Tax'), '2026/2', '17 Ağu', <Pill tone="neutral">{t('Planlandı', 'Scheduled')}</Pill>],
            [t('Kurumlar', 'Corporate'), '2025', '30 Nis', <Pill tone="up">{t('Verildi', 'Filed')}</Pill>],
          ]}
        />
      </GlassPanel>
    </BizPage>
  );
}

export function VergiTakvimPage() {
  const t = useT();
  return (
    <BizPage title={t('Vergi Takvimi / Hatırlatıcılar', 'Tax Calendar')} subtitle={t('Yaklaşan vergi ve bildirim tarihleri.', 'Upcoming tax and filing dates.')}>
      <StatStrip items={[
        { label: t('Bu Hafta', 'This Week'), value: '2', tone: 'warn' },
        { label: t('Bu Ay', 'This Month'), value: '5' },
        { label: t('Tamamlanan', 'Done'), value: '11', tone: 'up' },
        { label: t('Geciken', 'Overdue'), value: '0' },
      ]} />
      <GlassPanel title={t('Takvim', 'Calendar')}>
        <DataTable
          columns={[t('Tarih', 'Date'), t('Olay', 'Event'), t('Öncelik', 'Priority')]}
          rows={[
            ['26 Tem', t('KDV beyanname son gün', 'VAT filing deadline'), <Pill tone="down">{t('Yüksek', 'High')}</Pill>],
            ['26 Tem', t('Muhtasar son gün', 'Withholding deadline'), <Pill tone="down">{t('Yüksek', 'High')}</Pill>],
            ['31 Tem', t('SGK bildirimi', 'Social security filing'), <Pill tone="warn">{t('Orta', 'Medium')}</Pill>],
            ['17 Ağu', t('Geçici vergi', 'Provisional tax'), <Pill tone="info">{t('Normal', 'Normal')}</Pill>],
          ]}
        />
      </GlassPanel>
    </BizPage>
  );
}

export function EBelgePage() {
  const t = useT();
  return (
    <BizPage title={t('e-Belgeler', 'e-Documents')} subtitle={t('e-Fatura, e-Arşiv ve e-İrsaliye kutusu.', 'e-Invoice, e-Archive and e-Despatch inbox.')} actions={<PrimaryBtn>{t('GİB Senkron', 'Sync GIB')}</PrimaryBtn>}>
      <StatStrip items={[
        { label: t('Gelen', 'Inbox'), value: '36' },
        { label: t('Giden', 'Outbox'), value: '52' },
        { label: t('Hatalı', 'Failed'), value: '2', tone: 'down' },
        { label: t('Bu Ay', 'This Month'), value: '88' },
      ]} />
      <GlassPanel title={t('Belge Kutusu', 'Document Inbox')}>
        <DataTable
          columns={[t('UUID', 'UUID'), t('Tür', 'Type'), t('Cari', 'Party'), t('Tutar', 'Amount'), t('Durum', 'Status')]}
          rows={[
            ['8f2a…c1', 'e-Fatura', 'Delta Gıda', money(128900), <Pill tone="up">{t('Onaylı', 'Accepted')}</Pill>],
            ['91bc…22', 'e-Arşiv', 'Nova Tekstil', money(36200), <Pill tone="up">{t('İletildi', 'Sent')}</Pill>],
            ['aa10…77', 'e-İrsaliye', 'Anadolu Lojistik', '—', <Pill tone="warn">{t('Bekliyor', 'Pending')}</Pill>],
            ['c0de…09', 'e-Fatura', 'Metro Tedarik', money(28600), <Pill tone="down">{t('Red', 'Rejected')}</Pill>],
          ]}
        />
      </GlassPanel>
    </BizPage>
  );
}

export function DestekPage() {
  const t = useT();
  return (
    <BizPage title={t('Destek', 'Support')} subtitle={t('Yardım merkezi, talepler ve bilgilendirme.', 'Help center, tickets and guides.')}>
      <div className="biz-split">
        <GlassPanel title={t('Açık Talepler', 'Open Tickets')}>
          <DataTable
            columns={[t('No', 'ID'), t('Konu', 'Subject'), t('Durum', 'Status')]}
            rows={[
              ['#1042', t('e-Fatura entegrasyon hatası', 'e-Invoice integration error'), <Pill tone="warn">{t('İşleniyor', 'In progress')}</Pill>],
              ['#1038', t('KDV raporu dışa aktarma', 'VAT report export'), <Pill tone="up">{t('Çözüldü', 'Resolved')}</Pill>],
            ]}
          />
        </GlassPanel>
        <GlassPanel title={t('Hızlı Yardım', 'Quick Help')}>
          <ul className="biz-list">
            <li>{t('e-Belge kurulum rehberi', 'e-Document setup guide')}</li>
            <li>{t('Banka mutabakatı nasıl yapılır?', 'How to reconcile a bank account')}</li>
            <li>{t('Cenan AI fatura analizi', 'Cenan AI invoice analysis')}</li>
            <li>{t('Destek: destek@cenan.io', 'Support: destek@cenan.io')}</li>
          </ul>
          <div style={{ marginTop: 12 }}><PrimaryBtn>{t('Yeni Talep', 'New Ticket')}</PrimaryBtn></div>
        </GlassPanel>
      </div>
    </BizPage>
  );
}
