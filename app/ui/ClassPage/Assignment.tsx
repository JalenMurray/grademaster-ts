import { csAssignment } from '@/app/lib/definitions';

export default function Assignment({ assignment }: { assignment: csAssignment }) {
  return (
    <>
      <td>{assignment.name}</td>
      <td>
        {assignment.score} / {assignment.maxScore}
      </td>
      <td>{assignment.weight}</td>
      <td>0</td>
      <td>0</td>
    </>
  );
}
