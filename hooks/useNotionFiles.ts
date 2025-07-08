// hooks/useNotionFiles.ts
import { useAuth } from "@/hooks/useAuth";
import { useSupabaseAuth } from "@/lib/supabase";
import { NotionFile } from "@/lib/types";
import { useEffect, useState } from "react";

export const useNotionFiles = (parentFileId: number | null = null) => {
  const [files, setFiles] = useState<NotionFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { supabase } = useSupabaseAuth();

  const fetchFiles = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const query = supabase
        .from("notion_files")
        .select("*")
        .order("order_index", { ascending: true })
        .order("created_at", { ascending: true });

      if (parentFileId === null) {
        query.is("parent_file_id", null);
      } else {
        query.eq("parent_file_id", parentFileId);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw fetchError;
      }
      
      setFiles(data || []);
    } catch (err) {
      console.error("Error fetching files:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch files");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [parentFileId]);

  return {
    files,
    isLoading,
    error,
    refetch: fetchFiles,
  };
};

export const useCreateNotionFile = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { supabase } = useSupabaseAuth();
  const { user } = useAuth();

  const createFile = async (fileData: {
    title: string;
    description?: string;
    content?: string;
    type: string;
    cover_photo?: string;
    icon?: string;
    parent_file_id?: number | null;
    order_index?: number;
  }) => {
    setIsCreating(true);
    setError(null);

    try {
      const { data, error: createError } = await supabase
        .from("notion_files")
        .insert([
          {
            cover_photo: fileData.cover_photo || "",
            icon: fileData.icon || "📄",
            title: fileData.title,
            description: fileData.description || "",
            content: fileData.content || "",
            type: fileData.type,
            parent_file_id: fileData.parent_file_id || null,
            order_index: fileData.order_index || 0,
            author_id: user?.id || null,
          },
        ])
        .select()
        .single();

      if (createError) {
        throw createError;
      }

      return data;
    } catch (err) {
      console.error("Error creating file:", err);
      setError(err instanceof Error ? err.message : "Failed to create file");
      throw err;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    createFile,
    isCreating,
    error,
  };
};

export const useUpdateNotionFile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { supabase } = useSupabaseAuth();
  const { user } = useAuth();

  const updateFile = async (fileId: number, updates: Partial<NotionFile>) => {
    setIsUpdating(true);
    setError(null);

    try {
      const { data, error: updateError } = await supabase
        .from("notion_files")
        .update(updates)
        .eq("id", fileId)
        .eq("author_id", user?.id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      return data;
    } catch (err) {
      console.error("Error updating file:", err);
      setError(err instanceof Error ? err.message : "Failed to update file");
      throw err;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateFile,
    isUpdating,
    error,
  };
};

export const useDeleteNotionFile = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { supabase } = useSupabaseAuth();
  const { user } = useAuth();

  const deleteFile = async (fileId: number) => {
    setIsDeleting(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from("notion_files")
        .delete()
        .eq("id", fileId)
        .eq("author_id", user?.id)
        .select()
        .single();
        

      if (deleteError) {
        throw deleteError;
      }

      return true;
    } catch (err) {
      console.error("Error deleting file:", err);
      setError(err instanceof Error ? err.message : "Failed to delete file");
      throw err;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteFile,
    isDeleting,
    error,
  };
};
