export const submitData = async (
  event: React.FormEvent<HTMLFormElement>,
  room_id: string,
  player_id: string,
  formData?: FormData,
  time?: number,
) => {
  event.preventDefault();

  if (!formData) {
    formData = new FormData(event.currentTarget);
  }
  const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | HTMLInputElement;

  if (submitter && 'value' in submitter) {
    formData.append('act', submitter.value);
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${room_id}/${player_id}?time=${time}`, {
    method: 'POST',
    body: formData,
  });

  if (res.ok) {
    window.location.reload();
  }
};
