import AuthButton from "@/components/AuthButton";
import PostCard from "@/components/listings/PostCard";
import Logo from "@/components/Logo";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ListingsPage from "@/components/listings/ListingsPage";

export default async function ListingsPageServer() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: posts } = await supabase.from("posts").select();


  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 mb-8">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <Logo />
          <AuthButton />
        </div>
      </nav>

      <h1 className="text-xl md:text-2xl font-semibold">Available Listings</h1>

	  <ListingsPage posts={posts}/>
    </div>
  );
}
