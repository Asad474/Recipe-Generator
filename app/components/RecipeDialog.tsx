import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

type RecipeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipe: RecipeType;
};

const RecipeDialog = ({ open, onOpenChange, recipe }: RecipeDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl overflow-auto w-5/6">
        <DialogHeader>
          <DialogTitle>{recipe.title}</DialogTitle>
          <DialogDescription>
            A complete breakdown of ingredients, steps, and nutrition.
          </DialogDescription>
        </DialogHeader>

        <div className="mb-3">
          <h3 className="font-semibold mb-1">Ingredients:</h3>
          <div className="flex flex-wrap gap-2">
            {recipe.ingredients.map((ingredient, i) => (
              <Badge key={i} variant="secondary">
                {ingredient}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <h3 className="font-semibold mb-1">Steps:</h3>
          <ol className="list-decimal ml-5 space-y-1">
            {recipe.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="font-semibold mb-1">Micronutrients:</h3>
          <ul className="ml-5 list-disc space-y-1">
            <li>Protein: {recipe.micronutrients.protein}</li>
            <li>Carbohydrates: {recipe.micronutrients.carbohydrates}</li>
            <li>Fats: {recipe.micronutrients.fats}</li>
            <li>Calories: {recipe.micronutrients.calories}</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDialog;
