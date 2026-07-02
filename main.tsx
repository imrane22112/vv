import React, { useState, useEffect } from "react";
import { Video } from "./types";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import VideoCard from "./components/VideoCard";
import VideoPlayer from "./components/VideoPlayer";
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  CheckCircle,
  Home,
  Send,
  Instagram,
  Database,
  UserCheck,
  AlertTriangle,
  FolderOpen,
  History,
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { User } from "firebase/auth";
import { 
  initAuth, 
  googleSignIn, 
  googleSignOut, 
  fetchDriveVideos 
} from "./utils/googleDrive";

const CASTRATION_DATA = [
  {
    title: "Bilateral Orchiectomy Clinical Procedure & Anatomy Study",
    duration: "1:42:15",
    description: "Detailed, full-length surgical guide and anatomic walkthrough covering bilateral orchiectomy techniques, vessel ligation, post-operative care, and recovery timelines."
  },
  {
    title: "Advanced Burdizzo Castration: Tension, Crushing & Safety Protocols",
    duration: "1:15:30",
    description: "A comprehensive instructional demonstration on using bloodless Burdizzo castration devices safely, focusing on cord location, dual-crushing points, and pain mitigation strategies."
  },
  {
    title: "Scrotal Ablation and Complete Surgical Castration Masterclass",
    duration: "2:05:40",
    description: "Advanced surgical seminar covering scrotal reconstruction, absolute skin ablation, primary closure methods, and aesthetic surgical nullification."
  },
  {
    title: "Elastration & Banding Methodologies - In-Depth Long Form Review",
    duration: "1:28:10",
    description: "A long-form comparative analysis of elastic ring banding methods, ischemia timelines, tissue necrosis stages, and infection prevention."
  },
  {
    title: "Post-Orchiectomy Hormonal Changes and Physiological Adaptation Studies",
    duration: "58:45",
    description: "Endocrinological seminar tracking the long-term changes in androgen levels, metabolism, muscle mass retention, and therapeutic lifestyle modifications post-castration."
  },
  {
    title: "Traditional Surgical Techniques: Retrograde Cord Dissection & Ligation",
    duration: "1:10:25",
    description: "An educational historical overview of cord dissection methods, modern suture material comparisons, and local anesthetic block placements."
  },
  {
    title: "Burdizzo vs. Elastic Banding: Full Experimental Efficacy Comparative Lecture",
    duration: "1:52:12",
    description: "An intensive comparative lecture comparing crushing vs. banding in urological and veterinary scenarios, exploring structural remodeling and safety."
  },
  {
    title: "Subscapular Bilateral Orchiectomy: Sparing the Tunica Albuginea",
    duration: "1:34:00",
    description: "Clinical deep dive into subcapsular dissection approaches, maintaining the scrotal profile while removing androgen-producing tissues fully."
  },
  {
    title: "Comprehensive Post-Operative Wound Care & Scar Management Tutorial",
    duration: "1:08:45",
    description: "A professional step-by-step tutorial on dressing changes, suture dissolution tracking, swelling management, and long-term scar reduction."
  },
  {
    title: "Scrotal Compression, Tissue Atrophy, and Non-Surgical Minimization",
    duration: "1:18:20",
    description: "In-depth guide exploring the mechanics of physical compression, progressive testicular atrophy, and structural changes under regular wrapping."
  },
  {
    title: "Clinical Orchiectomy Recovery Log: 12-Month Patient Tracking",
    duration: "2:30:15",
    description: "A long-term tracking documentary monitoring patient recovery milestones, psychological relief, physical healing progress, and physical therapy routines."
  },
  {
    title: "Anatomy of the Spermatic Cord: High-Definition Dissection and Nerve Mapping",
    duration: "1:21:50",
    description: "High-magnification anatomical study tracing the vas deferens, testicular artery, pampiniform plexus, and cremasteric nerve pathways."
  }
];

