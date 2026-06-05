import { CVData } from './types';

const SOCIALS = {
  facebook: "https://facebook.com/Migor28",
  youtube: "https://www.youtube.com/channel/UCajqBdk5-ggySYCaS_g8x4g",
  odooStore: "https://apps.odoo.com/apps/modules/browse?search=Mark+Nguyen",
  linkedin: "https://www.linkedin.com/in/minh-nguy%E1%BB%85n-v%C4%83n-405303251/",
  github: "https://github.com/minhminh191000",
  odooDemo: "erp.migor.site"
};

export const DATA_EN: CVData = {
  personal: {
    name: "Nguyen Van Minh",
    dob: "19-10-2000",
    gender: "Male",
    role: "Odoo Developer | Python Developer | Team Leader",
    avatar: "./avatar.jpg",
    cvLink: "./NGUYEN-VAN-MINH.pdf"
  },
  contact: {
    phone: "+84 328716036",
    email: "marknguyen.migor@gmail.com",
    address: "Ha Noi, Viet Nam",
    socials: SOCIALS
  },
  education: {
    period: "2018 - 2023",
    school: "ACADEMY OF CRYPTOGRAPHY TECHNIQUES (KMA)",
    major: "Information technology",
    specialization: "Mobile Software Development",
    gpa: "2.8/4.0",
    description: "A leading institute in Vietnam for Information Security and IT. Focused on logical thinking, algorithms, and practical software development skills."
  },
  experience: [
    {
      id: 1,
      period: "2024 - Present",
      company: "SOLUTIONS FOR SMART FACTORY JOINT STOCK COMPANY",
      website: "https://factorysolution.vn/",
      summary: "Leading provider of smart factory solutions in Vietnam.",
      role: "Odoo Developer, Team Leader",
      responsibilities: [
        "Propose end-to-end technical solutions for client projects",
        "Lead and mentor a team of Odoo developers",
        "Develop and customize applications on the Odoo platform",
        "Own project intake and design the core architecture"
      ]
    },
    {
      id: 2,
      period: "2023 - 2024",
      company: "B&K SOFTWARE",
      website: "https://bnksolution.com/",
      summary: "Software development and outsourcing company.",
      role: "Odoo Developer, Python Developer",
      responsibilities: [
        "Developing applications on Odoo system",
        "Maintain and develop additional features on the Odoo system",
        "Manage and deploy test servers"
      ]
    },
    {
      id: 3,
      period: "2021 - 2023",
      company: "TINH VAN SOFTWARE",
      website: "https://www.tso.vn/",
      summary: "One of the leading technology groups in Vietnam.",
      role: "Odoo Developer, Python Developer",
      responsibilities: [
        "Web application programming according to the company's plan",
        "Write the app's api, work with the interface designer",
        "Maintain and develop more features of the web application"
      ]
    }
  ],
  projects: [
    {
      id: 1,
      name: "ERP - Nam Y Duong",
      period: "2026 - Present",
      customer: "Nam Y Duong",
      description: "Maintenance and integration for a traditional medicine ERP. Connect Odoo with multi-channel sales tools and accounting platforms.",
      teamSize: "1 Developer - 1 BA",
      position: "Developer",
      responsibilities: [
        "CRM customization and workflow optimization",
        "Pancake integration for multi-channel orders",
        "Viettel Post & Viettel Fulfillment shipping integration",
        "MISA accounting synchronization"
      ],
      technologies: "Odoo 18"
    },
    {
      id: 2,
      name: "MES - Manufacturing Execution System",
      period: "2025 - Present",
      customer: "Factory Solution",
      description: "Deploy and develop a comprehensive MES system for manufacturing management, integrating equipment management, quality control, and production planning.",
      teamSize: "3 Developer - 1 BA - 1 PM",
      position: "Developer Lead",
      responsibilities: [
        "Equipment Management: track and manage factory equipment lifecycle",
        "Quality Management: inspection, defect tracking, quality reporting",
        "Production Management: work orders, production scheduling, progress tracking"
      ],
      technologies: "Odoo 19, Stock, MRP, Quality"
    },
    {
      id: 3,
      name: "HRM - VinFast Thinh Cuong",
      period: "2025",
      customer: "Global AI (VinFast Thinh Cuong)",
      description: "Maintenance and debugging of a live HR system serving approximately 4,000 active users.",
      teamSize: "2 Developer - 2 BA - 1 PM",
      position: "Team Lead",
      responsibilities: [
        "Maintain HR, Payroll, Overtime and Attendance modules",
        "Integrate face recognition for attendance",
        "Build REST APIs consumed by a Flutter mobile app"
      ],
      technologies: "Odoo 15"
    },
    {
      id: 4,
      name: "Vipsen ERP",
      period: "2024",
      customer: "Vipsen.vn",
      description: "Feature development on Odoo 17 for CRM, Sales and Inventory.",
      teamSize: "1 Developer",
      position: "Developer",
      responsibilities: [
        "Develop CRM, Sales and Inventory features",
        "Build custom reports per business requirements"
      ],
      technologies: "Odoo 17"
    },
    {
      id: 5,
      name: "Migrate Odoo 14 → Odoo 16 (Z114)",
      period: "2024 - 2025",
      customer: "Factory Z114",
      description: "Upgrade 30 Odoo modules from version 14 to version 16, including data and functional migration.",
      teamSize: "1 Developer",
      position: "Developer",
      responsibilities: [
        "Migrate custom modules to Odoo 16 API",
        "Migrate and validate the database",
        "Run functional and regression testing"
      ],
      technologies: "Odoo 14 Community → Odoo 16 Community"
    },
    {
      id: 6,
      name: "VNPay Integration",
      period: "2024",
      customer: "AnNamBaoSo",
      description: "Build a system to integrate VNPay payment gateway and return horoscope results to customers on Namanbaoso.vn.",
      teamSize: "1 Developer",
      position: "Developer",
      responsibilities: [
        "Integrate VNPay payment gateway end-to-end",
        "Customize Odoo modules to support the business workflow"
      ],
      technologies: "Odoo 16 Community"
    },
    {
      id: 7,
      name: "Production Management & Supervision",
      period: "2024",
      customer: "VDI (24 Factories)",
      description: "Build a production management platform deployed across 24 factories, integrating an MES system and a production planning module.",
      teamSize: "6 Developer - 1 BA",
      position: "Developer + Team Lead",
      responsibilities: [
        "Develop core modules for the platform",
        "Lead code review on GitLab for the entire team",
        "Provide technical solutions and architecture decisions"
      ],
      technologies: "Odoo 16 Community"
    },
    {
      id: 8,
      name: "Workflow PBM",
      period: "2024",
      customer: "VDI",
      description: "Build a system for assigning and tracking tasks across departments.",
      teamSize: "6 Developer - 1 BA",
      position: "Developer + Team Lead",
      responsibilities: [
        "Develop core modules",
        "Lead code review on GitLab",
        "Provide technical solutions for the project"
      ],
      technologies: "Odoo 16 Community"
    },
    {
      id: 9,
      name: "FUJI LUXURY ERP",
      period: "2024",
      customer: "Fuji Luxury",
      description: "End-to-end digital transformation for Fuji Luxury, covering HR, Maintenance, CRM and Warranty.",
      teamSize: "4 Developer - 2 BA - 1 Lead - CTO",
      position: "Developer + Team Lead",
      responsibilities: [
        "Propose solutions for each feature based on customer requirements",
        "Estimate effort and divide work among the team",
        "Mentor developers and review logical design",
        "Implement HRM, Maintenance, CRM and Warranty modules"
      ],
      technologies: "Odoo 16 Community"
    },
    {
      id: 10,
      name: "WINKI ERP",
      period: "2024",
      customer: "Winki Group",
      description: "End-to-end digital transformation for Winki Group, covering HR, CRM, Sales, Marketing and Inventory.",
      teamSize: "4 Developer - 2 BA - 1 Lead - CTO",
      position: "Developer + Team Lead",
      responsibilities: [
        "Propose solutions for each feature",
        "Estimate effort and divide work among the team",
        "Mentor developers",
        "Implement HRM, CRM, Sales, Marketing and Inventory modules"
      ],
      technologies: "Odoo 16 Community"
    },
    {
      id: 11,
      name: "BIDV RPA",
      period: "2023 - 2024",
      customer: "BIDV (Private)",
      description: "Migrate and rebuild RPA processes for banking workflows using AkaBot.",
      teamSize: "5 Developer - 5 BA",
      position: "Developer",
      responsibilities: [
        "Migrate banking processes from UiPath to AkaBot",
        "Update workflows to meet new banking regulations"
      ],
      technologies: "AkaBot, UiPath"
    },
    {
      id: 12,
      name: "E-commerce Integration",
      period: "2023 - 2024",
      customer: "Private",
      description: "Integrate Odoo with Magento, Shopee, Lazada and WooCommerce platforms for order and product synchronization.",
      teamSize: "2 Developer - 1 BA",
      position: "Developer + PM",
      responsibilities: [
        "Use webhooks and APIs to sync orders and products into Odoo",
        "Research third-party APIs across platforms",
        "Propose solutions, develop, unit test, deploy and UAT"
      ],
      technologies: "Odoo 16, Magento, Shopee, Lazada, WooCommerce"
    },
    {
      id: 13,
      name: "Manage BU's Test Servers",
      period: "2023 - 2024",
      customer: "Internal",
      description: "Manage and operate all test servers for the Business Unit, including deployment, backup and presale support.",
      teamSize: "1 Developer (DevOps)",
      position: "DevOps",
      responsibilities: [
        "Deploy systems to customer servers",
        "Regularly check and back up customer data",
        "Build test servers and prepare demo data for presale"
      ],
      technologies: "Ubuntu, Docker, GitLab Runner, Bitbucket Runner"
    },
    {
      id: 14,
      name: "Migrate Odoo 13 → Odoo 16 (IMPIRIX)",
      period: "2023",
      customer: "IMPIRIX (Private)",
      description: "Upgrade IMPIRIX system from Odoo 13 to Odoo 16, including base and custom modules.",
      teamSize: "4 Developer - 1 BA",
      position: "Developer",
      responsibilities: [
        "Migrate Odoo base and custom modules",
        "Research and migrate the database",
        "Migrate functions and run unit tests"
      ],
      technologies: "Odoo 13 → Odoo 16"
    },
    {
      id: 15,
      name: "Maintenance (Sopoka + Baihe + Y Te Viet)",
      period: "2023",
      customer: "Private",
      description: "Maintenance and customer support across multiple Odoo deployments.",
      teamSize: "1 Developer - 1 BA",
      position: "Developer",
      responsibilities: [
        "Customize new features based on customer requests",
        "Troubleshoot incidents and provide end-user support",
        "Diagnose and resolve technical issues to minimize downtime",
        "Maintain Inventory, Accounting and Sales Order modules"
      ],
      technologies: "Odoo 13, Odoo 14, Odoo 15, Odoo 16"
    },
    {
      id: 16,
      name: "Elderly Care IoT (POC)",
      period: "2023",
      customer: "Private",
      description: "IoT proof of concept for elderly care: process sensor data from hospital beds to alert doctors in real time.",
      teamSize: "3 Developer - 1 BA",
      position: "Developer",
      responsibilities: [
        "Process sensor data streams from hospital beds",
        "Build alert pipeline and dashboards for medical staff"
      ],
      technologies: "Python, Grafana"
    },
    {
      id: 17,
      name: "Baby Company",
      period: "2023",
      customer: "Private",
      description: "Build an e-commerce website selling Japanese alcohol products to the Japanese market.",
      teamSize: "1 Developer",
      position: "Developer + BA",
      responsibilities: [
        "Design and implement storefront and order flow",
        "Collect requirements and define the data model"
      ],
      technologies: "Django REST Framework, HTML, CSS"
    },
    {
      id: 18,
      name: "Inter-store Transfer",
      period: "2022",
      customer: "Private",
      description: "Inter-store inventory transfer system serving multiple retail locations.",
      teamSize: "8 Developer - 2 BA",
      position: "Developer / DevOps",
      responsibilities: [
        "Design REST APIs with Django REST Framework following best practices",
        "Run data analysis with Pandas to drive product decisions",
        "Build role-based access control with Django authentication",
        "Participate in code reviews and knowledge sharing"
      ],
      technologies: "Django, Pandas"
    },
    {
      id: 19,
      name: "Human Resources Management",
      period: "2021 - 2022",
      customer: "Private",
      description: "Customize and configure Odoo 15 HR modules covering the full employee lifecycle.",
      teamSize: "1 Developer",
      position: "Developer + BA",
      responsibilities: [
        "Customize Employees, Recruitment, Time-off, Attendance and Appraisals",
        "Analyze business requirements and develop tailored solutions",
        "Ensure seamless integration with existing systems"
      ],
      technologies: "Odoo 15"
    },
    {
      id: 20,
      name: "Employee Management Software",
      period: "2021 - 2022",
      customer: "Private",
      description: "A Flask-based personnel management system enabling organizations to manage employee records efficiently.",
      teamSize: "1 Developer",
      position: "Developer",
      responsibilities: [
        "Build CRUD for employee details (personal info, job title, salary)",
        "Implement authentication and role-based access control",
        "Support bulk employee import from Excel spreadsheets",
        "Send individual and bulk emails to staff"
      ],
      technologies: "Flask, SQLAlchemy, Flask-RESTful, PostgreSQL, Alembic"
    }
  ],
  skills: [
    { name: "AI Agent", skills: "Claude Code, Cursor, GitHub Copilot, Kiro" },
    { name: "Odoo / ERP", skills: "Odoo 13 → Odoo 19, Module Development, Migration, ORM, QWeb, XML-RPC, OWL Framework" },
    { name: "Python", skills: "Django, Django REST Framework, Flask, FastAPI, Pandas, SQLAlchemy" },
    { name: "Frontend", skills: "HTML, CSS, JavaScript, TypeScript, React, Tailwind CSS" },
    { name: "Database", skills: "PostgreSQL, MySQL, ClickHouse, Redis" },
    { name: "DevOps & Tools", skills: "Docker, Git, GitLab CI/CD, Bitbucket Pipelines, Ubuntu, Nginx" },
    { name: "RPA & Automation", skills: "AkaBot, UiPath, Grafana, IoT Data Processing" },
    { name: "Soft Skills", skills: "Team Leadership, Technical Solution Design, Code Review, Project Estimation, Mentoring" }
  ],
  activities: [
    {
      period: "Nov 2022 - Feb 2023",
      title: "Odoo 15 Training & Certification",
      description: "Participate in Odoo 15 training and certification exam with foreign members in Tinh Van Software. 8-week odoo counseling training."
    },
    {
      period: "Nov 2018 - Nov 2019",
      title: "Institute of Information Technology ACT",
      role: "Student",
      description: "Join the basic python training course."
    },
    {
      period: "Jan 2023 - Jan 2024",
      title: "HKICO International Exam Support",
      role: "Instructor",
      description: "Support and guidance on questions and exercises for young students."
    },
    {
      period: "Jan 2023 - Jan 2024",
      title: "Hanoi Youth Informatics Competition XXVIII",
      role: "Instructor",
      description: "Offer solutions and guidance for participating students."
    }
  ],
  ui: {
    sections: {
      experience: "Work Experience",
      skills: "Technical Skills",
      projects: "Projects",
      education: "Education",
      activities: "Activities",
      careerPath: "Career Path",
      competency: "Competency & Development",
    },
    labels: {
        mobile: "Mobile",
        email: "Email",
        location: "Location",
        gender: "Gender",
        dob: "DOB",
        address: "Address",
        specialization: "Specialization",
        gpa: "GPA Score",
        totalProjects: "Total Projects",
        filter: "Filter",
        searchPlaceholder: "Search project, tech...",
        clearFilters: "Clear filters",
        noResults: "No projects match your search.",
        time: "Time",
        customer: "Customer",
        description: "Description",
        responsibilities: "Responsibilities",
        technologies: "Technologies"
    },
    common: {
      viewAll: "View All Projects",
      showLess: "Show Less",
      techStack: "Tech Stack",
      teamSize: "Team Size",
      role: "Role",
      moreTasks: "more tasks",
      present: "Present",
      downloadCV: "Download PDF",
      basicInfo: "Basic Information",
      close: "Close",
      visitWebsite: "Visit Website",
      companyInfo: "Company Information",
      projectDetails: "Project Details",
      relatedProjects: "Related Projects",
      contactForAccess: "Contact me to access this document",
      documents: {
        diploma: "Diploma",
        transcript: "Transcript",
        englishCert: "English Certificate"
      }
    },
    footer: {
      rights: "All rights reserved.",
      builtWith: "Built with React & Tailwind CSS"
    }
  }
};

