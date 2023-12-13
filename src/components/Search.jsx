import { useState } from "react";
import "../styles/search.css";
import { MdSearch } from "react-icons/md";
import { useGlobalContext } from "../hooks/UseGlobalContext";

const Search = () => {
  const { error, requests, isLoading, searchUser } = useGlobalContext();
  const [user, setUser] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle user search
  };

  return (
    <section className="section">
      <div className="section-center search-card">
        {error.show && <div className="error-wrapper">{error.msg}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <MdSearch />
            <input
              type="text"
              placeholder="Enter Github user"
              onChange={(e) => setUser(e.target.value)}
            />
            {requests > 0 && !isLoading && (
              <button type="submit">Search</button>
            )}
          </div>
        </form>

        <h3 className="req">Requests: {`${requests}`}/60</h3>
      </div>
    </section>
  );
};

export default Search;