const PENECTOMY_DATA = [
  {
    title: "Total Medical Penectomy and Perineal Urethrostomy - Full Surgical Guide",
    duration: "2:15:10",
    description: "A detailed urological masterclass documenting total penectomy with perineal urethrostomy, emphasizing margin control, urethral mobilization, and functional outcome preservation."
  },
  {
    title: "Partial Penectomy: Advanced Oncological Resection & Reconstructive Surgery",
    duration: "1:35:50",
    description: "Surgical video detailing partial resection techniques, glans reconstruction, preserving cavernosal erectile tissues, and direct urethral advancement."
  },
  {
    title: "Gender-Affirming Genital Nullification: Comprehensive Masterclass Overview",
    duration: "2:50:45",
    description: "A complete, high-definition lecture and clinical video on genital nullification procedures, combining penectomy, scrotectomy, and bilateral orchiectomy with aesthetic flat-closure."
  },
  {
    title: "Post-Penectomy Healing Progression & Wound Dressing Methodologies",
    duration: "1:22:15",
    description: "Clinical nurse training video demonstrating catheter care, dressing changes, irrigation methods, and early detection of healing complications."
  },
  {
    title: "Micro-Dissection of Cavernous Bodies & Advanced Nerve-Sparing Techniques",
    duration: "1:48:30",
    description: "Micro-surgical study mapping the dorsal nerve bundle, deep cavernosal arteries, and the structures of the suspensory ligament during trauma surgery."
  },
  {
    title: "Phallatrophy and Non-Invasive Penile Tissue Atrophy Lectures",
    duration: "1:12:40",
    description: "Exploring the endocrinological and structural triggers of penile tissue regression, structural remodeling, and vascular changes under specific treatments."
  },
  {
    title: "Urethral Suture Line Management & Anastomosis Healing Guide",
    duration: "1:14:05",
    description: "Clinical urology lecture outlining suture selection, mucosal-to-skin closure methods to prevent strictures, and modern stenting practices."
  },
  {
    title: "Surgical Nullification: Flap Design and Aesthetic Closure Strategy",
    duration: "2:02:18",
    description: "Advanced surgical video demonstrating specialized skin flap configurations for flat-surface genital nullification, optimizing cosmetical outcomes."
  },
  {
    title: "Pelvic Floor Rehabilitation and Bladder Training Post-Penectomy",
    duration: "1:25:30",
    description: "Physical therapy walkthrough mapping the adaptation of the external sphincter, pelvic floor exercises, and training for changed urinary paths."
  },
  {
    title: "Clinical Analysis of Suture Material Dissolution in Genital Procedures",
    duration: "1:05:40",
    description: "Comparing monocryl, vicryl, and chromic gut absorption timelines, local inflammatory reactions, and wound dehiscence risk factors."
  },
  {
    title: "Advanced Urostomy Care, Catheter Stenting & Dilation Guides",
    duration: "1:31:12",
    description: "Step-by-step patient care and self-dilation guide to maintain patency of the newly created perineal urethrostomy opening."
  },
  {
    title: "Radical Genital Resection and Deep Tissue Hemostasis Masterclass",
    duration: "1:55:00",
    description: "Detailed instructional guide on high-precision electrosurgery, bipolar coagulation, and suture ligation to control high-pressure cavernosal bleeding."
  }
];

const NEEDLING_DATA = [
  {
    title: "Scrotal Needling & Acupuncture Play: Core Safety & Sterilization Course",
    duration: "1:12:35",
    description: "An exhaustive training video teaching skin preparation, needle selection (gauge & length), sterile packaging management, and disposal rules."
  },
  {
    title: "Acupuncture and Neural Pathway Stimulation in Genitourinary Fields",
    duration: "1:05:50",
    description: "Clinical seminar analyzing how specific local needle points impact autonomic nerves, blood circulation, and physical tension in pelvic zones."
  },
  {
    title: "Deep Scrotal Needling Techniques: Mapping, Tension & Local Anesthetics",
    duration: "1:55:20",
    description: "Comprehensive tutorial showcasing deep needle placement, mapping sensitive zones, avoid vessel puncture, and managing local neural feedback."
  },
  {
    title: "Medical-Grade Cannulation & Scrotal Fluid Mapping Demonstration",
    duration: "1:24:15",
    description: "Clinical instructional video on catheter insertion, mapping liquid volumes, tissue layers expansion, and sterile monitoring protocols."
  },
  {
    title: "Needling Interventions for Chronic Pelvic Pain: Clinical Trials & Therapy",
    duration: "50:40",
    description: "Medical report and demonstration of acupoint needle stimulation as a therapy for chronic pelvic pain syndrome, tracking patient feedback."
  },
  {
    title: "Reflexology, Needle Mapping, and Genitourinary Reflex Points",
    duration: "1:38:10",
    description: "An advanced practice video outlining the precise correlation between surface puncture points and deep muscular reflex actions."
  },
  {
    title: "Aseptic Technique, Infection Control, and Autoclave Best Practices",
    duration: "1:10:15",
    description: "Essential training on maintaining a sterile field, surgical scrub techniques, skin disinfection protocols, and spore-testing autoclaves."
  },
  {
    title: "Acupoint Depth Mapping: Safe Margins and Tissue Density Review",
    duration: "1:16:40",
    description: "Ultrasonic imaging coupled with needle insertion, analyzing tissue layer depths, safe margins, and skeletal structures."
  },
  {
    title: "Electro-Acupuncture and Low-Frequency Muscle Stimulation Protocols",
    duration: "1:45:00",
    description: "Detailed video mapping the application of low-frequency current to inserted needles to induce rhythmic contractions and pain gating."
  },
  {
    title: "Needle Gauge Comparisons & Surface Tissue Piercing Physics",
    duration: "1:02:10",
    description: "Analyzing insertion force, friction coefficients, and tissue resistance differences between 32G, 30G, and 28G clinical acupuncture needles."
  },
  {
    title: "Clinical Study: Endorphin Release Timelines During Prolonged Needling",
    duration: "1:27:35",
    description: "Tracking plasma beta-endorphin, cortisol, and heart-rate variability indicators during a controlled, progressive genital needle session."
  },
  {
    title: "Emergency Procedures: Nerve Irritation and Hematoma Treatment Guides",
    duration: "1:33:50",
    description: "An indispensable guide covering accidental vessel puncture management, hematoma containment, compression techniques, and nerve relief."
  }
];



