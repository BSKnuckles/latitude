import { useState } from 'react'
import { useRouter } from 'next/router'
import Authenticated from '@/layouts/authenticated'
import ClientForm from '@/components/forms/client'
import ErrorBanner from '@/components/notifications/error-banner'
import PageHeader from '@/layouts/page-header'

export default function NewClient() {
	const router = useRouter()
	const [error, setError] = useState('')
	const [formData, setFormData] = useState({
		name: '',
	})

	const handleSubmit = async (event) => {
		event.preventDefault()
		await fetch('/api/clients', {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
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
			<PageHeader title="New Client" />
			{error && <ErrorBanner title="Failed To Create Client" message={error} />}
			<ClientForm
				formData={formData}
				setFormData={setFormData}
				handleSubmit={handleSubmit}
			/>
		</Authenticated>
	)
}
