import { useRefinementList } from "react-instantsearch-hooks-web";

const Filters = () => {
  const { items, refine } = useRefinementList({ attribute: "food_type" });

  return (
    <div>
      {items.map((item) => (
        <button key={item.label} onClick={(e) => refine(item.value)}>
          {item.label} - {item.count}
        </button>
      ))}
    </div>
  );
};

export default Filters;
