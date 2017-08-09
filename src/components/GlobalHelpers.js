export var apiURL = {
    hydraStandard: "https://hydra.unicity.net/v5",
    loginTokens: "https://hydra.unicity.net/v5/loginTokens",
    getNews: "https://member-th.unicity.com/cpanel/wp-admin/admin-ajax.php?action=unimobiapp_get_news&args[posts_per_page]=-1",
    getMedia: "https://member-th.unicity.com/cpanel/wp-admin/admin-ajax.php?action=unimobiapp_get_prospect",
    getProducts: "https://member-th.unicity.com/cpanel/wp-admin/admin-ajax.php?action=unimobiapp_get_products",
    getProductsHot: "https://member-th.unicity.com/cpanel/wp-admin/admin-ajax.php?action=unimobiapp_get_products&args[meta_key]=product_hot&args[meta_value]=yes&args[order]=asc",
    sendFeedback: "https://www.unicity-easynet.com/email/send_mail_feedback.php",
    seminarData: "https://member-th.unicity.com/cpanel/wp-admin/admin-ajax.php?action=unimobiapp_get_seminar&b=",
    orderHistory: "https://member-th.unicity.com/mobile/queryorder.php?type=1&token=",
    queryOrder: "https://member-th.unicity.com/mobile/queryorder.php?type=2&token=",
    whoAmI: "https://hydra.unicity.net/v5/whoami",
    getPeriod: "https://thdl1.unicity-easynet.com/commission_html/getdate.php",
    expandCustomer: "https://hydra.unicity.net/v5/customers?unicity=",
    getVip: "https://member-calls.unicity.com/v5/customers/me/fsb?id="
}

export var links = {
    seminarQualifications: "https://member-th.unicity.com/London%20Trip%20-%20Unicity%20Leadership%20Seminar%20Proposal%202017%20(Eng).pdf",
    seminarBrochure: "https://member-th.unicity.com/London%20Trip%2020x24_2.jpg",
    seminarImage: "https://member-th.unicity.com/cpanel/wp-content/uploads/2017/02/london2017.jpg"
}

export var marketZone = "TH";

export var initialLanguage = "EN";

export var apiHEADER = {
    preset1: {'Content-Type':'application/json'},
}

export var rankListOrdered = {
        "Dst" : 0,
        "Ph1" : 1,
        "Mgr" : 2,
        "SrM" : 3,
        "ExM" : 4,
        "Dir" : 5,
        "SrD" : 6,
        "ExD" : 7,
        "PrD" : 8,
        "PrS" : 9,
        "PrR" : 10,
        "DIA" : 11
}

export var rankList = {
    "EN" : {
        "Dst" : "Distributor",
        "Ph1" : "Phase 1",
        "Mgr" : "Manager",
        "SrM" : "Senior Manager",
        "ExM" : "Executive Manager",
        "Dir" : "Director",
        "SrD" : "Senior Director",
        "ExD" : "Executive Director",
        "PrD" : "Presidential Director",
        "PrS" : "Presidential Sapphire",
        "PrR" : "Presidential Ruby",
        "DIA" : "Presidential Diamond"
    },
    "TH" : {
        "Dst" : "นักธุรกิจอิสระ",
        "Ph1" : "เฟส 1",
        "Mgr" : "เมเนเจอร์",
        "SrM" : "Sr. เมเนเจอร์",
        "ExM" : "Ex. เมเนเจอร์",
        "Dir" : "ไดเร็คเตอร์",
        "SrD" : "Sr. ไดเร็คเตอร์",
        "ExD" : "Ex. ไดเร็คเตอร์",
        "PrD" : "Pd. ไดเร็คเตอร์",
        "PrS" : "Pd. แซฟไฟร์",
        "PrR" : "Pd. รูบี้",
        "DIA" : "Pd. ไดมอนด์"
    }
};

