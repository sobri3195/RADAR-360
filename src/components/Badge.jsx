import { riskBadge } from '../utils/risk';

export default function Badge({ level }) {
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${riskBadge[level]}`}>
      {level}
    </span>
  );
}
