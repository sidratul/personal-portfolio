"use client";
import { useState } from "react";
import { portfolioProjects } from "@/lib/projects";
import ProjectPreview from "@/components/project-preview";
export default function ProjectBrowser() {
 const [filter,setFilter] = useState("All");
 const projects = portfolioProjects.filter(project => filter === "All" || project.filters.includes(filter));
 return <><div className="project-filters" role="group" aria-label="Filter projects">{["All","Web","Mobile","Fullstack"].map(label => <button type="button" key={label} aria-pressed={filter === label} onClick={() => setFilter(label)}>{label}</button>)}</div><p className="filter-count" aria-live="polite">{projects.length} {projects.length === 1 ? "project" : "projects"}</p><div className="preview-list">{projects.map(project => <ProjectPreview key={project.slug} project={project} index={portfolioProjects.indexOf(project)} />)}</div></>;
}
