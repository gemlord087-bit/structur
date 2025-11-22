'use client';

import React from 'react';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  onOpen: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpen }) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPlatformIcon = (platform: 'web' | 'mobile') => {
    return platform === 'web' ? '🌐' : '📱';
  };

  const getPlatformColor = (platform: 'web' | 'mobile') => {
    return platform === 'web' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  return (
    <div 
      onClick={onOpen}
      className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden hover:border-gray-300"
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
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(project.platform)}`}>
            {getPlatformIcon(project.platform)} {project.platform}
          </span>
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