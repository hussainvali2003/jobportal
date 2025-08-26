

// import React, { useState, useRef, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import '../Styles/ChatBox.css'
// import {
//   Send,
//   Bot,
//   User,
//   X,
//   UserCircle,
//   Briefcase,
//   Phone,
//   CreditCard,
//   ArrowRight,
//   Settings,
//   HelpCircle,
//   ArrowLeft,
//   FileText,
//   GraduationCap,
//   Code,
//   FolderOpen,
//   Award,
//   Target,
//   Car as IdCard,
//   Briefcase as BriefcaseIcon,
//   User as UserIcon
// } from "lucide-react";
// const ChatBox = ({ isOpen, onClose }) => {
//   const location = useLocation();
//   const [messages, setMessages] = useState([
//     {
//       id: "1",
//       text: "Hi! I'm your job portal assistant. How can I help you today?",
//       sender: "bot",
//       timestamp: new Date(),
//       hasQuickActions: true,
//     },
//   ]);
//   const [inputText, setInputText] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [showQuickActions, setShowQuickActions] = useState(true);
//   const [showProfileSubOptions, setShowProfileSubOptions] = useState(false);
//   const [currentContext, setCurrentContext] = useState("");
//   const [waitingForConfirmation, setWaitingForConfirmation] = useState("");
//   const [currentTheme, setCurrentTheme] = useState("default");
//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);
//   const navigate = useNavigate();
//   const themes = [
//     { id: "default", name: "Default", icon: "✨" },
//     { id: "dark", name: "Dark", icon: "🌙" },
//     { id: "blue", name: "Ocean", icon: "🌊" },
//     { id: "green", name: "Forest", icon: "🌲" },
//     { id: "purple", name: "Galaxy", icon: "🌌" },
//     { id: "orange", name: "Sunset", icon: "🌅" },
//   ];
 
