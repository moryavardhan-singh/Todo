"use client";

import React from "react";
const ReusableComponents: React.FC<any> = ({ heading }) => {
    return (
        <div className="text-left text-lg text-slate-900">
            <h1>{heading}</h1>
        </div>
    )
}
export default ReusableComponents