"use client"

import React, { useState, useMemo, useCallback } from "react";
import { Calendar, CheckCircle2 } from "lucide-react";
import { Appointment } from "./types";
import { FormInput } from "./components";
import { useFormValidation } from "./hooks";

type AppointmentPageProps = {
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  onNavigateHome: () => void;
};

export default function AppointmentPage({ appointments, setAppointments, onNavigateHome }: AppointmentPageProps): React.ReactElement {
  const [service, setService] = useState("Consultation");
  const [location, setLocation] = useState("Mumbai");
  const [date, setDate] = useState<string>(() => new Date().toISOString().split("T")[0]);
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState<Appointment | null>(null);

  const baseSlots = useMemo(() => ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"], []);

  const systemBlocked = useMemo(() => {
    const s = `${date}-${location}`;
    let hash = 0;
    for (let i = 0; i < s.length; i++) hash = (hash + s.charCodeAt(i) * 17) % 97;
    const idx1 = hash % baseSlots.length;
    const idx2 = (hash + 3) % baseSlots.length;
    return new Set([idx1, idx2]);
  }, [date, location, baseSlots]);

  const bookedSlots = useMemo(() => {
    const set = new Set<string>();
    appointments.filter((a) => a.date === date && a.location === location).forEach((a) => set.add(a.time));
    return set;
  }, [appointments, date, location]);

  const available = useMemo(() => baseSlots.map((t, i) => ({ time: t, disabled: systemBlocked.has(i) || bookedSlots.has(t) })), [baseSlots, systemBlocked, bookedSlots]);

  const baseErrors = useFormValidation({ name, email, phone });
  const formErrors = useMemo(() => {
    const errors = { ...baseErrors };
    if (!date) errors.date = "Select a date";
    if (!selectedTime) errors.time = "Select a time slot";
    return errors;
  }, [baseErrors, date, selectedTime]);

  const handleConfirm = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(formErrors).length > 0) return;
    const appt: Appointment = { id: `${Date.now()}`, service, location, date, time: selectedTime, name, email, phone, notes: notes.trim() || undefined };
    setAppointments((prev) => [...prev, appt]);
    setConfirmed(appt);
  }, [formErrors, service, location, date, selectedTime, name, email, phone, notes, setAppointments]);

  const resetForm = useCallback(() => {
    setService("Consultation");
    setLocation("Mumbai");
    setDate(new Date().toISOString().split("T")[0]);
    setSelectedTime("");
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setConfirmed(null);
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">Book an Appointment</h2>
      <p className="text-gray-700 mb-10 text-center max-w-2xl mx-auto text-sm sm:text-base px-4">Select your service, preferred boutique, and a convenient time. We'll send a confirmation to your email.</p>
      {confirmed ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4 text-green-700 bg-green-50 border border-green-200 p-4 rounded-2xl mb-6">
            <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
            <span className="text-sm sm:text-base">Appointment confirmed! A confirmation has been sent to {confirmed.email}.</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-sm text-gray-800">
            <div><p className="font-semibold">Service</p><p className="text-gray-600 truncate">{confirmed.service}</p></div>
            <div><p className="font-semibold">Location</p><p className="text-gray-600 truncate">{confirmed.location}</p></div>
            <div><p className="font-semibold">Date</p><p className="text-gray-600 truncate">{confirmed.date}</p></div>
            <div><p className="font-semibold">Time</p><p className="text-gray-600 truncate">{confirmed.time}</p></div>
            <div><p className="font-semibold">Name</p><p className="text-gray-600 truncate">{confirmed.name}</p></div>
            <div><p className="font-semibold">Phone</p><p className="text-gray-600 truncate">{confirmed.phone}</p></div>
            {confirmed.notes && <div className="md:col-span-2"><p className="font-semibold">Notes</p><p className="text-gray-600 truncate">{confirmed.notes}</p></div>}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button onClick={resetForm} className="bg-rose-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-rose-700 transition shadow-lg">
              Book Another Appointment
            </button>
            <button onClick={onNavigateHome} className="px-6 py-3 rounded-2xl font-semibold border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
              Back to Home
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleConfirm} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-6">Your Preferences</h3>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Service</label>
              <select value={service} onChange={(e) => setService(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all">
                <option>Consultation</option>
                <option>Installation</option>
                <option>Color Match</option>
                <option>Maintenance</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all">
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bengaluru</option>
                <option>Chennai</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
              <input type="date" min={new Date().toISOString().split("T")[0]} value={date} onChange={(e) => { setDate(e.target.value); setSelectedTime(""); }} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all" />
              {formErrors.date && <p className="text-red-600 text-xs mt-2">{formErrors.date}</p>}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-6">Available Time</h3>
            <div className="grid grid-cols-2 gap-3">
              {available.map((slot) => (
                <button type="button" key={slot.time} disabled={slot.disabled} onClick={() => setSelectedTime(slot.time)} className={`px-4 py-2 rounded-2xl border text-sm font-semibold transition-all duration-300 ${slot.disabled ? "border-gray-200 text-gray-400 cursor-not-allowed" : selectedTime === slot.time ? "border-rose-600 bg-rose-50 text-rose-700 shadow" : "border-gray-300 text-gray-700 hover:bg-rose-50"}`}>
                  {slot.time}
                </button>
              ))}
            </div>
            {formErrors.time && <p className="text-red-600 text-xs mt-3">{formErrors.time}</p>}
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-6">Your Details</h3>
            <div className="space-y-6">
              <FormInput label="Full Name" value={name} onChange={(e) => setName(e.target.value)} error={formErrors.name} />
              <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={formErrors.email} />
              <FormInput label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit number" error={formErrors.phone} />
              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Notes (optional)</label>
                <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all" />
              </div>
            </div>
            <button type="submit" className="mt-6 w-full bg-rose-600 text-white py-3 rounded-2xl font-semibold hover:bg-rose-700 transition shadow-lg" disabled={Object.keys(formErrors).length > 0}>
              Confirm Appointment
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
