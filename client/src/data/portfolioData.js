export const portfolioData = {
	personal: {
		name: 'Sayan Adhikary',
		title: 'Full-Stack Developer',

		//can add multiple roles
		roles: [
			'Full-Stack Developer',
			'React & Frontend Developer',
			'Node.js & Backend Developer',
			'MERN Stack Developer',
		],
		status: 'Open to Software Engineering Roles',
		location: 'Chennai, India (Open to Relocation & Remote)',
		shortBio:
			'Full-stack developer building clean, responsive web apps with React, Node.js, Express, and MongoDB. Focused on practical software, reliable APIs, and modern UI.',
		fullBio: [
			"I'm a computer science graduate from Sathyabama Institute of Science and Technology (Class of 2025). I build web applications, backend APIs, and explore AI-assisted developer tooling.",
			'My core stack is JavaScript and TypeScript: building user interfaces with React and Tailwind CSS, and designing backend services with Node.js, Express, MongoDB, and PostgreSQL.',
			'I like turning ideas into working software, from database schemas to production deployments. In college, I led web development initiatives for our technical chapter and was a national finalist in the Smart India Hackathon.',
		],
		email: 'sayanadhikary.dev@gmail.com',
		github: 'https://github.com/papu9679',
		linkedin: 'https://linkedin.com/in/papu9679',
		twitter: 'https://twitter.com/papu9679',
		stats: [
			{ label: 'Featured Projects', value: '4' },
			{ label: 'Core Stack', value: 'MERN' },
			{ label: 'Graduation', value: '2025' },
		],
	},

	education: [
		{
			degree: 'Bachelor of Technology in Computer Science & Engineering',
			institution: 'Sathyabama Institute of Science And Technology',
			period: '2021 - 2025',
			score: 'CGPA: 7.29 / 10',
			description:
				'Studied Data Structures, Algorithms, Operating Systems, Database Management, and Web Technologies.',
			highlights: [
				'Developed a strong understanding of core computer science concepts',
			],
		},
		{
			degree: 'Higher Secondary (Class XII - Science)',
			institution: 'Dakshin Rashulpur High School',
			period: '2021',
			score: '71.2%',
			description:
				'Science stream: Mathematics, Physics, Chemistry, and Biology.',
			highlights: ['Focused on Mathematics and Science fundamentals'],
		},
		{
			degree: 'Secondary School (Class X)',
			institution: 'Dakshin Rashulpur High School',
			period: '2019',
			score: '74.5%',
			description:
				'General academic curriculum with focus on Science and Mathematics.',
			highlights: ['Graduated with first division'],
		},
	],

	skillCategories: [
		{ id: 'all', name: 'All Skills' },
		{ id: 'frontend', name: 'Frontend & UI' },
		{ id: 'backend', name: 'Backend & APIs' },
		{ id: 'database', name: 'Database & VectorData' },
		{ id: 'tools', name: 'DevOps & Tools' },
	],

	skills: [
		// Frontend
		{
			name: 'React.js',
			category: 'frontend',
			level: 'intermediate',
			icon: 'Code2',
			tag: 'Frontend',
		},
		{
			name: 'JavaScript (ESLint)',
			category: 'frontend',
			level: 'intermediate',
			icon: 'FileCode',
			tag: 'Languages',
		},
		{
			name: 'Tailwind CSS & Design Systems',
			category: 'frontend',
			level: 'intermediate',
			icon: 'Palette',
			tag: 'Styling',
		},
		{
			name: 'HTML5 / Modern Semantic Web',
			category: 'frontend',
			level: 'intermediate',
			icon: 'Globe',
			tag: 'Markup',
		},
		{
			name: 'Responsive & Mobile-First UI',
			category: 'frontend',
			level: 'intermediate',
			icon: 'Smartphone',
			tag: 'Design',
		},

		// Backend
		{
			name: 'Node.js & Express.js',
			category: 'backend',
			level: 'intermediate',
			icon: 'Server',
			tag: 'Backend',
		},
		{
			name: 'RESTful API Architecture',
			category: 'backend',
			level: 'intermediate',
			icon: 'Network',
			tag: 'API',
		},
		{
			name: 'Authentication & JWT / OAuth',
			category: 'backend',
			level: 'intermediate',
			icon: 'ShieldCheck',
			tag: 'Security',
		},

		// Database & Cloud
		{
			name: 'MongoDB & Mongoose',
			category: 'database',
			level: 'intermediate',
			icon: 'Database',
			tag: 'NoSQL',
		},
		{
			name: 'PostgreSQL & Prisma / SQL',
			category: 'database',
			level: 'intermediate',
			icon: 'Layers',
			tag: 'SQL',
		},
		{
			name: 'Vector Database (Pinecone)',
			category: 'database',
			level: 'Intermediate',
			icon: 'Database',
			tag: 'Vector DB',
		},

		// Tools
		{
			name: 'Git & GitHub Collaboration',
			category: 'tools',
			level: 'intermediate',
			icon: 'GitBranch',
			tag: 'Version Control',
		},
		{
			name: 'Postman & API Testing',
			category: 'tools',
			level: 'intermediate',
			icon: 'CheckCircle',
			tag: 'Testing',
		},
		{
			name: 'Vite, Webpack & CI/CD',
			category: 'tools',
			level: 'intermediate',
			icon: 'Sliders',
			tag: 'Build Tools',
		},
	],

	projects: [
		{
			id: 'feedback-portfolio',
			title: 'Full-Stack Portfolio with Moderated Feedback Wall',
			category: 'fullstack',
			description:
				'Personal portfolio built with React and Tailwind CSS, backed by an Express and MongoDB API. Features a custom Daylight and Night ambiance toggle and a visitor feedback wall with password-protected admin moderation.',
			image:
				'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
			technologies: [
				'React',
				'Tailwind CSS',
				'Express.js',
				'MongoDB',
				'Node.js',
			],
			githubUrl: 'https://github.com/papu9679/Sayan-Adhikary',
			liveUrl: '#',
			featured: true,
			highlights: [
				'Daylight and Night ambiance toggle with smooth CSS variable transitions',
				'Express REST API with MongoDB data persistence and fallback store',
				'Admin moderation dashboard to review, approve, or remove feedback',
				'Responsive layout designed for mobile, tablet, and desktop viewports',
			],
		},

		{
			id: 'assessly',
			title: 'Assessly - Online Assessment Platform',
			category: 'fullstack',
			description:
				'Online assessment platform that generates quizzes with the Gemini API, enforces timed exams, and provides an analytics dashboard for tracking student performance.',
			image: 'https://via.placeholder.com/800x600?text=Assessly',
			technologies: [
				'JavaScript',
				'Node.js',
				'Express.js',
				'MongoDB',
				'Gemini API',
				'React',
				'Tailwind CSS',
				'Chart.js',
			],
			githubUrl: 'https://github.com/papu9679/Online-Assessment-Platform',
			liveUrl: 'https://online-assessment-platform-nu.vercel.app/',
			featured: true,
			highlights: [
				'Dynamic quiz generation via the Gemini API with per-user generation quotas',
				'24-hour quiz expiration enforced through MongoDB timestamps',
				'Role-based admin panel to manage quizzes and track test completions',
				'Interactive analytics dashboard with graphs and score distributions',
				'REST endpoints protected by JWT authentication and rate limiting',
			],
		},

		{
			id: 'retrieva-ai',
			title: 'Retrieva AI - RAG Document QA Application',
			category: 'fullstack',
			description:
				'Document question-answering tool. Converts uploaded PDFs into vector embeddings stored in Pinecone and answers queries using the Gemini API.',
			image: 'https://via.placeholder.com/800x600?text=Retrieva+AI',
			technologies: [
				'JavaScript',
				'Node.js',
				'Express.js',
				'React',
				'MongoDB',
				'LangChain',
				'Pinecone',
				'Gemini API',
				'PDF parsing',
			],
			githubUrl: 'https://github.com/papu9679/Retrieva-AI',
			liveUrl: 'https://retrieva-ai.vercel.app',
			featured: true,
			highlights: [
				'Document ingestion pipeline: text extraction, chunking, and embedding generation',
				'Vector similarity search using Pinecone for nearest-neighbor document retrieval',
				'Chat interface with streaming answers and document citations',
				'Modular structure supporting multi-document management',
				'User authentication and document isolation',
			],
		},

		{
			id: 'securerbac',
			title:
				'SecureRBAC - Full-Stack Authentication & Role-Based Access Control',
			category: 'fullstack',
			description:
				'A full-stack authentication and authorization system implementing Role-Based Access Control (RBAC) to manage user access, protect application resources, and enforce role-specific permissions.',
			image: 'https://via.placeholder.com/800x600?text=SecureRBAC',
			technologies: [
				'React.js',
				'Node.js',
				'Express.js',
				'MongoDB',
				'JWT',
				'JavaScript',
			],
			githubUrl: 'https://github.com/papu9679/SecureRBAC',
			liveUrl: 'https://secure-rbac.vercel.app',
			featured: true,
			highlights: [
				'Implemented secure user authentication and authorization',
				'Designed role-based access control for managing user permissions',
				'Protected backend routes using authentication middleware',
				'Implemented role-specific access restrictions',
				'Integrated MongoDB for persistent user and role management',
			],
		},

		{
			id: 'collaborative-kanban',
			title:
				'Real-Time Collaborative Kanban Board - Team Task Management Platform',
			category: 'fullstack',
			description:
				'A full-stack collaborative project management platform that enables multiple users to manage tasks, organize workflows, and collaborate across shared Kanban boards with real-time synchronization.',
			image: 'https://via.placeholder.com/800x600?text=Collaborative+Kanban',
			technologies: [
				'React.js',
				'JavaScript',
				'Node.js',
				'Express.js',
				'MongoDB',
				'Socket.IO',
				'JWT',
				'Tailwind CSS',
			],
			githubUrl:
				'https://github.com/papu9679/Real-Time-Collaborative-Kanban-Board',
			liveUrl: 'https://real-time-collaborative-kanban-boar-zeta.vercel.app',
			featured: true,
			highlights: [
				'Implemented real-time collaboration to synchronize board updates across multiple users',
				'Developed Kanban boards with task creation, editing, deletion, and drag-and-drop functionality',
				'Integrated Socket.IO for real-time event communication',
				'Implemented secure authentication and role-based access control',
				'Designed REST APIs for managing boards, tasks, and user operations',
			],
		},

		{
			id: 'geminibot',
			title: 'Gemini Clone - AI-Powered Conversational Chatbot',
			category: 'fullstack',
			description:
				'An AI-powered conversational chatbot built using Google Gemini API, enabling users to interact with an intelligent assistant through natural language conversations and receive context-aware responses.',
			image: 'https://via.placeholder.com/800x600?text=Gemini+Bot',
			technologies: [
				'React.js',
				'JavaScript',
				'Node.js',
				'Express.js',
				'Google Gemini API',
				'REST API',
				'Tailwind CSS',
			],
			githubUrl: 'https://github.com/papu9679/GeminiBot',
			liveUrl: 'https://frontend-nine-pink-80.vercel.app',
			featured: true,
			highlights: [
				'Integrated Google Gemini API for AI-powered conversational responses',
				'Developed an interactive chatbot interface for real-time conversations',
				'Implemented backend API endpoints to handle communication with Gemini',
				'Managed conversation state to support continuous interactions',
				'Designed a responsive user interface for an improved chat experience',
			],
		},

		{
			id: 'taskflow',
			title: 'TaskFlow - Modern Task Management Application',
			category: 'fullstack',
			description:
				'A modern task management application designed to help users organize daily activities, manage tasks, track progress, and improve productivity through an intuitive and responsive user interface.',
			image: 'https://via.placeholder.com/800x600?text=TaskFlow',
			technologies: [
				'React.js',
				'JavaScript',
				'Tailwind CSS',
				'Node.js',
				'Express.js',
				'MongoDB',
				'Mongoose',
			],
			githubUrl: 'https://github.com/papu9679/TaskFlow-with-Modern-UI',
			liveUrl: 'https://task-flow-with-modern-ui.vercel.app',
			featured: true,
			highlights: [
				'Developed a modern and responsive task management interface',
				'Implemented task creation, editing, deletion, and status management',
				'Designed an intuitive dashboard for organizing and tracking tasks',
				'Integrated frontend components with backend REST APIs',
				'Focused on clean UI design and an improved user experience',
			],
		},

		{
			id: 'staymate',
			title: 'StayMate - Hostel & PG Management System',
			category: 'fullstack',
			description:
				'A centralized hostel and PG management platform designed to simplify daily operations by bringing food management, rent tracking, expense monitoring, notices, tasks, and complaint management into a single dashboard.',
			image: 'https://via.placeholder.com/800x600?text=StayMate',
			technologies: [
				'React.js',
				'JavaScript',
				'Vite',
				'React Router',
				'Tailwind CSS',
				'Context API',
				'Lucide React',
			],
			githubUrl: 'https://github.com/papu9679/staymate',
			liveUrl: 'https://staymate-five.vercel.app/',
			featured: true,
			highlights: [
				'Developed a centralized dashboard for managing hostel and PG activities',
				'Implemented food menu and daily meal management',
				'Built rent tracking with payment details and payment history',
				'Integrated expense tracking and monthly expense monitoring',
				'Developed notice board and task management features',
				'Implemented complaint management and user profile settings',
				'Created a responsive interface with reusable React components',
			],
		},

		{
			id: 'random-js-topics',
			title: 'Random Topics of JavaScript - JavaScript Learning Repository',
			category: 'frontend',
			description:
				'A JavaScript learning repository containing practical examples, code snippets, and demonstrations of important JavaScript concepts to strengthen programming fundamentals and understand core language features.',
			image: 'https://via.placeholder.com/800x600?text=JavaScript+Topics',
			technologies: ['JavaScript', 'HTML5', 'CSS3', 'ES6+'],
			githubUrl: 'https://github.com/papu9679/Random-Topics-of-JS',
			liveUrl: 'https://random-topics-of-js.vercel.app/',
			featured: false,
			highlights: [
				'Explored and implemented fundamental JavaScript concepts',
				'Practiced modern JavaScript features and ES6+ syntax',
				'Created practical code examples to understand language behavior',
				'Worked with functions, arrays, objects, and asynchronous JavaScript',
				'Organized learning examples for quick reference and revision',
			],
		},

		{
			id: 'slackbridge',
			title: 'SlackBridge - AI Assistant Integration for Slack',
			category: 'fullstack',
			description:
				'Node.js server implementing the Model Context Protocol (MCP) so LLMs can interact with Slack workspaces to send messages and manage channels.',
			image: 'https://via.placeholder.com/800x600?text=SlackBridge',
			technologies: [
				'Node.js',
				'JavaScript',
				'MCP SDK',
				'Slack Web API',
				'Zod',
				'Express.js',
			],
			githubUrl: 'https://github.com/papu9679/slack-mcp-server',
			liveUrl: 'https://slackbridge-demo.com',
			featured: true,
			highlights: [
				'Registers MCP tools for LLMs to execute Slack actions',
				'Schema validation on all tool inputs using Zod',
				'Support for channel messages, user lookup, and history retrieval',
				'Idempotency caching with Redis to avoid duplicate messages',
				'Extensible architecture ready for custom Slack bots',
			],
		},
	],

	resume: {
		downloadFileName: 'Sayan_Adhikary.pdf',
		driveViewUrl:
			'https://drive.google.com/file/d/13ZEpaqeLeo0m6n77hG4vNX85pcSeChy9/view?usp=sharing',
		directDownloadUrl:
			'https://drive.google.com/uc?export=download&id=13ZEpaqeLeo0m6n77hG4vNX85pcSeChy9',
		summary:
			'Full-Stack Software Engineer with experience building web applications in React, Node.js, and MongoDB. Practical background in REST API development, authentication, and cloud deployment.',
		experience: [
			{
				role: 'Web Developer',
				company: 'Self Employed, Freelance',
				period: '2026 - Present',
				location: 'Remote',
				achievements: [
					'Built responsive React web interfaces and integrated backend APIs.',
					'Developed RESTful endpoints using Node.js, Express, and MongoDB.',
					'Configured deployment workflows on Vercel and Render.',
				],
			},
			{
				role: 'Web Development Intern',
				company: 'AccioJob',
				period: '2025 - 2026',
				location: 'Chennai',
				achievements: [
					'Created reusable Tailwind CSS UI components across project modules.',
					'Maintained REST APIs and wrote database queries for frontend features.',
				],
			},
		],
	},
};
