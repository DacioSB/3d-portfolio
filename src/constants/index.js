import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    java,
    spring,
    csharp,
    aspnet,
    nextjs,
    nest,
    kafka,
    kubernetes,
    terraform,
    aws,
    azure,
    jenkins,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    python,
    docker,
    dataprev,
    senseup,
    carrent,
    empregabilidade,
    kafkawikimedia,
    twofactor,
    contentgen,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Full-Stack Developer",
      icon: web,
      description:
        "Experienced in developing end-to-end web applications using React, Next.js, .NET, and Java. I create scalable and maintainable front-end and back-end solutions with a strong focus on performance and user experience.",
    },
    {
      title: "Mobile Developer",
      icon: mobile,
      description:
        "Skilled in React Native and mobile development for large-scale applications. Developed critical features for Brazil’s digital work card, improving accessibility for millions of users.",
    },
    {
      title: "Backend & Cloud Engineer",
      icon: backend,
      description:
        "Proficient in building high-performance backend services and managing cloud infrastructures on AWS and Azure. Expertise in Java EE, Spring Boot, Node.js, and cloud orchestration with Kubernetes and Docker.",
    },
    {
      title: "Data Engineer",
      icon: creator,
      description:
        "Strong background in data pipelines, real-time processing, and distributed systems using Kafka, Redis, Flink, and Spark. Built ETL solutions to integrate complex industrial and government data systems.",
    },
  ];
  
  const technologies = [
    {
        name: "Java",
        icon: java,
    },
    {
        name: "Spring Boot",
        icon: spring,
    },
    {
        name: "C#",
        icon: csharp,
    },
    {
        name: "ASP.NET",
        icon: aspnet,
    },
    {
        name: "JavaScript",
        icon: javascript,
    },
    {
        name: "TypeScript",
        icon: typescript,
    },
    {
        name: "React JS",
        icon: reactjs,
    },
    {
        name: "Next.js",
        icon: nextjs,
    },
    {
        name: "NestJS",
        icon: nest,
    },
    {
        name: "Node.js",
        icon: nodejs,
    },
    {
        name: "Redux Toolkit",
        icon: redux,
    },
    {
        name: "Tailwind CSS",
        icon: tailwind,
    },
    {
        name: "MongoDB",
        icon: mongodb,
    },
    {
        name: "Kafka",
        icon: kafka,
    },
    {
        name: "Docker",
        icon: docker,
    },
    {
        name: "Kubernetes",
        icon: kubernetes,
    },
    {
        name: "Terraform",
        icon: terraform,
    },
    {
        name: "AWS",
        icon: aws,
    },
    {
        name: "Azure",
        icon: azure,
    },
    {
        name: "Git",
        icon: git,
    },
    {
        name: "Jenkins",
        icon: jenkins,
    },
    {
        name: "Python",
        icon: python,
    }
  ];
  
  const experiences = [
    {
      title: "Software Engineer",
      company_name: "SenseUp",
      icon: senseup,
      iconBg: "#383E56",
      date: "2020 - 2024",
      points: [
        "Led the architecture and development of the Dataflow Provider, a key Go-based module that handled infrastructure provisioning across Kubernetes clusters, Docker environments, and standalone VMs.",
        "Built custom Node-RED plugins in TypeScript to extend the low-code platform, enabling seamless integration with external APIs, databases, and cloud services.",
        "Developed custom .NET solutions, including AWS Lambda and Azure Functions, to process legacy databases from partners and securely transfer data to the platform.",
        "Implemented data processing pipelines using PySpark and Databricks on Azure, optimizing large-scale analytics and dashboard generation.",
        "Managed cloud infrastructure and DevOps tasks, automating deployments with Terraform, ensuring reliable Kafka message brokering, and optimizing data storage with Snowflake.",
        "Transitioned to a leadership role in the final year, mentoring team members and optimizing processes, achieving a 12% reduction in manual tasks and a 15% improvement in data integration efficiency."
      ],
    },
    {
      title: "Software Engineer",
      company_name: "Dataprev",
      icon: dataprev,
      iconBg: "#E6DEDD",
      date: "2024 - Present",
      points: [
        "Contributing to the Social Work Card application, the most widely used government app in Brazil, helping millions of workers track contracts and benefits.",
        "Developing backend services in Java and implementing multi-tenant support for a proprietary API Gateway in C#.",
        "Enhancing the React Native-based mobile application to improve usability and performance.",
        "Integrated five APIs for the Flood Relief Financial Aid project, enabling rapid eligibility verification and payment authorization for affected workers.",
        "Collaborating with the AI department on an employability project, leveraging work card data to provide job recommendations, similar to LinkedIn but tailored to regional opportunities."
      ],
    },
  ];


  
  const testimonials = [
    {
      testimonial:
        "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
      name: "Sara Lee",
      designation: "CFO",
      company: "Acme Co",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      testimonial:
        "I've never met a web developer who truly cares about their clients' success like Rick does.",
      name: "Chris Brown",
      designation: "COO",
      company: "DEF Corp",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      testimonial:
        "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
      name: "Lisa Wang",
      designation: "CTO",
      company: "456 Enterprises",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
  ];
  
  const projects = [
    {
      name: "Car Rent",
      description:
        "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "redux",
          color: "green-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
        {
          name: "nestjs",
          color: "yellow-text-gradient",
        },
      ],
      image: carrent,
      source_code_link: "https://github.com/DacioSB/react-rent-cars/",
    },
    {
      name: "Carteira de Trabalho Digital",
      description:
        "A digital platform that allows workers to view job vacancies available at the National Employment System (Sine) agencies and access various employment services offered by the Federal Government.",
      tags: [
        {
          name: "react-native",
          color: "blue-text-gradient",
        },
        {
          name: "gov-services",
          color: "green-text-gradient",
        },
        {
          name: "job-matching",
          color: "pink-text-gradient",
        },
      ],
      image: empregabilidade, // Replace 'ctpsDigitalImage' with the actual image variable or URL
      source_code_link: "https://www.gov.br/trabalho-e-emprego/pt-br/noticias-e-conteudo/2025/janeiro/vagas-de-emprego-do-sine-podem-ser-visualizadas-na-carteira-de-trabalho-digital", // If there's a specific repository, replace with its URL
    }
  ,
    {
      name: "Kafka Wikimedia (By Conduktor)",
      description:
        "My final project for the Kafka course on Conduktor, where I implemented a Kafka-based Wikimedia project using Java and Kafka.",
      tags: [
        {
          name: "java",
          color: "blue-text-gradient",
        },
        {
          name: "kafka",
          color: "green-text-gradient",
        },
        {
          name: "streaming",
          color: "pink-text-gradient",
        },
      ],
      image: kafkawikimedia,
      source_code_link: "https://github.com/DacioSB/kafka-wikimedia-project",
    },
    {
      name: "End-to-End DevOps Project Pipeline",
      description:
        "End-To-End DevOps project pipeline using Jenkins that automates the build, test, analysis, and deployment processes.",
      tags: [
        {
          name: "java",
          color: "blue-text-gradient",
        },
        {
          name: "jenkins",
          color: "green-text-gradient",
        },
        {
          name: "docker",
          color: "pink-text-gradient",
        },
      ],
      image: "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*IabBUpRK5wv5_L1SKI-VDA.png",
      source_code_link: "https://medium.com/@lowva96/end-to-end-devops-project-pipeline-6577f78bbeb7",
    },
    {
      name: "2-Factor Authentication",
      description:
        "Theses days I was exploring some different challenges, so I step over a good one that I was always curious about the internal functioning: 2-Factor Authentication.",
      tags: [
        {
          name: "architecture",
          color: "blue-text-gradient",
        },
        {
          name: "csharp",
          color: "green-text-gradient",
        },
        {
          name: "react",
          color: "pink-text-gradient",
        },
        {
          name: "mongodb",
          color: "yellow-text-gradient",
        },
      ],
      image: twofactor,
      source_code_link: "https://github.com/DacioSB/2-factor", //remember to change to medium article
    },
    {
      name: "2-Factor Authentication",
      description:
        "A real-time currency rates dashboard built with .NET 8, Vue.js, and SQL Server, following Clean Architecture and DDD principles.",
      tags: [
        {
          name: "architecture",
          color: "blue-text-gradient",
        },
        {
          name: "csharp",
          color: "green-text-gradient",
        },
        {
          name: "cqrs",
          color: "pink-text-gradient",
        },
        {
          name: "vuejs",
          color: "yellow-text-gradient",
        },
      ],
      image: "https://raw.githubusercontent.com/DacioSB/hahncurrencyrates/refs/heads/main/out/diagram/SystemContextDiagram.png",
      source_code_link: "https://github.com/DacioSB/hahncurrencyrates"
    },
    {
      name: "Optimizing Docker Images: A Before and After Analysis",
      description:
        "In this article, we’ll explore how to optimize a Dockerfile.",
      tags: [
        {
          name: "devops",
          color: "blue-text-gradient",
        },
        {
          name: "docker",
          color: "green-text-gradient",
        },
      ],
      image: "https://miro.medium.com/v2/resize:fit:4800/format:webp/0*2NBgILf1p5WsHpK6.png",
      source_code_link: "https://github.com/DacioSB/optmizing-docker-images"
    },
    {
      name: "AI Content-Gen Platform",
      description:
        "Generate and manage your AI-powered content with ease.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "csharp",
          color: "green-text-gradient",
        },
        {
          name: "gen-ai",
          color: "pink-text-gradient",
        },
        {
          name: "clerk",
          color: "yellow-text-gradient",
        },
      ],
      image: contentgen,
      source_code_link: "https://github.com/DacioSB/content-generator-frontend"
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };