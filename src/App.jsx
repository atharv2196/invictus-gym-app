import React, { useState, useEffect, useRef } from 'react';

// --- Local Image Imports ---
// This tells our build tool (Vite) to include these images in the final website.
import bgImage from './assets/bg.jpg';
import marcusImage from './assets/marcus.jpg';
import elenaImage from './assets/elena.jpg';
import davidImage from './assets/david.jpg';
import gallery1 from './assets/gallery1.jpg';
import gallery2 from './assets/gallery2.jpg';
import gallery3 from './assets/gallery3.jpg';
import gallery4 from './assets/gallery4.jpg';
import gallery5 from './assets/gallery5.jpg';
import gallery6 from './assets/gallery6.jpg';
import gallery7 from './assets/gallery7.jpg';
import gallery8 from './assets/gallery8.jpg';
import gallery9 from './assets/gallery9.jpg';
import gallery10 from './assets/gallery10.jpg';


// --- Helper Data ---
const trainers = [
  {
    name: 'Marcus "The Titan" Cole',
    specialty: 'Strength & Conditioning',
    bio: 'With over 15 years of experience, Marcus specializes in building raw strength and explosive power...',
    imgSrc: marcusImage, 
  },
  {
    name: 'Elena "Flex" Rodriguez',
    specialty: 'Functional Fitness & Mobility',
    bio: 'Elena believes fitness should enhance your daily life. She focuses on functional movements...',
    imgSrc: elenaImage,
  },
  {
    name: 'David "Cardio King" Chen',
    specialty: 'Endurance & HIIT',
    bio: 'Get your heart pumping with David. He designs high-intensity interval training programs...',
    imgSrc: davidImage,
  },
];

const facilities = [
  { icon: '🏋️', title: 'State-of-the-Art Weights', description: 'A vast selection of free weights, squat racks, and plate-loaded machines to challenge every muscle group.' },
  { icon: '🏃‍♀️', title: 'Cardio Zone', description: 'Treadmills, ellipticals, stair climbers, and stationary bikes with integrated screens to keep you motivated.' },
  { icon: '🧘‍♂️', title: 'Mind & Body Studio', description: 'A serene space for yoga, pilates, and meditation classes, helping you find balance and flexibility.' },
  { icon: '🥊', title: 'Functional Training Area', description: 'Equipped with kettlebells, battle ropes, and turf for dynamic workouts that mimic real-life movements.' },
  { icon: '🏊', title: 'Recovery Zone', description: 'Featuring saunas and ice baths to help soothe sore muscles and accelerate your recovery process.' },
  { icon: '🥤', title: 'Juice Bar', description: 'Refuel after your workout with our delicious and nutritious protein shakes, smoothies, and healthy snacks.' },
];

const galleryImages = [
  gallery1, gallery2, gallery3, gallery4, gallery5, 
  gallery6, gallery7, gallery8, gallery9, gallery10
];


// --- Reusable Components ---

const Section = ({ id, children, className = '' }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section 
      id={id} 
      ref={ref}
      className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ease-in ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
};

const SectionTitle = ({ children, className = '' }) => (
  <h2 className={`text-3xl md:text-4xl font-extrabold text-center text-white mb-2 tracking-wide ${className}`}>
    {children}
  </h2>
);

const SectionSubtitle = () => (
    <div className="w-24 h-1 bg-red-600 mx-auto mb-12"></div>
);

const Logo = () => (
    <svg className="h-8 w-8 text-red-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 4c4.418 0 8 3.582 8 8s-3.582 8 -8 8s-8 -3.582 -8 -8s3.582 -8 8 -8z" />
        <path d="M12 4v16" />
        <path d="M4 12h16" />
        <path d="M8.5 8.5l7 7" />
        <path d="M8.5 15.5l7 -7" />
    </svg>
);


// --- Page Sections ---

