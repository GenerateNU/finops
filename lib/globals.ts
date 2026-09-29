export const BRANCHES = ["Hardware", "Software", "Data", "Organizational Strategy", "Games", "Management"];

export const BRANCH_TEAMS = [
  {
    name: "Hardware",
    teams: ["Affectrum Vault", "Automated X-Ray", "Cicada Health", "Mycsology Foods", "Chiefs"],
  },
  {
    name: "Software",
    teams: ["Boutline", "Inspirate Consulting", "Tomoji", "Birdie and Claire", "Infra", "Chiefs"],
  },
  {
    name: "Data",
    teams: ["Foresight", "Orion", "Remetra", "Chiefs"],
  },
  {
    name: "Games",
    teams: ["Board", "Deeplight Games", "Chiefs"],
  },
  {
    name: "Organizational Strategy",
    teams: [
      "Operations",
      "Alumni Relations & Strategy",
      "External Relations & Content",
      "Marketing",
      "Finance",
    ],
  },
  {
    name: "Management",
    teams: ["Director"],
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
  // Shared
  {
    branch: "Shared",
    subTeam: "Other",
    lineItem: "Pre-Approved",
    code: "SH-OT-50",
    purposes: ["Client Project Materials", "Morale", "Promotional Materials", "Other"],
  },

  // Management
  {
    branch: "Management",
    subTeam: "Director",
    lineItem: "Discretionary",
    code: "MG-DR-50",
    purposes: ["Discretionary"],
  },
  {
    branch: "Management",
    subTeam: "Director",
    lineItem: "Morale",
    code: "MG-DR-02",
    purposes: ["Morale"],
  },

  // Organizational Strategy
  {
    branch: "Organizational Strategy",
    subTeam: "Operations",
    lineItem: "Showcase",
    code: "OP-OT-98",
    purposes: ["Other"],
  },
  {
    branch: "Organizational Strategy",
    subTeam: "Operations",
    lineItem: "Merchandise",
    code: "OP-OT-05",
    purposes: ["Promotional Materials"],
  },
  {
    branch: "Organizational Strategy",
    subTeam: "Alumni Relations & Strategy",
    lineItem: "General Events",
    code: "OP-IN-03",
    purposes: ["Other"],
  },
  {
    branch: "Organizational Strategy",
    subTeam: "External Relations & Content",
    lineItem: "General Events",
    code: "OP-EX-03",
    purposes: ["Other"],
  },
  {
    branch: "Organizational Strategy",
    subTeam: "Operations",
    lineItem: "Morale",
    code: "OP-OT-02",
    purposes: ["Morale"],
  },
  {
    branch: "Organizational Strategy",
    subTeam: "Marketing",
    lineItem: "Project Materials",
    code: "MK-MK-01",
    purposes: ["Promotional Materials"],
  },
  {
    branch: "Organizational Strategy",
    subTeam: "Marketing",
    lineItem: "Morale",
    code: "MK-MK-02",
    purposes: ["Morale"],
  },
  {
    branch: "Organizational Strategy",
    subTeam: "Finance",
    lineItem: "Morale",
    code: "FN-FN-02",
    purposes: ["Morale"],
  },

  // Hardware
  {
    branch: "Hardware",
    subTeam: "Chiefs",
    lineItem: "Morale",
    code: "HW-CH-02",
    purposes: ["Morale"],
  },
  {
    branch: "Hardware",
    subTeam: "Cicada Health",
    lineItem: "Project Materials",
    code: "HW-CD-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Hardware",
    subTeam: "Automated X-Ray",
    lineItem: "Project Materials",
    code: "HW-AX-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Hardware",
    subTeam: "Mycsology Foods",
    lineItem: "Project Materials",
    code: "HW-MF-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Hardware",
    subTeam: "Affectrum Vault",
    lineItem: "Project Materials",
    code: "HW-AV-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Hardware",
    subTeam: "Cicada Health",
    lineItem: "Morale",
    code: "HW-CD-02",
    purposes: ["Morale"],
  },
  {
    branch: "Hardware",
    subTeam: "Automated X-Ray",
    lineItem: "Morale",
    code: "HW-AX-02",
    purposes: ["Morale"],
  },
  {
    branch: "Hardware",
    subTeam: "Mycsology Foods",
    lineItem: "Morale",
    code: "HW-MF-02",
    purposes: ["Morale"],
  },
  {
    branch: "Hardware",
    subTeam: "Affectrum Vault",
    lineItem: "Morale",
    code: "HW-AV-02",
    purposes: ["Morale"],
  },

  // Data
  {
    branch: "Data",
    subTeam: "Chiefs",
    lineItem: "Morale",
    code: "DT-CH-02",
    purposes: ["Morale"],
  },
  {
    branch: "Data",
    subTeam: "DT",
    lineItem: "Project Materials",
    code: "DT-DT-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Data",
    subTeam: "Orion",
    lineItem: "Morale",
    code: "DT-OR-02",
    purposes: ["Morale"],
  },
  {
    branch: "Data",
    subTeam: "Remetra",
    lineItem: "Morale",
    code: "DT-RT-02",
    purposes: ["Morale"],
  },
  {
    branch: "Data",
    subTeam: "Foresight",
    lineItem: "Morale",
    code: "DT-FT-02",
    purposes: ["Morale"],
  },

  // Software
  {
    branch: "Software",
    subTeam: "Chiefs",
    lineItem: "Morale",
    code: "SW-CH-02",
    purposes: ["Morale"],
  },
  {
    branch: "Software",
    subTeam: "SW",
    lineItem: "Project Materials",
    code: "SW-SW-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Software",
    subTeam: "Boutline",
    lineItem: "Morale",
    code: "SW-BT-02",
    purposes: ["Morale"],
  },
  {
    branch: "Software",
    subTeam: "Inspirate Consulting",
    lineItem: "Morale",
    code: "SW-IC-02",
    purposes: ["Morale"],
  },
  {
    branch: "Software",
    subTeam: "Tomoji",
    lineItem: "Morale",
    code: "SW-TJ-02",
    purposes: ["Morale"],
  },
  {
    branch: "Software",
    subTeam: "Birdie and Claire",
    lineItem: "Morale",
    code: "SW-BC-02",
    purposes: ["Morale"],
  },
  {
    branch: "Software",
    subTeam: "Infra",
    lineItem: "Morale",
    code: "SW-IF-02",
    purposes: ["Morale"],
  },

  // Games
  {
    branch: "Games",
    subTeam: "Chiefs",
    lineItem: "Morale",
    code: "GD-CH-02",
    purposes: ["Morale"],
  },
  {
    branch: "Games",
    subTeam: "Board",
    lineItem: "Project Materials",
    code: "GD-GD-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Games",
    subTeam: "Deeplight Games",
    lineItem: "Project Materials",
    code: "GD-DG-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Games",
    subTeam: "Board",
    lineItem: "Morale",
    code: "GD-GD-02",
    purposes: ["Morale"],
  },
  {
    branch: "Games",
    subTeam: "Deeplight Games",
    lineItem: "Morale",
    code: "GD-GA-02",
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
  { name: "4imprint", url: "https://www.4imprint.com" },
  { name: "Adafruit", url: "https://www.adafruit.com" },
  { name: "Amazon", url: "https://www.amazon.com" },
  { name: "AndyMark", url: "https://www.andymark.com" },
  { name: "Arduino", url: "https://www.arduino.cc" },
  { name: "Custom Ink", url: "https://www.customink.com" },
  { name: "DigiKey Electronics", url: "https://www.digikey.com" },
  { name: "EasyEDA", url: "https://easyeda.com" },
  { name: "Edmund Optics", url: "https://www.edmundoptics.com" },
  { name: "Formlabs", url: "https://formlabs.com" },
  { name: "Harbor Freight", url: "https://www.harborfreight.com" },
  { name: "Home Depot", url: "https://www.homedepot.com" },
  { name: "JLCPCB", url: "https://jlcpcb.com" },
  { name: "McMaster-Carr", url: "https://www.mcmaster.com" },
  { name: "Misumi", url: "https://us.misumi-ec.com" },
  { name: "Mouser Electronics", url: "https://www.mouser.com" },
  { name: "Pololu", url: "https://www.pololu.com" },
  { name: "Prolabs", url: "https://www.prolabs.com" },
  { name: "Protolabs", url: "https://www.protolabs.com" },
  { name: "SendCutSend", url: "https://sendcutsend.com" },
  { name: "ServoCity", url: "https://www.servocity.com" },
  { name: "Sparkfun", url: "https://www.sparkfun.com" },
  { name: "StepperOnline", url: "https://www.omc-stepperonline.com" },
  { name: "Sticker Mule", url: "https://www.stickermule.com" },
  { name: "ULINE", url: "https://www.uline.com" },
  { name: "US Plastics", url: "https://www.usplastic.com" },
  { name: "Vevor", url: "https://www.vevor.com" },
  { name: "Vex Robotics", url: "https://www.vexrobotics.com" },
  { name: "Vistaprint", url: "https://www.vistaprint.com" },
  { name: "WaveShare", url: "https://www.waveshare.com" },
  { name: "Other", url: "" }
] as const satisfies ReadonlyArray<{ name: string; url?: string }>;
