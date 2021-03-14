import { useEffect, useState } from 'react';

import { Title } from '../styles/pages/Index';

interface IProduct {
	id: number;
	title: string;
}

export default function Home() {
	const [recomended, setRecomended] = useState<IProduct[]>([]);

	useEffect(() => {
		// Client side rendering
		fetch('http://localhost:3030/recommended').then(response => {
			response.json().then(data => {
				setRecomended(data);
			})
		})
	}, []);

	return (
		<div>
			<Title>Products</Title>
			<ul>
				{recomended.map(product => {
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
