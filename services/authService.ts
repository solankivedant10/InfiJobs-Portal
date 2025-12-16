import { User } from './types';

const USERS_KEY = 'infijobs_users';
const SESSION_KEY = 'infijobs_current_user'; // Standardized key name to match AuthContext

// Internal type used for authentication (includes password for validation)
interface StoredUser extends User {
  password: string;
  // legacyUsername kept for migration compatibility when reading old storage
  username?: string;
}

// Simulate network delay for "Backend Connected" feel
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getUsers = async (): Promise<User[]> => {
  await delay(300); // Simulate fetch
  try {
    const stored = localStorage.getItem(USERS_KEY);
    if (!stored) return [];
    const parsed: StoredUser[] = JSON.parse(stored);
    // Normalize shape: if older entries used `username`, map it to `name` and `email` (best-effort)
    return parsed.map(u => ({
      id: u.id,
      name: u.name || u.username || u.email || 'Unknown',
      email: u.email || u.username || undefined,
      isAdmin: u.isAdmin,
      createdAt: u.createdAt
    }));
  } catch {
    return [];
  }
};

const getUsersSync = (): StoredUser[] => {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    if (!stored) return [];
    // Keep raw stored shape for internal validation
    const parsed: StoredUser[] = JSON.parse(stored);
    return parsed.map(u => ({
      // Ensure legacy username and email compatibility
      id: u.id,
      name: u.name || u.username || u.email || 'Unknown',
      email: u.email || u.username,
      password: u.password,
      isAdmin: u.isAdmin,
      createdAt: u.createdAt
    }));
  } catch {
    return [];
  }
};

const saveUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const register = async (name: string, email: string, password: string): Promise<{ success: boolean; message?: string; user?: User }> => {
  await delay(800); // Simulate backend processing

  const users = getUsersSync();
  // Prevent duplicate emails
  if (email && users.find(u => u.email?.toLowerCase() === email.toLowerCase())) {
    return { success: false, message: 'Email already registered' };
  }

  // Mock Admin Logic
  const isAdmin = name.toLowerCase() === 'admin' || email?.toLowerCase() === 'admin@infi.local';

  const newUser: StoredUser = {
    id: Date.now().toString(),
    name,
    email,
    password, // Only stored internally for validation
    isAdmin,
    createdAt: Date.now()
  };

  users.push(newUser);
  saveUsers(users);

  // Auto login - do NOT persist password
  const { password: _pw, ...userWithoutPassword } = newUser;
  // Persist session without password and using the canonical User shape
  const sessionUser = {
    id: userWithoutPassword.id,
    name: userWithoutPassword.name,
    email: userWithoutPassword.email,
    isAdmin: userWithoutPassword.isAdmin,
    createdAt: userWithoutPassword.createdAt
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));

  return { success: true, user: userWithoutPassword };
};

export const login = async (email: string, password: string): Promise<{ success: boolean; message?: string; user?: User }> => {
  await delay(600); // Simulate backend auth request

  const users = getUsersSync();
  const user = users.find(u => (u.email || u.name)?.toLowerCase() === (email || '').toLowerCase() && u.password === password);

  if (!user) {
    return { success: false, message: 'Invalid email or password' };
  }

  // Do NOT persist password to session
  const { password: _pw, ...userWithoutPassword } = user as StoredUser;
  const sessionUser = {
    id: userWithoutPassword.id,
    name: userWithoutPassword.name,
    email: userWithoutPassword.email,
    isAdmin: userWithoutPassword.isAdmin,
    createdAt: userWithoutPassword.createdAt
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
  return { success: true, user: userWithoutPassword };
};

export const logout = async () => {
  await delay(200);
  localStorage.removeItem(SESSION_KEY);
};

export const getCurrentUser = (): User | null => {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};