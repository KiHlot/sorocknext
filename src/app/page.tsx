import HomeTPL from "@/templates/HomeTPL/HomeTPL.component"

const Home = async () => {
  // const api = await getApi<MainPageTPLIF>("get-home-page-data");

  // return <>{api && <HomeTPL data={api} />}</>;
  return <HomeTPL />
}

export default Home
