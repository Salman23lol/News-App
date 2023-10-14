import React, { useEffect, useState } from 'react';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const apiKey = '67b0b3f0eb784c449d16fd3917ef4bc9';
  const pageSize = 50;

  useEffect(() => {
    async function fetchArticles() {
      const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&pageSize=${pageSize}&q=${searchQuery}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.articles) {
          setArticles(data.articles);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchArticles();
  }, [searchQuery]);

  

  return (
    <div className="bg-gray-600 text-center p-4">
      <div className="my-4">
        <input
          type="text"
          placeholder="Search for articles"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 rounded bg-white outline-none p-2 pl-3"
        />
        
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <div key={index} className="bg-white shadow-md rounded p-4 flex flex-col items-center">
            <h2 className="text-xl font-bold my-2">{article.title}</h2>
            <img src={article.urlToImage} alt={article.title} className="mt-2" />
            <p className="text-gray-700 mt-2 font-semibold my-8 text-md">{article.content}</p>
            <p className="text-gray-700 w-64">{article.description}</p>
            <p className="text-gray-500 mt-14">{article.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
