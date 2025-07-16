import React, { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import type { ServicePackage, FaqItem, Testimonial } from './types';

// SVG ICONS ====================================================================
// Refactored to accept props for flexible styling
const TattooIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const BellyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14a3 3 0 013-3h0a3 3 0 013 3v1a3 3 0 01-3 3h0a3 3 0 01-3-3v-1z" />
    </svg>
);

const HangoverIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 10H5.236a2 2 0 00-1.789 2.894l3.536 7.072A2 2 0 008.736 21h6.528a2 2 0 001.789-2.894l-3.536-7.072a2 2 0 00-1.789-1.034zM15 9a3 3 0 100-6 3 3 0 000 6z" />
  </svg>
);

const ImmuneIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const LabIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);


// HOOK for scroll animations ===============================================
const useOnScreen = (options: IntersectionObserverInit) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isOnScreen, setIsOnScreen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsOnScreen(true);
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);

    return [ref, isOnScreen] as const;
};

// DATA =======================================================================
const servicesData: Omit<ServicePackage, 'id' | 'details'>[] = [
    { icon: <TattooIcon />, title: "Painless Tattoo", description: "Experience tattooing like never before. Our specialized IV drip minimizes pain and boosts your immune system for faster healing."},
    { icon: <BellyIcon />, title: "Bali Belly Rescue", description: "Don't let stomach troubles ruin your trip. Our Bali Belly package rehydrates and replenishes essential nutrients fast." },
    { icon: <HangoverIcon />, title: "Hangover Cure", description: "Recover from a night out in record time. Our IV drip flushes out toxins and restores hydration and energy levels." },
    { icon: <ImmuneIcon />, title: "Immune Booster", description: "Strengthen your body's defenses. Perfect for pre-flight, post-flight, or anytime you need a wellness boost." },
    { icon: <LabIcon />, title: "At-Home Lab Tests", description: "Need a lab test? Our on-call service provides fast, convenient Dengue fever testing at your location." },
];

const packagesData: ServicePackage[] = [
    { id: 'tattoo', icon: <TattooIcon />, title: "Painless Tattoo Package", description: "For the ultimate tattoo experience.", details: ["IV Pain Medication: A carefully administered dose to ensure comfort throughout your session.", "Immune Booster Cocktail: Packed with Vitamin C, B-Complex, and Zinc to support healing.", "Anti-inflammatory Agent: Reduces swelling and redness post-session.", "Supervised by Medical Professionals: Your safety and comfort are our top priorities."] },
    { id: 'bali-belly', icon: <BellyIcon />, title: "Bali Belly Rescue Package", description: "Get back on your feet and back to your vacation.", details: ["1L of IV Fluids & Electrolytes: Rapidly rehydrates and restores balance.", "Anti-Nausea Medication: Provides immediate relief from stomach discomfort.", "Probiotics & Vitamin Blend: Helps restore gut health and energy levels.", "On-call consultation with our medical team."] },
    { id: 'hangover', icon: <HangoverIcon />, title: "The After-Party Hangover Cure", description: "Erase the effects of a big night out.", details: ["Rehydration Fluids: A full liter of saline to combat dehydration.", "Detoxifying Antioxidants: Glutathione to help your liver process toxins.", "Energy-Boosting Vitamins: A potent mix of B-vitamins to fight fatigue.", "Pain & Nausea Relief: Medications to quickly ease headaches and stomach upset."] },
    { id: 'immune', icon: <ImmuneIcon />, title: "Wellness & Immune Boost", description: "Your shield against illness.", details: ["High-Dose Vitamin C: A powerful antioxidant to supercharge your immune system.", "B-Complex Vitamins: Essential for energy production and cellular health.", "Zinc & Magnesium: Key minerals for immune function and recovery.", "Glutathione Push: The master antioxidant for detoxification and cellular repair."] },
    { id: 'lab', icon: <LabIcon />, title: "On-Call Dengue Lab Test", description: "Fast, accurate results at your convenience.", details: ["Convenient At-Home Service: We come to your hotel, villa, or home.", "NS1 Antigen Test: Rapid, early detection of Dengue fever.", "Full Blood Count (CBC): To assess platelet levels and overall health.", "Results within hours, not days, with medical consultation available."] },
];

const faqData: FaqItem[] = [
    { question: "Is IV therapy safe?", answer: "Absolutely. All our IV therapies are administered by licensed and experienced medical professionals (nurses or doctors) following strict safety protocols. We use only high-quality, sterile equipment." },
    { question: "How long does a session take?", answer: "Most IV drip sessions take between 45 to 60 minutes. Our at-home lab tests are much quicker, typically taking only 15-20 minutes for the sample collection." },
    { question: "Do you come to my location?", answer: "Yes! Our core service is convenience. We provide our IV therapies and lab tests in the comfort of your hotel, villa, or home anywhere in our service area." },
    { question: "How do I book an appointment?", answer: "You can book an appointment by clicking the 'Book Now' button on our website, or by contacting us directly via WhatsApp or phone. We recommend booking in advance to secure your preferred time." },
];

