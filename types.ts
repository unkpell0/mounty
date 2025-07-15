
import type { ReactNode } from 'react';

export interface ServicePackage {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  details: string[];
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Testimonial {
    quote: string;
    name: string;
    role: string;
    image: string;
}
