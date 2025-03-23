// "use client"

// import { Home, LogOut, Settings, User, Shield } from "lucide-react"
// import { Button } from "@/components/ui/button"

// interface AppSidebarProps {
//   onLogout: () => void
//   userType: "resident" | "security" | null
// }

// export function AppSidebar({ onLogout, userType }: AppSidebarProps) {
//   return (
//     <div className="w-64 bg-white dark:bg-gray-800 h-screen p-4 border-r border-gray-200 dark:border-gray-700 flex flex-col">
//       <div className="mb-8">
//         <h1 className="text-xl font-bold">Residence App</h1>
//         <p className="text-sm text-gray-500 dark:text-gray-400">
//           {userType ? `Logged in as ${userType}` : "Development environment"}
//         </p>
//       </div>

//       <nav className="space-y-1 flex-1">
//         <Button variant="ghost" className="w-full justify-start">
//           <Home className="mr-2 h-4 w-4" />
//           Dashboard
//         </Button>
//         {userType === "resident" && (
//           <Button variant="ghost" className="w-full justify-start">
//             <User className="mr-2 h-4 w-4" />
//             Resident Portal
//           </Button>
//         )}
//         {userType === "security" && (
//           <Button variant="ghost" className="w-full justify-start">
//             <Shield className="mr-2 h-4 w-4" />
//             Security Portal
//           </Button>
//         )}
//         <Button variant="ghost" className="w-full justify-start">
//           <Settings className="mr-2 h-4 w-4" />
//           Settings
//         </Button>
//       </nav>

//       <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
//         <Button variant="ghost" className="w-full justify-start text-red-500" onClick={onLogout}>
//           <LogOut className="mr-2 h-4 w-4" />
//           Logout
//         </Button>
//       </div>
//     </div>
//   )
// }
