import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
	const { repos } = React.useContext(GithubContext);

	//total is what is being returned, and item is the object that we are iterating over
	const languages = repos.reduce((total, item) => {
		const { language, stargazers_count } = item;

		//check language and if it is null, return the language
		if (!language) return total;

		// if the instance is already in the object, just return a value of one
		if (!total[language]) {
			total[language] = { label: language, value: 1, stars: stargazers_count };
		} else {
			//if the object is a repeat, i.e Css, Css, Css in the object, then add 1 to the total
			total[language] = {
				...total[language],
				//total[language] gets the current array value and adds 1
				value: total[language].value + 1,
				stars: total[language].stars + stargazers_count,
			};
		}
		return total;
	}, {});

	const mostUsed = Object.values(languages)
		.sort((a, b) => {
			// will make highest value first
			return b.value - a.value;
		})
		.slice(0, 5);

	const mostPopular = Object.values(languages)
		.sort((a, b) => {
			return b.stars - a.stars;
		})
		.map((item) => {
			return { ...item, value: item.stars };
		})
		.slice(0, 5);
	// console.log(mostPopular);

	// stars, forks

	let { stars, forks } = repos.reduce(
		(total, item) => {
			const { stargazers_count, name, forks } = item;
			total.stars[stargazers_count] = { label: name, value: stargazers_count };
			total.forks[forks] = { label: name, value: forks };
			return total;
		},
		{
			stars: {},
			forks: {},
		}
	);

	stars = Object.values(stars).slice(-5).reverse();
	forks = Object.values(forks).slice(-5).reverse();
	// console.log(stars);

	// const chartData = [
	// 	{
	// 		label: 'HTML',
	// 		value: '290',
	// 	},
	// 	{
	// 		label: 'CSS',
	// 		value: '160',
	// 	},
	// 	{
	// 		label: 'Javascript',
	// 		value: '180',
	// 	},
	// ];

	return (
		<section className='section'>
			<Wrapper className='section-center'>
				{/* <ExampleChart data={chartData} /> */}
				<Pie3D data={mostUsed} />
				<Column3D data={stars} />
				<Doughnut2D data={mostPopular} />
				<Bar3D data={forks} />
			</Wrapper>
		</section>
	);
};

const Wrapper = styled.div`
	display: grid;
	justify-items: center;
	gap: 2rem;
	@media (min-width: 800px) {
		grid-template-columns: 1fr 1fr;
	}

	@media (min-width: 1200px) {
		grid-template-columns: 2fr 3fr;
	}

	div {
		width: 100% !important;
	}
	.fusioncharts-container {
		width: 100% !important;
	}
	svg {
		width: 100% !important;
		border-radius: var(--radius) !important;
	}
`;

export default Repos;
