import { CVData } from './types';

const SOCIALS = {
  facebook: "https://facebook.com/Migor28",
  youtube: "https://www.youtube.com/@nguyenvanminh3361",
  odooStore: "https://apps.odoo.com/apps/modules/browse?search=Mark+Nguyen",
  linkedin: "https://www.linkedin.com/in/minh-nguy%E1%BB%85n-v%C4%83n-405303251/",
  github: "https://github.com/minhminh191000"
};

export const DATA_EN: CVData = {
  personal: {
    name: "Nguyen Van Minh",
    dob: "19-10-2000",
    gender: "Male",
    role: "Odoo Developer | Python Developer | Team Leader"
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
        "Provide solutions",
        "Manage the developer team",
        "Developing applications on Odoo system",
        "Get project and core design"
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
      period: "Apr 2021 - 2023",
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
      name: "HRM",
      period: "2025 - Present",
      customer: "Global AI (Vinfast Thinh Cuong)",
      description: "Maintenance and debugging of real running system (Number of users is about 4000 people)",
      teamSize: "2 Dev - 2 BA - 1 PM",
      position: "Dev lead",
      responsibilities: [
        "HR, Payroll, HR overtime, HR attendance, Face recognize, API connect Flutter"
      ],
      technologies: "Odoo 15"
    },
    {
      id: 2,
      name: "Vipsen Erp",
      period: "2024",
      customer: "Vipsen.vn",
      description: "Feature development for odoo 17",
      teamSize: "1 Dev",
      position: "1 Dev",
      responsibilities: [
        "CRM, Sale, Inventory, Custom report"
      ],
      technologies: "Odoo 17"
    },
    {
      id: 3,
      name: "Migrate Odoo14 - Odoo16 Community",
      period: "2024 - 2025",
      customer: "Factory (Z114)",
      description: "Upgrade 30 Odoo modules from version 14 to version 16",
      teamSize: "1 Dev",
      position: "1 Dev",
      responsibilities: [
        "Migrate module",
        "Migrate database",
        "Test"
      ],
      technologies: "Odoo 14 community -> Odoo 16 community"
    },
    {
      id: 4,
      name: "Connect VNPay",
      period: "2024",
      customer: "AnNamBaoSo",
      description: "Building a system to connect VNpay and return horoscopes to customers on the website Namanbaoso.vn",
      teamSize: "1 Dev",
      position: "1 Dev",
      responsibilities: [
        "Connect VNPay",
        "Customize module"
      ],
      technologies: "Odoo 16 community"
    },
    {
      id: 5,
      name: "Production Management & Supervision",
      period: "2024",
      customer: "24 Factories VDI",
      description: "Build a production management system for the factory combined with the MES system and Build a planning management system",
      teamSize: "6 DEV - 1BA",
      position: "Dev + Team Lead",
      responsibilities: [
        "Build core code for the module",
        "Review code on gitlab for all",
        "Provide technical solutions for the project"
      ],
      technologies: "Odoo 16 community"
    },
    {
      id: 6,
      name: "Workflow PBM",
      period: "2024",
      customer: "VDI",
      description: "Build a system for assigning tasks to departments",
      teamSize: "6 DEV - 1BA",
      position: "Dev + Team Lead",
      responsibilities: [
        "Build core code for the module",
        "Review code on gitlab for all",
        "Provide technical solutions for the project"
      ],
      technologies: "Odoo 16 community"
    },
    {
      id: 7,
      name: "FUJI LUXURY ERP",
      period: "2024",
      customer: "Fuji luxury",
      description: "Building comprehensive digital transformation for Fuji luxury",
      teamSize: "4 DEV - 2BA - 1LEAD - CTO",
      position: "Dev + Team Lead",
      responsibilities: [
        "Provide solutions for each feature",
        "Estimate time and divide work",
        "Guide and provide logical solutions for developers",
        "Involved in development and stream processing",
        "Building HRM, Maintenance, CRM, Warranty systems"
      ],
      technologies: "Odoo 16 community"
    },
    {
      id: 8,
      name: "WINKI ERP",
      period: "2024",
      customer: "Winki Group",
      description: "Building comprehensive digital transformation for Winki Group",
      teamSize: "4 DEV - 2BA - 1LEAD - CTO",
      position: "Dev + Team Lead",
      responsibilities: [
        "Provide solutions for each feature",
        "Estimate time and divide work",
        "Guide and provide logical solutions for developers",
        "Building HRM, CRM, Sale, Marketing, Inventory"
      ],
      technologies: "Odoo 16 community"
    },
    {
      id: 9,
      name: "BIDV RPA",
      period: "2023 - 2024",
      customer: "Private",
      description: "Migrate and build RPA system using akabot for banking processes",
      teamSize: "5 Dev + 5 BA",
      position: "Developer",
      responsibilities: [
        "Migrate from Uipath to Akabot",
        "Fix processes according to new regulations"
      ],
      technologies: "Akabot, UiPath"
    },
    {
      id: 10,
      name: "Integration (E-commerce)",
      period: "2023 - 2024",
      customer: "Private",
      description: "Integration (Magento, Shoppe, Lazada, WooCommerce)",
      teamSize: "2 Dev - 1 BA",
      position: "Developer + PM",
      responsibilities: [
        "Use webhooks/API to retrieve order and product data",
        "Learn parties' APIs",
        "Provide solutions, Develop, Unit test, Deploy and UAT"
      ],
      technologies: "Odoo16, Magento, Shoppe, Lazada, WooCommerce"
    },
    {
      id: 11,
      name: "Migrate Odoo13 - Odoo16 (IMPIRIX)",
      period: "2023",
      customer: "Private",
      description: "Migrate Odoo13 - Odoo16",
      teamSize: "4 Dev - 1 BA",
      position: "Developer",
      responsibilities: [
        "Migrate odoo base and custom modules",
        "Research and migrate database",
        "Unit test, Migrate function"
      ],
      technologies: "Odoo 13 -> Odoo 16"
    },
    {
      id: 12,
      name: "Maintenance (Sopoka + Baihe + Y te viet)",
      period: "2023",
      customer: "Private",
      description: "Maintenance and support",
      teamSize: "1 Dev - 1 BA",
      position: "Developer",
      responsibilities: [
        "Tùy chỉnh tính năng mới",
        "Xử lý sự cố và Hỗ trợ",
        "Chẩn đoán và giải quyết các vấn đề kỹ thuật",
        "Các module: kho, kế toán, đơn bán hàng"
      ],
      technologies: "Odoo 13, Odoo 14, Odoo15, Odoo 16"
    },
    {
      id: 13,
      name: "Manage BU's test servers",
      period: "2023 - 2024",
      customer: "Private",
      description: "Manage all of BU's test servers",
      teamSize: "1 Dev",
      position: "dev",
      responsibilities: [
        "Deploy system to customer server",
        "Check and backup customer data",
        "Build test servers and support data for presale"
      ],
      technologies: "Ubuntu, gitlab runner, bitbucket runner, docker"
    },
    {
      id: 14,
      name: "Baby Company",
      period: "2023",
      customer: "Private",
      description: "Create a website to sell alcohol to Japanese people",
      teamSize: "1 Dev",
      position: "Developer + BA",
      responsibilities: [
        "Create a website to sell alcohol"
      ],
      technologies: "Django rest framework, HTML, CSS"
    },
    {
      id: 16,
      name: "Elderly project IOT POC",
      period: "2023",
      customer: "Private",
      description: "Elderly project IOT POC. Process data from hospital beds to provide timely warnings to doctors",
      teamSize: "3 Dev - 1 BA",
      position: "Developer",
      responsibilities: [
        "Process data from hospital beds to provide timely warnings to doctors"
      ],
      technologies: "Python, grafana UI"
    },
    {
      id: 15,
      name: "Inter store transfer",
      period: "2022",
      customer: "Private",
      description: "Inter store transfer system",
      teamSize: "8 DEV - 2 BA",
      position: "Devops",
      responsibilities: [
        "Designed API using Django REST framework",
        "Conducted data analysis using Pandas",
        "Built role-based access control",
        "Participated in code reviews"
      ],
      technologies: "Django, Pandas"
    }
  ],
  skills: [
    { name: "Python", skills: "Django, Django rest, Flask, Odoo" },
    { name: "Frontend", skills: "HTML, CSS" },
    { name: "Database", skills: "Mysql, Postgresql, Clickhouse..." },
    { name: "Tools", skills: "CI/CD, Docker, Akabot, UiPath, Grafana..." },
    { name: "Server", skills: "Linux, Window" }
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
    role: "Lập trình viên Odoo | Lập trình viên Python | Trưởng nhóm"
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
      period: "Th4 2021 - 2023",
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
      name: "HRM",
      period: "2025 - Hiện tại",
      customer: "Global AI (Vinfast Thịnh Cường)",
      description: "Bảo trì và sửa lỗi hệ thống đang chạy thực tế (Số lượng người dùng khoảng 4000)",
      teamSize: "2 Dev - 2 BA - 1 PM",
      position: "Trưởng nhóm kỹ thuật",
      responsibilities: [
        "Nhân sự, Tính lương, Làm thêm giờ, Chấm công, Nhận diện khuôn mặt, API kết nối Flutter"
      ],
      technologies: "Odoo 15"
    },
    {
      id: 2,
      name: "Vipsen Erp",
      period: "2024",
      customer: "Vipsen.vn",
      description: "Phát triển tính năng cho odoo 17",
      teamSize: "1 Dev",
      position: "1 Dev",
      responsibilities: [
        "CRM, Bán hàng, Kho, Báo cáo tùy chỉnh"
      ],
      technologies: "Odoo 17"
    },
    {
      id: 3,
      name: "Nâng cấp Odoo14 - Odoo16 Community",
      period: "2024 - 2025",
      customer: "Nhà máy (Z114)",
      description: "Nâng cấp 30 module Odoo từ phiên bản 14 lên phiên bản 16",
      teamSize: "1 Dev",
      position: "1 Dev",
      responsibilities: [
        "Chuyển đổi module, Cơ sở dữ liệu",
        "Kiểm thử"
      ],
      technologies: "Odoo 14 community -> Odoo 16 community"
    },
    {
      id: 4,
      name: "Kết nối VNPay",
      period: "2024",
      customer: "AnNamBaoSo",
      description: "Xây dựng hệ thống kết nối VNpay và trả về lá số tử vi cho khách hàng trên website Namanbaoso.vn",
      teamSize: "1 Dev",
      position: "1 Dev",
      responsibilities: [
        "Kết nối VNPay",
        "Tùy chỉnh module"
      ],
      technologies: "Odoo 16 community"
    },
    {
      id: 5,
      name: "Quản lý & Giám sát Sản xuất",
      period: "2024",
      customer: "24 Nhà máy VDI",
      description: "Xây dựng hệ thống quản lý sản xuất cho nhà máy kết hợp với hệ thống MES và Xây dựng hệ thống quản lý kế hoạch",
      teamSize: "6 DEV - 1BA",
      position: "Dev + Trưởng nhóm",
      responsibilities: [
        "Xây dựng mã nguồn lõi cho module",
        "Đánh giá mã nguồn (Review code) trên gitlab cho cả nhóm",
        "Đưa ra giải pháp kỹ thuật cho dự án"
      ],
      technologies: "Odoo 16 community"
    },
    {
      id: 6,
      name: "Quy trình công việc PBM",
      period: "2024",
      customer: "VDI",
      description: "Xây dựng hệ thống giao việc cho các phòng ban",
      teamSize: "6 DEV - 1BA",
      position: "Dev + Trưởng nhóm",
      responsibilities: [
        "Xây dựng mã nguồn lõi cho module",
        "Đánh giá mã nguồn trên gitlab",
        "Đưa ra giải pháp kỹ thuật"
      ],
      technologies: "Odoo 16 community"
    },
    {
      id: 7,
      name: "FUJI LUXURY ERP",
      period: "2024",
      customer: "Fuji luxury",
      description: "Xây dựng chuyển đổi số toàn diện cho Fuji luxury",
      teamSize: "4 DEV - 2BA - 1LEAD - CTO",
      position: "Dev + Trưởng nhóm",
      responsibilities: [
        "Đưa ra giải pháp cho từng tính năng",
        "Ước lượng thời gian và phân chia công việc",
        "Hướng dẫn và đưa ra giải pháp logic cho lập trình viên",
        "Xây dựng hệ thống Nhân sự, Bảo trì, CRM, Bảo hành"
      ],
      technologies: "Odoo 16 community"
    },
    {
      id: 8,
      name: "WINKI ERP",
      period: "2024",
      customer: "Winki Group",
      description: "Xây dựng chuyển đổi số toàn diện cho Winki Group",
      teamSize: "4 DEV - 2BA - 1LEAD - CTO",
      position: "Dev + Trưởng nhóm",
      responsibilities: [
        "Đưa ra giải pháp cho từng tính năng",
        "Ước lượng thời gian và phân chia công việc",
        "Hướng dẫn và đưa ra giải pháp logic cho lập trình viên",
        "Xây dựng Nhân sự, CRM, Bán hàng, Marketing, Kho"
      ],
      technologies: "Odoo 16 community"
    },
    {
      id: 9,
      name: "BIDV RPA",
      period: "2023 - 2024",
      customer: "Riêng tư",
      description: "Chuyển đổi và xây dựng hệ thống RPA sử dụng AkaBot cho quy trình ngân hàng",
      teamSize: "5 Dev + 5 BA",
      position: "Lập trình viên",
      responsibilities: [
        "Chuyển đổi từ UiPath sang AkaBot",
        "Sửa quy trình theo quy định mới"
      ],
      technologies: "AkaBot, UiPath"
    },
    {
      id: 10,
      name: "Tích hợp (Thương mại điện tử)",
      period: "2023 - 2024",
      customer: "Riêng tư",
      description: "Tích hợp (Magento, Shoppe, Lazada, WooCommerce)",
      teamSize: "2 Dev - 1 BA",
      position: "Lập trình viên + Quản lý dự án",
      responsibilities: [
        "Sử dụng webhooks/API để lấy dữ liệu đơn hàng và sản phẩm",
        "Nghiên cứu API của các đối tác",
        "Đưa ra giải pháp, Phát triển, Kiểm thử, Triển khai"
      ],
      technologies: "Odoo16, Magento, Shoppe, Lazada, WooCommerce"
    },
    {
      id: 11,
      name: "Nâng cấp Odoo13 - Odoo16 (IMPIRIX)",
      period: "2023",
      customer: "Riêng tư",
      description: "Nâng cấp hệ thống từ Odoo 13 lên Odoo 16",
      teamSize: "4 Dev - 1 BA",
      position: "Lập trình viên",
      responsibilities: [
        "Nâng cấp Odoo gốc (base) và module tùy chỉnh",
        "Nghiên cứu và chuyển đổi cơ sở dữ liệu",
        "Kiểm thử, Chuyển đổi chức năng"
      ],
      technologies: "Odoo 13 -> Odoo 16"
    },
    {
      id: 12,
      name: "Bảo trì (Sopoka + Baihe + Y tế Việt)",
      period: "2023",
      customer: "Riêng tư",
      description: "Bảo trì và hỗ trợ hệ thống",
      teamSize: "1 Dev - 1 BA",
      position: "Lập trình viên",
      responsibilities: [
        "Tùy chỉnh tính năng mới",
        "Xử lý sự cố và Hỗ trợ",
        "Các module: Kho, Kế toán, Đơn bán hàng"
      ],
      technologies: "Odoo 13, Odoo 14, Odoo15, Odoo 16"
    },
    {
      id: 13,
      name: "Quản lý máy chủ thử nghiệm (Test Servers)",
      period: "2023 - 2024",
      customer: "Riêng tư",
      description: "Quản lý tất cả máy chủ thử nghiệm của đơn vị kinh doanh (BU)",
      teamSize: "1 Dev",
      position: "Lập trình viên",
      responsibilities: [
        "Triển khai hệ thống lên máy chủ khách hàng",
        "Kiểm tra và sao lưu dữ liệu khách hàng",
        "Xây dựng máy chủ test"
      ],
      technologies: "Ubuntu, gitlab runner, bitbucket runner, docker"
    },
    {
      id: 14,
      name: "Công ty Baby",
      period: "2023",
      customer: "Riêng tư",
      description: "Tạo website bán rượu cho người Nhật",
      teamSize: "1 Dev",
      position: "Lập trình viên + BA",
      responsibilities: [
        "Xây dựng website bán rượu"
      ],
      technologies: "Django rest framework, HTML, CSS"
    },
    {
      id: 16,
      name: "Dự án người cao tuổi (IoT POC)",
      period: "2023",
      customer: "Riêng tư",
      description: "Dự án thử nghiệm IoT hỗ trợ người cao tuổi.",
      teamSize: "3 Dev - 1 BA",
      position: "Lập trình viên + BA",
      responsibilities: [
        "Xử lý dữ liệu từ giường bệnh để đưa ra cảnh báo kịp thời cho bác sĩ"
      ],
      technologies: "Python, grafana UI"
    },
    {
      id: 15,
      name: "Chuyển kho liên cửa hàng",
      period: "2022",
      customer: "Riêng tư",
      description: "Hệ thống chuyển kho giữa các cửa hàng",
      teamSize: "8 DEV - 2 BA",
      position: "Devops",
      responsibilities: [
        "Thiết kế API sử dụng Django REST framework",
        "Phân tích dữ liệu sử dụng Pandas",
        "Xây dựng cơ chế kiểm soát truy cập dựa trên vai trò"
      ],
      technologies: "Django, Pandas"
    }
  ],
  skills: [
    { name: "Python", skills: "Django, Django rest, Flask, Odoo" },
    { name: "Frontend", skills: "HTML, CSS" },
    { name: "Cơ sở dữ liệu", skills: "Mysql, Postgresql, Clickhouse..." },
    { name: "Công cụ", skills: "CI/CD, Docker, Akabot, UiPath, Grafana..." },
    { name: "Máy chủ", skills: "Linux, Window" }
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
