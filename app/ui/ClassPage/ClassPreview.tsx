import { useClassContext } from '@/app/context/class';
import { ClassJSON } from '@/app/context/types';
import { JSONTree } from 'react-json-tree';
import { v4 as uuid } from 'uuid';

type PreviewCallback = {
  onSubmit: () => void;
  onCancel: () => void;
};

export default function ClassPreview({ data, callback }: { data: any; callback: PreviewCallback }) {
  function handleSubmit(e) {
    e.preventDefault();
    callback.onSubmit();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-2xl mb-2">Class Preview</h3>
      <p>
        This is the class information found. If a value was not provided, default information was
        used. If this looks correct, select Next.
      </p>
      <JSONTree data={data} hideRoot />
      <div className="flex gap-4">
        <button className="btn btn-neutral" onClick={callback.onCancel}>
          Cancel
        </button>
        <button className="btn btn-primary" type="submit">
          Next
        </button>
      </div>
    </form>
  );
}
