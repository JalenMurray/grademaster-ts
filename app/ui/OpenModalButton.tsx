'use client';

export default function OpenModalButton({
  children,
  modalId,
  btnClasses,
  extraVariable,
}: {
  children: React.ReactNode;
  modalId: string;
  btnClasses: string;
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
    <button
      data-test="openModalButton"
      className={`btn py-2 px-0.5 md:px-2 ${btnClasses}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
