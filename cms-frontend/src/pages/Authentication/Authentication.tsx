import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Login from './Login'
import Signup from './Signup'
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Authentication() {
  const [activeTab, setActiveTab] = useState<string>("login")
  const navigate = useNavigate()

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center relative bg-black/90 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="brand-circle brand-circle-1 bg-indigo-500/10"
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="brand-circle brand-circle-2 bg-purple-500/10"
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="brand-circle brand-circle-3 bg-blue-500/10"
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black"></div>

      {/* Logo/Brand - Top Left */}
      <motion.div
        className="absolute top-6 left-6 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1
          className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-blue-500 bg-clip-text text-transparent cursor-pointer"
          onClick={() => navigate('/')}
        >
          Content Aura
        </h1>
      </motion.div>

      <Toaster />
      <Sonner />

      <motion.div
        className="w-[90%] md:w-[450px] z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="auth-card">
          <Tabs
            defaultValue="login"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-zinc-400 hover:text-white/90"
              >
                Log In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-zinc-400 hover:text-white/90"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <div className="w-full">
              <TabsContent value="login" className="auth-tab-panel">
                <Login setActiveTab={setActiveTab} />
              </TabsContent>
              <TabsContent value="signup" className="auth-tab-panel">
                <Signup setActiveTab={setActiveTab} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </motion.div>
      <Footer />
    </div>
  )
}