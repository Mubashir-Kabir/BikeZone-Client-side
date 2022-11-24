import React from "react";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const items = [
    {
      id: 1,
      title: "Pulser NS 160cc",
      price: {
        original: 190000,
        resale: 150000,
      },
      condition: "food",
      seller: {
        sellerID: 2, //seller name, pic hoile valo,seller varified kina,
      },
      number: "017723452345",
      location: "Dhaka",
      info: "this is good condition bike. nothing serious happened.i only hit the bike twice.but i repair imidiet after hitting.",
      purchaseYear: "2018",
      sold: false,
      image:
        "https://www.banglamotor.net/images/bajaj/bajaj-pulsar-ns160-img01.jpg",
      postTime: "22-11-2022",
    },
    {
      id: 2,
      title: "Pulser NS 160cc",
      price: {
        original: 190000,
        resale: 150000,
      },
      condition: "food",
      seller: {
        sellerID: 2, //seller name, pic hoile valo,seller varified kina,
      },
      number: "017723452345",
      location: "Dhaka",
      info: "this is good condition bike. nothing serious happened.i only hit the bike twice.but i repair imidiet after hitting.",
      purchaseYear: "2018",
      sold: false,
      image:
        "https://www.banglamotor.net/images/bajaj/bajaj-pulsar-ns160-img01.jpg",
      postTime: "22-11-2022",
    },
    {
      id: 3,
      title: "Pulser NS 160cc",
      price: {
        original: 190000,
        resale: 150000,
      },
      condition: "food",
      seller: {
        sellerID: 2, //seller name, pic hoile valo,seller varified kina,
      },
      number: "017723452345",
      location: "Dhaka",
      info: "this is good condition bike. nothing serious happened.i only hit the bike twice.but i repair imidiet after hitting.",
      purchaseYear: "2018",
      sold: false,
      image:
        "https://www.banglamotor.net/images/bajaj/bajaj-pulsar-ns160-img01.jpg",
      postTime: "22-11-2022",
    },
  ];
  return (
    <div className="lg:mx-40 lg:my-10">
      <div className="grid gap-8">
        {items.map((item) => (
          <ProductCard key={item.id} item={item}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Products;
