// นำเข้า React เพื่อให้ใช้ JSX ได้ และนำเข้า useState สำหรับเก็บ state ใน component
import React, { useState } from "react";

// นำเข้าไอคอนจาก lucide-react เพื่อใช้เป็น React components (SVG icons)
import { Home, User, ShoppingCart, Menu, X } from "lucide-react";

// นำเข้าไฟล์รูปโลโก้จาก path alias (@/) เพื่อใช้เป็น src ของ <img />
import logoMark from "@/assets/img/Design-Ratio-logo.png";
// สร้าง array ของลิงก์เมนู
// label = ข้อความที่แสดง, href = ลิงก์ปลายทาง
const navLinks = [
  { label: "Blending", href: "#" }, // เมนู Blending ลิงก์ไปที่ #
  { label: "Product", href: "#" },  // เมนู Product ลิงก์ไปที่ #
  { label: "Contact", href: "#" },  // เมนู Contact ลิงก์ไปที่ #
];

// ประกาศ functional component ชื่อ Navbar
const Navbar = () => {
  // State สำหรับเปิด/ปิดเมนู Mobile (hamburger)
  const [open, setOpen] = useState(false);
  // open = ค่าปัจจุบัน, setOpen = ฟังก์ชันใช้เปลี่ยนค่า open
  // ค่าเริ่มต้น ให้ open เป็น false = ปิดเมนู
  return (

    <header className="relative bg-lightCream text-brown font-body shadow-sm">
      {/* header: ส่วนหัวของเว็บ
    // relative: ใช้กำหนดตำแหน่งอ้างอิงให้ element ลูก (ถ้าจำเป็น)
    // bg-lightCream: สีพื้นหลัง (custom tailwind color)
    // text-brown: สีตัวอักษรหลัก
    // font-body: ฟอนต์ body (ตามที่คุณตั้งใน index.css/tailwind theme)
    // shadow-sm: เงาเบาๆ */}
      {/* 
        กล่องครอบเนื้อหาหลักของ Navbar
        - mx-auto: จัดกึ่งกลางแนวนอน
        - grid max-w-6xl grid-cols-3: mobile ใช้ layout แบบ grid 3 คอลัมน์
        - items-center: จัดแนวให้ item อยู่กึ่งกลางแนวตั้ง
        - px-4 py-4: padding ซ้ายขวา/บนล่าง
        - sm:flex sm:justify-between: ตั้งแต่จอ sm ขึ้นไปเปลี่ยนเป็น flex และแยกซ้าย-ขวา
        - sm:px-6: เพิ่ม padding ซ้ายขวาเมื่อจอใหญ่ขึ้น
      */}
      <div className="mx-auto grid max-w-6xl grid-cols-3 items-center px-4 py-4 sm:flex sm:justify-between sm:px-6">
        {/* 
          โลโก้:
          - บน Mobile ให้อยู่ "กลางจอ" ด้วย grid (col-start-2 col-end-3)
          - บน Desktop (sm ขึ้นไป) กลับไปอยู่ซ้ายเหมือนปกติ
        */}
        <div className="col-start-2 col-end-3 flex items-center justify-center gap-2 sm:col-auto sm:justify-start sm:gap-3">
          {/* 
            <img> โลโก้
            src = รูปที่ import มา
            alt = ข้อความเผื่อรูปโหลดไม่ขึ้น + ช่วยเรื่อง accessibility
            className:
              - h-16 w-16: ขนาดโลโก้บน mobile
              - object-contain: รักษาสัดส่วนรูป ไม่บิด
              - drop-shadow-sm: เงาเบาๆให้รูปดูเด่น
              - sm:h-20 sm:w-20: ขยายขนาดบนจอใหญ่
          */}
          <img
            src={logoMark}
            alt="Design Ratio mark"
            className="h-16 w-16 object-contain drop-shadow-sm sm:h-20 sm:w-20"
          />
        </div>

        {/* 
          โซนปุ่ม hamburger:
          - ml-auto: ดันไปด้านขวาสุดใน grid
          - flex items-center justify-end gap-3: จัดไอคอนให้เรียงและชิดขวา
          - sm:hidden: ตั้งแต่จอ sm ขึ้นไป “ซ่อน” เพราะ desktop ไม่ใช้ hamburger
        */}
        <div className="ml-auto flex items-center justify-end gap-3 sm:hidden">
          {/* 
            ปุ่ม toggle เมนู
            type="button": กันไม่ให้ทำงานเป็น submit ถ้าอยู่ใน form
            aria-label: ช่วย screen reader บอกว่าปุ่มนี้ทำอะไร
            onClick: คลิกแล้วสลับค่า open (true<->false)
            className:
              - rounded-md p-2: ปุ่มขอบมน + padding
              - text-matcha: สีไอคอน/ข้อความในปุ่ม
              - transition hover:text-brown: hover เปลี่ยนสีแบบมี transition
              - focus-visible:outline...: ทำ outline ตอนโฟกัสด้วยคีย์บอร์ด (accessibility)
          */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)} // v คือค่าปัจจุบัน => กลับค่าเป็นตรงข้าม
            className="rounded-md p-2 text-matcha transition hover:text-brown focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-matcha"
          >
            {/* 
              ถ้า open = true แสดงไอคอน X (ปิด)
              ถ้า open = false แสดงไอคอน Menu (hamburger)
              size-5 = กำหนดขนาดไอคอน (Tailwind v3.4+ / หรือ custom)
            */}
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* 
          เมนู Desktop:
          - hidden: ซ่อนบน mobile
          - sm:flex: แสดงบน desktop
          - flex-1: กินพื้นที่ที่เหลือ เพื่อจัดกลางได้
          - items-center justify-center: จัด item ให้อยู่กึ่งกลาง
          - gap-8: ระยะห่างระหว่างลิงก์
          - text-[15px] font-semibold: ขนาดตัวอักษรและความหนา
          - text-matcha: สีข้อความเมนู
        */}
        <nav className="hidden flex-1 items-center justify-center gap-8 text-[15px] font-semibold text-matcha sm:flex">
          {/* 
            ลิงก์ Home บน Desktop
            nav-link: class ที่คุณทำไว้ใน index.css เพื่อคุม typography/hover style ได้แบบรวมศูนย์
            flex items-center gap-2: ให้ไอคอนกับข้อความอยู่บรรทัดเดียวกัน
            transition: ทำให้ hover ลื่น
          */}
          <a href="#" className="nav-link flex items-center gap-2 transition">
            {/* ไอคอน Home ขนาด 16px โดยประมาณ */}
            <Home className="size-4" />
            {/* ข้อความเมนู */}
            Home
          </a>

          {/* 
            วน render เมนูที่เหลือจาก navLinks
            key ต้อง unique เพื่อให้ React จัดการ list ได้ถูกต้อง
          */}
          {navLinks.map((item) => (
            <a
              key={item.label}        // key ใช้ label เพราะไม่ซ้ำกันในชุดนี้
              href={item.href}        // ลิงก์ปลายทาง
              className="nav-link transition" // ใช้ nav-link + transition ให้ hover ลื่น
            >
              {item.label}            // แสดงชื่อเมนู
            </a>
          ))}
        </nav>

        {/* 
          โซนไอคอนด้านขวาบน Desktop:
          - hidden บน mobile
          - sm:flex แสดงบน desktop
          - items-center gap-4: จัดเรียงและเว้นช่องว่าง
          - text-matcha: สีไอคอน
        */}
        <div className="hidden items-center gap-4 text-matcha sm:flex">
          {/* 
            ปุ่มโปรไฟล์
            aria-label เพื่อ accessibility
            rounded-full p-2: ปุ่มวงกลม + padding
            hover:text-brown: hover แล้วเปลี่ยนสี
          */}
          <button
            type="button"
            aria-label="Profile"
            className="rounded-full p-2 transition hover:text-brown"
          >
            {/* ไอคอน User */}
            <User className="size-5" />
          </button>

          {/* 
            ปุ่มตะกร้า
            relative: เพื่อให้ badge (ตัวเลข) absolute อ้างอิงตำแหน่งในปุ่มนี้
          */}
          <button
            type="button"
            aria-label="Cart"
            className="relative rounded-full p-2 transition hover:text-brown"
          >
            {/* ไอคอนตะกร้า */}
            <ShoppingCart className="size-5" />

            {/* 
              badge จำนวนสินค้า
              absolute -right-1 -top-1: ติดมุมขวาบนของปุ่ม
              inline-flex: จัดข้อความกลางวงกลม
              h-5 min-w-5: สูง 20px และกว้างขั้นต่ำ 20px (เลข 2-3 หลักยังไม่ล้น)
              rounded-full: ทำให้เป็นวงกลม
              bg-[#e45353]: สีแดงแบบกำหนดเอง
              px-1: padding ด้านข้างให้รองรับเลขหลายหลัก
              text-[11px] font-semibold text-white: ตัวอักษรเล็ก สีขาว หนา
            */}
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e45353] px-1 text-[11px] font-semibold text-white">
              2
            </span>
          </button>
        </div>
      </div>

      {/* 
        Mobile dropdown menu:
        แสดงเฉพาะตอน open = true
        sm:hidden: บน desktop ไม่แสดง dropdown
      */}
      {open && (
        <div className="sm:hidden">
          {/* 
            กล่องเมนู dropdown
            mx-4 mb-4: margin ซ้ายขวา/ล่าง
            rounded-lg: มุมโค้ง
            border border-border: เส้นขอบ (ใช้สี border token)
            bg-white: พื้นหลังขาว
            shadow-sm: เงาเบา
          */}
          <div className="mx-4 mb-4 rounded-lg border border-border bg-white shadow-sm">
            {/* 
              nav ใน mobile
              flex flex-col: เรียงแนวตั้ง
              divide-y divide-border: เส้นคั่นแต่ละรายการ
              text-matcha: สีข้อความ
              text-center: จัดกลาง
            */}
            <nav className="flex flex-col divide-y divide-border text-matcha text-center">
              {/* 
                ลิงก์ Home ใน dropdown
                px-4 py-3: padding
                hover:bg-cream: hover แล้วพื้นหลังเป็นสี cream
                onClick: กดแล้วปิดเมนูด้วย setOpen(false)
              */}
              <a
                href="#"
                className="nav-link flex items-center justify-center gap-2 px-4 py-3 transition hover:bg-cream"
                onClick={() => setOpen(false)}
              >
                {/* ไอคอน Home */}
                <Home className="size-4" />
                {/* ข้อความ */}
                Home
              </a>

              {/* 
                วนเมนูอื่นๆ ใน mobile
                className ทำให้คลิกง่ายและ hover มีพื้นหลัง
                onClick ปิดเมนูหลังเลือก (UX ดีขึ้น)
              */}
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="nav-link flex items-center justify-center px-4 py-3 transition hover:bg-cream"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              {/* 
                แถวปุ่ม Profile และ Cart ใน mobile
                flex items-center justify-between: วางซ้าย-ขวา
              */}
              <div className="flex items-center justify-between px-4 py-3">
                {/* ปุ่ม Profile mobile */}
                <button
                  type="button"
                  aria-label="Profile"
                  className="rounded-full p-2 text-matcha transition hover:text-brown"
                  onClick={() => setOpen(false)} // กดแล้วปิดเมนู
                >
                  <User className="size-5" />
                </button>

                {/* ปุ่ม Cart mobile */}
                <button
                  type="button"
                  aria-label="Cart"
                  className="relative rounded-full p-2 text-matcha transition hover:text-brown"
                  onClick={() => setOpen(false)} // กดแล้วปิดเมนู
                >
                  <ShoppingCart className="size-5" />
                  {/* badge จำนวนสินค้า */}
                  <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e45353] px-1 text-[11px] font-semibold text-white">
                    2
                  </span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

// export default เพื่อให้ไฟล์อื่น import Navbar ไปใช้ได้
export default Navbar;
