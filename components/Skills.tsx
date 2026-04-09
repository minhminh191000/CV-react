import React, { useState } from 'react';
import { Wrench, GraduationCap, Trophy, Eye, Star, Award, Layers, Terminal, Database, Cpu, Globe, Code2, BookOpen, Server, Bot, Users } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import Modal from './Modal';
import { Activity } from '../types';

// Map category name keywords to icon + color theme
const getCategoryStyle = (name: string): { icon: React.ReactNode; color: string; bg: string; border: string; badge: string } => {
  const n = name.toLowerCase();
  if (n.includes('ai') || n.includes('agent')) return { icon: <Bot size={18} />, color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-900/20', border: 'border-violet-400/40', badge: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800' };
  if (n.includes('odoo') || n.includes('erp')) return { icon: <Layers size={18} />, color: 'text-vn-red', bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-vn-red/40', badge: 'bg-red-100 dark:bg-red-900/40 text-vn-red dark:text-red-300 border-red-200 dark:border-red-800' };
  if (n.includes('python')) return { icon: <Terminal size={18} />, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-400/40', badge: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' };
  if (n.includes('frontend') || n.includes('giao diện')) return { icon: <Globe size={18} />, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-400/40', badge: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800' };
  if (n.includes('database') || n.includes('cơ sở dữ liệu')) return { icon: <Database size={18} />, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-400/40', badge: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800' };
  if (n.includes('devops') || n.includes('tool') || n.includes('công cụ')) return { icon: <Server size={18} />, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-400/40', badge: 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800' };
  if (n.includes('rpa') || n.includes('auto') || n.includes('tự động')) return { icon: <Bot size={18} />, color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-50 dark:bg-cyan-900/20', border: 'border-cyan-400/40', badge: 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800' };
  if (n.includes('soft') || n.includes('kỹ năng mềm') || n.includes('leader')) return { icon: <Users size={18} />, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-400/40', badge: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800' };
  return { icon: <Code2 size={18} />, color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-50 dark:bg-slate-800', border: 'border-slate-300/40', badge: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600' };
};

const Skills: React.FC = () => {
  const { data } = useLanguage();
  const { skills, education, activities, ui, projects } = data;

  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const handleDocumentClick = (docName: string) => {
    alert(`${ui.common.contactForAccess}: ${docName}`);
  };

  const relatedProjects = selectedSkill
    ? projects.filter(p =>
        p.technologies.toLowerCase().includes(selectedSkill.toLowerCase()) ||
        p.description.toLowerCase().includes(selectedSkill.toLowerCase())
      )
    : [];

  return (
    <section className="relative py-20 w-full overflow-hidden bg-slate-50/50 dark:bg-slate-900/50" id="section-skills">

      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: 'linear-gradient(#475569 1px, transparent 1px), linear-gradient(to right, #475569 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      {/* Floating stars */}
      <div className="absolute top-1/4 left-10 text-vn-yellow/30 animate-pulse-slow"><Star size={20} /></div>
      <div className="absolute top-1/2 right-10 text-vn-red/30 animate-bounce-slow"><Star size={28} /></div>
      <div className="absolute bottom-20 left-1/4 text-slate-300 dark:text-slate-600 animate-spin-slow"><Star size={16} /></div>

      {/* Left side decoration */}
      <div className="absolute top-40 left-0 w-32 xl:w-40 h-full hidden xl:flex flex-col gap-24 items-center pointer-events-none opacity-20">
        <div className="transform -rotate-12 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl animate-bounce-slow">
          <Terminal size={40} className="text-blue-600 dark:text-blue-400" />
        </div>
        <div className="transform rotate-6 p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl animate-pulse-slow delay-700">
          <Code2 size={40} className="text-yellow-600 dark:text-yellow-400" />
        </div>
        <div className="font-mono text-xs text-slate-400 -rotate-90 origin-center whitespace-nowrap">def build_future(self):</div>
      </div>

      {/* Right side decoration */}
      <div className="absolute top-40 right-0 w-32 xl:w-40 h-full hidden xl:flex flex-col gap-24 items-center pointer-events-none opacity-20">
        <div className="transform rotate-12 p-4 bg-red-100 dark:bg-red-900/30 rounded-2xl animate-bounce-slow delay-300">
          <Database size={40} className="text-vn-red" />
        </div>
        <div className="transform -rotate-6 p-4 bg-green-100 dark:bg-green-900/30 rounded-2xl animate-pulse-slow delay-1000">
          <Cpu size={40} className="text-green-600 dark:text-green-400" />
        </div>
        <div className="font-mono text-xs text-slate-400 rotate-90 origin-center whitespace-nowrap">SELECT * FROM success</div>
      </div>

      {/* Background blobs */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-red-100 dark:bg-red-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-40 animate-blob pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-40 animate-blob animation-delay-4000 pointer-events-none"></div>

      <div id="cv-horizontal-connector" className="absolute top-0 left-4 md:left-[4.5rem] w-4 h-20"></div>

      {/* Main container */}
      <div className="relative mt-8 animate-fade-in-up w-full max-w-[95%] xl:max-w-[90rem] mx-auto z-10">

        {/* Banner */}
        <div className="relative z-20 bg-vn-red-dark text-white rounded-t-3xl p-6 md:p-10 shadow-2xl border-b-4 border-vn-yellow flex flex-col md:flex-row items-center justify-between overflow-hidden group">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] group-hover:scale-110 transition-transform duration-1000"></div>
          <div className="relative z-10 flex items-center gap-6">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 shadow-inner group-hover:rotate-12 transition-transform duration-500">
              <Layers size={40} className="text-vn-yellow" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight mb-1">{ui.sections.competency}</h2>
              <div className="flex items-center gap-3 text-white/70 text-sm font-medium tracking-wide">
                <span className="flex items-center gap-1"><Wrench size={14} /> {ui.sections.skills}</span>
                <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                <span className="flex items-center gap-1"><GraduationCap size={14} /> {ui.sections.education}</span>
                <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                <span className="flex items-center gap-1"><Trophy size={14} /> {ui.sections.activities}</span>
              </div>
            </div>
          </div>
          <div className="relative z-10 hidden md:block opacity-40">
            <Database size={120} className="text-white absolute right-[-20px] top-[-60px] animate-spin-slow" />
          </div>
          <div id="cv-horizontal-track" className="w-full absolute bottom-0 left-0 h-1"></div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-900 rounded-b-3xl shadow-2xl shadow-slate-200 dark:shadow-slate-950 border border-slate-200 dark:border-slate-800 p-6 md:p-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">

            {/* COLUMN 1: SKILLS */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 mb-2 pb-4 border-b-2 border-slate-100 dark:border-slate-800">
                <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-vn-red">
                  <Wrench size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-wide">{ui.sections.skills}</h3>
              </div>

              <div className="flex flex-col gap-4">
                {skills.map((category, idx) => {
                  const style = getCategoryStyle(category.name);
                  const items = category.skills.split(',').map(s => s.trim());
                  return (
                    <div key={idx} className={`p-5 rounded-2xl border ${style.border} ${style.bg} shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group/skill relative overflow-hidden`}>
                      {/* Category header */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`${style.color}`}>{style.icon}</span>
                        <h4 className={`text-sm font-bold uppercase tracking-wide ${style.color}`}>{category.name}</h4>
                        <span className="ml-auto text-[10px] font-bold text-slate-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                          {items.length}
                        </span>
                      </div>
                      {/* Skill badges */}
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => setSelectedSkill(skill)}
                            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all shadow-sm hover:scale-105 hover:shadow-md ${style.badge}`}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
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
                  {education.description && (
                    <div className="mb-8 p-4 bg-green-50/50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-900/30">
                      <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">"{education.description}"</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-3 mt-auto pt-6 border-t border-green-100 dark:border-slate-700 relative z-10">
                  <button onClick={() => handleDocumentClick(ui.common.documents.diploma)} className="flex-1 py-3 bg-white dark:bg-slate-900 text-green-700 dark:text-green-400 text-sm font-bold rounded-xl shadow-sm border border-green-100 dark:border-slate-700 hover:bg-green-600 hover:text-white transition-colors flex items-center justify-center gap-2 group/btn">
                    <Award size={16} className="group-hover/btn:scale-110 transition-transform" /> {ui.common.documents.diploma}
                  </button>
                  <button onClick={() => handleDocumentClick(ui.common.documents.transcript)} className="flex-1 py-3 bg-white dark:bg-slate-900 text-green-700 dark:text-green-400 text-sm font-bold rounded-xl shadow-sm border border-green-100 dark:border-slate-700 hover:bg-green-600 hover:text-white transition-colors flex items-center justify-center gap-2 group/btn">
                    <Eye size={16} className="group-hover/btn:scale-110 transition-transform" /> {ui.common.documents.transcript}
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
      <Modal isOpen={!!selectedSkill} onClose={() => setSelectedSkill(null)} title={`${selectedSkill}`}>
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-2 bg-vn-red/10 rounded-full text-vn-red"><Wrench size={18} /></span>
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
      <Modal isOpen={!!selectedActivity} onClose={() => setSelectedActivity(null)} title={selectedActivity?.title || ''}>
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
                <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full">{selectedActivity.period}</span>
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
