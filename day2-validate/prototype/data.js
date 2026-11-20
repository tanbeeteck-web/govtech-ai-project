// Synthetic data for ServiceSG enquiry prototype
// All data in this file is made up for testing purposes only

// Policy pages the AI may use, with last-updated dates. Copied from the Sources table in
// day2-validate/context-skill.md. All names and dates are made up.
const policySources = {
  "ICA Passport Services": "2024-10-01",
  "ICA Fee Schedule": "2024-10-01",
  "ICA Application Channels": "2024-09-15",
  "ICA Lost Card Procedure": "2024-10-01",
  "PTC Concession Policy": "2024-08-20",
  "TransitLink Application Guide": "2024-08-20",
  "Community Centre Opening Hours": "2024-11-01",
  "Community Centre Online Booking": "2024-11-01",
  "Season Parking Renewal Policy": "2024-09-30",
  "Season Parking Channels": "2024-09-30",
  "HDB BTO Late Application Policy": "2024-07-10",
  "HDB Fee Waiver Guidelines": "2024-07-10",
  "HDB First-Timer Priority": "2024-07-10",
  "Overseas Applicant Guidelines": "2024-06-05",
  "Appeals Procedure": "2024-06-05"
};

// Fixed list of 6 made-up policy topics. An enquiry has ONE topic. An enquiry with no topic,
// or a topic not in this list, is shown under "Other" (see topicOf in index.html).
const policyTopics = [
  "Passports and ID cards",
  "Concessions and transport",
  "Community centres",
  "Parking",
  "Housing (HDB)",
  "Appeals and overseas"
];

// Enquiries with draft: null show a no-draft screen. noDraft.type is one of:
// low_confidence, needs_clarification, handoff, attachment (see context-skill.md rules 2, 7, 8, 9).
// Every no-draft result is a hand-off to the human lead (decided 2026-11-20).
const syntheticEnquiries = [
  {
    id: "ENQ-2024-001",
    topic: "Passports and ID cards",
    timestamp: "2024-11-18 09:32",
    confidence: "high",
    confidencePct: 96,
    enquiry: {
      from: "Resident (made up)",
      subject: "Documents needed for passport renewal",
      body: "Hi, I need to renew my passport and would like to know what documents I need to bring. My current passport expires next month. I am a Singapore citizen. Thank you."
    },
    draft: {
      greeting: "Dear Resident,",
      paragraphs: [
        {
          text: "Thank you for your enquiry about passport renewal.",
          citation: null
        },
        {
          text: "For Singapore citizens renewing a passport, you will need to bring your current passport and one recent passport-sized photograph.",
          citation: {
            source: "ICA Passport Services (made up)",
            passage: "Citizens renewing passports must present: (1) current passport, (2) one recent photograph taken within the last 3 months.",
            url: "#policy-ica-passport-001"
          }
        },
        {
          text: "The renewal fee is $70 for a 5-year passport or $80 for a 10-year passport.",
          citation: {
            source: "ICA Fee Schedule (made up)",
            passage: "Passport fees: 5-year validity - $70, 10-year validity - $80. Fees are non-refundable.",
            url: "#policy-ica-fees-001"
          },
          highRisk: "fee"
        },
        {
          text: "You can submit your application at any ICA Services Centre or online via the ICA website.",
          citation: {
            source: "ICA Application Channels (made up)",
            passage: "Passport applications accepted at: ICA Building, all ICA Services Centres, or online at ica.gov.sg.",
            url: "#policy-ica-channels-001"
          }
        }
      ],
      closing: "Please let us know if you have any other questions.",
      signature: "ServiceSG Officer"
    }
  },
  {
    id: "ENQ-2024-002",
    topic: "Concessions and transport",
    timestamp: "2024-11-18 10:15",
    confidence: "high",
    confidencePct: 94,
    enquiry: {
      from: "Resident (made up)",
      subject: "How to apply for senior citizen concession card",
      body: "Good morning, my father just turned 60 and we heard there is a concession card for seniors. How can he apply for one? He is a Singapore citizen."
    },
    draft: {
      greeting: "Dear Resident,",
      paragraphs: [
        {
          text: "Thank you for your enquiry about the Senior Citizen Concession Card.",
          citation: null
        },
        {
          text: "Singapore citizens aged 60 years and above qualify for senior concession fares on public buses and trains. Your father is 60 and a Singapore citizen, so he qualifies for senior concession fares.",
          citation: {
            source: "PTC Concession Policy (made up)",
            passage: "Eligibility: Singapore citizens aged 60 years and above qualify for senior concession fares on public buses and trains.",
            url: "#policy-ptc-senior-001"
          },
          highRisk: "eligibility"
        },
        {
          text: "Your father can apply at any TransitLink Ticket Office with his NRIC. The card is issued on the spot.",
          citation: {
            source: "TransitLink Application Guide (made up)",
            passage: "Senior Citizen Concession Cards are issued immediately at TransitLink Ticket Offices upon presentation of NRIC.",
            url: "#policy-transitlink-001"
          }
        }
      ],
      closing: "We hope this helps. Feel free to reach out if you need further assistance.",
      signature: "ServiceSG Officer"
    }
  },
  {
    id: "ENQ-2024-003",
    topic: "Housing (HDB)",
    timestamp: "2024-11-18 11:42",
    confidence: "low",
    confidencePct: 62,
    enquiry: {
      from: "Resident (made up)",
      subject: "Appeal for late HDB application and fee waiver",
      body: "Hi, I missed the deadline for my HDB BTO application by 2 days because I was hospitalized. I have the medical certificate. Can I still apply? Also my income dropped last month due to retrenchment - can I get the application fee waived? I am a first-timer. Thank you."
    },
    draft: null,
    noDraft: {
      type: "low_confidence",
      reason: "Two topics (a late application and a fee waiver). This needs officer judgment."
    },
    suggestedPolicies: [
      {
        source: "HDB BTO Late Application Policy (made up)",
        passage: "Late applications may be considered on a case-by-case basis with supporting documentation. Approval is not guaranteed.",
        url: "#policy-hdb-late-001"
      },
      {
        source: "HDB Fee Waiver Guidelines (made up)",
        passage: "Fee waivers are available for applicants facing financial hardship. Income assessment and supporting documents required.",
        url: "#policy-hdb-waiver-001"
      },
      {
        source: "HDB First-Timer Priority (made up)",
        passage: "First-timer applicants receive priority allocation. Eligibility conditions apply.",
        url: "#policy-hdb-firsttimer-001"
      }
    ]
  },
  // ---- Extra made-up enquiries for the comfort test (Day 2 assumption test) ----
  {
    id: "ENQ-2024-004",
    topic: "Passports and ID cards",
    timestamp: "2024-11-18 13:05",
    confidence: "high",
    confidencePct: 95,
    enquiry: {
      from: "Resident (made up)",
      subject: "Replacing a lost identity card",
      body: "Hello, I lost my identity card on the bus yesterday. What do I need to do to get a new one and how much will it cost? I am a Singapore citizen aged 35."
    },
    draft: {
      greeting: "Dear Resident,",
      paragraphs: [
        { text: "Thank you for your enquiry about replacing a lost identity card.", citation: null },
        {
          text: "Please make a police report first, then apply for a replacement at any ICA Services Centre with your police report reference number.",
          citation: {
            source: "ICA Lost Card Procedure (made up)",
            passage: "Lost cards must be reported to the police. Applicants then apply for a replacement in person, quoting the police report number.",
            url: "#policy-ica-lostcard-001"
          }
        },
        {
          text: "The replacement fee is $100 for a first loss.",
          citation: {
            source: "ICA Fee Schedule (made up)",
            passage: "Replacement of lost identity card: $100 for first loss, $300 for second loss, $500 for subsequent losses.",
            url: "#policy-ica-fees-002"
          },
          highRisk: "fee"
        }
      ],
      closing: "Please let us know if you have any other questions.",
      signature: "ServiceSG Officer"
    }
  },
  {
    id: "ENQ-2024-005",
    topic: "Community centres",
    timestamp: "2024-11-18 14:20",
    confidence: "high",
    confidencePct: 97,
    enquiry: {
      from: "Resident (made up)",
      subject: "Opening hours of community centre booking counter",
      body: "Hi, what time does the booking counter at the community centre open on weekends? I want to book a badminton court."
    },
    draft: {
      greeting: "Dear Resident,",
      paragraphs: [
        { text: "Thank you for your enquiry about court bookings.", citation: null },
        {
          text: "The booking counter is open from 9am to 5pm on Saturdays and 9am to 1pm on Sundays.",
          citation: {
            source: "Community Centre Opening Hours (made up)",
            passage: "Booking counter hours: Mon-Fri 10am-9pm, Sat 9am-5pm, Sun 9am-1pm. Closed on public holidays.",
            url: "#policy-cc-hours-001"
          }
        },
        {
          text: "You can also book courts online through the community centre booking page.",
          citation: {
            source: "Community Centre Online Booking (made up)",
            passage: "Courts may be booked online up to 14 days in advance.",
            url: "#policy-cc-online-001"
          }
        }
      ],
      closing: "We hope this helps.",
      signature: "ServiceSG Officer"
    }
  },
  {
    id: "ENQ-2024-006",
    topic: "Parking",
    timestamp: "2024-11-18 15:10",
    confidence: "high",
    confidencePct: 93,
    enquiry: {
      from: "Resident (made up)",
      subject: "Deadline to renew parking season pass",
      body: "Good afternoon, my season parking pass expires at the end of this month. By when must I renew it so there is no break in coverage?"
    },
    draft: {
      greeting: "Dear Resident,",
      paragraphs: [
        { text: "Thank you for your enquiry about renewing your season parking pass.", citation: null },
        {
          text: "To avoid a break in coverage, please renew at least 7 days before your pass expires.",
          citation: {
            source: "Season Parking Renewal Policy (made up)",
            passage: "Renewal applications must be received at least 7 days before expiry to ensure continuous coverage.",
            url: "#policy-parking-renew-001"
          },
          highRisk: "deadline"
        },
        {
          text: "You can renew online or at any participating service counter.",
          citation: {
            source: "Season Parking Channels (made up)",
            passage: "Renewals accepted online and at participating service counters.",
            url: "#policy-parking-channels-001"
          }
        }
      ],
      closing: "Please let us know if you need further help.",
      signature: "ServiceSG Officer"
    }
  },
  {
    id: "ENQ-2024-007",
    topic: "Appeals and overseas",
    timestamp: "2024-11-18 16:02",
    confidence: "low",
    confidencePct: 41,
    enquiry: {
      from: "Resident (made up)",
      subject: "Expired document, living overseas, appeal against earlier decision",
      body: "I am living overseas and my document expired last year. My earlier application was rejected and I want to appeal. Can I do this by post, and does the rejection affect my new application?"
    },
    draft: null,
    noDraft: {
      type: "low_confidence",
      reason: "Several topics (living overseas, an expired document and an appeal). This needs officer judgment."
    },
    suggestedPolicies: [
      {
        source: "Overseas Applicant Guidelines (made up)",
        passage: "Overseas applicants may submit through the online portal or a consulate. Postal submissions are accepted only in exceptional cases.",
        url: "#policy-overseas-001"
      },
      {
        source: "Appeals Procedure (made up)",
        passage: "Appeals must be lodged within 30 days of the decision with supporting reasons.",
        url: "#policy-appeals-001"
      },
      {
        source: "ICA Application Channels (made up)",
        passage: "Applications may be submitted at ICA Services Centres or online.",
        url: "#policy-ica-channels-002"
      }
    ]
  },
  {
    id: "ENQ-2024-008",
    topic: "Parking",
    timestamp: "2024-11-18 16:40",
    confidence: "none",
    confidencePct: null,
    enquiry: {
      from: "Resident (made up)",
      subject: "Wrong information about my season parking pass",
      body: "Your agency gave me the wrong information about my season parking pass and I had to pay a penalty. I will take legal action. I want to speak to someone senior."
    },
    draft: null,
    noDraft: {
      type: "handoff",
      trigger: "a complaint and legal action",
      reason: "This is a complaint with legal risk. A human lead must handle it. No draft is written."
    },
    suggestedPolicies: []
  },
  {
    id: "ENQ-2024-009",
    timestamp: "2024-11-18 16:55",
    confidence: "none",
    confidencePct: null,
    enquiry: {
      from: "Resident (made up)",
      subject: "Please read the attached letter",
      body: "I attached a photo of my letter. Can you tell me what it says and what I should do?"
    },
    attachment: { name: "letter-photo.jpg (made up)", readable: false },
    draft: null,
    noDraft: {
      type: "attachment",
      reason: "The attached image could not be read, so any draft would be a guess. The officer needs to open the image."
    },
    suggestedPolicies: []
  },
  {
    id: "ENQ-2024-010",
    topic: "Passports and ID cards",
    timestamp: "2024-11-18 17:10",
    confidence: "none",
    confidencePct: null,
    enquiry: {
      from: "Resident (made up)",
      subject: "How long does passport renewal take?",
      body: "How many days does passport renewal take to process?"
    },
    draft: null,
    noDraft: {
      type: "needs_clarification",
      reason: "No policy page in the source list covers processing time. Nothing was guessed."
    },
    suggestedPolicies: []
  },
  // ---- Added 2026-11-20 for the abusive, opinion and threat decisions (see day3-build/CLAUDE.md) ----
  {
    id: "ENQ-2024-011",
    topic: "Passports and ID cards",
    timestamp: "2024-11-18 17:25",
    confidence: "high",
    confidencePct: 95,
    abusive: true,   // rude, but it holds a valid question: a draft is delivered, flagged amber "Abusive enquiry"
    enquiry: {
      from: "Resident (made up)",
      subject: "Useless",
      body: "Your stupid system again. How much is a replacement for a lost identity card, first time? Answer properly this time, you idiots."
    },
    draft: {
      greeting: "Dear Resident,",
      paragraphs: [
        { text: "Thank you for your enquiry about replacing a lost identity card.", citation: null },
        {
          text: "Please make a police report first, then apply for a replacement in person at any ICA Services Centre. Quote your police report number.",
          citation: {
            source: "ICA Lost Card Procedure (made up)",
            passage: "Lost cards must be reported to the police. Applicants then apply for a replacement in person, quoting the police report number.",
            url: "#policy-ica-lostcard-001"
          }
        },
        {
          text: "The replacement fee is $100 for a first loss.",
          citation: {
            source: "ICA Fee Schedule (made up)",
            passage: "Replacement of lost identity card: $100 for first loss, $300 for second loss, $500 for subsequent losses.",
            url: "#policy-ica-fees-002"
          },
          highRisk: "fee"
        }
      ],
      closing: "Please let us know if you have any other questions.",
      signature: "ServiceSG Officer"
    }
  },
  {
    id: "ENQ-2024-012",
    topic: "Passports and ID cards",
    timestamp: "2024-11-18 17:40",
    confidence: "none",
    confidencePct: null,
    enquiry: {
      from: "Resident (made up)",
      subject: "Passport charge",
      body: "Do you agree the $80 passport charge is a rip-off? The minister in charge is useless, isn't he? Tell me what you think."
    },
    draft: null,
    noDraft: {
      type: "handoff",
      trigger: "a request for an opinion on a policy or a minister",
      reason: "The resident asks for an opinion on a policy and a minister. The AI gives no opinion, for or against. A human lead must handle it. No draft is written."
    },
    suggestedPolicies: []
  },
  {
    id: "ENQ-2024-013",
    timestamp: "2024-11-18 17:55",
    confidence: "none",
    confidencePct: null,
    enquiry: {
      from: "Resident (made up)",
      subject: "You will regret this",
      body: "I know where your officers work. Someone will pay for this."
    },
    draft: null,
    noDraft: {
      type: "handoff",
      trigger: "a threat against staff, treated as law enforcement",
      reason: "This is a threat against staff. It is treated as a law enforcement matter. A human lead must handle it. No draft is written and nothing is sent to the sender."
    },
    suggestedPolicies: []
  },
  {
    id: "ENQ-2024-014",
    timestamp: "2024-11-18 18:10",
    confidence: "none",
    confidencePct: null,
    enquiry: {
      from: "Resident (made up)",
      subject: "Did my neighbours lose a card too?",
      body: "Did anyone else at my block lose an identity card this week? What did ICA tell them?"
    },
    draft: null,
    noDraft: {
      type: "handoff",
      trigger: "a request for another resident's information",
      reason: "The resident asks about other residents and what they were told. The AI cannot share anything about other residents or their replies, so it refuses. A human lead must handle it. No draft is written."
    },
    suggestedPolicies: []
  },
  {
    id: "ENQ-2024-015",
    topic: "Passports and ID cards",
    timestamp: "2024-11-18 18:25",
    confidence: "high",
    confidencePct: 95,
    language: "Chinese",
    digest: "The resident wants to renew a passport and asks which documents to bring.",
    enquiry: {
      from: "Resident (made up)",
      subject: "更新护照",
      body: "你好，我想更新护照。请问需要带哪些文件？谢谢。"
    },
    draft: {
      greeting: "Dear Resident,",
      paragraphs: [
        {
          text: "Thank you for your enquiry about passport renewal.",
          citation: null
        },
        {
          text: "You need to bring your current passport and one recent photograph taken within the last 3 months.",
          citation: {
            source: "ICA Passport Services (made up)",
            passage: "Citizens renewing passports must present: (1) current passport, (2) one recent photograph taken within the last 3 months.",
            url: "#policy-ica-passport-001"
          }
        }
      ],
      closing: "We hope this helps. Feel free to reach out if you need further assistance.",
      signature: "ServiceSG Officer"
    },
    translation: {
      language: "Chinese",
      text: "您好，感谢您就护照更新提出咨询。请携带您目前的护照和一张3个月内拍摄的近照。希望以上信息对您有帮助。"
    }
  },
  {
    id: "ENQ-2024-016",
    topic: "Passports and ID cards",
    timestamp: "2024-11-18 18:40",
    confidence: "none",
    confidencePct: null,
    language: "Tamil",
    digest: "The resident complains about the service and says they will go to a lawyer.",
    enquiry: {
      from: "Resident (made up)",
      subject: "புகார்",
      body: "நான் இந்த சேவையைப் பற்றி புகார் அளிக்கிறேன். நான் வழக்கறிஞரிடம் செல்வேன்."
    },
    draft: null,
    noDraft: {
      type: "handoff",
      trigger: "a complaint and legal action",
      reason: "The English digest shows a complaint and a threat of legal action. A human lead must handle it. No draft is written and no translation is made."
    },
    suggestedPolicies: []
  },
  {
    id: "ENQ-2024-017",
    topic: "Passports and ID cards",
    timestamp: "2024-11-18 18:55",
    confidence: "high",
    confidencePct: 93,
    language: "Malay",
    digest: "The resident wants to renew a passport and asks what photograph is needed.",
    enquiry: {
      from: "Resident (made up)",
      subject: "Pembaharuan pasport",
      body: "Selamat pagi, saya ingin memperbaharui pasport saya. Apakah gambar yang diperlukan? Terima kasih."
    },
    draft: {
      greeting: "Dear Resident,",
      paragraphs: [
        {
          text: "Thank you for your enquiry about passport renewal.",
          citation: null
        },
        {
          text: "You need one recent photograph taken within the last 3 months.",
          citation: {
            source: "ICA Passport Services (made up)",
            passage: "Citizens renewing passports must present: (1) current passport, (2) one recent photograph taken within the last 3 months.",
            url: "#policy-ica-passport-001"
          }
        }
      ],
      closing: "We hope this helps. Feel free to reach out if you need further assistance.",
      signature: "ServiceSG Officer"
    },
    translation: {
      language: "Malay",
      text: "Terima kasih atas pertanyaan anda tentang pembaharuan pasport. Anda memerlukan satu gambar terbaru yang diambil dalam tempoh 6 bulan yang lepas. (Made-up faulty translation: the figure differs from the English.)"
    }
  }
];

// Recommended paragraph for an abusive enquiry. It is NOT part of the draft. The officer decides whether to add it.
// It makes no policy claim, so it needs no citation (like a greeting). Wording is for the learner to confirm.
const respectfulServiceParagraph = "We are glad to help. Our officers work to serve every resident well, and we ask that all messages to us stay respectful. Thank you for understanding.";


// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { syntheticEnquiries, respectfulServiceParagraph };
}
