export const handleFetch = ({
  searchValue,
  setPictures,
  setPage,
  pageRef,
  setIsLoading,
  setIsLoadingMore,
  setHasMorePictures,
}) => {
  const perPage = 12;
  const page = pageRef.current; 
  const ApiKey = "40245726-79ec486d411d0a8bb323ae989";
  const url = `https://pixabay.com/api/?q=${searchValue}&page=${page}&key=${ApiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

  setTimeout(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPictures(data.hits);
        setPage(page + 1);
        setIsLoading(false);
        setIsLoadingMore(false);
        setHasMorePictures(data.hits.length === perPage);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, 300, () => {
    console.log(page);
  });
};
  