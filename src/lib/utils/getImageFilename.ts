export const getImageFilename = (url: string) => {
  const match = url.match(/(?<=[\/]).*(?=\.jpg)/g);
  const getfile = match[0].split("/");
  return getfile[getfile.length - 1];
};
