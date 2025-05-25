import { NextRequest, NextResponse } from "next/server";
import { chatModel } from "@/lib/generateRecipe";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const ingredients: string = searchParams.get("ingredients") || "";

  const messages = [
    new SystemMessage(
      `You are a helpful recipe assistant. Always respond with a JSON array of recipes for the given ingredients. Generate 25-30 recipes.
       Each recipe must include:
        - title: string
        - ingredients: string[]
        - steps: string[]
        - micronutrients: object with the following keys (all as strings):
          - protein (in grams)
          - carbohydrates (in grams)
          - fats (in grams)
          - calories (in kcal)

       Ensure all micronutrient values include units (e.g., "25g", "300kcal").`
    ),
    new HumanMessage(ingredients),
  ];

  const response = await chatModel.invoke(messages);
  return NextResponse.json(response);
};
