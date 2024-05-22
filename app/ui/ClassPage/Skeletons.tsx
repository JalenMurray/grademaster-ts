export function ClassHeaderSkeleton(): JSX.Element {
  return (
    <>
      <div className="skeleton h-12 w-64" /> {/* Class Code */}
      <div className="skeleton h-6 w-40 mt-3" /> {/* Class Name */}
      <div className="skeleton h-4 w-24 mt-3" /> {/* Actions */}
      <div className="mt-2 flex gap-3">
        <div className="btn skeleton w-32" /> {/* Edit Class Button */}
        <div className="btn skeleton w-32" /> {/* New Assignment Type Button */}
      </div>
      <div className="card h-24 w-48 skeleton mt-3" /> {/* Desired Score */}
    </>
  );
}

function WarningsSkeleton(): JSX.Element {
  return (
    <div className="mt-8 flex gap-8">
      <div className="card h-40 w-96 skeleton" />
      <div className="card h-40 w-96 skeleton" />
    </div>
  );
}

function ProgressBarSkeleton(): JSX.Element {
  return <div className="w-full h-12 rounded-[20px] skeleton mt-8" />;
}

function AssignmentTypesSkeleton(): JSX.Element {
  return (
    <div className="flex flex-col gap-6">
      <div className="w-full h-18 rounded-[20px] skeleton mt-8" />
      <div className="w-full h-18 rounded-[20px] skeleton mt-8" />
      <div className="w-full h-18 rounded-[20px] skeleton mt-8" />
    </div>
  );
}

export function GradeCalculatorSkeleton(): JSX.Element {
  return (
    <div>
      <WarningsSkeleton />
      <ProgressBarSkeleton />
      <AssignmentTypesSkeleton />
    </div>
  );
}
