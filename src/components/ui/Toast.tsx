import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { Toast as ToastType } from '../../contexts/ToastContext';

interface ToastProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const toastStyles = {
  success: 'bg-primary-100 border-primary-200 text-primary-700',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-primary-100 border-primary-200 text-primary-700',
};

const iconStyles = {
  success: 'text-primary-500',
  error: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-primary-500',
};

export const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {
  const Icon = toastIcons[toast.type];

  return (
    <div
      className={`w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden border ${toastStyles[toast.type]}`}
    >
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Icon className={`h-5 w-5 ${iconStyles[toast.type]}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium leading-5">{toast.title}</p>
            {toast.message && (
              <p className="mt-1 text-sm leading-5 opacity-90 break-words">{toast.message}</p>
            )}
            {toast.action && (
              <div className="mt-3">
                <button
                  onClick={toast.action.onClick}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    toast.action.variant === 'primary'
                      ? 'bg-primary-700 text-white hover:bg-primary-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {toast.action.label}
                </button>
              </div>
            )}
          </div>
          <div className="flex-shrink-0">
            <button
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 p-1"
              onClick={() => onRemove(toast.id)}
            >
              <span className="sr-only">Close</span>
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ToastContainer: React.FC<{ toasts: ToastType[]; onRemove: (id: string) => void }> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 space-y-3 w-80 max-w-sm">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};
