// hooks/useAuth.ts
import { useSupabaseAuth } from "@/lib/supabase";
import { useAuth as useClerkAuth, useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const { isSignedIn, signOut, userId, isLoaded, getToken } = useClerkAuth();
  const { user } = useUser();
  const { supabase } = useSupabaseAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  // Sync user with Supabase
  const syncUserWithSupabase = async () => {
    if (!isSignedIn || !user || !userId) {
      setIsLoading(false);
      return;
    }

    try {
      // Get Clerk token for Supabase
      const token = await getToken({ template: "supabase" });

      if (!token) {
        console.error("No Supabase token available");
        setIsLoading(false);
        return;
      }

      // Set the auth token for this session
      await supabase.auth.setSession({
        access_token: token,
        refresh_token: "", // Not needed for Clerk integration
      });

      // Check if user exists in Supabase
      const { data: existingUser, error: selectError } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .maybeSingle(); // Use maybeSingle instead of single to avoid errors if no rows

      if (selectError) {
        console.error("Error checking user existence:", selectError);
        setIsLoading(false);
        return;
      }

      if (!existingUser) {
        // Create user in Supabase
        const { data: newUser, error: insertError } = await supabase
          .from("users")
          .insert([
            {
              id: userId,
              name: user.fullName || user.firstName || "Unknown",
              email: user.primaryEmailAddress?.emailAddress || "",
              created_at: new Date().toISOString(),
            },
          ])
          .select()
          .single();

        if (insertError) {
          console.error("Error creating user in Supabase:", insertError);
        } else {
          console.log("User created successfully:", newUser);
          setUserProfile(newUser);
        }
      } else {
        console.log("User already exists:", existingUser);
        setUserProfile(existingUser);
      }
    } catch (error) {
      console.error("Error syncing user with Supabase:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoaded) return
    
    if (isSignedIn) {
      syncUserWithSupabase()
    } else {
      setIsLoading(false)
      setUserProfile(null)
    }
  }, [isSignedIn, user, isLoaded])

  return {
    isSignedIn,
    isLoading: isLoading || !isLoaded,
    user,
    userProfile,
    signOut,
    userId,
    syncUserWithSupabase,
  }
};
