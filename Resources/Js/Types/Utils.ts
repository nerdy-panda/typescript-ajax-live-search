type Product = {
    title : string , describe : string , thumbnail : string | null , created_at : string 
};
type SearchResponse = {
    count : number , products : Product[]
};

export {
    Product , SearchResponse
};