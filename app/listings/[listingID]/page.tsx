import AuthButton from "@/components/AuthButton";
import PostCard from "@/components/listings/PostCard";
import Logo from "@/components/Logo";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ListingsPage from "@/components/listings/ListingsPage";
import { useParams } from "next/navigation";

export default async function ListingDetail({
  params,
}: {
  params: { listingID: string };
}) {
  const id = params.listingID;

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: p } = await supabase.from("posts").select("*").eq("id", id);


  const post = p?.[0];
//   const {data: userEmail} = await supabase
//     .from('auth.users')
//     .select('email')
//     .eq('id', post.owner_id)
//     .single();

// 	console.log(userEmail)

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <Logo />
          <AuthButton />
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl">{post.location}</h1>
            <p>{post.description}</p>
            <a
              href="mailto:"
              className="px-3 py-1.5 bg-emerald-300 font-semibold hover:-translate-y-[2px] hover:shadow-md text-emerald-900 max-w-[120px] flex items-center justify-center rounded-lg duration-150 ease-in-out"
            >
              Contact
            </a>
          </div>

          <img
            className="rounded-xl shadow-sm max-w-[300px] md:max-w-[400px]"
            src={post.image}
            alt=""
          />
        </div>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            RedBull
          </a>
        </p>
      </footer>
    </div>
  );
}