const Header = ({ onNavClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'Our Facilities', 'Trainers', 'Images', 'About & Contact'];
  
  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    onNavClick(targetId);
    setIsOpen(false);
  };
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isOpen ? 'bg-black bg-opacity-90 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#home" onClick={(e) => handleLinkClick(e, 'home')} className="flex items-center gap-3 text-2xl font-bold text-white tracking-wider">
              <Logo />
              <span>INVICTUS <span className="text-red-600">GYM</span></span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => {
                const targetId = link.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
                return (
                  <a
                    key={link}
                    href={`#${targetId}`}
                    onClick={(e) => handleLinkClick(e, targetId)}
                    className="text-gray-300 hover:bg-red-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                  >
                    {link}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 sm:px-3">
            {navLinks.map((link) => {
               const targetId = link.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
              return (
                <a
                  key={link}
                  href={`#${targetId}`}
                  onClick={(e) => handleLinkClick(e, targetId)}
                  className="block text-gray-300 hover:bg-red-700 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                >
                  {link}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

const Home = () => (
    <section id="home" className="relative h-screen flex items-center justify-center text-white text-center p-4">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }} 
        ></div>
        <div className="relative z-10 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase tracking-wider mb-4">
                Unleash Your <span className="text-red-600">Inner Warrior</span>
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-300">
                Forge your strength. Conquer your goals. Become Invictus.
            </p>
            <a 
                href="#our-facilities"
                className="bg-red-600 text-white font-bold py-3 px-8 rounded-full text-lg uppercase hover:bg-red-700 transition-transform transform hover:scale-105 duration-300 shadow-lg"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('our-facilities')?.scrollIntoView({ behavior: 'smooth' });
                }}
            >
                Explore a new journey
            </a>
        </div>
    </section>
);


const Facilities = () => (
  <Section id="our-facilities" className="bg-gray-900">
    <SectionTitle>Our World-Class Facilities</SectionTitle>
    <SectionSubtitle />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {facilities.map((facility, index) => (
        <div key={index} className="bg-black p-6 rounded-lg shadow-md hover:shadow-red-600/50 transition-shadow duration-300 transform hover:-translate-y-2">
          <div className="text-5xl mb-4 text-red-600">{facility.icon}</div>
          <h3 className="text-xl font-bold text-white mb-2">{facility.title}</h3>
          <p className="text-gray-400">{facility.description}</p>
        </div>
      ))}
    </div>
  </Section>
);

const Trainers = () => (
  <Section id="trainers" className="bg-black">
    <SectionTitle>Meet Our Expert Trainers</SectionTitle>
    <SectionSubtitle />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {trainers.map((trainer, index) => (
        <div key={index} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg group transition-all duration-300 hover:shadow-2xl hover:shadow-red-700/40">
          <div className="relative overflow-hidden h-80">
            <img src={trainer.imgSrc} alt={trainer.name} className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </div>
          <div className="p-6 relative">
             <h3 className="text-2xl font-bold text-white">{trainer.name}</h3>
            <p className="text-red-500 font-semibold mb-3">{trainer.specialty}</p>
            <p className="text-gray-400">{trainer.bio}</p>
          </div>
        </div>
      ))}
    </div>
  </Section>
);

const Images = () => (
  <Section id="images" className="bg-gray-900">
    <SectionTitle>Gym Gallery</SectionTitle>
    <SectionSubtitle />
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
      {galleryImages.map((src, index) => (
        <div key={index} className="mb-4 break-inside-avoid overflow-hidden rounded-lg shadow-md">
           <img
            src={src}
            alt={`Gym gallery image ${index + 1}`}
            className="w-full h-auto object-cover transform transition-transform duration-500 hover:scale-110"
          />
        </div>
      ))}
    </div>
  </Section>
);

const AboutContact = () => (
    <Section id="about-contact" className="bg-black">
        <div className="text-center">
            <SectionTitle>About Invictus</SectionTitle>
            <SectionSubtitle />
            <p className="text-gray-300 mb-12 max-w-3xl mx-auto text-lg">
                Invictus Gym was founded on a simple principle: to create a powerful, motivating environment where anyone can achieve their peak physical condition. We're not just a gym; we're a community of determined individuals who support and push each other to be better every day.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
                <SectionTitle className="text-left lg:text-center">Get In Touch</SectionTitle>
                <div className="w-24 h-1 bg-red-600 mb-8 lg:mx-auto"></div>
                <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-600" />
                    <input type="email" placeholder="Your Email" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-600" />
                    <textarea placeholder="Your Message" rows="5" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-600"></textarea>
                    <button type="submit" className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-md text-lg uppercase hover:bg-red-700 transition-all duration-300">Send Message</button>
                </form>
            </div>
            <div>
                <SectionTitle className="text-left lg:text-center">Our Location</SectionTitle>
                <div className="w-24 h-1 bg-red-600 mb-8 lg:mx-auto"></div>
                <div className="bg-gray-900 p-6 rounded-lg">
                  <p className="text-lg font-semibold text-white mb-2">Invictus Gym</p>
                  <p className="text-gray-400 mb-4">
                    123 Fitness Avenue, Sector 24, <br />
                    Pimpri-Chinchwad, Maharashtra, 411044 <br />
                    India
                  </p>
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border-2 border-gray-700">
                       <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121058.63615469637!2d73.7394752445856!3d18.649550424513653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b82071f49e41%3A0x28af317f86708759!2sPimpri-Chinchwad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1694602055273!5m2!1sen!2sin"
                          width="600"
                          height="450"
                          style={{border:0}}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="w-full h-full"
                        ></iframe>
                  </div>
                </div>
            </div>
        </div>
    </Section>
);

const Footer = () => (
  <footer className="bg-gray-900 border-t border-gray-800 py-8 text-center">
    <div className="flex justify-center space-x-6 mb-4">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-red-600 transition-colors duration-300">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 8 0zm0 1.442c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.282.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.231 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.275-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.843-.038 1.096-.047 3.232-.047zM8 4.865a3.135 3.135 0 1 0 0 6.27 3.135 3.135 0 0 0 0-6.27zM8 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4.5-5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            </svg>
        </a>
    </div>
    <p className="text-gray-400">&copy; {new Date().getFullYear()} Invictus Gym. All Rights Reserved.</p>
    <p className="text-gray-500 text-sm mt-2">Unleash Your Potential.</p>
  </footer>
);


// --- Main App Component ---
export default function App() {

  const handleNavClick = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      // The 80px offset is to account for the fixed header height
      const offset = 80; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-black text-gray-200 font-sans">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        .aspect-w-16 { position: relative; padding-bottom: 56.25%; }
        .aspect-h-9 { }
        .aspect-w-16 > *, .aspect-h-9 > * { position: absolute; height: 100%; width: 100%; top: 0; right: 0; bottom: 0; left: 0; }
      `}</style>

      <Header onNavClick={handleNavClick} />
      
      <main>
        <Home />
        <Facilities />
        <Trainers />
        <Images />
        <AboutContact />
      </main>
      
      <Footer />
    </div>
  );
}

