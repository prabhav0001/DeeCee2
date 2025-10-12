"use client"

import React, { useState, useCallback } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle2, X } from "lucide-react";
import { FormInput } from "./components";
import { useContactValidation } from "./hooks";

export default function ContactPage(): React.ReactElement {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = useContactValidation(name, email, phone, message, consent);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      setSubmitted(true);
      setTimeout(() => {
        setName("");
        setEmail("");
        setPhone("");
        setTopic("General Inquiry");
        setMessage("");
        setConsent(false);
      }, 0);
    }
  }, [errors]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">Contact Us</h2>
      <p className="text-gray-700 mb-10 text-center max-w-2xl mx-auto text-sm sm:text-base">We'd love to hear from you! Fill out the form and our team will get in touch within 24 hours.</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-6">Get in touch</h3>
          <div className="space-y-6 text-sm">
            <a href="tel:+916376482804" className="flex items-center gap-4 text-gray-700 hover:text-rose-600 transition">
              <span className="p-3 rounded-full bg-rose-50 flex-shrink-0"><Phone className="w-5 h-5 text-rose-600" /></span>
              <span className="break-all">+91 63764 82804</span>
            </a>
            <a href="mailto:sumiteximjjn@gmail.com" className="flex items-center gap-4 text-gray-700 hover:text-rose-600 transition">
              <span className="p-3 rounded-full bg-rose-50 flex-shrink-0"><Mail className="w-5 h-5 text-rose-600" /></span>
              <span className="break-all">sumiteximjjn@gmail.com</span>
            </a>
            <div className="flex items-start gap-4 text-gray-700">
              <span className="p-3 rounded-full bg-rose-50 flex-shrink-0"><MapPin className="w-5 h-5 text-rose-600" /></span>
              <div>Swastik Tower, Joshiyo Ka Gatta.<div className="text-gray-500">Jhunjhunu, Rajasthan</div></div>
            </div>
            <div className="flex items-center gap-4 text-gray-700">
              <span className="p-3 rounded-full bg-rose-50 flex-shrink-0"><Clock className="w-5 h-5 text-rose-600" /></span>
              <span>Mon-Sat: 9:00 AM - 5:00 PM</span>
            </div>
          </div>
          <div className="mt-8">
            <div className="bg-gray-100 rounded-2xl p-6 text-sm text-gray-700">
              <p className="font-semibold mb-2">Response time</p>
              <p>We usually reply within a few hours on business days.</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          {submitted && (
            <div className="mb-6 flex items-center gap-4 bg-green-50 border border-green-200 text-green-700 p-4 rounded-2xl">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
              <span className="text-sm sm:text-base">Thanks! Your message has been sent. We'll get back to you soon.</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput label="Name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
              <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
              <FormInput label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit number" error={errors.phone} />
              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Topic</label>
                <select value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all">
                  <option>General Inquiry</option>
                  <option>Order Status</option>
                  <option>Returns & Refunds</option>
                  <option>Product Advice</option>
                  <option>Partnership</option>
                </select>
              </div>
            </div>
            <div className="w-full">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
              <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all" />
              {errors.message && <p className="text-red-600 text-xs mt-2 flex items-center gap-1"><X className="w-3 h-3" />{errors.message}</p>}
            </div>
            <label className="flex items-start gap-3 text-sm text-gray-700">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
              <span>I agree to be contacted by DEECEE HAIR regarding my inquiry.</span>
            </label>
            {errors.consent && <p className="text-red-600 text-xs">{errors.consent}</p>}
            <button type="submit" className="w-full bg-rose-600 text-white py-3 rounded-2xl font-semibold hover:bg-rose-700 transition shadow-lg" disabled={Object.keys(errors).length > 0 && !submitted}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
