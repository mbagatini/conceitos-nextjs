import { GetServerSideProps } from 'next';

import { Title } from '../styles/pages/Index';

interface IProduct {
	id: number;
	title: string;
}

interface IHomeProps {
	recomendedProducts: IProduct[];
}

export default function Home({ recomendedProducts }: IHomeProps) {
	return (
		<div>
			<Title>Products</Title>
			<ul>
				{recomendedProducts.map(product => {
					return (
						<li key={product.id}>
							{product.title}
						</li>
					);
				})}
			</ul>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
	const response = await fetch('http://localhost:3030/recommended');
	const products = await response.json();

	return {
		props: {
			recomendedProducts: products
		}
	}
}
