import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { Title } from '../styles/pages/Index';

interface IProduct {
	id: number;
	title: string;
}

interface IHomeProps {
	recomendedProducts: IProduct[];
}

// Lazy load do componente de modal
const ModalLazyLoad = dynamic(
	() => import('../components/Modal'), // importação do modal
	{ loading: () => <p>Carregando meu modal...</p>, ssr: false } // mensagem de loading
)

export default function Home({ recomendedProducts }: IHomeProps) {

	const [isModalOpened, setModalOpened] = useState(false);
	
	function handleOpenModal() {
		setModalOpened(!isModalOpened);
	}

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

			<button type="button" onClick={() => handleOpenModal()}>Abrir modal</button>

			{isModalOpened && <ModalLazyLoad/> }
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
