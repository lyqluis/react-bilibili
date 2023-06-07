export const fetchCollection = async (id) => {
  const target = collectionList.find((c) => c.id === id)
  if (target?.medias?.length) return
  setLoading(true)
  const res = await getFavContent(id, 5)
  console.log("get fav", id, res)
  dispatch(setCollectionContent({ id, content: res.data }))
  setLoading(false)
}
