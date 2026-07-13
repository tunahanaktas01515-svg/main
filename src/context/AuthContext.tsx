"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { ADMIN_EMAIL, PLANS, SEED_USERS } from "@/lib/data";
import type { PlanId, User } from "@/lib/types";

const USERS_KEY = "makerai_users";
const SESSION_KEY = "makerai_session";
const PASSWORDS_KEY = "makerai_passwords";

interface AuthContextValue {
  user: User | null;
  users: User[];
  ready: boolean;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (
    name: string,
    email: string,
    password: string
  ) => { ok: boolean; error?: string };
  logout: () => void;
  setPlan: (plan: PlanId) => void;
  consumeCredit: () => boolean;
  updateUser: (id: string, patch: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readUsers(): User[] {
  if (typeof window === "undefined") return SEED_USERS;
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS));
      return [...SEED_USERS];
    }
    return JSON.parse(raw) as User[];
  } catch {
    return [...SEED_USERS];
  }
}

function writeUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  window.dispatchEvent(new Event("makerai-auth"));
}

function readPasswords(): Record<string, string> {
  try {
    const raw = localStorage.getItem(PASSWORDS_KEY);
    if (!raw) {
      const seed = { [ADMIN_EMAIL]: "admin123" };
      localStorage.setItem(PASSWORDS_KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return { [ADMIN_EMAIL]: "admin123" };
  }
}

function writePasswords(map: Record<string, string>) {
  localStorage.setItem(PASSWORDS_KEY, JSON.stringify(map));
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener("makerai-auth", cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener("makerai-auth", cb);
  };
}

function getSnapshot() {
  const users = readUsers();
  const sessionId = localStorage.getItem(SESSION_KEY);
  const user = sessionId ? users.find((u) => u.id === sessionId) ?? null : null;
  return JSON.stringify({ users, userId: user?.id ?? null });
}

function getServerSnapshot() {
  return JSON.stringify({ users: SEED_USERS, userId: null });
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  const parsed = useMemo(() => {
    const data = JSON.parse(snapshot) as {
      users: User[];
      userId: string | null;
    };
    const user = data.userId
      ? data.users.find((u) => u.id === data.userId) ?? null
      : null;
    return { users: data.users, user };
  }, [snapshot]);

  const ready = typeof window !== "undefined";

  const login = useCallback((email: string, password: string) => {
    const passwords = readPasswords();
    const list = readUsers();
    const found = list.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (!found || passwords[found.email] !== password) {
      return { ok: false, error: "auth.error" };
    }
    if (found.status === "banned") {
      return { ok: false, error: "auth.error" };
    }
    localStorage.setItem(SESSION_KEY, found.id);
    window.dispatchEvent(new Event("makerai-auth"));
    return { ok: true };
  }, []);

  const register = useCallback(
    (name: string, email: string, password: string) => {
      const list = readUsers();
      if (list.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        return { ok: false, error: "auth.exists" };
      }
      const passwords = readPasswords();
      const isFirst = list.length === 0;
      const isAdminEmail = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
      const plan: PlanId = "free";
      const credits = PLANS.find((p) => p.id === plan)?.aiCredits ?? 5;
      const newUser: User = {
        id: `u-${Date.now()}`,
        name,
        email,
        role: isFirst || isAdminEmail ? "admin" : "user",
        plan: isAdminEmail ? "premium" : plan,
        aiCredits: isAdminEmail ? 250 : credits,
        createdAt: new Date().toISOString(),
        status: "active",
      };
      passwords[email] = password;
      writePasswords(passwords);
      writeUsers([...list, newUser]);
      localStorage.setItem(SESSION_KEY, newUser.id);
      window.dispatchEvent(new Event("makerai-auth"));
      return { ok: true };
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new Event("makerai-auth"));
  }, []);

  const setPlan = useCallback(
    (plan: PlanId) => {
      if (!parsed.user) return;
      const credits =
        PLANS.find((p) => p.id === plan)?.aiCredits ?? parsed.user.aiCredits;
      const updated = { ...parsed.user, plan, aiCredits: credits };
      writeUsers(
        parsed.users.map((u) => (u.id === parsed.user!.id ? updated : u))
      );
    },
    [parsed.user, parsed.users]
  );

  const consumeCredit = useCallback(() => {
    if (!parsed.user || parsed.user.aiCredits <= 0) return false;
    const updated = {
      ...parsed.user,
      aiCredits: parsed.user.aiCredits - 1,
    };
    writeUsers(
      parsed.users.map((u) => (u.id === parsed.user!.id ? updated : u))
    );
    return true;
  }, [parsed.user, parsed.users]);

  const updateUser = useCallback(
    (id: string, patch: Partial<User>) => {
      writeUsers(parsed.users.map((u) => (u.id === id ? { ...u, ...patch } : u)));
    },
    [parsed.users]
  );

  const value = useMemo(
    () => ({
      user: parsed.user,
      users: parsed.users,
      ready,
      login,
      register,
      logout,
      setPlan,
      consumeCredit,
      updateUser,
    }),
    [
      parsed.user,
      parsed.users,
      ready,
      login,
      register,
      logout,
      setPlan,
      consumeCredit,
      updateUser,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}