import InputFields from "./WeatherComponents/InputFields";
import Card from "./WeatherComponents/Card";
import Header from "./WeatherComponents/Header";
import HeroContainer from "./WeatherComponents/HeroContainer";
import WeatherMap from "./WeatherComponents/WeatherMap";
import Footer from "./WeatherComponents/Footer";
import Chart from "./WeatherComponents/Chart";

function App() {
  return (

    <>
      <div className="site-content">
        <Header />
        <HeroContainer />
        <Card />

        <main className="main-content">
				<div className="fullwidth-block">
					<div className="container">
						<h2 className="section-title">Click on Map and get Weather Info</h2>
						{/* <div className="row"> */}
						<WeatherMap />
							
						{/* </div> */}

            <Chart></Chart>
					</div>
				</div>

				
			</main>




        <Footer />

      </div>
    </>

  );
}

export default App;
