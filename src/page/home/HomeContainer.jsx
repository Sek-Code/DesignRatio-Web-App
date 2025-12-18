import { useEffect, useState } from "react";

export default function HomeContainer() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);

  const slides = [
    { title: "Slide 1", desc: "HELLO SEKCODE #1" },
    { title: "Slide 2", desc: "HELLO SEKCODE #2" },
    { title: "Slide 3", desc: "HELLO SEKCODE #3" },
  ];

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleNext = () => api?.scrollNext();
  const handlePrev = () => api?.scrollPrev();
  const handleGoTo = (index) => api?.scrollTo(index);

  return {
    slides,
    current,
    count,
    setApi,
    handleNext,
    handlePrev,
    handleGoTo,
  };
}
