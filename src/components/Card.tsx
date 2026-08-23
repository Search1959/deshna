import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'amber' | 'blue' | 'emerald' | 'purple' | 'rose' | 'flat' | 'elevated';
  hoverable?: boolean;
  padded?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  hoverable = false,
  padded = 'md',
  className = '',
  children,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white border-2 border-amber-200/80 shadow-xs text-slate-800',
    amber: 'bg-gradient-to-br from-amber-50 to-orange-50/50 border-2 border-amber-300 shadow-sm text-slate-900',
    blue: 'bg-gradient-to-br from-blue-50 to-indigo-50/50 border-2 border-blue-200 shadow-sm text-slate-900',
    emerald: 'bg-gradient-to-br from-emerald-50 to-teal-50/50 border-2 border-emerald-200 shadow-sm text-slate-900',
    purple: 'bg-gradient-to-br from-purple-50 to-pink-50/50 border-2 border-purple-200 shadow-sm text-slate-900',
    rose: 'bg-gradient-to-br from-rose-50 to-pink-50/50 border-2 border-rose-200 shadow-sm text-slate-900',
    flat: 'bg-white/80 border border-slate-200/80 shadow-none text-slate-800',
    elevated: 'bg-white border-2 border-slate-200 shadow-md hover:shadow-lg text-slate-900',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  const hoverStyle = hoverable
    ? 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 cursor-pointer'
    : '';

  return (
    <div
      className={`rounded-2xl sm:rounded-3xl overflow-hidden ${variantStyles[variant]} ${paddingStyles[padded]} ${hoverStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  badge?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  icon,
  action,
  badge,
  className = '',
  children,
  ...props
}) => {
  return (
    <div className={`flex items-start justify-between gap-3 mb-4 ${className}`} {...props}>
      <div className="flex items-center space-x-3 min-w-0">
        {icon && (
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 shadow-2xs">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {title && (
              <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-900 truncate">
                {title}
              </h3>
            )}
            {badge}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-600 font-medium line-clamp-1 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
      {children}
    </div>
  );
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <div className={`space-y-3 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <div className={`mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap ${className}`} {...props}>
      {children}
    </div>
  );
};

export interface StatCardProps {
  id?: string;
  label: string;
  value: string | number;
  subtext?: string;
  icon: React.ReactNode;
  iconBg?: string;
  trend?: string;
  trendType?: 'positive' | 'neutral' | 'accent';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  id,
  label,
  value,
  subtext,
  icon,
  iconBg = 'bg-amber-100 text-amber-800',
  trend,
  trendType = 'positive',
  onClick,
}) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`p-4 sm:p-5 rounded-2xl bg-white border-2 border-amber-200/90 shadow-2xs flex flex-col justify-between transition ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-xs active:scale-[0.99]' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</span>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${iconBg}`}>
          {icon}
        </div>
      </div>
      <div>
        <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{value}</div>
        {(subtext || trend) && (
          <div className="flex items-center justify-between text-xs mt-1 font-semibold text-slate-500">
            {subtext && <span className="truncate">{subtext}</span>}
            {trend && (
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  trendType === 'positive'
                    ? 'bg-emerald-100 text-emerald-800'
                    : trendType === 'accent'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {trend}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'amber' | 'blue' | 'purple' | 'rose' | 'slate';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'amber',
  size = 'sm',
  className = '',
}) => {
  const styles = {
    emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    amber: 'bg-amber-100 text-amber-900 border-amber-300',
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
    rose: 'bg-rose-100 text-rose-800 border-rose-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const sizeStyle = size === 'sm' ? 'text-[11px] px-2.5 py-0.5' : 'text-xs px-3 py-1';

  return (
    <span
      className={`inline-flex items-center font-black rounded-full border whitespace-nowrap ${styles[variant]} ${sizeStyle} ${className}`}
    >
      {children}
    </span>
  );
};
