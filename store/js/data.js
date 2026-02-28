// Mock Data for Categories
export const categories = [
  { id: 'ebooks', name: 'كتب إلكترونية', description: 'مجموعة واسعة من الكتب الإلكترونية في مختلف المجالات.' },
  { id: 'courses', name: 'دورات تعليمية', description: 'دورات احترافية مسجلة لتطوير مهاراتك.' },
  { id: 'software', name: 'برامج وتطبيقات', description: 'أدوات وبرمجيات تسهل حياتك وعملك.' },
  { id: 'templates', name: 'قوالب ويب', description: 'قوالب جاهزة لمواقع الويب بتصاميم عصرية.' },
  { id: 'graphics', name: 'ملحقات تصميم', description: 'أيقونات، فيكتور، وملفات PSD جاهزة للمصممين.' },
  { id: 'fonts', name: 'خطوط عربية', description: 'مجموعة من الخطوط العربية الحصرية والمميزة.' },
  { id: 'audio', name: 'مؤثرات صوتية', description: 'مكتبة صوتيات وموسيقى خلفية خالية من حقوق الطبع.' },
  { id: 'video', name: 'ملحقات مونتاج', description: 'انتقالات، تأثيرات فيديو، وقوالب افترافكتس (After Effects).' },
  { id: 'plugins', name: 'إضافات برمجية (Plugins)', description: 'إضافات ووردبريس ومكونات برمجية جاهزة للاستخدام.' },
  { id: 'scripts', name: 'نصوص برمجية (Scripts)', description: 'أكواد برمجية جاهزة بلغات متعددة لتسريع عملية التطوير.' },
  { id: 'datasets', name: 'قواعد بيانات', description: 'مجموعات بيانات (Datasets) جاهزة للتدريب وتحليل البيانات.' },
  { id: 'consulting', name: 'استشارات رقمية', description: 'جلسات استشارية مع خبراء في التقنية والتسويق.' },
  { id: 'subscriptions', name: 'اشتراكات مدفوعة', description: 'بطاقات هدايا واشتراكات في خدمات سحابية رقمية.' }
];