const OFFERS = [
  {
    id: "offer-100",
    title: "Starter Package",
    videosCount: "100 Videos Bundle",
    price: 25,
    originalPrice: null,
    badge: "Best Value",
    color: "from-zinc-900 to-black border-zinc-800 hover:border-zinc-700 hover:shadow-zinc-800/10",
    badgeColor: "bg-zinc-800 text-zinc-300",
    features: [
      "Access to 100 high-quality castration videos",
      "Instant secure delivery link",
      "Direct backup & mobile stream option",
      "Excellent customer response"
    ]
  },
  {
    id: "offer-200",
    title: "Best Seller Package",
    videosCount: "200 Videos Bundle",
    price: 40,
    originalPrice: 50,
    badge: "Most Popular",
    color: "from-[#1a112d]/60 to-black border-purple-900/40 hover:border-purple-600/60 hover:shadow-purple-950/30",
    badgeColor: "bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold",
    features: [
      "Access to 200 premium castration & penectomy videos",
      "Double the content of the Starter pack",
      "Instant high-speed delivery on Telegram",
      "20% discount included (Save $10)",
      "Priority client status"
    ]
  },
  {
    id: "offer-400",
    title: "Ultimate Collector Package",
    videosCount: "400 Videos Bundle",
    price: 70,
    originalPrice: 100,
    badge: "Mega Savings",
    color: "from-[#25150a]/60 to-black border-amber-900/40 hover:border-amber-500/60 hover:shadow-amber-950/30",
    badgeColor: "bg-gradient-to-r from-amber-500 to-amber-600 text-black font-extrabold",
    features: [
      "Full video archive access: 400+ videos",
      "Complete set of castration, penectomy & needling",
      "30% discount included (Save $30)",
      "Superb HD 1080p stream quality & downloads",
      "24/7 VIP personal seller support"
    ]
  }
];

