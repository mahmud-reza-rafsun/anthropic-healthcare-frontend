"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Footer = () => {
  const footerLinks = {
    "Anthropic Health": [
      { name: "Home", href: "/" },
      {
        name: "About Us",
        type: "modal",
        title: "About Anthropic Healthcare",
        content: "Anthropic Healthcare is a premier medical institution dedicated to patient-centered clinical excellence. Since our inception, we have been committed to integrating cutting-edge medical technology with compassionate care to improve the quality of life for our community."
      },
      {
        name: "Specialists",
        type: "modal",
        title: "Our Expert Medical Board",
        content: "Our team consists of world-renowned consultants and surgeons across various disciplines. We pride ourselves on a multidisciplinary approach to ensure every patient receives comprehensive and specialized treatment tailored to their needs."
      },
      {
        name: "Career",
        type: "modal",
        title: "Join Our Medical Team",
        content: "Build your career with one of the most technologically advanced hospitals. We offer a collaborative environment for doctors, nurses, and healthcare professionals who are passionate about making a difference in medicine."
      },
    ],
    "Services": [
      {
        name: "Emergency Care",
        type: "modal",
        title: "24/7 Emergency & Trauma",
        content: "Our emergency department is fully equipped with advanced life support systems. We provide immediate medical intervention for critical conditions, supported by a rapid-response ambulance fleet."
      },
      {
        name: "Diagnostic",
        type: "modal",
        title: "Advanced Diagnostics",
        content: "Offering high-precision imaging and laboratory services, including 3T MRI, CT scans, and automated pathology. Accurate diagnosis is the foundation of our successful treatment protocols."
      },
      {
        name: "Telemedicine",
        type: "modal",
        title: "Virtual Consultations",
        content: "Connect with our top specialists from the comfort of your home. Our secure tele-health platform ensures you receive medical advice, prescriptions, and follow-ups without the need for travel."
      },
      {
        name: "Pharmacy",
        type: "modal",
        title: "In-House Pharmacy",
        content: "Our 24/7 pharmacy ensures 100% authentic medicines and clinical supplies. We maintain strict quality control and provide home delivery services for chronic medication management."
      },
    ],
    "Resources": [
      {
        name: "Health Packages",
        type: "modal",
        title: "Preventive Health Screening",
        content: "Choose from our curated health check-up packages designed for different age groups and lifestyles. Early detection through regular screening is the best way to maintain long-term wellness."
      },
      {
        name: "Patient Guide",
        type: "modal",
        title: "Hospital Stay Information",
        content: "Find everything you need to know about admission procedures, visiting hours, insurance coordination, and discharge instructions to make your stay comfortable and stress-free."
      },
      {
        name: "Medical Records",
        type: "modal",
        title: "Secure Health Records",
        content: "Access your lab results, prescriptions, and medical history through our secure patient portal. We utilize enterprise-grade encryption to ensure your health data remains private."
      },
    ],
    "Support": [
      {
        name: "Help Center",
        type: "modal",
        title: "Patient Support Desk",
        content: "Our dedicated support team is available 24/7 to assist you with appointment scheduling, billing queries, and international patient services."
      },
      {
        name: "Terms of Service",
        type: "modal",
        title: "Terms & Medical Policies",
        content: "By choosing our services, you agree to our clinical protocols and patient rights. We maintain high standards of medical ethics and professional conduct in all our facilities."
      },
      {
        name: "Privacy Policy",
        type: "modal",
        title: "Privacy & HIPAA Compliance",
        content: "Your privacy is our priority. We strictly follow international healthcare data protection standards to ensure that your personal and medical information is never shared without consent."
      },
      { name: "Contact", type: "contact", name_display: "Contact Us" },
    ],
  };

  const socialLinks = [
    {
      label: "Twitter",
      href: "#",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
      )
    },
    {
      label: "LinkedIn",
      href: "#",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93-1.11 0-1.62.77-1.62 1.93V19h-3v-9h2.93v1.3a2.93 2.93 0 012.71-1.55c1.8 0 3.36 1.08 3.36 3.93z" /></svg>
      )
    }
  ];

  return (
    <footer className="w-full bg-background border-t border-blue-500/10">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8 py-16">
          <div className="col-span-full lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 justify-center lg:justify-start">
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-sm"></span>
                <span className="w-2.5 h-2.5 bg-blue-500/50 rounded-sm"></span>
              </div>
              <span className="text-xl font-bold">Anthropic Healthcare</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-8 text-center lg:text-left max-w-xs">
              Providing world-class healthcare with empathy and advanced medical technology. Your health is our first priority.
            </p>
            <div className="flex justify-center lg:justify-start">
              <ContactFormModal>
                <Button className="rounded-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white border-none h-10 px-6 transition-all duration-300">
                  Contact Us
                </Button>
              </ContactFormModal>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="text-left">
              <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-6">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    {link.type === "modal" ? (
                      <ContentModal title={link.title!} content={link.content!}>
                        <span className="text-sm cursor-pointer text-muted-foreground hover:text-blue-500 transition-colors text-left block">
                          {link.name}
                        </span>
                      </ContentModal>
                    ) : link.type === "contact" ? (
                      <ContentModal
                        title="Emergency Support"
                        content="For immediate assistance, please use the contact form or call our emergency hotline. For online inquiries, please log in to your patient portal."
                      >
                        <span className="text-sm cursor-pointer text-muted-foreground hover:text-blue-500 transition-colors text-left block">
                          {link.name}
                        </span>
                      </ContentModal>
                    ) : (
                      <Link
                        href={link.title || "/"}
                        className="text-sm text-muted-foreground hover:text-blue-500 transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-8 border-t border-blue-500/10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <span className="text-sm text-muted-foreground">
            © 2026 <span className="text-blue-500 font-semibold">Anthropic Healthcare</span>. All rights reserved.
          </span>

          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                className="w-10 cursor-pointer h-10 rounded-full bg-muted flex justify-center items-center text-muted-foreground hover:bg-blue-500/10 hover:text-blue-500 transition-all duration-300 shadow-sm"
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Sub-components (Base UI Compatibility) ---

const ContentModal = ({ title, content, children }: { title: string; content: string; children: React.ReactNode }) => (
  <Dialog>
    {/* ReactNode কে ReactElement এ কাস্ট করা হয়েছে এরর দূর করতে */}
    <DialogTrigger render={children as React.ReactElement} />
    <DialogContent className="sm:max-w-md rounded-[2.5rem] border-blue-500/20">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-blue-500">{title}</DialogTitle>
        <DialogDescription className="pt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {content}
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
);

const ContactFormModal = ({ children }: { children: React.ReactNode }) => (
  <Dialog>
    <DialogTrigger render={children as React.ReactElement} />
    <DialogContent className="sm:max-w-lg rounded-[2.5rem] p-8 border-blue-500/20">
      {/* বাকি কোড আগের মতোই... */}
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">Patient Inquiry</DialogTitle>
      </DialogHeader>
      <form className="space-y-4 mt-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <Input placeholder="Patient First Name" className="rounded-xl" />
          <Input placeholder="Last Name" className="rounded-xl" />
        </div>
        <Input type="email" placeholder="Email Address" className="rounded-xl" />
        <Textarea placeholder="Describe concern..." className="rounded-xl min-h-[120px]" />
        <Button className="w-full bg-blue-500 text-white rounded-xl h-12 font-semibold">
          Submit Request
        </Button>
      </form>
    </DialogContent>
  </Dialog>
);

export default Footer;