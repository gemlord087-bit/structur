
import React from 'react';

export const LogoIcon: React.FC = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gem-blue">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


export const MagicWandIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2"
  >
    <path d="M15 4V2" />
    <path d="M15 10V8" />
    <path d="M12.5 6.5h-5" />
    <path d="m3 14 1.5-1.5" />
    <path d="m21 14-1.5-1.5" />
    <path d="m14.5 12.5 1 1" />
    <path d="m6 3 1 1" />
    <path d="m18 3-1 1" />
    <path d="M9.5 12.5 9 12" />
    <path d="M15 22v-4.5" />
    <path d="m12.5 17.5-2-2" />
    <path d="m17.5 17.5 2-2" />
    <path d="M12.5 12.5 15 10l-5-5-2.5 2.5L12.5 12.5Z" />
  </svg>
);

export const ClipboardIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
  </svg>
);

export const DEFAULT_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sunnydale Elementary School</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Nunito', sans-serif;
        }
        .wave-shape {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            overflow: hidden;
            line-height: 0;
        }
        .wave-shape svg {
            position: relative;
            display: block;
            width: calc(100% + 1.3px);
            height: 60px;
        }
        .blob-shape {
            border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
        }
    </style>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#2563EB',   // Blue
                        secondary: '#F59E0B', // Amber
                        accent: '#10B981',    // Emerald
                        danger: '#EF4444',    // Red
                        brand: {
                            light: '#E0F2FE',
                            dark: '#1E3A8A',
                        }
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-white text-slate-700 overflow-x-hidden">

    <!-- Top Bar -->
    <div class="bg-brand-dark text-white py-2 text-sm hidden md:block">
        <div class="container mx-auto px-4 flex justify-between items-center">
            <div class="flex items-center space-x-6">
                <div class="flex items-center gap-2">
                    <i data-lucide="phone" class="w-4 h-4 text-secondary"></i>
                    <span>(555) 123-4567</span>
                </div>
                <div class="flex items-center gap-2">
                    <i data-lucide="mail" class="w-4 h-4 text-secondary"></i>
                    <span>office@sunnydale.edu</span>
                </div>
                <div class="flex items-center gap-2">
                    <i data-lucide="map-pin" class="w-4 h-4 text-secondary"></i>
                    <span>123 Sunshine Blvd, Springfield</span>
                </div>
            </div>
            <div class="flex items-center space-x-4">
                <a href="#" class="hover:text-secondary transition">Calendar</a>
                <a href="#" class="hover:text-secondary transition">Staff Directory</a>
                <a href="#" class="hover:text-secondary transition">Lunch Menu</a>
            </div>
        </div>
    </div>

    <!-- Navigation -->
    <nav class="bg-white shadow-md sticky top-0 z-50">
        <div class="container mx-auto px-4 py-3">
            <div class="flex justify-between items-center">
                <!-- Logo -->
                <a href="#" class="flex items-center gap-2 group">
                    <div class="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white group-hover:rotate-12 transition duration-300">
                        <i data-lucide="sun" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <h1 class="text-2xl font-extrabold text-brand-dark leading-none">Sunnydale</h1>
                        <span class="text-xs text-primary font-bold tracking-widest uppercase">Elementary</span>
                    </div>
                </a>

                <!-- Desktop Menu -->
                <div class="hidden lg:flex items-center space-x-8 font-bold text-slate-600">
                    <a href="#" class="text-primary hover:text-secondary transition">Home</a>
                    <a href="#" class="hover:text-primary transition">About Us</a>
                    <a href="#" class="hover:text-primary transition">Academics</a>
                    <a href="#" class="hover:text-primary transition">Admissions</a>
                    <a href="#" class="hover:text-primary transition">Student Life</a>
                    <a href="#" class="px-6 py-2 bg-primary text-white rounded-full hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2">
                        <i data-lucide="user" class="w-4 h-4"></i> Parent Portal
                    </a>
                </div>

                <!-- Mobile Menu Button -->
                <button onclick="document.getElementById('mobile-menu').classList.toggle('hidden')" class="lg:hidden p-2 text-slate-600 hover:text-primary">
                    <i data-lucide="menu" class="w-8 h-8"></i>
                </button>
            </div>
        </div>

        <!-- Mobile Menu Dropdown -->
        <div id="mobile-menu" class="hidden lg:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-lg">
            <a href="#" class="block font-bold text-primary">Home</a>
            <a href="#" class="block font-bold text-slate-600">About Us</a>
            <a href="#" class="block font-bold text-slate-600">Academics</a>
            <a href="#" class="block font-bold text-slate-600">Admissions</a>
            <a href="#" class="block font-bold text-slate-600">Student Life</a>
            <a href="#" class="block w-full text-center py-3 bg-brand-dark text-white rounded-lg font-bold">Parent Portal Login</a>
        </div>
    </nav>

    <!-- Hero Section -->
    <header class="relative bg-brand-light pt-16 pb-32 overflow-hidden">
        <div class="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div class="space-y-6 text-center lg:text-left">
                <div class="inline-block px-4 py-1 bg-white text-secondary font-bold rounded-full text-sm shadow-sm mb-2">
                    Now Enrolling for Fall 2024! 🎒
                </div>
                <h2 class="text-4xl md:text-6xl font-extrabold text-brand-dark leading-tight">
                    Nurturing Minds, <br/>
                    <span class="text-primary">Building Futures.</span>
                </h2>
                <p class="text-lg md:text-xl text-slate-600 max-w-lg mx-auto lg:mx-0">
                    Welcome to Sunnydale Elementary, where every child is encouraged to dream, discover, and grow in a safe and inclusive environment.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                    <a href="#" class="px-8 py-4 bg-secondary text-white font-bold rounded-full shadow-lg hover:bg-yellow-500 transition transform hover:-translate-y-1 flex justify-center items-center gap-2">
                        Schedule a Tour <i data-lucide="arrow-right" class="w-5 h-5"></i>
                    </a>
                    <a href="#" class="px-8 py-4 bg-white text-brand-dark font-bold rounded-full shadow-md hover:bg-gray-100 transition border-2 border-transparent hover:border-brand-dark flex justify-center items-center gap-2">
                        <i data-lucide="play-circle" class="w-5 h-5 text-danger"></i> Watch Video
                    </a>
                </div>
            </div>
            <div class="relative">
                <!-- Abstract Background blobs -->
                <div class="absolute -top-10 -right-10 w-72 h-72 bg-secondary opacity-20 rounded-full blur-3xl"></div>
                <div class="absolute -bottom-10 -left-10 w-72 h-72 bg-primary opacity-20 rounded-full blur-3xl"></div>
                
                <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition duration-500">
                    <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Happy students learning" class="w-full h-[400px] object-cover">
                </div>
                <!-- Floating Card -->
                <div class="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl hidden md:flex items-center gap-3 animate-bounce" style="animation-duration: 3s;">
                    <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-accent">
                        <i data-lucide="shield-check" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500 font-bold uppercase">Safety First</p>
                        <p class="font-bold text-brand-dark">Secure Campus</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- SVG Wave -->
        <div class="wave-shape">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="fill-white"></path>
            </svg>
        </div>
    </header>

    <!-- Quick Stats -->
    <section class="py-12 bg-white">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div class="space-y-2">
                    <div class="text-4xl font-extrabold text-primary">25+</div>
                    <div class="text-sm font-bold text-slate-500 uppercase tracking-wide">Years of Excellence</div>
                </div>
                <div class="space-y-2">
                    <div class="text-4xl font-extrabold text-secondary">15:1</div>
                    <div class="text-sm font-bold text-slate-500 uppercase tracking-wide">Student Ratio</div>
                </div>
                <div class="space-y-2">
                    <div class="text-4xl font-extrabold text-accent">100%</div>
                    <div class="text-sm font-bold text-slate-500 uppercase tracking-wide">Certified Teachers</div>
                </div>
                <div class="space-y-2">
                    <div class="text-4xl font-extrabold text-danger">20+</div>
                    <div class="text-sm font-bold text-slate-500 uppercase tracking-wide">Extracurriculars</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <span class="text-primary font-extrabold text-sm uppercase tracking-widest">Why Choose Us</span>
                <h2 class="text-3xl md:text-4xl font-extrabold text-slate-800 mt-2 mb-4">More Than Just A Classroom</h2>
                <p class="text-slate-600">We focus on the whole child—academic, social, and emotional development—to prepare them for a bright future.</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <!-- Card 1 -->
                <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border-b-4 border-primary">
                    <div class="w-14 h-14 bg-blue-100 text-primary rounded-xl flex items-center justify-center mb-6">
                        <i data-lucide="book-open" class="w-7 h-7"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-800 mb-3">Innovative Curriculum</h3>
                    <p class="text-slate-600 leading-relaxed">Our curriculum blends traditional learning with modern technology and project-based activities.</p>
                </div>

                <!-- Card 2 -->
                <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border-b-4 border-secondary">
                    <div class="w-14 h-14 bg-yellow-100 text-secondary rounded-xl flex items-center justify-center mb-6">
                        <i data-lucide="heart" class="w-7 h-7"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-800 mb-3">Inclusive Community</h3>
                    <p class="text-slate-600 leading-relaxed">We foster a culture of kindness and respect where every student feels valued and supported.</p>
                </div>

                <!-- Card 3 -->
                <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border-b-4 border-accent">
                    <div class="w-14 h-14 bg-green-100 text-accent rounded-xl flex items-center justify-center mb-6">
                        <i data-lucide="sprout" class="w-7 h-7"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-800 mb-3">Holistic Growth</h3>
                    <p class="text-slate-600 leading-relaxed">From arts and sports to emotional intelligence, we help children discover their unique talents.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Programs Section -->
    <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
            <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <div>
                    <span class="text-secondary font-extrabold text-sm uppercase tracking-widest">Our Programs</span>
                    <h2 class="text-3xl md:text-4xl font-extrabold text-slate-800 mt-2">Explore Your Passion</h2>
                </div>
                <a href="#" class="text-primary font-bold hover:text-brand-dark flex items-center gap-2">
                    View All Programs <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </a>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- STEM -->
                <div class="group relative rounded-2xl overflow-hidden cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="STEM" class="w-full h-64 object-cover group-hover:scale-110 transition duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                        <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white mb-2">
                            <i data-lucide="flask-conical" class="w-5 h-5"></i>
                        </div>
                        <h3 class="text-white font-bold text-lg">S.T.E.M.</h3>
                        <p class="text-gray-200 text-sm">Robotics, Science & Math</p>
                    </div>
                </div>

                <!-- Arts -->
                <div class="group relative rounded-2xl overflow-hidden cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Arts" class="w-full h-64 object-cover group-hover:scale-110 transition duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                        <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white mb-2">
                            <i data-lucide="palette" class="w-5 h-5"></i>
                        </div>
                        <h3 class="text-white font-bold text-lg">Creative Arts</h3>
                        <p class="text-gray-200 text-sm">Music, Painting & Drama</p>
                    </div>
                </div>

                <!-- Sports -->
                <div class="group relative rounded-2xl overflow-hidden cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1558064340-be9853cc6d68?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Sports" class="w-full h-64 object-cover group-hover:scale-110 transition duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                        <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white mb-2">
                            <i data-lucide="trophy" class="w-5 h-5"></i>
                        </div>
                        <h3 class="text-white font-bold text-lg">Athletics</h3>
                        <p class="text-gray-200 text-sm">Teamwork & Physical Health</p>
                    </div>
                </div>

                <!-- Literacy -->
                <div class="group relative rounded-2xl overflow-hidden cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Reading" class="w-full h-64 object-cover group-hover:scale-110 transition duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                        <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white mb-2">
                            <i data-lucide="book" class="w-5 h-5"></i>
                        </div>
                        <h3 class="text-white font-bold text-lg">Literacy</h3>
                        <p class="text-gray-200 text-sm">Reading & Writing Workshop</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Events & News -->
    <section class="py-20 bg-brand-light">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-extrabold text-brand-dark">Happening at Sunnydale</h2>
            </div>

            <div class="grid lg:grid-cols-2 gap-10">
                <!-- Events List -->
                <div class="bg-white rounded-2xl p-8 shadow-lg">
                    <h3 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <i data-lucide="calendar" class="text-primary"></i> Upcoming Events
                    </h3>
                    
                    <div class="space-y-6">
                        <!-- Event Item -->
                        <div class="flex items-start gap-4 border-b border-gray-100 pb-4">
                            <div class="bg-primary/10 text-primary rounded-lg p-3 text-center min-w-[80px]">
                                <span class="block text-xs font-bold uppercase">OCT</span>
                                <span class="block text-2xl font-extrabold">15</span>
                            </div>
                            <div>
                                <h4 class="font-bold text-lg text-slate-800">Fall Science Fair</h4>
                                <p class="text-slate-500 text-sm mb-1">9:00 AM - 12:00 PM • Main Gym</p>
                                <p class="text-slate-600 text-sm">Students present their innovative science projects to parents and judges.</p>
                            </div>
                        </div>

                        <!-- Event Item -->
                        <div class="flex items-start gap-4 border-b border-gray-100 pb-4">
                            <div class="bg-secondary/10 text-secondary rounded-lg p-3 text-center min-w-[80px]">
                                <span class="block text-xs font-bold uppercase">OCT</span>
                                <span class="block text-2xl font-extrabold">22</span>
                            </div>
                            <div>
                                <h4 class="font-bold text-lg text-slate-800">Parent-Teacher Conference</h4>
                                <p class="text-slate-500 text-sm mb-1">4:00 PM - 7:00 PM • Classrooms</p>
                                <p class="text-slate-600 text-sm">Discuss your child's progress for the first semester.</p>
                            </div>
                        </div>

                        <!-- Event Item -->
                        <div class="flex items-start gap-4">
                            <div class="bg-accent/10 text-accent rounded-lg p-3 text-center min-w-[80px]">
                                <span class="block text-xs font-bold uppercase">NOV</span>
                                <span class="block text-2xl font-extrabold">05</span>
                            </div>
                            <div>
                                <h4 class="font-bold text-lg text-slate-800">Annual School Play</h4>
                                <p class="text-slate-500 text-sm mb-1">6:00 PM • Auditorium</p>
                                <p class="text-slate-600 text-sm">Join us for a magical performance of "The Wizard of Oz".</p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6 text-center">
                        <a href="#" class="inline-block text-primary font-bold hover:underline">View Full Calendar</a>
                    </div>
                </div>

                <!-- Latest News / Image -->
                <div class="bg-white rounded-2xl p-2 shadow-lg flex flex-col">
                    <div class="relative flex-1 rounded-xl overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1577896337318-2869d389d85c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Bus" class="w-full h-full object-cover">
                        <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-8">
                            <span class="bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">Latest News</span>
                            <h3 class="text-white font-bold text-2xl mb-2">New Eco-Friendly School Buses Arrive!</h3>
                            <p class="text-gray-200 text-sm mb-4">Sunnydale is proud to introduce electric buses to our fleet, reducing our carbon footprint.</p>
                            <a href="#" class="text-white font-bold underline text-sm">Read full story</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Call to Action -->
    <section class="py-24 bg-primary relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-full opacity-10">
            <div class="w-full h-full" style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
        </div>
        <div class="container mx-auto px-4 text-center relative z-10">
            <h2 class="text-3xl md:text-5xl font-extrabold text-white mb-6">Ready to Join the Family?</h2>
            <p class="text-blue-100 text-xl max-w-2xl mx-auto mb-10">Enrollment for the upcoming academic year is now open. Schedule a visit to see our campus and meet our amazing teachers.</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#" class="px-8 py-4 bg-secondary text-white font-bold rounded-full shadow-lg hover:bg-yellow-500 transition transform hover:-translate-y-1 text-lg">
                    Apply Now
                </a>
                <a href="#" class="px-8 py-4 bg-white text-primary font-bold rounded-full shadow-lg hover:bg-gray-100 transition transform hover:-translate-y-1 text-lg">
                    Contact Admissions
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-slate-900 text-white pt-16 pb-8">
        <div class="container mx-auto px-4">
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                <!-- Brand -->
                <div class="space-y-4">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white">
                            <i data-lucide="sun" class="w-5 h-5"></i>
                        </div>
                        <h3 class="text-xl font-bold">Sunnydale</h3>
                    </div>
                    <p class="text-slate-400 text-sm leading-relaxed">
                        Empowering students to become lifelong learners and responsible citizens in a diverse global society.
                    </p>
                    <div class="flex gap-4 pt-2">
                        <a href="#" class="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-primary transition"><i data-lucide="facebook" class="w-4 h-4"></i></a>
                        <a href="#" class="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-primary transition"><i data-lucide="twitter" class="w-4 h-4"></i></a>
                        <a href="#" class="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-primary transition"><i data-lucide="instagram" class="w-4 h-4"></i></a>
                    </div>
                </div>

                <!-- Links -->
                <div>
                    <h4 class="font-bold text-lg mb-6 text-secondary">Quick Links</h4>
                    <ul class="space-y-3 text-sm text-slate-300">
                        <li><a href="#" class="hover:text-white transition">About Us</a></li>
                        <li><a href="#" class="hover:text-white transition">Admissions</a></li>
                        <li><a href="#" class="hover:text-white transition">Academics</a></li>
                        <li><a href="#" class="hover:text-white transition">Staff Directory</a></li>
                        <li><a href="#" class="hover:text-white transition">Careers</a></li>
                    </ul>
                </div>

                <!-- Resources -->
                <div>
                    <h4 class="font-bold text-lg mb-6 text-secondary">Parents</h4>
                    <ul class="space-y-3 text-sm text-slate-300">
                        <li><a href="#" class="hover:text-white transition">Parent Portal</a></li>
                        <li><a href="#" class="hover:text-white transition">Lunch Menus</a></li>
                        <li><a href="#" class="hover:text-white transition">School Supply Lists</a></li>
                        <li><a href="#" class="hover:text-white transition">Bus Routes</a></li>
                        <li><a href="#" class="hover:text-white transition">PTA</a></li>
                    </ul>
                </div>

                <!-- Contact -->
                <div>
                    <h4 class="font-bold text-lg mb-6 text-secondary">Contact Us</h4>
                    <ul class="space-y-4 text-sm text-slate-300">
                        <li class="flex items-start gap-3">
                            <i data-lucide="map-pin" class="w-5 h-5 text-primary mt-0.5"></i>
                            <span>123 Sunshine Blvd,<br>Springfield, ST 12345</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <i data-lucide="phone" class="w-5 h-5 text-primary"></i>
                            <span>(555) 123-4567</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <i data-lucide="mail" class="w-5 h-5 text-primary"></i>
                            <span>office@sunnydale.edu</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                <p>&copy; 2024 Sunnydale Elementary School. All rights reserved.</p>
                <div class="flex gap-6">
                    <a href="#" class="hover:text-white">Privacy Policy</a>
                    <a href="#" class="hover:text-white">Terms of Use</a>
                    <a href="#" class="hover:text-white">Accessibility</a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        lucide.createIcons();
    </script>
</body>
</html>`;
