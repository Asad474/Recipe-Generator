type MicroNutrients = {
  protein: string;
  fats: string;
  carbohydrates: string;
  calories: string;
};

type RecipeType = {
  title: string;
  ingredients: string[];
  steps: string[];
  micronutrients: MicroNutrients;
};