export default function App() {
  // Navigation & Page State
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [activeTab, setActiveTab] = useState<"home" | "exclusive">("home");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isTheaterMode, setIsTheaterMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Google Drive & Auth State
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [driveVideos, setDriveVideos] = useState<Video[]>([]);
  const [driveError, setDriveError] = useState<string | null>(null);
  const [recentlyWatched, setRecentlyWatched] = useState<Video[]>([]);
  const [watchProgress, setWatchProgress] = useState<Record<string, number>>({});

  // Admin state
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const qAdmin = params.get("admin");
      if (qAdmin === "true") {
        try {
          localStorage.setItem("admin", "true");
        } catch (e) {}
        return true;
      }
      if (qAdmin === "false") {
        try {
          localStorage.removeItem("admin");
        } catch (e) {}
        return false;
      }
      try {
        return localStorage.getItem("admin") === "true";
      } catch (e) {
        return false;
      }
    }
    return false;
  });

  // Keep admin status synced with query params changes
  useEffect(() => {
    const checkAdmin = () => {
      const params = new URLSearchParams(window.location.search);
      const qAdmin = params.get("admin");
      if (qAdmin === "true") {
        try {
          localStorage.setItem("admin", "true");
        } catch (e) {}
        setIsAdmin(true);
      } else if (qAdmin === "false") {
        try {
          localStorage.removeItem("admin");
        } catch (e) {}
        setIsAdmin(false);
      }
    };
    checkAdmin();
    window.addEventListener("popstate", checkAdmin);
    return () => window.removeEventListener("popstate", checkAdmin);
  }, []);

  // Synchronize selectedVideo with URL query parameter and browser back/forward history
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const videoId = params.get("v");
      if (videoId) {
        const foundVideo = driveVideos.find((v) => v.id === videoId);
        if (foundVideo) {
          setSelectedVideo(foundVideo);
        } else {
          setSelectedVideo(null);
        }
      } else {
        setSelectedVideo(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [driveVideos]);

  // Handle URL change when selectedVideo is updated programmatically
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const currentVideoId = params.get("v");

    if (selectedVideo) {
      if (currentVideoId !== selectedVideo.id) {
        window.history.pushState({ videoId: selectedVideo.id }, "", `?v=${selectedVideo.id}`);
      }
    } else {
      if (currentVideoId) {
        window.history.pushState(null, "", window.location.pathname);
      }
    }
  }, [selectedVideo]);

  // Handle initial page load matching URL query parameter once videos are loaded
  useEffect(() => {
    if (driveVideos.length > 0) {
      const params = new URLSearchParams(window.location.search);
      const videoId = params.get("v");
      if (videoId && (!selectedVideo || selectedVideo.id !== videoId)) {
        const foundVideo = driveVideos.find((v) => v.id === videoId);
        if (foundVideo) {
          setSelectedVideo(foundVideo);
        }
      }
    }
  }, [driveVideos]);

  // Load watch progress on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("video_watch_progress");
      if (saved) {
        setWatchProgress(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Error loading watch progress:", err);
    }
  }, []);

  const handleProgressUpdate = (videoId: string, progressPercent: number) => {
    setWatchProgress((prev) => {
      const updated = { ...prev, [videoId]: progressPercent };
      try {
        localStorage.setItem("video_watch_progress", JSON.stringify(updated));
      } catch (err) {
        console.error("Error saving watch progress:", err);
      }
      return updated;
    });
  };

  const handleNextVideoAutoplay = () => {
    if (selectedVideo) {
      const suggestions = getSuggestedVideos(selectedVideo);
      if (suggestions.length > 0) {
        setSelectedVideo(suggestions[0]);
      }
    }
  };

  // Load recently watched on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("recently_watched_videos");
      if (saved) {
        setRecentlyWatched(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Error loading recently watched history:", err);
    }
  }, []);

  // Update recently watched list when a video is selected
  useEffect(() => {
    if (selectedVideo) {
      setRecentlyWatched((prev) => {
        const filtered = prev.filter((v) => v.id !== selectedVideo.id);
        const updated = [selectedVideo, ...filtered].slice(0, 10);
        try {
          localStorage.setItem("recently_watched_videos", JSON.stringify(updated));
        } catch (err) {
          console.error("Error saving recently watched history:", err);
        }
        return updated;
      });
    }
  }, [selectedVideo]);

  const clearRecentlyWatched = () => {
    try {
      localStorage.removeItem("recently_watched_videos");
      setRecentlyWatched([]);
    } catch (err) {
      console.error("Error clearing recently watched history:", err);
    }
  };

  // Initialize Auth state listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
        setDriveError(null);
      },
      () => {
        setUser(null);
        setAccessToken(null);
      }
    );
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  // Fetch drive videos dynamically on mount (with optional accessToken or fallback to public API Key)
  useEffect(() => {
    let isMounted = true;
    const loadDriveVideos = async () => {
      setIsLoading(true);
      setDriveError(null);
      try {
        const videos = await fetchDriveVideos(accessToken);
        if (isMounted) {
          setDriveVideos(videos);
        }
      } catch (err: any) {
        console.warn("Notice: Using high-quality offline fallbacks.", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    loadDriveVideos();
    return () => {
      isMounted = false;
    };
  }, [accessToken]);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setDriveError(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setAccessToken(res.accessToken);
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      setDriveError(err.message || "Failed to log in with Google.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await googleSignOut();
      setUser(null);
      setAccessToken(null);
      setDriveVideos([]);
      setSelectedVideo(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Automatically scroll to top when selecting a video or changing page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedVideo, currentPage, selectedCategory]);

  // Simulate loading state on filters changes (only if not loaded dynamically)
  useEffect(() => {
    if (accessToken) return; // Google Drive has its own real loading sequence
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [currentPage, selectedCategory, activeTab, accessToken]);

  const handleLogoClick = () => {
    setSelectedCategory("All");
    setSelectedVideo(null);
    setCurrentPage(1);
    setActiveTab("home");
  };

  // Compute dynamic active videos source
  const currentSourceVideos = driveVideos;

  // Get matching videos based on category & active tab
  const getFilteredVideosList = (): Video[] => {
    let list = [...currentSourceVideos];

    if (activeTab === "exclusive") {
      // Show only premium milestone videos or first few
      list = list.filter((v) => v.views.includes("M") || v.id === "v1" || v.id === "v5" || list.indexOf(v) < 4);
    } else {
      // Filter by Category Pill (if on Home)
      if (selectedCategory !== "All") {
        list = list.filter((v) => v.category.toLowerCase() === selectedCategory.toLowerCase());
      }
    }

    return list;
  };

  const filteredVideos = getFilteredVideosList();

  const totalPages = Math.max(1, Math.ceil(filteredVideos.length / 12));

  // Handle precise pagination of 12 videos per page for Home View
  const getPaginatedVideos = (): Video[] => {
    if (activeTab !== "home") {
      return filteredVideos;
    }
    
    const startIdx = (currentPage - 1) * 12;
    const endIdx = startIdx + 12;
    return filteredVideos.slice(startIdx, endIdx);
  };

  const activeVideosToDisplay = getPaginatedVideos();

  // Get Suggested videos for display page
  const getSuggestedVideos = (activeVid: Video): Video[] => {
    const related = currentSourceVideos.filter((v) => v.id !== activeVid.id);
    const sameCat = related.filter((v) => v.category === activeVid.category);
    if (sameCat.length >= 6) {
      return sameCat.slice(0, 6);
    }
    return related.slice(0, 7);
  };

  const suggestedList = selectedVideo ? getSuggestedVideos(selectedVideo) : [];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#F1F1F1] flex flex-col selection:bg-[#3EA6FF]/30 selection:text-white">
      {/* Header element */}
      <Header 
        onLogoClick={handleLogoClick}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        isLoggingIn={isLoggingIn}
      />

      {/* Main Page Layout Container */}
      <div className="flex flex-1 relative">
        
        {/* Navigation Sidebar */}
        <Sidebar 
          resetAll={handleLogoClick}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setSelectedVideo(null); // Return to main content area
          }}
        />

        {/* Core Content Feed Area */}
        <main className={`flex-1 overflow-y-auto px-4 md:px-6 py-6 pb-24 md:pb-6 ${isTheaterMode && selectedVideo ? "w-full" : "max-w-7xl mx-auto"}`}>
          
          {/* Centered Modern Contact Details Container */}
          <div className="mb-6 flex justify-center w-full select-none">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-6 py-4 w-full max-w-2xl bg-[#141414] hover:bg-[#181818] border border-[#222222] hover:border-[#333333] rounded-2xl transition-all duration-300 shadow-xl">
              {/* Seller Status */}
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-bold font-mono tracking-wide text-emerald-400 uppercase">
                  For More Content
                </span>
              </div>

              <div className="hidden sm:block h-6 w-[1px] bg-[#272727]" />

              {/* Contact handles */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
                {/* Telegram handle */}
                <a
                  href="https://t.me/Attg66"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#0088cc]/10 hover:bg-[#0088cc]/20 border border-[#0088cc]/30 hover:border-[#0088cc]/50 rounded-xl transition-all duration-200 text-white font-semibold text-sm group w-full sm:w-auto justify-center cursor-pointer shadow-md hover:shadow-[#0088cc]/5"
                >
                  <svg 
                    className="w-4 h-4 fill-[#0088cc] group-hover:fill-white group-hover:scale-105 transition-all duration-200" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.38-.49 1.04-.75 4.08-1.77 6.8-2.94 8.16-3.5 3.87-1.61 4.68-1.89 5.21-1.89.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.14-.03.22z"/>
                  </svg>
                  <span className="tracking-wide group-hover:text-[#3EA6FF] transition-colors">@Attg66</span>
                </a>

                {/* Instagram handle */}
                <a
                  href="https://instagram.com/robb.it3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 hover:border-pink-500/50 rounded-xl transition-all duration-200 text-white font-semibold text-sm group w-full sm:w-auto justify-center cursor-pointer shadow-md hover:shadow-pink-500/5"
                >
                  <svg 
                    className="w-4 h-4 text-pink-500 group-hover:text-white group-hover:scale-105 transition-all duration-200" 
                    viewBox="0 0 24 24"
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span className="tracking-wide group-hover:text-pink-400 transition-colors">@robb.it3</span>
                </a>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!selectedVideo ? (
              // --- HOME / EXPLORE LIST VIEW ---
              <motion.div
                key="list-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full"
              >
                {/* Google Drive Status Banner (Public Access Active) */}
                {driveError && (
                  <div className="mb-6 p-4 rounded-xl bg-red-950/20 border border-red-500/30 text-xs text-red-400 flex items-center gap-2.5">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Could not load the public Google Drive folder. Please verify your connection or check if the folder ID and public key are still valid.</span>
                  </div>
                )}



                {/* Recently Watched Section */}
                {activeTab === "home" && recentlyWatched.length > 0 && (
                  <div className="mb-8 select-none">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <History className="w-4 h-4 text-[#3EA6FF]" />
                        <h3 className="text-sm font-bold tracking-tight text-[#F1F1F1] uppercase">
                          Recently Watched
                        </h3>
                      </div>
                      <button
                        onClick={clearRecentlyWatched}
                        className="flex items-center gap-1 text-[10px] text-[#AAAAAA] hover:text-red-500 font-mono tracking-wider uppercase transition-colors cursor-pointer"
                        title="Clear Watched History"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear History</span>
                      </button>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-none">
                      {recentlyWatched.map((video) => (
                        <div
                          key={`recent-${video.id}`}
                          onClick={(e) => {
                            if (e.button === 0) {
                              setSelectedVideo(video);
                              setIsTheaterMode(false);
                            } else {
                              e.preventDefault();
                            }
                          }}
                          onMouseDown={(e) => {
                            if (e.button === 1) {
                              e.preventDefault();
                              e.stopPropagation();
                            }
                          }}
                          onMouseUp={(e) => {
                            if (e.button === 1) {
                              e.preventDefault();
                              e.stopPropagation();
                            }
                          }}
                          onAuxClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          className="flex flex-col gap-2 group cursor-pointer w-44 sm:w-48 shrink-0 bg-[#141414] hover:bg-[#1c1c1c] p-2 rounded-xl border border-[#222222] hover:border-[#333333] hover:scale-[1.025] hover:-translate-y-0.5 active:scale-[0.985] transition-all duration-300"
                        >
                          {/* Thumbnail */}
                          <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black">
                            <img
                              src={video.thumbnailUrl}
                              alt={video.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-contain transform group-hover:scale-103 transition-transform duration-300"
                            />
                            <span className="absolute bottom-1 right-1 px-1 py-0.2 bg-black/85 text-[10px] font-bold rounded font-mono text-white">
                              {video.duration}
                            </span>
                            {/* Persistent Watch Progress Indicator */}
                            {watchProgress[video.id] !== undefined && watchProgress[video.id] > 0 && (
                              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#272727]/80 z-20 overflow-hidden rounded-b-lg">
                                <div 
                                  className="h-full bg-red-600 transition-all duration-300"
                                  style={{ width: `${Math.min(100, Math.max(0, watchProgress[video.id]))}%` }}
                                />
                              </div>
                            )}
                          </div>
                          {/* Title */}
                          {isAdmin && (
                            <div className="flex flex-col min-w-0">
                              <h4 className="text-[#F1F1F1] text-xs font-semibold leading-snug line-clamp-2 group-hover:text-[#3EA6FF] transition-colors duration-200">
                                {video.title}
                              </h4>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}


                {/* Subtitle / Header details */}
                <div className="flex items-center justify-between mb-5 select-none">
                  <div className="flex items-center gap-2">
                    {activeTab === "exclusive" && <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />}
                    <h2 className="text-lg font-bold font-sans tracking-tight text-[#F1F1F1]">
                      {activeTab === "home" && `Recommended Videos • Page ${currentPage}`}
                      {activeTab === "exclusive" && "Exclusive Premium Videos"}
                    </h2>
                  </div>

                  {activeTab === "home" && (
                    <span className="text-xs text-[#AAAAAA] font-medium">
                      Displaying {activeVideosToDisplay.length} of {filteredVideos.length} videos
                    </span>
                  )}
                </div>

                {/* Main Content (Videos or Premium Offers) */}
                {activeTab === "exclusive" ? (
                  /* 3 PREMIUM OFFERS */
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2 max-w-6xl mx-auto w-full select-none pb-8">
                    {OFFERS.map((offer) => (
                      <div
                        key={offer.id}
                        className={`relative rounded-3xl p-8 bg-gradient-to-b ${offer.color} border flex flex-col justify-between transition-all duration-300 group hover:scale-[1.02] shadow-xl min-h-[520px]`}
                      >
                        <div>
                          {/* Badge */}
                          <div className="flex justify-between items-center mb-6">
                            <span className={`inline-flex items-center justify-center text-[10px] uppercase font-black tracking-widest px-3.5 py-1.5 h-7 rounded-full border ${
                              offer.id === "offer-100" ? "bg-zinc-800/80 text-zinc-300 border-zinc-700/50" :
                              offer.id === "offer-200" ? "bg-purple-950/80 text-purple-300 border-purple-800/50" :
                              "bg-amber-950/80 text-amber-300 border-amber-800/50"
                            }`}>
                              {offer.badge}
                            </span>
                            <span className="text-xs font-mono text-zinc-500 tracking-wider">
                              Premium Access
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-2xl font-black text-white mb-4 group-hover:text-[#3EA6FF] transition-colors font-sans tracking-tight">
                            {offer.title}
                          </h3>

                          {/* Pricing */}
                          <div className="flex flex-col gap-1.5 mb-6 font-sans">
                            <div className="flex items-baseline flex-wrap gap-x-2.5 gap-y-1.5">
                              <span className="text-5xl font-black text-white tracking-tight">
                                ${offer.price}
                              </span>
                              <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest font-mono">
                                USD
                              </span>
                              
                              {/* Highlighted Video Count next to the price */}
                              <span className="inline-flex items-center text-xs font-black px-2.5 py-1 rounded-lg bg-[#3EA6FF]/10 text-[#3EA6FF] border border-[#3EA6FF]/20 uppercase tracking-wider ml-1">
                                {offer.videosCount}
                              </span>

                              {offer.originalPrice && (
                                <span className="text-base text-zinc-500 line-through font-semibold ml-1">
                                  ${offer.originalPrice}
                                </span>
                              )}
                            </div>
                            {offer.originalPrice ? (
                              <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider font-mono">
                                Save ${offer.originalPrice - offer.price} USD today
                              </span>
                            ) : (
                              <span className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider font-mono">
                                Lifetime Access
                              </span>
                            )}
                          </div>

                          {/* Divider */}
                          <div className="h-[1px] bg-[#222222] mb-6" />

                          {/* Features */}
                          <ul className="space-y-3 mb-8">
                            {offer.features.map((feature, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-3 text-xs text-[#AAAAAA] leading-relaxed">
                                <CheckCircle className="w-4 h-4 text-[#3EA6FF] mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2 w-full mt-auto">
                          {/* Telegram Action Button */}
                          <a
                            href="https://t.me/Attg66"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-[#0088cc] hover:bg-[#0099e6] active:bg-[#0077b3] text-white transition-all duration-200 cursor-pointer shadow-lg hover:shadow-[#0088cc]/20 active:scale-[0.98]"
                          >
                            <Send className="w-4 h-4 fill-white text-white" />
                            <span>Telegram</span>
                          </a>

                          {/* Instagram Action Button */}
                          <a
                            href="https://instagram.com/robb.it3"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] hover:opacity-90 active:scale-[0.98] text-white transition-all duration-200 cursor-pointer shadow-lg hover:shadow-pink-500/10"
                          >
                            <Instagram className="w-4 h-4 text-white" />
                            <span>Instagram</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : isLoading ? (
                  /* Center spinning loading indicator (Spinner) over a dark background */
                  <div className="flex flex-col items-center justify-center py-24 my-6 min-h-[350px] w-full bg-[#141414] rounded-2xl border border-[#222222] shadow-xl">
                    <div className="relative flex items-center justify-center">
                      {/* Outer Ring */}
                      <div className="w-12 h-12 rounded-full border-4 border-zinc-800 border-t-[#3EA6FF] animate-spin"></div>
                      {/* Glowing center */}
                      <div className="absolute w-2.5 h-2.5 rounded-full bg-[#3EA6FF] animate-pulse"></div>
                    </div>
                    <span className="mt-4 text-xs font-mono tracking-widest text-[#AAAAAA] uppercase animate-pulse">
                      Retrieving Drive Archive...
                    </span>
                  </div>
                ) : (
                  /* Main Video Card Grid */
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-7">
                    {activeVideosToDisplay.map((video) => (
                      <VideoCard
                        key={video.id}
                        video={video}
                        progress={watchProgress[video.id]}
                        isAdmin={isAdmin}
                        onSelect={(v) => {
                          setSelectedVideo(v);
                          setIsTheaterMode(false);
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* --- PAGINATION INDICATORS (Only for standard browse pages) --- */}
                {activeTab === "home" && !isLoading && totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 mt-12 py-6 border-t border-[#222222] select-none">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className={`p-2 rounded-full border border-[#222222] flex items-center justify-center transition-all ${
                        currentPage === 1
                          ? "opacity-30 cursor-not-allowed text-[#444444]"
                          : "hover:bg-[#272727] text-white cursor-pointer active:scale-95"
                      }`}
                      title="Previous Page"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all cursor-pointer ${
                          currentPage === page
                            ? "bg-[#3EA6FF] text-[#0F0F0F] font-extrabold shadow-md shadow-[#3EA6FF]/20"
                            : "bg-[#181818] border border-[#272727] text-[#AAAAAA] hover:bg-[#272727] hover:text-white"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      className={`p-2 rounded-full border border-[#222222] flex items-center justify-center transition-all ${
                        currentPage === totalPages
                          ? "opacity-30 cursor-not-allowed text-[#444444]"
                          : "hover:bg-[#272727] text-white cursor-pointer active:scale-95"
                      }`}
                      title="Next Page"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              // --- VIDEO DISPLAY PAGE VIEW ---
              <motion.div
                key={`player-view-${selectedVideo.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col lg:grid lg:grid-cols-12 gap-6 w-full"
              >
                {/* Left Column: Player, Title, Description */}
                <div className={`${isTheaterMode ? "lg:col-span-12" : "lg:col-span-8"} flex flex-col`}>
                  <VideoPlayer
                    video={selectedVideo}
                    isTheaterMode={isTheaterMode}
                    setIsTheaterMode={setIsTheaterMode}
                    onProgressUpdate={handleProgressUpdate}
                    onVideoEnded={handleNextVideoAutoplay}
                    isAdmin={isAdmin}
                  />
                </div>

                {/* Right Column / Sidebar below player: Suggested Videos */}
                <div className={`${isTheaterMode ? "lg:col-span-12 mt-6" : "lg:col-span-4"} flex flex-col`}>
                  {isTheaterMode && <hr className="border-[#222222] mb-6" />}
                  
                  <div className="flex items-center justify-between mb-4 px-1">
                    <h3 className="text-sm font-bold tracking-tight text-[#F1F1F1] flex items-center gap-1.5 uppercase">
                      <span>Suggested Videos</span>
                    </h3>
                    <span className="text-[10px] bg-[#181818] border border-[#272727] px-2 py-0.5 rounded text-[#3EA6FF] font-mono font-bold uppercase tracking-wider">
                      UP NEXT
                    </span>
                  </div>

                  {/* Vertical Suggested Video Card Stream */}
                  <div className={`space-y-4 ${isTheaterMode ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 space-y-0" : "flex flex-col"}`}>
                    {suggestedList.map((video) => (
                      <div
                        key={`suggested-${video.id}`}
                        onClick={(e) => {
                          if (e.button === 0) {
                            setSelectedVideo(video);
                          } else {
                            e.preventDefault();
                          }
                        }}
                        onMouseDown={(e) => {
                          if (e.button === 1) {
                            e.preventDefault();
                            e.stopPropagation();
                          }
                        }}
                        onMouseUp={(e) => {
                          if (e.button === 1) {
                            e.preventDefault();
                            e.stopPropagation();
                          }
                        }}
                        onAuxClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className="flex gap-3 group cursor-pointer hover:bg-[#181818]/60 p-2 rounded-xl border border-transparent hover:border-[#222222] hover:scale-[1.025] hover:-translate-y-0.5 active:scale-[0.985] transition-all duration-300"
                      >
                        {/* Compact Thumbnail */}
                        <div className="relative aspect-video w-36 sm:w-40 flex-shrink-0 rounded-lg overflow-hidden bg-black">
                          <img
                            src={video.thumbnailUrl}
                            alt={video.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain transform group-hover:scale-103 transition-transform duration-300"
                          />
                          <span className="absolute bottom-1 right-1 px-1 py-0.2 bg-black/85 text-[10px] font-bold rounded font-mono text-white">
                            {video.duration}
                          </span>
                          {/* Persistent Watch Progress Indicator */}
                          {watchProgress[video.id] !== undefined && watchProgress[video.id] > 0 && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#272727]/80 z-20 overflow-hidden rounded-b-lg">
                              <div 
                                className="h-full bg-red-600 transition-all duration-300"
                                style={{ width: `${Math.min(100, Math.max(0, watchProgress[video.id]))}%` }}
                              />
                            </div>
                          )}
                        </div>

                        {/* Text summary */}
                        {isAdmin ? (
                          <div className="flex flex-col min-w-0 justify-center">
                            <h4 className="text-[#F1F1F1] text-xs font-semibold leading-snug line-clamp-2 group-hover:text-[#3EA6FF] transition-colors duration-200">
                              {video.title}
                            </h4>
                          </div>
                        ) : (
                          <div className="flex flex-col min-w-0 justify-center">
                            <span className="text-zinc-500 text-[10px] font-bold font-mono tracking-wider uppercase">
                              Premium Video
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0f0f0f]/95 border-t border-[#222222] flex items-center justify-around z-50 backdrop-blur-md px-6 shadow-xl select-none pb-safe">
        <button
          onClick={() => {
            setSelectedVideo(null);
            setActiveTab("home");
            setSelectedCategory("All");
          }}
          className={`flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
            activeTab === "home" ? "text-[#3EA6FF]" : "text-[#AAAAAA] hover:text-white"
          }`}
        >
          <Home className="w-5.5 h-5.5" />
          <span className="text-[10px] font-semibold">Home</span>
        </button>

        <button
          onClick={() => {
            setSelectedVideo(null);
            setActiveTab("exclusive");
          }}
          className={`flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
            activeTab === "exclusive" ? "text-amber-500" : "text-[#AAAAAA] hover:text-white"
          }`}
        >
          <Sparkles className="w-5.5 h-5.5" />
          <span className="text-[10px] font-semibold font-sans">Exclusive</span>
        </button>
      </div>
    </div>
  );
}
