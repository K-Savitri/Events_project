import { useState } from "react";

interface SearchEventProps {
    onSearch: (query: string) => void;

  }


  const SearchEvent: React.FC<SearchEventProps> = ( {onSearch}) => {

    const [searchText, setSearchText] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchText(query);
        onSearch(query);
        
      };


    return(
        <>

        <input type="text" 
        placeholder="Search events/organizers..."
      className="search-inp"
        value={searchText}
      onChange={handleChange} 
      
      name="" id="" />
        </>
    )
}

export default SearchEvent;


