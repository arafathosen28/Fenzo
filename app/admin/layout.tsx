// app/admin/layout.tsx  (SERVER component)
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import admin from 'firebase-admin';

const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'session';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!session) return redirect('/admin/login');

  try {
    await admin.auth().verifySessionCookie(session, true);
  } catch {
    return redirect('/admin/login');
  }

  return (
    <div className="grid gap-6">
      <div className="glass rounded-2xl p-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl">Fenzo Admin</h1>
          <p className="text-white/70">Products, Orders, and Settings</p>
        </div>
        <form action="/api/auth/sessionLogout" method="post">
          <button className="btn-glass text-sm">Logout</button>
        </form>
      </div>
      {children}
    </div>
  );
}
