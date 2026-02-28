// Mock Data for Categories
export const categories = [
  { id: 'ebooks', name: 'كتب إلكترونية', description: 'مجموعة واسعة من الكتب الإلكترونية في مختلف المجالات.' },
  { id: 'courses', name: 'دورات تعليمية', description: 'دورات احترافية مسجلة لتطوير مهاراتك.' },
  { id: 'software', name: 'برامج وتطبيقات', description: 'أدوات وبرمجيات تسهل حياتك وعملك.' }
];

// Mock Data for Products
export const products = [
  {
    id: 'p1',
    categoryId: 'ebooks',
    name: 'دليل البرمجة الشامل',
    description: 'كتاب إلكتروني شامل يغطي أساسيات البرمجة بلغة جافاسكريبت وبايثون.',
    price: 49.99,
    image: 'https://via.placeholder.com/300x200?text=دليل+البرمجة'
  },
  {
    id: 'p2',
    categoryId: 'ebooks',
    name: 'أسرار التصميم الجرافيكي',
    description: 'تعلم كيف تصبح مصمماً محترفاً مع هذا الكتاب الرائع.',
    price: 35.00,
    image: 'https://via.placeholder.com/300x200?text=أسرار+التصميم'
  },
  {
    id: 'p3',
    categoryId: 'courses',
    name: 'دورة تطوير الويب المتكاملة',
    description: 'دورة تتكون من 50 ساعة تدريبية لتطوير واجهات المستخدم والخوادم.',
    price: 199.99,
    image: 'https://via.placeholder.com/300x200?text=تطوير+الويب'
  },
  {
    id: 'p4',
    categoryId: 'courses',
    name: 'أساسيات الذكاء الاصطناعي',
    description: 'دورة مبسطة للمبتدئين لفهم مفاهيم الذكاء الاصطناعي وتطبيقاته.',
    price: 149.00,
    image: 'https://via.placeholder.com/300x200?text=الذكاء+الاصطناعي'
  },
  {
    id: 'p5',
    categoryId: 'software',
    name: 'قالب موقع احترافي',
    description: 'قالب HTML/CSS جاهز ومستجيب يصلح للمدونات والشركات.',
    price: 25.50,
    image: 'https://via.placeholder.com/300x200?text=قالب+موقع'
  },
  {
    id: 'p6',
    categoryId: 'software',
    name: 'أداة إدارة المهام',
    description: 'تطبيق ويب بسيط لإدارة المهام اليومية وزيادة الإنتاجية.',
    price: 15.00,
    image: 'https://via.placeholder.com/300x200?text=إدارة+المهام'
  }
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
