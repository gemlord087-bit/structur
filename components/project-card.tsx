'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  onOpen: () => void;
  onDelete?: () => void;
  isActive?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpen, onDelete, isActive }) => {
  const router = useRouter();
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleCardClick = () => {
    router.push(`/project/${project.id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete && confirm('Are you sure you want to delete this project?')) {
      onDelete();
    }
  };

  const getPlatformIcon = (platform: 'web' | 'mobile') => {
    return platform === 'web' ? '🌐' : '📱';
  };

  const getPlatformColor = (platform: 'web' | 'mobile') => {
    return platform === 'web' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`group bg-white rounded-xl border shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden hover:border-gray-300 ${
        isActive ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
      }`}
    >
      {/* Preview */}
      <div className="aspect-video bg-gray-50 border-b border-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="text-4xl opacity-50">
            {getPlatformIcon(project.platform)}
          </div>
        </div>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sm font-medium text-gray-900">
            Open Project
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
            {project.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(project.platform)}`}>
              {getPlatformIcon(project.platform)} {project.platform}
            </span>
            {onDelete && (
              <button
                onClick={handleDeleteClick}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded text-red-500 hover:text-red-700"
                title="Delete project"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center justify-between">
            <span>Files: {project.files.length}</span>
            <span>Messages: {project.messages.length}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Created: {formatDate(project.createdAt)}</span>
            <span>Updated: {formatDate(project.updatedAt)}</span>
          </div>
        </div>

        {/* Last message preview */}
        {project.messages.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-1">Last activity:</p>
            <p className="text-sm text-gray-600 line-clamp-2">
              {project.messages[project.messages.length - 1].content}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};