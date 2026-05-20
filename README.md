# ספיר כהן — אתר אדריכלות ועיצוב פנים

אתר דו-לשוני (עברית / אנגלית) בסגנון מינימליסטי פרימיום, בנוי ב-Next.js.

## הפעלה מקומית

```bash
cd C:\Users\noyzi\sapir-cohen-architect
npm install
npm run dev
```

פתחי: [http://localhost:3000](http://localhost:3000)

## מבנה הפרויקט

```
src/
  app/              # עמודים (ראשי + פרויקטים)
  components/
    layout/         # Header, Footer
    sections/       # Hero, About, Services, Portfolio...
    ui/             # רכיבי עזר
  context/          # LanguageProvider (RTL/LTR)
  data/             # תוכן, פרויקטים, שירותים
  types/            # TypeScript types
public/
  images/
    portfolio/      # תמונות לפי slug
```

## החלפת תמונות

| מיקום | נתיב |
|--------|------|
| תמונת Hero | `public/images/hero.jpg` |
| כיסוי פרויקט | `public/images/portfolio/<slug>/cover.jpg` |
| גלריה | קבצים נוספים באותה תיקייה + עדכון `src/data/projects.ts` |

**דופלקס ברמת אביב** — התמונות כבר ב-`public/images/portfolio/duplex-ramat-aviv/`.

## עריכת טקסטים

- **תוכן כללי (כותרות, אודות, יצירת קשר):** `src/data/siteCopy.ts`
- **חבילות שירות:** `src/data/services.ts`
- **פרויקטים:** `src/data/projects.ts`
- **תהליך עבודה:** `src/data/process.ts`
- **סוגי פרויקטים:** `src/data/projectTypes.ts`

## אימייל ווואטסאפ

ערכי ב-`src/data/siteCopy.ts`: `CONTACT_EMAIL`, `WHATSAPP_NUMBER`.

## בנייה לפרודקשן

```bash
npm run build
npm start
```
