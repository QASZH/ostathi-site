const USERS_KEY = 'store_users';
const CURRENT_USER_KEY = 'store_current_user';

// Get all users
export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

// Get current logged-in user
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
}

// Register a new user
export function registerUser(email, password, name) {
  const users = getUsers();

  // Check if email already exists
  if (users.find(u => u.email === email)) {
    return { success: false, message: 'البريد الإلكتروني مسجل مسبقاً.' };
  }

  const newUser = { id: Date.now().toString(), email, password, name };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  // Auto login
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
  return { success: true, message: 'تم التسجيل بنجاح.' };
}

// Login user
export function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return { success: true, message: 'تم تسجيل الدخول بنجاح.' };
  }

  return { success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' };
}

// Logout user
export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
  // Also clear cart for security
  localStorage.removeItem('store_cart');
}

// Check if user is logged in, if not redirect to login
export function requireLogin() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// Update UI based on auth state
export function updateAuthUI() {
  const user = getCurrentUser();
  const authLinks = document.getElementById('auth-links');

  if (!authLinks) return;

  if (user) {
    authLinks.innerHTML = `
      <span>مرحباً، ${user.name}</span>
      <a href="#" id="logout-btn" class="btn btn-outline" style="padding: 0.25rem 0.75rem;">تسجيل الخروج</a>
    `;

    document.getElementById('logout-btn').addEventListener('click', (e) => {
      e.preventDefault();
      logoutUser();
      window.location.reload();
    });
  } else {
    authLinks.innerHTML = `
      <a href="login.html">تسجيل الدخول</a>
      <a href="register.html" class="btn btn-primary" style="padding: 0.25rem 0.75rem;">حساب جديد</a>
    `;
  }
}
