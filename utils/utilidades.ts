export const cast = (obj: any) => {
    const newObj = JSON.stringify(obj);
    return JSON.parse(newObj);
  };