import { experiences } from "@/lib/profile";
export default function CareerTimeline({ limit, from = 0 }: { limit?: number; from?: number }) {
 const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
 const start = (period: string) => { const [month,year] = period.split(" — ")[0].split(" "); return Number(year)*12 + months.indexOf(month); };
 const ordered = [...experiences].sort((a,b) => start(b.period)-start(a.period));
 const jobs = ordered.slice(from,limit ? from + limit : undefined);
 return <ol className="career-timeline">{jobs.map(job=><li key={job.company} className="career-stop"><span className="career-dot" aria-hidden="true"/><p className="career-period">{job.period}</p><div className="career-copy"><h3>{job.role}</h3><p className="career-company">{job.company}</p>{job.detail && <p className="career-description">{job.detail}</p>}</div></li>)}</ol>;
}
