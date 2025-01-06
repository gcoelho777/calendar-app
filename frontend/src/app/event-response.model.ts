export interface EventResponse {
    current_page: number;
    data: any[];
    first_page_url: string;
    from: number | null;
    last_page: number; 
    last_page_url: string; 
    links: any[]; 
    next_page_url: string | null; 
    path: string; 
    per_page: number; 
    to: number | null;
    total: number;
}