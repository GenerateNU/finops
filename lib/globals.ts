export const BRANCHES = ["Hardware", "Software", "Data", "Organizational Strategy"];

export const BRANCH_TEAMS = [
  {
    name: "Hardware",
    teams: ["Affectrum Vault", "X-Ray", "Cicada Health", "Myscology Foods"],
  },
  {
    name: "Software",
    teams: ["Boutline", "Inspirate Consulting", "Tomoji", "TermiTag", "Infra"],
  },
  {
    name: "Data",
    teams: ["Foresight", "NERD", "Remetra"],
  },
  {
    name: "Organizational Strategy",
    teams: ["Operations", "Marketing", "Finance"],
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

  // Hardware
  {
    branch: "Hardware",
    subTeam: "Affectrum Vault",
    lineItem: "Materials",
    code: "HW-AV-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Hardware",
    subTeam: "Affectrum Vault",
    lineItem: "Morale",
    code: "HW-AV-02",
    purposes: ["Morale"],
  },
  {
    branch: "Hardware",
    subTeam: "X-Ray",
    lineItem: "Materials",
    code: "HW-XR-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Hardware",
    subTeam: "X-Ray",
    lineItem: "Morale",
    code: "HW-XR-02",
    purposes: ["Morale"],
  },
  {
    branch: "Hardware",
    subTeam: "Cicada Health",
    lineItem: "Materials",
    code: "HW-CH-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Hardware",
    subTeam: "Cicada Health",
    lineItem: "Morale",
    code: "HW-CH-02",
    purposes: ["Morale"],
  },
  {
    branch: "Hardware",
    subTeam: "Myscology Foods",
    lineItem: "Materials",
    code: "HW-MY-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Hardware",
    subTeam: "Myscology Foods",
    lineItem: "Morale",
    code: "HW-MY-02",
    purposes: ["Morale"],
  },

  // Software
  {
    branch: "Software",
    subTeam: "Boutline",
    lineItem: "Materials",
    code: "SW-BL-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Software",
    subTeam: "Boutline",
    lineItem: "Morale",
    code: "SW-BL-02",
    purposes: ["Morale"],
  },
  {
    branch: "Software",
    subTeam: "Inspirate Consulting",
    lineItem: "Materials",
    code: "SW-IC-01",
    purposes: ["Client Project Materials"],
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
    lineItem: "Materials",
    code: "SW-TJ-01",
    purposes: ["Client Project Materials"],
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
    subTeam: "TermiTag",
    lineItem: "Materials",
    code: "SW-TM-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Software",
    subTeam: "TermiTag",
    lineItem: "Morale",
    code: "SW-TM-02",
    purposes: ["Morale"],
  },
  {
    branch: "Software",
    subTeam: "Infra",
    lineItem: "Materials",
    code: "SW-IN-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Software",
    subTeam: "Infra",
    lineItem: "Morale",
    code: "SW-IN-02",
    purposes: ["Morale"],
  },

  // Data
  {
    branch: "Data",
    subTeam: "Foresight",
    lineItem: "Materials",
    code: "DT-FS-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Data",
    subTeam: "Foresight",
    lineItem: "Morale",
    code: "DT-FS-02",
    purposes: ["Morale"],
  },
  {
    branch: "Data",
    subTeam: "NERD",
    lineItem: "Materials",
    code: "DT-ND-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Data",
    subTeam: "NERD",
    lineItem: "Morale",
    code: "DT-ND-02",
    purposes: ["Morale"],
  },
  {
    branch: "Data",
    subTeam: "Remetra",
    lineItem: "Materials",
    code: "DT-RM-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Data",
    subTeam: "Remetra",
    lineItem: "Morale",
    code: "DT-RM-02",
    purposes: ["Morale"],
  },

  // Organizational Strategy
  {
    branch: "Organizational Strategy",
    subTeam: "Operations",
    lineItem: "Morale",
    code: "OS-OP-02",
    purposes: ["Morale"],
  },
  {
    branch: "Organizational Strategy",
    subTeam: "Marketing",
    lineItem: "Morale",
    code: "OS-MK-02",
    purposes: ["Morale"],
  },
  {
    branch: "Organizational Strategy",
    subTeam: "Finance",
    lineItem: "Morale",
    code: "OS-FN-02",
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