export var translationsEN = {
    // Global
    language: 'EN',
    currency: "THB",
    back: "Back",
    cancel: "Cancel",
    reset: "Reset",
    // Login page
    username: "Username",
    password: "Password",
    login: "Login",
    incorrect_username_password: "Incorrect username or password",
    // Side Bar
    home: "Home",
    genealogy: "Genealogy",
    success: "Success",
    commission: "Commission",
    report: "Report",
    news: "News",
    media: "Media",
    profile: "Profile",
    seminar: "Seminar",
    feedback: "Feedback",
    logout: "Logout",
    // Home page
    follow_us: "Follow Us",
    // Genealogy page
    show_all: "Show All",
    show_less: "Show Less",
    bookmarks: "Bookmarks",
    name: "Name",
    view_ba: "View BA",
    preview_downline: "Preview Downline",
    dig_down: "Dig Down",
    leg: "Leg",
    // Success
    rank_achievements: "Rank Achievements",
    // Reports page
    start_date: "Start Date",
    end_date: "End Date",
    reports: "Reports",
    orders: "Orders",
    kpis: "KPIs",
    select_report: "Select Report",
    select_month: "Select Month",
    select_level: "Level",
    month: "Month",
    months: "Months",
    order_number: "Order Number",
    order_date: "Order Date",
    period: "Period",
    initial: "Initial",
    bill_to: "Bill To",
    ship_to: "Ship To",
    tax: "Tax",
    amount: "Amount",
    total_amount_due: "Total Amount Due",
    payment_type: "Payment Type",
    receipt_amount: "Receipt Amount",
    no_data: "No data...",
    // Profile page
    general: "General",
    password_confirm: "Password Confirm",
    submit: "Submit",
    // Seminar page
    qualification: "Qualification",
    brochure: "Brochure",
    remark: "Remark",
    li1: "Qualifiers who have base rank below SD must achieve the new rank and maintain the rank for 1 month during the qualification period.",
    li2: "For base rank ED and above, OV extra points will be calculated in the last month.",
    li3: "Qualifiers need to maintain 200PV starting from the 1st month that participants accumulate points until the end of qualification period.",
    li4: "Qualifiers must maintain 100PV after the end of qualification until trip period.",
    points: "Points",
    // Feedback page
    tell_us: "Please tell us what you think, any kind of feedback is highly appreciated.",
    tell_us_something: "Please tell us something",
    thank_you_feedback: "Thank you for submitting your feedback.",
    feedback_issue: "There was an issue submitting your feedback. Please try again later.",
    // KpiTab
    title_downline:"All Downline",
    DL_totalBa:"Total BA",
    DL_totalActive:"Total Active BA",
    DL_precentage:"Precentage",
    title_perid:"Period",
    title_OV:"OV",
    title_level:"Level",
    title_Ba:"BA",
    title_rank:"Rank",
    title_Qualified:"Qualified",
    title_rank_advances:"Rank Advances To",

}

