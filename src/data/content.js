const content = {
  profile: {
    name: 'Mehedi Hasan Shuvo',
    title: 'Backend Software Engineer',
    tagline: 'I build secure, scalable backends — REST APIs and systems that serve millions.',
    intro:
      'Software Engineer with 5+ years building scalable backends across telecom and ERP — ' +
      'PHP/Laravel and Node.js, with a focus on clean architecture, performance, and reliability.',
    location: 'Dhaka, Bangladesh',
    email: 'rpm_shuvo@outlook.com',
    phone: '+8801607242482',
    resumeUrl: '/Mehedi-Hasan-Shuvo-Resume.pdf',
    photoUrl: '/profile.jpg',
    availability: 'Open to international roles (relocation / visa sponsorship) and freelance.',
  },
  nav: [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'publication', label: 'Publication' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ],
  social: [
    { name: 'GitHub', icon: 'github', url: 'https://github.com/rpmshuvo' },
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/shuvo-rpm' },
    { name: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/rpm.shuvo' },
  ],
  stats: [
    { value: '5+', label: 'Years experience' },
    { value: '3M+', label: 'Daily active users served' },
    { value: '1', label: 'Peer-reviewed publication' },
  ],
  about: {
    paragraphs: [
      'I’m a backend-focused Software Engineer with 5+ years of experience crafting solutions ' +
        'across the telecommunications and ERP landscapes. I design and build RESTful APIs that ' +
        'are secure, scalable, and resilient under heavy load.',
      'Currently at Brain Station 23, I work as an augmented resource for Banglalink Digital ' +
        'Communications, building APIs and CMS features for products like the MyBL SuperApp — ' +
        'serving 3M+ daily active users. I care about clean code, SOLID design, and measurable ' +
        'performance wins.',
      'I co-authored a peer-reviewed paper on distributed-systems leader election, and I’m ' +
        'steadily working toward a software architect role.',
    ],
    facts: [
      'Based in Dhaka, Bangladesh',
      'Open to relocation / visa sponsorship',
      'Telecom & ERP domain experience',
      'Architecture track',
    ],
  },
  skills: [
    { group: 'Languages', items: ['PHP', 'Go', 'JavaScript', 'Dart', 'C++', 'C', 'Java'] },
    { group: 'Backend & Frameworks', items: ['Laravel', 'Node.js', 'REST API', 'jQuery', 'AJAX', 'JSON/XML', 'Bootstrap', 'Flutter'] },
    { group: 'Databases', items: ['MySQL', 'MS SQL Server', 'Oracle', 'Redis'] },
    { group: 'DevOps & Infra', items: ['Docker', 'Linux', 'RabbitMQ', 'Git', 'Argo CD', 'Bitbucket', 'GitHub', 'GitLab'] },
    { group: 'Practices', items: ['Agile/Scrum', 'SOLID', 'Design Patterns', 'OOP', 'Dependency Injection', 'TDD'] },
    { group: 'Tools', items: ['VS Code', 'Postman', 'Jira', 'Trello', 'OpenProject'] },
  ],
  experience: [
    {
      role: 'Software Engineer',
      company: 'Brain Station 23 Ltd.',
      location: 'Dhaka, Bangladesh',
      period: 'Nov 2022 — Present',
      summary: 'Augmented resource at Banglalink Digital Communications — MyBL SuperApp, Banglalink.net, Ryze Bangladesh.',
      points: [
        'Designed and developed secure, scalable RESTful APIs serving 3M+ daily active users (MyBL).',
        'Built and maintained CMS features for web products.',
        'Continuously improved performance and scalability; followed best practices and clean code.',
        'Collaborated with cross-functional teams and stakeholders to ensure timely delivery.',
      ],
    },
    {
      role: 'Software Engineer',
      company: 'Erp2all.com',
      location: 'Dhaka, Bangladesh',
      period: 'Jan 2021 — Oct 2022',
      summary: 'Cloud-based ERP platform built with Laravel.',
      points: [
        'Built business logic and features for a cloud-based ERP using Laravel.',
        'Took part in requirement analysis, task estimation, and code review.',
        'Managed integration and deployment on an OpenLiteSpeed (OLS) server.',
      ],
    },
    {
      role: 'Junior Software Engineer',
      company: 'Ngen IT',
      location: 'Dhaka, Bangladesh',
      period: 'Jul 2019 — Nov 2020',
      summary: 'Backend for a real-time B2B platform and messaging service.',
      points: [
        'Wrote the backend for a real-time B2B platform and a messaging service.',
        'Built multiple Laravel web apps with payment gateways and responsive product filtering.',
        'Improved performance ~30% via lazy loading, caching, and Elasticsearch.',
      ],
    },
    {
      role: 'Teaching Assistant',
      company: 'American International University-Bangladesh (AIUB)',
      location: 'Dhaka, Bangladesh',
      period: 'Oct 2019 — Dec 2019',
      summary: 'TA for algorithms and mobile computing courses.',
      points: [
        'Assisted teaching Design & Analysis of Algorithms and Mobile & Wireless Computing.',
        'Helped 90+ students debug code and learn debugging strategies.',
      ],
    },
  ],
  projects: [
    {
      name: 'MyBL SuperApp',
      org: 'Banglalink · via Brain Station 23',
      proprietary: true,
      blurb: 'High-scale telecom super-app. I build and harden RESTful APIs that stay secure and performant at 3M+ daily active users.',
      impact: ['3M+ DAU', 'Secure & scalable REST APIs', 'CMS features'],
      tech: ['PHP', 'Laravel', 'MySQL', 'Redis', 'REST API'],
    },
    {
      name: 'Ryze Bangladesh',
      org: 'Banglalink · via Brain Station 23',
      proprietary: true,
      blurb: 'Ryze — the AI-powered super app from the house of Banglalink — brings connectivity, entertainment, productivity, and rewards together in one place. I contribute backend APIs and integrations.',
      impact: ['Unified super-app backend', 'API integrations'],
      tech: ['PHP', 'Laravel', 'REST API', 'Redis'],
    },
    {
      name: 'Cloud ERP',
      org: 'Erp2all.com',
      proprietary: true,
      blurb: 'Cloud-based ERP platform. I implemented business logic and features, contributed to requirement analysis and code review, and deployed on OLS.',
      impact: ['Cloud-based ERP', 'Code review & estimation'],
      tech: ['PHP', 'Laravel', 'MySQL', 'Linux'],
    },
    {
      name: 'Real-time B2B Platform',
      org: 'Ngen IT',
      proprietary: true,
      blurb: 'Real-time B2B platform with a messaging service, payment gateways, and product filtering. Tuned for performance.',
      impact: ['+30% performance', 'Payments & messaging', 'Elasticsearch'],
      tech: ['PHP', 'Laravel', 'Elasticsearch', 'Caching'],
    },
  ],
  publication: {
    title: 'A Waiting Time Based Bully Algorithm for Leader Node Selection in Distributed System',
    venue: 'Malaysian Journal of Science, vol. 41, no. 3, pp. 38–43 (2022)',
    authors: 'Md. Navid Bin Anwar, Afroza Nahar, Nashid Kamal, Mehedi Hasan Shuvo',
    doi: 'https://doi.org/10.22452/mjs.vol41no3.5',
  },
  education: {
    degree: 'B.Sc. in Computer Science and Engineering',
    school: 'American International University-Bangladesh (AIUB)',
    period: 'Jan 2015 — Jan 2020',
    courses: ['OOAD & Design Patterns', 'Data Structures & Algorithms', 'Artificial Intelligence & Expert Systems', 'Compiler Design'],
  },
};

export default content;
