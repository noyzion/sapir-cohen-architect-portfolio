import { DocEditor } from "@/components/admin/DocEditor";

export const dynamic = "force-dynamic";

export default function AdminProjectsPage() {
  return (
    <DocEditor
      docKey="projects"
      title="פרויקטים"
      description="כל פרויקט כולל שם, סוג, מיקום, תיאור, תמונת שער, תמונה ממוזערת, גלריה והדמיות. מזהה הכתובת (slug) מתעדכן אוטומטית מהשם באנגלית - ניתן לערוך אותו ידנית. ניתן להוסיף פרויקט חדש בלחיצה על 'הוספת פריט'."
    />
  );
}
