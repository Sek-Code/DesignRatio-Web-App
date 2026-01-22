/**
 * ไฟล์คอนฟิก API
 * 
 * ไฟล์นี้เก็บค่าคำนำหน้าของ URL สำหรับทั้งแอปพลิเคชัน
 * โดยรองรับการตั้งค่า URL ต่างกันสำหรับ development และ production
 */

/**
 * VITE_API_BASE_URL
 * 
 * วัตถุประสงค์: เก็บ URL ฐานสำหรับทุกคำขอ API
 * 
 * วิธีการทำงาน:
 * 1. อ่านจากตัวแปรสภาพแวดล้อม: import.meta.env.VITE_API_BASE_URL
 * 2. ถ้าไม่พบตัวแปรสภาพแวดล้อม จะใช้ค่าเริ่มต้น: 'http://localhost:3000'
 * 
 * การตั้งค่าตามสภาพแวดล้อม:
 * - Development:  ใช้ localhost:3000 (ค่าเริ่มต้น)
 * - Production:   ตั้งใน .env.production เป็น URL ของเซิร์ฟเวอร์ของคุณ
 *   ตัวอย่าง: https://api.designratio.com
 * 
 * วิธีใช้ในการเรียก API:
 * import { VITE_API_BASE_URL } from './config.js';
 * 
 * const response = await fetch(`${VITE_API_BASE_URL}/api/v2/users`);
 * 
 * ตัวอย่างค่า:
 * - Development:  'http://localhost:3000'
 * - Production:   'https://api.designratio.com'
 */
export const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
