import Search from "@/components/Search";
import Filters from "@/components/Filters";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className="title">Find your next dining experience</h1>
      <Search />
      <Filters />
    </header>
  );
};

export default Header;
