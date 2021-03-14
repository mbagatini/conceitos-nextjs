import { useRouter } from 'next/router'

export default function Product() {
	const router = useRouter();

	return <h1>{`Id do produto é ${router.query.id}`}</h1>
}