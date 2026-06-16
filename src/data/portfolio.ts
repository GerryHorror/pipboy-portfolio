import type {
  ContactLink,
  EducationItem,
  ExperienceItem,
  Profile,
  Project,
  SkillGroup,
} from "../types";

const githubProfile = "https://github.com/GerryHorror";

export const profile: Profile = {
  name: "Gerard Blankenberg",
  role: "Graduate Software Developer",
  location: "Cape Town, South Africa",
  summary:
    "Graduate software developer with distinction-level academic performance and hands-on project work across C#, ASP.NET Core MVC, SQL-backed systems, and Kotlin Android. Prior finance and administration experience adds process discipline, accuracy, and business workflow awareness.",
  headlineStack: [
    "C#",
    ".NET 8",
    "ASP.NET Core MVC",
    "Kotlin Android",
    "SQL",
    "Azure",
  ],
  metrics: [
    { label: "LVL", value: "01" },
    { label: "FOCUS", value: ".NET" },
    { label: "AVG", value: "89.78%" },
    { label: "LOC", value: "CPT" },
  ],
};

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    level: 88,
    skills: ["C#", "Kotlin", "Java", "JavaScript", "TypeScript", "HTML", "CSS"],
  },
  {
    label: "Frameworks",
    level: 84,
    skills: [
      "ASP.NET Core MVC",
      "Entity Framework Core",
      "MVVM",
      "MERN stack",
      "React",
      "REST APIs",
    ],
  },
  {
    label: "Databases",
    level: 80,
    skills: ["SQL Server", "SQLite", "MySQL", "MongoDB", "Firebase Firestore", "Room"],
  },
  {
    label: "Cloud & Tools",
    level: 78,
    skills: [
      "Azure",
      "Firebase",
      "Git",
      "GitHub Actions",
      "Visual Studio",
      "Android Studio",
      "SonarCloud",
    ],
  },
  {
    label: "Concepts",
    level: 82,
    skills: [
      "MVC architecture",
      "Layered architecture",
      "Role-based access control",
      "CI/CD",
      "Secure coding",
      "Agile development",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "HealingInWriting",
    stack: [".NET 8", "ASP.NET Core MVC", "EF Core", "Azure SQL", "Azure App Service"],
    summary:
      "A web platform for a Cape Town non-profit with role-based flows for guests, volunteers, and administrators.",
    status: "Portfolio",
    signal: "Non-profit platform with role-aware workflows",
    highlights: [
      "Built event management, RSVPs, volunteer hour tracking, resource discovery, and survivor story workflows.",
      "Applied service-based business logic, repository pattern, AutoMapper, and Google Books API integration.",
      "Designed with POPIA-conscious handling for sensitive user stories and community resources.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/ST10046280-Blankenberg/healing-in-writing" }],
    tags: ["ASP.NET", "Azure", "RBAC"],
  },
  {
    title: "TightBudget",
    stack: ["Kotlin", "Android", "Firebase", "Room", "MVVM"],
    summary:
      "An offline-aware Android budgeting app for expense tracking, recurring transactions, receipts, and budget visualisation.",
    status: "Portfolio",
    signal: "Mobile budgeting with gamified habits",
    highlights: [
      "Used Firebase and Room to support cross-device sync with local persistence.",
      "Structured the app around MVVM for maintainability and predictable screen state.",
      "Added streaks, achievements, and challenges to encourage consistent budgeting.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/GerryHorror/tightbudget-prog7313" }],
    tags: ["Android", "Kotlin", "Firebase"],
  },
  {
    title: "CivicConnect",
    stack: ["ASP.NET Core MVC", "EF Core", "Data Structures", "Algorithms"],
    summary:
      "A municipal issue reporting platform with event management, authentication, and prioritised service requests.",
    status: "Complete",
    signal: "Civic reporting with algorithmic prioritisation",
    highlights: [
      "Implemented database-backed issue reporting, event management, and role-based authentication.",
      "Used BSTs, AVL trees, heaps, graphs, and queue-based logic for request prioritisation.",
      "Focused on recommendations and service request flow rather than a static CRUD-only implementation.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/GerryHorror/civic-connect-prog7312" }],
    tags: ["MVC", "Algorithms", "Civic tech"],
  },
  {
    title: "Crypsis",
    stack: ["MERN", "MongoDB", "JWT", "SonarCloud"],
    summary:
      "A secure payments portal with customer and employee flows, JWT authentication, RBAC, and step-up authentication.",
    status: "Complete",
    signal: "Security-focused portal implementation",
    highlights: [
      "Hardened the app with Helmet, rate limiting, sanitisation, password hashing, and account lockout.",
      "Masked sensitive data and separated customer and employee flows with RBAC.",
      "Used SonarCloud to support code quality checks during development.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ST10046280-Blankenberg/gerard-st10046280-insy7314-poe",
      },
    ],
    tags: ["Security", "MERN", "JWT"],
  },
  {
    title: "Additional Portfolio Projects",
    stack: ["ASP.NET Core MVC", "C#", "SQL Server", "Azure"],
    summary:
      "Supporting projects including CMCS, Recipe Tracker, KhumaloCraft Emporium, and AgriEnergyConnect.",
    status: "Portfolio",
    signal: "Breadth across MVC workflows and Azure deployment",
    highlights: [
      "Built PDF generation, automated calculations, admin workflows, and layered architecture patterns.",
      "Used SQL Server and Azure deployment workflows across several academic and portfolio builds.",
      "Practiced clear separation between data access, business logic, and user-facing MVC screens.",
    ],
    links: [{ label: "GitHub profile", href: githubProfile }],
    tags: ["C#", "SQL", "Azure"],
  },
];

export const experience: ExperienceItem[] = [
  {
    organisation: "STC International",
    role: "Finance Clerk",
    location: "Cape Town, South Africa",
    duration: "Feb 2016 - Sept 2021",
    highlights: [
      "Managed student, client, supplier, and financial administration across bookings, invoicing, receipts, petty cash, and Sage processing.",
      "Supported payroll, cash flow updates, management accounts, debtor follow-ups, audit requests, and internal IT troubleshooting.",
      "Built an Excel automation solution with IF and VLOOKUP functions to reduce manual repetition and improve accuracy.",
      "Acted as Interim Financial Manager in February 2020 and supported system migration to DataSwift.",
    ],
  },
];

export const education: EducationItem[] = [
  {
    credential: "Bachelor of Computer and Information Sciences in Application Development",
    institution: "IIE Varsity College",
    duration: "2023 - 2025",
    result: "Overall average: 89.78%",
  },
  {
    credential: "Higher Certificate in Mobile Application and Web Development",
    institution: "IIE Varsity College",
    duration: "2022",
    result: "Overall average: 88%",
  },
  {
    credential: "Golden Key International Honour Society",
    institution: "Academic Achievement",
    duration: "2025",
  },
  {
    credential: "Financial Management N6",
    institution: "Northlink College",
    duration: "2015",
  },
  {
    credential: "Business Management N6",
    institution: "Northlink College",
    duration: "2013",
  },
];

export const contactLinks: ContactLink[] = [
  {
    label: "gerardblankenberg@gmail.com",
    href: "mailto:gerardblankenberg@gmail.com",
    type: "email",
  },
  {
    label: "+27 81 448 1125",
    href: "tel:+27814481125",
    type: "phone",
  },
  {
    label: "GitHub",
    href: githubProfile,
    type: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gerard-blankenberg-64551428b/",
    type: "linkedin",
  },
  {
    label: "Download CV",
    href: "/Gerard_Blankenberg_CV.pdf",
    type: "cv",
  },
];
