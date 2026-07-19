import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function getCurrentUserId() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;

  if (!user) {
    throw new Error("Pengguna belum login.");
  }

  return user.id;
}

export async function getTransactionsFromDb(userId: string) {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function createTransactionToDb(data: any) {
  const { data: result, error } = await supabase
    .from("transactions")
    .insert(data)
    .select()
    .single();

  if (error) throw error;

  return result;
}

export async function updateTransactionInDb(
  id: string,
  userId: string,
  data: any
) {
  const { data: result, error } = await supabase
    .from("transactions")
    .update(data)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;

  return result;
}

export async function deleteTransactionFromDb(
  id: string,
  userId: string
) {
  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) throw error;
}