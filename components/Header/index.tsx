import Link from "next/link";

import Search from "@/components/Search";
import Filters from "@/components/Filters";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className="title">Find your next dining experience</h1>
      <Search />
      <p className="mobile">
        Can&apos;t find the restaurant you&apos;re looking for?{" "}
        <Link href="/new">
          <a>Add one here</a>
        </Link>
      </p>
      <Filters />
    </header>
  );
};

export default Header;