//   const quickActions = [
//     {
//       id: "profile",
//       icon: UserCircle,
//       label: "Profile Update",
//       description: "Update your profile and resume",
//       color: "blue",
//     },
//     {
//       id: "jobs",
//       icon: Briefcase,
//       label: "Job Applications",
//       description: "Browse and apply for jobs",
//       color: "green",
//     },
//     {
//       id: "settings",
//       icon: Settings,
//       label: "Settings",
//       description: "Manage account settings",
//       color: "purple",
//     },
//     {
//       id: "faq",
//       icon: HelpCircle,
//       label: "FAQ & Support",
//       description: "Get help and find answers",
//       color: "orange",
//     },
//     {
//       id: "contact",
//       icon: Phone,
//       label: "Contact Support",
//       description: "Get help from our team",
//       color: "teal",
//     },
//     {
//       id: "payment",
//       icon: CreditCard,
//       label: "Payment Methods",
//       description: "Manage billing and subscriptions",
//       color: "red",
//     },
//   ];
//   const profileSubOptions = [
//     {
//       id: "edit-profile",
//       icon: UserIcon,
//       label: "Edit Profile",
//       description: "Update basic information",
//       redirectUrl: "/profile",
//       keywords: ["profile edit", "edit profile", "update profile"]
//     },
//     {
//       id: "resume",
//       icon: FileText,
//       label: "Resume",
//       description: "Upload and manage resume",
//       redirectUrl: "/profile#resume",
//       keywords: ["resume", "cv", "curriculum vitae"]
//     },
//     {
//       id: "education",
//       icon: GraduationCap,
//       label: "Education",
//       description: "Add educational background",
//       redirectUrl: "/profile#education",
//       keywords: ["education", "degree", "qualification"]
//     },
//     {
//       id: "skills",
//       icon: Code,
//       label: "IT Skills",
//       description: "List technical skills",
//       redirectUrl: "/profile#it-skills",
//       keywords: ["it skills", "skills", "technical skills", "technologies"]
//     },
//     {
//       id: "projects",
//       icon: FolderOpen,
//       label: "Projects",
//       description: "Showcase work projects",
//       redirectUrl: "/profile#projects",
//       keywords: ["projects", "portfolio", "work projects"]
//     },
//     {
//       id: "summary",
//       icon: Target,
//       label: "Profile Summary",
//       description: "Write compelling summary",
//       redirectUrl: "/profile#summary",
//       keywords: ["profile summary", "summary", "about me"]
//     },
//     {
//       id: "accomplishments",
//       icon: Award,
//       label: "Accomplishments",
//       description: "Add achievements",
//       redirectUrl: "/profile#accomplishments",
//       keywords: ["accomplishments", "achievements", "awards"]
//     },
//     {
//       id: "career-profile",
//       icon: BriefcaseIcon,
//       label: "Career Profile",
//       description: "Define career goals",
//       redirectUrl: "/profile#career-profile",
//       keywords: ["career profile", "career goals", "objectives"]
//     },
//     {
//       id: "personal-details",
//       icon: IdCard,
//       label: "Personal Details",
//       description: "Update personal info",
//       redirectUrl: "/profile#personal-details",
//       keywords: ["personal details", "personal info", "contact details"]
//     },
//   ];
//   const jobSearchKeywords = [
//     'python', 'java', 'javascript', 'react', 'node', 'angular', 'vue', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin',
//     'developer', 'engineer', 'programmer', 'analyst', 'manager', 'designer', 'architect', 'consultant', 'specialist',
//     'frontend', 'backend', 'fullstack', 'devops', 'qa', 'testing', 'data', 'machine learning', 'ai', 'blockchain',
//     'mobile', 'web', 'software', 'hardware', 'network', 'security', 'cloud', 'aws', 'azure', 'docker', 'kubernetes'
//   ];
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);
//   useEffect(() => {
//     if (isOpen && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [isOpen]);
//   const handleBackToQuickLinks = () => {
//     setShowQuickActions(true);
//     setShowProfileSubOptions(false);
//     setCurrentContext("");
//     setWaitingForConfirmation("");
//     const botMessage = {
//       id: Date.now().toString(),
//       text: "I'm back to help! What would you like to do?",
//       sender: "bot",
//       timestamp: new Date(),
//       hasQuickActions: true,
//     };
//     setMessages((prev) => [...prev, botMessage]);
//   };
//   const handleQuickAction = (actionId) => {
//     setShowQuickActions(false);
//     const action = quickActions.find((a) => a.id === actionId);
//     if (!action) return;
//     const userMessage = {
//       id: Date.now().toString(),
//       text: action.label,
//       sender: "user",
//       timestamp: new Date(),
//     };
//     setMessages((prev) => [...prev, userMessage]);
//     setIsTyping(true);
//     setTimeout(() => {
//       let botResponse = "";
//       let hasSubOptions = false;
//       let redirectUrl = "";
//       let showBackButton = true;
//       switch (actionId) {
//         case "profile":
//           botResponse = "Great! I can help you update different parts of your profile. Here are the sections you can update:\n\n📋 Choose from the options below to update specific parts of your profile:";
//           hasSubOptions = true;
//           setShowQuickActions(false);
//           setShowProfileSubOptions(true);
//           setCurrentContext("profile");
//           showBackButton = true;
//           break;
//         case "jobs":
//           botResponse = "Great! Let me help you with job applications. Here's what you can do:\n\n🔍 Browse available positions\n📝 Apply with one click\n📊 Track your applications\n🎯 Get job recommendations\n\nShall I take you to our jobs page to start browsing?";
//           redirectUrl = "/jobs";
//           break;
//         case "settings":
//           botResponse = "I'll redirect you to the settings page where you can:\n\n⚙️ Account preferences\n🔒 Privacy settings\n🔔 Notification settings\n🎨 Display preferences\n🔑 Security options\n\nClick below to access your settings:";
//           redirectUrl = "/settings";
//           break;
//         case "faq":
//           botResponse = "I'll take you to our FAQ & Support section where you can:\n\n❓ Browse frequently asked questions\n💬 Contact support team\n📚 Access help documentation\n🎥 Watch tutorial videos\n📞 Schedule a call\n\nClick below to access FAQ & Support:";
//           redirectUrl = "/faq-support";
//           break;
//         case "contact":
//           botResponse = "I'm here to help! You can contact our support team through:\n\n📧 Email: support@momentum-merge.com\n📱 Phone & WhatsApp: +91 9731362240\n💬 Live chat (right here!)\n🕘 Support hours: 9 AM - 6 PM IST\n\nWhat specific help do you need today?";
//           break;
//         case "payment":
//           botResponse = "I can help you with payment and subscription options:\n\n💳 Manage payment methods\n📋 View subscription plans\n🧾 Download invoices\n💰 Premium features access\n\nWould you like me to redirect you to the billing section?";
//           redirectUrl = "/billing";
//           break;
//         default:
//           botResponse = "I'm here to help! How can I assist you today?";
//       }
//       const botMessage = {
//         id: (Date.now() + 1).toString(),
//         text: botResponse,
//         sender: "bot",
//         timestamp: new Date(),
//         hasSubOptions,
//         redirectUrl,
//       };
//       setMessages((prev) => [...prev, botMessage]);
//       setIsTyping(false);
//       if (redirectUrl) {
//         setTimeout(() => {
//           const redirectMessage = {
//             id: (Date.now() + 2).toString(),
//             text: `Click the button below to go to ${action.label.toLowerCase()}:`,
//             sender: "bot",
//             timestamp: new Date(),
//             showRedirectButton: true,
//             redirectUrl,
//             actionLabel: action.label,
//             showBackButton: true,
//           };
//           setMessages((prev) => [...prev, redirectMessage]);
//         }, 1000);
//       }
//     }, 1000 + Math.random() * 1000);
//   };
//   const handleProfileSubOption = (subOption) => {
//     setShowProfileSubOptions(false);
//     const userMessage = {
//       id: Date.now().toString(),
//       text: subOption.label,
//       sender: "user",
//       timestamp: new Date(),
//     };
//     setMessages((prev) => [...prev, userMessage]);
//     setIsTyping(true);
//     setTimeout(() => {
//       const botResponse = {
//         id: (Date.now() + 1).toString(),
//         text: `Perfect! I'll help you update your ${subOption.label.toLowerCase()}. Click the button below to go to the ${subOption.label.toLowerCase()} section:`,
//         sender: "bot",
//         timestamp: new Date(),
//         showRedirectButton: true,
//         redirectUrl: subOption.redirectUrl,
//         actionLabel: subOption.label,
//         showBackButton: true,
//       };
//       setMessages((prev) => [...prev, botResponse]);
//       setIsTyping(false);
//     }, 800 + Math.random() * 600);
//   };
//   const detectJobSearch = (message) => {
//     const lowerMessage = message.toLowerCase();
//     const hasJobKeyword = jobSearchKeywords.some(keyword =>
//       lowerMessage.includes(keyword.toLowerCase())
//     );
//     const jobPhrases = [
//       'job', 'jobs', 'position', 'role', 'career', 'opportunity', 'opening', 'vacancy',
//       'hiring', 'recruitment', 'work', 'employment', 'apply'
//     ];
//     const hasJobPhrase = jobPhrases.some(phrase => lowerMessage.includes(phrase));
//     return hasJobKeyword || hasJobPhrase;
//   };
//   const extractJobSearchTerm = (message) => {
//     const lowerMessage = message.toLowerCase();
//     const foundKeyword = jobSearchKeywords.find(keyword =>
//       lowerMessage.includes(keyword.toLowerCase())
//     );
//     if (foundKeyword) {
//       return foundKeyword;
//     }
//     const patterns = [
//       /(\w+)\s+(?:job|jobs|position|role|developer|engineer)/i,
//       /(?:job|jobs|position|role)\s+(?:in|for|as)\s+(\w+)/i,
//       /(\w+)\s+(?:developer|engineer|analyst|manager|designer)/i
//     ];
//     for (const pattern of patterns) {
//       const match = message.match(pattern);
//       if (match && match[1]) {
//         return match[1];
//       }
//     }
//     return null;
//   };
//   const detectDirectNavigation = (message) => {
//     const lowerMessage = message.toLowerCase().trim();
//     // Direct page navigation
//     const directPages = {
//       'settings': { url: '/settings', label: 'Settings' },
//       'contact': { url: '/contact', label: 'Contact Support' },
//       'contact support': { url: '/contact', label: 'Contact Support' },
//       'faq': { url: '/faq-support', label: 'FAQ & Support' },
//       'support': { url: '/faq-support', label: 'FAQ & Support' },
//       'payment': { url: '/billing', label: 'Payment Methods' },
//       'billing': { url: '/billing', label: 'Billing' },
//       'jobs': { url: '/jobs', label: 'Job Applications' }
//     };
//     for (const [key, value] of Object.entries(directPages)) {
//       if (lowerMessage.includes(key)) {
//         return value;
//       }
//     }
//     return null;
//   };
//   const detectProfileSubOption = (message) => {
//     const lowerMessage = message.toLowerCase().trim();
//     for (const option of profileSubOptions) {
//       for (const keyword of option.keywords) {
//         if (lowerMessage.includes(keyword.toLowerCase())) {
//           return option;
//         }
//       }
//     }
//     return null;
//   };
//   const getBotResponse = (userMessage) => {
//     const message = userMessage.toLowerCase().trim();

//     const greetings = ["hi", "hello", "hey", "good morning", "good evening", "good afternoon"];
//     if (greetings.includes(message)) {
//       return "Hello! 👋 I'm here to assist you with anything related to your job search, profile updates, or support. What would you like to do today?";
//     }
//     const thanksMessages = ["thank you", "thanks", "thank u", "thx", "ty"];
//     if (thanksMessages.some(thank => message.includes(thank))) {
//       return "You're welcome! 😊 Let me know if there's anything else I can help you with.";
//     }

//     // Always respond with quick actions if user explicitly asks for them
//     if (message === "quick actions") {
//       setShowQuickActions(true);
//       return {
//         text: "Here are some quick actions you can use:",
//         hasQuickActions: true
//       };
//     }

//     if (waitingForConfirmation) {
//       if (message.includes("yes") || message.includes("sure") || message.includes("okay") || message.includes("ok")) {
//         setWaitingForConfirmation("");
//         return "Great! Let me help you with that.";
//       } else if (message.includes("no") || message.includes("not")) {
//         setWaitingForConfirmation("");
//         setShowQuickActions(true);
//         return {
//           text: "No problem! You can use the quick actions below or ask me directly.",
//           hasQuickActions: true
//         };
//       }
//     }



//     // Check for profile update specifically
//     if (message.includes("profile update") || message.includes("update profile") || message.includes("profile")) {
//       setShowQuickActions(false);
//       setShowProfileSubOptions(true);
//       setCurrentContext("profile");
//       setTimeout(() => {
//         const profileOptionsMessage = {
//           id: (Date.now() + 2).toString(),
//           text: "Great! I can help you update different parts of your profile. Here are the sections you can update:\n\n:clipboard: Choose from the options below to update specific parts of your profile:",
//           sender: "bot",
//           timestamp: new Date(),
//           hasSubOptions: true,
//           showBackButton: true,
//         };
//         setMessages((prev) => [...prev, profileOptionsMessage]);
//       }, 1000);
//       return "Perfect! Let me show you all the profile sections you can update.";
//     }
//     // Check for direct profile sub-options
//     const profileSubOption = detectProfileSubOption(userMessage);
//     if (profileSubOption) {
//       setTimeout(() => {
//         const redirectMessage = {
//           id: (Date.now() + 2).toString(),
//           text: `Perfect! I'll help you update your ${profileSubOption.label.toLowerCase()}. Click the button below to go to the ${profileSubOption.label.toLowerCase()} section:`,
//           sender: "bot",
//           timestamp: new Date(),
//           showRedirectButton: true,
//           redirectUrl: profileSubOption.redirectUrl,
//           actionLabel: profileSubOption.label,
//           showBackButton: true,
//         };
//         setMessages((prev) => [...prev, redirectMessage]);
//       }, 1000);
//       return `Great! I'll help you with your ${profileSubOption.label.toLowerCase()}.`;
//     }
//     // Check for direct navigation
//     const directNav = detectDirectNavigation(userMessage);
//     if (directNav) {
//       setTimeout(() => {
//         const redirectMessage = {
//           id: (Date.now() + 2).toString(),
//           text: `Click the button below to go to ${directNav.label.toLowerCase()}:`,
//           sender: "bot",
//           timestamp: new Date(),
//           showRedirectButton: true,
//           redirectUrl: directNav.url,
//           actionLabel: directNav.label,
//           showBackButton: true,
//         };
//         setMessages((prev) => [...prev, redirectMessage]);
//       }, 1000);
//       return `I'll redirect you to ${directNav.label.toLowerCase()}.`;
//     }
//     // Job search detection
//     if (detectJobSearch(userMessage)) {
//       const searchTerm = extractJobSearchTerm(userMessage);
//       if (searchTerm) {
//         setTimeout(() => {
//           const redirectMessage = {
//             id: (Date.now() + 2).toString(),
//             text: `Click the button below to search for ${searchTerm} jobs:`,
//             sender: "bot",
//             timestamp: new Date(),
//             showRedirectButton: true,
//             redirectUrl: `/jobs?search=${encodeURIComponent(searchTerm)}`,
//             actionLabel: `${searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)} Jobs`,
//             showBackButton: true,
//           };
//           setMessages((prev) => [...prev, redirectMessage]);
//         }, 1000);
//         return `I found several ${searchTerm} opportunities for you! Let me show you the available positions.`;
//       }
//       return "I can help you find job opportunities! What specific role or technology are you interested in?";
//     }
//     if (message.includes("help") || message.includes("support")) {
//       return "I'm here to help! You can:\n\n:mag: Search for jobs\n:bust_in_silhouette: Update your profile\n:gear: Manage settings\n:telephone_receiver: Contact support\n\nWhat would you like to do?";
//     }
//     return "Thanks for your message! You can use the quick actions or ask me about specific topics like jobs, profile updates, account settings, Contact, payment or FAQ & Support.";
//   };
//   const handleSendMessage = () => {
//     if (!inputText.trim()) return;
//     const userMessage = {
//       id: Date.now().toString(),
//       text: inputText,
//       sender: "user",
//       timestamp: new Date(),
//     };
//     setMessages((prev) => [...prev, userMessage]);
//     setInputText("");
//     setIsTyping(true);
//     setTimeout(() => {
//       const response = getBotResponse(inputText);
//       const botMessage = {
//         id: (Date.now() + 1).toString(),
//         text: typeof response === 'string' ? response : response.text,
//         sender: "bot",
//         timestamp: new Date(),
//         hasQuickActions: typeof response === 'object' ? response.hasQuickActions : false,
//         showBackButton: !showQuickActions && typeof response === 'string',
//       };
//       setMessages((prev) => [...prev, botMessage]);
//       setIsTyping(false);
//       if (typeof response === 'object' && response.hasQuickActions) {
//         setShowQuickActions(true);
//       }
//     }, 1000 + Math.random() * 1000);
//   };
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSendMessage();
//     }
//   };
//   if (!isOpen) return null;

