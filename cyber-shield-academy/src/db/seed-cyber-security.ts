import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { courses, sessions, materials } from "../shared/types/schema";
import "dotenv/config";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function main() {
  console.log("🌱 Seeding Hardcore Technical Hacking & Bug Bounty course...");

  // 1. Insert Course
  console.log("📚 Inserting course...");
  const [course] = await db
    .insert(courses)
    .values({
      title: "Hardcore Technical Hacking & Bug Bounty",
      slug: "hardcore-technical-hacking-bug-bounty",
      description:
        "Program intensif untuk menjadi Technical Security Engineer & High-Level Bug Hunter. Mencakup networking, web exploitation, bug bounty automation, hingga mobile hacking dengan lab praktik di TryHackMe, HackTheBox, dan PortSwigger Academy. 10 Pertemuan Lab-Heavy untuk persiapan karir di bidang security.",
      thumbnail:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
      level: "advanced",
      category: "Cyber Security",
      duration: 2000,
      instructor: "AI Academy",
      isPublished: true,
    })
    .returning();

  console.log(`✅ Course inserted: ${course.title}`);
  const courseId = course.id;

  // 2. Insert Sessions & Materials
  const sessionsData = [
    {
      title: "Pertemuan 1: Cyber Security Roadmap & Technical Foundation",
      description:
        "Roadmap & Resources: Bedah roadmap.sh/cyber-security, pengenalan forum meta4sec, dan ekosistem Bug Bounty. Lab Environment: Setup Kali Linux/Parrot OS, VPN Configuration untuk TryHackMe (THM) & HackTheBox (HTB). Ethics & Law: UU ITE & Prosedur Technical Disclosure.",
      orderIndex: 1,
      duration: 180,
      materials: [
        {
          title: "Roadmap Belajar Cyber Security Tanpa Background IT",
          videoId: "IpW9Go2eoU0",
        },
        {
          title: "Ultimate Kali Linux Basics Tutorial 2025/2026",
          videoId: "csxy3LQB4X0",
        },
        {
          title: "The Best Way to Learn Linux in 2025",
          videoId: "zIdv2NDRExI",
        },
        { title: "1 Hari Belajar Hacking VS 1 Tahun", videoId: "aHyRiJGEUm8" },
      ],
    },
    {
      title: "Pertemuan 2: Networking Deep-Dive & Traffic Analysis",
      description:
        "Protocol Analysis: Deep dive TCP/IP stack, DNS, dan HTTP/2 menggunakan Wireshark. Exploitation Tooling: Penggunaan advanced Nmap (NSE scripts) & Netcat untuk bind/reverse shell. Lab: Menyelesaikan modul Pre-Security di THM & Network Labs di HTB.",
      orderIndex: 2,
      duration: 200,
      materials: [
        { title: "Learn Nmap in 7 Minutes!", videoId: "UjVxt_qXmI4" },
        { title: "You NEED to know Netcat Basics!", videoId: "9g17KWZHWc0" },
        { title: "NMAP Full Guide - Zero to Hero", videoId: "JHAMj2vN2oU" },
        { title: "Hacking with Wireshark", videoId: "vAx_lJX_i3U" },
        {
          title: "Penetration Testing with Nmap Comprehensive Tutorial",
          videoId: "wlqUO09J-nw",
        },
      ],
    },
    {
      title: "Pertemuan 3: Advanced Reconnaissance & GitHub Dorking",
      description:
        "OSINT for Hackers: Penggunaan Shodan, Censys, dan GitHub Dorking untuk mencari leaked credentials (API keys, env files). Modern Enumeration: Subdomain enumeration (Subfinder, Amass) & Favicon Hashing. JS Analysis: Manual code review pada file JavaScript.",
      orderIndex: 3,
      duration: 200,
      materials: [
        {
          title: "Advanced GitHub Recon & Massive Leak Detection",
          videoId: "gFGc0ojrYD4",
        },
        {
          title: "GitHub Recon for Bug Bounty Hunting",
          videoId: "bIS3Fxd7jmE",
        },
        { title: "2024 Bug Bounty Recon Basics", videoId: "Z9es1_BUXmQ" },
        {
          title: "Bug Bounty Tools for Beginners: Recon & Subdomain Enum",
          videoId: "f5sdPT5QCt0",
        },
      ],
    },
    {
      title: "Pertemuan 4: Client-Side Attacks (PortSwigger Mastery)",
      description:
        "Web Security Academy: Fokus pada lab PortSwigger (XSS, CSRF, Clickjacking). Cross-Site Scripting (XSS): Reflected, Stored, dan DOM-based XSS (Manual payload crafting). Bypassing: Teknik bypass WAF sederhana menggunakan encoding & filter evasion.",
      orderIndex: 4,
      duration: 200,
      materials: [
        {
          title: "SQL Injection 101: Exploiting Vulnerabilities",
          videoId: "l4HwRcco_3c",
        },
        { title: "Hacking into the Bank with SQL Map", videoId: "BZ6Qo8vi4Mw" },
        {
          title: "Finding Web App Vulnerabilities with AI",
          videoId: "v-McepNOrTQ",
        },
        {
          title: "Database Breached: The Power of SQL Injection",
          videoId: "uqlZQew0z3Y",
        },
      ],
    },
    {
      title: "Pertemuan 5: Server-Side Exploitation I (Injection)",
      description:
        "SQL Injection (SQLi): Manual exploitation (In-band, Blind, Time-based) & SQLMap untuk database dumping. Command Injection: Menjalankan command OS melalui web form. File Upload Vulnerability: Bypassing extension filters & MIME-type untuk mendapatkan RCE.",
      orderIndex: 5,
      duration: 200,
      materials: [
        {
          title: "How to Find API Key Leaked Vulnerability",
          videoId: "mstCVr8if-M",
        },
        {
          title: "Broken Authentication & Session Management",
          videoId: "DAsj72f_h4M",
        },
        { title: "IDOR Explained in 3 Minutes", videoId: "mD_u9l2f4kY" },
        { title: "JWT Hacking & Exploitation Guide", videoId: "mD_u9l2f4kY" },
      ],
    },
    {
      title: "Pertemuan 6: Advanced Web Attacks & API Security",
      description:
        "Complex Vulnerabilities: SSRF (Server-Side Request Forgery) & XXE (XML External Entity). API Hacking: Testing REST & GraphQL endpoints (OWASP API Top 10). Lab: Menyelesaikan API Security labs di PortSwigger & HTB Machines.",
      orderIndex: 6,
      duration: 200,
      materials: [
        {
          title: "$15,000 Bounty: RCE via File Upload",
          videoId: "XyE6yTDFQ68",
        },
        {
          title: "Bug Bounty Guide: XXE Injection Explained",
          videoId: "iZwmd_y0jRw",
        },
        { title: "Exploiting GraphQL Introspection", videoId: "fs7du3nsCR4" },
        { title: "From XSS to SSRF: A Hacker's Guide", videoId: "9Oys0HLmOyk" },
      ],
    },
    {
      title: "Pertemuan 7: Infrastructure Pentest & Privilege Escalation",
      description:
        "Exploitation Framework: Advanced Metasploit usage & manual exploitation. PrivEsc: Teknik eskalasi root pada Linux & Windows (Sudo rights, SUID, Misconfigurations). Cloud Pentest: Dasar-dasar serangan pada AWS S3 Buckets & Metadata Service.",
      orderIndex: 7,
      duration: 200,
      materials: [
        { title: "Hacking with Metasploit Commands", videoId: "jBTW8wWnkqU" },
        {
          title: "Securing AWS: Discover Cloud Vulnerabilities",
          videoId: "fg_hey18tio",
        },
        { title: "Linux Privilege Escalation Hack", videoId: "BrGLMFyKRWc" },
        { title: "Master in Hacking with Metasploit", videoId: "JsolgKvgSDo" },
      ],
    },
    {
      title: "Pertemuan 8: Mobile Hacking & AI Security",
      description:
        "Mobile Analysis: Static analysis APK dengan JADX & MobSF. Dynamic Analysis: Instrumentasi runtime menggunakan Frida & bypass SSL Pinning. AI Hacking: LLM Prompt Injection (Teknik manipulasi input AI untuk mengekstrak data sensitif).",
      orderIndex: 8,
      duration: 200,
      materials: [
        {
          title: "Android Penetration Testing for Beginners",
          videoId: "rYsh8v7_2z8",
        },
        {
          title: "How to use Frida for Android Hacking",
          videoId: "GAnr_K127Gk",
        },
        { title: "Introduction to Wazuh SIEM & XDR", videoId: "N6I-X_C94gI" },
        { title: "MITRE ATT&CK Framework Explained", videoId: "9B79idX9HGs" },
      ],
    },
    {
      title: "Pertemuan 9: Bug Bounty Automation & Red Storm",
      description:
        "Automation Pipeline: Membangun workflow otomatisasi menggunakan Nuclei (YAML templates) & HTTPX. Platform Mastery: Strategi mencari target di Bugcrowd, HackerOne, dan menggunakan lab Red Storm untuk simulasi serangan infrastruktur. Scaling: Menjalankan recon di VPS secara headless.",
      orderIndex: 9,
      duration: 200,
      materials: [
        {
          title: "Scanning Every Bug Bounty Program with Nuclei",
          videoId: "A61oH0je-_c",
        },
        {
          title: "Get Your First Bug Bounty FAST with Automation",
          videoId: "UdFzNKkJXQg",
        },
        {
          title: "Nuclei - The BEST Vulnerability Scanner",
          videoId: "L4NaQ4ZtZGo",
        },
        {
          title: "I Automated My Entire Bug Bounty Workflow",
          videoId: "Kg09aktVJL4",
        },
      ],
    },
    {
      title: "Pertemuan 10: Technical Reporting & CI/CD Security",
      description:
        "Technical Write-up: Penulisan laporan teknis (Proof of Concept) yang detail & reproducible. DevSecOps: Pengenalan integrasi SAST/DAST pada CI/CD Pipeline (GitHub Actions). Final Challenge: Simulasi End-to-End Pentest pada HTB Machine khusus.",
      orderIndex: 10,
      duration: 200,
      materials: [
        { title: "Pengalaman Bug Bounty Pertama Saya", videoId: "lV9skVPlbnA" },
        { title: "Ekspektasi Bug Bounty vs Realita", videoId: "I_rXtWgpR2w" },
        {
          title: "Cara Terbaik Belajar Perburuan Bug Bounty",
          videoId: "1ve-YrLOE7E",
        },
        {
          title: "How To Make Cybersecurity Your Addiction",
          videoId: "Gg1laGusABg",
        },
      ],
    },
  ];

  console.log("📝 Inserting sessions and materials...");

  for (const sessionData of sessionsData) {
    // Insert session
    const [session] = await db
      .insert(sessions)
      .values({
        courseId: courseId,
        title: sessionData.title,
        description: sessionData.description,
        orderIndex: sessionData.orderIndex,
        duration: sessionData.duration,
      })
      .returning();

    console.log(`  ✅ Session ${sessionData.orderIndex}: ${sessionData.title}`);

    // Insert materials for this session
    for (let i = 0; i < sessionData.materials.length; i++) {
      const materialData = sessionData.materials[i];
      await db.insert(materials).values({
        sessionId: session.id,
        type: "video",
        title: materialData.title,
        content: materialData.videoId,
        orderIndex: i + 1,
      });
    }
    console.log(`    📹 ${sessionData.materials.length} videos inserted`);
  }

  console.log("\n🎉 Seed completed successfully!");
  console.log("📊 Summary:");
  console.log("   - 1 Course: Hardcore Technical Hacking & Bug Bounty");
  console.log("   - 10 Sessions");
  console.log("   - 41 Video Materials");

  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
