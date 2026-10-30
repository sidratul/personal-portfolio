import Link from "next/link";
import AnimatedCard from "@/components/animated-card";
import type { PortfolioProject } from "@/lib/projects";
export default function ProjectPreview({ project, index = 0 }: { project: PortfolioProject; index?: number }) {
 return <AnimatedCard><article id={`preview-${project.slug}`} className={`project-preview project-${project.tone}`}><div className="preview-visual"><span className="preview-index" aria-hidden="true">/{String(index+1).padStart(2,"0")}</span>{project.image ? <img src={project.image} alt={`${project.title} application preview`} width={638} height={1380} loading="lazy" /> : <div className="booml-preview"><span>BOOML</span><p>Plan the trip.<br />Sell the ticket.</p><div>Dashboard · Operator · Crew</div></div>}</div><div className="preview-copy"><div className="project-divider"><span>PROJECT {String(index+1).padStart(2,"0")}</span><span>{project.category}</span></div><p className="preview-status">{project.status}</p><h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><p>{project.description}</p><Link className="text-link" href={`/projects/${project.slug}`}>View project </Link></div></article></AnimatedCard>;
}
