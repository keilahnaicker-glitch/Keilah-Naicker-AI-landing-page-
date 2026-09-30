export interface LandingPageVariables {
  businessType: string;
  service: string;
  painPoint: string;
  ctaText: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  companyName: string;
  phoneNumber?: string;
  emailAddress?: string;
  additionalNotes?: string;
}

export interface PresetTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  variables: LandingPageVariables;
  sampleHtml?: string;
}

export interface LeadSubmission {
  id: string;
  timestamp: string;
  fullName: string;
  phone: string;
  email: string;
  businessName: string;
}

export interface GeneratedHistoryItem {
  id: string;
  timestamp: string;
  title: string;
  variables: LandingPageVariables;
  htmlCode: string;
}
