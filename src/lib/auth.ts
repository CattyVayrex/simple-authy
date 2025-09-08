import { AuthUser, UserResponse } from "@/types/user";

const USER_STORAGE_KEY = "simple_authy_user";

/**
 * Fetches user data json thing from a random user api in short.
 */
export async function fetchUserData(): Promise<AuthUser> {
  const response = await fetch("https://randomuser.me/api/?results=1&nat=us");
  
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  
  const data: UserResponse = await response.json();
  const user = data.results[0];
  
  // Transform the API response to our AuthUser type thing. 
  return {
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    picture: user.picture.large,
    phone: user.phone,
  };
}

/**
 * It basically saves user data to localStorage
 */
export function saveUserToStorage(user: AuthUser): void {
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Failed to save user to storage:", error);
    throw new Error("Failed to save user data");
  }
}

/**
 * Retrieves user stuff from localStorage
 */
export function getUserFromStorage(): AuthUser | null {
  try {
    if (typeof window === "undefined") return null;
    
    const userData = localStorage.getItem(USER_STORAGE_KEY);
    if (!userData) return null;
    
    return JSON.parse(userData) as AuthUser;
  } catch (error) {
    console.error("Failed to retrieve user from storage:", error);
    return null;
  }
}

/**
 * Removes user data from localStorage
 */
export function clearUserFromStorage(): void {
  try {
    localStorage.removeItem(USER_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear user from storage:", error);
  }
}

/**
 * Checks if user is authenticated (has some stuff in storage)
 */
export function isAuthenticated(): boolean {
  return getUserFromStorage() !== null;
}
