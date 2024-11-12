'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Users, BarChart, Zap } from 'lucide-react'

export default function AboutUs() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#09203F] to-[#537895] text-white p-8 font-[Calibri,sans-serif]">
      <motion.div
        initial="initial"
        animate="animate"
        variants={stagger}
        className="max-w-4xl mx-auto space-y-12"
      >
        <motion.h1 {...fadeIn} className="text-4xl font-bold text-center mb-8">
          About AceISA
        </motion.h1>

        <motion.p {...fadeIn} className="text-xl text-center">
          AceISA makes learning fun and easy through online quizzes. Our platform helps teachers create quizzes and students learn from them.
        </motion.p>

        <motion.section {...fadeIn} className="space-y-4">
          <h2 className="text-3xl font-semibold">What We Do</h2>
          <p>We&apos;ve built a simple quiz platform that:</p>
          <motion.ul variants={stagger} className="list-none space-y-2">
            {[
              "Lets teachers make and manage quizzes",
              "Helps students practice and test their knowledge",
              "Shows everyone's progress on leaderboards"
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={fadeIn}
                className="flex items-center space-x-2"
              >
                <ArrowRight className="flex-shrink-0 w-5 h-5 text-blue-300" />
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>

        <motion.section {...fadeIn} className="space-y-4">
          <h2 className="text-3xl font-semibold">Why Choose Us</h2>
          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Zap, text: "Easy to use" },
              { icon: Users, text: "Fun and interactive" },
              { icon: BarChart, text: "Helps track progress" },
              { icon: Users, text: "Works great for both teachers and students" }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="flex items-center space-x-2 bg-white bg-opacity-10 p-4 rounded-lg"
              >
                <item.icon className="flex-shrink-0 w-6 h-6 text-blue-300" />
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section {...fadeIn} className="space-y-4">
          <h2 className="text-3xl font-semibold">How It Works</h2>
          <p>
            Teachers can quickly create quizzes, while students can take them anytime. Our platform automatically tracks scores and shows who&apos;s doing well through leaderboards.
          </p>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center text-3xl font-bold mt-12"
        >
          AceISA - Making Learning Fun
        </motion.div>
      </motion.div>
    </div>
  )
}