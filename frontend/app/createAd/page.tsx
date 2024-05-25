"use client";

import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const supabase = createClient();

  const [userID, setUserID] = useState<string>();
  const [price, setPrice] = useState<number | string>("");
  const [photos, setPhotos] = useState<FileList | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [numBedrooms, setNumBedrooms] = useState<number | string>("");
  //const [propertyType, setPropertyType] = useState<string>("");
  const [isFurnished, setIsFurnished] = useState<boolean>(false);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  //const [amenities, setAmenities] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserID(user?.id);
    };
    getData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Upload photos to Supabase Storage
      let photoUrls: string[] = [];
      if (photos) {
        for (let i = 0; i < photos.length; i++) {
          const file = photos[i];
          const { data, error } = await supabase.storage
            .from("photos") // Replace with your storage bucket name
            .upload(`public/${file.name}`, file);
          if (error) {
            throw error;
          }
          const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${data.path}`;
          photoUrls.push(url);
        }
      }

      // Insert form data into the database
      const { data, error } = await supabase
        .from("posts") // Replace with your table name
        .insert([
          {
            owner_id: userID,
            price,
            location: address,
            rent_start: startDate,
            rent_end: endDate,
            description,
            num_bedrooms: parseInt(numBedrooms as string, 10),
            //property_type: propertyType,
            is_furnished: isFurnished,
            //amenities,
            is_available: isAvailable,
          },
        ]);

      if (error) {
        throw error;
      }

      console.log("Data inserted:", data);
      // Reset form or show a success message
      setPrice("");
      setPhotos(null);
      setStartDate("");
      setEndDate("");
      setAddress("");
      setDescription("");
      setNumBedrooms("");
      //setPropertyType("");
      setIsFurnished(false);
      //setAmenities("");
      setIsAvailable(false);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  return (
    <div>
      <h1>Create your post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Monthly Rent:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        {/* <div>
          <label htmlFor="propertyType">Property Type:</label>
          <textarea
            id="propertyType"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            required
          />
        </div> */}
        <div>
          <label htmlFor="numBedrooms">Number of Bedrooms:</label>
          <input
            type="number"
            id="numBedrooms"
            value={numBedrooms}
            onChange={(e) => setNumBedrooms(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="isFurnished">Furnished?:</label>
          <input
            type="checkbox"
            id="isFurnished"
            checked={isFurnished}
            onChange={(e) => setIsFurnished(e.target.checked)}
          />
        </div>
        <div>
          <label htmlFor="isAvailable">Available?:</label>
          <input
            type="checkbox"
            id="isAvailable"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
          />
        </div>
        {/* <div>
          <label htmlFor="amenities">Amenities:</label>
          <textarea
            id="amenities"
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
            required
          />
        </div> */}
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Page;
