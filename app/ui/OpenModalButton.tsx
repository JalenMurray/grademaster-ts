'use client';

export default function OpenModalButton({
  buttonText,
  modalId,
  extraVariable,
}: {
  buttonText: string;
  modalId: string;
  extraVariable?: {
    name: string;
    value: string;
  };
}) {
  function handleClick(e) {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    modal.showModal();
    if (extraVariable) {
      const { name, value } = extraVariable;
      const hiddenId = document.getElementById(`${modalId}_${name}`) as HTMLInputElement;
      hiddenId.value = value;
    }
  }

  return (
    <button className="btn btn-ghost group" onClick={handleClick}>
      {buttonText}
    </button>
  );
}
