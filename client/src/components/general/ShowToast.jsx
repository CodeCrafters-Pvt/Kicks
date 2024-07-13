import toast from "react-hot-toast";

export const showToast = async (
  promise,
  onSuccess = null,
  onError = null,
  loadingMessage = "Loading"
) => {
  try {
    toast.dismiss();
    toast.loading(loadingMessage);
    await promise
      .unwrap()
      .then((response) => {
        toast.dismiss();
        toast.success(response.message);
        if (onSuccess) onSuccess(response);
        return response;
      })
      .catch((error) => {
        toast.dismiss();
        if (error && error.data && error.data.error) {
          toast.error(error.data.error);
        } else {
          toast.error("We're ironing out a few server wrinkles. Refresh in a moment.");
        }
        if (onError) onError(error);
      });
  } catch (error) {
    console.log("error", error);
    toast.error("We're ironing out a few server wrinkles. Refresh in a moment.");
    if (onError) onError();
  }
};
