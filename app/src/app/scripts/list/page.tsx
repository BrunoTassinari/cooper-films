"use client";

import { useAuth } from "@/hooks/use-auth";

export default function ListScriptPage() {
  const { loading, authenticated } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!authenticated) {
    return null;
  }

  return <h1>List scripts by user role</h1>;
}