export const DATA_VI: CVData = {
  personal: {
    name: "Nguyễn Văn Minh",
    dob: "19-10-2000",
    gender: "Nam",
    role: "Lập trình viên Odoo | Lập trình viên Python | Trưởng nhóm",
    avatar: "./avatar.jpg",
    cvLink: "./NGUYEN-VAN-MINH.pdf"
  },
  contact: {
    phone: "+84 328716036",
    email: "marknguyen.migor@gmail.com",
    address: "Hà Nội, Việt Nam",
    socials: SOCIALS
  },
  education: {
    period: "2018 - 2023",
    school: "HỌC VIỆN KỸ THUẬT MẬT MÃ (KMA)",
    major: "Công nghệ thông tin",
    specialization: "Phát triển phần mềm nhúng và di động",
    gpa: "2.8/4.0",
    description: "Cơ sở đào tạo hàng đầu về An toàn thông tin và CNTT tại Việt Nam. Tập trung phát triển tư duy thuật toán và kỹ năng xây dựng phần mềm thực chiến."
  },
  experience: [
    {
      id: 1,
      period: "2024 - Hiện tại",
      company: "CÔNG TY CP GIẢI PHÁP NHÀ MÁY THÔNG MINH",
      website: "https://factorysolution.vn/",
      summary: "Đơn vị cung cấp giải pháp nhà máy thông minh hàng đầu tại Việt Nam.",
      role: "Lập trình viên Odoo, Trưởng nhóm",
      responsibilities: [
        "Đưa ra giải pháp kỹ thuật",
        "Quản lý nhóm phát triển",
        "Phát triển các ứng dụng trên hệ thống Odoo",
        "Tiếp nhận dự án và thiết kế lõi"
      ]
    },
    {
      id: 2,
      period: "2023 - 2024",
      company: "B&K SOFTWARE",
      website: "https://bnksolution.com/",
      summary: "Công ty phát triển và gia công phần mềm.",
      role: "Lập trình viên Odoo, Lập trình viên Python",
      responsibilities: [
        "Phát triển ứng dụng trên hệ thống Odoo",
        "Bảo trì và phát triển thêm các tính năng trên hệ thống Odoo",
        "Quản lý và triển khai các máy chủ thử nghiệm (test server)"
      ]
    },
    {
      id: 3,
      period: "2021 - 2023",
      company: "TINH VAN SOFTWARE",
      website: "https://www.tso.vn/",
      summary: "Một trong những tập đoàn công nghệ hàng đầu Việt Nam.",
      role: "Lập trình viên Odoo, Lập trình viên Python",
      responsibilities: [
        "Lập trình ứng dụng web theo kế hoạch của công ty",
        "Viết API cho ứng dụng, làm việc với người thiết kế giao diện",
        "Bảo trì và phát triển thêm các tính năng cho ứng dụng web"
      ]
    }
  ],
  projects: [
    {
      id: 1,
      name: "ERP - Nam Y Đường",
      period: "2026 - Hiện tại",
      customer: "Nam Y Đường",
      description: "Bảo trì và tích hợp hệ thống ERP cho lĩnh vực y học cổ truyền. Kết nối Odoo với các nền tảng bán hàng đa kênh và phần mềm kế toán.",
      teamSize: "1 Developer - 1 BA",
      position: "Lập trình viên",
      responsibilities: [
        "Tùy chỉnh và tối ưu quy trình CRM",
        "Tích hợp Pancake cho bán hàng đa kênh",
        "Tích hợp vận chuyển Viettel Post & Viettel Fulfillment",
        "Đồng bộ kế toán với MISA"
      ],
      technologies: "Odoo 18"
    },
    {
      id: 2,
      name: "MES - Hệ thống Quản lý Sản xuất",
      period: "2025 - Hiện tại",
      customer: "Factory Solution",
      description: "Triển khai và phát triển hệ thống MES toàn diện cho quản lý sản xuất, tích hợp quản lý thiết bị, kiểm soát chất lượng và lập kế hoạch sản xuất.",
      teamSize: "3 Developer - 1 BA - 1 PM",
      position: "Trưởng nhóm kỹ thuật",
      responsibilities: [
        "Quản lý thiết bị: theo dõi vòng đời thiết bị nhà máy",
        "Quản lý chất lượng: kiểm tra, theo dõi lỗi, báo cáo",
        "Quản lý sản xuất: lệnh sản xuất, lập lịch, theo dõi tiến độ"
      ],
      technologies: "Odoo 19, Stock, MRP, Quality"
    },
    {
      id: 3,
      name: "HRM - VinFast Thịnh Cường",
      period: "2025",
      customer: "Global AI (VinFast Thịnh Cường)",
      description: "Bảo trì và sửa lỗi hệ thống nhân sự đang chạy thực tế với khoảng 4.000 người dùng.",
      teamSize: "2 Developer - 2 BA - 1 PM",
      position: "Trưởng nhóm",
      responsibilities: [
        "Bảo trì các module Nhân sự, Tính lương, Làm thêm giờ, Chấm công",
        "Tích hợp nhận diện khuôn mặt cho chấm công",
        "Xây dựng REST API cho ứng dụng di động Flutter"
      ],
      technologies: "Odoo 15"
    },
    {
      id: 4,
      name: "Vipsen ERP",
      period: "2024",
      customer: "Vipsen.vn",
      description: "Phát triển tính năng trên Odoo 17 cho CRM, Bán hàng và Kho.",
      teamSize: "1 Developer",
      position: "Lập trình viên",
      responsibilities: [
        "Phát triển tính năng CRM, Bán hàng và Kho",
        "Xây dựng báo cáo tùy chỉnh theo yêu cầu nghiệp vụ"
      ],
      technologies: "Odoo 17"
    },
    {
      id: 5,
      name: "Nâng cấp Odoo 14 → Odoo 16 (Z114)",
      period: "2024 - 2025",
      customer: "Nhà máy Z114",
      description: "Nâng cấp 30 module Odoo từ phiên bản 14 lên 16, bao gồm chuyển đổi dữ liệu và chức năng.",
      teamSize: "1 Developer",
      position: "Lập trình viên",
      responsibilities: [
        "Nâng cấp module tùy chỉnh sang Odoo 16 API",
        "Chuyển đổi và kiểm tra cơ sở dữ liệu",
        "Kiểm thử chức năng và hồi quy"
      ],
      technologies: "Odoo 14 Community → Odoo 16 Community"
    },
    {
      id: 6,
      name: "Tích hợp VNPay",
      period: "2024",
      customer: "AnNamBaoSo",
      description: "Xây dựng hệ thống kết nối cổng thanh toán VNPay và trả về lá số tử vi cho khách hàng trên website Namanbaoso.vn.",
      teamSize: "1 Developer",
      position: "Lập trình viên",
      responsibilities: [
        "Tích hợp cổng thanh toán VNPay end-to-end",
        "Tùy chỉnh module Odoo theo nghiệp vụ"
      ],
      technologies: "Odoo 16 Community"
    },
    {
      id: 7,
      name: "Quản lý & Giám sát Sản xuất",
      period: "2024",
      customer: "VDI (24 Nhà máy)",
      description: "Xây dựng hệ thống quản lý sản xuất triển khai cho 24 nhà máy, tích hợp MES và module lập kế hoạch sản xuất.",
      teamSize: "6 Developer - 1 BA",
      position: "Developer + Trưởng nhóm",
      responsibilities: [
        "Xây dựng mã nguồn lõi cho nền tảng",
        "Review code trên GitLab cho toàn nhóm",
        "Đưa ra giải pháp kỹ thuật và quyết định kiến trúc"
      ],
      technologies: "Odoo 16 Community"
    },
    {
      id: 8,
      name: "Workflow PBM",
      period: "2024",
      customer: "VDI",
      description: "Xây dựng hệ thống giao và theo dõi công việc giữa các phòng ban.",
      teamSize: "6 Developer - 1 BA",
      position: "Developer + Trưởng nhóm",
      responsibilities: [
        "Xây dựng mã nguồn lõi cho module",
        "Review code trên GitLab",
        "Đưa ra giải pháp kỹ thuật"
      ],
      technologies: "Odoo 16 Community"
    },
    {
      id: 9,
      name: "FUJI LUXURY ERP",
      period: "2024",
      customer: "Fuji Luxury",
      description: "Chuyển đổi số toàn diện cho Fuji Luxury, bao gồm Nhân sự, Bảo trì, CRM và Bảo hành.",
      teamSize: "4 Developer - 2 BA - 1 Lead - CTO",
      position: "Developer + Trưởng nhóm",
      responsibilities: [
        "Đưa ra giải pháp cho từng tính năng theo yêu cầu khách hàng",
        "Ước lượng thời gian và phân chia công việc cho nhóm",
        "Mentor và review thiết kế logic cho lập trình viên",
        "Xây dựng các module HRM, Bảo trì, CRM và Bảo hành"
      ],
      technologies: "Odoo 16 Community"
    },
    {
      id: 10,
      name: "WINKI ERP",
      period: "2024",
      customer: "Winki Group",
      description: "Chuyển đổi số toàn diện cho Winki Group, bao gồm Nhân sự, CRM, Bán hàng, Marketing và Kho.",
      teamSize: "4 Developer - 2 BA - 1 Lead - CTO",
      position: "Developer + Trưởng nhóm",
      responsibilities: [
        "Đưa ra giải pháp cho từng tính năng",
        "Ước lượng thời gian và phân chia công việc",
        "Mentor cho lập trình viên",
        "Xây dựng các module HRM, CRM, Bán hàng, Marketing và Kho"
      ],
      technologies: "Odoo 16 Community"
    },
    {
      id: 11,
      name: "BIDV RPA",
      period: "2023 - 2024",
      customer: "BIDV (Riêng tư)",
      description: "Chuyển đổi và xây dựng lại các quy trình RPA cho ngân hàng bằng AkaBot.",
      teamSize: "5 Developer - 5 BA",
      position: "Lập trình viên",
      responsibilities: [
        "Chuyển đổi quy trình ngân hàng từ UiPath sang AkaBot",
        "Cập nhật quy trình theo quy định ngân hàng mới"
      ],
      technologies: "AkaBot, UiPath"
    },
    {
      id: 12,
      name: "Tích hợp Thương mại điện tử",
      period: "2023 - 2024",
      customer: "Riêng tư",
      description: "Tích hợp Odoo với các sàn Magento, Shopee, Lazada và WooCommerce để đồng bộ đơn hàng và sản phẩm.",
      teamSize: "2 Developer - 1 BA",
      position: "Lập trình viên + Quản lý dự án",
      responsibilities: [
        "Dùng webhooks và API để đồng bộ đơn hàng, sản phẩm vào Odoo",
        "Nghiên cứu API của các sàn",
        "Đưa ra giải pháp, phát triển, unit test, triển khai và UAT"
      ],
      technologies: "Odoo 16, Magento, Shopee, Lazada, WooCommerce"
    },
    {
      id: 13,
      name: "Quản lý Test Server của BU",
      period: "2023 - 2024",
      customer: "Nội bộ",
      description: "Quản lý và vận hành toàn bộ test server cho Business Unit, bao gồm triển khai, sao lưu và hỗ trợ presale.",
      teamSize: "1 Developer (DevOps)",
      position: "DevOps",
      responsibilities: [
        "Triển khai hệ thống lên máy chủ khách hàng",
        "Kiểm tra và sao lưu dữ liệu khách hàng định kỳ",
        "Dựng test server và chuẩn bị dữ liệu demo cho presale"
      ],
      technologies: "Ubuntu, Docker, GitLab Runner, Bitbucket Runner"
    },
    {
      id: 14,
      name: "Nâng cấp Odoo 13 → Odoo 16 (IMPIRIX)",
      period: "2023",
      customer: "IMPIRIX (Riêng tư)",
      description: "Nâng cấp hệ thống IMPIRIX từ Odoo 13 lên Odoo 16, bao gồm module gốc và module tùy chỉnh.",
      teamSize: "4 Developer - 1 BA",
      position: "Lập trình viên",
      responsibilities: [
        "Nâng cấp module gốc và module tùy chỉnh",
        "Nghiên cứu và chuyển đổi cơ sở dữ liệu",
        "Chuyển đổi chức năng và chạy unit test"
      ],
      technologies: "Odoo 13 → Odoo 16"
    },
    {
      id: 15,
      name: "Bảo trì (Sopoka + Baihe + Y Tế Việt)",
      period: "2023",
      customer: "Riêng tư",
      description: "Bảo trì và hỗ trợ khách hàng trên nhiều hệ thống Odoo khác nhau.",
      teamSize: "1 Developer - 1 BA",
      position: "Lập trình viên",
      responsibilities: [
        "Tùy chỉnh tính năng mới theo yêu cầu khách hàng",
        "Xử lý sự cố và hỗ trợ người dùng cuối",
        "Chẩn đoán và xử lý vấn đề kỹ thuật, giảm thiểu downtime",
        "Bảo trì các module Kho, Kế toán, Đơn bán hàng"
      ],
      technologies: "Odoo 13, Odoo 14, Odoo 15, Odoo 16"
    },
    {
      id: 16,
      name: "IoT Chăm sóc Người cao tuổi (POC)",
      period: "2023",
      customer: "Riêng tư",
      description: "Dự án thử nghiệm IoT cho chăm sóc người cao tuổi: xử lý dữ liệu cảm biến từ giường bệnh để cảnh báo bác sĩ theo thời gian thực.",
      teamSize: "3 Developer - 1 BA",
      position: "Lập trình viên",
      responsibilities: [
        "Xử lý luồng dữ liệu cảm biến từ giường bệnh",
        "Xây dựng pipeline cảnh báo và dashboard cho y bác sĩ"
      ],
      technologies: "Python, Grafana"
    },
    {
      id: 17,
      name: "Baby Company",
      period: "2023",
      customer: "Riêng tư",
      description: "Xây dựng website thương mại điện tử bán rượu Nhật cho thị trường Nhật Bản.",
      teamSize: "1 Developer",
      position: "Lập trình viên + BA",
      responsibilities: [
        "Thiết kế và triển khai giao diện cùng luồng đặt hàng",
        "Thu thập yêu cầu và định nghĩa data model"
      ],
      technologies: "Django REST Framework, HTML, CSS"
    },
    {
      id: 18,
      name: "Chuyển kho liên cửa hàng",
      period: "2022",
      customer: "Riêng tư",
      description: "Hệ thống chuyển kho giữa các cửa hàng bán lẻ.",
      teamSize: "8 Developer - 2 BA",
      position: "Developer / DevOps",
      responsibilities: [
        "Thiết kế REST API với Django REST Framework theo best practice",
        "Phân tích dữ liệu với Pandas hỗ trợ quyết định sản phẩm",
        "Xây dựng kiểm soát truy cập theo vai trò với Django auth",
        "Tham gia code review và chia sẻ kiến thức"
      ],
      technologies: "Django, Pandas"
    },
    {
      id: 19,
      name: "Quản lý Nhân sự",
      period: "2021 - 2022",
      customer: "Riêng tư",
      description: "Tùy chỉnh và cấu hình các module Nhân sự trên Odoo 15, bao phủ toàn bộ vòng đời nhân viên.",
      teamSize: "1 Developer",
      position: "Lập trình viên + BA",
      responsibilities: [
        "Tùy chỉnh Employees, Recruitment, Time-off, Attendance, Appraisals",
        "Phân tích yêu cầu nghiệp vụ và phát triển giải pháp tùy chỉnh",
        "Đảm bảo tích hợp liền mạch với hệ thống hiện có"
      ],
      technologies: "Odoo 15"
    },
    {
      id: 20,
      name: "Phần mềm Quản lý Nhân viên",
      period: "2021 - 2022",
      customer: "Riêng tư",
      description: "Hệ thống quản lý nhân sự xây dựng trên Flask giúp tổ chức quản lý hồ sơ nhân viên hiệu quả.",
      teamSize: "1 Developer",
      position: "Lập trình viên",
      responsibilities: [
        "Xây dựng CRUD cho thông tin nhân viên (thông tin cá nhân, chức danh, lương)",
        "Triển khai xác thực và phân quyền theo vai trò",
        "Hỗ trợ import nhân viên hàng loạt từ Excel",
        "Gửi email cá nhân và hàng loạt tới nhân viên"
      ],
      technologies: "Flask, SQLAlchemy, Flask-RESTful, PostgreSQL, Alembic"
    }
  ],
  skills: [
    { name: "AI Agent", skills: "Claude Code, Cursor, GitHub Copilot, Kiro" },
    { name: "Odoo / ERP", skills: "Odoo 13 → Odoo 19, Phát triển module, Migration, ORM, QWeb, XML-RPC, OWL Framework" },
    { name: "Python", skills: "Django, Django REST Framework, Flask, FastAPI, Pandas, SQLAlchemy" },
    { name: "Frontend", skills: "HTML, CSS, JavaScript, TypeScript, React, Tailwind CSS" },
    { name: "Cơ sở dữ liệu", skills: "PostgreSQL, MySQL, ClickHouse, Redis" },
    { name: "DevOps & Công cụ", skills: "Docker, Git, GitLab CI/CD, Bitbucket Pipelines, Ubuntu, Nginx" },
    { name: "RPA & Tự động hóa", skills: "AkaBot, UiPath, Grafana, Xử lý dữ liệu IoT" },
    { name: "Kỹ năng mềm", skills: "Lãnh đạo nhóm, Thiết kế giải pháp kỹ thuật, Review code, Ước lượng dự án, Mentoring" }
  ],
  activities: [
    {
      period: "T11 2022 - T2 2023",
      title: "Đào tạo & Chứng chỉ Odoo 15",
      description: "Tham gia đào tạo và thi chứng chỉ Odoo 15 với các thành viên nước ngoài tại Tinh Vân Software. Khóa đào tạo tư vấn Odoo kéo dài 8 tuần."
    },
    {
      period: "T11 2018 - T11 2019",
      title: "Học viện Kỹ thuật Mật mã",
      role: "Sinh viên",
      description: "Tham gia khóa đào tạo Python cơ bản."
    },
    {
      period: "T1 2023 - T1 2024",
      title: "Hỗ trợ kỳ thi quốc tế HKICO",
      role: "Người hướng dẫn",
      description: "Hỗ trợ và hướng dẫn giải đáp thắc mắc, bài tập cho học sinh nhỏ tuổi."
    },
    {
      period: "T1 2023 - T1 2024",
      title: "Hội thi Tin học trẻ Hà Nội lần thứ XXVIII",
      role: "Người hướng dẫn",
      description: "Đưa ra giải pháp và hướng dẫn cho học sinh tham gia."
    }
  ],
  ui: {
    sections: {
      experience: "Kinh nghiệm làm việc",
      skills: "Kỹ năng chuyên môn",
      projects: "Dự án",
      education: "Học vấn",
      activities: "Hoạt động",
      careerPath: "Hành trình sự nghiệp",
      competency: "Năng lực & Phát triển"
    },
    labels: {
        mobile: "Điện thoại",
        email: "Email",
        location: "Địa điểm",
        gender: "Giới tính",
        dob: "Ngày sinh",
        address: "Địa chỉ",
        specialization: "Chuyên ngành",
        gpa: "Điểm GPA",
        totalProjects: "Tổng số dự án",
        filter: "Bộ lọc",
        searchPlaceholder: "Tìm kiếm dự án, công nghệ...",
        clearFilters: "Xóa bộ lọc",
        noResults: "Không tìm thấy dự án phù hợp.",
        time: "Thời gian",
        customer: "Khách hàng",
        description: "Mô tả",
        responsibilities: "Trách nhiệm",
        technologies: "Công nghệ"
    },
    common: {
      viewAll: "Xem tất cả dự án",
      showLess: "Thu gọn",
      techStack: "Công nghệ",
      teamSize: "Quy mô",
      role: "Vai trò",
      moreTasks: "công việc khác",
      present: "Hiện tại",
      downloadCV: "Tải PDF",
      basicInfo: "Thông tin cơ bản",
      close: "Đóng",
      visitWebsite: "Truy cập Website",
      companyInfo: "Thông tin công ty",
      projectDetails: "Chi tiết dự án",
      relatedProjects: "Dự án liên quan",
      contactForAccess: "Vui lòng liên hệ tôi để xem tài liệu này",
      documents: {
        diploma: "Bằng tốt nghiệp",
        transcript: "Bảng điểm",
        englishCert: "Chứng chỉ Tiếng Anh"
      }
    },
    footer: {
      rights: "Bản quyền đã được bảo hộ.",
      builtWith: "Xây dựng bằng React & Tailwind CSS"
    }
  }
};