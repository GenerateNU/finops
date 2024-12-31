export const BRANCHES = ["Engagement", "Hardware", "Operations", "Software"];

export const BRANCH_TEAMS = [
  {
    name: "Executive Director",
    teams: ["Discretionary", "Morale"],
  },
  {
    name: "Engagement",
    teams: ["Community", "Content"],
  },
  {
    name: "Hardware",
    teams: [
      "Arcade",
      "Candle Maker",
      "PlaitPilot",
      "Uplift",
    ],
  },
  {
    name: "Operations",
    teams: ["Alumni Relations", "EatWell", "Finance", "Internal Insights", "Learning & Development"],
  },
  {
    name: "Software",
    teams: ["Arenius", "Dearly", "PlateMate", "Vetted"],
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
    branch: "Shared",
    subTeam: "Zero-Based Pool",
    lineItem: "Pre-Approved",
    code: "MG-ZB-50",
    purposes: ["Client Project Materials", "Morale", "Promotional Materials", "Other"],
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
    subTeam: "Community",
    lineItem: "Morale",
    code: "EG-CY-02",
    purposes: ["Morale"],
  },
  {
    branch: "Engagement",
    subTeam: "Content",
    lineItem: "Morale",
    code: "EG-CT-02",
    purposes: ["Morale"],
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
    subTeam: "Arcade",
    lineItem: "Materials",
    code: "HW-AC-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Hardware",
    subTeam: "Candle Maker",
    lineItem: "Materials",
    code: "HW-CM-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Hardware",
    subTeam: "PlaitPilot",
    lineItem: "Materials",
    code: "HW-PP-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Hardware",
    subTeam: "Uplift",
    lineItem: "Materials",
    code: "HW-UL-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Hardware",
    subTeam: "Arcade",
    lineItem: "Morale",
    code: "HW-AC-02",
    purposes: ["Morale"],
  },
  {
    branch: "Hardware",
    subTeam: "Candle Maker",
    lineItem: "Morale",
    code: "HW-CM-02",
    purposes: ["Morale"],
  },
  {
    branch: "Hardware",
    subTeam: "PlaitPilot",
    lineItem: "Morale",
    code: "HW-PP-02",
    purposes: ["Morale"],
  },
  {
    branch: "Hardware",
    subTeam: "Uplift",
    lineItem: "Morale",
    code: "HW-UL-02",
    purposes: ["Morale"],
  },
  {
    branch: "Operations",
    subTeam: "Alumni Relations",
    lineItem: "Morale",
    code: "OP-AR-02",
    purposes: ["Morale"],
  },
  {
    branch: "Operations",
    subTeam: "EatWell",
    lineItem: "Morale",
    code: "OP-EW-02",
    purposes: ["Morale"],
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
    subTeam: "Internal Insights",
    lineItem: "Morale",
    code: "OP-II-02",
    purposes: ["Morale"],
  },
  {
    branch: "Operations",
    subTeam: "Learning & Development",
    lineItem: "Morale",
    code: "OP-LD-02",
    purposes: ["Morale"],
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
    subTeam: "Arenius",
    lineItem: "Morale",
    code: "SW-AN-02",
    purposes: ["Morale"],
  },
  {
    branch: "Software",
    subTeam: "Dearly",
    lineItem: "Morale",
    code: "SW-DY-02",
    purposes: ["Morale"],
  },
  {
    branch: "Software",
    subTeam: "PlateMate",
    lineItem: "Morale",
    code: "SW-PM-02",
    purposes: ["Morale"],
  },
  {
    branch: "Software",
    subTeam: "Vetted",
    lineItem: "Morale",
    code: "SW-VD-02",
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
  "Promotional Materials",
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
