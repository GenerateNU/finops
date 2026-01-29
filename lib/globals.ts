export const BRANCHES = ["Hardware", "Software", "Data", "Operations"];

export const BRANCH_TEAMS = [
  {
    name: "Hardware",
    teams: ["Acrylix", "Matcha Flow", "River Gauge", "Growver"],
  },
  {
    name: "Software",
    teams: ["Self Serve", "SkillSpark", "Toggo", "Inside Athletics", "Infrastructure"],
  },
  {
    name: "Data",
    teams: ["Cortex", "StrideTrack", "Remetra"],
  },
  {
    name: "Operations",
    teams: ["Alumni Relations & Operational Strategy", "Internal Tools Engineering", "External Relations & Content", "Marketing", "Finance"],
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
    subTeam: "Acrylix",
    lineItem: "Materials",
    code: "HW-AX-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Hardware",
    subTeam: "Acrylix",
    lineItem: "Morale",
    code: "HW-AX-02",
    purposes: ["Morale"],
  },
  {
    branch: "Hardware",
    subTeam: "Matcha Flow",
    lineItem: "Materials",
    code: "HW-MF-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Hardware",
    subTeam: "Matcha Flow",
    lineItem: "Morale",
    code: "HW-MF-02",
    purposes: ["Morale"],
  },
  {
    branch: "Hardware",
    subTeam: "River Gauge",
    lineItem: "Materials",
    code: "HW-RG-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Hardware",
    subTeam: "River Gauge",
    lineItem: "Morale",
    code: "HW-RG-02",
    purposes: ["Morale"],
  },
  {
    branch: "Hardware",
    subTeam: "Growver",
    lineItem: "Materials",
    code: "HW-GV-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Hardware",
    subTeam: "Growver",
    lineItem: "Morale",
    code: "HW-GV-02",
    purposes: ["Morale"],
  },

  // Software
  {
    branch: "Software",
    subTeam: "Self Serve",
    lineItem: "Materials",
    code: "SW-SS-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Software",
    subTeam: "Self Serve",
    lineItem: "Morale",
    code: "SW-SS-02",
    purposes: ["Morale"],
  },
  {
    branch: "Software",
    subTeam: "SkillSpark",
    lineItem: "Materials",
    code: "SW-SK-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Software",
    subTeam: "SkillSpark",
    lineItem: "Morale",
    code: "SW-SK-02",
    purposes: ["Morale"],
  },
  {
    branch: "Software",
    subTeam: "Toggo",
    lineItem: "Materials",
    code: "SW-TG-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Software",
    subTeam: "Toggo",
    lineItem: "Morale",
    code: "SW-TG-02",
    purposes: ["Morale"],
  },
  {
    branch: "Software",
    subTeam: "Inside Athletics",
    lineItem: "Materials",
    code: "SW-IA-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Software",
    subTeam: "Inside Athletics",
    lineItem: "Morale",
    code: "SW-IA-02",
    purposes: ["Morale"],
  },
  {
    branch: "Software",
    subTeam: "Infrastructure",
    lineItem: "Materials",
    code: "SW-IN-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Software",
    subTeam: "Infrastructure",
    lineItem: "Morale",
    code: "SW-IN-02",
    purposes: ["Morale"],
  },

  // Data
  {
    branch: "Data",
    subTeam: "Cortex",
    lineItem: "Materials",
    code: "DT-CX-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Data",
    subTeam: "Cortex",
    lineItem: "Morale",
    code: "DT-CX-02",
    purposes: ["Morale"],
  },
  {
    branch: "Data",
    subTeam: "StrideTrack",
    lineItem: "Materials",
    code: "DT-ST-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Data",
    subTeam: "StrideTrack",
    lineItem: "Morale",
    code: "DT-ST-02",
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

  // Operations
  {
    branch: "Operations",
    subTeam: "Alumni Relations & Operational Strategy",
    lineItem: "Morale",
    code: "OP-AR-02",
    purposes: ["Morale"],
  },
  {
    branch: "Operations",
    subTeam: "Internal Tools Engineering",
    lineItem: "Morale",
    code: "OP-IT-02",
    purposes: ["Morale"],
  },
  {
    branch: "Operations",
    subTeam: "External Relations & Content",
    lineItem: "Morale",
    code: "OP-ER-02",
    purposes: ["Morale"],
  },
  {
    branch: "Operations",
    subTeam: "Marketing",
    lineItem: "Morale",
    code: "OP-MK-02",
    purposes: ["Morale"],
  },
  {
    branch: "Operations",
    subTeam: "Finance",
    lineItem: "Morale",
    code: "OP-FN-02",
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
