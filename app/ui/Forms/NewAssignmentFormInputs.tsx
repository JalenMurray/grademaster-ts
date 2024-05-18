import { csAssignmentType as atType } from '@/app/lib/definitions';

export default function NewAssignmentFormInputs({ at }: { at: atType }) {
  // If lockWeights use the balanced weight if there were one additional assignment
  function getWeight(): number {
    return at.lockWeights ? at.weight / (at.assignments.length + 1) : 0;
  }

  return (
    <>
      <input hidden readOnly name="name" value={at.defaultName} />
      <input hidden readOnly name="score" value={at.maxScore} />
      <input hidden readOnly name="maxScore" value={at.maxScore} />
      <input hidden readOnly name="weight" value={getWeight()} />
      <input hidden readOnly name="atId" value={at.id} />
    </>
  );
}
