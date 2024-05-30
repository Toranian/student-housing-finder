"use client";

import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import AuthButton from "@/components/AuthButton";
import Logo from "@/components/Logo";

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
  const [isFurnished, setIsFurnished] = useState<boolean>(false);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

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
            is_furnished: isFurnished,
            is_available: isAvailable,
          },
        ]);

      if (error) {
        throw error;
      }

      console.log("Data inserted:", data);
      setPrice("");
      setPhotos(null);
      setStartDate("");
      setEndDate("");
      setAddress("");
      setDescription("");
      setNumBedrooms("");
      setIsFurnished(false);
      setIsAvailable(false);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };
  const inputStyle = {
    border: "1px solid black",
    borderRadius: "5px", // Rounded corners
    padding: "12px", // Increased padding
    marginBottom: "15px", // Increased margin bottom
    width: "100%",
    maxWidth: "90vw", // Maximum width
    fontSize: "1.1rem", // Increased font size
  };

  const labelStyle = {
    display: "block",
    marginBottom: "10px", // Increased margin bottom
    fontWeight: "bold",
    fontSize: "1.2rem", // Increased font size
  };

  const checkboxStyle = {
    margin: "15px", // Increased margin right
    transform: "scale(1.5)", // Scale the checkbox
    transformOrigin: "bottom left", // Adjust origin if necessary
  };

  return (
    <div>
      <h1
        style={{
          fontSize: "2.3rem",
          fontWeight: "bold",
          margin: "40px",
          borderBottom: "1px solid grey",
          paddingBottom: "10px",
        }}
      >
        Create your housing post
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center align the form items
        }}
      >
        <div style={{ width: "100%", maxWidth: "90vw" }}>
          <label htmlFor="address" style={labelStyle}>
            Address:
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={{ width: "100%", maxWidth: "90vw" }}>
          <label htmlFor="price" style={labelStyle}>
            Monthly Rent:
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={{ width: "100%", maxWidth: "90vw" }}>
          <label htmlFor="startDate" style={labelStyle}>
            Start Date:
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={{ width: "100%", maxWidth: "90vw" }}>
          <label htmlFor="endDate" style={labelStyle}>
            End Date:
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={{ width: "100%", maxWidth: "90vw" }}>
          <label htmlFor="numBedrooms" style={labelStyle}>
            Number of Bedrooms:
          </label>
          <input
            type="number"
            id="numBedrooms"
            value={numBedrooms}
            onChange={(e) => setNumBedrooms(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={{ width: "100%", maxWidth: "90vw" }}>
          <label htmlFor="isFurnished" style={labelStyle}>
            Is your place Furnished?
          </label>
          <input
            type="checkbox"
            id="isFurnished"
            checked={isFurnished}
            onChange={(e) => setIsFurnished(e.target.checked)}
            style={checkboxStyle}
          />
        </div>
        <div style={{ width: "100%", maxWidth: "90vw" }}>
          <label htmlFor="isAvailable" style={labelStyle}>
            Is your place Available?
          </label>
          <input
            type="checkbox"
            id="isAvailable"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
            style={checkboxStyle}
          />
        </div>
        <div style={{ width: "100%", maxWidth: "90vw" }}>
          <label htmlFor="description" style={labelStyle}>
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ ...inputStyle, height: "100px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            fontSize: "1.2rem",
            fontWeight: 700,
            padding: "10px 20px",
            border: "2px solid black",
            borderRadius: "10px",
            margin: "15px",
            marginBottom: "30px",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Page;
