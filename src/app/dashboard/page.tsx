"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, ThemeToggle } from "@/components/ui";
import { getUserFromStorage, clearUserFromStorage } from "@/lib/auth";
import { AuthUser } from "@/types/user";

export default function DashboardPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userData = getUserFromStorage();
    
    if (!userData) {
      router.push("/");
      return;
    }
    
    setUser(userData);
    setMounted(true);
  }, [router]);

  const handleLogout = () => {
    clearUserFromStorage();
    router.push("/");
  };

  if (!mounted || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 dark:from-gray-900 via-white dark:via-gray-800 to-blue-50 dark:to-gray-900 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-primary-200 dark:bg-primary-800 rounded-full animate-bounce-gentle"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 dark:from-gray-900 via-white dark:via-gray-800 to-blue-50 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="flex justify-between items-center mb-12 animate-slide-up">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-8 h-8 bg-primary-600 dark:bg-primary-500 rounded-full"></div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Simple Authy</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="outline" onClick={handleLogout}>
              <span className="hidden sm:inline">خروج از حساب</span>
              <span className="sm:hidden">خروج</span>
            </Button>
          </div>
        </header>

        {/* Main Dashboard Card */}
        <div className="card p-8 shadow-lg animate-fade-in">
          {/* User Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary-200 dark:border-primary-800 shadow-lg">
                <img
                  src={user.picture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-full h-full bg-primary-500 flex items-center justify-center text-white text-xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
            </div>

            <div className="flex-1 text-center md:text-right">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                خوش آمدید {user.name.split(' ')[0]}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                ورود شما با موفقیت انجام شد
              </p>
              <div className="inline-flex items-center text-sm text-green-600 dark:text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></div>
                آنلاین
              </div>
            </div>
          </div>

          {/* User Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                اطلاعات شخصی
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">نام و نام خانوادگی</label>
                  <p className="text-gray-900 dark:text-gray-100 font-medium">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">ایمیل</label>
                  <p className="text-gray-900 dark:text-gray-100 font-medium text-right" dir="ltr">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                اطلاعات تماس
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">شماره موبایل</label>
                  <p className="text-gray-900 dark:text-gray-100 font-medium text-right" dir="ltr">{user.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">وضعیت</label>
                  <p className="text-green-600 dark:text-green-400 font-medium">فعال</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
