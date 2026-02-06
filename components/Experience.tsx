import React, { useState } from 'react';
import { Briefcase, ExternalLink, ChevronRight, Building2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import Modal from './Modal';
import { Experience as ExperienceType } from '../types';

const Experience: React.FC = () => {
  const { data } = useLanguage();
  const { experience, ui } = data;
  const [selectedExp, setSelectedExp] = useState<ExperienceType | null>(null);

  return (
    <>
      <section className="py-20 px-4 max-w-5xl mx-auto relative" id="section-experience">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '20px 20px', color: 'inherit' }}></div>

        {/* --- Section Title (Matches Header Style) --- */}
        <div className="flex justify-center mb-16 relative z-10 animate-fade-in-up">
            <div className="bg-slate-900 dark:bg-slate-800 text-white px-8 py-4 rounded-2xl shadow-xl flex flex-col items-center border-b-4 border-vn-red">
                <div className="flex items-center gap-2 text-vn-yellow text-xs font-bold uppercase tracking-widest mb-1">
                     <Briefcase size={14} />
                     <span>{ui.sections.careerPath}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight">
                    {ui.sections.experience}
                </h2>
            </div>
        </div>

        {/* --- Timeline Content --- */}
        {/* 
            ID for ScrollProgressLine to find. 
        */}
        <div id="cv-experience-timeline" className="relative ml-0 md:ml-4 space-y-12 z-10">
          {experience.map((exp, index) => (
            <div 
                key={exp.id} 
                className="relative pl-8 md:pl-16 group/item animate-fade-in-up break-inside-avoid"
                style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Timeline Dot (Anchor for the beam) */}
              <div className="absolute left-[-5px] md:left-[-1px] top-8 w-5 h-5 rounded-full bg-slate-50 dark:bg-slate-900 border-4 border-slate-300 dark:border-slate-600 group-hover/item:border-vn-red group-hover/item:scale-125 transition-all duration-300 z-20 shadow-sm"></div>
              
              {/* Card Container */}
              {/* Updated styles for floating effect: stronger shadow, specific borders, bg-slate-800 for dark mode contrast */}
              <div 
                onClick={() => setSelectedExp(exp)}
                className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-xl border border-slate-100 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group/card overflow-hidden"
              >
                {/* Accent Border Left */}
                <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 dark:bg-slate-700 group-hover/card:bg-vn-red transition-colors duration-300"></div>
                
                {/* Time Badge */}
                <div className="md:absolute top-6 right-6 inline-block bg-slate-900 dark:bg-slate-900 text-vn-yellow text-xs font-bold px-4 py-1.5 rounded-full shadow-md mb-4 md:mb-0 border border-slate-700 dark:border-slate-600">
                    {exp.period}
                </div>

                <div className="flex items-start gap-4 mb-4 md:pr-32">
                    {/* Company Icon Placeholder */}
                    <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 flex items-center justify-center shrink-0 group-hover/card:bg-red-50 dark:group-hover/card:bg-red-900/10 transition-colors">
                        <Building2 size={24} className="text-slate-400 group-hover/card:text-vn-red" />
                    </div>
                    
                    <div>
                        <h3 className="text-xl md:text-2xl font-display font-bold text-slate-800 dark:text-slate-100 leading-none mb-1 group-hover/card:text-vn-red transition-colors">
                            {exp.company}
                        </h3>
                        <h4 className="text-base font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2">
                           {exp.role}
                        </h4>
                    </div>
                </div>
                
                {/* Responsibilities Preview */}
                <div className="pl-16">
                    <ul className="space-y-2 mb-4">
                    {exp.responsibilities.slice(0, 2).map((res, index) => (
                        <li key={index} className="flex items-start text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        <span className="mr-2 mt-1.5 block w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover/card:bg-vn-yellow transition-colors shrink-0"></span>
                        <span className="line-clamp-2">{res}</span>
                        </li>
                    ))}
                    </ul>
                    
                    <div className="flex items-center gap-1 text-sm font-bold text-vn-red opacity-0 group-hover/card:opacity-100 transition-opacity transform translate-x-[-10px] group-hover/card:translate-x-0 duration-300">
                        <span>{ui.common.companyInfo}</span>
                        <ChevronRight size={16} />
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Detail Modal */}
      <Modal 
        isOpen={!!selectedExp} 
        onClose={() => setSelectedExp(null)}
        title={selectedExp?.company || ''}
      >
        {selectedExp && (
            <div className="space-y-8">
                {/* Header Info */}
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row justify-between gap-4">
                    <div>
                         <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">{ui.common.role}</span>
                         <h3 className="text-xl font-bold text-vn-red">{selectedExp.role}</h3>
                    </div>
                    <div>
                         <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">{ui.labels.time}</span>
                         <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{selectedExp.period}</h3>
                    </div>
                </div>

                {/* Company Summary */}
                <div>
                    <h4 className="flex items-center gap-2 font-display font-bold text-slate-900 dark:text-slate-100 text-lg mb-3 border-b border-slate-100 dark:border-slate-700 pb-2">
                        <Building2 size={20} className="text-slate-400"/>
                        {ui.common.companyInfo}
                    </h4>
                    {selectedExp.summary && (
                         <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic border-l-4 border-vn-yellow pl-4 py-1 bg-yellow-50/50 dark:bg-yellow-900/10 rounded-r-lg">
                             "{selectedExp.summary}"
                         </p>
                    )}
                    {selectedExp.website && (
                        <div className="mt-4">
                            <a 
                                href={selectedExp.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white rounded-lg hover:bg-vn-red transition-colors text-sm font-medium"
                            >
                                <ExternalLink size={14} />
                                {ui.common.visitWebsite}
                            </a>
                        </div>
                    )}
                </div>

                {/* Responsibilities */}
                <div>
                    <h4 className="flex items-center gap-2 font-display font-bold text-slate-900 dark:text-slate-100 text-lg mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">
                        <Briefcase size={20} className="text-slate-400"/>
                        {ui.labels.responsibilities}
                    </h4>
                    <ul className="grid grid-cols-1 gap-3">
                        {selectedExp.responsibilities.map((res, index) => (
                        <li key={index} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm">
                            <div className="mt-1.5 w-2 h-2 rounded-full bg-vn-red shrink-0"></div>
                            <span className="text-sm md:text-base">{res}</span>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        )}
      </Modal>
    </>
  );
};

export default Experience;