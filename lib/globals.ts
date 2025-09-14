export const BRANCHES = ["Hardware", "Software", "Data", "Community"];

export const BRANCH_TEAMS = [
  {
    name: "Hardware",
    teams: ["GCE", "GreenTower", "CandleMaker", "SageWare"],
  },
  {
    name: "Software",
    teams: ["CineCircle", "Prisere", "MoveWealth", "The Special Standard"],
  },
  {
    name: "Data",
    teams: ["Cortex", "Unsprawl"],
  },
  {
    name: "Community",
    teams: ["Alumni Relations", "Internal Insights", "Learning & Development", "Events", "Marketing", "Finance"],
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
    subTeam: "Other",
    lineItem: "Pre-Approved",
    code: "SH-OT-50",
    purposes: ["Client Project Materials", "Morale", "Promotional Materials", "Other"],
  },
  {
    branch: "Hardware",
    subTeam: "GCE",
    lineItem: "Materials",
    code: "HW-GC-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Hardware",
    subTeam: "GCE",
    lineItem: "Morale",
    code: "HW-GC-02",
    purposes: ["Morale"],
  },
  {
    branch: "Hardware",
    subTeam: "GreenTower",
    lineItem: "Materials",
    code: "HW-GT-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Hardware",
    subTeam: "GreenTower",
    lineItem: "Morale",
    code: "HW-GT-02",
    purposes: ["Morale"],
  },
  {
    branch: "Hardware",
    subTeam: "CandleMaker",
    lineItem: "Materials",
    code: "HW-CM-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Hardware",
    subTeam: "CandleMaker",
    lineItem: "Morale",
    code: "HW-CM-02",
    purposes: ["Morale"],
  },
  {
    branch: "Hardware",
    subTeam: "SageWare",
    lineItem: "Materials",
    code: "HW-SW-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Hardware",
    subTeam: "SageWare",
    lineItem: "Morale",
    code: "HW-SW-02",
    purposes: ["Morale"],
  },
  {
    branch: "Software",
    subTeam: "CineCircle",
    lineItem: "Materials",
    code: "SW-CC-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Software",
    subTeam: "CineCircle",
    lineItem: "Morale",
    code: "SW-CC-02",
    purposes: ["Morale"],
  },
  {
    branch: "Software",
    subTeam: "Prisere",
    lineItem: "Materials",
    code: "SW-PR-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Software",
    subTeam: "Prisere",
    lineItem: "Morale",
    code: "SW-PR-02",
    purposes: ["Morale"],
  },
  {
    branch: "Software",
    subTeam: "MoveWealth",
    lineItem: "Materials",
    code: "SW-MW-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Software",
    subTeam: "MoveWealth",
    lineItem: "Morale",
    code: "SW-MW-02",
    purposes: ["Morale"],
  },
  {
    branch: "Software",
    subTeam: "The Special Standard",
    lineItem: "Materials",
    code: "SW-TSS-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Software",
    subTeam: "The Special Standard",
    lineItem: "Morale",
    code: "SW-TSS-02",
    purposes: ["Morale"],
  },
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
    subTeam: "Unsprawl",
    lineItem: "Materials",
    code: "DT-US-01",
    purposes: ["Client Project Materials"],
  },
  {
    branch: "Data",
    subTeam: "Unsprawl",
    lineItem: "Morale",
    code: "DT-US-02",
    purposes: ["Morale"],
  },
  {
    branch: "Community",
    subTeam: "Alumni Relations",
    lineItem: "Morale",
    code: "CM-AR-02",
    purposes: ["Morale"],
  },
  {
    branch: "Community",
    subTeam: "Internal Insights",
    lineItem: "Morale",
    code: "CM-II-02",
    purposes: ["Morale"],
  },
  {
    branch: "Community",
    subTeam: "Learning & Development",
    lineItem: "Morale",
    code: "CM-LD-02",
    purposes: ["Morale"],
  },
  {
    branch: "Community",
    subTeam: "Events",
    lineItem: "Morale",
    code: "CM-EV-02",
    purposes: ["Morale"],
  },
  {
    branch: "Community",
    subTeam: "Marketing",
    lineItem: "Morale",
    code: "CM-MK-02",
    purposes: ["Morale"],
  },
  {
    branch: "Community",
    subTeam: "Finance",
    lineItem: "Morale",
    code: "CM-FN-02",
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
