import { useHits, useSearchBox } from "react-instantsearch-hooks-web";
import Image from "next/image";

type Hit = {
  objectID: string;
  name: string;
  image_url: string;
};

const Hits = () => {
  const { isSearchStalled } = useSearchBox();
  const { hits } = useHits<Hit>();

  if (isSearchStalled) {
    return <div>Loading...</div>;
  }

  const handleRemoveHit = async (objectId: string) => {
    const res = await fetch("/api/object", {
      method: "DELETE",
      body: JSON.stringify({ objectId }),
    });
    const { error } = await res.json();

    if (error) {
      console.error(error);
      return;
    }

    // TODO: Remove hit from list
  };

  return (
    <div>
      {hits.map((hit) => (
        <div key={hit.objectID}>
          <h2>{hit.name}</h2>
          <Image src={hit.image_url} width={200} height={200} alt="" />
          <button onClick={() => handleRemoveHit(hit.objectID)}>DELETE</button>
        </div>
      ))}
    </div>
  );
};

export default Hits;
