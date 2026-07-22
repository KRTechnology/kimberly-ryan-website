// components/specific/PrivacyPolicyPage.tsx
// Drop this into your components/specific/ folder.
// Then create app/(site)/privacy-policy/page.tsx and import this component.

import React from "react";

interface Section {
  number: string;
  title: string;
  content: React.ReactNode;
}

const sections: Section[] = [
  {
    number: "1",
    title: "About This Policy",
    content: (
      <p>
        This is the Privacy Policy (&ldquo;Policy&rdquo;) for the website hosted at{" "}
        <a href="https://www.kimberly-ryan.com" className="text-[#E87722] underline underline-offset-2 hover:text-[#F5A44A]">
          https://www.kimberly-ryan.com
        </a>{" "}
        operated by or on behalf of Kimberly Ryan Limited, as well as use of the Kimberly Ryan
        Application and provision of Services. This Privacy Policy describes your privacy rights
        regarding Kimberly Ryan&apos;s collection, use, storage, sharing and protection of your
        personal information. It applies to our website and all related sites, applications,
        services and tools regardless of how you access or use them. This Privacy Policy will
        help you understand how we use your information and what we do with it. We respect the
        privacy of our online visitors and registered users and will take reasonable steps to
        protect your information. By visiting and using our website, mobile site, and/or
        applications (together, the &ldquo;Site&rdquo;) or using our Services, you acknowledge
        you have read and understood this Policy.
      </p>
    ),
  },
  {
    number: "2",
    title: "How We Collect Your Information",
    content: (
      <div className="flex flex-col gap-6">
        <div>
          <h4 className="mb-3 text-sm font-semibold text-[#2C2A27]">Information provided directly by you:</h4>
          <ul className="flex flex-col gap-2.5">
            {[
              "Your name, company name, email address, telephone number and other contact details provided by completing forms on the Site or using the Service, including information if you register as a user or subscribe to a Service.",
              "Information and other details of any transactions made through the Site, including name, address, total number of employees and other financial-related information (\"Billing Information\") provided when making transactions or using our Services.",
              "Information contained in communications you send to us, for example to report a problem or to submit queries, concerns or comments regarding the Site or the Services.",
              "Information from surveys that we may, from time to time, conduct on the Site that you respond to or participate in.",
              "Information on your company and its operations from any materials you send us, used in creating personalised course content.",
              "Other additional information that you provide to us when attending our corporate events.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-[#5A5550]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E87722]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-[#2C2A27]">Information collected automatically when you use our Site:</h4>
          <p className="text-sm leading-relaxed text-[#5A5550]">
            We may automatically collect certain information about the computer or other devices you use
            to access the Site, including mobile devices, through commonly-used information-gathering
            tools such as cookies and web beacons. This includes location information, unique device
            identifiers, IP address, browser types, operating system, and information related to the
            ways in which you interact with the Services such as referring and exit pages, the number
            of clicks, pages viewed, time spent on pages, and error logs.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-[#2C2A27]">Information about you collected from third parties:</h4>
          <ul className="flex flex-col gap-2.5">
            {[
              "From your employer in connection with your job and how it relates to us.",
              "If you use any Site operated by us.",
              "From third parties we work closely with (including business partners, sub-contractors in technical, payment and delivery services, advertising networks, analytics providers, and search information providers). We will notify you when we receive information about you from them and the purposes for which we intend to use that information.",
              "If you access the Site or use the Services through a third-party connection or log-in, you authorise Kimberly Ryan Limited to collect, store, and use, in accordance with this Policy, any and all information available through the third-party interface.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-[#5A5550]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E87722]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
  {
    number: "3",
    title: "How We Use Your Information",
    content: (
      <div className="flex flex-col gap-4">
        <p className="text-sm leading-relaxed text-[#5A5550]">
          Information is collected for the purposes stated in this Policy and will not be further
          processed in a manner that is incompatible with those purposes. We collect and use your
          information for the following purposes:
        </p>
        {[
          ["To perform the Services requested by you", "For example, if you fill out a \"Contact Us\" web form, we will use the information provided to contact you about your interest in the Services."],
          ["To plan and host events", "For example, corporate events, online forums, blogs and social networks in which event attendees may participate, and to populate online profiles in relation to the Services."],
          ["For marketing purposes", "We may use your information to further discuss your interest in the Services and to send you information about promotions, events, products or services. We will only send you marketing communications with your prior consent. You can withdraw your consent at any time by selecting the \"unsubscribe\" link located at the bottom of our marketing emails."],
          ["For financial and payment purposes", "For checking financial qualifications and collecting payment from you, where applicable."],
          ["For operating and improving our Site", "We may collect and analyse data on your use of our website for the purpose of improving our online customer experience."],
          ["For security purposes", "We may use your data to protect Kimberly Ryan Limited and its third parties against security breaches and to prevent fraud."],
          ["For hosting purposes", "If you are our customer, we may collect and host your data to provide Services to you. We will not review, share, distribute, or reference any such data except as provided in a services agreement or as may be required by law."],
          ["Business Transfers", "We reserve the right to disclose and transfer all of your information to a successor company in connection with a merger, acquisition, or sale of all or components of our business."],
        ].map(([title, desc], i) => (
          <div key={i} className="rounded-xl bg-[#F4F2EE] p-4">
            <h4 className="mb-1.5 text-sm font-semibold text-[#2C2A27]">{title}</h4>
            <p className="text-sm leading-relaxed text-[#5A5550]">{desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    number: "4",
    title: "Security",
    content: (
      <p className="text-sm leading-relaxed text-[#5A5550]">
        We have appropriate physical, electronic, and managerial procedures to safeguard and help
        prevent unauthorised access and maintain data security of the information we collect online.
        All information you provide to us is stored on our secure servers. You are responsible for
        keeping any password you use to access our Site confidential. Although we will do our best
        to protect your personal information, we cannot guarantee the security of data transmitted
        to our Site — any transmission is at your own risk. If you have any reason to believe that
        your interactions with the Services are no longer secure, please notify us immediately at{" "}
        <a href="mailto:info@kimberly-ryan.net" className="text-[#E87722] underline underline-offset-2 hover:text-[#F5A44A]">
          info@kimberly-ryan.net
        </a>.
      </p>
    ),
  },
  {
    number: "5",
    title: "How Long We Keep Information",
    content: (
      <div className="flex flex-col gap-4">
        <p className="text-sm leading-relaxed text-[#5A5550]">
          How long we keep information depends on the type of information. After the applicable
          retention period, we will either delete or anonymise your information.
        </p>
        {[
          ["Account information", "We retain your account information for as long as your account is active and a reasonable period thereafter. We also retain some information as necessary to comply with our legal obligations, resolve disputes, enforce our agreements, and continue to develop and improve our Services."],
          ["Information you share on the Services", "If your account is deactivated or disabled, some of your information and the content you have provided will remain in order to allow your team members or other users to make full use of the Services."],
          ["Managed accounts", "If the Services are made available to you through an organisation (e.g., your employer), we retain your information as long as required by the administrator of your account."],
          ["Marketing information", "If you have elected to receive marketing emails from us, we retain information about your marketing preferences for a reasonable period of time from the date you last expressed interest in our Services."],
        ].map(([title, desc], i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E87722]" />
            <div>
              <span className="text-sm font-semibold text-[#2C2A27]">{title}: </span>
              <span className="text-sm leading-relaxed text-[#5A5550]">{desc}</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    number: "6",
    title: "Changes to This Policy",
    content: (
      <p className="text-sm leading-relaxed text-[#5A5550]">
        Kimberly Ryan Limited, at its sole discretion, reserves the right to change this Policy
        from time to time. Please check this page periodically for changes. If we make any material
        changes to this Policy we will notify you before they take effect either through the Site or
        by sending you a notification. Any such material changes will only apply to personal
        information collected after the revised Policy took effect.
      </p>
    ),
  },
  {
    number: "7",
    title: "No Rights of Third Parties",
    content: (
      <p className="text-sm leading-relaxed text-[#5A5550]">
        This Privacy Policy does not create rights enforceable by third parties or require
        disclosure of any personal information relating to users of the website.
      </p>
    ),
  },
  {
    number: "8",
    title: "Exercising Your Rights",
    content: (
      <div className="flex flex-col gap-4">
        <p className="text-sm leading-relaxed text-[#5A5550]">
          You may submit a request for access to personal data collected, used, disclosed or
          processed by Kimberly Ryan Limited, as well as a request for rectification, erasure,
          or restriction of processing. You also have the right to data portability and to lodge
          a complaint with a data protection authority.
        </p>
        <p className="text-sm leading-relaxed text-[#5A5550]">
          In particular, you have the right to object and withdraw your consent, in whole or in
          part, to the collection, use, disclosure or processing of your personal data for purposes
          of direct marketing, advertising material, or commercial communication. You may also
          object to the processing of your personal data by means of automated contact methods.
        </p>
        <p className="text-sm leading-relaxed text-[#5A5550]">
          To exercise your rights or submit inquiries or complaints, please contact us at{" "}
          <a href="mailto:info@kimberly-ryan.net" className="font-semibold text-[#E87722] underline underline-offset-2 hover:text-[#F5A44A]">
            info@kimberly-ryan.net
          </a>.
        </p>
      </div>
    ),
  },
  {
    number: "9",
    title: "Contact Us",
    content: (
      <div className="flex flex-col gap-3">
        <p className="text-sm leading-relaxed text-[#5A5550]">
          If you have questions or concerns regarding this Privacy Policy, or if you would like
          to exercise your rights described in this Policy, please contact us at:
        </p>
        <div className="inline-flex items-center gap-2 rounded-lg bg-[#F4F2EE] px-4 py-3">
          <span className="text-sm font-semibold text-[#2C2A27]">Email:</span>
          <a href="mailto:info@kimberly-ryan.net" className="text-sm text-[#E87722] underline underline-offset-2 hover:text-[#F5A44A]">
            info@kimberly-ryan.net
          </a>
        </div>
      </div>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F4F2EE]">

      {/* ── Header band ── */}
      <div className="bg-[#3A3530] px-6 pb-16 pt-24 text-center">
        <span className="mb-4 inline-block rounded-full bg-[#E87722]/20 px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-[2px] text-[#E87722]">
          Kimberly Ryan Limited
        </span>
        <h1 className="font-sans text-3xl font-bold text-white md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/60">
          Kimberly Ryan Limited is committed to protecting your privacy and the personal
          information collected and processed about you.
        </p>
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-3xl px-4 py-14">

        {/* Intro card */}
        <div className="mb-10 rounded-2xl bg-white p-8 shadow-sm">
          <p className="text-sm leading-relaxed text-[#5A5550]">
            Kimberly Ryan Limited (&ldquo;Kimberly Ryan&rdquo;, &ldquo;We&rdquo;, &ldquo;Our&rdquo;)
            provides Business and HR Consulting services to Users, referred to as (the
            &ldquo;Services&rdquo;). This document outlines how we collect, use, store, share and
            protect your personal information when you use our website or Services.
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-6">
          {sections.map((section) => (
            <div
              key={section.number}
              id={`section-${section.number}`}
              className="rounded-2xl bg-white p-8 shadow-sm"
            >
              {/* Section header */}
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E87722] text-xs font-bold text-white">
                  {section.number}
                </div>
                <h2 className="font-sans text-base font-bold text-[#2C2A27] md:text-lg">
                  {section.title}
                </h2>
              </div>
              <div>{section.content}</div>
            </div>
          ))}
        </div>

        {/* Last updated note */}
        <p className="mt-10 text-center text-xs text-[#b0a89e]">
          This Privacy Policy was last reviewed and is effective as of 2025.
        </p>
      </div>
    </main>
  );
}
