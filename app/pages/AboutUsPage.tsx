"use client"

import React from "react";
import { Award, Users, Heart, Globe, Sparkles, Target, ShieldCheck, Zap } from "lucide-react";

export default function AboutUsPage(): React.ReactElement {
  const teamMembers = [
    {
      name: "Sumit Kyamsaria",
      role: "Founder & CEO",
      image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/founder.png",
      description: "With over 10 years of experience in the hair industry"
    },
    {
      name: "Prerak Kyamsaria",
      role: "Head of Sales",
      image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/head_of_sales.png",
      description: "Expert in hair styling and product development"
    },
    {
      name: "Prabhav Kyamsaria",
      role: "Marketing Manager",
      image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/marketing_manager.png",
      description: "Ensuring smooth operations and customer satisfaction"
    }
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: "Quality Assurance",
      description: "We guarantee 100% authentic human hair products that meet the highest standards"
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction is our priority. We're committed to exceeding your expectations"
    },
    {
      icon: Globe,
      title: "Global Standards",
      description: "Following international quality standards while maintaining affordable prices"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Continuously improving our products with the latest hair technology"
    }
  ];

  const milestones = [
    { year: "2015", event: "DEECEE HAIR Founded", description: "Started with a vision to provide premium hair solutions" },
    { year: "2017", event: "First Boutique Opened", description: "Opened our flagship store in Jhunjhunu" },
    { year: "2019", event: "Online Expansion", description: "Launched our e-commerce platform" },
    { year: "2021", event: "10,000+ Happy Customers", description: "Reached a milestone of serving thousands" },
    { year: "2023", event: "Pan-India Delivery", description: "Expanded delivery across all states" }
  ];

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-rose-50 opacity-50"></div>
        <div className="relative w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-rose-600">DEECEE HAIR</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Your trusted partner in premium hair extensions and solutions. We believe everyone deserves to feel beautiful and confident with luxurious, natural-looking hair.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Founded in 2015, DEECEE HAIR began with a simple mission: to provide premium quality hair extensions that look and feel natural. What started as a small boutique in Jhunjhunu, Rajasthan, has grown into a trusted brand serving customers across India.
                </p>
                <p>
                  We understand that hair is not just about appearance – it's about confidence, self-expression, and feeling your best every day. That's why we source only the finest 100% human hair and craft each product with meticulous attention to detail.
                </p>
                <p>
                  Today, we're proud to be the choice of thousands of satisfied customers who trust us for their hair extension needs. From straight to curly, short to long, we offer solutions for every style and preference.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/about_us_story.gif"
                alt="DEECEE HAIR Story"
                // className="rounded-2xl shadow-2xl w-full bg-white"
              />
              <div className="absolute -bottom-6 -right-6 bg-rose-600 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">8+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-rose-50 to-white p-8 rounded-2xl border border-rose-100">
              <div className="flex items-center gap-4 mb-4">
                <Target className="w-10 h-10 text-rose-600" />
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To empower individuals with premium hair solutions that enhance their natural beauty and boost their confidence. We strive to make luxury hair extensions accessible to everyone while maintaining the highest standards of quality and service.
              </p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-white p-8 rounded-2xl border border-rose-100">
              <div className="flex items-center gap-4 mb-4">
                <Sparkles className="w-10 h-10 text-rose-600" />
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To become India's most trusted and innovative hair extension brand, setting new standards in quality, variety, and customer satisfaction. We envision a future where everyone can achieve their dream hair effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at DEECEE HAIR
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-rose-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-rose-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals committed to bringing you the best hair solutions
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4 overflow-hidden rounded-2xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-rose-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 sm:py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Milestones that define our growth and commitment
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-rose-200"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="flex-1">
                    <div className={`bg-white p-6 rounded-2xl shadow-lg ${index % 2 === 0 ? 'mr-8 text-right' : 'ml-8'}`}>
                      <div className="text-rose-600 font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.event}</h3>
                      <p className="text-gray-600 text-sm">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-rose-50 to-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Award className="w-16 h-16 text-rose-600 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Recognition & Achievements</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="text-3xl font-bold text-rose-600 mb-2">10,000+</div>
              <div className="text-gray-700 font-medium">Happy Customers</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="text-3xl font-bold text-rose-600 mb-2">4.8/5</div>
              <div className="text-gray-700 font-medium">Average Rating</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="text-3xl font-bold text-rose-600 mb-2">500+</div>
              <div className="text-gray-700 font-medium">Premium Products</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="text-3xl font-bold text-rose-600 mb-2">24/7</div>
              <div className="text-gray-700 font-medium">Customer Support</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="text-3xl font-bold text-rose-600 mb-2">100%</div>
              <div className="text-gray-700 font-medium">Authentic Products</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="text-3xl font-bold text-rose-600 mb-2">Pan India</div>
              <div className="text-gray-700 font-medium">Delivery Network</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-rose-600">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Look?
          </h2>
          <p className="text-rose-100 text-lg mb-8">
            Explore our premium collection of hair extensions and find your perfect match
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/shop'}
              className="bg-white text-rose-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
            >
              Shop Collection
            </button>
            <button
              onClick={() => window.location.href = '/contact'}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-rose-600 transition transform hover:scale-105"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
