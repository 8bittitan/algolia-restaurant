import type { NextPage } from "next";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/router";

import Input from "@/components/Input";
import Link from "next/link";

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
      <p>
        Don&apos;t need to add one?{" "}
        <Link href="/">
          <a>Search for one here</a>
        </Link>
      </p>
      <Input name="name" label="Name*" />
      <Input name="cuisine" label="Cuisine*" />
      <Input name="address" label="Address*" />
      <Input name="city" label="City*" />
      <Input name="state" label="State*" />
      <Input name="postal_code" label="Zip Code*" />
      <Input name="country" label="Country*" />
      <Input name="phone" label="Phone*" />
      <Input name="dining_style" label="Dining Style*" />
      <button disabled={loading}>
        {loading ? "Adding restaurant..." : "Add new restaurant"}
      </button>
    </form>
  );
};

export default NewPage;
