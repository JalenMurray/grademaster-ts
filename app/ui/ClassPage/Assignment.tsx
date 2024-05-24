import { useEffect, useState } from 'react';
import { formatFloat } from '@/app/utils/format';
import { validateAssignment } from '@/app/utils/validate';
import { Delete } from '@mui/icons-material';
import { useClassContext } from '@/app/context/class';
import { Assignment as aType } from '@/app/context/types';

export default function Assignment({ assignment, atId }: { assignment: aType; atId: string }) {
  const { assignmentTypes, updateAssignment, deleteAssignment, isGuest } = useClassContext();
  const [weightedScore, setWeightedScore] = useState(
    (assignment.score / assignment.maxScore) * assignment.weight
  );
  const [lostPoints, setLostPoints] = useState(null);

  useEffect(() => {
    setWeightedScore((assignment.score / assignment.maxScore) * assignment.weight);
    setLostPoints(assignment.weight - (assignment.score / assignment.maxScore) * assignment.weight);
  }, [assignment]);

  /*
    Event Handlers
  */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const { valid, message } = validateAssignment(name, value);
    if (valid) {
      let formatted = value;
      if (name !== 'name') {
        formatted = formatFloat(value, 2);
      }
      updateAssignment(atId, assignment.id, { name, value: formatted });
    } else {
      console.error(message);
    }
  };

  const handleBlur = (e) => {
    if (!isGuest) {
      console.log('Do Blur');
    }
  };

  return (
    <>
      <td>
        <input
          onFocus={(e) => e.target.select()}
          name="name"
          value={assignment.name}
          className="input input-ghost w-20 md:w-52 md:text-2xl"
          onKeyDown={handleKeyPress}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </td>
      <td className="flex items-center">
        <input
          onFocus={(e) => e.target.select()}
          name="score"
          value={assignment.score}
          className="input input-ghost w-12 md:w-[4.5rem] mx-2 md:text-2xl"
          onKeyDown={handleKeyPress}
          onChange={handleChange}
          onBlur={handleBlur}
          type="number"
        />
        /
        <input
          onFocus={(e) => e.target.select()}
          name="maxScore"
          value={assignment.maxScore}
          className="input input-ghost w-12 md:w-[4.5rem] mx-2 md:text-2xl"
          onKeyDown={handleKeyPress}
          onChange={handleChange}
          onBlur={handleBlur}
          type="number"
        />
      </td>
      <td>
        {assignmentTypes[atId].lockWeights ? (
          <span className="input input-ghost w-12 md:w-[4.5rem] mx-2 md:text-2xl">
            {formatFloat(assignment.weight, 2)}
          </span>
        ) : (
          <input
            onFocus={(e) => e.target.select()}
            name="weight"
            value={assignment.weight}
            className="input input-ghost w-12 md:w-[4.5rem] mx-2 md:text-2xl"
            onKeyDown={handleKeyPress}
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
          />
        )}
      </td>
      <td className="md:text-2xl">{formatFloat(weightedScore, 2) || 0}</td>
      <td className="md:text-2xl">{formatFloat(lostPoints, 2) || 0}</td>
      <td>
        <button
          className="btn btn-error btn-sm text-white"
          onClick={() => deleteAssignment(atId, assignment)}
        >
          <Delete />
        </button>
      </td>
    </>
  );
}
