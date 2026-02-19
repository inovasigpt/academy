module.exports = [
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/shared/types/index.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LEVEL_COLORS",
    ()=>LEVEL_COLORS,
    "LEVEL_LABELS",
    ()=>LEVEL_LABELS
]);
const LEVEL_LABELS = {
    beginner: 'Pemula',
    intermediate: 'Menengah',
    advanced: 'Lanjutan'
};
const LEVEL_COLORS = {
    beginner: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    advanced: 'bg-rose-500/20 text-rose-400 border-rose-500/30'
};
}),
"[project]/src/entities/courses/model/courses.ts [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mockCourses",
    ()=>mockCourses
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/types/index.ts [app-rsc] (ecmascript)");
;
const mockCourses = [
    // Cyber Security
    {
        id: '1',
        title: 'Cyber Security Fundamentals',
        slug: 'cyber-security-fundamentals',
        description: 'AI-generated course: Pelajari dasar-dasar keamanan siber dengan pendekatan modern. Dari konsep CIA triad, threat landscape, hingga security controls. Semua materi dibuat dan dikurasi oleh AI untuk pembelajar mandiri.',
        thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
        level: 'beginner',
        category: 'Cyber Security',
        duration: 180,
        createdAt: new Date(),
        updatedAt: new Date(),
        isPublished: true
    },
    {
        id: '2',
        title: 'Ethical Hacking & Penetration Testing',
        slug: 'ethical-hacking-pentest',
        description: 'AI-generated course: Metodologi penetration testing lengkap yang dibuat oleh AI. Pelajari reconnaissance, exploitation, dan reporting dengan tools modern - tanpa perlu mentor mahal.',
        thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
        level: 'advanced',
        category: 'Cyber Security',
        duration: 360,
        createdAt: new Date(),
        updatedAt: new Date(),
        isPublished: true
    },
    // Programming
    {
        id: '3',
        title: 'Python for Automation',
        slug: 'python-automation',
        description: 'AI-generated course: Kuasai Python untuk otomasi tugas-tugas repetitif. Dari scripting dasar hingga automation framework. AI akan membimbingmu step-by-step tanpa biaya.',
        thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80',
        level: 'beginner',
        category: 'Programming',
        duration: 240,
        createdAt: new Date(),
        updatedAt: new Date(),
        isPublished: true
    },
    {
        id: '4',
        title: 'Full-Stack Web Development',
        slug: 'fullstack-web-dev',
        description: 'AI-generated course: Dari HTML/CSS dasar hingga React dan Node.js. Kurikulum lengkap dibuat oleh AI berdasarkan best practices industri terkini. Belajar coding gratis 24/7.',
        thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
        level: 'intermediate',
        category: 'Programming',
        duration: 480,
        createdAt: new Date(),
        updatedAt: new Date(),
        isPublished: true
    },
    {
        id: '5',
        title: 'Machine Learning Basics',
        slug: 'machine-learning-basics',
        description: 'AI-generated course: Pengenalan Machine Learning untuk pemula. Dari supervised learning, neural networks, hingga deployment model. Dibuat oleh AI, untuk pembelajar AI.',
        thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
        level: 'intermediate',
        category: 'Programming',
        duration: 320,
        createdAt: new Date(),
        updatedAt: new Date(),
        isPublished: true
    },
    // Automation
    {
        id: '6',
        title: 'DevOps & CI/CD Automation',
        slug: 'devops-cicd',
        description: 'AI-generated course: Automatisasi deployment dengan Docker, Kubernetes, dan CI/CD pipelines. Dibuat oleh AI berdasarkan workflow modern startup unicorn. Gratis dan selalu update.',
        thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80',
        level: 'advanced',
        category: 'Automation',
        duration: 360,
        createdAt: new Date(),
        updatedAt: new Date(),
        isPublished: true
    },
    {
        id: '7',
        title: 'RPA: Robotic Process Automation',
        slug: 'rpa-automation',
        description: 'AI-generated course: Automatisasi proses bisnis dengan RPA tools. Dari use case identification hingga bot deployment. Tingkatkan produktivitas tanpa coding expert.',
        thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
        level: 'beginner',
        category: 'Automation',
        duration: 210,
        createdAt: new Date(),
        updatedAt: new Date(),
        isPublished: true
    },
    {
        id: '8',
        title: 'Infrastructure as Code',
        slug: 'infrastructure-as-code',
        description: 'AI-generated course: Kelola infrastruktur dengan Terraform dan Ansible. Dibuat oleh AI dengan contoh real-world scenarios. Belajar DevOps modern tanpa biaya.',
        thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
        level: 'intermediate',
        category: 'Automation',
        duration: 280,
        createdAt: new Date(),
        updatedAt: new Date(),
        isPublished: true
    },
    // Data Science
    {
        id: '9',
        title: 'Data Analysis with Python',
        slug: 'data-analysis-python',
        description: 'AI-generated course: Analisis data dengan Pandas, NumPy, dan Matplotlib. Dibuat oleh AI dengan dataset praktis. Jadi data analyst tanpa bootcamp mahal.',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
        level: 'beginner',
        category: 'Data Science',
        duration: 270,
        createdAt: new Date(),
        updatedAt: new Date(),
        isPublished: true
    },
    {
        id: '10',
        title: 'Cloud Computing Fundamentals',
        slug: 'cloud-computing',
        description: 'AI-generated course: AWS, Azure, dan GCP untuk pemula. Konsep cloud yang disederhanakan oleh AI. Siap sertifikasi tanpa kursus berbayar.',
        thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
        level: 'beginner',
        category: 'Cloud',
        duration: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
        isPublished: true
    }
];
;
}),
"[project]/src/page-components/course-detail.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CourseDetail",
    ()=>CourseDetail
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const CourseDetail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call CourseDetail() from the server but CourseDetail is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/page-components/course-detail.tsx <module evaluation>", "CourseDetail");
}),
"[project]/src/page-components/course-detail.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CourseDetail",
    ()=>CourseDetail
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const CourseDetail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call CourseDetail() from the server but CourseDetail is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/page-components/course-detail.tsx", "CourseDetail");
}),
"[project]/src/page-components/course-detail.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$page$2d$components$2f$course$2d$detail$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/page-components/course-detail.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$page$2d$components$2f$course$2d$detail$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/page-components/course-detail.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$page$2d$components$2f$course$2d$detail$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/courses/[slug]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CoursePage,
    "dynamic",
    ()=>dynamic,
    "generateStaticParams",
    ()=>generateStaticParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$entities$2f$courses$2f$model$2f$courses$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/entities/courses/model/courses.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$page$2d$components$2f$course$2d$detail$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/page-components/course-detail.tsx [app-rsc] (ecmascript)");
;
;
;
;
const dynamic = 'force-static';
async function CoursePage({ params }) {
    const { slug } = await params;
    const course = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$entities$2f$courses$2f$model$2f$courses$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockCourses"].find((c)=>c.slug === slug);
    if (!course) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$page$2d$components$2f$course$2d$detail$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CourseDetail"], {
        course: course
    }, void 0, false, {
        fileName: "[project]/src/app/courses/[slug]/page.tsx",
        lineNumber: 21,
        columnNumber: 10
    }, this);
}
async function generateStaticParams() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$entities$2f$courses$2f$model$2f$courses$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockCourses"].map((course)=>({
            slug: course.slug
        }));
}
}),
"[project]/src/app/courses/[slug]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/courses/[slug]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0b3551fb._.js.map