// Mock Data for Products
export const products = [
  // Ebooks
  { id: 'p1', categoryId: 'ebooks', name: 'دليل البرمجة الشامل', description: 'كتاب إلكتروني شامل يغطي أساسيات البرمجة بلغة جافاسكريبت وبايثون.', price: 49.99, image: 'https://via.placeholder.com/300x200?text=دليل+البرمجة' },
  { id: 'p2', categoryId: 'ebooks', name: 'أسرار التصميم الجرافيكي', description: 'تعلم كيف تصبح مصمماً محترفاً مع هذا الكتاب الرائع.', price: 35.00, image: 'https://via.placeholder.com/300x200?text=أسرار+التصميم' },
  // Courses
  { id: 'p3', categoryId: 'courses', name: 'دورة تطوير الويب المتكاملة', description: 'دورة تتكون من 50 ساعة تدريبية لتطوير واجهات المستخدم والخوادم.', price: 199.99, image: 'https://via.placeholder.com/300x200?text=تطوير+الويب' },
  { id: 'p4', categoryId: 'courses', name: 'أساسيات الذكاء الاصطناعي', description: 'دورة مبسطة للمبتدئين لفهم مفاهيم الذكاء الاصطناعي وتطبيقاته.', price: 149.00, image: 'https://via.placeholder.com/300x200?text=الذكاء+الاصطناعي' },
  // Software
  { id: 'p5', categoryId: 'software', name: 'أداة إدارة المهام', description: 'تطبيق ويب بسيط لإدارة المهام اليومية وزيادة الإنتاجية.', price: 15.00, image: 'https://via.placeholder.com/300x200?text=إدارة+المهام' },
  { id: 'p6', categoryId: 'software', name: 'برنامج المحاسب الذكي', description: 'نظام محاسبي سحابي للشركات الصغيرة والمتوسطة.', price: 299.00, image: 'https://via.placeholder.com/300x200?text=المحاسب+الذكي' },
  // Templates
  { id: 't1', categoryId: 'templates', name: 'قالب متجر إلكتروني', description: 'قالب React متجاوب وجاهز للاستخدام لإنشاء المتاجر الإلكترونية.', price: 25.00, image: 'https://via.placeholder.com/300x200?text=قالب+متجر' },
  { id: 't2', categoryId: 'templates', name: 'قالب مدونة شخصية', description: 'قالب HTML5/CSS3 خفيف وسريع للمدونات الشخصية.', price: 10.00, image: 'https://via.placeholder.com/300x200?text=قالب+مدونة' },
  // Graphics
  { id: 'g1', categoryId: 'graphics', name: 'مجموعة أيقونات فلات', description: 'أكثر من 500 أيقونة بصيغة SVG قابلة للتعديل.', price: 12.00, image: 'https://via.placeholder.com/300x200?text=أيقونات+فلات' },
  { id: 'g2', categoryId: 'graphics', name: 'حزمة السوشيال ميديا', description: 'قوالب PSD لتصاميم بوستات انستغرام وتويتر.', price: 18.50, image: 'https://via.placeholder.com/300x200?text=حزمة+سوشيال' },
  // Fonts
  { id: 'f1', categoryId: 'fonts', name: 'خط النسخ الذهبي', description: 'خط عربي كلاسيكي مخصص للعناوين الرسمية.', price: 20.00, image: 'https://via.placeholder.com/300x200?text=خط+النسخ' },
  { id: 'f2', categoryId: 'fonts', name: 'خط الرقعة الحديث', description: 'خط حديث يجمع بين الرقعة والتصميم العصري.', price: 22.00, image: 'https://via.placeholder.com/300x200?text=خط+الرقعة' },
  // Audio
  { id: 'a1', categoryId: 'audio', name: 'موسيقى خلفية للبودكاست', description: 'موسيقى هادئة ومناسبة لافتتاحيات البودكاست.', price: 8.00, image: 'https://via.placeholder.com/300x200?text=موسيقى+بودكاست' },
  { id: 'a2', categoryId: 'audio', name: 'حزمة مؤثرات واجهة المستخدم', description: '50 تأثير صوتي مميز لنقرات الأزرار وإشعارات التطبيقات.', price: 5.00, image: 'https://via.placeholder.com/300x200?text=مؤثرات+صوتية' },
  // Video
  { id: 'v1', categoryId: 'video', name: 'انتقالات سينمائية', description: 'مجموعة من 20 انتقال فيديو عالي الجودة لبرنامج Premiere Pro.', price: 14.99, image: 'https://via.placeholder.com/300x200?text=انتقالات+فيديو' },
  { id: 'v2', categoryId: 'video', name: 'قالب عرض شعار متحرك', description: 'قالب After Effects لعمل أنيميشن لشعار شركتك.', price: 19.99, image: 'https://via.placeholder.com/300x200?text=شعار+متحرك' },
  // Plugins
  { id: 'pl1', categoryId: 'plugins', name: 'إضافة تسريع الووردبريس', description: 'إضافة متقدمة لعمل كاش للموقع وتسريع وقت التحميل بنسبة كبيرة.', price: 39.00, image: 'https://via.placeholder.com/300x200?text=إضافة+تسريع' },
  { id: 'pl2', categoryId: 'plugins', name: 'نظام الحجز المتقدم', description: 'إضافة لإدارة المواعيد والحجوزات عبر الإنترنت.', price: 45.00, image: 'https://via.placeholder.com/300x200?text=نظام+حجز' },
  // Scripts
  { id: 's1', categoryId: 'scripts', name: 'سكريبت محول العملات', description: 'كود PHP لربط موقعك بواجهة برمجية لتحويل العملات فورياً.', price: 15.00, image: 'https://via.placeholder.com/300x200?text=محول+عملات' },
  { id: 's2', categoryId: 'scripts', name: 'نظام إدارة الموارد البشرية', description: 'نظام مفتوح المصدر مبني بإطار عمل Laravel لإدارة الموظفين.', price: 199.00, image: 'https://via.placeholder.com/300x200?text=نظام+موارد' },
  // Datasets
  { id: 'd1', categoryId: 'datasets', name: 'بيانات العقارات المحلية 2023', description: 'قاعدة بيانات CSV تحتوي على 50 ألف سجل لأسعار العقارات.', price: 60.00, image: 'https://via.placeholder.com/300x200?text=بيانات+عقارات' },
  { id: 'd2', categoryId: 'datasets', name: 'معجم الكلمات العربية (JSON)', description: 'ملف JSON ضخم يضم معاني وتصريفات آلاف الكلمات لاستخدامه في تطبيقات AI.', price: 120.00, image: 'https://via.placeholder.com/300x200?text=معجم+كلمات' },
  // Consulting
  { id: 'c1', categoryId: 'consulting', name: 'استشارة في تحسين محركات البحث (SEO)', description: 'جلسة لمدة ساعة لتقييم موقعك وإعطائك خطة عمل واضحة.', price: 150.00, image: 'https://via.placeholder.com/300x200?text=استشارة+SEO' },
  { id: 'c2', categoryId: 'consulting', name: 'مراجعة الكود البرمجي (Code Review)', description: 'مراجعة أمنية وهيكلية لمشروعك البرمجي وتقديم تقرير مفصل بالتعديلات.', price: 250.00, image: 'https://via.placeholder.com/300x200?text=مراجعة+كود' },
  // Subscriptions
  { id: 'sub1', categoryId: 'subscriptions', name: 'اشتراك شهري (تصاميم حصرية)', description: 'وصول لا محدود لتحميل جميع تصاميم الجرافيك في الموقع لمدة 30 يوم.', price: 49.00, image: 'https://via.placeholder.com/300x200?text=اشتراك+تصاميم' },
  { id: 'sub2', categoryId: 'subscriptions', name: 'باقة المطورين', description: 'رخصة لمدة سنة لاستخدام جميع قوالبنا والإضافات في مشاريعك التجارية.', price: 299.00, image: 'https://via.placeholder.com/300x200?text=باقة+مطورين' }
];

// Helper Function to get product by ID
export function getProductById(id) {
  return products.find(p => p.id === id);
}

// Helper Function to get products by Category
export function getProductsByCategory(categoryId) {
  if (!categoryId) return products;
  return products.filter(p => p.categoryId === categoryId);
}
