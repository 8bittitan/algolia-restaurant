import { useSearchBox } from "react-instantsearch-hooks-web";
import Image from "next/image";

import { useHitsApi as useHits } from "@/hooks/useHits";

import PriceDisplay from "@/components/PriceDisplay";
import Rating from "@/components/Rating";

import styles from "./Hits.module.css";

const DELETE_ICON = (
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
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const Hits = () => {
  const { isSearchStalled } = useSearchBox();
  const { hits, removeHit, isLastPage, showMore } = useHits();

  if (isSearchStalled) {
    return <div>Loading...</div>;
  }

  const handleRemoveHit = (objectId: string) => {
    if (confirm("Are you certain you want to remove that restaurant?")) {
      removeHit(objectId);
    }
  };

  return (
    <div>
      {hits.map((hit) => (
        <div key={hit.objectID} className={styles.hit}>
          <Image src={hit.image_url} width={150} height={150} alt="" />
          <div>
            <h2 className={styles.name}>
              {hit.name} - {hit.food_type}
            </h2>
            <Rating rating={hit.rounded_stars_count} />
            <PriceDisplay price={hit.price} />
          </div>
          <button
            data-testid="delete-hit"
            className={styles.delete}
            onClick={() => handleRemoveHit(hit.objectID)}
          >
            {DELETE_ICON}
          </button>
        </div>
      ))}
      {!isLastPage && (
        <button className={styles.more} onClick={showMore}>
          Show more
        </button>
      )}
    </div>
  );
};

export default Hits;
