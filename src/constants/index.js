import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    dataprev,
    senseup,
    carrent,
    jobit,
    tripguide,
    threejs,
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
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
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
      name: "Redux Toolkit",
      icon: redux,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "figma",
      icon: figma,
    },
    {
      name: "docker",
      icon: docker,
    },
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
          name: "mongodb",
          color: "green-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
      ],
      image: carrent,
      source_code_link: "https://github.com/",
    },
    {
      name: "Job IT",
      description:
        "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "restapi",
          color: "green-text-gradient",
        },
        {
          name: "scss",
          color: "pink-text-gradient",
        },
      ],
      image: jobit,
      source_code_link: "https://github.com/",
    },
    {
      name: "Trip Guide",
      description:
        "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
      tags: [
        {
          name: "nextjs",
          color: "blue-text-gradient",
        },
        {
          name: "supabase",
          color: "green-text-gradient",
        },
        {
          name: "css",
          color: "pink-text-gradient",
        },
      ],
      image: tripguide,
      source_code_link: "https://github.com/",
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };