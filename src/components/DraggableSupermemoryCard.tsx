import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SupermemoryIntegration } from './SupermemoryIntegration';
import { Brain, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';

interface DraggableSupermemoryCardProps {
  content: string;
  onContentUpdate: (content: string) => void;
}

export const DraggableSupermemoryCard: React.FC<DraggableSupermemoryCardProps> = ({
  content,
  onContentUpdate
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isFloating, setIsFloating] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !cardRef.current) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // Constrain to viewport
    const maxX = window.innerWidth - cardRef.current.offsetWidth;
    const maxY = window.innerHeight - cardRef.current.offsetHeight;
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
    
    if (!isFloating) {
      setIsFloating(true);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, dragOffset]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const resetPosition = () => {
    setIsFloating(false);
    setPosition({ x: 0, y: 0 });
  };

  const cardClasses = `
    ${isFloating ? 'fixed z-50 shadow-2xl' : 'relative'} 
    ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
    transition-all duration-200 ease-in-out
    ${isExpanded ? 'animate-scale-in' : ''}
  `;

  const cardStyle = isFloating ? {
    left: position.x,
    top: position.y,
    width: isExpanded ? '320px' : 'auto'
  } : {};

  return (
    <Card 
      ref={cardRef}
      className={cardClasses}
      style={cardStyle}
    >
      <div className="flex items-center">
        {/* Collapsed State - Compact Button */}
        {!isExpanded && (
          <Button
            variant="toolbar"
            size="sm"
            onClick={toggleExpanded}
            className="flex items-center gap-2 px-2 py-1 border-0"
            title="Open Supermemory"
          >
            <Brain className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium">AI</span>
          </Button>
        )}

        {/* Expanded State */}
        {isExpanded && (
          <div className="w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">Supermemory AI</span>
              </div>
              <div className="flex items-center gap-1">
                {/* Drag Handle */}
                <div
                  ref={dragHandleRef}
                  onMouseDown={handleMouseDown}
                  className="p-1 hover:bg-accent rounded cursor-grab active:cursor-grabbing"
                  title="Drag to move"
                >
                  <GripVertical className="h-3 w-3 text-muted-foreground" />
                </div>
                
                {/* Reset Position Button */}
                {isFloating && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetPosition}
                    className="h-6 w-6 p-0"
                    title="Reset position"
                  >
                    <span className="text-xs">⌂</span>
                  </Button>
                )}
                
                {/* Collapse Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleExpanded}
                  className="h-6 w-6 p-0"
                  title="Collapse"
                >
                  <ChevronUp className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-3">
              <SupermemoryIntegration
                content={content}
                onContentUpdate={onContentUpdate}
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};