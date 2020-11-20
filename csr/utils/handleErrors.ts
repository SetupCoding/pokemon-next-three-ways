export const handleErrors=async (res)=>  {
    if (res.status >= 200 && res.status <= 299) {
        return (await res.json())
      } else {
        throw Error(res.statusText);
      }
}