"use client";

import { motion } from "framer-motion";
import { 
  Bot, 
  MessageSquare, 
  BarChart2, 
  Plug, 
  LayoutDashboard, 
  Network,
  ArrowRight
} from "lucide-react";

export function Services() {
  const services = [
    {
      title: "Smart Workflow Automation",
      description: "Eliminate repetitive tasks and streamline workflows with intelligent automation that saves time and reduces errors.",
      icon: <Bot className="h-6 w-6" />,
    },
    {
      title: "Conversational AI Solutions",
      description: "Engage your customers instantly with AI chatbots and voice agents that understand, respond, and convert.",
      icon: <MessageSquare className="h-6 w-6" />,
    },
    {
      title: "Advanced Analytics & Forecasting",
      description: "Leverage AI to analyze data, predict trends, and make data-driven decisions with confidence.",
      icon: <BarChart2 className="h-6 w-6" />,
    },
    {
      title: "System Integrations",
      description: "Seamlessly connect your existing tools, platforms, and data sources into one unified and intelligent ecosystem.",
      icon: <Plug className="h-6 w-6" />,
    },
    {
      title: "Real-Time Insights Dashboard",
      description: "Visualize your key metrics in real time with custom dashboards that help you monitor, track, and act faster.",
      icon: <LayoutDashboard className="h-6 w-6" />,
    },
    {
      title: "End-to-End AI Orchestration",
      description: "Coordinate people, processes, tools, and AI agents to deliver seamless operations from start to scale.",
      icon: <Network className="h-6 w-6" />,
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-[#020617] relative overflow-hidden font-sans transition-colors" id="services">
      <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        
        {/* Header Section */}
        <div className="mb-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 flex items-center gap-2"
          >
            <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-black bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></span>
              OUR SERVICES
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Powerful AI Solutions. <br className="hidden md:block" />
            Built for <span className="text-blue-600">Real Impact.</span>
          </motion.h2>
          
          <motion.p 
            className="text-slate-600 dark:text-slate-300 max-w-2xl text-sm md:text-base font-medium leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            From automating operations to delivering actionable insights, we build AI systems that drive efficiency, growth, and innovation.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="group bg-white dark:bg-slate-900 rounded-[1.5rem] p-8 shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-200/40 dark:hover:shadow-blue-900/20 transition-all flex flex-col h-full cursor-pointer"
            >
              {/* Icon & Title */}
              <div className="flex items-center gap-5 mb-5">
                <div className="shrink-0 w-14 h-14 rounded-[1.25rem] bg-blue-50/80 dark:bg-blue-900/20 text-blue-600 dark:text-blue-500 flex items-center justify-center shadow-sm dark:shadow-none group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[15px] font-bold text-slate-900 dark:text-white leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <div className="w-6 h-0.5 bg-blue-600 rounded-full" />
                </div>
              </div>
              
              {/* Description */}
              <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>

              {/* Bottom Arrow Button */}
              <div className="mt-auto flex justify-end">
                <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 dark:group-hover:border-blue-600 transition-all duration-300 shadow-sm dark:shadow-none">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
