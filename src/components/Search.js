import React from "react";
import styles from "../styles/search.module.css";
import Card from "./Card";
import { FaSearch } from "react-icons/fa";

const Search = ({ data }) => {
  const { search, setSearch, setModal, datas } = data;
  const result = datas.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className={styles.search}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className={styles.searchIcon} />
      </div>
      <div className={styles.result}>
        {search &&
            (result.length > 0 ? (
            result.map((item) => {
                return <Card item={item} setModal={setModal} key={item.id} />;
            })) 
            : <h1 className={styles.loading}>No such match found</h1>
            )}
      </div>
    </div>
  );
};

export default Search;
