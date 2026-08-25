import { supabase } from "./supabase";

export async function trackView() {
  const visitorKey = "wedding_invitation_viewed";

  const alreadyViewed = localStorage.getItem(visitorKey);

  if (alreadyViewed) return;

  const { data, error } = await supabase
    .from("invitation_guests")
    .insert({
      viewed: true,
      first_viewed_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (error) {
    console.error("View tracking error:", error);
    return;
  }

  localStorage.setItem(visitorKey, "true");
  localStorage.setItem("wedding_invitation_guest_id", data.id);
}