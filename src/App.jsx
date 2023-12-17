// Import necessary hooks and axios for making API requests
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // Define state variables for news data and loading status
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  // Use the useEffect hook to fetch news data when the component mounts
  useEffect(() => {
    // Define an async function to fetch news data
    const fetchNews = async () => {
      // Set loading to true while fetching data
      setLoading(true);

      // Define the options for the axios request
      const options = {
        method: "GET",
        url: "https://imdb8.p.rapidapi.com/actors/get-all-news",
        params: {
          nconst: "nm0001667",
        },
        headers: {
          "X-RapidAPI-Key":
            "370eb49967msh45215489cd42f56p197cfdjsn2ac4e07ee917",
          "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
        },
      };
      try {
        // Make the axios request and store the response
        const response = await axios.request(options);
        // Set the news state variable to the fetched data
        setNews(response.data.items);
        // Set loading to false after fetching data
        setLoading(false);
      } catch (error) {
        // Log any errors that occur during the fetch
        console.error(error);
      }
    };

    // Call the fetchNews function
    fetchNews();
  }, []); // Empty dependency array means this effect runs once on mount

  // Show loading message while fetching data
  if (loading) {
    return <p>Loading...</p>;
  }

  // Render the fetched news data
  return (
    <div className="App">
      <h1>Actor News Fetcher APP</h1>
      {news.map((item, index) => (
        <div key={index} className="news-item">
          <h2>{item.head}</h2>
          <div>
            {/* Display the news image with a width and height of 200px */}
            <img
              src={item.image.url}
              alt={item.image.caption}
              width="200"
              height="200"
            />
          </div>
          <p>{item.body}</p>
          {/* Link to the full news article */}
          <a href={item.link}>Read more</a>
        </div>
      ))}
    </div>
  );
}

export default App;
