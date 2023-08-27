import toast from 'react-hot-toast';

export const showToast = async (promise,onSuccess,onError,loadingMessage="Loading") => {
    try {
      toast.dismiss()
      toast.loading(loadingMessage)
      await promise
      .unwrap()
      .then((response)=>{
        toast.dismiss()
        toast.success(response.message)
        onSuccess()
      })
      .catch((error) => {
        toast.dismiss()
        toast.error(error.data.error)
        onError()
      })
    } catch (error) {
      console.log("error",error)
      onError()
    }
  };