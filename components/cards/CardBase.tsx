import React from 'react';

export const CardBase = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="border rounded-xl p-4 bg-[#CBDCEB] shadow-sm hover:shadow-md transition-shadow duration-150">
            {children}
        </div>
    );
};    