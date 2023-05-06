import Countries from "./Countries"


function Home() {
  return (
    <div>
      <p className="fs-2 text-center text-secondary mb-3 animate__animated animate__fadeInDown animate__delay-2s">List of all Countries!</p>
      <Countries />
    </div>
  )
}

export default Home