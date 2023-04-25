import React from "react";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import styles from "./HomeCarousel.module.scss";

const HomeCarousel = () => {
	return (
		<CarouselProvider naturalSlideWidth={145} naturalSlideHeight={60} totalSlides={3} className={styles.Carousel} isPlaying={true}>
			<Slider className={styles.Carousel_Slider}>
				<Slide index={0} className={styles.Carousel_Slide}>
					<div className={styles.Carousel_ImgHolder}>
						<img
							className={styles.Carousel_Img}
							src="src/assets/HomeCarousel/christmas.png"
							alt="christmas 50% sale"
						/>
					</div>
				</Slide>
				<Slide index={1} className={styles.Carousel_Slide}>
					<div className={styles.Carousel_ImgHolder}>
						<img
							className={styles.Carousel_Img}
							src="src/assets/HomeCarousel/superheroes.png"
							alt="superhero collection"
						/>
					</div>
				</Slide>
				<Slide index={2} className={styles.Carousel_Slide}>
					<div className={styles.Carousel_ImgHolder}>
						<img
							className={styles.Carousel_Img}
							src="src/assets/HomeCarousel/3Danimals.png"
							alt="new 3D animal collection"
						/>
					</div>
				</Slide>
			</Slider>
			<ButtonBack className={styles.Carousel_BackBtn}>&#8249;</ButtonBack>
			<ButtonNext className={styles.Carousel_NextBtn}>&#8250;</ButtonNext>
		</CarouselProvider>
	);
};

export default HomeCarousel;
