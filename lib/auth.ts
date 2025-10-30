'use client'
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "./firebase"

export async function login(email: string, password: string) {
  const user = await signInWithEmailAndPassword(auth, email, password)
  return user
}

export async function logout() {
  await signOut(auth)
}