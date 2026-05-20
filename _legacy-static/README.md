# ספיר כהן — אתר אדריכלות ועיצוב פנים

אתר תדמית דו-לשוני (עברית / אנגלית) בעיצוב מינימליסטי שחור-לבן-אפור.

## הפעלה מקומית

פתחי את `index.html` בדפדפן, או הריצי שרת מקומי:

```powershell
cd C:\Users\noyzi\sapir-cohen-architect
python -m http.server 8080
```

ואז גלשי ל: http://localhost:8080

## הוספת תמונות לפרויקט

1. צרי תיקייה: `images/portfolio/<slug>/`
2. שימי את התמונה הראשית בשם `cover.jpg`
3. לגלריה (למשל דופלקס ברמת אביב) — הוסיפי תמונות נוספות באותה תיקייה והגדירי מערך `gallery` ב-`js/projects.js`
4. ה-slug לכל פרויקט מופיע ב-`js/projects.js`

| פרויקט | תיקייה |
|--------|--------|
| הבית בנווה ים | `beit-neve-yam` |
| דופלקס ברמת אביב | `duplex-ramat-aviv` |
| ג'וזף בר | `joseph-bar` |
| ספא בוטיק | `boutique-spa` |
| שדרוג דירת קבלן | `contractor-upgrade` |

## עדכון אימייל

ערכי את הקישור ב-`index.html` בשורת `contactEmail` (כרגע placeholder).

## מבנה

- `index.html` — עמוד ראשי
- `css/styles.css` — עיצוב
- `js/translations.js` — תרגומים
- `js/projects.js` — פרויקטים בתיק העבודות
- `js/main.js` — שפה, תפריט, טופס
