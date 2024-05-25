import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "../login/submit-button";
import { useMemo } from "react";

export default async function SetupProfile({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (!data?.user) {
    redirect("/login");
  }

  const user = data.user;

  const handleSubmit = async (formData: FormData) => {
    "use server";
    
    const imageFile = formData.get("profilePhoto") as File;
    const description = formData.get("description") as string;
    const accountType = formData.get("accountType") as string;

    let imageUrl = "";

    if (imageFile) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`public/${imageFile.name}`, imageFile);

      if (error) {
        console.error("Error uploading file:", error);
        return;
      }

      imageUrl = data.path;
    }

    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        image_url: imageUrl,
        description,
        account_type: accountType,
      });

    if (error) {
      console.error("Error updating profile:", error);
      return;
    }

    redirect("/dashboard"); // redirect to user's dashboard or some other route
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground" action={handleSubmit}>
        <label className="text-md" htmlFor="profilePhoto">
          Profile Photo
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="file"
          name="profilePhoto"
        />
        <label className="text-md" htmlFor="description">
          Description
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="description"
          placeholder="Tell us about yourself"
          required
        />
        <label className="text-md" htmlFor="accountType">
          Account Type
        </label>
        <select
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="accountType"
        >
          <option value="renter">Renter</option>
          <option value="landlord">Landlord</option>
        </select>
        <SubmitButton
          className="bg-blue-700 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Setting up..."
        >
          Setup Profile
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}