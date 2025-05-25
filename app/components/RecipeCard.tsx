import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import RecipeDialog from "./RecipeDialog";

type RecipeCardProps = {
  recipe: RecipeType;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="w-100 flex flex-col justify-between">
        <CardHeader>
          <CardTitle className="text-lg">{recipe.title}</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-wrap gap-2">
          <Badge variant="outline" className="p-2">
            Protein: {recipe.micronutrients.protein}
          </Badge>
          <Badge variant="outline" className="p-2">
            Carbs: {recipe.micronutrients.carbohydrates}
          </Badge>
          <Badge variant="outline" className="p-2">
            Fats: {recipe.micronutrients.fats}
          </Badge>
          <Badge variant="outline" className="p-2">
            Calories: {recipe.micronutrients.calories}
          </Badge>
        </CardContent>

        <Button onClick={() => setOpen(true)} className="m-4 cursor-pointer">
          View Recipe
        </Button>
      </Card>

      <RecipeDialog open={open} onOpenChange={setOpen} recipe={recipe} />
    </>
  );
};

export default RecipeCard;
