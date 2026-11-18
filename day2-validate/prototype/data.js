// Synthetic data for ServiceSG enquiry prototype
// All data in this file is made up for testing purposes only

const syntheticEnquiries = [
  {
    id: "ENQ-2024-001",
    timestamp: "2024-11-18 09:32",
    confidence: "high",
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
    timestamp: "2024-11-18 10:15",
    confidence: "high",
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
          text: "Singapore citizens aged 60 and above are eligible for the Senior Citizen Concession Card, which provides discounted public transport fares.",
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
    timestamp: "2024-11-18 11:42",
    confidence: "low",
    enquiry: {
      from: "Resident (made up)",
      subject: "Appeal for late HDB application and fee waiver",
      body: "Hi, I missed the deadline for my HDB BTO application by 2 days because I was hospitalized. I have the medical certificate. Can I still apply? Also my income dropped last month due to retrenchment - can I get the application fee waived? I am a first-timer. Thank you."
    },
    draft: null,
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
  }
];

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { syntheticEnquiries };
}