//   return (
//     <div className={`chatbox theme-${currentTheme}`}>
//       <div className="chat-box">
//         {/* Chat Header */}
//         <div className="chat-header">
//           <div className="chat-header-content">
//             <div className="chat-header-info">
//               <div className="chat-avatar">
//                 <Bot className="w-6 h-6" />
//               </div>
//               <div>
//                 <h3 className="chat-title">Job Portal Assistant</h3>
//                 <p className="chat-subtitle">Always here to help</p>
//               </div>
//             </div>
//             <div className="theme-selector">
//               <select
//                 value={currentTheme}
//                 onChange={(e) => setCurrentTheme(e.target.value)}
//                 className="theme-dropdown"
//               >
//                 {themes.map(theme => (
//                   <option key={theme.id} value={theme.id}>
//                     {theme.icon} {theme.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <button onClick={onClose} className="close-button">
//               <X className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//         {/* Chat Messages */}
//         <div className="chat-messages chat-scroll">
//           {messages.map((message) => (
//             <div key={message.id}>
//               {message.sender === "bot" ? (
//                 <div className="message-bot">
//                   <div className="bot-avatar">
//                     <Bot className="w-4 h-4 text-white" />
//                   </div>
//                   <div className="flex-1">
//                     <div className="message-bubble-bot">
//                       <p className="message-text-bot">{message.text}</p>
//                     </div>
//                     <p className="message-timestamp">
//                       {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </p>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="message-user">
//                   <div className="flex-1 flex justify-end">
//                     <div className="message-bubble-user">
//                       <p className="message-text-user">{message.text}</p>
//                     </div>
//                   </div>
//                   <div className="user-avatar">
//                     <User className="w-4 h-4 text-slate-600" />
//                   </div>
//                 </div>
//               )}
//               {/* Quick Actions */}
//               {message.hasQuickActions && showQuickActions && (
//                 <div className="quick-actions-container">
//                   <h4 className="quick-actions-title">Quick Actions</h4>
//                   <div className="quick-actions-grid">
//                     {quickActions.map((action) => {
//                       const IconComponent = action.icon;
//                       const colorClass = `action-${action.color}`;
//                       return (
//                         <button
//                           key={action.id}
//                           onClick={() => handleQuickAction(action.id)}
//                           className={`quick-action-button ${colorClass}`}
//                         >
//                           <div className="quick-action-header">
//                             <IconComponent className="w-4 h-4" />
//                             <span className="quick-action-label">{action.label}</span>
//                           </div>
//                           <p className="quick-action-description">{action.description}</p>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}
//               {/* Profile Sub Options */}
//               {message.hasSubOptions && showProfileSubOptions && (
//                 <div className="profile-options-container">
//                   <h4 className="profile-options-title">Profile Sections</h4>
//                   <div className="profile-options-list">
//                     {profileSubOptions.map((option) => {
//                       const IconComponent = option.icon;
//                       return (
//                         <button
//                           key={option.id}
//                           onClick={() => handleProfileSubOption(option)}
//                           className="profile-option-button"
//                         >
//                           <IconComponent className="profile-option-icon w-4 h-4" />
//                           <div>
//                             <span className="profile-option-label">{option.label}</span>
//                             <p className="profile-option-description">{option.description}</p>
//                           </div>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}
//               {/* Redirect Button */}
//               {message.showRedirectButton && (
//                 <div className="button-container">
//                   <button
//                     onClick={() => navigate(message.redirectUrl || "/")}
//                     className="redirect-button"
//                   >
//                     <span>Go to {message.actionLabel}</span>
//                     <ArrowRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               )}
//               {/* Back to Quick Links Button */}
//               {message.showBackButton && !showQuickActions && (
//                 <div className="button-container">
//                   <button
//                     onClick={handleBackToQuickLinks}
//                     className="back-button"
//                   >
//                     <ArrowLeft className="back-arrow w-4 h-4" />
//                     <span>Back to Quick Links</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//           {/* Typing Indicator */}
//           {isTyping && (
//             <div className="typing-indicator">
//               <div className="bot-avatar">
//                 <Bot className="w-4 h-4 text-white" />
//               </div>
//               <div className="flex-1">
//                 <div className="message-bubble-bot">
//                   <div className="typing-dots">
//                     <div className="typing-dot"></div>
//                     <div className="typing-dot"></div>
//                     <div className="typing-dot"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>
//         {/* Chat Input */}
//         <div className="chat-input-container">
//           <div className="chat-input-wrapper">
//             <div className="flex-1 relative">
//               <input
//                 ref={inputRef}
//                 type="text"
//                 value={inputText}
//                 onChange={(e) => setInputText(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Type your message..."
//                 className="chat-input-field"
//               />
//             </div>
//             <button onClick={handleSendMessage} className="send-button">
//               <Send className="w-4 h-4 text-white" />
//             </button>
//           </div>
//           <p className="chat-input-hint">
//             Press Enter to send • Use quick actions for faster help
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ChatBox;

