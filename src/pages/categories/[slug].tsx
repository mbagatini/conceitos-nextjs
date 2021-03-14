import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from 'next/router';

interface IProduct {
	id: number;
	title: string;
}

interface ICategoryProps {
	products: IProduct[];
}

export default function Category({ products }: ICategoryProps) {
	const router = useRouter();

	// Se o Next está executando um fallback, exibe um loader até que 
	// os resultados tenham retornado da API
	if (router.isFallback) {
		return <p>Aguarde, carregando...</p>
	}

	return (
		<div>
			<h1>{router.query.slug}</h1>
			<ul>
				{products.map(product => {
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

export const getStaticPaths: GetStaticPaths = async () => {
	const response = await fetch('http://localhost:3030/categories');
	const categories = await response.json();

	const paths = categories.map(category => {
		return {
			params: {slug : category.id },
		}
	})
	
	// Se deixar o path vazio ([]), o Next irá carregar a categoria no primeiro acesso
	// que ocorrer, para os demais acessos, ele usará o cache com os dados do primeiro acesso
	
	return {
		paths,
		fallback: true,
	}
}

export const getStaticProps: GetStaticProps<ICategoryProps> = async (context) => {
	const { slug } = context.params;
	const response = await fetch(`http://localhost:3030/products?category_id=${slug}`);
	const products = await response.json();

	return {
		props: {
			products,
		},
		revalidate: 60, //segundos
	}
}