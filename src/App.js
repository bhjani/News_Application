import "./styles.css";
import { useState, useEffect, useCallback, useRef } from "react";
import Card from "./components/card";

export default function App() {
  const inputRef = useRef(null);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const debounce = (fn) => {
    let timer = null;
    return (e) => {
      timer && clearTimeout(timer);
      timer = setTimeout(() => fn(e), 1000);
    };
  };

  const onSearchHandle = debounce((e) => {
    setSearch(e.target.value);
  });

  const onClickHandler = (_e) => {
    console.log("on click");
    setSearch("");
    inputRef.current.value = "";
  }

  const fetchData = useCallback(async (key) => {
    let data = [];
    if (key) {
      const res = await fetch(`http://localhost:4000/search/${key}`);
      data = await res.json();
      setData(data.articles);
    } else {
      const res = await fetch("http://localhost:4000/news");
      data = await res.json();
      setData(data.articles);
    }
  }, [search]);

  useEffect(() => {
    let key = search ? search : "";
    console.log("key-", key);
    fetchData(key);
  }, [fetchData, search]);

  const renderItems = () => {
    return data.map((item, index) => {
      const {author, title, description, url: pageUrl, urlToImage, publishedAt} = item;
      return (
        <Card key={`key ${index}`}>
          <h1>
            <b>{title}</b>
          </h1>
          <main className="item-container">
            <section>
              <img src={urlToImage} height="200px" width="250px" alt={`${title}_image`}/>
            </section>
            <aside>
              <p>{description}</p>
              <span><a href={pageUrl}>Read More</a></span>
              <p>{Date(publishedAt)}</p>
              <p>{author}</p>
            </aside>
          </main>
        </Card>
      )
    }
  )};

  return (
    <main>
      <section>
        <input ref={inputRef} type="text" onChange={onSearchHandle}></input>
        <button onClick={onClickHandler}>Reset Filter</button>
      </section>
      <section>{renderItems()}</section>
    </main>
  );
}