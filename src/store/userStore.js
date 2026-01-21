import { create } from 'zustand';
import { fetchAllUsers, createNewUser, updateUserData, deleteUserData, login } from '@/api/userApi';

/**
 * ═══════════════════════════════════════════════════════════════
 * ZUSTAND STORE - ศูนย์กลางจัดการข้อมูล (State Management)
 * ═══════════════════════════════════════════════════════════════
 * 
 * Zustand คืออะไร?
 * - Library จัดการ global state (ข้อมูลใช้ร่วมกันทั้ง app)
 * - เบากว่า Redux หรือ Context API
 * - Component ทั้งหมดสามารถเข้าถึง state ได้
 * 
 * ประโยชน์:
 * ✅ ไม่ต้อง pass props หลายชั้น
 * ✅ ข้อมูลเก็บไว้ที่ center point เดียว
 * ✅ อัปเดตตรงจุด store แล้วทุก component อัปเดตอัตโนมัติ
 */

export const useUserStore = create((set) => ({
  // ═══════════════════════════════════════════════════════════
  // STATE - ข้อมูลที่เก็บไว้เหล่านี้
  // ═══════════════════════════════════════════════════════════
  
  users: [],               // ��� Array เก็บรายชื่อสมาชิกทั้งหมด
  loading: false,         // ⏳ Flag แสดงว่ากำลัง fetch ข้อมูลอยู่
  error: null,            // ❌ เก็บข้อความ error ถ้าเกิดปัญหา
  currentUser: null,      // ��� ผู้ใช้ปัจจุบันที่ logged in

  // ═══════════════════════════════════════════════════════════
  // FUNCTIONS - ฟังก์ชันสำหรับจัดการข้อมูล
  // ═══════════════════════════════════════════════════════════
  // ทำไมเก็บ functions ในนี่?
  // - เพื่อให้ทุกที่ที่ใช้ store มีวิธีเดียวกันในการเปลี่ยนข้อมูล
  // - เหมือนกับว่า store เป็นหัวใจ ทุก function ผ่านหัวใจ

  /**
   * 1️⃣ loadUsers - ดึงข้อมูลผู้ใช้ทั้งหมด
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * 
   * Flow:
   * 1. ตั้ง loading = true (บอก UI ว่ากำลังโหลด)
   * 2. เรียก API fetchAllUsers()
   * 3. ถ้าสำเร็จ → เก็บข้อมูลใน users array
   * 4. ถ้าผิดพลาด → เก็บข้อความ error
   * 5. ตั้ง loading = false (โหลดเสร็จแล้ว)
   * 
   * set() คืออะไร?
   * - ฟังก์ชันที่ใช้อัปเดต state
   * - set({ users: response.data }) = บอก Zustand ว่า "ใจให้ users เป็นข้อมูลนี้"
   */
  loadUsers: async () => {
    set({ loading: true, error: null });  // ⏳ เริ่มโหลด
    try {
      const response = await fetchAllUsers();  // ��� เรียก API
      set({ users: response.data || [], error: null });  // ✅ บันทึกข้อมูล
    } catch (err) {
      set({ error: err.message || 'Failed to load users' });  // ❌ บันทึก error
      console.error('Error loading users:', err);
    } finally {
      set({ loading: false });  // ⏳ โหลดเสร็จ
    }
  },

  /**
   * 2️⃣ addUser - สร้างผู้ใช้ใหม่
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━
   * 
   * Step:
   * 1. เรียก API createNewUser(userData)
   * 2. ถ้าสำเร็จ → ดึง users ทั้งหมดใหม่อีกรอบ
   *    (เพราะ user ใหม่อาจมีข้อมูลจาก server ที่เราไม่รู้)
   * 3. เก็บข้อมูลใหม่ใน store
   * 4. throw error ถ้าเกิด exception (ให้ component ที่เรียก รู้ว่ามี error)
   */
  addUser: async (userData) => {
    try {
      await createNewUser(userData);  // ��� ส่งข้อมูลไป API
      const response = await fetchAllUsers();  // ��� ดึงรายการใหม่ทั้งหมด
      set({ users: response.data || [], error: null });  // ✅ อัปเดต store
    } catch (err) {
      set({ error: err.message || 'Failed to create user' });  // ❌ เก็บ error
      console.error('Error creating user:', err);
      throw err;  // ส่งต่อ error ให้ component ที่เรียก
    }
  },

  /**
   * 3️⃣ editUser - แก้ไขข้อมูลผู้ใช้
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━
   * 
   * เหมือน addUser แต่:
   * - รับ id ด้วย (เพื่อรู้ว่าแก้ใคร)
   * - เรียก updateUserData(id, userData) แทน createNewUser()
   * - ดึง users ใหม่ เพื่อให้เห็นผลการแก้ไข
   */
  editUser: async (id, userData) => {
    try {
      await updateUserData(id, userData);  // ��� ส่งข้อมูลแก้ไข
      const response = await fetchAllUsers();  // ��� ดึงรายการใหม่
      set({ users: response.data || [], error: null });  // ✅ อัปเดต
    } catch (err) {
      set({ error: err.message || 'Failed to update user' });  // ❌ error
      console.error('Error updating user:', err);
      throw err;
    }
  },

  /**
   * 4️⃣ removeUser - ลบผู้ใช้
   * ━━━━━━━━━━━━━━━━━━━━
   * 
   * วิธี optimize:
   * - เรียก API deleteUserData(id) ให้ลบใน database
   * - แทนที่ดึง users ใหม่ ตัด id นั้นออกจาก array ที่เก็บไว้
   * - ทำให้เร็วกว่า (ไม่ต้องรอ API ใหม่)
   * 
   * state.users.filter(u => u._id !== id)
   * = เอาแค่ user ที่ไม่ใช่ id ที่ต้องการลบ
   */
  removeUser: async (id) => {
    try {
      await deleteUserData(id);  // ��� เรียก API ลบ
      set((state) => ({
        // ← set() สามารถรับ function ได้
        // ← ใช้เมื่อต้องอ้างอิง state เก่า
        users: state.users.filter(u => u._id !== id),  // กรองออกผู้ใช้ที่ถูกลบ
        error: null
      }));
    } catch (err) {
      set({ error: err.message || 'Failed to delete user' });  // ❌ error
      console.error('Error deleting user:', err);
      throw err;
    }
  },

  /**
   * 5️⃣ getUserById - ค้นหาผู้ใช้ตาม ID
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * 
   * ⚠️ ฟังก์ชันนี้แตกต่างจาก ฟังก์ชันอื่น!
   * - ไม่ใช่ async (ไม่เรียก API)
   * - ไม่ใช้ set() (ไม่เปลี่ยน state)
   * - เพียงค้นหาแล้ว return ผู้ใช้นั้นจาก array
   * 
   * ใช้เมื่อ:
   * const user = useUserStore((state) => state.getUserById(id))(state)
   * หรืออย่างนี้ดีกว่า:
   * const user = useUserStore(state => state.users.find(u => u._id === id))
   */
  getUserById: (id) => {
    return (state) => state.users.find(u => u._id === id);
  },

  loginUser: async(email,password)=>{
    set({ loading: true, error: null });
    try {
     const user = await login(email, password); // ← เรียก API จริง
     set({ currentUser: user, loading: false });

    return user;
    } catch (err) {
       set({ 
      error: err.message || "Failed to login", 
      loading: false 
    });;  // ❌ error
      console.error('Error log in:', err);
      throw err
  }},

  /**
   * 6️⃣ clearError - ลบข้อความ error
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━
   * 
   * ใช้เมื่อ:
   * - ปิด error message ด้วยปุ่ม "X"
   * - ย้ายไปหน้าอื่น (reset error)
   * - ลองเรียก API ใหม่
   */
  clearError: () => set({ error: null }),  // ลบ error
}));

/**
 * ═══════════════════════════════════════════════════════════════
 * วิธีใช้ useUserStore ในตัวอื่น ๆ
 * ═══════════════════════════════════════════════════════════════
 * 
 * ✅ ดึงข้อมูล:
 * const { users, loading, error } = useUserStore();
 * 
 * ✅ เรียกฟังก์ชัน:
 * const { loadUsers, addUser, editUser } = useUserStore();
 * 
 * ✅ ตัวอย่างจริง:
 * function MyComponent() {
 *   const { users, loading, loadUsers } = useUserStore();
 *   
 *   useEffect(() => {
 *     loadUsers();  // ดึงข้อมูลเมื่อ mount
 *   }, []);
 *   
 *   if (loading) return <div>Loading...</div>;
 *   return <div>{users.map(u => u.userName)}</div>;
 * }
 */
