export interface PreparationStep {
  title: string;
  text: string;
}

export interface Profile {
  id: string;
  email: string;
  has_access: boolean;
  activated_at: string | null;
}

export interface LicenseKey {
  key: string;
  lemonsqueezy_order_id: string;
  status: "valid" | "redeemed";
  redeemed_by: string | null;
  redeemed_at: string | null;
}

export interface Remedy {
  id: string;
  slug: string;
  name: string;
  name_latin: string;
  category: string;
  summary: string;
  traditional_use: string;
  preparation_steps: PreparationStep[];
  ingredients: string[];
  symptoms: string[];
  dosage_note: string;
  contraindications: string[];
  interactions: string[];
  pregnancy_warning: boolean;
  pregnancy_warning_text: string;
  allergy_note: string;
  sources: string[];
  is_teaser: boolean;
}

export interface RemedyTeaser {
  id: string;
  slug: string;
  name: string;
  name_latin: string;
  category: string;
  summary: string;
  symptoms: string[];
  is_teaser: true;
}
