"use client";
import { useState } from "react";
import PostCard from "./PostCard";

interface ListingsPageProps {
  posts: any[] | null;
}

export default function ListingsPage({ posts }: ListingsPageProps) {
  const placeholder = "Enter a house address."
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="w-full ">
      <div className="w-full flex justify-center items-center flex-col mt-2">
      <input
        type="text"
        placeholder={placeholder}
        className="px-2.5 border-solid border-2 bg-zinc-100 border-zinc-400 rounded-lg py-1.5 focus:outline-none"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <p className="flex flex-row gap-1">I'm looking for a place for <span className="bg-pink-200 border-solid border-[1px] border-pink-400 px-1 py-0.5 rounded-lg text-pink-600 font-semibold text-sm w-6 flex justify-center items-center">6</span> months</p>
      </div>


      <div className="flex flex-col  md:grid md:grid-cols-3 md:grid-rows-3 gap-6 p-4">
        {posts?.filter((post) => post.location.toLowerCase().includes(searchValue.toLowerCase())).map((post, index) => (
          <PostCard
            price={post.price}
            location={post.location}
            rent_start={post.rent_start}
            rent_end={post.rent_end}
            image_url={post.image}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
