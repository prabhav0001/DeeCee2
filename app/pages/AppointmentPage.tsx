"use client"

import React, { useState, useMemo, useCallback } from "react";
import { Calendar, CheckCircle2, Loader2 } from "lucide-react";
import { Appointment } from "@/app/types";
import { FormInput } from "@/app/components/common";
import { useFormValidation } from "@/app/hooks/use-form-validation";
import { saveAppointment, sendAppointmentConfirmation, addToGoogleCalendar } from "@/app/services/appointmentService";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calendarLink, setCalendarLink] = useState<string>("");

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

  const handleConfirm = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(formErrors).length > 0) {
      alert("Please fill all required fields correctly");
      return;
    }

    setIsSubmitting(true);

    try {
      const appt: Appointment = {
        id: `APT-${Date.now()}`,
        service,
        location,
        date,
        time: selectedTime,
        name,
        email,
        phone,
        notes: notes.trim() || undefined
      };

      // Save appointment to backend
      const saveResult = await saveAppointment(appt);

      if (!saveResult.success) {
        throw new Error(saveResult.message || "Failed to save appointment");
      }

      // Update local state
      setAppointments((prev) => [...prev, appt]);
      setConfirmed(appt);

      // Generate Google Calendar link
      const gcalLink = addToGoogleCalendar(appt);
      setCalendarLink(gcalLink);

      // Send email confirmation (non-blocking)
      sendAppointmentConfirmation(appt).catch((error) => {
        console.error("Email notification failed:", error);
      });

      // Scroll to top to show confirmation
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Appointment booking error:", error);
      alert("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
    setCalendarLink("");
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 min-h-screen">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Calendar className="w-8 h-8 text-rose-600" />
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Book an Appointment</h2>
      </div>
      <p className="text-gray-700 mb-10 text-center max-w-2xl mx-auto text-sm sm:text-base px-4">
        Schedule a consultation with our hair extension experts. Select your preferred service, location, and time slot below.
      </p>
      {confirmed ? (
        <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg">
          <div className="flex items-start gap-4 text-green-700 bg-green-50 border border-green-200 p-4 sm:p-6 rounded-2xl mb-8">
            <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg mb-2">Appointment Confirmed!</h3>
              <p className="text-sm sm:text-base">
                Your appointment has been successfully booked. A confirmation email has been sent to <strong>{confirmed.email}</strong>.
              </p>
              <p className="text-sm mt-2">Appointment ID: <strong>{confirmed.id}</strong></p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <h4 className="font-bold text-gray-900 mb-4 text-lg">Appointment Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700 mb-1">Service</span>
                <span className="text-gray-900 bg-white px-4 py-2 rounded-lg border">{confirmed.service}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700 mb-1">Location</span>
                <span className="text-gray-900 bg-white px-4 py-2 rounded-lg border">{confirmed.location}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700 mb-1">Date</span>
                <span className="text-gray-900 bg-white px-4 py-2 rounded-lg border">
                  {new Date(confirmed.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700 mb-1">Time</span>
                <span className="text-gray-900 bg-white px-4 py-2 rounded-lg border">{confirmed.time}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700 mb-1">Name</span>
                <span className="text-gray-900 bg-white px-4 py-2 rounded-lg border">{confirmed.name}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700 mb-1">Phone</span>
                <span className="text-gray-900 bg-white px-4 py-2 rounded-lg border">{confirmed.phone}</span>
              </div>
              {confirmed.notes && (
                <div className="flex flex-col md:col-span-2">
                  <span className="font-semibold text-gray-700 mb-1">Additional Notes</span>
                  <span className="text-gray-900 bg-white px-4 py-2 rounded-lg border">{confirmed.notes}</span>
                </div>
              )}
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Please arrive 10 minutes before your scheduled time. If you need to reschedule or cancel,
              please contact us at least 24 hours in advance.
            </p>
          </div>
          {calendarLink && (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-4 mb-6">
              <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Add to Calendar
              </h4>
              <p className="text-sm text-purple-700 mb-3">
                Don't forget your appointment! Add it to your Google Calendar for a reminder.
              </p>
              <a
                href={calendarLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition text-sm"
              >
                📅 Add to Google Calendar
              </a>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={resetForm}
              className="flex-1 bg-rose-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-rose-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Book Another Appointment
            </button>
            <button
              onClick={onNavigateHome}
              className="flex-1 px-6 py-3 rounded-2xl font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleConfirm} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg text-gray-900 mb-6 flex items-center gap-2">
              <span className="bg-rose-100 text-rose-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              Your Preferences
            </h3>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Service Type</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
              >
                <option>Consultation</option>
                <option>Installation</option>
                <option>Color Match</option>
                <option>Maintenance</option>
                <option>Removal & Reinstall</option>
                <option>Styling Session</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">Choose the service you need</p>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Location</label>
              <select
                value={location}
                onChange={(e) => { setLocation(e.target.value); setSelectedTime(""); }}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
              >
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bengaluru</option>
                <option>Chennai</option>
                <option>Pune</option>
                <option>Hyderabad</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">Select nearest branch</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Appointment Date</label>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                max={new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                value={date}
                onChange={(e) => { setDate(e.target.value); setSelectedTime(""); }}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
              />
              {formErrors.date && <p className="text-red-600 text-xs mt-2 flex items-center gap-1">⚠️ {formErrors.date}</p>}
              <p className="text-xs text-gray-500 mt-2">Available up to 60 days ahead</p>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg text-gray-900 mb-6 flex items-center gap-2">
              <span className="bg-rose-100 text-rose-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              Available Time Slots
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {available.map((slot) => (
                <button
                  type="button"
                  key={slot.time}
                  disabled={slot.disabled}
                  onClick={() => setSelectedTime(slot.time)}
                  className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-300 ${
                    slot.disabled
                      ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed line-through"
                      : selectedTime === slot.time
                        ? "border-rose-600 bg-rose-600 text-white shadow-lg transform scale-105"
                        : "border-gray-300 text-gray-700 hover:border-rose-400 hover:bg-rose-50 hover:shadow-md"
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
            {formErrors.time && <p className="text-red-600 text-xs mt-3 flex items-center gap-1">⚠️ {formErrors.time}</p>}
            {selectedTime && !formErrors.time && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-700">
                ✓ Selected: <strong>{selectedTime}</strong> on <strong>{new Date(date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</strong>
              </div>
            )}
            <div className="mt-4 flex items-start gap-2 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
              <span>💡</span>
              <p>Slots marked as unavailable are already booked or blocked. Please choose another time.</p>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg text-gray-900 mb-6 flex items-center gap-2">
              <span className="bg-rose-100 text-rose-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              Your Contact Details
            </h3>
            <div className="space-y-5">
              <FormInput label="Full Name" value={name} onChange={(e) => setName(e.target.value)} error={formErrors.name} placeholder="Enter your full name" />
              <FormInput label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={formErrors.email} placeholder="your.email@example.com" />
              <FormInput label="Phone Number" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit mobile number" error={formErrors.phone} />
              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes (Optional)</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value.slice(0, 500))}
                  placeholder="Any specific requirements or questions..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">{notes.length}/500 characters</p>
              </div>
            </div>
            <button
              type="submit"
              className={`mt-6 w-full py-4 rounded-2xl font-bold text-base transition-all shadow-lg flex items-center justify-center gap-2 ${
                Object.keys(formErrors).length > 0 || isSubmitting
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-rose-600 to-rose-500 text-white hover:from-rose-700 hover:to-rose-600 hover:shadow-xl transform hover:-translate-y-0.5"
              }`}
              disabled={Object.keys(formErrors).length > 0 || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Booking Appointment...
                </>
              ) : Object.keys(formErrors).length > 0 ? (
                "Please Complete All Fields"
              ) : (
                "Confirm Appointment →"
              )}
            </button>
            {Object.keys(formErrors).length > 0 && !isSubmitting && (
              <p className="text-xs text-gray-500 text-center mt-2">Fill all required fields to continue</p>
            )}
            {isSubmitting && (
              <p className="text-xs text-rose-600 text-center mt-2 animate-pulse">
                ⏳ Please wait... Sending confirmation email
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
