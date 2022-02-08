import { useState } from 'react'
import { useRouter } from 'next/router'
import Authenticated from '@/layouts/authenticated'
import PageHeader from '@/layouts/page-header'
import ClientForm from '@/components/forms/client'
import ErrorBanner from '@/components/notifications/error-banner'

export async function getServerSideProps(context) {
	const { id } = context.query
	const result = await fetch(
		`${process.env.NEXT_PUBLIC_URL}/api/clients/${id}`,
		{
			headers: {
				'Content-Type': 'application/json',
				cookie: context.req.headers.cookie!,
			},
		}
	).then((res) => res.json())
	if (!result.error) {
		return {
			props: {
				client: result.data,
			},
		}
	} else {
		return {
			redirect: {
				permanent: false,
				destination: '/dashboard/clients',
			},
		}
	}
}

export default function EditClient({ client }) {
	const controls = [{ label: 'Back to list', href: '/dashboard/clients' }]

	const router = useRouter()
	const [error, setError] = useState('')
	const [formData, setFormData] = useState({
		id: client.id,
		name: client.name,
		status: 'New',
	})

	const handleSubmit = async (event) => {
		event.preventDefault()
		await fetch(`/api/clients/${client.id}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'PUT',
			body: JSON.stringify(formData),
		})
			.then((res) => res.json())
			.then((json) => {
				if (json.error) setError(json.error)
				else router.push(`/dashboard/clients/${json.data.id}`)
			})
	}

	return (
		<Authenticated>
			<PageHeader title={`Edit ${client.name}`} controls={controls} />
			{error && <ErrorBanner title="Failed To Update" message={error} />}
			<ClientForm
				formData={formData}
				setFormData={setFormData}
				handleSubmit={handleSubmit}
			/>
		</Authenticated>
	)
}
