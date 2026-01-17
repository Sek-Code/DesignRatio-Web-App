import * as React from "react"
// 1. นำเข้า Component จากไฟล์ carousel.jsx ของคุณ (เช็ค path ให้ถูกนะครับ)
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel" // หรือ path ที่คุณเก็บไฟล์นั้นไว้


export default function HotTeaCarousel() {
  // 2. สร้างข้อมูลจำลอง (รูปภาพและชื่อชา)
  const teaProducts = [
    {
      id: 1,
      //name: "Classic Earl Grey",
      //desc: "ชาเอิร์ลเกรย์หอมกรุ่น",
      // image: "https://plus.unsplash.com/premium_photo-1661756522906-5df7ee690868?w=900&auto=format&fit=crop"
      image: "/img/1.png"
    },
    {
      id: 2,
      //name: "Organic Green Tea",
      //desc: "ชาเขียวออร์แกนิคแท้",
      // image: "https://images.unsplash.com/photo-1641997825980-cbaf406765db?w=900&auto=format&fit=crop"
      image: "/img/2.png"
    },
    {
      id: 3,
      //name: "Chamomile Soothing",
      //desc: "คาโมมายล์ช่วยผ่อนคลาย",
      // image: "https://plus.unsplash.com/premium_photo-1674406481284-43eba097a291?w=900&auto=format&fit=crop"
      image: "/img/3.png"
    },
    {
      id: 4,
      //name: "Hot Lemon Tea",
      //desc: "ชามะนาวร้อนแก้เจ็บคอ",
      // image: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=900&auto=format&fit=crop"
      image: "/img/4.png"
    },
  ]


  return (
    <div className="flex flex-col items-center justify-center w-full bg-white">

      {/* 4. เรียกใช้ Carousel */}
      <Carousel
        autoplay={true}
        className="w-full" // กำหนดความกว้างของ Carousel
      >
        <CarouselContent>
          {teaProducts.map((tea) => (
            <CarouselItem key={tea.id}>
              <div>
                {/* ส่วนการแสดงผลการ์ดสินค้า */}
                <div className="border-none shadow-lg overflow-hidden">

                  <div className="relative flex flex-col items-center justify-center overflow-hidden h-150">
                    <img
                        src={tea.image}
                        alt={tea.name}
                        className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* ปุ่มเลื่อนซ้ายขวา */}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}