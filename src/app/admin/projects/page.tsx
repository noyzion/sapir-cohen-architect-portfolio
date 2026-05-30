import { DocEditor } from "@/components/admin/DocEditor";

export const dynamic = "force-dynamic";

export default function AdminProjectsPage() {
  return (
    <DocEditor
      docKey="projects"
      title="פרויקטים"
      description="כל פרויקט כולל שם, סוג, מיקום, תיאור, תמונת שער, תמונה ממוזערת, גלריה והדמיות. ניתן להוסיף פרויקט חדש בלחיצה על 'הוספת פריט', לשנות סדר ולמחוק. חשוב: 'מזהה כתובת (slug)' חייב להיות באנגלית וייחודי לכל פרויקט (הוא קובע את כתובת העמוד)."
    />
  );
}
