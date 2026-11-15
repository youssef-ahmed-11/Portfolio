/* Bilingual layer + strategy/content/script showcase. Keeps the original portfolio engine and content intact. */
(() => {
  // content.js declares SITE as a top-level const (not window.SITE).
  // Read that lexical global so translations can be built from the real portfolio content.
  const S = (typeof SITE !== "undefined" ? SITE : window.SITE) || {};
  // Language buttons are bound directly when each switcher is created below.
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const dict = {
    "About":"نبذة عني","Clients":"العملاء","Work":"الأعمال","Strategy":"الاستراتيجية","Direction":"التوجيه الإبداعي","Photo":"التصوير","Moodboard":"لوحة الإلهام","Hire me":"تواصل معي","Contact":"التواصل",
    "THE LOGLINE":"الحكاية","ABOUT":"نبذة عني","FEATURED PROJECT":"مشروع مختار","NOW SHOWING":"نعرض الآن","A featured reel to start with.":"فيديو مختار من أعمالي.","A placeholder for your showreel or strongest piece.":"مساحة لعرض أقوى أعمالي.",
    "BRANDS I’VE WORKED WITH":"علامات تجارية عملت معها","OUR CLIENTS":"عملائي","Selected brands behind the work.":"مجموعة من العلامات التجارية التي عملت معها.",
    "VIDEO &amp; COMMERCIAL WORK":"الفيديوهات والإعلانات","VIDEO & COMMERCIAL WORK":"الفيديوهات والإعلانات","Reels and commercial projects, tap to play.":"ريلز ومشروعات إعلانية — اضغط للمشاهدة.",
    "STRATEGY &amp; CAMPAIGNS":"الاستراتيجيات والحملات","STRATEGY & CAMPAIGNS":"الاستراتيجيات والحملات","How the ideas are planned, researched and run.":"من البحث والتخطيط لحد تنفيذ الأفكار.",
    "CREATIVE DIRECTION":"التوجيه الإبداعي","Moodboards, references and visual concepts.":"لوحات إلهام ومراجع وأفكار بصرية.",
    "PHOTOGRAPHY &amp; BEHIND THE SCENES":"التصوير وكواليس العمل","PHOTOGRAPHY & BEHIND THE SCENES":"التصوير وكواليس العمل","Stills and set moments, grouped by shoot. Open a folder to see its photos.":"صور وكواليس جلسات التصوير — افتح كل مجموعة لمشاهدة الصور.",
    "The references behind my work: images, color, light, texture and composition.":"المراجع البصرية وراء شغلي: صور وألوان وإضاءة وتفاصيل وتكوين.",
    "CLOSING CREDITS":"النهاية","LET’S MAKE\nSOMETHING.":"خلّينا نعمل\nحاجة مختلفة.","Start a project on WhatsApp":"ابدأ مشروع على واتساب","Watch featured work":"شاهد أعمال مختارة","Download CV":"تحميل السيرة الذاتية","Preview CV":"معاينة السيرة الذاتية",
    "Written, shot & strategized by":"كتابة وتصوير وتخطيط","Based in":"الموقع","Industries":"المجالات","Open to":"متاح لـ","Challenge":"التحدي","Idea":"الفكرة","Execution":"التنفيذ","Results":"النتائج","Email":"البريد الإلكتروني","WhatsApp":"واتساب","LinkedIn":"لينكد إن","Instagram":"إنستجرام",
    "View Strategy PDF ↗":"عرض ملف الاستراتيجية ↗","View Content Plan PDF ↗":"عرض خطة المحتوى ↗","View Script ↗":"عرض السكريبت ↗","View Execution ↗":"مشاهدة التنفيذ ↗",
    "Plan":"خطة",
    "Video":"فيديو",
    "Script":"سكريبت",
    "Content Plan":"خطة المحتوى",
    "Open Strategy PDF ↗":"عرض ملف الاستراتيجية ↗",
    "Open Content Plan PDF ↗":"عرض خطة المحتوى ↗",
    "Open Script ↗":"عرض السكريبت ↗",
    "Open Video ↗":"مشاهدة الفيديو ↗",
    "View Video ↗":"مشاهدة الفيديو ↗",
    "Download":"تحميل",
    "View":"عرض",
    "Open":"فتح"
  };
  const contentAr = new Map([
    [S.location || "Cairo, Egypt", "القاهرة، مصر"],
    [S.openTo || "", "متاح لفرص العمل بدوام كامل في الوكالات الإبداعية والمشروعات المستقلة"],
    ["Content Creator", "صانع محتوى"],
    ["Social Media Specialist", "أخصائي سوشيال ميديا"],
    ["Script Writer", "كاتب سكريبت"],
    ["Full-time roles at creative agencies · Freelance projects", "وظائف بدوام كامل في الوكالات الإبداعية · ومشروعات عمل حر"],
    ["Food & Beverage — Bakeries, Restaurants, Cafés, Desserts & Catering", "الأغذية والمشروبات — مخابز ومطاعم وكافيهات وحلويات وخدمات ضيافة"],
    ["Retail & E-commerce", "التجزئة والتجارة الإلكترونية"],
    ["Furniture & Home Interiors", "الأثاث والديكور الداخلي"],
    ["Automotive — Car Care & Protection", "السيارات — العناية بالسيارات والحماية"],
    ["Marine & Watersports — Boats & Watercraft", "الأنشطة البحرية والرياضات المائية — القوارب والمركبات المائية"],
    ["Education — Academies & Educational Services", "التعليم — الأكاديميات والخدمات التعليمية"],
    ["Real Estate & Property Rental", "العقارات وتأجير الوحدات"],
    ["Marketing Technology & SaaS — CRM, Marketing Automation & Business Solutions", "تكنولوجيا التسويق والبرمجيات — إدارة علاقات العملاء وأتمتة التسويق وحلول الأعمال"],
    ["Lifestyle & Consumer Brands", "أسلوب الحياة والعلامات التجارية الاستهلاكية"],
    ["Content Calendars", "خطط المحتوى الشهرية"],
    ["Scriptwriting", "كتابة السكريبتات"],
    ["Copywriting", "كتابة المحتوى التسويقي"],
    ["Content Strategy", "استراتيجية المحتوى"],
    ["Competitor Research", "تحليل المنافسين"],
    ["SWOT Analysis", "تحليل SWOT"],
    ["Creative Concepts", "الأفكار الإبداعية"],
    ["Photoshoot References", "مراجع جلسات التصوير"],
    ["Mobile Video Production", "تصوير الفيديو بالموبايل"],
    ["Photography", "التصوير الفوتوغرافي"],
    ["Palmé Bakery · Croissant Reel", "بالمية · ريل الكرواسون"],
    ["Food & Beverage", "الأغذية والمشروبات"],
    ["Concept, Shot Planning, Mobile Videography, Editing", "الفكرة، وتخطيط اللقطات، والتصوير بالموبايل، والمونتاج"],
    ["Nut Roasters", "محمصة مكسرات"],
    ["Pumpkin seeds", "بذور اليقطين"],
    ["Concept, Shot Planning, Mobile Videography", "الفكرة، وتخطيط اللقطات، والتصوير بالموبايل"],
    ["Mawlid Branch Coverage", "تغطية فرع المولد"],
    ["Old Cairo", "القاهرة القديمة"],
    ["Architectural Photography", "تصوير معماري"],
    ["A cinematic croissant-making reel for Palmé, focusing on the craftsmanship and details behind the baking process. Pink lighting was incorporated into the visual setup to reflect the brand’s identity and create a distinctive visual atmosphere, blending product-focused close-ups with a dark, cinematic aesthetic.", "ريل سينمائي لرحلة إعداد الكرواسون في Palmé، يركز على الحرفية والتفاصيل الدقيقة في مراحل الخَبز. استخدمت الإضاءة الوردية لتعكس هوية العلامة التجارية وتخلق أجواء بصرية مميزة، مع لقطات قريبة للمنتج وطابع سينمائي داكن."],
    ["Pumpkin seeds making step by step", "مراحل تحضير بذور اليقطين خطوة بخطوة."],
    ["A visual coverage of Palmé’s branch during Mawlid celebrations, highlighting the seasonal packaging, festive decorations, and overall branch atmosphere to capture the spirit of the occasion and the brand experience.", "تغطية بصرية لفرع Palmé خلال احتفالات المولد، مع إبراز عبوات الموسم والزينة والأجواء داخل الفرع، لنقل روح المناسبة وتجربة العلامة التجارية."],
    ["A cinematic reel exploring the details and visual charm of Old Cairo, highlighting its architecture, textures, and cultural character through carefully crafted shots and visual storytelling.", "ريل سينمائي يستكشف تفاصيل وسحر القاهرة القديمة، ويبرز عمارتها وخاماتها وطابعها الثقافي من خلال لقطات مدروسة وسرد بصري."],
    ["A visually driven product reel showcasing the preparation of Palmé’s Raffaello Cake. The video focuses on the details, textures, and ingredients that bring the product to life, using close-up shots and a visual storytelling approach to capture attention and highlight the product’s appeal.", "ريل بصري يستعرض تحضير تورتة رافايلو من Palmé. يركز الفيديو على التفاصيل والقوام والمكونات التي تمنح المنتج تميزه، من خلال لقطات قريبة وسرد بصري يلفت الانتباه ويبرز جاذبية المنتج."],
    ["Written, shot & strategized by", "كتابة وتصوير وتخطيط إبداعي"],
    ["Watch featured work", "شاهد العمل المميز"],
    ["Reels and commercial projects, tap to play.", "ريلز ومشروعات إعلانية — اضغط للمشاهدة."],
    ["How the ideas are planned, researched and run.", "كيف نبحث عن الأفكار ونخطط لها وننفذها."],
    ["Moodboards, references and visual concepts.", "لوحات إلهام ومراجع ومفاهيم بصرية."],
    ["Stills and set moments, grouped by shoot. Open a folder to see its photos.", "صور ثابتة ولقطات من كواليس التصوير، مرتبة حسب كل جلسة. افتح المجموعة لمشاهدة الصور."],
    ["The references behind my work: images, color, light, texture and composition.", "المراجع البصرية وراء أعمالي: الصور والألوان والإضاءة والخامات والتكوين."],
    ["Selected brands behind the work.", "مجموعة من العلامات التجارية التي عملت معها."],
    ["Open strategy", "عرض الاستراتيجية"],
    ["Open content plan", "عرض خطة المحتوى"],
    ["Read script", "قراءة السكريبت"],
    ["Watch video", "مشاهدة الفيديو"],
    ["View project ↓", "عرض المشروع ↓"],
    ["Visit site ↗", "زيارة الموقع ↗"],
    ["last quarter", "الربع الأخير"],
    ["7wadet el mwild", "حواديت المولد"],
    ["July content plan", "خطة محتوى يوليو"],
    ["Open content plan", "فتح خطة المحتوى"],
    ["ramadan", "رمضان"],
    ["grammar", "قواعد اللغة"],
    ["courses", "الكورسات"],
    ["color reference", "مرجع الألوان"],
    ["croissant shoot", "جلسة تصوير الكرواسون"],
    ["pink vibes", "الأجواء الوردية"],
    ["fruit Danish", "دانش بالفواكه"],
    ["7ba kamla", "حبة كاملة"],
    ["cookies 7ba kamla", "كوكيز الحبة الكاملة"],
    ["mnen 7ba kamla", "مناقيش الحبة الكاملة"],
    ["The Mosque-Madrasa of Sultan Hasan", "مجمع السلطان حسن"],
    ["Passage to Light", "ممر إلى النور"],
    ["Play of Natural Light", "تلاعب الضوء الطبيعي"],
    ["Spiritual Serenity", "سكينة وروحانية"],
    ["Framed Heritage", "تراث داخل إطار"],
    ["Citadel Horizons", "آفاق القلعة"],
    ["Echoes of Shadows", "أصداء الظلال"],
    ["Ya 7alawet el shar2y", "يا حلاوة الشرقي"],
    ["Ya 7alawet el shar2y", "يا حلاوة الشرقي"],
    ["About Me", "نبذة عني"],
    ["About me", "نبذة عني"],
    ["LinkedIn", "لينكد إن"],
    ["WhatsApp", "واتساب"],
    ["Palmé Bakery", "مخبوزات Palmé"],
    ["Palmé Bakery · Croissant Reel", "Palmé · ريل الكرواسون"],
    ["Pumpkin seeds", "بذور اليقطين"],
    ["Nut Roasters", "محمصة المكسرات"],
    ["Architectural Photography", "التصوير المعماري"],
    ["Concept, Shot Planning, Mobile Videography, Editing", "الفكرة، وتخطيط اللقطات، والتصوير بالموبايل، والمونتاج"],
    ["Concept, Shot Planning, Mobile Videography", "الفكرة، وتخطيط اللقطات، والتصوير بالموبايل"],
    ["Mawlid Branch Coverage", "تغطية فرع المولد"],
    ["Raffaello Cake", "تورتة رافايلو"],
    ["Full-time roles at creative agencies · Freelance projects", "فرص عمل بدوام كامل في وكالات إبداعية، إلى جانب مشروعات العمل الحر"],
    ["Reel Creator", "صانع ريلز"],
    ["Your showreel or strongest project goes here.", "هنا يظهر الفيديو التعريفي أو أقوى مشروعاتي."],
    ["Your showreel or strongest piece goes here.", "هنا يظهر الفيديو التعريفي أو أقوى أعمالي."],
    ["CV coming soon", "السيرة الذاتية قريبًا"],
    ["PORTRAIT PLACEHOLDER", "مساحة مخصصة للصورة الشخصية"],
    ["Add a professional photo", "أضف صورة شخصية احترافية"],
    ["VIDEO PLACEHOLDER", "مساحة مخصصة للفيديو"],
    ["Add a YouTube link", "أضف رابط فيديو يوتيوب"],
    ["FEATURED REEL", "الريل المميز"],
    ["FEATURED PLACEHOLDER", "مساحة مخصصة للعمل المميز"],
    ["Title", "العنوان"],
    ["Category", "التصنيف"],
    ["Year", "السنة"],
    ["Your role", "دوري في المشروع"],
    ["One or two sentences on the idea", "اكتب جملة أو جملتين عن الفكرة"],
    ["CASE STUDY", "دراسة حالة"],
    ["Brand & campaign name", "اسم العلامة التجارية والحملة"],
    ["To be added", "سيُضاف لاحقًا"],
    ["Only real, verified results", "أضف نتائج حقيقية وموثقة فقط"],
    ["Color palette", "لوحة الألوان"],
    ["COLOR PALETTE", "لوحة الألوان"],
    ["Add hex colors in the editor", "أضف أكواد الألوان من المحرر"],
    ["Sampled from the color reference", "ألوان مستوحاة من المرجع البصري"],
    ["NOTE", "ملاحظة"],
    ["Add a lighting, composition or idea note", "أضف ملاحظة عن الإضاءة أو التكوين أو الفكرة"],
    ["Image placeholder", "مساحة مخصصة للصورة"],
    ["SHOOT", "جلسة تصوير"],
    ["Shoot name", "اسم جلسة التصوير"],
    ["photo", "صورة"],
    ["photos", "صور"],
    ["View project ↓", "عرض المشروع ↓"],
    ["Visit site ↗", "زيارة الموقع ↗"],
    ["Open link", "فتح الرابط"],
    ["Download", "تحميل"],
    ["Close", "إغلاق"],
    ["Open in new tab", "فتح في علامة تبويب جديدة"],
    ["CV preview", "معاينة السيرة الذاتية"],
    ["Client", "العميل"],
    ["Video", "فيديو"],
    ["Strategy", "استراتيجية"],
    ["Content Plan", "خطة محتوى"],
    ["Script", "سكريبت"],
    ["Execution", "التنفيذ"],
    ["PDF", "ملف PDF"],
    ["Open strategy", "عرض الاستراتيجية"],
    ["Open content plan", "عرض خطة المحتوى"],
    ["Read script", "قراءة السكريبت"],
    ["Watch video", "مشاهدة الفيديو"],
    ["Color", "اللون"],
    ["Reference", "مرجع بصري"],
    ["Inspiration", "مصدر إلهام"],
    ["Lighting", "الإضاءة"],
    ["Composition", "التكوين"],
    ["Texture", "الخامة"],
    ["mango", "مانجو"],
    ["Ya 7alawet el shar2y ", "يا حلاوة الشرقي"],
    ["3’waysh ", "قراميش"],
    ["color reference", "مرجع الألوان"],
    ["croissant shoot", "جلسة تصوير الكرواسون"],
    ["pink vibes", "الأجواء الوردية"],
    ["fruit Danish", "دانش بالفواكه"],
    ["7ba kamla", "حبة كاملة"],
    ["cookies 7ba kamla", "كوكيز الحبة الكاملة"],
    ["mnen 7ba kamla", "مناقيش الحبة الكاملة"],
    ["The Mosque-Madrasa of Sultan Hasan", "مجمع السلطان حسن"],
    ["Passage to Light", "ممر إلى الضوء"],
    ["Play of Natural Light", "تلاعب الضوء الطبيعي"],
    ["Spiritual Serenity", "سكينة روحانية"],
    ["Framed Heritage", "تراث داخل إطار"],
    ["Citadel Horizons", "آفاق القلعة"],
    ["Echoes of Shadows", "أصداء الظلال"],
    ["details", "تفاصيل"],
    ["3’waysh", "قراميش"],
    ["Brand Positioning: Establish Palmé in the market as a primary creator and manufacturer of Mawlid sweets—rather than just a reseller—competing in a heavily saturated market dominated by legacy brands.\n\nEmotional Connection: Transform Mawlid sweets from a seasonal food product into an authentic cultural and emotional experience.", "تموضع العلامة التجارية: ترسيخ مكانة Palmé في السوق باعتبارها علامة تصنع حلوى المولد بنفسها، وليس مجرد بائع لها، وسط سوق مزدحم تهيمن عليه علامات تجارية عريقة.\n\nالارتباط العاطفي: تحويل حلوى المولد من منتج موسمي إلى تجربة ثقافية وإنسانية أصيلة."],
    ["Consumer Insight: For Egyptians, Mawlid is not merely about buying sweets; it is rooted in childhood memories, street carnivals, paper dolls, wooden horses, and family gatherings.\n\nBig Idea: \\"Behind every piece of Mawlid candy... is a story.\\"\n\nCampaign Slogan: \\"Hawadeet El-Mawlid\\" \n\nVisual Identity: Green theme inspired by the Prophet’s Mosque dome, representing peace, tranquility, and heritage.", "رؤية الجمهور: المولد عند المصريين مش مجرد شراء حلوى؛ لكنه مرتبط بذكريات الطفولة، ومظاهر الاحتفال في الشوارع، وعروسة المولد، والحصان الخشبي، واللمة العائلية.\n\nالفكرة الرئيسية: وراء كل قطعة حلوى مولد حكاية.\n\nشعار الحملة: حواديت المولد.\n\nالهوية البصرية: اعتماد اللون الأخضر المستوحى من قبة المسجد النبوي، للتعبير عن السلام والسكينة والتراث."],
    ["A. Marketing & Sales Channels\n\nDirect-to-Consumer (B2C):\n\nProduced sales-driven Reels and lifestyle videos highlighting packaging design and sweet varieties.\n\nExecuted high-end product photoshoots highlighting quality and craftsmanship.\n\nCorporate Sales (B2B):\n\nTargeted corporate HR departments and business owners with premium corporate gifting packages.\n\nRetargeted past customer databases (from previous Ramadan and seasonal campaigns) alongside capturing new qualified leads.\nB. Content Strategy\n\nA 5-episode storytelling series featuring a traditional storyteller (\\"Hakawati\\"):\n\nEpisode 1: History of Mawlid Sweets – Originating from the Fatimid era to present day.\n\nEpisode 2: The Bride & Horse – Cultural symbolism of traditional figures.\n\nEpisode 3: Puppet Theater & Aragouz – Folkloric storytelling methods.\n\nEpisode 4: Old Egyptian Mawlid Streets – Nostalgic memories of street carnivals and swings.\n\nEpisode 5: Evolution of the Mawlid Box – From packaging to a cherished gift.\nC. Packaging & Product Design\n\nStandard Lineup: Folkloric artwork depicting nostalgic elements (Aragouz puppet, Tanoura dancer, Mawlid Bride, Horse, Carnival Cannon, Shooting Booth, Swings).\n\nPremium Lineup: High-end pop-up display boxes and custom-shaped tin boxes (Bride & Horse shapes) designed for luxury corporate and family gifting.\nD. Event & Activation\n\nHosted a Mawlid festival experience incorporating Tanoura performances, puppet shows, and traditional carnival games to strengthen brand engagement.", "أ. قنوات التسويق والمبيعات\n\nالبيع المباشر للمستهلك (B2C):\n\nإنتاج ريلز وفيديوهات لايف ستايل بهدف دعم المبيعات، مع إبراز تصميم العبوات وتنوع حلوى المولد.\n\nتنفيذ جلسات تصوير احترافية للمنتجات لإظهار الجودة والحرفية في التصنيع.\n\nمبيعات الشركات (B2B):\n\nاستهداف إدارات الموارد البشرية وأصحاب الشركات بعروض هدايا مؤسسية مميزة.\n\nإعادة استهداف قواعد بيانات العملاء السابقين من حملات رمضان والمواسم السابقة، بالتوازي مع جذب عملاء محتملين جدد.\nب. استراتيجية المحتوى\n\nسلسلة حكايات من 5 حلقات يقدمها حكواتي تقليدي: \n\nالحلقة 1: تاريخ حلوى المولد من العصر الفاطمي حتى اليوم.\n\nالحلقة 2: العروسة والحصان ودلالاتهما في التراث الشعبي.\n\nالحلقة 3: مسرح العرائس والأراجوز وأساليب الحكي الشعبي.\n\nالحلقة 4: شوارع المولد المصرية وذكريات المراجيح والاحتفالات.\n\nالحلقة 5: تطور علبة المولد من مجرد عبوة إلى هدية مميزة.\nج. تصميم العبوات والمنتجات\n\nالتشكيلة الأساسية: تصميمات مستوحاة من عناصر المولد التراثية، مثل الأراجوز والتنورة وعروسة المولد والحصان والمدفع ومراجيح العيد.\n\nالتشكيلة المميزة: علب عرض فاخرة بتصميمات Pop-up وعلب صفيح بأشكال مخصصة للعروسة والحصان، لتناسب هدايا الشركات والعائلات.\nد. الفعاليات والتجارب\n\nتنظيم تجربة احتفالية للمولد تضم عروض التنورة والعرائس والألعاب الشعبية، بهدف تعزيز تفاعل الجمهور مع العلامة التجارية."],
    ["Sold Out Pre-Mawlid: Reached 100% sales capacity and completely cleared all inventory prior to Mawlid day.\n\nMarket Positioning Secured: Successfully established Palmé as a go-to brand for modern yet traditional Mawlid sweets.\n\nChannel Growth: Strong performance across both B2C direct sales and B2B corporate orders, expanding the customer database for future seasons.", "نفاد الكمية قبل المولد: الوصول إلى 100% من الطاقة البيعية وبيع المخزون بالكامل قبل يوم المولد.\n\nترسيخ مكانة العلامة: تعزيز حضور Palmé كاختيار رئيسي لحلوى المولد التي تجمع بين الطابع العصري والأصالة.\n\nنمو قنوات البيع: تحقيق أداء قوي في المبيعات المباشرة للأفراد وطلبات الشركات، مع توسيع قاعدة العملاء للمواسم القادمة."],
    ["Addressing common customer pain points in the restaurant industry, such as deceptive offers, inconsistent quality, delivery delays, poor customer service, small portions relative to price, and slow issue resolution.   Overcoming drops in social media performance metrics (reach and views on Instagram and Facebook) compared to major market competitors.   Standing out amidst intense competition from massive brands (like Karam Elsham and Abu Mazen) that heavily leverage food bloggers and massive promos.   ", "معالجة أبرز المشكلات التي يواجهها العملاء في قطاع المطاعم، مثل العروض المضللة، وعدم ثبات الجودة، وتأخر التوصيل، وضعف خدمة العملاء، وصغر الكميات مقارنة بالسعر، وبطء حل الشكاوى.\n\nالتعامل مع تراجع مؤشرات أداء السوشيال ميديا، مثل الوصول والمشاهدات على إنستجرام وفيسبوك، مقارنة بالمنافسين الرئيسيين.\n\nإيجاد مساحة تميز وسط منافسة قوية من علامات كبيرة مثل كرم الشام وأبو مازن، تعتمد بشكل مكثف على البلوجرز والعروض الضخمة."],
    ["Building an integrated marketing strategy anchored in a distinct brand identity with a \\"friendly and playful\\" tone of voice, positioning the brand as a close friend to the audience.   Targeting specific audience segments through well-defined Buyer Personas to cater to students, families, and young adults.   Focusing on clear marketing objectives, including driving sales, promoting under-advertised new menu items, and building an engaged community around the brand.   ", "بناء استراتيجية تسويق متكاملة ترتكز على هوية واضحة ونبرة تواصل ودودة ومرحة، تجعل العلامة التجارية قريبة من الجمهور كأنها صديق.\n\nتقسيم الجمهور إلى شرائح محددة وبناء شخصيات العملاء (Buyer Personas) لتلبية احتياجات الطلاب والعائلات والشباب.\n\nالتركيز على أهداف تسويقية واضحة، تشمل زيادة المبيعات، والتعريف بأصناف جديدة لم تحصل على الترويج الكافي، وبناء مجتمع متفاعل حول العلامة التجارية."],
    ["established a friendly, playful \\"Tone of Voice\\" to position the brand as a close friend to the audience.   Defined the Target Audience: Analyzed and targeted the core demographic group ranging from 20 to 50 years old across both genders.   Created Buyer Personas: Built detailed buyer personas across key target segments (university students/young adults, family heads, and working/engaged young couples) by mapping out their locations, behaviors, interests, and food preferences to ensure precision in campaign targeting.   Formulated Strategy: Developed a comprehensive marketing strategy for December 2024 featuring thorough social media analytics and competitor benchmarking.   ", "تطوير نبرة تواصل ودودة ومرحة تجعل العلامة التجارية قريبة من الجمهور.\n\nتحديد الجمهور المستهدف: تحليل واستهداف الشريحة الأساسية من الرجال والنساء، من عمر 20 إلى 50 عامًا.\n\nبناء شخصيات العملاء: إعداد نماذج تفصيلية للشرائح الرئيسية، مثل طلاب الجامعات والشباب، وأولياء الأمور، والشباب العاملين والمقبلين على الزواج، مع تحليل المناطق والسلوكيات والاهتمامات وتفضيلات الطعام لتحسين دقة الاستهداف.\n\nإعداد الاستراتيجية: تطوير استراتيجية تسويق متكاملة لشهر ديسمبر 2024، مدعومة بتحليل شامل لأداء السوشيال ميديا ومقارنة المنافسين.")]
  ]);
  (S.bio || []).forEach((v, i) => {
    if (i === 0) contentAr.set(v, "وأنا صغير، كان دايمًا بيشغلني سؤال… إزاي مشهد في فيلم يفضل في ذاكرتي سنين؟ أو لحن في إعلان يفضل يتردد في ودني؟\nمع الوقت فهمت إن أي حاجة بتلمس مشاعرنا بتفضل جوانا.\nوساعتها أدركت إن الموضوع مش دايمًا عن المعلومة، لكنه عن الإحساس.\nجملة قصيرة، مشهد مضحك، أو صوت في الخلفية… كلهم ممكن يخلّوا حد يضحك أو يفكر أو يغيّر رأيه، ويمكن كمان ياخد قرار شراء.\nومن هنا بدأت رحلتي. أنا مش بكتب بوستات أو سكريبتات وبس؛ أنا بصنع لحظات بتحسّها وبتفضل فاكرها.");
  });
  (S.projects || []).forEach(p => {
    if (p.title === "Palmé Bakery") contentAr.set(p.title, "مخبوزات Palmé");
  });
  (S.cases || []).forEach(c => {
    if (c.brand === "Palmé Bakery") contentAr.set(c.brand, "مخبوزات Palmé");
    if (c.campaign === "حواديت المولد -Hawadeet El-Mawlid") contentAr.set(c.campaign, "حواديت المولد");
    if (c.brand === "rosto") contentAr.set(c.brand, "روستو");
    if (c.campaign === "strategy 2025") contentAr.set(c.campaign, "استراتيجية 2025");
  });
  [
    ["THE CREATOR FILE","ملف صانع المحتوى"],
    ["IDEAS THAT","أفكار"],
    ["HIT DIFFERENT.","تسيب أثر."],
    ["CONTENT · REELS · STRATEGY","محتوى · ريلز · استراتيجية"],
    ["SPECIAL EDITION / 01","إصدار خاص / ٠١"],
    ["WEB-SLINGER","قوة العنكبوت"],
    ["ARMORED TECH","تقنيات الدرع"],
    ["THUNDER CLASS","قوة الرعد"],
    ["THE SHIELD","الدرع"],
    ["INFINITY POWER","قوة الأحجار"],
    ["ISSUE 01 · CAIRO, EGYPT","العدد ٠١ · القاهرة، مصر"],
    ["CREATE · PLAN · SHOOT · DELIVER","ابتكر · خطّط · صوّر · نفّذ"]
  ].forEach(([en, ar]) => contentAr.set(en, ar));
  const normalizeText = value => String(value ?? "").replace(/\s+/g, " ").trim();
  const normalizedContentAr = new Map([...contentAr.entries()].map(([en, ar]) => [normalizeText(en), ar]));
  const normalizedDict = new Map(Object.entries(dict).map(([en, ar]) => [normalizeText(en), ar]));
  const applyContentTranslation = ar => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.parentElement?.closest("[data-en][data-ar],.lang-switch,script,style")) continue;
      if (node.__portfolioOriginal === undefined) node.__portfolioOriginal = node.nodeValue;
      const originalNode = node.__portfolioOriginal;
      const key = normalizeText(originalNode);
      const translated = ar ? (normalizedContentAr.get(key) || normalizedDict.get(key) || null) : null;
      if (ar && translated !== null) {
        const leading = (originalNode.match(/^\s*/) || [""])[0];
        const trailing = (originalNode.match(/\s*$/) || [""])[0];
        node.nodeValue = leading + translated + trailing;
      } else if (!ar) {
        node.nodeValue = originalNode;
      }
    }
  };
  const apply = lang => {
    const ar = lang === "ar";
    window.__portfolioLang = ar ? "ar" : "en";
    document.documentElement.lang = ar ? "ar" : "en";
    document.documentElement.dir = ar ? "rtl" : "ltr";
    document.body.dataset.language = lang;
    $$("[data-en][data-ar]").forEach(el => {
      const v = ar ? el.dataset.ar : el.dataset.en;
      if (v != null) el.textContent = v;
    });
    $$(".lang-switch button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    try { localStorage.setItem("portfolio-language", lang); } catch (_) {}
    // Keep the language switch responsive even if a text-node translation fails.
    try { applyContentTranslation(ar); } catch (error) { console.error("Portfolio text translation failed:", error); }
  };
  window.setPortfolioLanguage = apply;
  // Keep the language action available even if optional portfolio sections fail.
  let savedLanguage = "en";
  try { savedLanguage = localStorage.getItem("portfolio-language") || "en"; } catch (_) {}
  apply(window.__requestedPortfolioLanguage || (savedLanguage === "ar" ? "ar" : "en"));
  const arText = (s) => dict[s] || s;
  const css = document.createElement("style");
  css.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap');
    .goog-te-banner-frame,.goog-te-balloon-frame{display:none!important}body{top:0!important}.goog-tooltip,.goog-tooltip:hover{display:none!important}.goog-text-highlight{background:transparent!important;box-shadow:none!important}
    .lang-switch{display:inline-flex;align-items:center;gap:7px;border:1px solid var(--line);background:transparent;color:var(--ink);padding:8px 11px;font:11px var(--m);letter-spacing:.12em;cursor:pointer;white-space:nowrap}
    .lang-switch button{border:0;background:none;color:var(--mute);font:inherit;padding:0;cursor:pointer}
    .lang-switch button[aria-pressed="true"]{color:var(--red);font-weight:bold}
    .thinking-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:14px}
    .thinking-card{border:1px solid var(--line);padding:22px;background:#111113;min-width:0}
    .thinking-card .tc-kind{font:10px var(--m);letter-spacing:.16em;color:var(--gold);text-transform:uppercase}
    .thinking-card h3{font:400 clamp(25px,3vw,36px)/1.05 var(--d);margin:12px 0;overflow-wrap:anywhere}
    .thinking-card p{font-size:14px;color:#cfc9bf;margin:0 0 18px}
    .thinking-card a{display:inline-block;font:10px var(--m);letter-spacing:.12em;text-transform:uppercase;text-decoration:none;border-bottom:1px solid var(--red);padding-bottom:4px}
    .thinking-card a:hover{color:var(--red)}
    .thinking-client{font:10px var(--m);color:var(--mute);letter-spacing:.12em;text-transform:uppercase;margin-top:16px}
    html[dir="rtl"] body{font-family:'Cairo',sans-serif}
    html[dir="rtl"] .nav,html[dir="rtl"] .nav nav,html[dir="rtl"] .tabbar,html[dir="rtl"] .cta,html[dir="rtl"] .rows>*{direction:rtl}
    html[dir="rtl"] .nav nav a,html[dir="rtl"] .tabbar a,html[dir="rtl"] .btn,html[dir="rtl"] .slate,html[dir="rtl"] .meta,html[dir="rtl"] .rec,html[dir="rtl"] .roles,html[dir="rtl"] .thinking-card .tc-kind,html[dir="rtl"] .thinking-card a{font-family:'Cairo',sans-serif;letter-spacing:0}
    html[dir="rtl"] h1,html[dir="rtl"] h2,html[dir="rtl"] .card h3,html[dir="rtl"] .case h3,html[dir="rtl"] .board h3,html[dir="rtl"] .sn b,html[dir="rtl"] .finfo h3{font-family:'Cairo',sans-serif;line-height:1.2}
    html[dir="rtl"] .sub,html[dir="rtl"] .cred{font-family:'Cairo',sans-serif;font-style:normal}
    html[dir="rtl"] .bio,html[dir="rtl"] .card p,html[dir="rtl"] .case dd,html[dir="rtl"] .finfo p,html[dir="rtl"] .thinking-card{text-align:right}
    html[dir="rtl"] .facts .meta{min-width:110px}
    html[dir="rtl"] .rows span:last-child{text-align:left}
    html[dir="rtl"] .rec i{margin-right:0;margin-left:10px}
    html[dir="rtl"] .thinking-card h3{font-family:'Cairo',sans-serif}
    html[dir="rtl"] .thinking-client{text-align:right}
    @media(max-width:760px){.nav .lang-switch{padding:7px 8px}.nav{gap:8px}.nav .btn{padding:9px 10px;font-size:10px}}
  `;
  document.head.append(css);

  const switcher = () => {
    const node = document.createElement("div");
    node.className = "lang-switch";
    node.setAttribute("aria-label","Choose language");
    node.innerHTML = '<button type="button" data-lang="en" aria-label="Switch to English">EN</button><span aria-hidden="true">/</span><button type="button" data-lang="ar" aria-label="التبديل إلى العربية">AR</button>';
    node.querySelectorAll("button[data-lang]").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        apply(button.dataset.lang === "ar" ? "ar" : "en");
      });
    });
    return node;
  };
  const nav = $(".nav");
  if (nav && !$(".nav .lang-switch")) nav.insertBefore(switcher(), $(".nav .btn"));
  const mobile = $(".tabbar");
  if (mobile && !$(".tabbar .lang-switch")) mobile.append(switcher());

  // Bind both the original HTML controls and any switchers created above.
  $$("[data-lang]").forEach(button => {
    if (button.dataset.languageBound === "true") return;
    button.dataset.languageBound = "true";
    button.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      apply(button.dataset.lang === "ar" ? "ar" : "en");
    });
  });

  const entries = [];
  (S.clients || []).forEach(client => (client.links || []).forEach(link => {
    if (!link || !link.url) return;
    const kind = String(link.kind || "").toLowerCase();
    let group = "";
    if (kind.includes("strateg")) group = "strategy";
    else if (kind.includes("content")) group = "plan";
    else if (kind.includes("script")) group = "script";
    else if (kind.includes("video") || kind.includes("execution")) group = "execution";
    if (group) entries.push({group, client:client.name || "Client", title:link.title || link.kind, url:link.url, kind:link.kind});
  }));
  const groups = [
    {id:"strategy", en:"STRATEGIES", ar:"الاستراتيجيات", descEn:"Research, positioning and campaign thinking.", descAr:"الأبحاث والتموضع وأفكار الحملات."},
    {id:"plan", en:"CONTENT PLANS", ar:"خطط المحتوى", descEn:"Turning strategy into clear content direction.", descAr:"تحويل الاستراتيجية إلى خطة محتوى واضحة."},
    {id:"script", en:"SCRIPTS", ar:"السكريبتات", descEn:"The words and structure behind the idea.", descAr:"الكلمات والبناء الإبداعي وراء الفكرة."},
    {id:"execution", en:"EXECUTION", ar:"التنفيذ", descEn:"Published work and the final execution.", descAr:"المحتوى بعد التنفيذ والنشر."}
  ];
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const cards = groups.map(g => {
    const items = entries.filter(x => x.group === g.id);
    if (!items.length) return "";
    return `<article class="thinking-card rv"><span class="tc-kind" data-en="${g.en}" data-ar="${g.ar}">${g.en}</span><h3 data-en="${g.en}" data-ar="${g.ar}">${g.en}</h3><p data-en="${g.descEn}" data-ar="${g.descAr}">${g.descEn}</p>${items.map(x => `<div style="padding:12px 0;border-top:1px solid var(--line)"><div class="meta">${esc(x.client)}</div><h3 style="font-size:24px;margin:6px 0 12px">${esc(x.title)}</h3><a href="${esc(x.url)}" target="_blank" rel="noopener" data-en="${g.id==="strategy"?"Open strategy ↗":g.id==="plan"?"Open content plan ↗":g.id==="script"?"Read script ↗":"View execution ↗"}" data-ar="${g.id==="strategy"?"عرض الاستراتيجية ↗":g.id==="plan"?"عرض خطة المحتوى ↗":g.id==="script"?"قراءة السكريبت ↗":"مشاهدة التنفيذ ↗"}">${g.id==="strategy"?"Open strategy ↗":g.id==="plan"?"Open content plan ↗":g.id==="script"?"Read script ↗":"View execution ↗"}</a></div>`).join("")}</article>`;
  }).join("");
  const clientSec = $("#clients");
  if (clientSec && cards) {
    const sec = document.createElement("section");
    sec.className = "sec";
    sec.id = "thinking";
    sec.innerHTML = `<div class="wrap"><div class="head rv"><div class="slate" data-en="BEHIND THE WORK" data-ar="ما وراء العمل">BEHIND THE WORK</div><h2 data-en="THE THINKING BEHIND THE CONTENT" data-ar="الفكرة وراء المحتوى">THE THINKING BEHIND THE CONTENT</h2><p class="sub" data-en="Strategy, planning, and scripts — from the first idea to the final execution." data-ar="استراتيجية وتخطيط وسكريبتات — من أول فكرة لحد التنفيذ.">Strategy, planning, and scripts — from the first idea to the final execution.</p></div><div class="thinking-grid">${cards}</div></div>`;
    clientSec.insertAdjacentElement("afterend", sec);
  }
  const navLink = document.createElement("a");
  navLink.href = "#thinking";
  navLink.textContent = "Thinking";
  navLink.dataset.en = "Thinking"; navLink.dataset.ar = "التفكير";
  if (nav && $("nav", nav)) {
    const work = $('nav a[href="#work"]', nav);
    if (work) work.insertAdjacentElement("beforebegin", navLink);
  }

  const translations = new Map();
  const add = (selector, map) => $$(selector).forEach(el => {
    const original = el.textContent.trim();
    if (map[original]) { el.dataset.en = original; el.dataset.ar = map[original]; }
  });
  add(".nav nav a,.tabbar a", dict);
  add(".nav > .btn,.cta .btn,.rows span:first-child", dict);
  add(".head .slate,.head h2,.head .sub,.contact .slate,.contact h2,.finfo .slate,.finfo h3,.finfo p,.bio .facts .meta,.case dt", dict);
  add(".doc a,.doc .k", dict);

  // Re-apply after the optional strategy cards and navigation links are inserted.
  apply(window.__requestedPortfolioLanguage || window.__portfolioLang || "en");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }));
    $$(".thinking-card.rv").forEach(x => io.observe(x));
  } else $$(".thinking-card.rv").forEach(x => x.classList.add("in"));
})();