import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../Styles/ChatBox.css'
import {
  Send,
  Bot,
  User,
  X,
  UserCircle,
  Briefcase,
  Phone,
  CreditCard,
  ArrowRight,
  Settings,
  HelpCircle,
  ArrowLeft,
  FileText,
  GraduationCap,
  Code,
  FolderOpen,
  Award,
  Target,
  Car as IdCard,
  Briefcase as BriefcaseIcon,
  User as UserIcon,
  ChevronDown
} from "lucide-react";

const ChatBox = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hi! I'm your job portal assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
      hasQuickActions: true,
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [showProfileSubOptions, setShowProfileSubOptions] = useState(false);
  const [currentContext, setCurrentContext] = useState("");
  const [waitingForConfirmation, setWaitingForConfirmation] = useState("");
  const [currentTheme, setCurrentTheme] = useState("default");
  const [selectedAPI, setSelectedAPI] = useState("MM");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const themes = [
    { id: "default", name: "Default", icon: "✨" },
    { id: "dark", name: "Dark", icon: "🌙" },
    { id: "blue", name: "Ocean", icon: "🌊" },
    { id: "green", name: "Forest", icon: "🌲" },
    { id: "purple", name: "Galaxy", icon: "🌌" },
    { id: "orange", name: "Sunset", icon: "🌅" },
  ];

  const apiOptions = [
    { id: "MM", name: "MM", endpoint: "" },
    { id: "MM_ADVISOR", name: "MM Advisor", endpoint: "http://localhost:8080/api/groq/chat" }
  ];
 
  const quickActions = [
    {
      id: "profile",
      icon: UserCircle,
      label: "Profile Update",
      description: "Update your profile and resume",
      color: "blue",
    },
    {
      id: "jobs",
      icon: Briefcase,
      label: "Job Applications",
      description: "Browse and apply for jobs",
      color: "green",
    },
    {
      id: "settings",
      icon: Settings,
      label: "Settings",
      description: "Manage account settings",
      color: "purple",
    },
    {
      id: "faq",
      icon: HelpCircle,
      label: "FAQ & Support",
      description: "Get help and find answers",
      color: "orange",
    },
    {
      id: "contact",
      icon: Phone,
      label: "Contact Support",
      description: "Get help from our team",
      color: "teal",
    },
    {
      id: "payment",
      icon: CreditCard,
      label: "Payment Methods",
      description: "Manage billing and subscriptions",
      color: "red",
    },
  ];

  const profileSubOptions = [
    {
      id: "edit-profile",
      icon: UserIcon,
      label: "Edit Profile",
      description: "Update basic information",
      redirectUrl: "/profile",
      keywords: ["profile edit", "edit profile", "update profile"]
    },
    {
      id: "resume",
      icon: FileText,
      label: "Resume",
      description: "Upload and manage resume",
      redirectUrl: "/profile#resume",
      keywords: ["resume", "cv", "curriculum vitae"]
    },
    {
      id: "education",
      icon: GraduationCap,
      label: "Education",
      description: "Add educational background",
      redirectUrl: "/profile#education",
      keywords: ["education", "degree", "qualification"]
    },
    {
      id: "skills",
      icon: Code,
      label: "IT Skills",
      description: "List technical skills",
      redirectUrl: "/profile#it-skills",
      keywords: ["it skills", "skills", "technical skills", "technologies"]
    },
    {
      id: "projects",
      icon: FolderOpen,
      label: "Projects",
      description: "Showcase work projects",
      redirectUrl: "/profile#projects",
      keywords: ["projects", "portfolio", "work projects"]
    },
    {
      id: "summary",
      icon: Target,
      label: "Profile Summary",
      description: "Write compelling summary",
      redirectUrl: "/profile#summary",
      keywords: ["profile summary", "summary", "about me"]
    },
    {
      id: "accomplishments",
      icon: Award,
      label: "Accomplishments",
      description: "Add achievements",
      redirectUrl: "/profile#accomplishments",
      keywords: ["accomplishments", "achievements", "awards"]
    },
    {
      id: "career-profile",
      icon: BriefcaseIcon,
      label: "Career Profile",
      description: "Define career goals",
      redirectUrl: "/profile#career-profile",
      keywords: ["career profile", "career goals", "objectives"]
    },
    {
      id: "personal-details",
      icon: IdCard,
      label: "Personal Details",
      description: "Update personal info",
      redirectUrl: "/profile#personal-details",
      keywords: ["personal details", "personal info", "contact details"]
    },
  ];

  const jobSearchKeywords = [
    'python', 'java', 'javascript', 'react', 'node', 'angular', 'vue', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin',
    'developer', 'engineer', 'programmer', 'analyst', 'manager', 'designer', 'architect', 'consultant', 'specialist',
    'frontend', 'backend', 'fullstack', 'devops', 'qa', 'testing', 'data', 'machine learning', 'ai', 'blockchain',
    'mobile', 'web', 'software', 'hardware', 'network', 'security', 'cloud', 'aws', 'azure', 'docker', 'kubernetes'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleBackToQuickLinks = () => {
    setShowQuickActions(true);
    setShowProfileSubOptions(false);
    setCurrentContext("");
    setWaitingForConfirmation("");
    const botMessage = {
      id: Date.now().toString(),
      text: "I'm back to help! What would you like to do?",
      sender: "bot",
      timestamp: new Date(),
      hasQuickActions: true,
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleQuickAction = (actionId) => {
    setShowQuickActions(false);
    const action = quickActions.find((a) => a.id === actionId);
    if (!action) return;

    const userMessage = {
      id: Date.now().toString(),
      text: action.label,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "";
      let hasSubOptions = false;
      let redirectUrl = "";
      let showBackButton = true;

      switch (actionId) {
        case "profile":
          botResponse = "Great! I can help you update different parts of your profile. Here are the sections you can update:\n\n📋 Choose from the options below to update specific parts of your profile:";
          hasSubOptions = true;
          setShowQuickActions(false);
          setShowProfileSubOptions(true);
          setCurrentContext("profile");
          showBackButton = true;
          break;
        case "jobs":
          botResponse = "Great! Let me help you with job applications. Here's what you can do:\n\n🔍 Browse available positions\n📝 Apply with one click\n📊 Track your applications\n🎯 Get job recommendations\n\nShall I take you to our jobs page to start browsing?";
          redirectUrl = "/jobs";
          break;
        case "settings":
          botResponse = "I'll redirect you to the settings page where you can:\n\n⚙️ Account preferences\n🔒 Privacy settings\n🔔 Notification settings\n🎨 Display preferences\n🔑 Security options\n\nClick below to access your settings:";
          redirectUrl = "/settings";
          break;
        case "faq":
          botResponse = "I'll take you to our FAQ & Support section where you can:\n\n❓ Browse frequently asked questions\n💬 Contact support team\n📚 Access help documentation\n🎥 Watch tutorial videos\n📞 Schedule a call\n\nClick below to access FAQ & Support:";
          redirectUrl = "/faq-support";
          break;
        case "contact":
          botResponse = "I'm here to help! You can contact our support team through:\n\n📧 Email: support@momentum-merge.com\n📱 Phone & WhatsApp: +91 9731362240\n💬 Live chat (right here!)\n🕘 Support hours: 9 AM - 6 PM IST\n\nWhat specific help do you need today?";
          break;
        case "payment":
          botResponse = "I can help you with payment and subscription options:\n\n💳 Manage payment methods\n📋 View subscription plans\n🧾 Download invoices\n💰 Premium features access\n\nWould you like me to redirect you to the billing section?";
          redirectUrl = "/billing";
          break;
        default:
          botResponse = "I'm here to help! How can I assist you today?";
      }

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
        hasSubOptions,
        redirectUrl,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);

      if (redirectUrl) {
        setTimeout(() => {
          const redirectMessage = {
            id: (Date.now() + 2).toString(),
            text: `Click the button below to go to ${action.label.toLowerCase()}:`,
            sender: "bot",
            timestamp: new Date(),
            showRedirectButton: true,
            redirectUrl,
            actionLabel: action.label,
            showBackButton: true,
          };
          setMessages((prev) => [...prev, redirectMessage]);
        }, 1000);
      }
    }, 1000 + Math.random() * 1000);
  };

  const handleProfileSubOption = (subOption) => {
    setShowProfileSubOptions(false);
    const userMessage = {
      id: Date.now().toString(),
      text: subOption.label,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: `Perfect! I'll help you update your ${subOption.label.toLowerCase()}. Click the button below to go to the ${subOption.label.toLowerCase()} section:`,
        sender: "bot",
        timestamp: new Date(),
        showRedirectButton: true,
        redirectUrl: subOption.redirectUrl,
        actionLabel: subOption.label,
        showBackButton: true,
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  const detectJobSearch = (message) => {
    const lowerMessage = message.toLowerCase();
    const hasJobKeyword = jobSearchKeywords.some(keyword =>
      lowerMessage.includes(keyword.toLowerCase())
    );
    const jobPhrases = [
      'job', 'jobs', 'position', 'role', 'career', 'opportunity', 'opening', 'vacancy',
      'hiring', 'recruitment', 'work', 'employment', 'apply'
    ];
    const hasJobPhrase = jobPhrases.some(phrase => lowerMessage.includes(phrase));
    return hasJobKeyword || hasJobPhrase;
  };

  const extractJobSearchTerm = (message) => {
    const lowerMessage = message.toLowerCase();
    const foundKeyword = jobSearchKeywords.find(keyword =>
      lowerMessage.includes(keyword.toLowerCase())
    );
    if (foundKeyword) {
      return foundKeyword;
    }
    const patterns = [
      /(\w+)\s+(?:job|jobs|position|role|developer|engineer)/i,
      /(?:job|jobs|position|role)\s+(?:in|for|as)\s+(\w+)/i,
      /(\w+)\s+(?:developer|engineer|analyst|manager|designer)/i
    ];
    for (const pattern of patterns) {
      const match = message.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  const detectDirectNavigation = (message) => {
    const lowerMessage = message.toLowerCase().trim();
    const directPages = {
      'settings': { url: '/settings', label: 'Settings' },
      'contact': { url: '/contact', label: 'Contact Support' },
      'contact support': { url: '/contact', label: 'Contact Support' },
      'faq': { url: '/faq-support', label: 'FAQ & Support' },
      'support': { url: '/faq-support', label: 'FAQ & Support' },
      'payment': { url: '/billing', label: 'Payment Methods' },
      'billing': { url: '/billing', label: 'Billing' },
      'jobs': { url: '/jobs', label: 'Job Applications' }
    };
    for (const [key, value] of Object.entries(directPages)) {
      if (lowerMessage.includes(key)) {
        return value;
      }
    }
    return null;
  };

  const detectProfileSubOption = (message) => {
    const lowerMessage = message.toLowerCase().trim();
    for (const option of profileSubOptions) {
      for (const keyword of option.keywords) {
        if (lowerMessage.includes(keyword.toLowerCase())) {
          return option;
        }
      }
    }
    return null;
  };

  const sendToAPI = async (message) => {
    const selectedAPIOption = apiOptions.find(api => api.id === selectedAPI);
    
    if (selectedAPI === "MM") {
      return getBotResponse(message);
    } else if (selectedAPI === "MM_ADVISOR") {
      try {
       // console.log("🚀 Sending request to MM Advisor:", { message });
        
        const response = await fetch("http://localhost:8080/api/groq/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            message: message,
          }),
        });
        
       // console.log("📡 MM Advisor Response Status:", response.status);
        
        if (response.ok) {
          try {
            const data = await response.json();
           // console.log("✅ MM Advisor Response Data:", data);
            
            const botResponse = data.response || data.message || data.reply || data.answer || data.text || data.content;
            
            if (botResponse && typeof botResponse === 'string' && botResponse.trim().length > 0) {
              return botResponse;
            } else {
              //console.warn("⚠️ No valid response text found in data:", data);
              return "I received your message but the response was empty. Please try again.";
            }
          } catch (jsonError) {
           // console.error("❌ Failed to parse JSON response:", jsonError);
            const textResponse = await response.text();
            //console.log("📄 Raw response text:", textResponse);
            return textResponse || "I received your message but couldn't parse the response.";
          }
        } else {
          let errorDetails = "";
          try {
            const errorData = await response.json();
           // console.error("❌ API Error Data:", errorData);
            errorDetails = errorData.error || errorData.message || JSON.stringify(errorData);
          } catch {
            errorDetails = await response.text();
           // console.error("❌ API Error Text:", errorDetails);
          }
          
          switch (response.status) {
            case 400:
              return "The message format wasn't accepted by MM Advisor. Please try rephrasing your question.";
            case 404:
              return "MM Advisor endpoint not found. Please check if the API server is properly configured.";
            case 500:
              return `MM Advisor server encountered an internal error. ${errorDetails ? `Error: ${errorDetails}` : 'Please try again later or contact support.'}`;
            case 503:
              return "MM Advisor service is temporarily unavailable. Please try again in a moment.";
            default:
              return `MM Advisor returned an error (${response.status}). ${errorDetails || 'Please try again later.'}`;
          }
        }
      } catch (error) {
        console.error("🔥 Error calling MM Advisor API:", error);
        
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          return "❌ Cannot connect to MM Advisor. Please make sure:\n• The server is running on localhost:8080\n• CORS is properly configured\n• The API endpoint exists";
        }
        
        if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
          return "❌ Network error connecting to MM Advisor. Please check your connection and try again.";
        }
        
        return `❌ MM Advisor Error: ${error.message}. Please try switching back to 'MM' or check the server logs.`;
      }
    }
    
    return getBotResponse(message);
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase().trim();

    const greetings = ["hi", "hello", "hey", "good morning", "good evening", "good afternoon"];
    if (greetings.includes(message)) {
      return "Hello! 👋 I'm here to assist you with anything related to your job search, profile updates, or support. What would you like to do today?";
    }

    const thanksMessages = ["thank you", "thanks", "thank u", "thx", "ty"];
    if (thanksMessages.some(thank => message.includes(thank))) {
      return "You're welcome! 😊 Let me know if there's anything else I can help you with.";
    }

    if (message === "quick actions") {
      setShowQuickActions(true);
      return {
        text: "Here are some quick actions you can use:",
        hasQuickActions: true
      };
    }

    if (waitingForConfirmation) {
      if (message.includes("yes") || message.includes("sure") || message.includes("okay") || message.includes("ok")) {
        setWaitingForConfirmation("");
        return "Great! Let me help you with that.";
      } else if (message.includes("no") || message.includes("not")) {
        setWaitingForConfirmation("");
        setShowQuickActions(true);
        return {
          text: "No problem! You can use the quick actions below or ask me directly.",
          hasQuickActions: true
        };
      }
    }

    if (message.includes("profile update") || message.includes("update profile") || message.includes("profile")) {
      setShowQuickActions(false);
      setShowProfileSubOptions(true);
      setCurrentContext("profile");
      setTimeout(() => {
        const profileOptionsMessage = {
          id: (Date.now() + 2).toString(),
          text: "Great! I can help you update different parts of your profile. Here are the sections you can update:\n\n:clipboard: Choose from the options below to update specific parts of your profile:",
          sender: "bot",
          timestamp: new Date(),
          hasSubOptions: true,
          showBackButton: true,
        };
        setMessages((prev) => [...prev, profileOptionsMessage]);
      }, 1000);
      return "Perfect! Let me show you all the profile sections you can update.";
    }

    const profileSubOption = detectProfileSubOption(userMessage);
    if (profileSubOption) {
      setTimeout(() => {
        const redirectMessage = {
          id: (Date.now() + 2).toString(),
          text: `Perfect! I'll help you update your ${profileSubOption.label.toLowerCase()}. Click the button below to go to the ${profileSubOption.label.toLowerCase()} section:`,
          sender: "bot",
          timestamp: new Date(),
          showRedirectButton: true,
          redirectUrl: profileSubOption.redirectUrl,
          actionLabel: profileSubOption.label,
          showBackButton: true,
        };
        setMessages((prev) => [...prev, redirectMessage]);
      }, 1000);
      return `Great! I'll help you with your ${profileSubOption.label.toLowerCase()}.`;
    }

    const directNav = detectDirectNavigation(userMessage);
    if (directNav) {
      setTimeout(() => {
        const redirectMessage = {
          id: (Date.now() + 2).toString(),
          text: `Click the button below to go to ${directNav.label.toLowerCase()}:`,
          sender: "bot",
          timestamp: new Date(),
          showRedirectButton: true,
          redirectUrl: directNav.url,
          actionLabel: directNav.label,
          showBackButton: true,
        };
        setMessages((prev) => [...prev, redirectMessage]);
      }, 1000);
      return `I'll redirect you to ${directNav.label.toLowerCase()}.`;
    }

    if (detectJobSearch(userMessage)) {
      const searchTerm = extractJobSearchTerm(userMessage);
      if (searchTerm) {
        setTimeout(() => {
          const redirectMessage = {
            id: (Date.now() + 2).toString(),
            text: `Click the button below to search for ${searchTerm} jobs:`,
            sender: "bot",
            timestamp: new Date(),
            showRedirectButton: true,
            redirectUrl: `/jobs?search=${encodeURIComponent(searchTerm)}`,
            actionLabel: `${searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)} Jobs`,
            showBackButton: true,
          };
          setMessages((prev) => [...prev, redirectMessage]);
        }, 1000);
        return `I found several ${searchTerm} opportunities for you! Let me show you the available positions.`;
      }
      return "I can help you find job opportunities! What specific role or technology are you interested in?";
    }

    if (message.includes("help") || message.includes("support")) {
      return "I'm here to help! You can:\n\n:mag: Search for jobs\n:bust_in_silhouette: Update your profile\n:gear: Manage settings\n:telephone_receiver: Contact support\n\nWhat would you like to do?";
    }

    return "Thanks for your message! You can use the quick actions or ask me about specific topics like jobs, profile updates, account settings, Contact, payment or FAQ & Support.";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    const currentInputText = inputText;
    setInputText("");
    setIsTyping(true);

    setTimeout(async () => {
      const response = await sendToAPI(currentInputText);
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: typeof response === 'string' ? response : response.text,
        sender: "bot",
        timestamp: new Date(),
        hasQuickActions: typeof response === 'object' ? response.hasQuickActions : false,
        showBackButton: !showQuickActions && typeof response === 'string',
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);

      if (typeof response === 'object' && response.hasQuickActions) {
        setShowQuickActions(true);
      }
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`chatbox theme-${currentTheme}`}>
      <div className="chat-box">
        {/* Chat Header */}
        <div className="chat-header">
          <div className="chat-header-content">
            <div className="chat-header-info">
              <div className="chat-avatar">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="chat-title">Job Portal Assistant</h3>
                <p className="chat-subtitle">Always here to help</p>
              </div>
            </div>
            <div className="theme-selector">
              <select
                value={currentTheme}
                onChange={(e) => setCurrentTheme(e.target.value)}
                className="theme-dropdown"
              >
                {themes.map(theme => (
                  <option key={theme.id} value={theme.id}>
                    {theme.icon} {theme.name}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={onClose} className="close-button">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages chat-scroll">
          {messages.map((message) => (
            <div key={message.id}>
              {message.sender === "bot" ? (
                <div className="message-bot">
                  <div className="bot-avatar">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="message-bubble-bot">
                      <p className="message-text-bot">{message.text}</p>
                    </div>
                    <p className="message-timestamp">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="message-user">
                  <div className="flex-1 flex justify-end">
                    <div className="message-bubble-user">
                      <p className="message-text-user">{message.text}</p>
                    </div>
                  </div>
                  <div className="user-avatar">
                    <User className="w-4 h-4 text-slate-600" />
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              {message.hasQuickActions && showQuickActions && (
                <div className="quick-actions-container">
                  <h4 className="quick-actions-title">Quick Actions</h4>
                  <div className="quick-actions-grid">
                    {quickActions.map((action) => {
                      const IconComponent = action.icon;
                      const colorClass = `action-${action.color}`;
                      return (
                        <button
                          key={action.id}
                          onClick={() => handleQuickAction(action.id)}
                          className={`quick-action-button ${colorClass}`}
                        >
                          <div className="quick-action-header">
                            <IconComponent className="w-4 h-4" />
                            <span className="quick-action-label">{action.label}</span>
                          </div>
                          <p className="quick-action-description">{action.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Profile Sub Options */}
              {message.hasSubOptions && showProfileSubOptions && (
                <div className="profile-options-container">
                  <h4 className="profile-options-title">Profile Sections</h4>
                  <div className="profile-options-list">
                    {profileSubOptions.map((option) => {
                      const IconComponent = option.icon;
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleProfileSubOption(option)}
                          className="profile-option-button"
                        >
                          <IconComponent className="profile-option-icon w-4 h-4" />
                          <div>
                            <span className="profile-option-label">{option.label}</span>
                            <p className="profile-option-description">{option.description}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Redirect Button */}
              {message.showRedirectButton && (
                <div className="button-container">
                  <button
                    onClick={() => navigate(message.redirectUrl || "/")}
                    className="redirect-button"
                  >
                    <span>Go to {message.actionLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Back to Quick Links Button */}
              {message.showBackButton && !showQuickActions && (
                <div className="button-container">
                  <button
                    onClick={handleBackToQuickLinks}
                    className="back-button"
                  >
                    <ArrowLeft className="back-arrow w-4 h-4" />
                    <span>Back to Quick Links</span>
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="typing-indicator">
              <div className="bot-avatar">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="message-bubble-bot">
                  <div className="typing-dots">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
      <div className="chat-input-container">
  <div className="chat-input-wrapper">
    <div className="flex-1 relative">
      <input
        ref={inputRef}
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        className="chat-input-field"
      />

      {/* API Selector Dropdown - inside input */}
      <div className="api-selector-container">
        <select
          value={selectedAPI}
          onChange={(e) => setSelectedAPI(e.target.value)}
          className="api-selector-dropdown"
        >
          {apiOptions.map(api => (
            <option key={api.id} value={api.id}>
              {api.name}
            </option>
          ))}
        </select>
      </div>
    </div>

    <button onClick={handleSendMessage} className="send-button">
      <Send className="w-4 h-4 text-white" />
    </button>
  </div>

  <p className="chat-input-hint">
    Press Enter to send • Use quick actions for faster help
  </p>
</div>

      </div>
    </div>
  );
};

export default ChatBox;