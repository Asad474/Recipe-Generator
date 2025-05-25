"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import RecipeCard from "./components/RecipeCard";
import Loader from "@/components/loader/loader";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [ingredients, setIngredients] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const recipesPerPage = 6;
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const fetchAIResponse = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/generateRecipe`, {
        params: { ingredients },
      });

      let aiRes: string = response.data.kwargs.content;

      // Clean up markdown formatting (```json ... ```)
      aiRes = aiRes.trim();
      if (aiRes.startsWith("```json")) {
        aiRes = aiRes
          .replace(/^```json/, "")
          .replace(/```$/, "")
          .trim();
      } else if (aiRes.startsWith("```")) {
        aiRes = aiRes.replace(/^```/, "").replace(/```$/, "").trim();
      }

      const recipeData: RecipeType[] = JSON.parse(aiRes);
      setRecipes(recipeData);
      setCurrentPage(1);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err);

        if (err.response?.status === 429) {
          alert("Too many requests. Please try again after a while.");
        } else {
          alert("Something went wrong.");
        }
      } else {
        console.error("Unexpected error:", err);
        alert("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchAIResponse();
  };

  // Slice recipes for current page
  const indexOfLast = currentPage * recipesPerPage;
  const indexOfFirst = indexOfLast - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirst, indexOfLast);

  return (
    <div className="my-10 flex flex-col gap-4 mx-6 md:mx-24">
      <h1 className="text-center text-4xl">Recipe Generator</h1>

      <div className="my-6">
        <form action="" className="flex justify-center" onSubmit={formHandler}>
          <div className="relative w-full">
            <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Type ingredients like 'chicken, rice, spinach'..."
              className="pl-12 rounded-none rounded-l-md h-10"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </div>
          <Button className="rounded-none cursor-pointer rounded-e-md h-10">
            Search
          </Button>
        </form>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center gap-2 mt-6">
          <Loader />
          <p>Loading Recipes...</p>
        </div>
      ) : (
        <>
          <div className="mb-6 flex justify-center gap-y-4 gap-x-4 flex-wrap">
            {currentRecipes.map((recipe, index) => (
              <RecipeCard recipe={recipe} key={index} />
            ))}
          </div>

          {/* Pagination Controls */}
          {recipes.length > recipesPerPage && (
            <div className="flex justify-center items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="cursor-pointer"
              >
                Previous
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="cursor-pointer"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
