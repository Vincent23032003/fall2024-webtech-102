"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../supabaseClient";
import { User } from "@supabase/supabase-js";
import WysiwygEditor from "../../../components/WysiwygEditor";

export default function NewArticlePage() {
  const [user, setUser] = useState<User | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [textSizeDropdownVisible, setTextSizeDropdownVisible] = useState(false);


  const handleToggleTextSize = () => {
    setTextSizeDropdownVisible(!textSizeDropdownVisible);
  };


  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("User recovery error :", error.message);
        setUser(null);
      } else {
        setUser(user);
      }
    };

    checkUser();
  }, []);

  const handleCreateArticle = async () => {
    if (!title || !description) {
      setError("Please complete all fields.");
      return;
    }

    if (title.length > 255) {
      setError("The title must not exceed 255 characters.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      if (!user) {
        throw new Error("User not logged in.");
      }

      const createdDate = new Date().toISOString();

      const { data, error } = await supabase
        .from("articles")
        .insert({
          title,
          description,
          authorid: user.id,
          created_date: createdDate,
          likes: 0,
          comments: [],
        })
        .select();

      if (error) {
        if (error.details && error.details.includes("value too long for type")) {
          setError("The title is too long. Please limit to 255 characters.");
          return;
        }
        throw error;
      }

      if (data) {

        router.push("/blog");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {

        setError(err.message || "Error when creating the article.");
      } else {
        setError("An unexpected error has occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto h-screen">
      <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white">Create a new article</h2>
      <WysiwygEditor />
    </main>
  );
}
