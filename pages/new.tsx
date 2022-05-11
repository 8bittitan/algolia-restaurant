import type { NextPage } from "next";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/router";

const NewPage: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data: Record<string, string> = {};

      formData.forEach((value, key) => {
        data[key] = value.toString();
      });

      const res = await fetch("/api/new", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        console.error("Request failed");
      }

      router.push("/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="addObjectForm" onSubmit={onSubmit}>
      <h1>Add a new restaurant</h1>
      <div>
        <label htmlFor="name">Name*</label>
        <input type="text" name="name" id="name" required />
      </div>
      <div>
        <label htmlFor="cuisine">Cuisine*</label>
        <input type="text" name="cuisine" id="cuisine" required />
      </div>
      <div>
        <label htmlFor="address">Address*</label>
        <input type="text" name="address" required />
      </div>
      <div>
        <label htmlFor="city">City*</label>
        <input type="text" name="city" required />
      </div>
      <div>
        <label htmlFor="state">State*</label>
        <input type="text" name="state" required />
      </div>
      <div>
        <label htmlFor="country">Country*</label>
        <input type="text" name="country" required />
      </div>
      <div>
        <label htmlFor="postal_code">Postal Code*</label>
        <input type="text" name="postal_code" required />
      </div>
      <div>
        <label htmlFor="phone">Phone*</label>
        <input type="text" name="phone" required />
      </div>
      <div>
        <label htmlFor="dining_style">Dinig Style*</label>
        <input type="text" name="dining_style" required />
      </div>
      <button disabled={loading}>
        {loading ? "Adding restaurant..." : "Add new restaurant"}
      </button>
    </form>
  );
};

export default NewPage;