const testimonialsData: Testimonial[] = [
    { quote: "The painless tattoo drip is a game-changer. I sat for 6 hours with almost no discomfort. The healing was noticeably faster too. Highly recommend!", name: "Alex R.", role: "Tattoo Enthusiast" },
    { quote: "Mounty Health saved my Bali holiday! The Bali Belly package had me feeling better in just a few hours. The nurse was so professional and kind.", name: "Samantha B.", role: "Tourist from Australia" },
    { quote: "Woke up feeling like a zombie after a friend's wedding. The hangover cure was like magic. 10/10 would do it again.", name: "Mike P.", role: "Wedding Guest" },
];


// UI COMPONENTS ==============================================================

const AnimatedSection: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = '' }) => {
    const [ref, isOnScreen] = useOnScreen({ threshold: 0.1 });
    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out ${isOnScreen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
        >
            {children}
        </div>
    );
};


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const navLinks = [
        { name: "Services", href: "#services" },
        { name: "Packages", href: "#packages" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "FAQ", href: "#faq" },
    ];

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <a href="#" className="text-2xl font-bold text-primary">
                            Mounty<span className="text-accent">Health</span>
                        </a>
                        <nav className="hidden lg:flex items-center space-x-8">
                            {navLinks.map(link => (
                                 <a key={link.name} href={link.href} className="text-secondary hover:text-accent transition-colors duration-300">{link.name}</a>
                            ))}
                        </nav>
                        <a href="#contact" className="hidden lg:inline-block bg-accent text-white font-semibold px-5 py-2 rounded-lg hover:bg-accent-hover transition-all duration-300 shadow-md">
                            Book Now
                        </a>
                        <div className="lg:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-primary focus:outline-none z-[60] relative">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Overlay */}
            <div
                aria-hidden="true"
                className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            ></div>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-background shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                aria-label="Mobile Navigation"
            >
                <div className="p-8 pt-20">
                     <a href="#" className="text-2xl font-bold text-primary mb-12 block">
                        Mounty<span className="text-accent">Health</span>
                    </a>
                    <nav className="flex flex-col space-y-6">
                        {navLinks.map(link => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-xl text-primary hover:text-accent transition-colors duration-300 py-2"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>
                    <a
                        href="#contact"
                        onClick={() => setIsOpen(false)}
                        className="mt-12 inline-block w-full text-center bg-accent text-white font-semibold px-5 py-3 rounded-lg hover:bg-accent-hover transition-all duration-300 shadow-md"
                    >
                        Book Now
                    </a>
                </div>
            </aside>
        </>
    );
};

const Hero = () => (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
        <div className="relative z-20 text-center px-6">
            <AnimatedSection>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight tracking-tight text-primary">
                    Elevate Your Bali Experience.
                </h1>
                <p className="text-xl md:text-2xl text-secondary max-w-3xl mx-auto mb-8">
                    Premium IV therapies and on-call medical services, delivered directly to you.
                </p>
                <a href="#packages" className="bg-accent text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-accent-hover transition-all duration-300 transform hover:scale-105 shadow-xl">
                    Explore Our Packages
                </a>
            </AnimatedSection>
        </div>
        <div className="absolute bottom-10 z-20 animate-subtle-bob text-primary">
            <a href="#services" aria-label="Scroll down">
                <ChevronDownIcon />
            </a>
        </div>
    </section>
);

const ServicesSection = () => (
    <section id="services" className="py-20 md:py-32 bg-background-alt">
        <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Wellness, On Your Terms</h2>
                <p className="text-lg text-secondary max-w-2xl mx-auto">From recovery to prevention, our services are designed for the modern traveler and resident.</p>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {servicesData.map((service, index) => (
                    <div key={index} className="transform transition-all duration-500">
                        <AnimatedSection>
                            <div className="bg-background p-8 rounded-2xl h-full flex flex-col items-start shadow-lg border border-border hover:border-accent/50 hover:-translate-y-2 transition-all duration-300">
                                <div className="bg-background-alt p-3 rounded-full mb-6">
                                    {React.cloneElement(service.icon, { className: "h-8 w-8 text-accent"})}
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-primary">{service.title}</h3>
                                <p className="text-secondary">{service.description}</p>
                            </div>
                        </AnimatedSection>
                    </div>
                ))}
            </div>
        </div>
    </section>
);


