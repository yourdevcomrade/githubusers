import { createContext, useState, useEffect } from "react";
import mockUser from "./Data/user";
import mockFollowers from "./Data/followers";
import axios from "axios";

export const GithubContext = createContext();
const baseUrl = "https://api.github.com";

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [followers, setFollowers] = useState(mockFollowers);
  const [requests, setRequests] = useState(0);
  const [error, setError] = useState({ show: false, msg: "" });
  const [isLoading, setIsLoading] = useState(false);

  const searchUser = async (user) => {
    const url = `${baseUrl}/users/${user}`;
    setIsLoading(true);

    // console.log(user);
    // fetch request to the userurl based on wha the user types
    const { data } = await axios(url);

    if (data) {
      // setup user
      setGithubUser(data);
      const { followers_url } = data;
      const { data: followData } = await axios(`$(followers_url)?per_page=100`);
      setFollowers(followData);
    } else {
      //display error
      setError({ show: true, msg: "There is no user with that name" });
    }

    // fetch request to the user followers
    setIsLoading(false);
    checkReq();
    // address any error
  };

  const checkReq = async () => {
    try {
      const {
        data: {
          rate: { remaining },
        },
      } = await axios(`${baseUrl}/rate_limit`);
      setRequests(remaining);

      if (remaining === 0) {
        setError({ show: true, msg: "Hourly rate limit exceeded" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkReq();
  }, []);

  return (
    <GithubContext.Provider
      value={{ githubUser, followers, requests, error, isLoading, searchUser }}
    >
      {children}
    </GithubContext.Provider>
  );
};
export default GithubProvider;
