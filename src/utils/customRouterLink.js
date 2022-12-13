import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";


export default function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <div className="nav-text-container">

            <Link to={to} {...props}>
                {children}
            </Link>

            </div>
        </li>
    )
}