const PackagesSection = () => {
    const [openPackage, setOpenPackage] = useState<string | null>(packagesData[0].id);

    return (
        <section id="packages" className="py-20 md:py-32 bg-background">
            <div className="container mx-auto px-6">
                 <AnimatedSection className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Our Signature Packages</h2>
                    <p className="text-lg text-secondary max-w-2xl mx-auto">Each package is a carefully curated blend of science and wellness, designed for maximum impact.</p>
                </AnimatedSection>
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    <div className="lg:w-1/3">
                        <AnimatedSection>
                        <div className="space-y-4">
                            {packagesData.map((pkg) => (
                                <button key={pkg.id} onClick={() => setOpenPackage(pkg.id)} className={`w-full text-left p-6 rounded-xl transition-all duration-300 border-2 ${openPackage === pkg.id ? 'bg-background-alt border-accent' : 'bg-background border-border hover:bg-background-alt'}`}>
                                    <div className="flex items-center gap-4">
                                        {React.cloneElement(pkg.icon, { className: "h-8 w-8 text-accent flex-shrink-0"})}
                                        <div>
                                            <h3 className="font-bold text-lg text-primary">{pkg.title}</h3>
                                            <p className="text-sm text-secondary">{pkg.description}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                        </AnimatedSection>
                    </div>
                    <div className="lg:w-2/3 mt-8 lg:mt-0">
                        <AnimatedSection>
                        <div className="relative">
                            {packagesData.map((pkg) => (
                                <div key={pkg.id} className={`transition-opacity duration-500 ${openPackage === pkg.id ? 'opacity-100' : 'opacity-0 absolute top-0 left-0 w-full pointer-events-none'}`}>
                                    <div className="bg-background-alt rounded-2xl overflow-hidden shadow-2xl border border-border">
                                        <div className="w-full h-64 flex items-center justify-center bg-background p-8 border-b border-border">
                                            <div className="w-32 h-32">
                                                {React.cloneElement(pkg.icon, { className: "w-full h-full text-accent" })}
                                            </div>
                                        </div>
                                        <div className="p-8">
                                            <h3 className="text-2xl font-bold text-primary mb-4">{pkg.title}</h3>
                                            <ul className="space-y-3">
                                                {pkg.details.map((detail, i) => (
                                                    <li key={i} className="flex items-start">
                                                        <svg className="w-5 h-5 text-accent mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                        <span className="text-secondary">{detail}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </section>
    );
};

const TestimonialsSection = () => (
    <section id="testimonials" className="py-20 md:py-32 bg-background-alt">
        <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">What Our Clients Say</h2>
                <p className="text-lg text-secondary max-w-2xl mx-auto">Real stories from people who chose Mounty Health to enhance their wellbeing.</p>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonialsData.map((testimonial, index) => (
                    <AnimatedSection key={index}>
                        <div className="bg-background p-8 rounded-2xl h-full flex flex-col justify-between shadow-lg border border-border">
                            <p className="text-secondary italic mb-6">"{testimonial.quote}"</p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full mr-4 bg-background-alt p-2 flex-shrink-0">
                                   <UserIcon className="w-full h-full text-secondary" />
                                </div>
                                <div>
                                    <p className="font-bold text-primary">{testimonial.name}</p>
                                    <p className="text-sm text-secondary">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </div>
    </section>
);


const FaqAccordion: React.FC<{ item: FaqItem, isOpen: boolean, onClick: () => void }> = ({ item, isOpen, onClick }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    return (
        <div className="border-b border-border">
            <button onClick={onClick} className="w-full flex justify-between items-center text-left py-6">
                <span className="text-lg font-semibold text-primary">{item.question}</span>
                <span className={`transform transition-transform duration-300 text-secondary ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDownIcon />
                </span>
            </button>
            <div 
                ref={contentRef}
                style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px' }}
                className="overflow-hidden transition-all duration-500 ease-in-out">
                <p className="pb-6 pr-6 text-secondary">{item.answer}</p>
            </div>
        </div>
    );
};

const FaqSection = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const handleFaqClick = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 md:py-32 bg-background">
            <div className="container mx-auto px-6">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Frequently Asked Questions</h2>
                    <p className="text-lg text-secondary max-w-2xl mx-auto">Got questions? We've got answers. Here are some of the most common things people ask.</p>
                </AnimatedSection>
                <AnimatedSection className="max-w-3xl mx-auto">
                    {faqData.map((item, index) => (
                        <FaqAccordion key={index} item={item} isOpen={openFaq === index} onClick={() => handleFaqClick(index)} />
                    ))}
                </AnimatedSection>
            </div>
        </section>
    );
};


const Footer = () => (
    <footer id="contact" className="bg-background-alt border-t border-border">
        <div className="container mx-auto px-6 py-16">
            <div className="text-center">
                 <AnimatedSection>
                    <h2 className="text-3xl font-bold text-primary mb-4">Ready to Feel Your Best?</h2>
                    <p className="text-secondary max-w-xl mx-auto mb-8">Contact us today to book your session or to get a personalized consultation from our medical team.</p>
                    <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="bg-accent text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-accent-hover transition-all duration-300 transform hover:scale-105 shadow-xl inline-block">
                        Book on WhatsApp
                    </a>
                </AnimatedSection>
            </div>
            <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <p className="text-secondary">&copy; {new Date().getFullYear()} Mounty Health Center. All Rights Reserved.</p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" className="text-secondary hover:text-accent transition-colors">Instagram</a>
                    <a href="#" className="text-secondary hover:text-accent transition-colors">Facebook</a>
                    <a href="#" className="text-secondary hover:text-accent transition-colors">Contact</a>
                </div>
            </div>
        </div>
    </footer>
);


// MAIN APP COMPONENT =========================================================
export default function App() {
  return (
    <div className="bg-background">
      <Header />
      <main>
        <Hero />
        <ServicesSection />
        <PackagesSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  )
}