import React from "react";
import Card from "../../Components/Card/Card";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getArticles } from "../../redux/articles/articleReducer";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const { articles } = useSelector((state) => ({
    ...state.articleReducer,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    if (articles.length === 0) {
      dispatch(getArticles());
    }
  }, [articles.length, dispatch]);
  return (
    <>
      <h1 className="home-title">Tous les articles</h1>
      <div className="container-cards">
        {articles.map((item) => {
          return (
            <Card key={uuidv4()}>
              <h2>{item.title}</h2>

              <Link
                to={`articles/${item.title.replace(/\s+/g, "-").trim()}`}
                state={{ title: item.title, body: item.body }}
              >
                Lire l'article
              </Link>
            </Card>
          );
        })}
      </div>
    </>
  );
}
