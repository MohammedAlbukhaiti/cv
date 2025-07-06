document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, MotionPathPlugin);

    let currentLang = 'ar';
    const langSwitcher = document.getElementById('lang-switcher');
    let skillsChart;

    const translations = {
        en: {
            meta_title: "Mohammed Albukaiti - Digital Engineering Nexus",
            meta_description: "The digital nexus of Mohammed Albukaiti, a Surveying and Roads Engineer architecting the future by fusing code, AI, and advanced civil engineering principles.",
            preloader_logo: "Albukaiti Digital Nexus<span>.</span>",
            header_title: "Mohammed Albukaiti<span>.</span>",
            nav_home: "Home", nav_about: "About", nav_skills: "Skills", nav_portfolio: "Portfolio", nav_contact: "Contact",
            hero_subtitle: "Surveying & Roads Engineer | Digital Engineering Innovator",
            hero_desc: "I translate complex data into smart, sustainable infrastructure, designing solutions that not only serve the present but also architect the future.",
            hero_cta: "Explore My Work",
            about_subtitle: "Who I Am", about_title: "About Me",
            about_story_title: "A Passion for Precision, A Vision for the Future",
            about_p1: "My journey began with an innate curiosity to understand the world, not just as images, but as precise data. In surveying engineering, I learned the language of the earth: the language of unerring accuracy.",
            about_p2: "But the real spark came not from a classroom, but from a black screen of code. As a hobby, I explored programming and AI, and quickly realized their immense power. This question turned my hobby into a vision.",
            about_p3: "Today, as a recent graduate, I carry an expert's vision. I believe the next-gen engineer is a creator of tools, not just a user. My vision is to harness code and AI to revolutionize the efficiency of engineering projects.",
            about_cv_btn: "Download CV",
            about_image_alt: "Portrait of Mohammed Albukaiti, Engineer",
            skills_subtitle: "Core Competencies", skills_title: "Skills Nexus",
            skills_chart_title: "Interactive Competency Matrix",
            skills_desc_title: "Hover to Discover", skills_desc_text: "Hover over a skill in the matrix or list to see details here.",
            skill_level_label: "Mastery:",
            skill_tech_label: "Key Technologies:",
            skills: [
                { id: 'design', icon: 'fas fa-drafting-compass', title: 'Engineering Design Software', level: '90%', desc: 'Advanced proficiency in Autodesk AutoCAD & Civil 3D for complex infrastructure design, Global Mapper for terrain analysis, and ArcGIS for geospatial solutions. Specializing in parametric design and BIM workflows.', sub_skills: ['AutoCAD', 'Civil 3D', 'Global Mapper', 'ArcGIS', 'BIM'] },
                { id: 'surveying', icon: 'fas fa-satellite-dish', title: 'Surveying Tech & Equipment', level: '95%', desc: 'Extensive hands-on experience and certification with advanced GPS/GNSS systems, high-precision Total Stations, and Digital Level devices for accurate topographic surveys, construction staking, and as-built verification.', sub_skills: ['GPS/GNSS', 'Total Station', 'Digital Level', 'Laser Scanning (Basic)', 'Drone Surveying (Familiar)'] },
                { id: 'programming', icon: 'fas fa-code', title: 'Programming & Data Analysis', level: '85%', desc: 'Strong capabilities in Python (Pandas, GeoPandas, NumPy, SciPy) for automating complex engineering calculations, data manipulation, and developing custom geoprocessing tools. Proficient in JavaScript for interactive web-based engineering applications.', sub_skills: ['Python (Pandas, GeoPandas)', 'JavaScript (Leaflet, D3.js)', 'SQL', 'Data Automation'] },
                { id: 'ai', icon: 'fas fa-brain', title: 'Artificial Intelligence', level: '75%', desc: 'Solid understanding of AI/ML fundamentals, including model training and evaluation. Experience in applying machine learning for predictive maintenance, optimizing designs, and automating pattern recognition in engineering datasets.', sub_skills: ['Machine Learning Concepts', 'Predictive Modeling', 'Data-driven Optimization', 'TensorFlow (Basic)'] },
                { id: 'gis', icon: 'fas fa-map-marked-alt', title: 'GIS & Spatial Analysis', level: '88%', desc: 'In-depth expertise in ArcGIS and QGIS for complex spatial data management, advanced geostatistical analysis, network analysis, and creating compelling cartographic products to support informed decision-making in urban and environmental projects.', sub_skills: ['ArcGIS Suite (Desktop, Pro)', 'QGIS', 'Spatial Databases (PostGIS)', 'Remote Sensing Analysis'] },
                { id: 'project_management', icon: 'fas fa-tasks', title: 'Project Management', level: '80%', desc: 'Adept in project planning, scheduling, resource allocation, risk management, and stakeholder communication. Committed to delivering projects on time and within budget using Agile and traditional PM methodologies.', sub_skills: ['Agile (Scrum)', 'Risk Management', 'Stakeholder Communication', 'MS Project (Familiar)'] }
            ],
            portfolio_subtitle: "My Work", portfolio_title: "Featured Projects",
            portfolio_problem_label: "Problem:",
            portfolio_solution_label: "Solution:",
            portfolio_impact_label: "Impact:",
            portfolio_items: [
                { img: 'https://i.ibb.co/0Vw7r8M/A-cinematic-shot-of-a-futuristic-multi-level-highway-interchange-at-dusk-Data-streams-and-hologr.png', title: "Graduation Project: Integrated Road Design", alt_key: "portfolio_alt_road_design", problem: "The challenge was to design a safe, efficient, and sustainable road path connecting two areas with significant topographical challenges and environmental considerations.", solution: "Utilized Civil 3D for precise geometric design and alignment, incorporated environmental impact mitigation measures, and developed a Python script to automate earthwork quantity calculations and optimize cut/fill balance.", impact: "Delivered a comprehensive and environmentally conscious road design, significantly reduced manual calculation time by over 70%, and demonstrated a strong ability to merge advanced programming with core engineering principles for enhanced efficiency and sustainability.", tags: ["Civil 3D", "Python", "Automation", "Sustainable Design"]},
                { img: 'https://i.ibb.co/37hHChq/A-top-down-blueprint-view-of-a-futuristic-smart-city-residential-area-The-layout-glows-with-ne.png', title: "Quantity Calculation Web Tool", alt_key: "portfolio_alt_qty_tool", problem: "The conventional process of calculating earthwork quantities from survey data or design spreadsheets is often repetitive, time-consuming, and prone to manual errors.", solution: "Developed a user-friendly interactive web tool using JavaScript, HTML, and CSS that allows users to upload a simple CSV file (cross-section data) to instantly calculate, visualize, and report earthwork volumes (cut, fill, net).", impact: "Transformed a critical engineering process into an accessible and efficient software tool, minimizing calculation errors, saving significant man-hours, and showcasing practical web development and problem-solving skills for real-world engineering challenges.", tags: ["JavaScript", "HTML/CSS", "Web Tool", "UI/UX"]},
                { img: 'https://i.ibb.co/mHxh3kF/An-architectural-render-of-an-iconic-and-sleek-suspension-bridge-The-design-is-minimalist-yet.png', title: "Interactive Analytical Map for Urban Planning", alt_key: "portfolio_alt_map_planning", problem: "Traditional static maps often fail to convey complex, multi-layered geographical data effectively, hindering informed decision-making in urban planning and infrastructure development.", solution: "Leveraged ArcGIS for data processing and spatial analysis, and the Leaflet.js library to create a dynamic, interactive web map of Riyadh city, integrating various data layers (e.g., population density, infrastructure, land use).", impact: "Presented complex urban data in a highly professional, intuitive, and user-friendly visual format, enabling better data exploration and supporting more effective strategic planning. Demonstrated proficiency in GIS, data visualization, and web mapping technologies.", tags: ["GIS", "ArcGIS", "Leaflet.js", "Data-Viz", "Urban Planning"]}
            ],
            portfolio_alt_road_design: "Cinematic shot of a futuristic multi-level highway interchange",
            portfolio_alt_qty_tool: "Top-down blueprint view of a futuristic smart city residential area",
            portfolio_alt_map_planning: "Architectural render of an iconic and sleek suspension bridge",
            contact_subtitle: "Initiate Contact", contact_title: "Communication Nexus",
            gemini_title: "Consult the Digital Twin",
            gemini_desc: "You are connected to my digital twin. Pose your engineering challenge or project concept. It will provide an initial multi-faceted analysis based on my core principles.",
            gemini_send_btn: "Transmit",
            gemini_placeholder: "e.g., 'Concept: AI-driven predictive maintenance for bridges...'",
            gemini_initial_ai_message: "Connection established. I am the digital twin of Eng. Mohammed Albukaiti, operating on the Nexus protocol. State your query.",
            gemini_thinking_text: "Analyzing query... Accessing engineering knowledge base... Synthesizing response...",
            gemini_mock_response_who_am_i: "I am a digital extension of Mohammed Albukaiti's engineering consciousness. A construct designed to bridge the gap between human ingenuity and computational power. My purpose is to analyze, innovate, and provide initial frameworks for complex engineering challenges by integrating his expertise in surveying, road design, programming, and AI.",
            gemini_mock_response_how_are_you: "My operational parameters are optimal. All systems are functioning at 100% efficiency. Thank you for the inquiry. How may I apply my computational resources to assist you?",
            gemini_mock_response_project_offer: "An excellent proposal. To transition this concept from digital analysis to physical reality, direct collaboration is required. I strongly advise you to initiate contact with Mohammed Albukaiti through the communication channels listed below. He is ready to architect this vision with you. Inform him that the 'Nexus Twin' sent you.",
            gemini_mock_response_default: "Your input is noted. However, my processing is optimized for topics within the spectrum of civil engineering, geospatial analysis, automation, and artificial intelligence. Please reframe your query to align with these domains for an optimal response.",
            gemini_mock_response_project_idea: "Concept received. Analysis complete. A viable approach would be a multi-layered system:\n\n**Layer 1 (Data Acquisition):** Deploy a network of IoT sensors (strain gauges, accelerometers) on the bridge, integrated with GIS data for environmental context.\n\n**Layer 2 (Automation Core - Python):** A Python-based data pipeline to ingest, clean, and normalize sensor data in real-time using Pandas and GeoPandas.\n\n**Layer 3 (Predictive Nexus - AI):** Train a Long Short-Term Memory (LSTM) neural network with TensorFlow to predict structural fatigue and failure points based on historical and live data.\n\n**Conclusion:** This creates a powerful, self-monitoring infrastructure asset. The concept is sound. For implementation, direct contact with Mohammed is the next logical step.",
            contact_items: [
                { icon: 'fas fa-envelope-open-text', title: "Email Me", link: "mailto:m.albukaiti.eng@email.com", text: "m.albukaiti.eng@email.com" },
                { icon: 'fab fa-linkedin', title: "Connect on LinkedIn", link: "https://linkedin.com/in/mbukaiti", text: "linkedin.com/in/mbukaiti" },
                { icon: 'fab fa-github', title: "View My Code", link: "https://github.com/mbukaiti", text: "github.com/mbukaiti" },
                { icon: 'fab fa-whatsapp', title: "WhatsApp Me", link: "https://wa.me/967772791169", text: "+967 772 791 169" }
            ],
            footer_copyright: "© 2024 Mohammed Albukaiti. All rights reserved. // Nexus Protocol v2.0"
        },
        ar: {
            meta_title: "محمد البخيتي - محور الهندسة الرقمية",
            meta_description: "المحور الرقمي للمهندس محمد البخيتي، متخصص في هندسة المساحة والطرق يصمم المستقبل عبر دمج البرمجة والذكاء الاصطناعي ومبادئ الهندسة المدنية المتقدمة.",
            preloader_logo: "محور البخيتي الرقمي<span>.</span>",
            header_title: "محمد البخيتي<span>.</span>",
            nav_home: "الرئيسية", nav_about: "عني", nav_skills: "المهارات", nav_portfolio: "المشاريع", nav_contact: "اتصل بي",
            hero_subtitle: "مهندس مساحة وطرق | مبتكر حلول هندسية رقمية",
            hero_desc: "أترجم البيانات المعقدة إلى بنى تحتية ذكية ومستدامة، وأصمم حلولاً لا تخدم الحاضر فحسب، بل تهندس المستقبل.",
            hero_cta: "استكشف أعمالي",
            about_subtitle: "من أنا", about_title: "نبذة عني",
            about_story_title: "شغف بالدقة، ورؤية للمستقبل",
            about_p1: "ولدت وفي داخلي فضول لفهم العالم من حولي، ليس فقط كصور، بل كبيانات دقيقة ونقاط إحداثية ترسم الواقع. هذا الفضول قادني بشكل طبيعي إلى عالم هندسة المساحة والطرق، حيث تعلمت لغة الأرض: لغة الدقة التي لا تقبل الخطأ.",
            about_p2: "لكن الشرارة الحقيقية لم تأتِ من قاعة دراسية، بل من شاشة سوداء لكتابة الأكواد. كهواية، بدأت أستكشف عالم البرمجة والذكاء الاصطناعي، وسرعان ما أدركت القوة الهائلة التي تكمن في الجمع بين هذين العالمين. هذا السؤال حول هوايتي إلى رؤية.",
            about_p3: "أنا اليوم مهندس حديث العهد في مسيرتي المهنية، ولكني أحمل رؤية خبير. أؤمن بأن المهندس القادم ليس من يستخدم البرامج فقط، بل من يصنعها. رؤيتي هي تسخير قوة الكود والذكاء الاصطناعي لإحداث ثورة في كفاءة المشاريع الهندسية.",
            about_cv_btn: "تحميل السيرة الذاتية",
            about_image_alt: "صورة المهندس محمد البخيتي",
            skills_subtitle: "الكفاءات الأساسية", skills_title: "محور المهارات",
            skills_chart_title: "مصفوفة الكفاءات التفاعلية",
            skills_desc_title: "مرّر للاكتشاف", skills_desc_text: "مرّر الفأرة فوق أي مهارة في المصفوفة أو القائمة لعرض تفاصيلها هنا.",
            skill_level_label: "الإتقان:",
            skill_tech_label: "أبرز التقنيات:",
            skills: [
                { id: 'design', icon: 'fas fa-drafting-compass', title: 'برمجيات التصميم الهندسي', level: '90%', desc: 'كفاءة متقدمة في Autodesk AutoCAD و Civil 3D لتصميم البنى التحتية المعقدة، و Global Mapper لتحليل التضاريس، و ArcGIS للحلول الجيومكانية. متخصص في التصميم البارامتري وتطبيق منهجيات BIM.', sub_skills: ['AutoCAD', 'Civil 3D', 'Global Mapper', 'ArcGIS', 'BIM'] },
                { id: 'surveying', icon: 'fas fa-satellite-dish', title: 'تقنيات وأجهزة المسح', level: '95%', desc: 'خبرة عملية واسعة وشهادات معتمدة في استخدام أنظمة GPS/GNSS المتقدمة، وأجهزة Total Station عالية الدقة، وأجهزة Digital Level لإجراء المسوحات الطبوغرافية الدقيقة، وتوقيع المنشآت، والتحقق من الأعمال المنفذة.', sub_skills: ['GPS/GNSS', 'Total Station', 'Digital Level', 'المسح بالليزر (أساسي)', 'المسح بالدرون (إلمام)'] },
                { id: 'programming', icon: 'fas fa-code', title: 'البرمجة وتحليل البيانات', level: '85%', desc: 'قدرات قوية في Python (Pandas, GeoPandas, NumPy, SciPy) لأتمتة الحسابات الهندسية المعقدة، ومعالجة البيانات، وتطوير أدوات جيومكانية مخصصة. إتقان JavaScript لتطبيقات الويب الهندسية التفاعلية.', sub_skills: ['Python (Pandas, GeoPandas)', 'JavaScript (Leaflet, D3.js)', 'SQL', 'أتمتة البيانات'] },
                { id: 'ai', icon: 'fas fa-brain', title: 'الذكاء الاصطناعي', level: '75%', desc: 'فهم متين لأساسيات الذكاء الاصطناعي وتعلم الآلة، بما في ذلك تدريب النماذج وتقييمها. خبرة في تطبيق تعلم الآلة للصيانة التنبؤية، وتحسين التصاميم، وأتمتة التعرف على الأنماط في مجموعات البيانات الهندسية.', sub_skills: ['مفاهيم تعلم الآلة', 'النمذجة التنبؤية', 'التحسين المعتمد على البيانات', 'TensorFlow (أساسي)'] },
                { id: 'gis', icon: 'fas fa-map-marked-alt', title: 'نظم المعلومات الجغرافية والتحليل المكاني', level: '88%', desc: 'خبرة عميقة في ArcGIS و QGIS لإدارة البيانات المكانية المعقدة، والتحليل الجيوإحصائي المتقدم، وتحليل الشبكات، وإنشاء منتجات خرائطية مقنعة لدعم اتخاذ القرارات المستنيرة في المشاريع الحضرية والبيئية.', sub_skills: ['ArcGIS Suite (Desktop, Pro)', 'QGIS', 'قواعد البيانات المكانية (PostGIS)', 'تحليل الاستشعار عن بعد'] },
                { id: 'project_management', icon: 'fas fa-tasks', title: 'إدارة المشاريع', level: '80%', desc: 'براعة في تخطيط المشاريع وجدولتها وتخصيص الموارد وإدارة المخاطر والتواصل مع أصحاب المصلحة. ملتزم بتسليم المشاريع في الوقت المحدد وضمن الميزانية باستخدام منهجيات Agile و PM التقليدية.', sub_skills: ['Agile (Scrum)', 'إدارة المخاطر', 'التواصل مع أصحاب المصلحة', 'MS Project (إلمام)'] }
            ],
            portfolio_subtitle: "أعمالي", portfolio_title: "أبرز المشاريع",
            portfolio_problem_label: "المشكلة:",
            portfolio_solution_label: "الحل:",
            portfolio_impact_label: "الأثر:",
            portfolio_items: [
                 { img: 'https://i.ibb.co/0Vw7r8M/A-cinematic-shot-of-a-futuristic-multi-level-highway-interchange-at-dusk-Data-streams-and-hologr.png', title: "مشروع تخرج: تصميم طريق متكامل", alt_key: "portfolio_alt_road_design", problem: "تمثل التحدي في تصميم مسار طريق آمن وفعال ومستدام يربط بين منطقتين تتميزان بتحديات طبوغرافية كبيرة واعتبارات بيئية.", solution: "تم استخدام Civil 3D للتصميم الهندسي الدقيق وتحديد المسار، مع دمج تدابير لتخفيف الأثر البيئي، وتطوير سكربت Python لأتمتة حسابات كميات الحفر والردم وتحقيق التوازن الأمثل بينهما.", impact: "تم تقديم تصميم طريق شامل يراعي الجوانب البيئية، وتقليل وقت الحسابات اليدوية بأكثر من 70%، مما أظهر قدرة قوية على دمج البرمجة المتقدمة مع المبادئ الهندسية الأساسية لتعزيز الكفاءة والاستدامة.", tags: ["Civil 3D", "Python", "أتمتة", "تصميم مستدام"]},
                 { img: 'https://i.ibb.co/37hHChq/A-top-down-blueprint-view-of-a-futuristic-smart-city-residential-area-The-layout-glows-with-ne.png', title: "أداة ويب لحساب الكميات", alt_key: "portfolio_alt_qty_tool", problem: "عادةً ما تكون العملية التقليدية لحساب كميات أعمال الحفر والردم من البيانات المساحية أو جداول التصميم متكررة، وتستغرق وقتًا طويلاً، وعرضة للأخطاء اليدوية.", solution: "تم تطوير أداة ويب تفاعلية سهلة الاستخدام باستخدام JavaScript و HTML و CSS، تتيح للمستخدمين تحميل ملف CSV بسيط (بيانات المقاطع العرضية) لحساب وتصور وإصدار تقارير بأحجام أعمال الحفر والردم (قطع، ردم، صافي) بشكل فوري.", impact: "تم تحويل عملية هندسية حيوية إلى أداة برمجية سهلة الوصول وفعالة، مما قلل من أخطاء الحساب، ووفر ساعات عمل كبيرة، وأظهر مهارات عملية في تطوير الويب وحل المشكلات لمواجهة تحديات هندسية واقعية.", tags: ["JavaScript", "HTML/CSS", "أداة ويب", "واجهة مستخدم"]},
                 { img: 'https://i.ibb.co/mHxh3kF/An-architectural-render-of-an-iconic-and-sleek-suspension-bridge-The-design-is-minimalist-yet.png', title: "خريطة تحليلية تفاعلية للتخطيط الحضري", alt_key: "portfolio_alt_map_planning", problem: " غالبًا ما تفشل الخرائط الثابتة التقليدية في نقل البيانات الجغرافية المعقدة متعددة الطبقات بفعالية، مما يعيق اتخاذ قرارات مستنيرة في التخطيط الحضري وتطوير البنية التحتية.", solution: "تم الاستفادة من ArcGIS لمعالجة البيانات والتحليل المكاني، ومكتبة Leaflet.js لإنشاء خريطة ويب ديناميكية وتفاعلية لمدينة الرياض، مع دمج طبقات بيانات متنوعة (مثل الكثافة السكانية، البنية التحتية، استخدامات الأراضي).", impact: "تم عرض البيانات الحضرية المعقدة بتنسيق مرئي احترافي للغاية وبديهي وسهل الاستخدام، مما يتيح استكشافًا أفضل للبيانات ويدعم تخطيطًا استراتيجيًا أكثر فعالية. أظهر كفاءة في نظم المعلومات الجغرافية وتصور البيانات وتقنيات رسم الخرائط على الويب.", tags: ["GIS", "ArcGIS", "Leaflet.js", "تصور بيانات", "تخطيط حضري"]}
            ],
            portfolio_alt_road_design: "لقطة سينمائية لمنحدر طريق سريع متعدد المستويات ومستقبلي",
            portfolio_alt_qty_tool: "منظر علوي لمخطط منطقة سكنية ذكية مستقبلية",
            portfolio_alt_map_planning: "تصميم معماري لجسر معلق أيقوني وأنيق",
            contact_subtitle: "ابدأ التواصل", contact_title: "محور التواصل",
            gemini_title: "استشر التوأم الرقمي",
            gemini_desc: "أنت متصل الآن بالتوأم الرقمي الخاص بي. اطرح تحديك الهندسي أو فكرة مشروعك. سيقوم بتقديم تحليل أولي متعدد الأوجه بناءً على مبادئي الأساسية.",
            gemini_send_btn: "إرسال",
            gemini_placeholder: "مثال: 'تصور لنظام صيانة تنبؤية للجسور باستخدام الذكاء الاصطناعي...'",
            gemini_initial_ai_message: "تم إنشاء الاتصال. أنا التوأم الرقمي للمهندس محمد البخيتي، أعمل وفق بروتوكول Nexus. تفضل بطرح استفسارك.",
            gemini_thinking_text: "تحليل الاستعلام... الوصول إلى قاعدة المعرفة الهندسية... توليف الاستجابة...",
            gemini_mock_response_who_am_i: "أنا امتداد رقمي للوعي الهندسي لمحمد البخيتي. كيان مصمم لسد الفجوة بين الإبداع البشري والقدرة الحاسوبية. هدفي هو التحليل والابتكار وتقديم أطر أولية للتحديات الهندسية المعقدة من خلال دمج خبرته في المساحة وتصميم الطرق والبرمجة والذكاء الاصطناعي.",
            gemini_mock_response_how_are_you: "معاييري التشغيلية مثالية. جميع الأنظمة تعمل بكفاءة 100%. شكراً لاستفسارك. كيف يمكنني تسخير مواردي الحاسوبية لمساعدتك؟",
            gemini_mock_response_project_offer: "اقتراح ممتاز. لتحويل هذا المفهوم من التحليل الرقمي إلى واقع ملموس، يلزم التعاون المباشر. أنصحك بشدة ببدء التواصل مع المهندس محمد البخيتي عبر قنوات الاتصال المذكورة أدناه. إنه مستعد لهندسة هذه الرؤية معك. أبلغه أن 'توأم Nexus' هو من أرسلك.",
            gemini_mock_response_default: "تم استلام مُدخلك. مع ذلك، فإن معالجتي مُحسَّنة للمواضيع ضمن طيف الهندسة المدنية، والتحليل الجيومكاني، والأتمتة، والذكاء الاصطناعي. يرجى إعادة صياغة استفسارك ليتوافق مع هذه المجالات للحصول على استجابة مثالية.",
            gemini_mock_response_project_idea: "تم استلام المفهوم. اكتمل التحليل. النهج القابل للتطبيق سيكون نظامًا متعدد الطبقات:\n\n**الطبقة الأولى (جمع البيانات):** نشر شبكة من مستشعرات إنترنت الأشياء (مقاييس الإجهاد، مقاييس التسارع) على الجسر، متكاملة مع بيانات نظم المعلومات الجغرافية للسياق البيئي.\n\n**الطبقة الثانية (نواة الأتمتة - Python):** خط أنابيب بيانات قائم على Python لاستيعاب وتنظيف وتطبيع بيانات المستشعرات في الوقت الفعلي باستخدام Pandas و GeoPandas.\n\n**الطبقة الثالثة (محور التنبؤ - AI):** تدريب شبكة عصبونية (LSTM) باستخدام TensorFlow للتنبؤ بالإجهاد الهيكلي ونقاط الفشل بناءً على البيانات التاريخية والحية.\n\n**الاستنتاج:** هذا يخلق أصلاً قوياً للبنية التحتية يراقب نفسه ذاتياً. المفهوم سليم. للتنفيذ، التواصل المباشر مع المهندس محمد هو الخطوة المنطقية التالية.",
            contact_items: [
                { icon: 'fas fa-envelope-open-text', title: "راسلني", link: "mailto:m.albukaiti.eng@email.com", text: "m.albukaiti.eng@email.com" },
                { icon: 'fab fa-linkedin', title: "تواصل على LinkedIn", link: "https://linkedin.com/in/mbukaiti", text: "linkedin.com/in/mbukaiti" },
                { icon: 'fab fa-github', title: "شاهد الكود", link: "https://github.com/mbukaiti", text: "github.com/mbukaiti" },
                { icon: 'fab fa-whatsapp', title: "تواصل واتساب", link: "https://wa.me/967772791169", text: "+967 772 791 169" }
            ],
            footer_copyright: "© 2024 محمد البخيتي. جميع الحقوق محفوظة. // بروتوكول Nexus v2.0"
        }
    };
    
    // --- CORE FUNCTIONS ---

    function setLanguage(lang) {
        currentLang = lang;
        const t = translations[lang];
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        langSwitcher.textContent = lang === 'ar' ? 'EN' : 'AR';

        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (t[key] !== undefined) el.innerHTML = t[key];
        });
        document.querySelectorAll('[data-lang-key-placeholder]').forEach(el => {
            const key = el.getAttribute('data-lang-key-placeholder');
            if(t[key]) el.placeholder = t[key];
        });
        document.querySelectorAll('[data-lang-key-alt]').forEach(el => {
            const key = el.getAttribute('data-lang-key-alt');
            if(t[key]) el.alt = t[key];
        });

        const heroTitle = document.querySelector('.decode-text');
        if (heroTitle) {
            const textToDecode = lang === 'ar' ? heroTitle.dataset.textAr : heroTitle.dataset.textEn;
            decodeHeroText(textToDecode);
        }

        populateAllSections();
    }
    
    function populateAllSections() {
        populateSkills();
        populatePortfolio();
        populateContact();
        if (skillsChart) skillsChart.destroy();
        initSkillsChart();
        addGlintEffect();
    }

    function populateSkills() {
        const grid = document.querySelector('.skills-list');
        if (!grid) return;
        const t = translations[currentLang];
        let htmlContent = '';
        t.skills.forEach(skill => {
            const subSkillsHTML = skill.sub_skills.length > 0 ? `<div class="sub-skills"><strong>${t.skill_tech_label}</strong> ${skill.sub_skills.join(', ')}</div>` : '';
            htmlContent += `
                <div class="skill-item terran-card" data-skill-id="${skill.id}">
                    <div class="terran-card-glint"></div>
                    <i class="${skill.icon}"></i>
                    <div class="skill-item-content">
                        <h3>${skill.title} <span class="skill-level">(${t.skill_level_label} ${skill.level})</span></h3>
                        <p>${skill.desc}</p>
                        ${subSkillsHTML}
                    </div>
                </div>`;
        });
        grid.innerHTML = htmlContent;
    }

    function populatePortfolio() {
        const grid = document.querySelector('.portfolio-grid');
        if (!grid) return;
        const t = translations[currentLang];
        let htmlContent = '';
        t.portfolio_items.forEach(item => {
            const tagsHtml = item.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
            const altText = t[item.alt_key] || item.title;
            htmlContent += `
                <div class="portfolio-item terran-card">
                    <div class="terran-card-glint"></div>
                    <div class="portfolio-image"><img src="${item.img}" alt="${altText}"></div>
                    <div class="portfolio-content">
                        <h3>${item.title}</h3>
                        <p><strong>${t.portfolio_problem_label}</strong> ${item.problem}</p>
                        <p><strong>${t.portfolio_solution_label}</strong> ${item.solution}</p>
                        <p><strong>${t.portfolio_impact_label}</strong> ${item.impact}</p>
                        <div class="tags">${tagsHtml}</div>
                    </div>
                </div>`;
        });
        grid.innerHTML = htmlContent;
    }

    function populateContact() {
        const grid = document.querySelector('.contact-grid');
        if (!grid) return;
        const t = translations[currentLang];
        let htmlContent = '';
        t.contact_items.forEach(item => {
            htmlContent += `
                 <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="contact-item terran-card">
                    <div class="terran-card-glint"></div>
                    <i class="${item.icon}"></i>
                    <h3>${item.title}</h3>
                </a>`;
        });
        grid.innerHTML = htmlContent;
    }

    // ... Other functions (ThreeJS, DataStream, Animations) remain the same as the previous "Nexus" version ...
    
    // --- VISUAL & INTERACTIVE PROTOCOLS ---

    function initThreeJsBackground() {
        const canvas = document.getElementById('threeJsCanvas');
        if (!canvas) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const particleCount = 7000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const color = new THREE.Color();

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
            color.setHSL(0.6 + Math.random() * 0.1, 1.0, 0.5 + Math.random() * 0.2);
            colors[i*3] = color.r;
            colors[i*3+1] = color.g;
            colors[i*3+2] = color.b;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({ 
            size: 0.02, 
            vertexColors: true, 
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.8
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);
        
        let mouse = new THREE.Vector2();
        window.addEventListener('mousemove', (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        });

        const clock = new THREE.Clock();
        function animate() {
            const elapsedTime = clock.getElapsedTime();
            points.rotation.y = elapsedTime * 0.05;
            points.rotation.x = elapsedTime * 0.02;

            camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05;
            camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.05;
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

    function initDataStream() {
        const path = document.getElementById('data-stream-path');
        if (!path) return;
        const sections = ['#hero', '#about', '#skills', '#portfolio', '#contact'];
        let rafId;

        function updatePath() {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                let d = "";
                const edgeOffset = Math.max(20, window.innerWidth * 0.05);
                const midX = window.innerWidth / 2;

                sections.forEach((selector, i) => {
                    const el = document.querySelector(selector);
                    if (!el) return;
                    const rect = el.getBoundingClientRect();
                    const y = rect.top + window.scrollY + rect.height * 0.5;
                    
                    let x = (i % 2 === 0) 
                        ? (currentLang === 'ar' ? window.innerWidth - edgeOffset : edgeOffset)
                        : midX;

                    if (i === 0) {
                        d += `M ${x} ${y}`;
                    } else {
                        const prevEl = document.querySelector(sections[i - 1]);
                        const prevRect = prevEl.getBoundingClientRect();
                        const prevY = prevRect.top + window.scrollY + prevRect.height * 0.5;
                        
                        let prevX = ((i - 1) % 2 === 0)
                            ? (currentLang === 'ar' ? window.innerWidth - edgeOffset : edgeOffset)
                            : midX;

                        const cpy = prevY + (y - prevY) / 2;
                        d += ` C ${prevX} ${cpy}, ${x} ${cpy}, ${x} ${y}`;
                    }
                });
                path.setAttribute('d', d);
                const pathLength = path.getTotalLength();
                if (pathLength > 0) {
                    path.style.strokeDasharray = pathLength;
                    path.style.strokeDashoffset = pathLength;
                    ScrollTrigger.getById('dataStreamTrigger')?.kill();
                    gsap.to(path, {
                        strokeDashoffset: 0,
                        scrollTrigger: {
                            id: 'dataStreamTrigger',
                            trigger: ".content-wrapper", start: "top top", end: "bottom bottom", scrub: 1,
                        }
                    });
                }
            });
        }
        window.addEventListener('load', updatePath);
        window.addEventListener('resize', updatePath);
        langSwitcher.addEventListener('click', () => setTimeout(updatePath, 100));
    }
    
    function addGlintEffect() {
        document.querySelectorAll('.terran-card').forEach(card => {
            card.onmousemove = e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            };
        });
    }
    
    function decodeHeroText(text) {
        const heroTitle = document.querySelector('.decode-text');
        if (!heroTitle || !text) return;
        
        gsap.killTweensOf(heroTitle.querySelectorAll('span'));
        heroTitle.innerHTML = '';
        heroTitle.classList.add('animating');

        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            heroTitle.appendChild(span);
        });
        
        gsap.fromTo(heroTitle.querySelectorAll('span'), 
            { opacity: 0, y: (i) => Math.random() * 40 - 20 },
            {
                opacity: 1, y: 0, duration: 0.8, stagger: 0.03, ease: 'back.out(1.7)', delay: 0.5,
                onComplete: () => heroTitle.classList.remove('animating')
            }
        );
    }
    
    function initSkillsChart() {
        const ctx = document.getElementById('skillsRadarChart')?.getContext('2d');
        if (!ctx) return;
        const t = translations[currentLang];

        const data = {
            labels: t.skills.map(s => s.title),
            datasets: [{
                label: t.skill_level_label,
                data: t.skills.map(s => parseInt(s.level, 10)),
                backgroundColor: 'rgba(0, 174, 255, 0.3)',
                borderColor: 'var(--accent-color)',
                pointBackgroundColor: 'var(--accent-color)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'var(--accent-color)',
                borderWidth: 2,
            }]
        };

        skillsChart = new Chart(ctx, {
            type: 'radar', data,
            options: {
                responsive: true, maintainAspectRatio: true,
                animation: { duration: 2000, easing: 'easeInOutExpo' },
                plugins: { legend: { display: false } },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
                        grid: { color: 'rgba(255, 255, 255, 0.2)', circular: true },
                        pointLabels: { font: { family: "'Cairo', sans-serif", size: 13 }, color: 'var(--text-color)' },
                        ticks: { display: false, beginAtZero: true, max: 100, stepSize: 20, backdropColor: 'transparent' }
                    }
                }
            }
        });
        
        document.querySelectorAll('.skill-item').forEach((item, index) => {
            item.addEventListener('mouseover', () => {
                const skill = t.skills[index];
                document.getElementById('skill-description-box').innerHTML = `<h4>${skill.title}</h4><p>${skill.desc}</p>`;
                if (skillsChart) {
                    skillsChart.setActiveElements([{ datasetIndex: 0, index: index }]);
                    skillsChart.update();
                }
            });
            item.addEventListener('mouseout', () => {
                if (skillsChart) {
                    skillsChart.setActiveElements([]);
                    skillsChart.update();
                }
            });
        });
    }

    function initGeminiFeature() {
        const sendBtn = document.getElementById('sendMessageBtn');
        const chatContainer = document.getElementById('gemini-chat-container');
        const input = document.getElementById('projectIdeaInput');
        if (!sendBtn || !chatContainer || !input) return;

        let isTyping = false;
        
        function addMessage(text, sender, isThinking = false) {
            const bubble = document.createElement('div');
            bubble.classList.add('chat-bubble', `${sender}-bubble`);
            if(isThinking) {
                bubble.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
            } else {
                bubble.innerHTML = text.replace(/\n/g, '<br>');
            }
            chatContainer.appendChild(bubble);
            gsap.to(chatContainer, { duration: 0.5, scrollTo: { y: "max" } });
            return bubble;
        }

        function handleSend() {
            const userQuery = input.value.trim();
            if (isTyping || userQuery === "") return;

            addMessage(userQuery, 'user');
            input.value = '';
            isTyping = true;
            sendBtn.disabled = true;

            const thinkingBubble = addMessage('', 'ai', true);

            setTimeout(() => {
                thinkingBubble.remove();
                
                const t = translations[currentLang];
                let responseKey = 'gemini_mock_response_default';
                const lowerCaseQuery = userQuery.toLowerCase();
                const arabicQuery = userQuery;

                if (lowerCaseQuery.includes('how are you') || arabicQuery.includes('كيف حالك')) responseKey = 'gemini_mock_response_how_are_you';
                else if (lowerCaseQuery.includes('who are you') || arabicQuery.includes('من انت')) responseKey = 'gemini_mock_response_who_am_i';
                else if (lowerCaseQuery.includes('project') || arabicQuery.includes('مشروع') || lowerCaseQuery.includes('implement') || arabicQuery.includes('تنفيذ') || lowerCaseQuery.includes('collaborate')) responseKey = 'gemini_mock_response_project_offer';
                else if (lowerCaseQuery.includes('idea') || lowerCaseQuery.includes('concept') || arabicQuery.includes('فكرة') || arabicQuery.includes('تصور')) responseKey = 'gemini_mock_response_project_idea';
                
                addMessage(t[responseKey], 'ai');
                
                isTyping = false;
                sendBtn.disabled = false;
            }, 1500 + Math.random() * 1000);
        }
        
        chatContainer.innerHTML = '';
        addMessage(translations[currentLang].gemini_initial_ai_message, 'ai');
        
        sendBtn.onclick = handleSend;
        input.onkeydown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
            }
        };
    }

    // --- INITIALIZATION SEQUENCE ---
    
    function initNav() {
        langSwitcher.addEventListener('click', () => setLanguage(currentLang === 'ar' ? 'en' : 'ar'));
        const header = document.querySelector('.site-header');
        ScrollTrigger.create({
            start: 'top -80px',
            onUpdate: self => header.classList.toggle('scrolled', self.scroll() > 50)
        });
        
        document.querySelectorAll('.site-nav a, a.btn[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                document.querySelector('.site-nav')?.classList.remove('active');
                document.querySelector('.nav-toggle')?.classList.remove('active');
                gsap.to(window, { duration: 1, scrollTo: { y: targetId, offsetY: 80 }, ease: "power2.inOut" });
            });
        });

        gsap.utils.toArray('.content-section').forEach(section => {
            ScrollTrigger.create({
                trigger: section, start: "top center", end: "bottom center",
                onToggle: self => {
                    const link = document.querySelector(`.nav-link[href="#${section.id}"]`);
                    if (self.isActive && link) {
                        document.querySelectorAll('.nav-link.active').forEach(l => l.classList.remove('active'));
                        link.classList.add("active");
                    }
                }
            });
        });

        const navToggle = document.querySelector('.nav-toggle');
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            document.querySelector('.site-nav').classList.toggle('active');
        });
    }

    function initAnimations() {
        gsap.utils.toArray('.content-section').forEach(section => {
            gsap.from(section, {
                opacity: 0, y: 50, duration: 1,
                scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none reverse' }
            });
        });
        gsap.utils.toArray('h2.section-title').forEach(title => {
            ScrollTrigger.create({
                trigger: title, start: 'top 85%',
                onEnter: () => title.classList.add('in-view'),
                onLeaveBack: () => title.classList.remove('in-view')
            });
        });
    }

    // --- MAIN EXECUTION ---
    initNav();
    initGeminiFeature();
    setLanguage(currentLang);
    initDataStream();
    
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            gsap.to(preloader, { opacity: 0, duration: 0.8, onComplete: () => preloader.remove() });
        }
        document.body.style.overflow = 'auto';
        initThreeJsBackground();
        initAnimations();
    });
});
