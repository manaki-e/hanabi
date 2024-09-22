export const submitData = async (
  event: React.FormEvent<HTMLFormElement>,
  params: {
    room_id: string;
    player_id: string;
  }
) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const submitter = (event.nativeEvent as SubmitEvent).submitter as
    | HTMLButtonElement
    | HTMLInputElement;

  if (submitter && "value" in submitter) {
    formData.append("act", submitter.value);
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${params.room_id}/${params.player_id}`, {
    method: "POST",
    body: formData,
  });

  res.ok && window.location.reload();
};
