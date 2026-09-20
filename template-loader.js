/**
 * TuteDude Template Course Loader
 * Fetches data.json and dynamically renders the course into template.html
 */

(function () {
    // Helper to format currency
    function formatINR(val) {
        return '₹' + Number(val).toLocaleString('en-IN');
    }

    // Generate tailored "What you'll learn" outcomes
    function generateLearningOutcomes(course) {
        const title = course.title;
        const desc = course.description;
        const cat = course.category;

        if (course.isCombo) {
            // Parse bundled technologies or skills from description
            const items = desc.split(/[,&]|\band\b/).map(s => s.replace(/\.$/, '').trim()).filter(Boolean);
            const outcomes = items.map(tool => `Master ${tool} with practical, hands-on industry assignments`);
            outcomes.push(`Build end-to-end portfolio projects integrating ${items.slice(0, 2).join(' and ')}`);
            outcomes.push('Implement real-world workflows used by top global technology companies');
            outcomes.push('1:1 IIT Alumni Mentorship & weekly live doubt resolution sessions');
            outcomes.push('Comprehensive placement support: Resume reviews, mock interviews & referrals');
            return outcomes.slice(0, 8);
        }

        // Domain-specific tailored points
        if (cat === 'development') {
            return [
                `Build scalable real-world applications using modern ${title} best practices`,
                'Master core architecture, design patterns, and state management',
                'Develop RESTful APIs, database integrations, and authentication flows',
                'Write clean, modular, and maintainable production-grade code',
                'Automate testing, version control with Git, and CI/CD deployment pipelines',
                'Ship portfolio-ready capstone projects to showcase to recruiters',
                '1:1 IIT Alumni Mentorship & instant doubt clearing via chat and calls',
                'Dedicated Placement Support: Resume, GitHub audit & referral network'
            ];
        } else if (cat === 'design') {
            return [
                `Master professional UI/UX & visual design workflows with ${title}`,
                'Conduct in-depth user research, personas, and user journey mapping',
                'Design wireframes, high-fidelity prototypes, and interactive micro-animations',
                'Build comprehensive design systems with tokens, components, and autolayout',
                'Prepare pixel-perfect assets and smooth developer handoff specifications',
                'Create a high-impact design portfolio featuring real client case studies',
                '1:1 Mentorship from top product designers at leading tech firms',
                'Placement assistance with direct interview opportunities at top agencies'
            ];
        } else if (cat === 'it') {
            return [
                `Master practical fundamentals and advanced techniques in ${title}`,
                'Analyze and solve complex real-world computing problems efficiently',
                'Understand industry architecture, data pipelines, and system performance',
                'Implement hands-on labs and capstone projects using modern industry toolsets',
                'Optimize algorithms, database queries, and system security practices',
                'Gain practical experience that directly translates to high-paying tech roles',
                '1:1 IIT Alumni Mentorship & personalized doubt solving anytime',
                'Guaranteed placement guidance, mock technical rounds & direct hiring referrals'
            ];
        } else if (cat === 'business') {
            return [
                `Develop core financial, analytical, and strategic skills in ${title}`,
                'Build interactive dashboards and robust financial models from scratch',
                'Analyze market trends, corporate financial statements, and valuation metrics',
                'Extract actionable business insights to drive executive decision-making',
                'Master industry-standard valuation methods (DCF, Comps, Precedents)',
                'Complete capstone case studies based on Fortune 500 business data',
                '1:1 Mentorship from IIM alumni and corporate finance specialists',
                'Placement preparation with resume workshops and mock case interviews'
            ];
        }

        return [
            `Master essential skills and modern practices in ${title}`,
            'Complete hands-on practical exercises and real-world assignments',
            'Learn industry standard tools, frameworks, and productivity workflows',
            'Develop portfolio-worthy deliverables that impress hiring managers',
            '1:1 Mentorship from IIT alumni and experienced industry experts',
            '100% Refund Guarantee upon timely course completion'
        ];
    }

    // Generate tailored Sprints for the Sprint Pipeline
    function generateSprints(course) {
        const title = course.title;
        const cat = course.category;

        if (cat === 'development') {
            return [
                {
                    cat: 'foundation',
                    nodeClass: 'done',
                    statusClass: 'status-done',
                    statusText: 'COMPLETED ✓',
                    title: 'Sprint 01: Core Foundations & Modern Workflow',
                    duration: '4 LESSONS · 1 WORKSHOP',
                    desc: `Set up your development environment, master essential tooling, and establish fundamental syntax in ${title}.`,
                    deliverable: 'Configured local environment + First working project scaffold',
                    chips: ['Environment Setup', 'Syntax & Types', 'CLI Tools', 'Git & GitHub'],
                    lessons: [
                        `Introduction & tooling setup for ${title}`,
                        'Language syntax & modern best practices',
                        'Debugging strategies & developer tools',
                        'Version control & project workflow'
                    ]
                },
                {
                    cat: 'frontend',
                    nodeClass: 'done',
                    statusClass: 'status-done',
                    statusText: 'COMPLETED ✓',
                    title: 'Sprint 02: Component Architecture & State Management',
                    duration: '5 LESSONS · 2 LABS',
                    desc: 'Build modular, responsive interfaces with dynamic state, props, and lifecycle handling.',
                    deliverable: 'Interactive multi-page interface with responsive layout and state sync',
                    chips: ['Component Tree', 'State & Props', 'Event Handling', 'Styling Systems'],
                    lessons: [
                        'Designing modular component structures',
                        'State management patterns & reactive updates',
                        'Handling user input and complex forms',
                        'Responsive mobile-first layouts'
                    ]
                },
                {
                    cat: 'backend',
                    nodeClass: 'milestone',
                    statusClass: 'status-milestone',
                    statusText: 'MILESTONE ★',
                    title: 'Sprint 03: APIs, Data Persistence & Auth',
                    duration: '6 LESSONS · 1 MILESTONE PROJECT',
                    desc: 'Build secure backend services, connect databases, and authenticate users with JWT.',
                    deliverable: 'Full CRUD REST API with authenticated session handling and database',
                    chips: ['RESTful APIs', 'Database CRUD', 'JWT Auth', 'Security Headers'],
                    lessons: [
                        'API architecture and endpoint routing',
                        'Database schema design and queries',
                        'User authentication & protected routes',
                        'Validation, error handling, and logging'
                    ]
                },
                {
                    cat: 'deploy',
                    nodeClass: 'active',
                    statusClass: 'status-active',
                    statusText: 'CURRENT FOCUS',
                    title: 'Sprint 04: Production Build, Testing & CI/CD',
                    duration: '4 LESSONS · 1 CAPSTONE REVIEW',
                    desc: 'Optimize bundle size, add end-to-end tests, and deploy live to production cloud infrastructure.',
                    deliverable: 'Live cloud deployment with custom domain, SSL & CI/CD pipeline',
                    chips: ['Production Build', 'Cloud Hosting', 'Custom Domain', 'Monitoring'],
                    lessons: [
                        'Building production assets and caching',
                        'Deploying frontend and backend to cloud hosts',
                        'Setting up environment variables and secrets',
                        'Performance auditing & lighthouse 95+ score'
                    ]
                },
                {
                    cat: 'deploy',
                    nodeClass: 'locked',
                    statusClass: 'status-locked',
                    statusText: 'LOCKED',
                    title: 'Sprint 05: Placement Accelerator & Career Launchpad',
                    duration: '3 SESSIONS · 1:1 COACHING',
                    desc: 'Refine your developer resume, polish GitHub repositories, and undergo technical mock interviews.',
                    deliverable: 'Reviewed resume, live portfolio website, and hiring referral ready profile',
                    chips: ['Resume Review', 'Portfolio Polish', 'Mock Interviews', 'Referrals'],
                    lessons: [
                        'Technical resume crafting with ATS optimization',
                        'Live mock interview with senior tech mentor',
                        'Direct referral submissions to hiring partners'
                    ]
                }
            ];
        } else if (cat === 'design') {
            return [
                {
                    cat: 'foundation',
                    nodeClass: 'done',
                    statusClass: 'status-done',
                    statusText: 'COMPLETED ✓',
                    title: 'Sprint 01: Design Principles & Tool Mastery',
                    duration: '4 LESSONS · 1 WORKSHOP',
                    desc: `Master typography, layout grids, visual hierarchy, and the complete interface of ${title}.`,
                    deliverable: 'Pixel-perfect UI component kit and visual style guide',
                    chips: ['Design Fundamentals', 'Typography & Color', 'Grid Systems', 'Vector Tools'],
                    lessons: [
                        `Introduction to ${title} and interface configuration`,
                        'Visual hierarchy, spacing & 8pt grid system',
                        'Color theory and accessible palettes',
                        'Typography pairing and scale'
                    ]
                },
                {
                    cat: 'frontend',
                    nodeClass: 'milestone',
                    statusClass: 'status-milestone',
                    statusText: 'MILESTONE ★',
                    title: 'Sprint 02: User Experience & Design Systems',
                    duration: '5 LESSONS · 1 MILESTONE REVIEW',
                    desc: 'Construct scalable design systems with reusable components, autolayout, variants, and variables.',
                    deliverable: 'Comprehensive Design System with 30+ responsive components and variants',
                    chips: ['Autolayout', 'Component Variants', 'Design Tokens', 'Micro-interactions'],
                    lessons: [
                        'Mastering autolayout and fluid resizing',
                        'Building responsive component sets and variants',
                        'Interactive states: hover, focus, disabled',
                        'Design token taxonomy and light/dark modes'
                    ]
                },
                {
                    cat: 'backend',
                    nodeClass: 'active',
                    statusClass: 'status-active',
                    statusText: 'CURRENT FOCUS',
                    title: 'Sprint 03: End-to-End Product Redesign & Prototyping',
                    duration: '5 LESSONS · 1 CASE STUDY',
                    desc: 'Build high-fidelity, interactive prototypes with realistic micro-animations and user flows.',
                    deliverable: 'High-fidelity interactive prototype linked with smart animations',
                    chips: ['Prototyping', 'Smart Animate', 'User Testing', 'Micro-interactions'],
                    lessons: [
                        'Advanced interactive flows and navigation transitions',
                        'Smart animation and realistic physics',
                        'Conducting usability test sessions',
                        'Iterating on feedback and heuristics'
                    ]
                },
                {
                    cat: 'deploy',
                    nodeClass: 'locked',
                    statusClass: 'status-locked',
                    statusText: 'LOCKED',
                    title: 'Sprint 04: Developer Handoff, Portfolio & Placement',
                    duration: '4 SESSIONS · 1:1 MENTORSHIP',
                    desc: 'Format production specs, publish case study on Behance/Dribbble, and prepare for design interviews.',
                    deliverable: 'Published Behance/Notion portfolio case study + Interview ready assets',
                    chips: ['Handoff Specs', 'Case Study', 'Portfolio Review', 'Design Critiques'],
                    lessons: [
                        'Exporting design tokens and engineering handoff',
                        'Structuring a storytelling case study',
                        'Portfolio critique with IIT Alumni design lead',
                        'Design challenge mock interview simulation'
                    ]
                }
            ];
        } else if (cat === 'business') {
            return [
                {
                    cat: 'foundation',
                    nodeClass: 'done',
                    statusClass: 'status-done',
                    statusText: 'COMPLETED ✓',
                    title: 'Sprint 01: Core Concepts & Analytical Foundations',
                    duration: '4 LESSONS · 1 WORKSHOP',
                    desc: `Master the foundational financial and analytical principles underlying ${title}.`,
                    deliverable: 'Structured financial analysis workbook with core metrics',
                    chips: ['Financial Statements', 'Ratio Analysis', 'Excel Architecture', 'Data Prep'],
                    lessons: [
                        `Introduction to ${title} frameworks`,
                        'Deconstructing Income, Balance Sheet & Cash Flow',
                        'Key performance indicators & profitability ratios',
                        'Data cleaning, transformation & validation'
                    ]
                },
                {
                    cat: 'frontend',
                    nodeClass: 'milestone',
                    statusClass: 'status-milestone',
                    statusText: 'MILESTONE ★',
                    title: 'Sprint 02: Dynamic Dashboard & Valuation Models',
                    duration: '5 LESSONS · 1 MILESTONE LAB',
                    desc: 'Build interactive dashboards, scenario sensitivity tables, and valuation models.',
                    deliverable: 'Interactive BI dashboard and DCF valuation model with dynamic inputs',
                    chips: ['Dashboard Design', 'DCF Valuation', 'Sensitivity Tables', 'DAX / Formulas'],
                    lessons: [
                        'Building executive summary KPI dashboards',
                        'Discounted Cash Flow (DCF) modeling from scratch',
                        'Scenario analysis and sensitivity matrices',
                        'Trading & Transaction comps valuation'
                    ]
                },
                {
                    cat: 'backend',
                    nodeClass: 'active',
                    statusClass: 'status-active',
                    statusText: 'CURRENT FOCUS',
                    title: 'Sprint 03: Corporate Case Study & Strategic Recommendations',
                    duration: '4 LESSONS · 1 CAPSTONE',
                    desc: 'Perform a comprehensive deep-dive into a real listed company and present strategic findings.',
                    deliverable: 'Executive investment pitch deck with financial models',
                    chips: ['Case Study', 'Strategic Analysis', 'Forecasting', 'Pitch Deck'],
                    lessons: [
                        'Gathering 10-K / annual reports and market research',
                        '5-year revenue and cost forecasting models',
                        'Synthesizing risks, catalysts, and valuation thesis',
                        'Executive presentation design and storytelling'
                    ]
                },
                {
                    cat: 'deploy',
                    nodeClass: 'locked',
                    statusClass: 'status-locked',
                    statusText: 'LOCKED',
                    title: 'Sprint 04: Career Strategy, Resume & Finance Interviews',
                    duration: '3 SESSIONS · 1:1 COACHING',
                    desc: 'Resume optimization, technical finance mock interviews, and placement support.',
                    deliverable: 'Polished finance resume + verified certificate of completion',
                    chips: ['Finance Resume', 'Technical Mocks', 'Case Studies', 'Placement'],
                    lessons: [
                        'Targeting bulge-bracket and boutique finance firms',
                        '1:1 Mock technical accounting & valuation round',
                        'Direct referral applications to hiring partners'
                    ]
                }
            ];
        }

        // Default / IT / Combo Track
        return [
            {
                cat: 'foundation',
                nodeClass: 'done',
                statusClass: 'status-done',
                statusText: 'COMPLETED ✓',
                title: 'Sprint 01: Architecture & Technical Foundations',
                duration: '4 LESSONS · 1 WORKSHOP',
                desc: `Understand core building blocks, development environments, and fundamentals of ${title}.`,
                deliverable: 'Configured environment + First working implementation',
                chips: ['Core Concepts', 'Environment Setup', 'Workflows', 'Best Practices'],
                lessons: [
                    `Introduction & fundamentals of ${title}`,
                    'Environment setup and standard tooling',
                    'Key concepts, syntax, and principles',
                    'Hands-on foundation lab assignment'
                ]
            },
            {
                cat: 'frontend',
                nodeClass: 'done',
                statusClass: 'status-done',
                statusText: 'COMPLETED ✓',
                title: 'Sprint 02: Practical Implementation & Deep Dive',
                duration: '5 LESSONS · 2 PROJECTS',
                desc: 'Implement intermediate and advanced techniques with practical real-world use cases.',
                deliverable: 'Fully functional working project with documentation',
                chips: ['Practical Workflows', 'Architecture', 'Data Processing', 'Optimization'],
                lessons: [
                    'Intermediate patterns and structural design',
                    'Data handling, processing, and transformation',
                    'Performance optimization and code quality',
                    'Testing and validating results'
                ]
            },
            {
                cat: 'backend',
                nodeClass: 'milestone',
                statusClass: 'status-milestone',
                statusText: 'MILESTONE ★',
                title: 'Sprint 03: Industry Project & Architecture Milestone',
                duration: '6 LESSONS · 1 MILESTONE REVIEW',
                desc: 'Build a production-grade project incorporating industry standards and modern workflows.',
                deliverable: 'Verified milestone capstone project evaluated by IIT alumni mentors',
                chips: ['Capstone Milestone', 'Industry Standards', 'Code Review', 'Portfolio'],
                lessons: [
                    'Architecting the milestone capstone',
                    'Implementing advanced features & edge cases',
                    'Comprehensive testing and security review',
                    'Mentor code review & feedback iteration'
                ]
            },
            {
                cat: 'deploy',
                nodeClass: 'active',
                statusClass: 'status-active',
                statusText: 'CURRENT FOCUS',
                title: 'Sprint 04: Production Deployment & Real-world Delivery',
                duration: '4 LESSONS · LIVE DEPLOYMENT',
                desc: 'Package, deploy, and publish your project with monitoring and live documentation.',
                deliverable: 'Live production delivery + Published case study / repository',
                chips: ['Deployment', 'Cloud / Hosting', 'Documentation', 'Live Project'],
                lessons: [
                    'Preparing deliverables for production',
                    'Publishing and hosting live implementations',
                    'Crafting technical documentation & README',
                    'Final mentor verification & signoff'
                ]
            },
            {
                cat: 'deploy',
                nodeClass: 'locked',
                statusClass: 'status-locked',
                statusText: 'LOCKED',
                title: 'Sprint 05: Placement Assistance & Career Launchpad',
                duration: '3 SESSIONS · 1:1 SESSIONS',
                desc: 'Optimize your professional profile, conduct mock interviews, and unlock direct hiring referrals.',
                deliverable: 'Approved resume, verified certificate, and active recruitment referrals',
                chips: ['Resume Optimization', 'Mock Interviews', 'Referrals', 'Certificate'],
                lessons: [
                    'ATS-friendly resume refinement with IIT mentors',
                    'Mock interview round with comprehensive feedback',
                    'Direct referral introductions to hiring companies'
                ]
            }
        ];
    }

    // Tailored Instructor Info
    function getInstructorInfo(course) {
        const cat = course.category;
        if (course.isCombo) {
            return {
                name: 'IIT Alumni Mentorship Team',
                title: 'Lead Engineers & Practitioners from IIT Delhi, IIT Bombay & IIM',
                bio: `Our combo packs are taught by a dedicated team of elite industry practitioners with extensive expertise in ${course.title}. You get direct 1:1 mentorship and comprehensive doubt support throughout your journey.`,
                icon: 'fa-solid fa-users-gear'
            };
        }
        if (cat === 'development') {
            return {
                name: 'Rahul Sharma',
                title: 'Senior Software Engineer & IIT Delhi Alumnus',
                bio: 'Rahul has over 8 years of experience building scalable web and mobile applications for top tech companies. He specializes in full-stack architecture and has mentored over 10,000 developers.',
                icon: 'fa-solid fa-code'
            };
        }
        if (cat === 'design') {
            return {
                name: 'Ananya Roy',
                title: 'Lead Product Designer & IIT Bombay Alumna',
                bio: 'Ananya has designed award-winning digital experiences for leading startups and tech brands. With over 7 years in UI/UX and product design, she guides students in creating world-class design portfolios.',
                icon: 'fa-solid fa-bezier-curve'
            };
        }
        if (cat === 'business') {
            return {
                name: 'Vikramaditya Verma',
                title: 'VP of Financial Strategy & IIM Ahmedabad Alumnus',
                bio: 'Vikramaditya brings extensive corporate valuation and business analytics expertise from top-tier investment firms. He focuses on practical, real-world case studies that prepare students for finance careers.',
                icon: 'fa-solid fa-briefcase'
            };
        }
        return {
            name: 'Dr. Arjun Patel',
            title: 'Lead Technology Specialist & IIT Madras Alumnus',
            bio: 'Arjun has 9+ years of industry experience leading data, software, and systems engineering teams. He has designed curriculum pathways that have helped thousands of students transition into high-paying careers.',
            icon: 'fa-solid fa-user-tie'
        };
    }

    // Render Sprints HTML
    function renderSprintsHTML(sprints) {
        let html = '<div class="pipeline-track-laser" id="pipelineLaser"></div>';

        sprints.forEach((sprint, idx) => {
            const numStr = String(idx + 1).padStart(2, '0');
            const chipsHtml = sprint.chips.map(c => `<span class="artboard-chip">${c}</span>`).join('');
            const lessonsHtml = sprint.lessons.map(l => `<li><i class="fa-solid fa-circle-play"></i> ${l}</li>`).join('');

            let nodeIcon = '<span class="node-check">✓</span>';
            if (sprint.nodeClass === 'milestone') nodeIcon = '<span class="node-star">★</span>';
            else if (sprint.nodeClass === 'active') nodeIcon = '<span class="node-pencil">✏</span>';
            else if (sprint.nodeClass === 'locked') nodeIcon = '<span class="node-lock">🔒</span>';

            const activeSprintClass = sprint.nodeClass === 'active' ? ' active-sprint' : '';

            html += `
            <div class="sprint-row${activeSprintClass}" data-category="${sprint.cat}">
              <div class="sprint-node ${sprint.nodeClass}" title="${sprint.title}">
                ${nodeIcon}
              </div>
              <div class="sprint-artboard" onclick="toggleArtboardDrawer(this, event)">
                <div class="artboard-topbar">
                  <span class="artboard-filename">${numStr}_sprint_module.fig · 1440 × 900</span>
                  <span class="artboard-status ${sprint.statusClass}">${sprint.statusText}</span>
                </div>
                <div class="artboard-body">
                  <div class="artboard-header-row">
                    <h3 class="artboard-title">${sprint.title}</h3>
                    <span class="artboard-duration">${sprint.duration}</span>
                  </div>
                  <p class="artboard-desc">${sprint.desc}</p>
                  <div class="artboard-deliverable">
                    <b>Deliverable:</b> ${sprint.deliverable}
                  </div>
                  <div class="artboard-chips">
                    ${chipsHtml}
                  </div>
                  <div class="artboard-lessons-toggle">
                    <span>View ${sprint.lessons.length} lessons</span> <i class="fa-solid fa-chevron-down"></i>
                  </div>
                  <div class="artboard-lessons-drawer">
                    <ul class="artboard-lesson-list">
                      ${lessonsHtml}
                    </ul>
                  </div>
                </div>
              </div>
            </div>`;
        });

        return html;
    }

    // Main Render Function
    function renderCourse(course, allCourses) {
        if (!course) return;

        // 1. Page Title
        document.title = `${course.title} — 100% Refund on Completion | TuteDude`;

        // 2. Breadcrumb
        const breadcrumbEl = document.getElementById('breadcrumbCourseTitle');
        if (breadcrumbEl) breadcrumbEl.textContent = course.title;

        // 3. Category Tag & Icon
        const categoryBadge = document.getElementById('courseCategoryBadge');
        if (categoryBadge) {
            const badgeColor = course.iconColor || '#3498DB';
            categoryBadge.style.setProperty('--badge-color', badgeColor);
            categoryBadge.innerHTML = `<i class="${course.icon || 'fa-solid fa-graduation-cap'}"></i> <span>${course.subCategory || (course.category.toUpperCase())}</span>`;
        }

        // 4. Course Title & Subtitle
        const titleEl = document.getElementById('courseTitle');
        if (titleEl) titleEl.textContent = course.title;

        const subtitleEl = document.getElementById('courseSubtitle');
        if (subtitleEl) subtitleEl.textContent = course.description;

        // 5. Badges
        const ratingValEl = document.getElementById('courseRatingVal');
        if (ratingValEl) ratingValEl.textContent = course.rating || '4.8';

        const enrolledValEl = document.getElementById('courseEnrolledVal');
        if (enrolledValEl) enrolledValEl.textContent = course.enrolled || '5,000+';

        const hoursValEl = document.getElementById('courseHoursVal');
        if (hoursValEl) hoursValEl.textContent = course.isCombo ? '60+ Hours' : '40 Hours';

        // 6. "What you'll learn"
        const learnList = document.getElementById('learnPointsList');
        if (learnList) {
            const outcomes = generateLearningOutcomes(course);
            learnList.innerHTML = outcomes.map(o => `
                <li style="display: flex; gap: 8px; font-size: 0.9rem;">
                    <i class="fa-solid fa-check" style="color: var(--brand-success); margin-top: 5px;"></i>
                    <span>${o}</span>
                </li>
            `).join('');
        }

        // 7. Interactive Sprint Pipeline
        const kickerEl = document.getElementById('pipelineKicker');
        if (kickerEl) {
            kickerEl.textContent = course.isCombo ? 'COMPREHENSIVE MULTI-COURSE TRACK' : '90-DAY CAREER SPRINT ROADMAP';
        }

        const pipeTitleEl = document.getElementById('pipelineTitle');
        if (pipeTitleEl) {
            pipeTitleEl.textContent = `Your Professional ${course.title} Journey`;
        }

        const pipeTrack = document.getElementById('pipelineTrack');
        if (pipeTrack) {
            const sprints = generateSprints(course);
            pipeTrack.innerHTML = renderSprintsHTML(sprints);
            attachPipelineEvents();
        }

        // 8. Instructor Section
        const instructor = getInstructorInfo(course);
        const instImg = document.getElementById('instructorIcon');
        if (instImg) instImg.className = instructor.icon;

        const instName = document.getElementById('instructorName');
        if (instName) instName.textContent = instructor.name;

        const instTitle = document.getElementById('instructorTitle');
        if (instTitle) instTitle.textContent = instructor.title;

        const instBio = document.getElementById('instructorBio');
        if (instBio) instBio.textContent = instructor.bio;

        // 9. Sticky Enroll Card
        const priceCurrent = document.getElementById('sidebarPriceCurrent');
        if (priceCurrent) priceCurrent.textContent = formatINR(course.price);

        const priceOrig = document.getElementById('sidebarPriceOriginal');
        if (priceOrig) priceOrig.textContent = formatINR(course.originalPrice);

        const discountPct = Math.max(10, Math.round((1 - (course.price / course.originalPrice)) * 100));
        const discountEl = document.getElementById('sidebarDiscountText');
        if (discountEl) discountEl.textContent = `You get ${discountPct}% off today!`;

        const refundDesc = document.getElementById('sidebarRefundDesc');
        if (refundDesc) {
            refundDesc.textContent = `Complete ${course.title} within 3 months and get your full ${formatINR(course.price)} back in your bank account.`;
        }

        const featuresList = document.getElementById('sidebarFeaturesList');
        if (featuresList) {
            featuresList.innerHTML = `
                <li><i class="fa-solid fa-check-circle"></i> Lifetime access to full course &amp; future updates</li>
                <li><i class="fa-solid fa-check-circle"></i> 1:1 Mentorship sessions with IIT Alumni</li>
                <li><i class="fa-solid fa-check-circle"></i> Instant live doubt solving via chat &amp; calls</li>
                <li><i class="fa-solid fa-check-circle"></i> Hands-on industry projects &amp; code reviews</li>
                <li><i class="fa-solid fa-check-circle"></i> 100% Placement Support &amp; Job Assistance</li>
                <li><i class="fa-solid fa-check-circle"></i> Verified Certificate of completion</li>
                ${course.isCombo ? '<li><i class="fa-solid fa-check-circle"></i> Access to all bundled courses in this pack</li>' : ''}
            `;
        }

        // 10. Update Course Switcher Dropdown
        const switcher = document.getElementById('courseSwitcher');
        if (switcher && allCourses) {
            switcher.value = course.id;
        }
    }

    // Reattach node clicks and filter button listeners when pipeline re-renders
    function attachPipelineEvents() {
        const filterBtns = document.querySelectorAll('.pipeline-filter-btn');
        const sprintRows = document.querySelectorAll('.sprint-row');
        const laser = document.getElementById('pipelineLaser');

        filterBtns.forEach(btn => {
            btn.onclick = function () {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const cat = btn.getAttribute('data-category');
                sprintRows.forEach(row => {
                    if (cat === 'all' || row.getAttribute('data-category') === cat) {
                        row.classList.remove('hidden');
                    } else {
                        row.classList.add('hidden');
                    }
                });

                if (laser) {
                    laser.style.display = (cat === 'all') ? 'block' : 'none';
                }
            };
        });

        // Toast notifications for sprint nodes
        const toast = document.getElementById('pipelineToast');
        let toastTimer = null;
        function showToast(html) {
            if (!toast) return;
            toast.innerHTML = html;
            toast.classList.add('show');
            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => { toast.classList.remove('show'); }, 2600);
        }

        document.querySelectorAll('.sprint-node').forEach(node => {
            node.onclick = function (e) {
                e.stopPropagation();
                if (node.classList.contains('milestone')) {
                    showToast('🏆 <b>Milestone Cleared:</b> Course Project Badge &amp; +150 XP Achieved!');
                } else if (node.classList.contains('done')) {
                    showToast('✓ <b>Sprint Verified:</b> Lessons completed &amp; deliverables approved.');
                } else if (node.classList.contains('active')) {
                    showToast('✏️ <b>Current Focus:</b> This module is in active progress!');
                } else if (node.classList.contains('locked')) {
                    showToast('🔒 <b>Sprint Locked:</b> Complete the preceding sprints to unlock.');
                }
            };
        });
    }

    // Populate Course Switcher Select
    function populateSwitcher(allCourses, currentCourseId) {
        const switcher = document.getElementById('courseSwitcher');
        if (!switcher) return;

        switcher.innerHTML = '';

        // Categories mapping
        const categoryLabels = {
            combo: 'Combo Packs',
            development: 'Development',
            design: 'Design & Video Editing',
            it: 'IT & Software',
            business: 'Business'
        };

        const groups = {};
        allCourses.forEach(c => {
            const cat = c.category || 'other';
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push(c);
        });

        // Order of categories
        const catOrder = ['combo', 'development', 'design', 'it', 'business'];
        catOrder.forEach(cat => {
            if (!groups[cat]) return;
            const optgroup = document.createElement('optgroup');
            optgroup.label = categoryLabels[cat] || cat.toUpperCase();
            groups[cat].forEach(c => {
                const opt = document.createElement('option');
                opt.value = c.id;
                opt.textContent = c.title + (c.isCombo ? ' (Combo)' : '');
                if (c.id === currentCourseId) opt.selected = true;
                optgroup.appendChild(opt);
            });
            switcher.appendChild(optgroup);
        });

        switcher.addEventListener('change', function (e) {
            const selectedId = e.target.value;
            const targetCourse = allCourses.find(c => c.id === selectedId);
            if (targetCourse) {
                // Update URL without refresh
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.set('id', selectedId);
                window.history.pushState({ id: selectedId }, '', newUrl.toString());
                renderCourse(targetCourse, allCourses);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // Initialize
    async function init() {
        let courses = null;

        try {
            const response = await fetch('data.json');
            if (response.ok) {
                const json = await response.json();
                courses = json.courses;
            }
        } catch (e) {
            console.warn('Could not fetch data.json directly:', e);
        }

        if (!courses || !courses.length) {
            console.error('No course data available.');
            return;
        }

        // Detect course from URL params
        const urlParams = new URLSearchParams(window.location.search);
        const queryId = urlParams.get('id') || urlParams.get('course');

        let activeCourse = null;
        if (queryId) {
            const cleanQuery = queryId.toLowerCase().trim();
            activeCourse = courses.find(c =>
                c.id.toLowerCase() === cleanQuery ||
                c.title.toLowerCase() === cleanQuery ||
                c.id.replace(/-/g, '') === cleanQuery.replace(/-/g, '')
            );
        }

        // Default to mern-stack if not found or no query
        if (!activeCourse) {
            activeCourse = courses.find(c => c.id === 'mern-stack') || courses[0];
        }

        populateSwitcher(courses, activeCourse.id);
        renderCourse(activeCourse, courses);

        // Handle browser Back/Forward navigation
        window.addEventListener('popstate', function (e) {
            const params = new URLSearchParams(window.location.search);
            const id = params.get('id') || 'mern-stack';
            const course = courses.find(c => c.id === id) || courses[0];
            renderCourse(course, courses);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
