'use client';

import { AddCircleOutline, Delete, Edit, ImportExport } from '@mui/icons-material';
import OpenModalButton from '../OpenModalButton';
import { useClassContext } from '@/app/context/class';
import { AssignmentType } from '@/app/context/types';
import { useEffect, useState } from 'react';
import { formatFloat } from '@/app/utils/format';
import { ClassHeaderSkeleton } from './Skeletons';

const COLOR_ZONES = ['#FF0000', '#FFC100', '#FFFF00', '#D6FF00', '#63FF00'];

function getDistanceColor(distance: number): string {
  if (distance >= 20) {
    return COLOR_ZONES[0];
  }
  if (distance >= 15) {
    return COLOR_ZONES[1];
  }
  if (distance >= 10) {
    return COLOR_ZONES[2];
  }
  if (distance >= 5) {
    return COLOR_ZONES[3];
  }
  return COLOR_ZONES[4];
}

export default function ClassHeader() {
  const { cls, isGuest } = useClassContext();
  const [distanceFromDesiredScore, setDistanceFromDesiredScore] = useState<number>(0);
  const [desiredScoreReached, setDesiredScoreReached] = useState<boolean>(false);

  useEffect(() => {
    const distance = cls.desiredScore - cls.score;
    setDistanceFromDesiredScore(distance);
    setDesiredScoreReached(distance <= 0);
  }, [cls]);

  return cls.code === 'CLASS100' ? (
    <ClassHeaderSkeleton />
  ) : (
    <>
      <h1 className="text-5xl" style={{ color: cls.displayColor }}>
        {cls.code} <br /> <span className="text-3xl">{cls.name}</span>
      </h1>
      <h2 className="text-2xl">Actions</h2>
      <div className="mt-2 flex gap-3 w-full" data-test="actionButtons">
        <OpenModalButton modalId="edit_class_modal" btnClasses="btn-neutral">
          <Edit fontSize="small" />
          Edit Class
        </OpenModalButton>
        <OpenModalButton
          modalId="new_assignment_type_modal"
          btnClasses="btn-success text-white"
          extraVariable={{ name: 'class', value: cls.id }}
        >
          <AddCircleOutline fontSize="small" />
          <div className="flex flex-col">
            <p>New</p>
            <p>Assignment Type</p>
          </div>
        </OpenModalButton>
        <OpenModalButton modalId="import_export_modal" btnClasses="btn-info text-white">
          <ImportExport fontSize="small" />
          Import / Export
        </OpenModalButton>
        {!isGuest && (
          <button className="btn btn-error text-white">
            <Delete /> Delete Class
          </button>
        )}
      </div>
      <div
        className="h-20 md:h-24 w-32 md:w-48 bg-info-content rounded-3xl flex items-center text-center mt-4 text-xs"
        data-test="desiredScore"
      >
        {desiredScoreReached ? (
          <h3 className="text-green-500 px-4 py-5">You&apos;ve reached your desired score!</h3>
        ) : (
          <p className="px-1 py-2">
            Distance from desired score:
            <span
              className="text-lg md:text-2xl ml-1"
              style={{ color: getDistanceColor(distanceFromDesiredScore) }}
            >
              {formatFloat(distanceFromDesiredScore, 2)}
            </span>
          </p>
        )}
      </div>
    </>
  );
}
