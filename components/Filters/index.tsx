import { useState } from "react";
import { useRefinementList } from "react-instantsearch-hooks-web";
import cx from "classnames";

import styles from "./Filters.module.css";

const FILTER_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
    />
  </svg>
);

const Filters = () => {
  const { items, refine } = useRefinementList({ attribute: "food_type" });
  const [showFilters, setShowFilters] = useState(false);

  return (
    <section className={styles.filters}>
      <div className="desktop">
        {items.map((item) => (
          <button
            className={cx(styles.filter, { [styles.active]: item.isRefined })}
            key={item.label}
            onClick={(e) => refine(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mobile">
        <button
          className={styles.filtersToggle}
          onClick={() => setShowFilters(!showFilters)}
        >
          Cuisines
          {FILTER_ICON}
        </button>
        {showFilters && (
          <div className={styles.filterList}>
            {items.map((item) => (
              <button
                className={cx(styles.filter, {
                  [styles.active]: item.isRefined,
                })}
                key={item.label}
                onClick={(e) => refine(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Filters;
