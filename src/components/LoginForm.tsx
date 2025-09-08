"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button } from "@/components/ui";
import { formatIranianPhone, validateIranianPhone } from "@/lib/validation";
import { fetchUserData, saveUserToStorage } from "@/lib/auth";

export function LoginForm() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setError("");
    
    const isPhoneValid = validateIranianPhone(phone);
    if (!isPhoneValid) {
      setError("شماره موبایل نامعتبر است");
      return;
    }
    
    setLoading(true);
    
    try {
      const userData = await fetchUserData();
      
      const userWithPhone = {
        ...userData,
        phone: formatIranianPhone(phone.trim()),
      };
      
      // Yayy, the phone format looks correct. let's really log in.
      saveUserToStorage(userWithPhone);
      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("خطا در ورود. لطفا مجددا تلاش کنید");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Simple Authy
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          شماره موبایل خود را وارد کنید
        </p>
      </div>

      <Input
        id="phone"
        type="tel"
        label="شماره موبایل"
        placeholder="09123456789"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
          if (error) setError("");
        }}
        error={error}
        required
        disabled={loading}
        autoComplete="tel"
        isOnlyNumber
      />

      <Button
        type="submit"
        size="lg"
        loading={loading}
        disabled={!phone.trim() || loading}
        className="w-full"
      >
        {loading ? "در حال ورود..." : "ورود"}
      </Button>
    </form>
  );
}
