import { DocEditor } from "@/components/admin/DocEditor";

export const dynamic = "force-dynamic";

export default function AdminServicesPage() {
  return (
    <DocEditor
      docKey="services"
      title="שירותים"
      description="עריכת המסלולים. ניתן לשנות סדר, להוסיף או למחוק מסלול ולסמן מסלול כ'מומלץ'."
    />
  );
}
