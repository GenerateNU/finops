export const BRANCHES = ["Engagement", "Hardware", "Operations", "Software"];

export const BRANCH_TEAMS = [
  {
    name: "Executive Director",
    teams: ["Discretionary", "Morale"],
  },
  {
    name: "Engagement",
    teams: ["Content", "Events", "Experiences"],
  },
  {
    name: "Hardware",
    teams: [
      "BaselineTech",
      "Fitolux",
      "Makerspace",
      "Sensify",
      "Tubender",
      "Workshops",
    ],
  },
  {
    name: "Operations",
    teams: ["Finance", "Information", "Strategy"],
  },
  {
    name: "Software",
    teams: ["3 Stones", "Apprenta", "Nightlife", "Platnm", "Snapper"],
  },
];

export type Budget = {
  branch: string;
  subTeam: string;
  lineItem: string;
  code: string;
  purposes: string[] | string;
};

export const BUDGETS: Budget[] = [
  {
    branch: "Management",
    subTeam: "Executive Director",
    lineItem: "Discretionary",
    code: "MG-ED-50",
    purposes: ["Client Project Materials", "Morale", "Showcase", "Other"],
  },
  {
    branch: "Management",
    subTeam: "Directors",
    lineItem: "Morale",
    code: "MG-DR-02",
    purposes: ["Morale"],
  },
  {
    branch: "Engagement",
    subTeam: "Director",
    lineItem: "Discretionary",
    code: "EG-DR-50",
    purposes: ["Morale", "Other"],
  },
  {
    branch: "Engagement",
    subTeam: "Content",
    lineItem: "Morale",
    code: "EG-CT-02",
    purposes: ["Morale"],
  },
  {
    branch: "Engagement",
    subTeam: "Events",
    lineItem: "Morale",
    code: "EG-EV-02",
    purposes: ["Morale"],
  },
  {
    branch: "Engagement",
    subTeam: "Experiences",
    lineItem: "Morale",
    code: "EG-EX-02",
    purposes: ["Morale"],
  },
  {
    branch: "Engagement",
    subTeam: "Events",
    lineItem: "General Events",
    code: "EG-EV-03",
    purposes: ["Morale", "Other"],
  },
  {
    branch: "Engagement",
    subTeam: "Content",
    lineItem: "Merchandise",
    code: "EG-CT-05",
    purposes: ["Other"],
  },
  {
    branch: "Engagement",
    subTeam: "Content",
    lineItem: "Materials",
    code: "EG-CT-04",
    purposes: ["Other"],
  },
  {
    branch: "Engagement",
    subTeam: "Experiences",
    lineItem: "Staycation",
    code: "EG-SY-99",
    purposes: ["Other"],
  },
  {
    branch: "Engagement",
    subTeam: "Events",
    lineItem: "Showcase",
    code: "EG-SC-98",
    purposes: ["Showcase"],
  },
  {
    branch: "Hardware",
    subTeam: "Director",
    lineItem: "Discretionary",
    code: "HW-DR-50",
    purposes: ["Client Project Materials", "Morale", "Other"],
  },
  {
    branch: "Hardware",
    subTeam: "Chiefs",
    lineItem: "Morale",
    code: "HW-CH-02",
    purposes: ["Morale"],
  },
  {
    branch: "Hardware",
    subTeam: "BaselineTech",
    lineItem: "Materials",
    code: "HW-BT-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Hardware",
    subTeam: "Fitolux",
    lineItem: "Materials",
    code: "HW-FL-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Hardware",
    subTeam: "Sensify",
    lineItem: "Materials",
    code: "HW-SS-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Hardware",
    subTeam: "Tubender",
    lineItem: "Materials",
    code: "HW-TE-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Hardware",
    subTeam: "BaselineTech",
    lineItem: "Morale",
    code: "HW-BT-02",
    purposes: ["Morale"],
  },
  {
    branch: "Hardware",
    subTeam: "Fitolux",
    lineItem: "Morale",
    code: "HW-FL-02",
    purposes: ["Morale"],
  },
  {
    branch: "Hardware",
    subTeam: "Sensify",
    lineItem: "Morale",
    code: "HW-SS-02",
    purposes: ["Morale"],
  },
  {
    branch: "Hardware",
    subTeam: "Tubender",
    lineItem: "Morale",
    code: "HW-TE-02",
    purposes: ["Morale"],
  },
  {
    branch: "Operations",
    subTeam: "Director",
    lineItem: "Discretionary",
    code: "OP-DR-50",
    purposes: ["Morale", "Showcase", "Other"],
  },
  {
    branch: "Operations",
    subTeam: "Finance",
    lineItem: "Morale",
    code: "OP-FN-02",
    purposes: ["Morale"],
  },
  {
    branch: "Operations",
    subTeam: "Information",
    lineItem: "Morale",
    code: "OP-IF-02",
    purposes: ["Morale"],
  },
  {
    branch: "Operations",
    subTeam: "Strategy",
    lineItem: "Morale",
    code: "OP-ST-02",
    purposes: ["Morale"],
  },
  {
    branch: "Operations",
    subTeam: "Strategy",
    lineItem: "Connections",
    code: "OP-ST-97",
    purposes: ["Other"],
  },
  {
    branch: "Software",
    subTeam: "Director",
    lineItem: "Discretionary",
    code: "SW-DR-50",
    purposes: ["Client Project Materials", "Morale", "Other"],
  },
  {
    branch: "Software",
    subTeam: "Chiefs",
    lineItem: "Morale",
    code: "SW-CH-02",
    purposes: ["Morale"],
  },
  {
    branch: "Software",
    subTeam: "3 Stones",
    lineItem: "Morale",
    code: "SW-3S-02",
    purposes: ["Morale"],
  },
  {
    branch: "Software",
    subTeam: "Apprenta",
    lineItem: "Morale",
    code: "SW-AP-02",
    purposes: ["Morale"],
  },
  {
    branch: "Software",
    subTeam: "Nightlife",
    lineItem: "Morale",
    code: "SW-NL-02",
    purposes: ["Morale"],
  },
  {
    branch: "Software",
    subTeam: "Platnm",
    lineItem: "Morale",
    code: "SW-PM-02",
    purposes: ["Morale"],
  },
  {
    branch: "Software",
    subTeam: "Snapper",
    lineItem: "Morale",
    code: "SW-SP-02",
    purposes: ["Morale"],
  },
];

export const BUDGETS_BY_TEAM = BUDGETS.reduce(
  (groups: Record<string, Budget[]>, budget: Budget) => {
    if (!groups[budget.branch]) {
      groups[budget.branch] = [];
    }
    groups[budget.branch].push(budget);
    return groups;
  },
  {} as Record<string, Budget[]>,
);

export const EXPENSE_PURPOSE_OPTIONS = [
  "Client Project Materials",
  "Morale",
  "Showcase",
  "Other",
];

export const VENDORS = [
  "4imprint",
  "Adafruit",
  "Amazon",
  "AndyMark",
  "Arduino",
  "Custom Ink",
  "DigiKey",
  "EasyEDA",
  "Edmund Optics",
  "Formlabs",
  "Harbor Freight",
  "Home Depot",
  "JLCPCB",
  "McMaster-Carr",
  "Misumi",
  "Mouser Electronics",
  "Prolabs",
  "Protolabs",
  "SendCutSend",
  "ServoCity",
  "Sparkfun",
  "Stepper Online",
  "Sticker Mule",
  "ULINE",
  "US Plastics",
  "Vevor",
  "Vex Robotics",
  "Vistaprint",
  "WaveShare",
  "Other",
];
