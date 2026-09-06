export interface WebsiteProfileData {
  id?: string;
  doctorName: string;
  title: string;
  specialization: string;
  qualification: string;
  experience: string;
  about: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  profileImage?: string | null;
  logoImage?: string | null;
  coverImage?: string | null;
}

export interface ServiceData {
  id?: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  icon: string;
  order?: number;
}

export interface GalleryImageData {
  id?: string;
  url: string;
  caption?: string | null;
}

export interface WebsiteDesignData {
  id?: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: "Modern" | "Professional" | "Minimal";
  buttonStyle: "Rounded" | "Square" | "Pill";
  headerStyle: "Classic" | "Modern" | "Centered";
}

export interface WebsiteData {
  id: string;
  name: string;
  slug: string;
  status: "LIVE" | "DRAFT";
  template: "modern-medical" | "professional-doctor" | "premium-clinic";
  userId?: string;
  profile?: WebsiteProfileData | null;
  services: ServiceData[];
  gallery: GalleryImageData[];
  design?: WebsiteDesignData | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
