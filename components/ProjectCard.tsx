
import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const formattedDate = new Date(project.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const previewContent = project.files.length > 0 ? project.files[0].content : '';

  return (
    <div 
      onClick={() => onClick(project)}
      className="group relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col h-[280px]"
    >
        {/* Simple Preview Iframe - Scaled down and disabled */}
        <div className="flex-1 bg-gray-100 relative overflow-hidden pointer-events-none">
             {/* Mask to prevent interaction */}
            <div className="absolute inset-0 z-10 bg-transparent"></div>
            <div className="w-[200%] h-[200%] origin-top-left transform scale-50">
                <iframe 
                    srcDoc={previewContent} 
                    className="w-full h-full border-0 bg-white"
                    tabIndex={-1}
                    title={`Preview of ${project.name}`}
                />
            </div>
        </div>

        {/* Card Footer */}
        <div className="p-4 border-t border-gray-100 bg-white z-20">
            <h3 className="font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{project.name}</h3>
            <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">{formattedDate}</span>
                <div className="flex items-center gap-2">
                     <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full uppercase font-bold">{project.platform}</span>
                     <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{project.files.length} Files</span>
                </div>
            </div>
        </div>
    </div>
  );
};
