import React, { useState } from 'react';
import { Wrench, GraduationCap, Trophy, Eye, Star, Award, Layers, Terminal, Database, Cpu, Globe, Code2, BookOpen } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import Modal from './Modal';
import { Activity } from '../types';

const Skills: React.FC = () => {
  const { data } = useLanguage();
  const { skills, education, activities, ui, projects } = data;
  
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const handleDocumentClick = (docName: string) => {
    alert(`${ui.common.contactForAccess}: ${docName}`);
  };

  // Filter projects related to the selected skill
  const relatedProjects = selectedSkill 
    ? projects.filter(p => p.technologies.toLowerCase().includes(selectedSkill.toLowerCase()) || 
                           p.description.toLowerCase().includes(selectedSkill.toLowerCase()))
    : [];

  return (
    <section className="relative py-20 w-full overflow-hidden bg-slate-50/50 dark:bg-slate-900/50" id="section-skills">
      
      {/* --- BACKGROUND DECORATIONS (Filling the empty sides) --- */}
      
      {/* 1. Technical Grid Pattern (Subtle background texture) */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ 
          backgroundImage: 'linear-gradient(#475569 1px, transparent 1px), linear-gradient(to right, #475569 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
      }}></div>

      {/* Local Stars specifically for this section */}
      <div className="absolute top-1/4 left-10 text-vn-yellow/30 animate-pulse-slow"><Star size={20} /></div>
      <div className="absolute top-1/2 right-10 text-vn-red/30 animate-bounce-slow"><Star size={28} /></div>
      <div className="absolute bottom-20 left-1/4 text-slate-300 dark:text-slate-600 animate-spin-slow"><Star size={16} /></div>

      {/* 2. Left Side Floating Elements (Code/Dev Theme) */}
      {/* Updated to show on xl screens, scaled down slightly */}
      <div className="absolute top-40 left-0 w-32 xl:w-40 h-full hidden xl:flex flex-col gap-24 items-center pointer-events-none opacity-20">
          <div className="transform -rotate-12 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl animate-bounce-slow">
              <Terminal size={40} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div className="transform rotate-6 p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl animate-pulse-slow delay-700">
              <Code2 size={40} className="text-yellow-600 dark:text-yellow-400" />
          </div>
          <div className="font-mono text-xs text-slate-400 -rotate-90 origin-center whitespace-nowrap">
              def build_future(self):
          </div>
      </div>

      {/* 3. Right Side Floating Elements (Data/Infra Theme) */}
      {/* Updated to show on xl screens, scaled down slightly */}
      <div className="absolute top-40 right-0 w-32 xl:w-40 h-full hidden xl:flex flex-col gap-24 items-center pointer-events-none opacity-20">
          <div className="transform rotate-12 p-4 bg-red-100 dark:bg-red-900/30 rounded-2xl animate-bounce-slow delay-300">
              <Database size={40} className="text-vn-red" />
          </div>
          <div className="transform -rotate-6 p-4 bg-green-100 dark:bg-green-900/30 rounded-2xl animate-pulse-slow delay-1000">
              <Cpu size={40} className="text-green-600 dark:text-green-400" />
          </div>
          <div className="font-mono text-xs text-slate-400 rotate-90 origin-center whitespace-nowrap">
              SELECT * FROM success
          </div>
      </div>

      {/* Soft Background Blobs (Kept but moved to background) */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-red-100 dark:bg-red-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-40 animate-blob pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-40 animate-blob animation-delay-4000 pointer-events-none"></div>
      
      {/* Connector ID */}
      <div id="cv-horizontal-connector" className="absolute top-0 left-4 md:left-[4.5rem] w-4 h-20"></div>

      {/* --- MAIN CONTENT CONTAINER (Wider: max-w-[90rem]) --- */}
      <div className="relative mt-8 animate-fade-in-up w-full max-w-[95%] xl:max-w-[90rem] mx-auto z-10">
        
        {/* --- DISTINCT BANNER (RED) --- */}
        <div className="relative z-20 bg-vn-red-dark text-white rounded-t-3xl p-6 md:p-10 shadow-2xl border-b-4 border-vn-yellow flex flex-col md:flex-row items-center justify-between overflow-hidden group">
            {/* Animated background texture for banner */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] group-hover:scale-110 transition-transform duration-1000"></div>
            
            <div className="relative z-10 flex items-center gap-6">
                <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 shadow-inner group-hover:rotate-12 transition-transform duration-500">
                    <Layers size={40} className="text-vn-yellow" />
                </div>
                <div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight mb-1">{ui.sections.competency}</h2>
                    <div className="flex items-center gap-3 text-white/70 text-sm font-medium tracking-wide">
                        <span className="flex items-center gap-1"><Wrench size={14}/> {ui.sections.skills}</span>
                        <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                        <span className="flex items-center gap-1"><GraduationCap size={14}/> {ui.sections.education}</span>
                        <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                        <span className="flex items-center gap-1"><Trophy size={14}/> {ui.sections.activities}</span>
                    </div>
                </div>
            </div>

            {/* Decorative ERP Icon (Database) on the right of banner */}
            <div className="relative z-10 hidden md:block opacity-40">
                <Database size={120} className="text-white absolute right-[-20px] top-[-60px] animate-spin-slow" />
            </div>

            <div id="cv-horizontal-track" className="w-full absolute bottom-0 left-0 h-1"></div>
        </div>

        {/* --- 3 COLUMNS CONTENT --- */}
        <div className="bg-white dark:bg-slate-900 rounded-b-3xl shadow-2xl shadow-slate-200 dark:shadow-slate-950 border border-slate-200 dark:border-slate-800 p-6 md:p-10 relative z-10">
             
             {/* Use xl:gap-12 for more spacing on large screens */}
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
                
                {/* COLUMN 1: SKILLS */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3 mb-2 pb-4 border-b-2 border-slate-100 dark:border-slate-800">
                        <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-vn-red">
                            <Wrench size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-wide">{ui.sections.skills}</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 h-full content-start">
                        {skills.map((category, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-md hover:shadow-xl hover:border-vn-red/30 dark:hover:border-vn-red/50 hover:-translate-y-1 transition-all duration-300 group/skill relative overflow-hidden">
                                <div className="absolute right-0 top-0 p-3 opacity-10 group-hover/skill:opacity-20 transition-opacity">
                                    <Star size={40} className="text-vn-yellow" />
                                </div>
                                <h4 className="text-sm font-bold text-slate-600 dark:text-slate-200 uppercase mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-vn-yellow"></span>
                                    {category.name}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.split(',').map((skill, sIdx) => (
                                        <button 
                                            key={sIdx}
                                            onClick={() => setSelectedSkill(skill.trim())}
                                            className="text-xs font-semibold px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-vn-red hover:text-white hover:border-vn-red transition-all shadow-sm"
                                        >
                                            {skill.trim()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* COLUMN 2: EDUCATION */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3 mb-2 pb-4 border-b-2 border-slate-100 dark:border-slate-800">
                        <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
                            <GraduationCap size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-wide">{ui.sections.education}</h3>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-white dark:from-slate-800 dark:to-slate-800 p-6 rounded-3xl border border-green-100 dark:border-slate-700 shadow-xl h-full relative overflow-hidden group/edu hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-100/50 dark:bg-green-900/10 rounded-bl-[100px] -mr-8 -mt-8 z-0 transition-transform duration-500 group-hover/edu:scale-150"></div>
                        
                        <div className="relative z-10 flex-1">
                            <h4 className="font-display font-bold text-slate-900 dark:text-white text-2xl leading-tight mb-2 group-hover/edu:text-green-700 dark:group-hover/edu:text-green-400 transition-colors">{education.school}</h4>
                            <p className="text-green-700 dark:text-green-400 font-bold text-base mb-6 uppercase tracking-wide">{education.major}</p>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <BookOpen size={18} className="text-slate-400 mt-1 shrink-0" />
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase font-bold">{ui.labels.specialization}</p>
                                        <p className="text-slate-700 dark:text-slate-300 font-medium">{education.specialization}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Award size={18} className="text-slate-400 mt-1 shrink-0" />
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase font-bold">{ui.labels.gpa}</p>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{education.gpa}</p>
                                    </div>
                                </div>
                                <div className="inline-block px-4 py-1.5 bg-white dark:bg-slate-900 rounded-full text-sm font-bold text-slate-600 dark:text-slate-300 shadow-sm border border-slate-100 dark:border-slate-700">
                                    {education.period}
                                </div>
                            </div>

                            {/* Added Description to fill white space */}
                            {education.description && (
                                <div className="mb-8 p-4 bg-green-50/50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-900/30">
                                    <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                                        "{education.description}"
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 mt-auto pt-6 border-t border-green-100 dark:border-slate-700 relative z-10">
                             <button onClick={() => handleDocumentClick(ui.common.documents.diploma)} className="flex-1 py-3 bg-white dark:bg-slate-900 text-green-700 dark:text-green-400 text-sm font-bold rounded-xl shadow-sm border border-green-100 dark:border-slate-700 hover:bg-green-600 hover:text-white transition-colors flex items-center justify-center gap-2 group/btn">
                                <Award size={16} className="group-hover/btn:scale-110 transition-transform"/> {ui.common.documents.diploma}
                             </button>
                             <button onClick={() => handleDocumentClick(ui.common.documents.transcript)} className="flex-1 py-3 bg-white dark:bg-slate-900 text-green-700 dark:text-green-400 text-sm font-bold rounded-xl shadow-sm border border-green-100 dark:border-slate-700 hover:bg-green-600 hover:text-white transition-colors flex items-center justify-center gap-2 group/btn">
                                <Eye size={16} className="group-hover/btn:scale-110 transition-transform"/> {ui.common.documents.transcript}
                             </button>
                        </div>
                    </div>
                </div>

                {/* COLUMN 3: ACTIVITIES */}
                <div className="flex flex-col gap-6">
                     <div className="flex items-center gap-3 mb-2 pb-4 border-b-2 border-slate-100 dark:border-slate-800">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                            <Trophy size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-wide">{ui.sections.activities}</h3>
                    </div>

                    <div className="flex flex-col gap-4 h-full overflow-y-auto max-h-[600px] custom-scrollbar pr-2">
                        {activities.map((act, idx) => (
                            <div 
                                key={idx}
                                onClick={() => setSelectedActivity(act)}
                                className="bg-white dark:bg-slate-800 p-5 rounded-2xl border-l-4 border-l-blue-200 dark:border-l-blue-700 border-y border-r border-slate-100 dark:border-y-slate-700 dark:border-r-slate-700 shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-l-blue-600 transition-all cursor-pointer group/act relative"
                            >
                                <div className="absolute top-2 right-2 opacity-0 group-hover/act:opacity-100 transition-opacity">
                                    <Eye size={16} className="text-blue-400" />
                                </div>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider bg-slate-50 dark:bg-slate-900 px-2 py-1 rounded">{act.period}</span>
                                </div>
                                <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 leading-snug mb-2 group-hover/act:text-blue-600 dark:group-hover/act:text-blue-400 transition-colors">{act.title}</h4>
                                {act.role && <span className="inline-block text-[10px] font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded mb-2 border border-blue-100 dark:border-blue-900/50">{act.role}</span>}
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{act.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

             </div>
        </div>
      </div>

      {/* Skill Modal */}
      <Modal 
        isOpen={!!selectedSkill}
        onClose={() => setSelectedSkill(null)}
        title={`${selectedSkill}`}
      >
         <div className="space-y-6">
             <div className="flex items-center gap-2 mb-4">
                <span className="p-2 bg-vn-red/10 rounded-full text-vn-red"><Wrench size={18}/></span>
                <p className="text-slate-600 dark:text-slate-300 text-sm">Skills involving <span className="font-bold text-slate-900 dark:text-white">{selectedSkill}</span></p>
             </div>
             
             <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide border-b border-slate-100 dark:border-slate-700 pb-2">{ui.common.relatedProjects}</h4>
             {relatedProjects.length > 0 ? (
                 <div className="grid gap-4">
                     {relatedProjects.map(p => (
                         <div key={p.id} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-vn-red/30 transition-colors">
                             <div className="flex justify-between items-start mb-1">
                                <h5 className="font-bold text-slate-900 dark:text-white">{p.name}</h5>
                                <span className="text-[10px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded text-slate-500">{p.period}</span>
                             </div>
                             <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{p.description}</p>
                         </div>
                     ))}
                 </div>
             ) : (
                 <div className="text-center py-8 bg-slate-50 dark:bg-slate-800 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                     <p className="text-slate-400 text-sm">Used in general development tasks or academic projects.</p>
                 </div>
             )}
         </div>
      </Modal>

      {/* Activity Modal */}
      <Modal 
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        title={selectedActivity?.title || ''}
      >
          {selectedActivity && (
              <div className="space-y-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl flex flex-col items-center text-center">
                       <Trophy size={40} className="text-blue-500 mb-3" />
                       <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{selectedActivity.title}</h3>
                       <div className="flex flex-wrap gap-2 justify-center mt-2">
                            {selectedActivity.role && (
                                <span className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-bold px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900/50 shadow-sm">
                                    {selectedActivity.role}
                                </span>
                            )}
                            <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                                {selectedActivity.period}
                            </span>
                       </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">{ui.labels.description}</h4>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg p-4 border-l-4 border-blue-200 dark:border-blue-800 bg-slate-50 dark:bg-slate-800 rounded-r-xl">
                        {selectedActivity.description}
                    </p>
                  </div>
              </div>
          )}
      </Modal>
    </section>
  );
};

export default Skills;