import { FunctionComponent, useState, useEffect } from 'react';
import { api } from '../../utils/api'
import Link from "next/link";

// Need to fix: Search only works when you click submit button twice
// Thought issue was not waiting on res.mutate() but that might not be the issue
const SearchBar: FunctionComponent = () => { 
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const res = api.user.getUserByUsernameMut.useMutation();

  const handleSearch = async (e) => {
    e.preventDefault();
    res.mutate(searchQuery);
    setSearchResults(res.data);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-[600px] p-4 text-sm text-black border-2 rounded-lg bg-white caret-black" placeholder="Search for users or posts..."/>
      <button type="submit">Search</button>
      </form>
      {searchResults?.map((item) => (
      <div key={item.id}>
        <Link href={`explore/${item.username}`}>{item.username}</Link>
      </div>
      ))}
    </div>
  );
}

export default SearchBar