export interface AwardCategory {
  category_id: number;
  category_title: string;
  description: string;
  priority: number;
  nominees: Nominees[];
}

export interface Nominees {
  nominee_id: number;
  nominee: string;
}

export interface AwardCategoriesResponse {
  categories: AwardCategory[];
}
