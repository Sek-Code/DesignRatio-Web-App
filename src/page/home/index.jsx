import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export default function HomeScreen() {
  const [api, setApi] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">HELLO SEKCODE</h1>

      <div className="mt-4 flex gap-2">
        <Button variant="outline" onClick={() => api?.scrollPrev()}>
          Prev
        </Button>
        <Button onClick={() => api?.scrollNext()}>
          Next
        </Button>
      </div>

      <div className="mt-6 max-w-xl">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {[1, 2, 3].map((n) => (
              <CarouselItem key={n}>
                <div className="rounded-xl border p-10 text-center">
                  Slide {n}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
