import type { ProjectType } from "@/types";

export const projectTypes: ProjectType[] = [
  {
    id: "residential",
    label: {
      he: "בנייה פרטית ושיפוץ לדירות ובתים פרטיים",
      en: "Private homes & residential renovations",
    },
  },
  {
    id: "commercial",
    label: {
      he: "עיצוב חללים מסחריים",
      en: "Commercial interior design",
    },
  },
  {
    id: "single-spaces",
    label: {
      he: "תכנון ועיצוב חללים בודדים, מטבחים, חללים ציבוריים",
      en: "Single-space planning & design, including kitchens and main living areas",
    },
  },
];
