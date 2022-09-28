export type OstfaliaApiMenuItem = {
  id: number;
  date: string;
  name: string;
  price: {
    student: string;
    employee: string;
    guest: string;
  },
  nutritional_values: {
    per_100_grams: {
      caloric_value: string,
      fat: string,
      saturated_fatty_acids: string,
      carbohydrates: string,
      sugar: string,
      roughage: string,
      protein: string,
      salt: string,
    }
  },
  time: 'noon',
  lane: {
    id: number,
    name: string,
  },
  tags: {
    categories: {
      id: string,
      name: string,
    }[],
  }
}

export type OstfaliaApiMenu = {
  announcements: any[];
  meals: OstfaliaApiMenuItem[];
}

export type OstfaliaApiMenuLane = {
  id: number;
  name: string;
  items: OstfaliaApiMenuItem[];
}