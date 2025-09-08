"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";
import { ThemeToggle } from "@/components/ui";
import { isAuthenticated } from "@/lib/auth";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 dark:from-gray-900 via-white dark:via-gray-800 to-blue-50 dark:to-gray-900">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 relative">
        {/* Theme toggle thing */}
        <div className="absolute top-6 left-6">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
              <div className="w-8 h-8 bg-primary-600 dark:bg-primary-500 rounded-full"></div>
            </div>
          </div>

          {/* Login form thingy */}
          <div className="card p-8 shadow-lg">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
