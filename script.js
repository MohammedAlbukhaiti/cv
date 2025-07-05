document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, MotionPathPlugin);

    // --- GLOBAL ELEMENTS & STATE ---
    const langSwitcher = document.getElementById('lang-switcher');
    let currentLang = 'ar';

    // --- I18N (INTERNATIONALIZATION) SETUP ---
    const translations = {
        en: {
            meta_title: "Mohammed Albukaiti - Engineer & Digital Innovator",
            preloader_logo: "Mohammed Albukaiti<span>.</span>",
            header_title: "Mohammed Albukaiti<span>.</span>",
            nav_home: "Home", nav_about: "About", nav_skills: "Skills", nav_portfolio: "Portfolio", nav_contact: "Contact",
            hero_subtitle: "Surveying & Roads Engineer | Digital Engineering Innovator",
            hero_desc: "I translate complex data into smart, sustainable infrastructure, designing solutions that not only serve the present but also envision the future.",
            hero_cta: "Explore My Work",
            about_subtitle: "Who I Am", about_title: "About Me",
            about_story_title: "A Passion for Precision, A Vision for the Future",
            about_p1: "My journey began with an innate curiosity to understand the world, not just as images, but as precise data. In surveying engineering, I learned the language of the earth: the language of unerring accuracy.",
            about_p2: "But the real spark came not from a classroom, but from a black screen of code. As a hobby, I explored programming and AI, and quickly realized their immense power. This question turned my hobby into a vision.",
            about_p3: "Today, as a recent graduate, I carry an expert's vision. I believe the next-gen engineer is a creator of tools, not just a user. My vision is to harness code and AI to revolutionize the efficiency of engineering projects.",
            about_cv_btn: "Download CV",
            skills_subtitle: "What I Do", skills_title: "Skills & Competencies",
            skills_chart_title: "Interactive Competency Chart",
            skills_desc_title: "Hover to Discover", skills_desc_text: "Hover over a skill in the chart or list to see details here.",
            skills: [
                { id: 'design', icon: 'fas fa-drafting-compass', title: 'Engineering Design Software', desc: 'Proficient with Autodesk AutoCAD, Civil 3D, Global Mapper, and ArcGIS.' },
                { id: 'surveying', icon: 'fas fa-satellite-dish', title: 'Surveying Tech & Equipment', desc: 'Certified experience with GPS/GNSS, Total Station, and Digital Level devices.' },
                { id: 'programming', icon: 'fas fa-code', title: 'Programming & Data Analysis', desc: 'Using Python (Pandas, GeoPandas) to automate engineering data processing.' },
                { id: 'ai', icon: 'fas fa-brain', title: 'Artificial Intelligence', desc: 'Understanding AI model fundamentals for automation and data analysis.' }
            ],
            portfolio_subtitle: "My Work", portfolio_title: "Featured Projects",
            portfolio_items: [
                { img: 'https://i.ibb.co/0Vw7r8M/A-cinematic-shot-of-a-futuristic-multi-level-highway-interchange-at-dusk-Data-streams-and-hologr.png', title: "Graduation Project: Integrated Road Design", problem: "The challenge was to design a safe and efficient road path connecting two areas with topographical challenges.", solution: "Used Civil 3D for geometric design and developed a Python script to automate earthwork quantity calculations.", impact: "Delivered an integrated design and significantly reduced manual calculation time, proving the ability to merge programming with engineering for efficiency.", tags: ["Civil 3D", "Python", "Automation"]},
                { img: 'https://i.ibb.co/37hHChq/A-top-down-blueprint-view-of-a-futuristic-smart-city-residential-area-The-layout-glows-with-ne.png', title: "Quantity Calculation Web Tool", problem: "The process of calculating earthwork quantities from spreadsheets is repetitive and tedious.", solution: "Built an interactive web tool that allows users to upload a simple CSV file to instantly calculate and display the results.", impact: "Transformed an engineering process into a practical software tool, showcasing web development and problem-solving skills.", tags: ["JavaScript", "HTML/CSS", "Web Tool"]},
                { img: 'https://i.ibb.co/mHxh3kF/An-architectural-render-of-an-iconic-and-sleek-suspension-bridge-The-design-is-minimalist-yet.png', title: "Interactive Analytical Map", problem: "Difficulty in understanding geographical data from static, traditional maps.", solution: "Used ArcGIS and Leaflet.js library to create an interactive map of Riyadh city, displaying multiple data layers.", impact: "Presented data in a professional and user-friendly visual format, demonstrating proficiency in GIS and data visualization.", tags: ["GIS", "ArcGIS", "Data-Viz"]}
            ],
            contact_subtitle: "Let's Talk", contact_title: "Idea & Contact Hub",
            gemini_title: "Consult the Engineering Mind", gemini_desc: "Have a project idea? Describe it here and let AI provide you with an innovative initial concept.", gemini_btn: "Analyze Idea",
            contact_items: [
                { icon: 'fas fa-envelope-open-text', title: "Email", link: "mailto:m.albukaiti.eng@email.com", text: "m.albukaiti.eng@email.com" },
                { icon: 'fab fa-linkedin', title: "My LinkedIn", link: "https://linkedin.com/in/mbukaiti", text: "linkedin.com/in/mbukaiti" },
                { icon: 'fab fa-github', title: "My GitHub", link: "https://github.com/mbukaiti", text: "github.com/mbukaiti" }
            ],
            footer_copyright: "© 2024 Mohammed Albukaiti. All rights reserved."
        },
        ar: {
            meta_title: "محمد البخيتي - مهندس ومبتكر رقمي",
            preloader_logo: "محمد البخيتي<span>.</span>",
            header_title: "محمد البخيتي<span>.</span>",
            nav_home: "الرئيسية", nav_about: "عني", nav_skills: "المهارات", nav_portfolio: "المشاريع", nav_contact: "اتصل بي",
            hero_subtitle: "مهندس مساحة وطرق | مبتكر حلول هندسية رقمية",
            hero_desc: "أترجم البيانات المعقدة إلى بنى تحتية ذكية ومستدامة، وأصمم حلولاً لا تخدم الحاضر فحسب، بل تستشرف المستقبل.",
            hero_cta: "استكشف أعمالي",
            about_subtitle: "Who I Am", about_title: "نبذة عني",
            about_story_title: "شغف بالدقة، ورؤية للمستقبل",
            about_p1: "ولدت وفي داخلي فضول لفهم العالم من حولي، ليس فقط كصور، بل كبيانات دقيقة ونقاط إحداثية ترسم الواقع. هذا الفضول قادني بشكل طبيعي إلى عالم هندسة المساحة والطرق، حيث تعلمت لغة الأرض: لغة الدقة التي لا تقبل الخطأ.",
            about_p2: "لكن الشرارة الحقيقية لم تأتِ من قاعة دراسية، بل من شاشة سوداء لكتابة الأكواد. كهواية، بدأت أستكشف عالم البرمجة والذكاء الاصطناعي، وسرعان ما أدركت القوة الهائلة التي تكمن في الجمع بين هذين العالمين. هذا السؤال حول هوايتي إلى رؤية.",
            about_p3: "أنا اليوم مهندس حديث العهد في مسيرتي المهنية، ولكني أحمل رؤية خبير. أؤمن بأن المهندس القادم ليس من يستخدم البرامج فقط، بل من يصنعها. رؤيتي هي تسخير قوة الكود والذكاء الاصطناعي لإحداث ثورة في كفاءة المشاريع الهندسية.",
            about_cv_btn: "تحميل السيرة الذاتية",
            skills_subtitle: "What I Do", skills_title: "المهارات والكفاءات",
            skills_chart_title: "مخطط الكفاءات التفاعلي",
            skills_desc_title: "مرّر لاكتشاف المزيد", skills_desc_text: "مرّر الفأرة فوق أي مهارة في المخطط أو القائمة لعرض تفاصيل عنها هنا.",
            skills: [
                { id: 'design', icon: 'fas fa-drafting-compass', title: 'برمجيات التصميم الهندسي', desc: 'إتقان التعامل مع Autodesk AutoCAD, Civil 3D, Global Mapper, و ArcGIS.' },
                { id: 'surveying', icon: 'fas fa-satellite-dish', title: 'تقنيات وأجهزة المسح', desc: 'خبرة معتمدة في استخدام أجهزة GPS/GNSS, Total Station, و Digital Level.' },
                { id: 'programming', icon: 'fas fa-code', title: 'البرمجة وتحليل البيانات', desc: 'استخدام Python (ومكتباته Pandas, GeoPandas) لأتمتة معالجة البيانات الهندسية.' },
                { id: 'ai', icon: 'fas fa-brain', title: 'الذكاء الاصطناعي', desc: 'فهم أساسيات نماذج الذكاء الاصطناعي لتطبيقات الأتمتة وتحليل البيانات.' }
            ],
            portfolio_subtitle: "My Work", portfolio_title: "أبرز المشاريع",
            portfolio_items: [
                 { img: 'https://i.ibb.co/0Vw7r8M/A-cinematic-shot-of-a-futuristic-multi-level-highway-interchange-at-dusk-Data-streams-and-hologr.png', title: "مشروع تخرج: تصميم طريق متكامل", problem: "المشكلة: الحاجة لتصميم مسار طريق آمن وفعال يربط بين منطقتين مع تحديات طبوغرافية.", solution: "الحل: استخدمت Civil 3D للتصميم الهندسي، وقمت بتطوير سكربت Python لأتمتة حساب كميات الحفر والردم.", impact: "الأثر: تقديم تصميم متكامل مع تقليل وقت الحسابات اليدوية بشكل كبير، مما يثبت القدرة على دمج البرمجة لزيادة الكفاءة.", tags: ["Civil 3D", "Python", "Automation"]},
                 { img: 'https://i.ibb.co/37hHChq/A-top-down-blueprint-view-of-a-futuristic-smart-city-residential-area-The-layout-glows-with-ne.png', title: "أداة ويب لحساب الكميات", problem: "المشكلة: تكرار وملل عملية حساب كميات الحفر والردم من جداول البيانات.", solution: "الحل: بناء أداة ويب تفاعلية تتيح للمستخدم رفع ملف CSV بسيط، لتقوم الأداة بحساب وعرض النتائج فورياً.", impact: "الأثر: تحويل عملية هندسية إلى أداة برمجية عملية ومتاحة، مما يبرز مهارات تطوير الويب وحل المشكلات.", tags: ["JavaScript", "HTML/CSS", "Web Tool"]},
                 { img: 'https://i.ibb.co/mHxh3kF/An-architectural-render-of-an-iconic-and-sleek-suspension-bridge-The-design-is-minimalist-yet.png', title: "خريطة تحليلية تفاعلية", problem: "المشكلة: صعوبة فهم البيانات الجغرافية من الخرائط التقليدية الثابتة.", solution: "الحل: استخدام ArcGIS ومكتبة Leaflet.js لإنشاء خريطة تفاعلية لمدينة الرياض تعرض طبقات متعددة.", impact: "الأثر: تقديم البيانات بطريقة بصرية احترافية وسهلة الاستخدام، مما يوضح المهارة في نظم المعلومات الجغرافية.", tags: ["GIS", "ArcGIS", "Data-Viz"]}
            ],
            contact_subtitle: "Let's Talk", contact_title: "محطة الأفكار والتواصل",
            gemini_title: "استشر العقل الهندسي", gemini_desc: "هل لديك فكرة مشروع؟ صفها هنا ودع الذكاء الاصطناعي يقدم لك تصوراً أولياً مبتكراً.", gemini_btn: "حلّل الفكرة",
            contact_items: [
                { icon: 'fas fa-envelope-open-text', title: "البريد الإلكتروني", link: "mailto:m.albukaiti.eng@email.com", text: "m.albukaiti.eng@email.com" },
                { icon: 'fab fa-linkedin', title: "ملفي على LinkedIn", link: "https://linkedin.com/in/mbukaiti", text: "linkedin.com/in/mbukaiti" },
                { icon: 'fab fa-github', title: "مشاريعي على GitHub", link: "https://github.com/mbukaiti", text: "github.com/mbukaiti" }
            ],
            footer_copyright: "© 2024 محمد البخيتي. كل الحقوق محفوظة."
        }
    };

    function setLanguage(lang) {
        currentLang = lang;
        const isRtl = lang === 'ar';
        document.documentElement.lang = lang;
        document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
        langSwitcher.textContent = isRtl ? 'EN' : 'AR';
        
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
        
        const heroTitle = document.querySelector('.decode-text');
        if(heroTitle) {
            heroTitle.dataset.text = isRtl ? heroTitle.dataset.textAr : heroTitle.dataset.textEn;
            decodeHeroText();
        }

        populateSkills(lang);
        populatePortfolio(lang);
        populateContact(lang);
        if (skillsChart) { skillsChart.destroy(); }
        initSkillsChart();
    }

    langSwitcher.addEventListener('click', () => {
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        setLanguage(newLang);
    });

    // --- DYNAMIC CONTENT POPULATION ---
    function populateSkills(lang) {
        const grid = document.querySelector('.skills-list');
        if (!grid) return;
        grid.innerHTML = '';
        translations[lang].skills.forEach(skill => {
            grid.innerHTML += `
                <div class="skill-item terran-card" data-skill-id="${skill.id}">
                    <i class="${skill.icon}"></i>
                    <div>
                        <h3>${skill.title}</h3>
                        <p>${skill.desc}</p>
                    </div>
                </div>
            `;
        });
    }

    function populatePortfolio(lang) {
        const grid = document.querySelector('.portfolio-grid');
        if (!grid) return;
        grid.innerHTML = '';
        translations[lang].portfolio_items.forEach(item => {
            const tagsHtml = item.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
            grid.innerHTML += `
                <div class="portfolio-item terran-card">
                    <div class="portfolio-image"><img src="${item.img}" alt="${item.title}"></div>
                    <h3>${item.title}</h3>
                    <p><strong>المشكلة:</strong> ${item.problem}</p>
                    <p><strong>الحل:</strong> ${item.solution}</p>
                    <p><strong>الأثر:</strong> ${item.impact}</p>
                    <div class="tags">${tagsHtml}</div>
                </div>
            `;
        });
    }

    function populateContact(lang) {
        const grid = document.querySelector('#contact .contact-grid');
        if (!grid) return;
        grid.innerHTML = '';
        translations[lang].contact_items.forEach(item => {
            grid.innerHTML += `
                <div class="contact-item">
                    <i class="${item.icon}"></i>
                    <h3>${item.title}</h3>
                    <a href="${item.link}" target="_blank">${item.text}</a>
                </div>
            `;
        });
    }

    // --- ANIMATIONS & INTERACTIONS ---
    function decodeHeroText() {
        const heroTitle = document.querySelector('.decode-text');
        if (heroTitle && heroTitle.dataset.text) {
            const text = heroTitle.dataset.text;
            heroTitle.innerHTML = '';
            text.split('').forEach(char => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                heroTitle.appendChild(span);
            });
            gsap.fromTo(heroTitle.querySelectorAll('span'), 
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.05, stagger: 0.04, ease: 'power2.out', delay: 0.5 }
            );
        }
    }

    // --- PRELOADER & INITIALIZATION ---
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.addEventListener('transitionend', () => preloader.remove());
        }
        document.body.style.overflow = 'auto';
        gsap.utils.toArray('.content-section').forEach(section => {
            gsap.from(section, {
                opacity: 0, y: 50, duration: 1,
                scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none reverse' }
            });
        });
    });
    
    // --- NAVIGATION ---
    const header = document.querySelector('.site-header');
    ScrollTrigger.create({
        start: 'top -80px',
        onUpdate: self => header.classList.toggle('scrolled', self.direction === 1 && self.scroll() > 50)
    });
    document.querySelectorAll('.site-nav a, #hero a.btn').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            gsap.to(window, { duration: 1.5, scrollTo: { y: targetId, offsetY: 80 }, ease: "power3.inOut" });
            if(document.querySelector('.site-nav').classList.contains('active')){
                document.querySelector('.site-nav').classList.remove('active');
                document.querySelector('.nav-toggle').classList.remove('active');
            }
        });
    });
    gsap.utils.toArray('.content-section').forEach(section => {
        ScrollTrigger.create({
            trigger: section, start: "top center", end: "bottom center",
            onToggle: self => {
                const link = document.querySelector(`.nav-link[href="#${section.id}"]`);
                if (link) {
                    document.querySelectorAll('.nav-link.active').forEach(l => l.classList.remove('active'));
                    link.classList.add("active");
                }
            }
        });
    });
    const navToggle = document.querySelector('.nav-toggle');
    const siteNav = document.querySelector('.site-nav');
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        siteNav.classList.toggle('active');
    });

    // --- 3D BACKGROUND ---
    function initThreeJsBackground() {
        const canvas = document.getElementById('threeJsCanvas');
        if (!canvas) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 1; camera.rotation.x = Math.PI / 2;
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        const starCount = 6000;
        const positions = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 1000;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 1000;
            positions[i * 3 + 2] = Math.random() * 1000;
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({ color: 0xaaaaaa, size: 0.7, transparent: true });
        const starField = new THREE.Points(geometry, material);
        scene.add(starField);
        let mouseX = 0;
        window.addEventListener('mousemove', e => { mouseX = e.clientX; });
        function animate() {
            starField.position.y -= 0.1;
            if (starField.position.y < -500) starField.position.y = 500;
            camera.position.x += ((mouseX - window.innerWidth / 2) * 0.0001 - camera.position.x) * 0.05;
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        animate();
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // --- DATA STREAM ---
    function initDataStream() {
        const path = document.getElementById('data-stream-path');
        if (!path) return;
        const points = ['#hero', '#about', '#skills', '#portfolio', '#contact'];
        function updatePath() {
            let d = "";
            points.forEach((point, i) => {
                const el = document.querySelector(point);
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const x = rect.left + window.scrollX + (currentLang === 'ar' ? rect.width * 0.1 : rect.width * 0.9);
                const y = rect.top + window.scrollY + rect.height * 0.5;
                if (i === 0) d += `M ${x} ${y}`;
                else d += ` L ${x} ${y}`;
            });
            path.setAttribute('d', d);
            const pathLength = path.getTotalLength();
            path.style.strokeDasharray = pathLength;
            path.style.strokeDashoffset = pathLength;
            gsap.to(path, {
                strokeDashoffset: 0,
                scrollTrigger: {
                    trigger: ".content-wrapper", start: "top top", end: "bottom bottom", scrub: 1,
                }
            });
        }
        window.addEventListener('load', updatePath);
        window.addEventListener('resize', updatePath);
        langSwitcher.addEventListener('click', () => setTimeout(updatePath, 100));
    }

    // --- SKILLS CHART ---
    let skillsChart;
    function initSkillsChart() {
        const ctx = document.getElementById('skillsRadarChart')?.getContext('2d');
        const descBox = document.getElementById('skill-description-box');
        if (!ctx || !descBox) return;

        const data = {
            labels: translations[currentLang].skills.map(s => s.title),
            datasets: [{
                label: 'Mastery Level',
                data: [85, 90, 95, 80],
                backgroundColor: 'rgba(0, 174, 255, 0.2)',
                borderColor: 'rgba(0, 174, 255, 1)',
                pointBackgroundColor: 'rgba(0, 174, 255, 1)',
            }]
        };

        skillsChart = new Chart(ctx, {
            type: 'radar', data: data,
            options: {
                responsive: true, maintainAspectRatio: true,
                plugins: { legend: { display: false } },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: { font: { family: "'Cairo'", size: 12 }, color: 'var(--text-color)' },
                        ticks: { display: false, beginAtZero: true, max: 100 }
                    }
                }
            }
        });
        
        document.querySelectorAll('.skill-item').forEach((item, index) => {
            item.addEventListener('mouseover', () => {
                const skill = translations[currentLang].skills[index];
                descBox.innerHTML = `<h4>${skill.title}</h4><p>${skill.desc}</p>`;
            });
        });
    }

    // --- GEMINI API ---
    // Placeholder function - replace with your actual API key and logic
    function initGeminiFeature() {
        const button = document.getElementById('expandVisionBtn');
        if(!button) return;
        button.addEventListener('click', () => {
            const responseEl = document.getElementById('gemini-response');
            responseEl.textContent = "ميزة الذكاء الاصطناعي قيد التطوير. شكرًا لاهتمامك!";
        });
    }

    // --- INITIALIZE ALL ---
    setLanguage(currentLang);
    initThreeJsBackground();
    initDataStream();
    initGeminiFeature();
});