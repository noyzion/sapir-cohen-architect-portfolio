import { DocEditor } from "@/components/admin/DocEditor";

export const dynamic = "force-dynamic";

export default function AdminTextsPage() {
  return (
    <DocEditor
      docKey="siteCopy"
      title="טקסטים באתר"
      description="עריכת כל הטקסטים והכותרות. כל שדה כולל גרסה בעברית ובאנגלית. ניתן לפתוח ולסגור כל קטע."
    />
  );
}
