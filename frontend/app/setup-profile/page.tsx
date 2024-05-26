"use client";

import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import AuthButton from "@/components/AuthButton";
import Logo from "@/components/Logo";
import { useRouter } from "next/router";

const Page = () => {
  const supabase = createClient();

  const [userID, setUserID] = useState<string>();
  const [name, setName] = useState<string>("");
  //const [photo, setPhoto] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [nightOwl, setNightOwl] = useState<boolean>(false);
  const [earlyBird, setEarlyBird] = useState<boolean>(false);
  const [comfortableWithPets, setComfortableWithPets] =
    useState<boolean>(false);
  const [biking, setBiking] = useState<boolean>(false);
  const [climbing, setClimbing] = useState<boolean>(false);
  const [partying, setPartying] = useState<boolean>(false);
  const [accountType, setAccountType] = useState<boolean>(false);

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
      const { data, error } = await supabase
        .from("profiles") // Replace with your table name
        .insert([
          {
            user_id: userID,
            display_name: name,
            //image_url: photo,
            description,
            lifestyle_night_owl: nightOwl,
            lifestyle_early_bird: earlyBird,
            lifestyle_pets_ok: comfortableWithPets,
            hobbies_biking: biking,
            hobbies_climbing: climbing,
            hobbies_partying: partying,
            account_type: accountType,
          },
        ]);

      if (error) {
        throw error;
      }

      console.log("Data inserted:", data);
      setName("");
      // setPhoto("");
      setDescription("");
      setNightOwl(false);
      setEarlyBird(false);
      setComfortableWithPets(false);
      setBiking(false);
      setClimbing(false);
      setPartying(false);
      setAccountType(false);
    } catch (error) {
      console.error("Error inserting data:", error);
    }

    
    if (accountType) {
      window.location.href = "/createAd";
    } else {
      window.location.href = "/listings";
    }

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
        Create your profile
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: "90vw" }}>
          <label htmlFor="name" style={labelStyle}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        {/* <div style={{ width: "100%", maxWidth: "90vw" }}>
          <label htmlFor="photo" style={labelStyle}>
            Photo URL:
          </label>
          <input
            type="text"
            id="photo"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            required
            style={inputStyle}
          />
        </div> */}
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
        <h2
          style={{ fontSize: "1.8rem", fontWeight: "bold", margin: "20px 0" }}
        >
          Lifestyle
        </h2>
        <div style={{ width: "100%", maxWidth: "90vw" }}>
          <label htmlFor="nightOwl" style={labelStyle}>
            Night Owl:
          </label>
          <input
            type="checkbox"
            id="nightOwl"
            checked={nightOwl}
            onChange={(e) => setNightOwl(e.target.checked)}
            style={checkboxStyle}
          />
        </div>
        <div style={{ width: "100%", maxWidth: "90vw" }}>
          <label htmlFor="earlyBird" style={labelStyle}>
            Early Bird:
          </label>
          <input
            type="checkbox"
            id="earlyBird"
            checked={earlyBird}
            onChange={(e) => setEarlyBird(e.target.checked)}
            style={checkboxStyle}
          />
        </div>
        <div style={{ width: "100%", maxWidth: "90vw" }}>
          <label htmlFor="comfortableWithPets" style={labelStyle}>
            Comfortable with Pets?
          </label>
          <input
            type="checkbox"
            id="comfortableWithPets"
            checked={comfortableWithPets}
            onChange={(e) => setComfortableWithPets(e.target.checked)}
            style={checkboxStyle}
          />
        </div>
        <h2
          style={{ fontSize: "1.8rem", fontWeight: "bold", margin: "20px 0" }}
        >
          Hobbies
        </h2>
        <div style={{ width: "100%", maxWidth: "90vw" }}>
          <label htmlFor="biking" style={labelStyle}>
            Biking:
          </label>
          <input
            type="checkbox"
            id="biking"
            checked={biking}
            onChange={(e) => setBiking(e.target.checked)}
            style={checkboxStyle}
          />
        </div>
        <div style={{ width: "100%", maxWidth: "90vw" }}>
          <label htmlFor="climbing" style={labelStyle}>
            Climbing:
          </label>
          <input
            type="checkbox"
            id="climbing"
            checked={climbing}
            onChange={(e) => setClimbing(e.target.checked)}
            style={checkboxStyle}
          />
        </div>
        <div style={{ width: "100%", maxWidth: "90vw" }}>
          <label htmlFor="partying" style={labelStyle}>
            Partying:
          </label>
          <input
            type="checkbox"
            id="partying"
            checked={partying}
            onChange={(e) => setPartying(e.target.checked)}
            style={checkboxStyle}
          />
        </div>
        <h2
          style={{ fontSize: "1.8rem", fontWeight: "bold", margin: "20px 0" }}
        >
          Account Type
        </h2>
        <div style={{ width: "100%", maxWidth: "90vw" }}>
          <label htmlFor="accountType" style={labelStyle}>
            Select:
          </label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="radio"
              id="renter"
              name="accountType"
              value="renter"
              checked={accountType === false}
              onChange={() => setAccountType(false)}
              style={{ display: "none" }}
            />
            <label
              htmlFor="renter"
              style={{
                marginRight: "20px",
                cursor: "pointer",
                fontSize: "1.2rem",
                padding: "8px 12px",
                border:
                  accountType === false
                    ? "2px solid black"
                    : "2px solid transparent",
                borderRadius: "5px",
              }}
              onClick={() => setAccountType(false)}
            >
              Renter
            </label>
            <input
              type="radio"
              id="landlord"
              name="accountType"
              value="landlord"
              checked={accountType === true}
              onChange={() => setAccountType(true)}
              style={{ display: "none" }}
            />
            <label
              htmlFor="landlord"
              style={{
                cursor: "pointer",
                fontSize: "1.2rem",
                padding: "8px 12px",
                border:
                  accountType === true
                    ? "2px solid black"
                    : "2px solid transparent",
                borderRadius: "5px",
              }}
              onClick={() => setAccountType(true)}
            >
              Landlord
            </label>
          </div>
        </div>

        <button
          type="submit"
          style={{
            fontSize: "1.2rem",
            fontWeight: 700,
            padding: "10px 20px",
            border: "2px solid black",
            borderRadius: "10px",
            marginTop: "15px",
            marginBottom: "35px",
          }}
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

const labelStyle = {
  display: "block",
  marginBottom: "10px",
  fontWeight: "bold",
  fontSize: "1.2rem",
};

const inputStyle = {
  border: "1px solid black",
  borderRadius: "5px",
  padding: "12px",
  marginBottom: "15px",
  width: "100%",
  maxWidth: "90vw",
  fontSize: "1.1rem",
};

const checkboxStyle = {
  margin: "10px",
  transform: "scale(1.5)",
  transformOrigin: "bottom left",
};

export default Page;