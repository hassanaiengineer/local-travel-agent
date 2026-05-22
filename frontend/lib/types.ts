export type ParsedQuery = {
  origin: string;
  destination: string;
  date: string;
  time_preference: "morning" | "afternoon" | "evening" | "night" | "any";
  budget_preference?: "cheapest" | "fastest" | "best" | "any";
};

export type BusOption = {
  option_id: string;
  service_name: string;
  class_name: string;
  departure_city: string;
  arrival_city: string;
  departure_time: string;
  arrival_time: string;
  departure_date: string;
  duration_minutes: number;
  duration_text: string;
  price_pkr: number;
  facilities: string[];
};

export type Recommendation = {
  summary: string;
  best_option_id?: string | null;
  cheapest_option_id?: string | null;
  fastest_option_id?: string | null;
};

export type SearchResponse = {
  success: boolean;
  query: string;
  parsed_query: ParsedQuery;
  recommendation: Recommendation;
  options: BusOption[];
  metadata: {
    total_options: number;
    source: string;
  };
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  result?: SearchResponse;
};
