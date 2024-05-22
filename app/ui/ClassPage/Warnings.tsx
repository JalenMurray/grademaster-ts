import { useClassContext } from '@/app/context/class';
import { Warning } from '@/app/context/types';

function WarningCard({ warning }: { warning: Warning }) {
  return (
    <div className="card shadow-xl w-96 bg-red-500">
      <div className="card-body">
        <h2 className="card-title">{warning.header}</h2>
        <p>{warning.message}</p>
      </div>
    </div>
  );
}

export default function Warnings() {
  const { warnings } = useClassContext();

  return (
    <div className="mt-8" data-test="warnings">
      {Object.values(warnings).map((warning: Warning) => (
        <WarningCard key={warning.header} warning={warning} />
      ))}
    </div>
  );
}
