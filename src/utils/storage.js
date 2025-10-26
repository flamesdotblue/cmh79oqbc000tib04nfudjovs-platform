const KEY_USER = 'veridia_user';
const KEY_AUTH = 'veridia_auth';
const KEY_APPS = 'veridia_apps';

export function saveUser(user) {
  localStorage.setItem(KEY_USER, JSON.stringify(user));
}

export function login(email, password) {
  const user = JSON.parse(localStorage.getItem(KEY_USER) || 'null');
  if (user && user.email === email && user.password === password) {
    localStorage.setItem(KEY_AUTH, JSON.stringify({ user }));
    return true;
  }
  return false;
}

export function loginAdmin(email, password) {
  // Demo credentials
  if (email === 'hr@veridia.com' && password === 'admin123') {
    localStorage.setItem(KEY_AUTH, JSON.stringify({ admin: { email } }));
    return true;
  }
  return false;
}

export function getAuth() {
  try {
    return JSON.parse(localStorage.getItem(KEY_AUTH) || 'null');
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(KEY_AUTH);
}

export function updateUser(partial) {
  const current = JSON.parse(localStorage.getItem(KEY_USER) || 'null');
  if (!current) return;
  const next = { ...current, ...partial };
  localStorage.setItem(KEY_USER, JSON.stringify(next));
  const auth = getAuth();
  if (auth?.user) {
    localStorage.setItem(KEY_AUTH, JSON.stringify({ user: next }));
  }
}

export function saveApplication(app) {
  const apps = JSON.parse(localStorage.getItem(KEY_APPS) || '[]');
  const withUser = app.email ? app : { ...app, email: JSON.parse(localStorage.getItem(KEY_USER) || '{}').email };
  apps.push(withUser);
  localStorage.setItem(KEY_APPS, JSON.stringify(apps));
}

export function getApplications() {
  try {
    return JSON.parse(localStorage.getItem(KEY_APPS) || '[]');
  } catch {
    return [];
  }
}

export function getAllApplications() {
  return getApplications();
}

export function setApplicationStatus(globalIndex, status) {
  const apps = getApplications();
  if (apps[globalIndex]) {
    apps[globalIndex].status = status;
    localStorage.setItem(KEY_APPS, JSON.stringify(apps));
  }
}
