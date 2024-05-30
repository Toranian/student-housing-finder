import Link from "next/link";

interface PostCard {
  price: number;
  location: string;
  rent_start: string;
  rent_end: string;
  image_url: string;
  postID: number
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

export default function PostCard({
  price,
  location,
  rent_start,
  rent_end,
  image_url,
  postID
}: PostCard) {

	const months = monthsDifference(rent_start, rent_end)

  return (
    <div className="flex flex-col">
      <Link href={`/listings/${postID}`}>
        <img src={image_url} className="max-h-[200px] w-full bg-cover rounded-lg duration-200 hover:scale-[1.04] cursor-pointer ease-in-out" alt="" />
      </Link>
      <div className="flex row items-center justify-between pt-2">
        <p className="font-semibold font-lg">${price}</p>
        <p className="bg-pink-200 border-solid border-[1px] border-pink-400 px-1 py-0.5 rounded-lg text-pink-600 font-semibold text-sm min-w-[75px] flex justify-center items-center">
          {months} {months == 1 ? "Month" : "Months"}
        </p>
      </div>
      <p>{location}</p>
    </div>
  );
}
