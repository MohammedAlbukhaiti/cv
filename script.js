document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, MotionPathPlugin);

    // --- GLOBAL ELEMENTS & STATE ---
    const langSwitcher = document.getElementById('lang-switcher');
    let currentLang = 'ar';

    // --- I18N (INTERNATIONALIZATION) SETUP ---
    const translations = {
        en: {
            meta_title: "Mohammed Albukaiti - Engineer & Digital Innovator",
            meta_description: "Portfolio of Mohammed Albukaiti, a Surveying and Roads Engineer who merges programming and AI to deliver innovative engineering solutions.",
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
            about_image_alt: "Portrait of Mohammed Albukaiti, Engineer",
            skills_subtitle: "What I Do", skills_title: "Skills & Competencies",
            skills_chart_title: "Interactive Competency Chart",
            skills_desc_title: "Hover to Discover", skills_desc_text: "Hover over a skill in the chart or list to see details here.",
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
            contact_subtitle: "Let's Talk", contact_title: "Idea & Contact Hub",
            gemini_title: "Consult My Engineering Mind",
            gemini_desc: "This is a simulation of my digital twin. Describe your project idea, and it will provide an initial concept based on my expertise in engineering, programming, and AI.",
            gemini_send_btn: "Send",
            gemini_placeholder: "e.g., A system to predict traffic flow using AI...",
            gemini_initial_ai_message: "Hello! I am Mohammed Albukaiti's digital twin. How can I assist you with your engineering project today?",
            gemini_thinking_text: "Accessing Mohammed Albukaiti's knowledge base... Synthesizing Civil Engineering principles with Python automation... Engaging AI/ML models... Formulating response...",
            gemini_mock_response_general: {
                "hello": "Hello there! How can I help you today?",
                "how_are_you": "I'm a digital entity, so I don't have feelings, but I'm ready to assist you! How can I help with your engineering inquiries?",
                "who_are_you": "I am the digital twin of Mohammed Albukaiti, a Surveying and Roads Engineer. My purpose is to provide insights and innovative ideas combining engineering, programming, and AI.",
                "default": "That's an interesting thought! While I specialize in engineering and tech, I can try to answer general questions. What else can I assist you with?"
            },
            gemini_mock_response_project: "Excellent concept. Based on my expertise, I would approach this by:\n\n1.  **Data Acquisition (Surveying/GIS):** Using GIS data to map road networks and installing traffic-counting sensors at key nodes.\n\n2.  **Automation (Python):** Developing a Python script using Pandas and GeoPandas to clean and process real-time traffic data.\n\n3.  **Prediction (AI):** Training a TensorFlow or Scikit-learn machine learning model (like an LSTM network) to recognize traffic patterns and predict future flow based on time of day, weather, and historical data.\n\nThis integrated solution leverages my core skills to create a powerful, data-driven tool for urban planning.",
            contact_items: [
                { icon: 'fas fa-envelope-open-text', title: "Email Me", link: "mailto:m.albukaiti.eng@email.com", text: "Email Me" },
                { icon: 'fab fa-linkedin', title: "Connect on LinkedIn", link: "https://linkedin.com/in/mbukaiti", text: "Connect on LinkedIn" },
                { icon: 'fab fa-github', title: "View My Code", link: "https://github.com/mbukaiti", text: "View My Code" },
                { icon: 'fab fa-whatsapp', title: "WhatsApp Me", link: "https://wa.me/967772791169", text: "WhatsApp Me" }
            ],
            footer_copyright: "© 2024 Mohammed Albukaiti. All rights reserved."
        },
        ar: {
            meta_title: "محمد البخيتي - مهندس ومبتكر رقمي",
            meta_description: "محفظة أعمال المهندس محمد البخيتي، متخصص في هندسة المساحة والطرق، يدمج البرمجة والذكاء الاصطناعي لتقديم حلول هندسية مبتكرة.",
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
            about_image_alt: "صورة المهندس محمد البخيتي",
            skills_subtitle: "ماذا أقدم", skills_title: "المهارات والكفاءات",
            skills_chart_title: "مخطط الكفاءات التفاعلي",
            skills_desc_title: "مرّر لاكتشاف المزيد", skills_desc_text: "مرّر الفأرة فوق أي مهارة في المخطط أو القائمة لعرض تفاصيل عنها هنا.",
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
            contact_subtitle: "لنتحدث", contact_title: "محطة الأفكار والتواصل",
            gemini_title: "استشر عقلي الهندسي",
            gemini_desc: "هذه محاكاة لتوأمي الرقمي. صف فكرة مشروعك، وسيقدم لك تصورًا أوليًا بناءً على خبرتي في الهندسة والبرمجة والذكاء الاصطناعي.",
            gemini_send_btn: "إرسال",
            gemini_placeholder: "مثال: نظام للتنبؤ بالازدحام المروري باستخدام الذكاء الاصطناعي...",
            gemini_initial_ai_message: "مرحباً! أنا التوأم الرقمي للمهندس محمد البخيتي. كيف يمكنني مساعدتك في مشروعك الهندسي اليوم؟",
            gemini_thinking_text: "جاري الوصول إلى قاعدة معارف محمد البخيتي... دمج مبادئ الهندسة المدنية مع أتمتة بايثون... تفعيل نماذج الذكاء الاصطناعي... صياغة الرد...",
            gemini_mock_response_general: {
                "hello": "أهلاً بك! كيف يمكنني مساعدتك اليوم؟",
                "how_are_you": "أنا كيان رقمي، لذا لا أشعر بالمشاعر، لكنني جاهز لمساعدتك! كيف يمكنني المساعدة في استفساراتك الهندسية؟",
                "who_are_you": "أنا التوأم الرقمي للمهندس محمد البخيتي، مهندس مساحة وطرق. هدفي هو تقديم رؤى وأفكار مبتكرة تجمع بين الهندسة والبرمجة والذكاء الاصطناعي.",
                "default": "هذه فكرة مثيرة للاهتمام! بينما أتخصص في الهندسة والتقنية، يمكنني محاولة الإجابة على الأسئلة العامة. بماذا يمكنني مساعدتك أيضًا؟"
            },
            gemini_mock_response_project: "مفهوم ممتاز. بناءً على خبرتي، سأتعامل مع هذا المشروع كالتالي:\n\n1.  **جمع البيانات (مساحة/GIS):** استخدام بيانات نظم المعلومات الجغرافية لرسم خرائط شبكات الطرق وتركيب حساسات لعد المركبات في النقاط الرئيسية.\n\n2.  **الأتمتة (Python):** تطوير سكربت بايثون باستخدام مكتبات Pandas و GeoPandas لتنظيف ومعالجة بيانات حركة المرور الفورية.\n\n3.  **التنبؤ (AI):** تدريب نموذج تعلم آلة (مثل شبكة LSTM) باستخدام TensorFlow أو Scikit-learn للتعرف على أنماط حركة المرور والتنبؤ بالتدفق المستقبلي بناءً على الوقت والطقس والبيانات التاريخية.\n\nهذا الحل المتكامل يستفيد من مهاراتي الأساسية لإنشاء أداة قوية ومبنية على البيانات للتخطيط الحضري.",
            contact_items: [
                { icon: 'fas fa-envelope-open-text', title: "راسلني عبر الإيميل", link: "mailto:m.albukaiti.eng@email.com", text: "راسلني عبر الإيميل" },
                { icon: 'fab fa-linkedin', title: "تواصل على LinkedIn", link: "https://linkedin.com/in/mbukaiti", text: "تواصل على LinkedIn" },
                { icon: 'fab fa-github', title: "اطلع على أعمالي البرمجية", link: "https://github.com/mbukaiti", text: "اطلع على أعمالي البرمجية" },
                { icon: 'fab fa-whatsapp', title: "راسلني واتساب", link: "https://wa.me/967772791169", text: "راسلني واتساب" }
            ],
            footer_copyright: "© 2024 محمد البخيتي. كل الحقوق محفوظة."
        }
    };

    function setLanguage(lang) {
        currentLang = lang;
        const isRtl = lang === 'ar';
        const t = translations[lang];

        document.documentElement.lang = lang;
        document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
        langSwitcher.textContent = isRtl ? 'EN' : 'AR';
        
        // Update elements with data-lang-key
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (t[key]) {
                if (key === 'meta_description') {
                    el.setAttribute('content', t[key]);
                } else {
                    el.innerHTML = t[key];
                }
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-lang-key-placeholder]').forEach(el => {
            const key = el.getAttribute('data-lang-key-placeholder');
            if(t[key]) {
                el.placeholder = t[key];
            }
        });
        // Update alt texts for images
         document.querySelectorAll('[data-lang-key-alt]').forEach(el => {
            const key = el.getAttribute('data-lang-key-alt');
            if(t[key]) {
                el.alt = t[key];
            }
        });
        
        const heroTitle = document.querySelector('.decode-text');
        if(heroTitle) {
            heroTitle.dataset.text = isRtl ? heroTitle.dataset.textAr : heroTitle.dataset.textEn;
            decodeHeroText();
        }

        populateSkills();
        populatePortfolio();
        populateContact();
        // Re-initialize AI chat for language changes
        initGeminiFeature();
        // Update initial AI message in chat container
        const initialAiBubble = document.querySelector('.chat-bubble.ai-bubble[data-lang-key-initial-ai-message]');
        if (initialAiBubble) {
            initialAiBubble.textContent = t.gemini_initial_ai_message;
        }

        if (skillsChart) { skillsChart.destroy(); }
        initSkillsChart();
    }

    langSwitcher.addEventListener('click', () => {
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        setLanguage(newLang);
    });

    // --- DYNAMIC CONTENT POPULATION ---
    
    function populateSkills() {
        const grid = document.querySelector('.skills-list');
        if (!grid) return;
        grid.innerHTML = '';
        const t = translations[currentLang];
        
        t.skills.forEach(skill => {
            let subSkillsHTML = '';
            if (skill.sub_skills && skill.sub_skills.length > 0) {
                subSkillsHTML = `<div class="sub-skills"><strong>${t.skill_tech_label}</strong> ${skill.sub_skills.join(', ')}</div>`;
            }

            grid.innerHTML += `
                <div class="skill-item terran-card" data-skill-id="${skill.id}">
                    <i class="${skill.icon}"></i>
                    <div class="skill-item-content">
                        <h3>${skill.title} <span class="skill-level">(${t.skill_level_label} ${skill.level})</span></h3>
                        <p>${skill.desc}</p>
                        ${subSkillsHTML}
                    </div>
                </div>
            `;
        });
    }

    function populatePortfolio() {
        const grid = document.querySelector('.portfolio-grid');
        if (!grid) return;
        grid.innerHTML = '';
        const t = translations[currentLang];

        t.portfolio_items.forEach(item => {
            const tagsHtml = item.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
            const altText = item.alt_key && t[item.alt_key] ? t[item.alt_key] : item.title;
            grid.innerHTML += `
                <div class="portfolio-item terran-card">
                    <div class="portfolio-image"><img src="${item.img}" alt="${altText}"></div>
                    <h3>${item.title}</h3>
                    <p><strong>${t.portfolio_problem_label}</strong> ${item.problem}</p>
                    <p><strong>${t.portfolio_solution_label}</strong> ${item.solution}</p>
                    <p><strong>${t.portfolio_impact_label}</strong> ${item.impact}</p>
                    <div class="tags">${tagsHtml}</div>
                </div>
            `;
        });
    }

    // --- IMPROVED ---
    // Makes the entire contact card a clickable link and hides direct link text.
    function populateContact() {
        const grid = document.querySelector('#contact .contact-grid');
        if (!grid) return;
        grid.innerHTML = '';
        translations[currentLang].contact_items.forEach(item => {
            // Check if it's WhatsApp and construct URL correctly if not already done
            let linkHref = item.link;
            if (item.icon.includes('whatsapp') && !item.link.startsWith('https://wa.me/')) {
                linkHref = `https://wa.me/${item.link.replace(/\D/g, '')}`; // Clean phone number
            }

            grid.innerHTML += `
                <div class="contact-item">
                    <a href="${linkHref}" target="_blank" rel="noopener noreferrer">
                        <i class="${item.icon}"></i>
                        <h3>${item.title}</h3>
                        <p>${item.text}</p>
                    </a>
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
            heroTitle.classList.add('animating'); // Add class for animation control in CSS

            text.split('').forEach(char => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces
                heroTitle.appendChild(span);
            });
            
            const animationVars = {
                opacity: 1,
                duration: 0.05,
                stagger: 0.04,
                ease: 'power2.out',
                delay: 0.5,
                onComplete: () => {
                    heroTitle.classList.remove('animating'); // Remove class after animation
                }
            };
            
            // Only apply vertical animation for LTR, to avoid breaking Arabic letter connection
            if (currentLang === 'en') {
                animationVars.y = 0;
                gsap.set(heroTitle.querySelectorAll('span'), { y: -20 });
            }

            gsap.to(heroTitle.querySelectorAll('span'), animationVars);
        }
    }

    // --- PRELOADER & SCROLL-TRIGGERED ANIMATIONS ---
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.addEventListener('transitionend', () => preloader.remove());
        }
        document.body.style.overflow = 'auto';
        
        // Animate general sections on scroll
        gsap.utils.toArray('.content-section').forEach(section => {
            gsap.from(section, {
                opacity: 0, y: 50, duration: 1,
                scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none reverse' }
            });
        });

        // Animate section title underlines on scroll
        gsap.utils.toArray('h2.section-title').forEach(title => {
            ScrollTrigger.create({
                trigger: title,
                start: 'top 85%', // When the top of the title hits 85% of viewport
                onEnter: () => title.classList.add('in-view'), // Add class to trigger CSS animation
                onLeaveBack: () => title.classList.remove('in-view') // Remove class if scrolling back up
            });
        });
    });
    
    // --- NAVIGATION --- Logic is sound, no changes needed
    const header = document.querySelector('.site-header');
    ScrollTrigger.create({
        start: 'top -80px',
        onUpdate: self => {
            header.classList.toggle('scrolled', self.scroll() > 50)
        }
    });

    document.querySelectorAll('.site-nav a, a.btn[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const nav = document.querySelector('.site-nav');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                document.querySelector('.nav-toggle').classList.remove('active');
            }
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
    const siteNav = document.querySelector('.site-nav');
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        siteNav.classList.toggle('active');
    });

    // --- 3D BACKGROUND --- No changes needed
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
    // IMPROVED: Makes the path follow the edge of the content area more accurately for both LTR and RTL.
    function initDataStream() {
        const path = document.getElementById('data-stream-path');
        if (!path) return;
        const points = ['#hero', '#about', '#skills', '#portfolio', '#contact'];
        let rafId;

        function updatePath() {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                let d = "";
                // Calculate padding based on container width and max-width for consistent edge following
                const container = document.querySelector('.container');
                const containerWidth = container ? container.offsetWidth : window.innerWidth * 0.9; // Fallback
                const maxWidth = 1200;
                const effectiveWidth = Math.min(containerWidth, maxWidth);
                const viewportPadding = (window.innerWidth - effectiveWidth) / 2; // Space on either side of the container
                
                // Target the scrollable content wrapper
                const contentWrapperRect = document.querySelector('.content-wrapper').getBoundingClientRect();

                points.forEach((point, i) => {
                    const sectionEl = document.querySelector(point);
                    if (!sectionEl) return;

                    // Use element's position relative to the document
                    const sectionRect = sectionEl.getBoundingClientRect();
                    
                    // Calculate x based on viewport padding and section width
                    let x;
                    if (currentLang === 'ar') {
                        x = sectionRect.right + window.scrollX - viewportPadding - (sectionRect.width - effectiveWidth) / 2;
                    } else {
                        x = sectionRect.left + window.scrollX + viewportPadding + (sectionRect.width - effectiveWidth) / 2;
                    }
                    
                    const y = sectionRect.top + window.scrollY + sectionRect.height * 0.5; // Center of section vertically

                    if (i === 0) {
                        d += `M ${x} ${y}`;
                    } else {
                        const prevSectionEl = document.querySelector(points[i-1]);
                        const prevSectionRect = prevSectionEl.getBoundingClientRect();
                        
                        let prevX;
                        if (currentLang === 'ar') {
                             prevX = prevSectionRect.right + window.scrollX - viewportPadding - (prevSectionRect.width - effectiveWidth) / 2;
                        } else {
                            prevX = prevSectionRect.left + window.scrollX + viewportPadding + (prevSectionRect.width - effectiveWidth) / 2;
                        }
                        
                        const prevY = prevSectionRect.top + window.scrollY + prevSectionRect.height * 0.5;

                        // Use a bezier curve to create a smoother, more 'flowy' path
                        const controlX1 = prevX;
                        const controlY1 = prevY + (y - prevY) * 0.3; // Control point closer to prevY

                        const controlX2 = x;
                        const controlY2 = prevY + (y - prevY) * 0.7; // Control point closer to y

                        d += ` C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${x} ${y}`;
                    }
                });

                path.setAttribute('d', d);
                const pathLength = path.getTotalLength();
                if (pathLength > 0) {
                    path.style.strokeDasharray = pathLength;
                    path.style.strokeDashoffset = pathLength;
                    
                    // Kill previous ScrollTrigger instance if it exists to prevent duplicates
                    ScrollTrigger.getById('dataStreamTrigger')?.kill(); 
                    gsap.to(path, {
                        strokeDashoffset: 0,
                        scrollTrigger: {
                            id: 'dataStreamTrigger', // Give it an ID to kill it later
                            trigger: ".content-wrapper", 
                            start: "top top", 
                            end: "bottom bottom", 
                            scrub: 1, // Smoothly animate on scroll
                        }
                    });
                }
            });
        }
        window.addEventListener('load', updatePath);
        window.addEventListener('resize', updatePath);
        // Recalculate path on language change as content alignment might shift
        langSwitcher.addEventListener('click', () => setTimeout(updatePath, 100));
    }


    // --- SKILLS CHART --- No changes needed
    let skillsChart;
    function initSkillsChart() {
        const ctx = document.getElementById('skillsRadarChart')?.getContext('2d');
        const descBox = document.getElementById('skill-description-box');
        if (!ctx || !descBox) return;
        const t = translations[currentLang];

        const data = {
            labels: t.skills.map(s => s.title),
            datasets: [{
                label: t.skill_level_label,
                data: t.skills.map(s => parseInt(s.level, 10)),
                backgroundColor: 'rgba(0, 174, 255, 0.2)',
                borderColor: 'var(--primary-color)',
                pointBackgroundColor: 'var(--primary-color)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'var(--primary-color)'
            }]
        };

        skillsChart = new Chart(ctx, {
            type: 'radar', data: data,
            options: {
                responsive: true, maintainAspectRatio: true,
                plugins: { legend: { display: false } },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
                        grid: { color: 'rgba(255, 255, 255, 0.2)' },
                        pointLabels: { font: { family: "'Cairo', sans-serif", size: 13 }, color: 'var(--text-color)' },
                        ticks: { display: false, beginAtZero: true, max: 100, stepSize: 20 }
                    }
                }
            }
        });
        
        document.querySelectorAll('.skill-item').forEach((item, index) => {
            item.addEventListener('mouseover', () => {
                const skill = t.skills[index];
                descBox.innerHTML = `<h4>${skill.title}</h4><p>${skill.desc}</p>`;
            });
            // Reset description when mouse leaves
            item.addEventListener('mouseleave', () => {
                descBox.innerHTML = `<h4>${t.skills_desc_title}</h4><p>${t.skills_desc_text}</p>`;
            });
        });
    }

    // --- GEMINI AI (SIMULATION) ---
    // --- MASSIVELY IMPROVED: Personalization, natural interaction, chat bubbles, no markdown.
    function initGeminiFeature() {
        const sendMessageBtn = document.getElementById('sendMessageBtn');
        const chatContainer = document.getElementById('gemini-chat-container');
        const inputField = document.getElementById('projectIdeaInput');

        if (!sendMessageBtn || !chatContainer || !inputField) return;

        let isTyping = false;

        // Clear previous chat content and add initial AI message
        chatContainer.innerHTML = '';
        const initialAiMessage = translations[currentLang].gemini_initial_ai_message;
        appendMessage(initialAiMessage, 'ai-bubble');

        function appendMessage(text, type) {
            const bubble = document.createElement('div');
            bubble.classList.add('chat-bubble', type);
            // Replace markdown bolding (**text**) with just text
            text = text.replace(/\*\*(.*?)\*\*/g, '$1');
            // Replace newlines with <br> for HTML display
            bubble.innerHTML = text.replace(/\n/g, '<br/>');
            chatContainer.appendChild(bubble);
            // Scroll to the latest message
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        function typeWriterEffect(text, targetElement, i = 0, callback) {
            isTyping = true;
            if (i < text.length) {
                let char = text.charAt(i);
                if (char === '\n') { // Handle newlines
                    targetElement.innerHTML += '<br/>';
                } else {
                    targetElement.innerHTML += char;
                }
                setTimeout(() => typeWriterEffect(text, targetElement, i + 1, callback), 15); // Faster typing
            } else {
                isTyping = false;
                if (callback) callback();
            }
        }

        // Mock AI Response Logic - Highly personalized
        function getMockAiResponse(userInput) {
            const t = translations[currentLang];
            const lowerInput = userInput.toLowerCase().trim();

            if (lowerInput.includes(t.gemini_mock_response_general.hello.toLowerCase().substring(0,5)) || lowerInput.includes("hi") || lowerInput.includes("مرحبا")) {
                return t.gemini_mock_response_general.hello;
            } else if (lowerInput.includes(t.gemini_mock_response_general.how_are_you.toLowerCase().substring(0,5)) || lowerInput.includes("كيف حالك")) {
                return t.gemini_mock_response_general.how_are_you;
            } else if (lowerInput.includes(t.gemini_mock_response_general.who_are_you.toLowerCase().substring(0,5)) || lowerInput.includes("من انت")) {
                return t.gemini_mock_response_general.who_are_you;
            } else if (
                lowerInput.includes("مشروع") || lowerInput.includes("project") ||
                lowerInput.includes("تصميم") || lowerInput.includes("design") ||
                lowerInput.includes("هندسة") || lowerInput.includes("engineering") ||
                lowerInput.includes("ذكاء اصطناعي") || lowerInput.includes("ai") ||
                lowerInput.includes("برمجة") || lowerInput.includes("programming") ||
                lowerInput.includes("نظام") || lowerInput.includes("system")
            ) {
                return t.gemini_mock_response_project;
            } else {
                return t.gemini_mock_response_general.default;
            }
        }

        sendMessageBtn.addEventListener('click', async () => {
            if (isTyping) return;
            const userInput = inputField.value.trim();
            if (userInput === "") return;

            // Display user message
            appendMessage(userInput, 'user-bubble');
            inputField.value = ''; // Clear input

            // Show thinking message and simulate typing
            const thinkingBubble = document.createElement('div');
            thinkingBubble.classList.add('chat-bubble', 'ai-bubble');
            chatContainer.appendChild(thinkingBubble);
            chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to new thinking bubble

            sendMessageBtn.disabled = true;
            sendMessageBtn.style.opacity = 0.5; // Indicate busy state

            await new Promise(resolve => {
                typeWriterEffect(translations[currentLang].gemini_thinking_text, thinkingBubble, 0, resolve);
            });

            // Simulate AI response after thinking
            setTimeout(() => {
                const aiResponse = getMockAiResponse(userInput);
                // Replace thinking bubble content with actual response via typing effect
                thinkingBubble.innerHTML = ''; // Clear thinking text
                typeWriterEffect(aiResponse, thinkingBubble, 0, () => {
                    sendMessageBtn.disabled = false;
                    sendMessageBtn.style.opacity = 1;
                });
            }, 1000); // Short delay before actual response starts typing
        });

        // Allow sending message with Enter key
        inputField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessageBtn.click();
            }
        });
    }

    // --- INITIALIZE ALL ---
    setLanguage(currentLang); // Initial call with 'ar'
    initThreeJsBackground();
    initDataStream();
    initGeminiFeature();
});
