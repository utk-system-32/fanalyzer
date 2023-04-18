import { FunctionComponent, useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { useRouter } from "next/router"
import SearchIcon from "../../../public/search.svg"
import Image from "next/image"

const SearchBar: FunctionComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postSearchResults, setPostSearchResults] = useState([]);
  const res = api.user.userSearch.useMutation();
  const postRes = api.post.postSearch.useMutation();
  const router = useRouter();

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      const getSearchResults = async () => {
        const response = await res.mutateAsync(searchQuery);
        const postResponse = await postRes.mutateAsync(searchQuery);
        setSearchResults(response);
        setPostSearchResults(postResponse);
      };

      getSearchResults();
    } else {
      setSearchResults([]);
      setPostSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      router.replace(`/explore/search/${searchQuery}`);
      setSearchResults([]);
      setPostSearchResults([]);
    } else {
      setSearchQuery(e.target.value);
    }
  };

  return (
    <div>
      <form className="flex flex-row">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          onKeyDown={handleSearch}
          onBlur={() => {setSearchResults([]); setPostSearchResults([]);}}
          className="w-[600px] p-4 text-sm text-black border-2 rounded-lg bg-white caret-black"
          placeholder="Search for users or posts..."
        />     
        <Image src={SearchIcon} alt="search icon" className="cursor-pointer ml-1" onClick={() => router.replace(`/explore/search/${searchQuery}`)}></Image>
      </form>
      {(searchResults.length > 0 || postSearchResults.length > 0) && (
        <div className="w-[600px] p-2 absolute z-50 text-black border-2 bg-white caret-black">
          <p className="font-bold">Users</p>
          {searchResults.map((item) => (
            <div key={item.id}>
              <button onMouseDown={() => router.push(`explore/${item.username}`)}>{item.username}</button>
            </div>
          ))}
          <p className="font-bold">Posts</p>
          {postSearchResults.map((item) => (
            <div key={item.id}>
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
