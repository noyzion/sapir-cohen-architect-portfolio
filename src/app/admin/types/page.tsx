import { DocEditor } from "@/components/admin/DocEditor";

export const dynamic = "force-dynamic";

export default function AdminTypesPage() {
  return (
    <DocEditor
      docKey="projectTypes"
      title="סוגי פרויקטים"
      description="עריכת רשימת סוגי הפרויקטים בעמוד הבית."
    />
  );
}
