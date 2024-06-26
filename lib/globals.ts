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
      "C-Star",
      "FuFu Pot",
      "Makerspace",
      "Muscle Recovery",
      "WaveWise",
      "Workshops",
    ],
  },
  {
    name: "Operations",
    teams: ["Finance", "Information", "Strategy"],
  },
  {
    name: "Software",
    teams: ["Carbon", "Care-Wallet", "Couplet", "SAC", "Tubender"],
  },
];

type Budget = {
  team: string;
  subTeam: string;
  lineItem: string;
  code: string;
  purposes: string[] | string;
};

export const BUDGETS = [
  {
    team: "Management",
    subTeam: "Executive Director",
    lineItem: "Discretionary",
    code: "MG-ED-03",
    purposes: ["Client Project Materials", "Morale", "Showcase", "Other"],
  },
  {
    team: "Management",
    subTeam: "Directors",
    lineItem: "Morale",
    code: "MG-DR-02",
    purposes: ["Morale"],
  },
  {
    team: "Engagement",
    subTeam: "Director",
    lineItem: "Discretionary",
    code: "EG-DR-03",
    purposes: ["Morale", "Other"],
  },
  {
    team: "Engagement",
    subTeam: "Director/Chiefs",
    lineItem: "Morale",
    code: "EG-DC-02",
    purposes: ["Morale"],
  },
  {
    team: "Engagement",
    subTeam: "Content",
    lineItem: "Merchandise",
    code: "EG-MH-04",
    purposes: ["Other"],
  },
  {
    team: "Engagement",
    subTeam: "Content",
    lineItem: "Morale",
    code: "EG-CT-02",
    purposes: ["Morale"],
  },
  {
    team: "Engagement",
    subTeam: "Events",
    lineItem: "Morale",
    code: "EG-EV-02",
    purposes: ["Morale"],
  },
  {
    team: "Engagement",
    subTeam: "Events",
    lineItem: "General Events",
    code: "EG-EV-05",
    purposes: ["Morale"],
  },
  {
    team: "Engagement",
    subTeam: "Events",
    lineItem: "Showcase",
    code: "EG-EV-99",
    purposes: ["Showcase"],
  },
  {
    team: "Engagement",
    subTeam: "Experiences",
    lineItem: "Morale",
    code: "EG-EX-02",
    purposes: ["Morale"],
  },
  {
    team: "Engagement",
    subTeam: "Content",
    lineItem: "Materials",
    code: "EG-MT-04",
    purposes: ["Other"],
  },
  {
    team: "Engagement",
    subTeam: "Experiences",
    lineItem: "Staycation",
    code: "EG-EX-98",
    purposes: ["Other"],
  },
  {
    team: "Hardware",
    subTeam: "Director",
    lineItem: "Discretionary",
    code: "HW-DR-03",
    purposes: ["Morale", "Other"],
  },
  {
    team: "Hardware",
    subTeam: "Project 1",
    lineItem: "Materials",
    code: "HW-P1-01",
    purposes: ["Client Project Materials"],
  },
  {
    team: "Hardware",
    subTeam: "Project 2",
    lineItem: "Materials",
    code: "HW-P2-02",
    purposes: ["Client Project Materials"],
  },
  {
    team: "Hardware",
    subTeam: "Project 3",
    lineItem: "Materials",
    code: "HW-P3-03",
    purposes: ["Client Project Materials"],
  },
  {
    team: "Hardware",
    subTeam: "Project 4",
    lineItem: "Materials",
    code: "HW-P4-04",
    purposes: ["Client Project Materials"],
  },
  {
    team: "Hardware",
    subTeam: "Project 1",
    lineItem: "Morale",
    code: "HW-P1-02",
    purposes: ["Morale"],
  },
  {
    team: "Hardware",
    subTeam: "Project 2",
    lineItem: "Morale",
    code: "HW-P2-02",
    purposes: ["Morale"],
  },
  {
    team: "Hardware",
    subTeam: "Project 3",
    lineItem: "Morale",
    code: "HW-P3-02",
    purposes: ["Morale"],
  },
  {
    team: "Hardware",
    subTeam: "Project 4",
    lineItem: "Morale",
    code: "HW-P4-02",
    purposes: ["Morale"],
  },
  {
    team: "Operations",
    subTeam: "Director",
    lineItem: "Discretionary",
    code: "OP-DR-03",
    purposes: ["Morale", "Showcase", "Other"],
  },
  {
    team: "Operations",
    subTeam: "Director/Chiefs",
    lineItem: "Morale",
    code: "OP-DC-02",
    purposes: ["Morale"],
  },
  {
    team: "Operations",
    subTeam: "Finance",
    lineItem: "Morale",
    code: "OP-FI-02",
    purposes: ["Morale"],
  },
  {
    team: "Operations",
    subTeam: "Information",
    lineItem: "Morale",
    code: "OP-IF-02",
    purposes: ["Morale"],
  },
  {
    team: "Operations",
    subTeam: "Strategy",
    lineItem: "Morale",
    code: "OP-ST-02",
    purposes: ["Morale"],
  },
  {
    team: "Software",
    subTeam: "Director",
    lineItem: "Discretionary",
    code: "SW-DR-03",
    purposes: ["Client Project Materials", "Morale", "Other"],
  },
  {
    team: "Software",
    subTeam: "Design Leads/Chiefs",
    lineItem: "Morale",
    code: "SW-DS-02",
    purposes: ["Morale"],
  },
  {
    team: "Software",
    subTeam: "Engineering Leads/Chiefs",
    lineItem: "Morale",
    code: "SW-EG-02",
    purposes: ["Morale"],
  },
  {
    team: "Software",
    subTeam: "Product Leads/Chiefs",
    lineItem: "Morale",
    code: "SW-PD-02",
    purposes: ["Morale"],
  },
  {
    team: "Software",
    subTeam: "Project 1",
    lineItem: "Morale",
    code: "SW-P1-02",
    purposes: ["Morale"],
  },
  {
    team: "Software",
    subTeam: "Project 2",
    lineItem: "Morale",
    code: "SW-P2-02",
    purposes: ["Morale"],
  },
  {
    team: "Software",
    subTeam: "Project 3",
    lineItem: "Morale",
    code: "SW-P3-02",
    purposes: ["Morale"],
  },
  {
    team: "Software",
    subTeam: "Project 4",
    lineItem: "Morale",
    code: "SW-P4-02",
    purposes: ["Morale"],
  },
  {
    team: "Software",
    subTeam: "Project 5",
    lineItem: "Morale",
    code: "SW-P5-02",
    purposes: ["Morale"],
  },
];

export const BUDGETS_BY_TEAM = BUDGETS.reduce(
  (groups: Record<string, Budget[]>, budget: Budget) => {
    if (!groups[budget.team]) {
      groups[budget.team] = [];
    }
    groups[budget.team].push(budget);
    return groups;
  },
  {} as Record<string, Budget[]>
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
  "eBay",
  // "Foambymail",
  "Formlabs",
  // "Grainger Industrial Supplies",
  "McMaster Carr",
  "Misumi",
  "Mouser",
  "Prolabs",
  "Protolabs",
  // "SendCutSend",
  "ServoCity",
  "Sparkfun",
  "Sticker Mule",
  "Vex Robotics",
  "Vistaprint",
  "Other",
];