export var translationsTH = {
    // Global
    language: 'TH',
    currency: "THB",
    back: "กลับ",
    cancel: "ยกเลิก",
    reset: "รีเซ็ต",
    // Login page
    username: "หมายเลขนักธุรกิจอิสระ",
    password: "รหัสผ่าน",
    login: "เข้าสู่ระบบ",
    incorrect_username_password: "Incorrect username or password",
    // Side Bar
    home: "หนัาแรก",
    genealogy: "สายงาน",
    success: "ตำแหน่ง",
    commission: "คอมมิชชั่น",
    report: "รายงาน",
    news: "ข่าว",
    media: "มีเดีย",
    profile: "ข้อมูลส่วนตัว",
    seminar: "งานสัมนา",
    feedback: "ข้อเสนอแนะ",
    logout: "ออกจากระบบ",
    // Home page
    follow_us: "ติดตามข่าวสาร",
    // Genealogy page
    show_all: "แสดงทั้งหมด",
    show_less: "แสดงอย่างย่อ",
    bookmarks: "บุ๊กมาร์ก",
    name: "ชื่อ",
    view_ba: "รายละเอียด BA",
    preview_downline: "ดูชั้นล่าง",
    dig_down: "ขุดลงชั้น",
    leg: "สายที่",
    // Success
    rank_achievements: "ตำแหน่ง",
    // Reports page
    start_date: "เลือกเดือน",
    end_date: "ถึง",
    reports: "รายงาน",
    orders: "การสั่งซื้อ",
    kpis: "KPIs",
    select_report: "เลือกรายงาน",
    select_month: "เลือกเดือน",
    select_level: "ระดับชั้น",
    month: "เดือน",
    months: "เดือน",
    order_number: "เลขที่ใบเสร็จ",
    order_date: "วันที่สั่งซื้อสินค้า",
    period: "Period",
    initial: "Initial",
    bill_to: "นามผู้ซื้อ",
    ship_to: "จัดส่ง",
    tax: "ภาษี",
    amount: "จำนวนเงิน",
    total_amount_due: "จำนวนเงินที่ชำระทั้งหมด",
    payment_type: "วิธีการชำระเงิน",
    receipt_amount: "จำนวนเงิน",
    no_data: "ไม่มีข้อมูล...",
    // Profile page
    general: "ข้อมูลส่วนตัว",
    password_confirm: "รหัสผ่านอีกครั้ง",
    submit: "ตกลง",
    // Seminar page
    qualification: "เงื่อนไขการเข้าร่วมงาน",
    brochure: "โบรชัวร์",
    remark: "หมายเหตุ",
    li1: "Qนักธุรกิจที่มีสิทธิ์เข้าร่วมงานสัมมนาครั้งนี้ ที่มีฐานตำแหน่งเดิมต่ำกว่า Senior Director ท่านจะต้องมีตำแหน่งสูงกว่าฐานตำแหน่งเดิม และในระหว่างที่ท่านทำคุณสมบัติ ท่านจะต้องรักษาตำแหน่งให้เท่ากับหรือสูงกว่าฐานตำแหน่งใหม่อีก 1 ครั้ง",
    li2: "สาหรับนักธุรกิจยูนิซิตี้ที่มีฐานตำแหน่งตั้งแต่ Executive Director ขึ้นไป คะแนนพิเศษในเรื่องคะแนนรวมองค์กรเฉลี่ย จะทำการพิจารณารวมให้ในเดือนสุดท้าย",
    li3: "นักธุรกิจที่มีสิทธิ์เข้าร่วมงานสัมมนาครั้งนี้ จะต้องรักษายอด 200 พีวี จากประเทศไทยทุกเดือน ตั้งแต่เดือนที่ท่านเริ่มทำคุณสมบัติจนถึงเดือนมิถุนายน 2560",
    li4: "นักธุรกิจที่มีสิทธิ์เข้าร่วมงานสัมมนาครั้งนี้ จะต้องรักษายอด 100 พีวี ทุกเดือนตั้งแต่เดือนกรกฎาคม 2560 จนถึงวันที่กาหนดเดินทาง",
    points: "คะแนน",
    // Feedback page
    tell_us: "กรุณาบอกให้เราทราบข้อเสนอแนะที่เป็นประโยชน์ต่อการพัฒนาเว็บไซต์",
    tell_us_something: "กรุณาพิมพ์ข้อความ",
    thank_you_feedback: "ขอบคุณที่แสดงความแนะนำ",
    feedback_issue: "มีปัญหากับระบบ",
    // KpiTab
    title_downline:"จำนวนดาวน์ไลน์ทั้งหมด",
    DL_totalBa:"จำนวนนักธุรกิจอิสระ",
    DL_totalActive:"จำนวนนักธุระกิจอิสระ ที่แอคทีฟ",
    DL_precentage:"เปอร์เซ็นต์จำนวนนักธุรกิจอิสระ ที่แอคทีฟ",
    title_perid:"ประจำเดือน",
    title_OV:"โอวี",
    title_level:"ระดับชั้น",
    title_Ba:"นักธุรกิจอิสระ",
    title_rank:"ตำแหน่ง",
    title_Qualified:"รักษาตำแหน่ง",
    title_rank_advances:"ขึ้นตำแหน่ง",
    
}