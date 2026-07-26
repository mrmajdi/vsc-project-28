import React, { ReactNode } from 'react';

interface SidebarProps {
  /** Whether the sidebar is open */
  isOpen?: boolean;
  /** Callback to toggle sidebar visibility */
  onToggle?: () => void;
  /** Content to render inside the sidebar */
  children?: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Optional title for the sidebar */
  title?: string;
  /** Optional icon to show in the header */
  headerIcon?: ReactNode;
}

/**
 * Reusable Sidebar component for dashboard panels.
 * Provides a collapsible sidebar with optional title and header icon.
 * Uses Tailwind CSS for styling.
 */
const Sidebar: React.FC<SidebarProps> = ({
  isOpen = true,
  onToggle,
  children,
  className = '',
  title,
  headerIcon,
}) => {
  const handleToggle = () => {
    onToggle?.();
  };

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 z-20 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out ${
        !isOpen ? '-translate-x-full' : 'translate-x-0'
      } sm:block sm:translate-x-0 ${className}`}
      aria-label="Sidebar"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {headerIcon && <div className="flex-shrink-0">{headerIcon}</div>}
        {title && (
          <h2 className="text-lg font-semibold text-gray-800 flex-1">{title}</h2>
        )}
        {typeof isOpen === 'boolean' && (
          <button
            onClick={handleToggle}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle sidebar"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </>
              ) : (
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </>
              )}
            </svg>
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {children}
      </nav>
    </aside>
  );
};

export default Sidebar;