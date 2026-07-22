export interface Currency {
  code: string
  name: string
  flag: string
  region: string
}

export const TOP_CURRENCIES: Currency[] = [
  { code: 'USD', name: 'ABD Doları', flag: '🇺🇸', region: 'major' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', region: 'major' },
  { code: 'JPY', name: 'Japon Yeni', flag: '🇯🇵', region: 'major' },
  { code: 'GBP', name: 'İngiliz Sterlini', flag: '🇬🇧', region: 'major' },
  { code: 'CNY', name: 'Çin Yuanı', flag: '🇨🇳', region: 'major' },
  { code: 'CHF', name: 'İsviçre Frangı', flag: '🇨🇭', region: 'major' },
  { code: 'AUD', name: 'Avustralya Doları', flag: '🇦🇺', region: 'major' },
  { code: 'CAD', name: 'Kanada Doları', flag: '🇨🇦', region: 'major' },
  { code: 'HKD', name: 'Hong Kong Doları', flag: '🇭🇰', region: 'asia' },
  { code: 'SGD', name: 'Singapur Doları', flag: '🇸🇬', region: 'asia' },
]

export const OTHER_CURRENCIES: Currency[] = [
  { code: 'KRW', name: 'Güney Kore Wonu', flag: '🇰🇷', region: 'asia' },
  { code: 'INR', name: 'Hindistan Rupisi', flag: '🇮🇳', region: 'asia' },
  { code: 'TWD', name: 'Tayvan Doları', flag: '🇹🇼', region: 'asia' },
  { code: 'THB', name: 'Tayland Bahtı', flag: '🇹🇭', region: 'asia' },
  { code: 'IDR', name: 'Endonezya Rupisi', flag: '🇮🇩', region: 'asia' },
  { code: 'MYR', name: 'Malezya Ringgiti', flag: '🇲🇾', region: 'asia' },
  { code: 'PHP', name: 'Filipinler Pesosu', flag: '🇵🇭', region: 'asia' },
  { code: 'VND', name: 'Vietnam Dongu', flag: '🇻🇳', region: 'asia' },
  { code: 'SEK', name: 'İsveç Kronu', flag: '🇸🇪', region: 'europe' },
  { code: 'NOK', name: 'Norveç Kronu', flag: '🇳🇴', region: 'europe' },
  { code: 'DKK', name: 'Danimarka Kronu', flag: '🇩🇰', region: 'europe' },
  { code: 'PLN', name: 'Polonya Zlotisi', flag: '🇵🇱', region: 'europe' },
  { code: 'CZK', name: 'Çek Kronu', flag: '🇨🇿', region: 'europe' },
  { code: 'HUF', name: 'Macar Forinti', flag: '🇭🇺', region: 'europe' },
  { code: 'RON', name: 'Romanya Leyi', flag: '🇷🇴', region: 'europe' },
  { code: 'TRY', name: 'Türk Lirası', flag: '🇹🇷', region: 'europe' },
  { code: 'MXN', name: 'Meksika Pesosu', flag: '🇲🇽', region: 'latam' },
  { code: 'BRL', name: 'Brezilya Reali', flag: '🇧🇷', region: 'latam' },
  { code: 'CLP', name: 'Şili Pesosu', flag: '🇨🇱', region: 'latam' },
  { code: 'COP', name: 'Kolombiya Pesosu', flag: '🇨🇴', region: 'latam' },
  { code: 'ARS', name: 'Arjantin Pesosu', flag: '🇦🇷', region: 'latam' },
  { code: 'PEN', name: 'Peru Solü', flag: '🇵🇪', region: 'latam' },
  { code: 'AED', name: 'BAE Dirhemi', flag: '🇦🇪', region: 'mea' },
  { code: 'SAR', name: 'Suudi Arabistan Riyali', flag: '🇸🇦', region: 'mea' },
  { code: 'ILS', name: 'İsrail Şekeli', flag: '🇮🇱', region: 'mea' },
  { code: 'ZAR', name: 'Güney Afrika Randı', flag: '🇿🇦', region: 'mea' },
  { code: 'EGP', name: 'Mısır Poundu', flag: '🇪🇬', region: 'mea' },
  { code: 'NGN', name: 'Nijerya Nairası', flag: '🇳🇬', region: 'mea' },
  { code: 'NZD', name: 'Yeni Zelanda Doları', flag: '🇳🇿', region: 'other' },
  { code: 'RUB', name: 'Rus Rublesi', flag: '🇷🇺', region: 'other' },
  { code: 'KZT', name: 'Kazakistan Tengesi', flag: '🇰🇿', region: 'other' },
  { code: 'UAH', name: 'Ukrayna Grivnası', flag: '🇺🇦', region: 'other' },
  { code: 'QAR', name: 'Katar Riyali', flag: '🇶🇦', region: 'other' },
  { code: 'KWD', name: 'Kuveyt Dinarı', flag: '🇰🇼', region: 'other' },
  { code: 'BHD', name: 'Bahreyn Dinarı', flag: '🇧🇭', region: 'other' },
  { code: 'OMR', name: 'Umman Riyali', flag: '🇴🇲', region: 'other' },
  { code: 'PKR', name: 'Pakistan Rupisi', flag: '🇵🇰', region: 'other' },
  { code: 'BDT', name: 'Bangladeş Takası', flag: '🇧🇩', region: 'other' },
  { code: 'LKR', name: 'Sri Lanka Rupisi', flag: '🇱🇰', region: 'other' },
  { code: 'MAD', name: 'Fas Dirhemi', flag: '🇲🇦', region: 'other' },
]

export const ALL_CURRENCIES = [...TOP_CURRENCIES, ...OTHER_CURRENCIES]
