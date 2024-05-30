"use client";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";

interface ListingsPageProps {
  posts: any[] | null;
}

function monthsDifference(dateStr1: string, dateStr2: string): number {
  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);

  const year1 = date1.getFullYear();
  const year2 = date2.getFullYear();
  const month1 = date1.getMonth();
  const month2 = date2.getMonth();

  const yearDiff = year2 - year1;
  const monthDiff = month2 - month1;

  // Calculate total months difference
  const totalMonths = yearDiff * 12 + monthDiff;

  return totalMonths;
}

export default function ListingsPage({ posts }: ListingsPageProps) {
  const placeholder = "Enter a house address.";
  const [searchValue, setSearchValue] = useState("");
  const [monthCount, setMonthCount] = useState(-1);
  const [filterMonth, setFilterMonth] = useState(-1);
  const [listingPosts, setListingPosts] = useState(posts )


  useEffect(() => {console.log(filterMonth)}, [filterMonth])

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
        <p className="flex flex-row gap-1 mt-2">
          I'm looking for a place for{" "}
          <input
            className="bg-pink-200 border-solid border-[1px] border-pink-400 px-1 py-0.5 rounded-lg text-pink-600 font-semibold text-sm w-8 flex justify-center items-center"
            type="text"
            onChange={(e) => setMonthCount(Number(e.target.value))}
            onBlur={() => setFilterMonth(monthCount)}
          />
          months
        </p>
      </div>

      <div className="flex flex-col  md:grid md:grid-cols-3 md:grid-rows-3 gap-6 p-4">
        {posts
          ?.filter(
            (post) =>
              post.location.toLowerCase().includes(searchValue.toLowerCase()) 
          )         .map((post, index) => (
            <PostCard
              price={post.price}
              location={post.location}
              rent_start={post.rent_start}
              rent_end={post.rent_end}
              image_url={post.image}
              key={index}
              postID={post.id}
            />
          ))}
      </div>
    </div>
  );
}
